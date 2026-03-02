-- ============================================
-- Morateur 2026 — Schéma de base de données
-- ============================================

-- Messages de contact
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  tel TEXT NOT NULL,
  motivations TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Articles / Actualités
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  date TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  image_alt TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Événement',
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Piliers du programme
CREATE TABLE IF NOT EXISTS programme_pillars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  intro TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'ShieldCheck',
  color TEXT NOT NULL DEFAULT 'border-campaign-lime/30',
  icon_bg TEXT NOT NULL DEFAULT 'gradient-lime',
  sort_order INTEGER DEFAULT 0
);

-- Mesures du programme
CREATE TABLE IF NOT EXISTS programme_measures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pillar_id UUID NOT NULL REFERENCES programme_pillars(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- Événements / Roadmap
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'Flag',
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  is_done BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Membres de l'équipe
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- Articles de presse
CREATE TABLE IF NOT EXISTS press_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- Pages SEO
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  keywords TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT ''
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_measures ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- Messages : insertion publique (formulaire de contact), lecture/modification admin uniquement
CREATE POLICY "Permettre l'insertion publique de messages" ON messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin : lecture des messages" ON messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin : modification des messages" ON messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression des messages" ON messages FOR DELETE TO authenticated USING (true);

-- Contenu public : lecture pour tous, modification admin
-- Articles
CREATE POLICY "Lecture publique des articles" ON articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion d'articles" ON articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification d'articles" ON articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression d'articles" ON articles FOR DELETE TO authenticated USING (true);

-- Programme piliers
CREATE POLICY "Lecture publique des piliers" ON programme_pillars FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de piliers" ON programme_pillars FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de piliers" ON programme_pillars FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de piliers" ON programme_pillars FOR DELETE TO authenticated USING (true);

-- Programme mesures
CREATE POLICY "Lecture publique des mesures" ON programme_measures FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de mesures" ON programme_measures FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de mesures" ON programme_measures FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de mesures" ON programme_measures FOR DELETE TO authenticated USING (true);

-- Événements
CREATE POLICY "Lecture publique des événements" ON events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion d'événements" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification d'événements" ON events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression d'événements" ON events FOR DELETE TO authenticated USING (true);

-- Équipe
CREATE POLICY "Lecture publique de l'équipe" ON team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de membres" ON team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de membres" ON team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de membres" ON team_members FOR DELETE TO authenticated USING (true);

-- Presse
CREATE POLICY "Lecture publique de la presse" ON press_articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de presse" ON press_articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de presse" ON press_articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de presse" ON press_articles FOR DELETE TO authenticated USING (true);

-- SEO
CREATE POLICY "Lecture publique du SEO" ON seo_pages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion SEO" ON seo_pages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification SEO" ON seo_pages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression SEO" ON seo_pages FOR DELETE TO authenticated USING (true);

-- ============================================
-- Consultations citoyennes par quartier
-- ============================================

-- Quartiers
CREATE TABLE IF NOT EXISTS quartiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  closing_image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Questions par quartier
CREATE TABLE IF NOT EXISTS quartier_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quartier_id UUID NOT NULL REFERENCES quartiers(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(quartier_id, question_number)
);

-- Soumissions de consultation (1 ligne = 1 citoyen qui soumet le formulaire)
CREATE TABLE IF NOT EXISTS consultation_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quartier_id UUID NOT NULL REFERENCES quartiers(id) ON DELETE RESTRICT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  wants_personal_response BOOLEAN DEFAULT false,
  wants_callback BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  admin_notes TEXT NOT NULL DEFAULT '',
  replied_at TIMESTAMPTZ,
  replied_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Réponses aux questions (1 ligne = 1 réponse à 1 question)
CREATE TABLE IF NOT EXISTS consultation_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES consultation_submissions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES quartier_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(submission_id, question_id)
);

-- Réponses admin envoyées aux citoyens (piste d'audit)
CREATE TABLE IF NOT EXISTS admin_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES consultation_submissions(id) ON DELETE CASCADE,
  reply_text TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  sent_by TEXT NOT NULL DEFAULT ''
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_quartier_questions_quartier ON quartier_questions(quartier_id);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_quartier ON consultation_submissions(quartier_id);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_status ON consultation_submissions(status);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_created ON consultation_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_email ON consultation_submissions(email);
CREATE INDEX IF NOT EXISTS idx_consultation_answers_submission ON consultation_answers(submission_id);
CREATE INDEX IF NOT EXISTS idx_admin_replies_submission ON admin_replies(submission_id);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_quartiers_updated_at
  BEFORE UPDATE ON quartiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_consultation_submissions_updated_at
  BEFORE UPDATE ON consultation_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Vue stats pour le dashboard admin
CREATE OR REPLACE VIEW quartier_stats AS
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

-- RLS : Quartiers & Consultations
ALTER TABLE quartiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quartier_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_replies ENABLE ROW LEVEL SECURITY;

-- Quartiers : lecture publique, écriture admin
CREATE POLICY "Lecture publique des quartiers" ON quartiers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de quartiers" ON quartiers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de quartiers" ON quartiers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de quartiers" ON quartiers FOR DELETE TO authenticated USING (true);

-- Questions : lecture publique, écriture admin
CREATE POLICY "Lecture publique des questions" ON quartier_questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin : insertion de questions" ON quartier_questions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin : modification de questions" ON quartier_questions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression de questions" ON quartier_questions FOR DELETE TO authenticated USING (true);

-- Soumissions : insertion publique (formulaire), lecture/modification admin
CREATE POLICY "Insertion publique de consultations" ON consultation_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin : lecture des consultations" ON consultation_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin : modification des consultations" ON consultation_submissions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin : suppression des consultations" ON consultation_submissions FOR DELETE TO authenticated USING (true);

-- Réponses aux questions : insertion publique, lecture admin
CREATE POLICY "Insertion publique de reponses consultation" ON consultation_answers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin : lecture des reponses consultation" ON consultation_answers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin : suppression des reponses consultation" ON consultation_answers FOR DELETE TO authenticated USING (true);

-- Réponses admin : authentifié uniquement
CREATE POLICY "Admin : lecture des reponses admin" ON admin_replies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin : insertion de reponses admin" ON admin_replies FOR INSERT TO authenticated WITH CHECK (true);
