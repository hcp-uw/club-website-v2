export type OALanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'go' | 'rust';

export interface OATestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface OAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  score: number;
  description: string;
  inputFormat: string;
  constraints: string;
  outputFormat: string;
  sampleTestCases: OATestCase[];
  hiddenTestCases: OATestCase[];
  codeTemplates: Record<OALanguage, string>;
}

export interface OAAccessCode {
  code: string;
  candidateName: string;
  candidateEmail: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  expiresAt?: string;
  maxDurationMinutes: number;
  assignedProblemIds?: string[];
}

export interface OATestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTimeMs: number;
  memoryMb: number;
  error?: string;
  isHidden?: boolean;
}

export interface OASubmission {
  id: string;
  problemId: string;
  language: OALanguage;
  code: string;
  timestamp: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  passCount: number;
  totalCount: number;
  results: OATestResult[];
}

export interface ProctoringEvent {
  id: string;
  timestamp: string;
  type: 'TAB_SWITCH' | 'WINDOW_BLUR' | 'CAMERA_DISCONNECTED' | 'SCREEN_SHARE_STOPPED' | 'FULLSCREEN_EXIT' | 'INFO';
  description: string;
}

export interface OASessionState {
  accessCode: OAAccessCode | null;
  candidateName: string;
  candidateEmail: string;
  step: 'VERIFY' | 'PERMISSIONS' | 'ASSESSMENT' | 'COMPLETED';
  currentProblemIndex: number;
  timeRemainingSeconds: number;
  codeByProblemAndLang: Record<string, Record<OALanguage, string>>;
  activeLanguage: OALanguage;
  submissions: OASubmission[];
  proctoringEvents: ProctoringEvent[];
  cameraActive: boolean;
  screenShareActive: boolean;
  recordedMediaBlobs: Blob[];
}
