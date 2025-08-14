-- Create schema and user profiles table for storing editable profile data
-- Uses Supabase Postgres. Aligns with other app tables under the `app` schema.

CREATE SCHEMA IF NOT EXISTS app;

-- Enable pgcrypto for gen_random_uuid if not already enabled (Supabase usually has this)
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS app.user_profiles (
  user_id uuid PRIMARY KEY,
  full_name text,
  company text,
  phone text,
  bio text,
  location text,
  website text,
  twitter text,
  linkedin text,
  github text,
  avatar_path text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Helpful index for potential future queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated_at ON app.user_profiles (updated_at DESC);

-- Update trigger to maintain updated_at
CREATE OR REPLACE FUNCTION app.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_profiles_updated_at ON app.user_profiles;
CREATE TRIGGER trg_user_profiles_updated_at
BEFORE UPDATE ON app.user_profiles
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();


