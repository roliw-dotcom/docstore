-- Add inactivity warning tracking to profiles.
-- Run once in the Supabase SQL editor.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS inactivity_warned_at TIMESTAMPTZ;
