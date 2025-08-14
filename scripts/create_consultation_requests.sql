-- Schema for Supabase: dedicated table for consultation request submissions
-- Safe defaults: RLS enabled; no policies created (service role can still access)

BEGIN;

-- Ensure required extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create isolated schema so only this table exists within it for now
CREATE SCHEMA IF NOT EXISTS app;

-- Primary table to store the consultation request payload
CREATE TABLE IF NOT EXISTS app.consultation_requests (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Step 1: Contact & Professional Information
  name                 text        NOT NULL,
  email                text        NOT NULL,
  phone                text,
  company              text        NOT NULL,
  role                 text,
  department           text,
  industry             text,
  company_size         text,
  location             text,
  
  -- Step 2: Consultation Preferences & Scheduling
  consultation_type    text        NOT NULL,
  preferred_date       date        NOT NULL,
  preferred_time       text        NOT NULL,
  timezone             text,
  consultation_duration text       DEFAULT '60 minutes',
  attendees_count      integer,
  attendee_roles       text[]      DEFAULT ARRAY[]::text[],
  urgency_level        text        DEFAULT 'normal',
  
  -- Step 3: Business Context & Challenges
  primary_challenge    text        NOT NULL,
  secondary_challenges text[]      DEFAULT ARRAY[]::text[],
  team_size            text,
  budget_range         text,
  timeline             text,
  decision_makers      text,
  implementation_scope text,
  
  -- Step 4: Service Interest & Requirements
  service_interest     text[]      NOT NULL DEFAULT ARRAY[]::text[],
  specific_requirements text[]     DEFAULT ARRAY[]::text[],
  use_case             text,
  integration_needs    text[]      DEFAULT ARRAY[]::text[],
  compliance_needs     text[]      DEFAULT ARRAY[]::text[],
  
  -- Step 5: Current State & Goals
  current_lms          text,
  current_tools        text[]      DEFAULT ARRAY[]::text[],
  learning_goals       text,
  success_metrics      text,
  pain_points          text,
  desired_outcomes     text,
  
  -- Step 6: Additional Context
  how_did_you_hear     text,
  competitive_analysis text,
  additional_notes     text,
  referral_source      text,
  
  -- Metadata
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  -- Optional request context (if you later capture it)
  ip_address           inet,
  user_agent           text,
  -- Lead tracking
  status               text        NOT NULL DEFAULT 'new',
  lead_type            text        NOT NULL DEFAULT 'consultation-request',
  source               text        NOT NULL DEFAULT 'consultation-modal',
  priority             text        DEFAULT 'medium',
  assigned_to          text,
  consultation_scheduled boolean   DEFAULT false,
  consultation_date     timestamptz,
  consultation_notes    text,
  follow_up_required    boolean    DEFAULT false,
  follow_up_date        timestamptz
);

-- Basic integrity checks
ALTER TABLE app.consultation_requests
  ADD CONSTRAINT consultation_requests_email_check
  CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

ALTER TABLE app.consultation_requests
  ADD CONSTRAINT consultation_requests_preferred_date_check
  CHECK (preferred_date > CURRENT_DATE);

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at
  ON app.consultation_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_email
  ON app.consultation_requests (lower(email));

CREATE INDEX IF NOT EXISTS idx_consultation_requests_company
  ON app.consultation_requests (lower(company));

CREATE INDEX IF NOT EXISTS idx_consultation_requests_status
  ON app.consultation_requests (status);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_priority
  ON app.consultation_requests (priority);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_consultation_type
  ON app.consultation_requests (consultation_type);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_preferred_date
  ON app.consultation_requests (preferred_date);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_service_interest
  ON app.consultation_requests USING GIN (service_interest);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_consultation_scheduled
  ON app.consultation_requests (consultation_scheduled);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_urgency_level
  ON app.consultation_requests (urgency_level);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_consultation_requests_set_updated_at ON app.consultation_requests;
CREATE TRIGGER trg_consultation_requests_set_updated_at
BEFORE UPDATE ON app.consultation_requests
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

-- Security: enable RLS and do not grant public access by default
ALTER TABLE app.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Note: The Supabase "service_role" bypasses RLS. Keep policies empty for now so only the service role can access.
-- You can later add policies for authenticated users as needed, e.g. read-only for admins.

COMMENT ON TABLE app.consultation_requests IS 'Consultation requests submitted via the consultation scheduling modal';

COMMIT;
