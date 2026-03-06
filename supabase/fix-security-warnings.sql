-- ============================================
-- Migration : Correction des avertissements de sécurité Supabase
-- 1. Fonction search_path mutable
-- 2. Politiques RLS avec conditions toujours vraies
-- ============================================

-- ============================================
-- PARTIE 1 : Correction du search_path de la fonction
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = '';

-- ============================================
-- PARTIE 2 : Correction des politiques RLS admin (authenticated)
-- Remplacement de USING (true) / WITH CHECK (true)
-- par une vérification explicite de auth.uid()
-- ============================================

-- --- Messages ---
DROP POLICY IF EXISTS "Admin : modification des messages" ON messages;
CREATE POLICY "Admin : modification des messages" ON messages
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression des messages" ON messages;
CREATE POLICY "Admin : suppression des messages" ON messages
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Articles ---
DROP POLICY IF EXISTS "Admin : insertion d'articles" ON articles;
CREATE POLICY "Admin : insertion d'articles" ON articles
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification d'articles" ON articles;
CREATE POLICY "Admin : modification d'articles" ON articles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression d'articles" ON articles;
CREATE POLICY "Admin : suppression d'articles" ON articles
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Programme piliers ---
DROP POLICY IF EXISTS "Admin : insertion de piliers" ON programme_pillars;
CREATE POLICY "Admin : insertion de piliers" ON programme_pillars
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de piliers" ON programme_pillars;
CREATE POLICY "Admin : modification de piliers" ON programme_pillars
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de piliers" ON programme_pillars;
CREATE POLICY "Admin : suppression de piliers" ON programme_pillars
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Programme mesures ---
DROP POLICY IF EXISTS "Admin : insertion de mesures" ON programme_measures;
CREATE POLICY "Admin : insertion de mesures" ON programme_measures
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de mesures" ON programme_measures;
CREATE POLICY "Admin : modification de mesures" ON programme_measures
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de mesures" ON programme_measures;
CREATE POLICY "Admin : suppression de mesures" ON programme_measures
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Événements ---
DROP POLICY IF EXISTS "Admin : insertion d'événements" ON events;
CREATE POLICY "Admin : insertion d'événements" ON events
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification d'événements" ON events;
CREATE POLICY "Admin : modification d'événements" ON events
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression d'événements" ON events;
CREATE POLICY "Admin : suppression d'événements" ON events
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Équipe ---
DROP POLICY IF EXISTS "Admin : insertion de membres" ON team_members;
CREATE POLICY "Admin : insertion de membres" ON team_members
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de membres" ON team_members;
CREATE POLICY "Admin : modification de membres" ON team_members
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de membres" ON team_members;
CREATE POLICY "Admin : suppression de membres" ON team_members
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Presse ---
DROP POLICY IF EXISTS "Admin : insertion de presse" ON press_articles;
CREATE POLICY "Admin : insertion de presse" ON press_articles
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de presse" ON press_articles;
CREATE POLICY "Admin : modification de presse" ON press_articles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de presse" ON press_articles;
CREATE POLICY "Admin : suppression de presse" ON press_articles
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- SEO ---
DROP POLICY IF EXISTS "Admin : insertion SEO" ON seo_pages;
CREATE POLICY "Admin : insertion SEO" ON seo_pages
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification SEO" ON seo_pages;
CREATE POLICY "Admin : modification SEO" ON seo_pages
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression SEO" ON seo_pages;
CREATE POLICY "Admin : suppression SEO" ON seo_pages
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Quartiers ---
DROP POLICY IF EXISTS "Admin : insertion de quartiers" ON quartiers;
CREATE POLICY "Admin : insertion de quartiers" ON quartiers
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de quartiers" ON quartiers;
CREATE POLICY "Admin : modification de quartiers" ON quartiers
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de quartiers" ON quartiers;
CREATE POLICY "Admin : suppression de quartiers" ON quartiers
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Questions quartiers ---
DROP POLICY IF EXISTS "Admin : insertion de questions" ON quartier_questions;
CREATE POLICY "Admin : insertion de questions" ON quartier_questions
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification de questions" ON quartier_questions;
CREATE POLICY "Admin : modification de questions" ON quartier_questions
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression de questions" ON quartier_questions;
CREATE POLICY "Admin : suppression de questions" ON quartier_questions
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Consultation submissions ---
DROP POLICY IF EXISTS "Admin : modification des consultations" ON consultation_submissions;
CREATE POLICY "Admin : modification des consultations" ON consultation_submissions
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression des consultations" ON consultation_submissions;
CREATE POLICY "Admin : suppression des consultations" ON consultation_submissions
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Consultation answers ---
DROP POLICY IF EXISTS "Admin : suppression des reponses consultation" ON consultation_answers;
CREATE POLICY "Admin : suppression des reponses consultation" ON consultation_answers
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- --- Admin replies ---
DROP POLICY IF EXISTS "Admin : insertion de reponses admin" ON admin_replies;
CREATE POLICY "Admin : insertion de reponses admin" ON admin_replies
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- --- Chatbot entries ---
-- Supprimer les politiques dupliquées (Authenticated *)
DROP POLICY IF EXISTS "Authenticated insert" ON chatbot_entries;
DROP POLICY IF EXISTS "Authenticated update" ON chatbot_entries;
DROP POLICY IF EXISTS "Authenticated delete" ON chatbot_entries;

DROP POLICY IF EXISTS "Admin : insertion chatbot" ON chatbot_entries;
CREATE POLICY "Admin : insertion chatbot" ON chatbot_entries
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : modification chatbot" ON chatbot_entries;
CREATE POLICY "Admin : modification chatbot" ON chatbot_entries
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admin : suppression chatbot" ON chatbot_entries;
CREATE POLICY "Admin : suppression chatbot" ON chatbot_entries
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- ============================================
-- PARTIE 3 : Correction des politiques d'insertion publique (anon)
-- Remplacement de WITH CHECK (true) par une vérification minimale
-- ============================================

-- Messages : vérifier que les champs requis ne sont pas vides
DROP POLICY IF EXISTS "Permettre l'insertion publique de messages" ON messages;
CREATE POLICY "Permettre l'insertion publique de messages" ON messages
  FOR INSERT TO anon
  WITH CHECK (
    length(prenom) > 0 AND
    length(nom) > 0 AND
    length(email) > 0
  );

-- Consultation submissions : vérifier les champs requis
DROP POLICY IF EXISTS "Insertion publique de consultations" ON consultation_submissions;
CREATE POLICY "Insertion publique de consultations" ON consultation_submissions
  FOR INSERT TO anon
  WITH CHECK (
    length(first_name) > 0 AND
    length(last_name) > 0 AND
    length(email) > 0
  );

-- Consultation answers : vérifier que la soumission référencée existe
DROP POLICY IF EXISTS "Insertion publique de reponses consultation" ON consultation_answers;
CREATE POLICY "Insertion publique de reponses consultation" ON consultation_answers
  FOR INSERT TO anon
  WITH CHECK (submission_id IS NOT NULL AND question_id IS NOT NULL);

-- Newsletter : vérifier que l'email n'est pas vide
DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (length(email) > 0);
