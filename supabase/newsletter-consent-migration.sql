-- Migration: Add consent_date column to newsletter_subscribers
-- Required for RGPD compliance (stores when user explicitly consented)
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS consent_date TIMESTAMPTZ;
