-- Migration: Secret Online Assessment (OA) Access Codes and Submissions Schema

-- 1. Create oa_access_codes table
CREATE TABLE IF NOT EXISTS public.oa_access_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    candidate_email VARCHAR(255) NOT NULL,
    candidate_name VARCHAR(255) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    max_duration_minutes INT DEFAULT 60,
    assigned_problem_ids TEXT[] DEFAULT ARRAY['two-sum', 'valid-anagram', 'longest-substring']
);

-- Index for fast lookup by code and email
CREATE INDEX IF NOT EXISTS idx_oa_access_codes_lookup 
ON public.oa_access_codes (LOWER(code), LOWER(candidate_email));

-- 2. Create oa_submissions table for logging candidate submissions and proctoring events
CREATE TABLE IF NOT EXISTS public.oa_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) REFERENCES public.oa_access_codes(code) ON DELETE CASCADE,
    candidate_email VARCHAR(255) NOT NULL,
    problem_id VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    submission_code TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    pass_count INT NOT NULL,
    total_count INT NOT NULL,
    proctoring_events JSONB,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Policies
ALTER TABLE public.oa_access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oa_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to validate access codes
CREATE POLICY "Allow public verification of access codes" 
ON public.oa_access_codes FOR SELECT 
USING (true);

-- Allow public update to mark access code as used
CREATE POLICY "Allow public marking code as used" 
ON public.oa_access_codes FOR UPDATE 
USING (true);

-- Allow public insertion of new access codes (for admin modal/batch generation)
CREATE POLICY "Allow code creation" 
ON public.oa_access_codes FOR INSERT 
WITH CHECK (true);

-- Allow inserting candidate submissions
CREATE POLICY "Allow public insertion of submissions" 
ON public.oa_submissions FOR INSERT 
WITH CHECK (true);

-- Initial seed access codes for testing
INSERT INTO public.oa_access_codes (code, candidate_name, candidate_email, is_used, max_duration_minutes)
VALUES
    ('HCP-OA-2026', 'HCP Candidate', 'candidate@uw.edu', FALSE, 60),
    ('HCP-DEMO-2026', 'Demo Student', 'demo@uw.edu', FALSE, 45),
    ('UW-CS-2026', 'UW CS Student', 'csstudent@uw.edu', FALSE, 90)
ON CONFLICT (code) DO NOTHING;
