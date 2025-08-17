-- Create waitlist_leads table for the universal waitlist system
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS waitlist_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Professional Context
  role TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  
  -- Waitlist Details
  source TEXT NOT NULL,
  course_name TEXT,
  interest_level TEXT DEFAULT 'high',
  learning_goals TEXT,
  preferred_start_date TEXT,
  learning_format TEXT,
  experience_level TEXT,
  
  -- Business Context
  team_size TEXT,
  budget_range TEXT,
  timeline TEXT,
  referral_source TEXT,
  
  -- Additional Information
  additional_info TEXT,
  how_did_you_hear TEXT,
  
  -- Analytics
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_source ON waitlist_leads(source);
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_email ON waitlist_leads(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_created_at ON waitlist_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_course_name ON waitlist_leads(course_name);

-- Add comments for documentation
COMMENT ON TABLE waitlist_leads IS 'Universal waitlist system for collecting user interest across all products and courses';
COMMENT ON COLUMN waitlist_leads.source IS 'Source identifier for tracking where the lead came from (e.g., "Homepage Hero", "Course Page - AI Foundations")';
COMMENT ON COLUMN waitlist_leads.course_name IS 'Optional specific course or product name for better context';
COMMENT ON COLUMN waitlist_leads.interest_level IS 'User interest level: very-high, high, medium, low';

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT ALL ON waitlist_leads TO authenticated;
-- GRANT ALL ON waitlist_leads TO service_role;

-- Optional: Enable Row Level Security (RLS) if needed
-- ALTER TABLE waitlist_leads ENABLE ROW LEVEL SECURITY;

-- Optional: Create RLS policies if needed
-- CREATE POLICY "Service role can insert waitlist leads" ON waitlist_leads
--   FOR INSERT TO service_role WITH CHECK (true);

-- CREATE POLICY "Service role can select waitlist leads" ON waitlist_leads
--   FOR SELECT TO service_role USING (true);
