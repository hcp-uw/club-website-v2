import { OAAccessCode, OASubmission, ProctoringEvent } from '../interfaces/IOA';
import { supabase } from './client';

const STORAGE_KEY = 'hcp_oa_access_codes';

// Default initial codes provided out of the box bound to test candidate emails
const DEFAULT_CODES: OAAccessCode[] = [
  {
    code: 'HCP-FRESH-2026',
    candidateName: 'Fresh Candidate',
    candidateEmail: 'fresh@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 60,
  },
  {
    code: 'HCP-TEST-999',
    candidateName: 'Alex Student',
    candidateEmail: 'alex@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 60,
  },
  {
    code: 'HCP-OA-2026',
    candidateName: 'HCP Applicant',
    candidateEmail: 'candidate@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 60,
  },
  {
    code: 'HCP-DEMO-2026',
    candidateName: 'Demo Student',
    candidateEmail: 'demo@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 45,
  },
  {
    code: 'HCP-MEMBER-PASS',
    candidateName: 'Club Member',
    candidateEmail: 'member@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 90,
  },
  {
    code: 'UW-CS-2026',
    candidateName: 'UW CS Student',
    candidateEmail: 'csstudent@uw.edu',
    isUsed: false,
    createdAt: new Date().toISOString(),
    maxDurationMinutes: 60,
  },
];

function getStoredCodes(): OAAccessCode[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CODES));
      return DEFAULT_CODES;
    }
    const parsed = JSON.parse(raw) as OAAccessCode[];
    const merged = [...parsed];
    let changed = false;
    for (const def of DEFAULT_CODES) {
      if (!merged.some(c => c.code.trim().toUpperCase() === def.code.trim().toUpperCase())) {
        merged.unshift(def);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return DEFAULT_CODES;
  }
}

function saveStoredCodes(codes: OAAccessCode[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  } catch (err) {
    console.error('Failed to save OA access codes to localStorage', err);
  }
}

export const oaCodeService = {
  /**
   * List all current access codes from Supabase DB or LocalStorage fallback
   */
  getAllCodes: async (): Promise<OAAccessCode[]> => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data, error } = await (supabase.from as any)('oa_access_codes').select('*');
        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            code: d.code,
            candidateName: d.candidate_name || d.candidateName || 'Candidate',
            candidateEmail: d.candidate_email || d.candidateEmail || '',
            isUsed: d.is_used ?? d.isUsed ?? false,
            usedAt: d.used_at || d.usedAt,
            createdAt: d.created_at || d.createdAt,
            expiresAt: d.expires_at || d.expiresAt,
            maxDurationMinutes: d.max_duration_minutes || d.maxDurationMinutes || 60,
          }));
        }
      }
    } catch {
      // Fallback to local storage
    }
    return getStoredCodes();
  },

  /**
   * Validate a code AND candidate email pair against backend DB
   */
  validateCode: async (
    code: string,
    email: string
  ): Promise<{ valid: boolean; accessCode?: OAAccessCode; message?: string; isUsed?: boolean }> => {
    const normalizedCode = code.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedCode) {
      return { valid: false, message: 'Please enter an access code.' };
    }
    if (!normalizedEmail) {
      return { valid: false, message: 'Please enter your candidate email address.' };
    }

    const allCodes = await oaCodeService.getAllCodes();
    const found = allCodes.find(c => c.code.trim().toUpperCase() === normalizedCode);

    if (!found) {
      return {
        valid: false,
        message: 'Invalid access code. Please check your code and try again.',
      };
    }

    // Verify email binding (auto-update email binding if using a default test code)
    if (found.candidateEmail.trim().toLowerCase() !== normalizedEmail) {
      // If code is an un-used default code, auto-bind to current candidate email
      if (!found.isUsed && DEFAULT_CODES.some(d => d.code === found.code)) {
        found.candidateEmail = normalizedEmail;
        saveStoredCodes(allCodes);
      } else {
        return {
          valid: false,
          message: `This access code is registered to ${found.candidateEmail}. Please use email: ${found.candidateEmail}`,
        };
      }
    }

    if (found.isUsed) {
      return {
        valid: false,
        isUsed: true,
        accessCode: found,
        message: 'This access code has already been used to complete an assessment.',
      };
    }

    if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
      return {
        valid: false,
        message: 'This access code has expired.',
      };
    }

    return { valid: true, accessCode: found };
  },

  /**
   * Mark a code as used in DB when candidate starts or submits assessment
   */
  markCodeUsed: async (code: string): Promise<void> => {
    const normalized = code.trim().toUpperCase();
    const allCodes = getStoredCodes();
    const updated = allCodes.map(c => {
      if (c.code.trim().toUpperCase() === normalized) {
        return {
          ...c,
          isUsed: true,
          usedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    saveStoredCodes(updated);

    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await (supabase.from as any)('oa_access_codes')
          .update({ is_used: true, used_at: new Date().toISOString() })
          .eq('code', normalized);
      }
    } catch {
      // ignore
    }
  },

  /**
   * Reset a specific code usage back to false (for testing/reuse)
   */
  resetCodeUsage: async (code: string): Promise<void> => {
    const normalized = code.trim().toUpperCase();
    const allCodes = getStoredCodes();
    const updated = allCodes.map(c => {
      if (c.code.trim().toUpperCase() === normalized) {
        return {
          ...c,
          isUsed: false,
          usedAt: undefined,
        };
      }
      return c;
    });
    saveStoredCodes(updated);

    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await (supabase.from as any)('oa_access_codes')
          .update({ is_used: false, used_at: null })
          .eq('code', normalized);
      }
    } catch {
      // ignore
    }
  },

  /**
   * Generate a single one-time access code linked to a specific candidate email
   */
  generateCode: async (
    candidateName: string,
    candidateEmail: string,
    maxDurationMinutes: number = 60,
    customCode?: string
  ): Promise<OAAccessCode> => {
    const code = customCode
      ? customCode.trim().toUpperCase()
      : `HCP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAccessCode: OAAccessCode = {
      code,
      candidateName: candidateName.trim() || 'Candidate',
      candidateEmail: candidateEmail.trim().toLowerCase(),
      isUsed: false,
      createdAt: new Date().toISOString(),
      maxDurationMinutes,
    };

    const current = getStoredCodes();
    const updated = [newAccessCode, ...current];
    saveStoredCodes(updated);

    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await (supabase.from as any)('oa_access_codes').insert({
          code: newAccessCode.code,
          candidate_name: newAccessCode.candidateName,
          candidate_email: newAccessCode.candidateEmail,
          is_used: false,
          max_duration_minutes: newAccessCode.maxDurationMinutes,
        });
      }
    } catch {
      // ignore
    }

    return newAccessCode;
  },

  /**
   * Bulk generate one-time codes for a list of candidate emails
   */
  bulkGenerateCodes: async (
    emails: string[],
    maxDurationMinutes: number = 60
  ): Promise<OAAccessCode[]> => {
    const generated: OAAccessCode[] = [];

    for (const email of emails) {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) continue;

      const nameFromEmail = cleanEmail.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = nameFromEmail
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const codeObj = await oaCodeService.generateCode(
        formattedName,
        cleanEmail,
        maxDurationMinutes
      );
      generated.push(codeObj);
    }

    return generated;
  },

  /**
   * Save submission and proctoring log to backend Supabase database
   */
  saveSubmissionToBackend: async (
    code: string,
    candidateEmail: string,
    submission: OASubmission,
    proctoringEvents: ProctoringEvent[]
  ): Promise<void> => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await (supabase.from as any)('oa_submissions').insert({
          code,
          candidate_email: candidateEmail,
          problem_id: submission.problemId,
          language: submission.language,
          submission_code: submission.code,
          status: submission.status,
          pass_count: submission.passCount,
          total_count: submission.totalCount,
          proctoring_events: proctoringEvents,
        });
      }
    } catch (err) {
      console.warn('Could not save submission to Supabase backend:', err);
    }
  },

  /**
   * Reset codes or delete code
   */
  resetCodesToDefault: (): void => {
    saveStoredCodes(DEFAULT_CODES);
  },

  deleteCode: (code: string): void => {
    const current = getStoredCodes();
    const filtered = current.filter(c => c.code.toUpperCase() !== code.toUpperCase());
    saveStoredCodes(filtered);
  },
};
