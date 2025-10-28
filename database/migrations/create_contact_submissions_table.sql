-- Create contact_submissions table to store all contact form submissions
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Create index on inquiry_type for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry_type ON contact_submissions(inquiry_type);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert
CREATE POLICY "Service role can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read
CREATE POLICY "Service role can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores all contact form submissions from the website';
COMMENT ON COLUMN contact_submissions.inquiry_type IS 'Type of inquiry: general, sales, support, partnership, etc.';
COMMENT ON COLUMN contact_submissions.ip_address IS 'IP address of the submitter for spam prevention';
COMMENT ON COLUMN contact_submissions.user_agent IS 'Browser/device information of the submitter';
