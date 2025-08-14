-- Schema for Supabase: dedicated table for Solara interest modal submissions
-- Safe defaults: RLS enabled; no policies created (service role can still access)

BEGIN;

-- Ensure required extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create isolated schema so only this table exists within it for now
CREATE SCHEMA IF NOT EXISTS app;

-- Primary table to store the Solara modal payload
CREATE TABLE IF NOT EXISTS app.solara_interest_modal (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Step 1: Contact & Professional Information
  name                 text        NOT NULL,
  email                text        NOT NULL,
  phone                text,
  company              text,
  role                 text,
  department           text,
  company_size         text,
  industry             text,
  location             text,
  
  -- Step 2: Current Learning Infrastructure
  current_lms          text,
  current_tools        text[]      DEFAULT ARRAY[]::text[],
  learning_challenges  text,
  content_creation_process text,
  learner_count        text,
  content_volume       text,
  
  -- Step 3: Solara Interest & Use Cases
  primary_use_case     text        NOT NULL,
  solara_components    text[]      NOT NULL DEFAULT ARRAY[]::text[],
  specific_features    text[]      DEFAULT ARRAY[]::text[],
  integration_needs    text[]      DEFAULT ARRAY[]::text[],
  ai_requirements      text[]      DEFAULT ARRAY[]::text[],
  
  -- Step 4: Implementation & Timeline
  timeline             text,
  budget_range         text,
  team_size            text,
  decision_makers      text,
  implementation_scope text,
  
  -- Step 5: Additional Context
  current_pain_points  text,
  success_metrics      text,
  competitive_analysis text,
  how_did_you_hear     text,
  additional_notes     text,
  
  -- Metadata
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  -- Optional request context (if you later capture it)
  ip_address           inet,
  user_agent           text,
  -- Lead tracking
  status               text        NOT NULL DEFAULT 'new',
  lead_type            text        NOT NULL DEFAULT 'solara-interest',
  source               text        NOT NULL DEFAULT 'solara-modal',
  priority             text        DEFAULT 'medium'
);

-- Basic integrity checks
ALTER TABLE app.solara_interest_modal
  ADD CONSTRAINT solara_interest_modal_email_check
  CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_created_at
  ON app.solara_interest_modal (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_email
  ON app.solara_interest_modal (lower(email));

CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_company
  ON app.solara_interest_modal (lower(company));

CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_status
  ON app.solara_interest_modal (status);

CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_priority
  ON app.solara_interest_modal (priority);

CREATE INDEX IF NOT EXISTS idx_solara_interest_modal_primary_use_case
  ON app.solara_interest_modal (primary_use_case);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_solara_interest_modal_set_updated_at ON app.solara_interest_modal;
CREATE TRIGGER trg_solara_interest_modal_set_updated_at
BEFORE UPDATE ON app.solara_interest_modal
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

-- Security: enable RLS and do not grant public access by default
ALTER TABLE app.solara_interest_modal ENABLE ROW LEVEL SECURITY;

-- Note: The Supabase "service_role" bypasses RLS. Keep policies empty for now so only the service role can access.
-- You can later add policies for authenticated users as needed, e.g. read-only for admins.

COMMENT ON TABLE app.solara_interest_modal IS 'Leads submitted via the Solara Interest Modal for AI-powered learning platform';

COMMIT;
