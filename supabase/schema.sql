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
  date TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Événement',
  description TEXT NOT NULL DEFAULT '',
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
