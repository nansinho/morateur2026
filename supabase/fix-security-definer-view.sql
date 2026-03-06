-- Fix: Set quartier_stats view to use SECURITY INVOKER instead of SECURITY DEFINER
-- This ensures the view respects RLS policies of the querying user, not the view creator.
-- See: https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view

CREATE OR REPLACE VIEW quartier_stats
WITH (security_invoker = on) AS
SELECT
  q.id AS quartier_id,
  q.slug,
  q.name AS quartier_name,
  COUNT(DISTINCT cs.id) AS total_submissions,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'new') AS new_count,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'read') AS read_count,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'replied') AS replied_count,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'archived') AS archived_count,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.wants_personal_response = true) AS wants_response_count,
  COUNT(DISTINCT cs.id) FILTER (WHERE cs.wants_callback = true) AS wants_callback_count,
  MAX(cs.created_at) AS last_submission_at
FROM quartiers q
LEFT JOIN consultation_submissions cs ON cs.quartier_id = q.id
GROUP BY q.id, q.slug, q.name;
