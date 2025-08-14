-- Schema for Supabase: dedicated table for SSA interest modal submissions
-- Safe defaults: RLS enabled; no policies created (service role can still access)

BEGIN;

-- Ensure required extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create isolated schema so only this table exists within it for now
CREATE SCHEMA IF NOT EXISTS app;

-- Primary table to store the SSA modal payload
CREATE TABLE IF NOT EXISTS app.ssa_interest_modal (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Step 1: Contact & Company Information
  name                 text        NOT NULL,
  email                text        NOT NULL,
  phone                text        NOT NULL,
  company              text        NOT NULL,
  role                 text        NOT NULL,
  department           text,
  company_size         text        NOT NULL,
  industry             text        NOT NULL,
  location             text,
  
  -- Step 2: Current State & Challenges
  current_challenges   text        NOT NULL,
  skill_gaps           text[]      NOT NULL DEFAULT ARRAY[]::text[],
  existing_lms         text,
  current_training_budget text,
  employee_count       text,
  target_audience      text        NOT NULL,
  
  -- Step 3: SSA Requirements & Goals
  primary_goals        text[]      NOT NULL DEFAULT ARRAY[]::text[],
  timeline             text        NOT NULL,
  budget               text,
  specific_outcomes    text        NOT NULL,
  technical_requirements text,
  integration_needs    text,
  
  -- Step 4: Additional Context
  decision_makers      text,
  competing_priorities text,
  success_metrics      text,
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
  lead_type            text        NOT NULL DEFAULT 'enterprise-ssa',
  source               text        NOT NULL DEFAULT 'ssa-modal'
);

-- Basic integrity checks
ALTER TABLE app.ssa_interest_modal
  ADD CONSTRAINT ssa_interest_modal_email_check
  CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_ssa_interest_modal_created_at
  ON app.ssa_interest_modal (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ssa_interest_modal_email
  ON app.ssa_interest_modal (lower(email));

CREATE INDEX IF NOT EXISTS idx_ssa_interest_modal_company
  ON app.ssa_interest_modal (lower(company));

CREATE INDEX IF NOT EXISTS idx_ssa_interest_modal_status
  ON app.ssa_interest_modal (status);

CREATE INDEX IF NOT EXISTS idx_ssa_interest_modal_industry
  ON app.ssa_interest_modal (industry);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ssa_interest_modal_set_updated_at ON app.ssa_interest_modal;
CREATE TRIGGER trg_ssa_interest_modal_set_updated_at
BEFORE UPDATE ON app.ssa_interest_modal
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

-- Security: enable RLS and do not grant public access by default
ALTER TABLE app.ssa_interest_modal ENABLE ROW LEVEL SECURITY;

-- Note: The Supabase "service_role" bypasses RLS. Keep policies empty for now so only the service role can access.
-- You can later add policies for authenticated users as needed, e.g. read-only for admins.

COMMENT ON TABLE app.ssa_interest_modal IS 'Leads submitted via the SSA Interest Modal for Strategic Skills Architecture consultations';

COMMIT;
