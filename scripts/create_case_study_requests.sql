-- Schema for Supabase: dedicated namespace and table for case-study requests
-- Safe defaults: RLS enabled; no policies created (service role can still access)

BEGIN;

-- Ensure required extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create isolated schema so only this table exists within it for now
CREATE SCHEMA IF NOT EXISTS app;

-- Enum for follow-up preference
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'follow_up_preference' AND n.nspname = 'app'
  ) THEN
    CREATE TYPE app.follow_up_preference AS ENUM ('yes', 'maybe', 'no');
  END IF;
END$$;

-- Primary table to store the modal payload
CREATE TABLE IF NOT EXISTS app.case_study_requests (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Contact Information
  name                 text        NOT NULL,
  email                text        NOT NULL,
  phone                text,
  -- Professional Context
  company              text        NOT NULL,
  role                 text,
  industry             text,
  -- Case Study Interest
  case_study_type      text        NOT NULL,
  specific_interests   text[]      NOT NULL DEFAULT ARRAY[]::text[],
  current_challenges   text,
  -- Engagement
  follow_up            app.follow_up_preference,
  -- Metadata
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  -- Optional request context (if you later capture it)
  ip_address           inet,
  user_agent           text
);

-- Basic integrity checks
ALTER TABLE app.case_study_requests
  ADD CONSTRAINT case_study_requests_email_check
  CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_case_study_requests_created_at
  ON app.case_study_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_case_study_requests_email
  ON app.case_study_requests (lower(email));

CREATE INDEX IF NOT EXISTS idx_case_study_requests_company
  ON app.case_study_requests (lower(company));

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_case_study_requests_set_updated_at ON app.case_study_requests;
CREATE TRIGGER trg_case_study_requests_set_updated_at
BEFORE UPDATE ON app.case_study_requests
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

-- Security: enable RLS and do not grant public access by default
ALTER TABLE app.case_study_requests ENABLE ROW LEVEL SECURITY;

-- Note: The Supabase "service_role" bypasses RLS. Keep policies empty for now so only the service role can access.
-- You can later add policies for authenticated users as needed, e.g. read-only for admins.

COMMENT ON SCHEMA app IS 'Application data schema for SmartSlate';
COMMENT ON TABLE app.case_study_requests IS 'Leads submitted via the Case Study Requests modal';

COMMIT;


