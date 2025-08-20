-- Create ssa_interest_modal table
CREATE TABLE IF NOT EXISTS ssa_interest_modal (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  role TEXT,
  department TEXT,
  company_size TEXT,
  industry TEXT,
  location TEXT,
  current_challenges TEXT,
  skill_gaps TEXT[] DEFAULT '{}',
  existing_lms TEXT,
  current_training_budget TEXT,
  employee_count TEXT,
  target_audience TEXT,
  primary_goals TEXT[] DEFAULT '{}',
  timeline TEXT,
  budget TEXT,
  specific_outcomes TEXT,
  technical_requirements TEXT,
  integration_needs TEXT,
  decision_makers TEXT,
  competing_priorities TEXT,
  success_metrics TEXT,
  how_did_you_hear TEXT,
  additional_notes TEXT,
  privacy_consent BOOLEAN DEFAULT FALSE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create solara_interest_modal table
CREATE TABLE IF NOT EXISTS solara_interest_modal (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT,
  department TEXT,
  company_size TEXT,
  industry TEXT,
  location TEXT,
  current_lms TEXT,
  current_tools TEXT[] DEFAULT '{}',
  learning_challenges TEXT,
  content_creation_process TEXT,
  learner_count TEXT,
  content_volume TEXT,
  primary_use_case TEXT NOT NULL,
  solara_components TEXT[] DEFAULT '{}',
  specific_features TEXT[] DEFAULT '{}',
  integration_needs TEXT[] DEFAULT '{}',
  ai_requirements TEXT[] DEFAULT '{}',
  timeline TEXT,
  budget_range TEXT,
  team_size TEXT,
  decision_makers TEXT,
  implementation_scope TEXT,
  current_pain_points TEXT,
  success_metrics TEXT,
  competitive_analysis TEXT,
  how_did_you_hear TEXT,
  additional_notes TEXT,
  privacy_consent BOOLEAN DEFAULT FALSE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE ssa_interest_modal ENABLE ROW LEVEL SECURITY;
ALTER TABLE solara_interest_modal ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role to insert
CREATE POLICY "Service role can insert ssa_interest_modal" ON ssa_interest_modal
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert solara_interest_modal" ON solara_interest_modal
  FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON ssa_interest_modal TO authenticated;
GRANT ALL ON solara_interest_modal TO authenticated;
GRANT ALL ON ssa_interest_modal TO service_role;
GRANT ALL ON solara_interest_modal TO service_role;
