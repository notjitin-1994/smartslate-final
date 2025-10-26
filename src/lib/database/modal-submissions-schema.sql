-- Unified Modal Submissions Table
-- This table stores all modal submissions across the entire website
-- Uses JSONB for flexible, schema-free storage of modal-specific data

CREATE TABLE IF NOT EXISTS modal_submissions (
  -- Primary identification
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Modal type (demo, consultation, case-study, partner, solara, ssa, waitlist, job-application, contact)
  modal_type TEXT NOT NULL,

  -- Common contact information (present in most modals)
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  role TEXT,

  -- Flexible JSON storage for modal-specific data
  -- This allows each modal type to store its unique fields without schema changes
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

  -- Assignment
  assigned_to TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE,

  -- Notes and follow-up
  internal_notes TEXT,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  last_contacted_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Indexes for common queries
  CONSTRAINT modal_submissions_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_modal_submissions_modal_type ON modal_submissions(modal_type);
CREATE INDEX IF NOT EXISTS idx_modal_submissions_email ON modal_submissions(email);
CREATE INDEX IF NOT EXISTS idx_modal_submissions_status ON modal_submissions(status);
CREATE INDEX IF NOT EXISTS idx_modal_submissions_created_at ON modal_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_modal_submissions_priority ON modal_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_modal_submissions_form_data ON modal_submissions USING gin(form_data);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_modal_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_modal_submissions_updated_at
  BEFORE UPDATE ON modal_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_modal_submissions_updated_at();

-- Create a view for quick stats
CREATE OR REPLACE VIEW modal_submissions_stats AS
SELECT
  modal_type,
  status,
  priority,
  COUNT(*) as count,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as last_24h,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7d,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as last_30d
FROM modal_submissions
GROUP BY modal_type, status, priority;

-- Add RLS (Row Level Security) policies
ALTER TABLE modal_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role has full access to modal_submissions"
  ON modal_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to read their own submissions (optional)
CREATE POLICY "Users can read their own submissions"
  ON modal_submissions
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Comments for documentation
COMMENT ON TABLE modal_submissions IS 'Unified table storing all modal form submissions from the website';
COMMENT ON COLUMN modal_submissions.modal_type IS 'Type of modal: demo, consultation, case-study, partner, solara, ssa, waitlist, job-application, contact';
COMMENT ON COLUMN modal_submissions.form_data IS 'JSON object containing modal-specific form data - flexible schema for each modal type';
COMMENT ON COLUMN modal_submissions.status IS 'Current status of the submission in the sales/support pipeline';
COMMENT ON COLUMN modal_submissions.priority IS 'Priority level for follow-up';
