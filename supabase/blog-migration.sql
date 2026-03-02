-- ============================================
-- Migration : Ajout du blog complet aux articles
-- ============================================

-- Slug unique pour les URLs SEO
ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Contenu HTML complet de l'article (éditeur riche)
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT '';

-- Texte alternatif de l'image (accessibilité)
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_alt TEXT NOT NULL DEFAULT '';

-- Méta-description SEO
ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT '';

-- Mots-clés SEO
ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_keywords TEXT NOT NULL DEFAULT '';

-- Index sur le slug pour les requêtes par slug
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
