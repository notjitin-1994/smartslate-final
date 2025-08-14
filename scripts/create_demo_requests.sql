-- Schema for Supabase: dedicated table for demo request submissions
-- Safe defaults: RLS enabled; no policies created (service role can still access)

BEGIN;

-- Ensure required extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create isolated schema so only this table exists within it for now
CREATE SCHEMA IF NOT EXISTS app;

-- Primary table to store the demo request payload
CREATE TABLE IF NOT EXISTS app.demo_requests (
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
  
  -- Step 2: Demo Preferences & Scheduling
  demo_type            text        NOT NULL,
  preferred_date       date        NOT NULL,
  preferred_time       text        NOT NULL,
  timezone             text,
  demo_duration        text        DEFAULT '60 minutes',
  attendees_count      integer,
  attendee_roles       text[]      DEFAULT ARRAY[]::text[],
  
  -- Step 3: Business Context & Challenges
  current_challenges   text,
  team_size            text,
  budget_range         text,
  timeline             text,
  decision_makers      text,
  implementation_scope text,
  
  -- Step 4: Product Interest & Features
  product_interest     text[]      NOT NULL DEFAULT ARRAY[]::text[],
  specific_features    text[]      DEFAULT ARRAY[]::text[],
  use_case             text,
  integration_needs    text[]      DEFAULT ARRAY[]::text[],
  
  -- Step 5: Current State & Requirements
  current_lms          text,
  current_tools        text[]      DEFAULT ARRAY[]::text[],
  learning_goals       text,
  success_metrics      text,
  compliance_needs     text[]      DEFAULT ARRAY[]::text[],
  
  -- Step 6: Additional Context
  how_did_you_hear     text,
  competitive_analysis text,
  additional_notes     text,
  urgency_level        text        DEFAULT 'normal',
  
  -- Metadata
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  -- Optional request context (if you later capture it)
  ip_address           inet,
  user_agent           text,
  -- Lead tracking
  status               text        NOT NULL DEFAULT 'new',
  lead_type            text        NOT NULL DEFAULT 'demo-request',
  source               text        NOT NULL DEFAULT 'demo-modal',
  priority             text        DEFAULT 'medium',
  assigned_to          text,
  demo_scheduled       boolean     DEFAULT false,
  demo_date            timestamptz,
  demo_notes           text
);

-- Basic integrity checks
ALTER TABLE app.demo_requests
  ADD CONSTRAINT demo_requests_email_check
  CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

ALTER TABLE app.demo_requests
  ADD CONSTRAINT demo_requests_preferred_date_check
  CHECK (preferred_date > CURRENT_DATE);

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at
  ON app.demo_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_demo_requests_email
  ON app.demo_requests (lower(email));

CREATE INDEX IF NOT EXISTS idx_demo_requests_company
  ON app.demo_requests (lower(company));

CREATE INDEX IF NOT EXISTS idx_demo_requests_status
  ON app.demo_requests (status);

CREATE INDEX IF NOT EXISTS idx_demo_requests_priority
  ON app.demo_requests (priority);

CREATE INDEX IF NOT EXISTS idx_demo_requests_demo_type
  ON app.demo_requests (demo_type);

CREATE INDEX IF NOT EXISTS idx_demo_requests_preferred_date
  ON app.demo_requests (preferred_date);

CREATE INDEX IF NOT EXISTS idx_demo_requests_product_interest
  ON app.demo_requests USING GIN (product_interest);

CREATE INDEX IF NOT EXISTS idx_demo_requests_demo_scheduled
  ON app.demo_requests (demo_scheduled);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_demo_requests_set_updated_at ON app.demo_requests;
CREATE TRIGGER trg_demo_requests_set_updated_at
BEFORE UPDATE ON app.demo_requests
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

-- Security: enable RLS and do not grant public access by default
ALTER TABLE app.demo_requests ENABLE ROW LEVEL SECURITY;

-- Note: The Supabase "service_role" bypasses RLS. Keep policies empty for now so only the service role can access.
-- You can later add policies for authenticated users as needed, e.g. read-only for admins.

COMMENT ON TABLE app.demo_requests IS 'Demo requests submitted via the demo scheduling modal';

COMMIT;
