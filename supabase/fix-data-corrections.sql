-- ============================================
-- Fix: Corrections de données (mars 2026)
-- ============================================

-- 1. Corriger la date du meeting public : "8 mars 2026" au lieu de "Mars 2026"
UPDATE events
SET date = '8 mars 2026'
WHERE title = 'Meetings publics';

-- 2. Remplacer l'image cassée de l'article Smart City 5G
UPDATE articles
SET image = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop'
WHERE slug = 'smart-city-5g-cameras-capteurs';
