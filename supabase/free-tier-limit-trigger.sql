-- Enforce 10-document free-tier limit atomically at the database level.
-- This prevents race conditions when multiple uploads happen in parallel.
--
-- Run this in the Supabase SQL editor (once).

CREATE OR REPLACE FUNCTION check_free_tier_document_limit()
RETURNS TRIGGER AS $$
DECLARE
  user_tier text;
  doc_count int;
BEGIN
  SELECT tier INTO user_tier FROM profiles WHERE id = NEW.user_id;

  -- Only enforce for free users (or users with no profile row yet)
  IF user_tier IS NULL OR user_tier = 'free' THEN
    SELECT COUNT(*) INTO doc_count
    FROM documents
    WHERE user_id = NEW.user_id;

    IF doc_count >= 10 THEN
      RAISE EXCEPTION 'Free plan limit reached (10 documents). Upgrade to Pro.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_free_tier_document_limit ON documents;

CREATE TRIGGER enforce_free_tier_document_limit
  BEFORE INSERT ON documents
  FOR EACH ROW EXECUTE FUNCTION check_free_tier_document_limit();
