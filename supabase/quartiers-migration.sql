-- ============================================
-- MIGRATION QUARTIERS — À coller dans Supabase SQL Editor
-- Exécuter en un seul bloc
-- ============================================

-- ============================================
-- PARTIE 1 : TABLES
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

-- ============================================
-- PARTIE 2 : INDEX
-- ============================================

CREATE INDEX IF NOT EXISTS idx_quartier_questions_quartier ON quartier_questions(quartier_id);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_quartier ON consultation_submissions(quartier_id);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_status ON consultation_submissions(status);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_created ON consultation_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_email ON consultation_submissions(email);
CREATE INDEX IF NOT EXISTS idx_consultation_answers_submission ON consultation_answers(submission_id);
CREATE INDEX IF NOT EXISTS idx_admin_replies_submission ON admin_replies(submission_id);

-- ============================================
-- PARTIE 3 : TRIGGER updated_at
-- ============================================

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

-- ============================================
-- PARTIE 4 : VUE STATS
-- ============================================

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

-- ============================================
-- PARTIE 5 : ROW LEVEL SECURITY
-- ============================================

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

-- ============================================
-- PARTIE 6 : PAGE SEO (quartiers)
-- ============================================

INSERT INTO seo_pages (path, title, description, keywords, og_image) VALUES
('/quartiers', 'Consultations par quartier | Morateur 2026', 'Donnez votre avis sur l''avenir de votre quartier à Bouc-Bel-Air. Participez aux consultations citoyennes.', 'consultations, quartiers, Bouc-Bel-Air, citoyens, avis', '/images/candidat-banner.png')
ON CONFLICT (path) DO NOTHING;

-- ============================================
-- PARTIE 7 : SEED — 10 QUARTIERS
-- ============================================

INSERT INTO quartiers (slug, name, description, closing_image_url, is_active, display_order) VALUES
  ('roumanille', 'Roumanille-Thiers', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 1),
  ('bergerie', 'La Bergerie', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 2),
  ('mounine', 'La Mounine', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 3),
  ('chabauds-malle-pin', 'Chabauds-Malle-Pin', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 4),
  ('salle', 'La Salle', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 5),
  ('violesiroussin', 'Violesi - San Baquis', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '/images/violesi.png', true, 6),
  ('centreville', 'Centre Ville', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 7),
  ('revenants', 'Les Revenants', 'Merci à vous de prendre le temps de répondre aux questions suivantes. Vos réponses nous aideront à mieux comprendre vos attentes.', '', true, 8),
  ('gratiane', 'Gratiane', 'Formulaire à venir.', '', false, 9),
  ('montaury', 'Montaury', 'Formulaire à venir.', '', false, 10);

-- ============================================
-- MIGRATION: Pour les DB existantes
-- ============================================
ALTER TABLE quartiers ADD COLUMN IF NOT EXISTS closing_image_url TEXT NOT NULL DEFAULT '';
UPDATE quartiers SET closing_image_url = '/images/violesi.png' WHERE slug = 'violesiroussin';

-- ============================================
-- PARTIE 8 : SEED — QUESTIONS
-- ============================================

-- Questions : Roumanille-Thiers
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'roumanille'), 1, 'La circulation, tant des voitures que des poids lourds, asphyxie notre quartier. Quelles sont à votre avis les mesures immédiates à prendre pour limiter les nuisances de ce trafic sur votre vie quotidienne ?'),
  ((SELECT id FROM quartiers WHERE slug = 'roumanille'), 2, 'Une orientation d''aménagement programmé a été inscrite au Plan local d''urbanisme intercommunal du 5 décembre 2024, à la demande de la mairie, au lieu-dit Leï Morts. Elle prévoit 150 logements, avec une voie de desserte à sens unique depuis l''avenue Thiers, au niveau de la rue du Petit Lac, débouchant sur le chemin Joseph de Roumanille. Ce projet prend place sur des terrains très régulièrement inondés. Souhaitez-vous que cette orientation d''aménagement programmée soit :'),
  ((SELECT id FROM quartiers WHERE slug = 'roumanille'), 3, 'La requalification de l''Avenue Thiers, préparée en 2019 et budgétisée dès 2020, est à l''arrêt depuis 5 ans. En cause, la décision de ne pas toucher à l''alignement des pins parasol la bordant. Que proposez-vous pour relancer ce projet ?');

-- Questions : La Bergerie
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'bergerie'), 1, 'La circulation automobile asphyxie notre quartier. Et nous devons prévoir, en plus des nuisances de l''IBS, l''afflux de nouveaux habitants à Bel-Ombre sous quelques semaines. Quelles sont à votre avis les mesures immédiates à prendre pour limiter les nuisances de ce trafic sur votre vie quotidienne ?'),
  ((SELECT id FROM quartiers WHERE slug = 'bergerie'), 2, 'Les chemins de la Tuilerie et de Valabre notamment ne sont pas reliés aux réseaux d''adduction d''eau potable et d''assainissement collectif. Des projets d''extension existent. Pensez-vous qu''ils doivent être priorisés ?'),
  ((SELECT id FROM quartiers WHERE slug = 'bergerie'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?'),
  ((SELECT id FROM quartiers WHERE slug = 'bergerie'), 4, 'L''avenue Beausoleil concentre les flux de voitures venant du quartier. Il est à présent possible d''y créer une voie verte et des feux de circulation intelligents. Quelles seraient vos suggestions à ce sujet ?');

-- Questions : La Mounine
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'mounine'), 1, 'La circulation automobile asphyxie notre quartier. Et nous devons prévoir, en plus des nuisances actuelles, l''afflux de nouveaux habitants à Bel-Ombre sous quelques semaines. Quelles sont à votre avis les mesures immédiates à prendre pour limiter les nuisances de ce trafic sur votre vie quotidienne ?'),
  ((SELECT id FROM quartiers WHERE slug = 'mounine'), 2, 'Les voies de l''avenue Maréchal de Lattre de Tassigny et la place formée par l''avenue Maréchal Leclerc doivent impérativement être refaites. Il est absolument nécessaire d''intégrer à ce projet les travaux de raccordement à l''eau potable du lotissement Rhin et Danube. De plus, un risque d''inondation existe dans le quartier et la place Maréchal Leclerc sert de bassin de rétention des eaux de pluie. Pensez-vous comme nous que ce projet d''ensemble doit être priorisé à l''échelle de la commune ?'),
  ((SELECT id FROM quartiers WHERE slug = 'mounine'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?'),
  ((SELECT id FROM quartiers WHERE slug = 'mounine'), 4, 'L''avenue de la Mounine concentre les flux de voitures venant du quartier. Il est à présent possible d''y créer une voie verte et de rendre les feux de circulation intelligents, notamment de les activer uniquement si le nombre de véhicules l''impose. Quelles seraient vos suggestions à ce sujet ?');

-- Questions : Chabauds-Malle-Pin
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'chabauds-malle-pin'), 1, 'Le camping de la Malle est destiné, d''après le plan local d''urbanisme, à être remplacé par un immense projet immobilier de 400 logements, en plus bureaux. Les routes et l''ensemble des réseaux publics du quartier ne sont pas du tout adaptés à une population de cette ampleur ! Aussi, nous estimons que nous devons ramener ce projet à une taille plus raisonnable d''environ 200 logements, s''ils étaient tous réalisés en accession sociale à la propriété, cela pourrait couvrir plus de 3 ans d''obligations de création de logements sociaux pour l''ensemble de la commune.'),
  ((SELECT id FROM quartiers WHERE slug = 'chabauds-malle-pin'), 2, 'Le permis de construire du datacenter a été octroyé le 22 janvier par Mathieu Pietri, se faisant la mairie se retrouve sans argument pour imposer d''éventuelles adaptations de nature à protéger les riverains des nuisances. Nous refuserons ce permis, qui est frappé d''illégalité puisque les projets de cette puissance installée doivent prévoir depuis le 1er octobre un dispositif de valorisation de la chaleur, ce que le datacenter MRS6 ne fait pas.'),
  ((SELECT id FROM quartiers WHERE slug = 'chabauds-malle-pin'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?'),
  ((SELECT id FROM quartiers WHERE slug = 'chabauds-malle-pin'), 4, 'Nous estimons que la collectivité doit s''engager à un programme de lutte contre les nuisibles fort et clair, comprenant des mesures actives dans l''espace public comme la pose de pièges à rats et d''aspirateurs à moustiques, un accompagnement des mesures individuelles dans le jardin avec des tarifs négociés pour les dispositifs à placer dans les jardins, et des mesures coercitives lorsque les habitants laissent s''installer des troubles à la salubrité (eaux stagnantes permettant la prolifération de moustiques et ordures dans les jardins permettant celles des rats).');

-- Questions : La Salle
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'salle'), 1, 'La bétonnisation, entérinée par le plan local d''urbanisme approuvé par la municipalité sortante, est en passe de toucher le quartier de la Salle au niveau des champs cultivés de Castel Régina. Ce projet, appelé La Salle Ouest, prévoit 70 logements. Il fait partie des projets que nous pourrons supprimer, car nous imposerons sur la commune une règle simple : afin de limiter la construction de nouveaux logements au nombre strictement nécessaire pour atteindre les objectifs de création de logements sociaux (170 tous les 3 ans), tous les projets immobiliers collectifs seront proposés en bail réel solidaire, c''est-à-dire en accession sociale à la propriété (et non en locatif social). Pour produire ces 170 logements en 3 ans, plutôt que les 1000 aujourd''hui projetés, ce projet de Castel Régina n''est pas nécessaire, ni aujourd''hui, ni d''ici les 2 prochains mandats. Aussi nous le supprimerons. Qu''en pensez-vous ?'),
  ((SELECT id FROM quartiers WHERE slug = 'salle'), 2, 'Le centre commercial de la Salle sera revitalisé par une politique d''animation commerciale portée par la municipalité, avec animations saisonnières véhiculées notamment par la future application de la mairie.'),
  ((SELECT id FROM quartiers WHERE slug = 'salle'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?'),
  ((SELECT id FROM quartiers WHERE slug = 'salle'), 4, 'La lutte contre la prolifération des moustiques dans le quartier passe par le traitement des berges du vallat chaque printemps, et par la pose et la maintenance de bornes aspirateurs à moustiques autour des points stratégiques (écoles et espaces verts).');

-- Questions : Violesi - San Baquis (Q1 avec image)
INSERT INTO quartier_questions (quartier_id, question_number, question_text, question_image_url) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'violesiroussin'), 1, 'Les quartiers de Violesi et Montaury sont prévus, par le plan local d''urbanisme intercommunal approuvé par la municipalité sortante, pour accueillir 1200 nouveaux logements. C''est largement supérieur aux obligations de constructions de logements sociaux, qui se montent à 760 logements, répartis sur de nombreuses années. Aussi, parce que la RD8n est déjà bien trop saturée, nous estimons que le PLUi doit être revu pour sanctuariser le lit du vallat de Violesi afin d''y créer un véritable parc arboré enjambant le cours d''eau.', 'https://morateur2026.fr/images/violesi.png');
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'violesiroussin'), 2, 'L''avenue André Roussin est à l''abandon. Nous proposons un plan en 2 étapes : tout d''abord, la sécurisation immédiate des traversées avec des feux asservis sur 2 emplacements. Ensuite, le lancement de la déclaration d''utilité publique pour initier le projet de réfection de la chaussée et de création d''un trottoir, en prévoyant les réseaux humides là où ils manquent, qui pourra être achevé avant la fin du mandat.'),
  ((SELECT id FROM quartiers WHERE slug = 'violesiroussin'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?'),
  ((SELECT id FROM quartiers WHERE slug = 'violesiroussin'), 4, 'La lutte contre la prolifération des moustiques dans le quartier passe par le traitement des berges du vallat chaque printemps, et par la pose et la maintenance de bornes aspirateurs à moustiques autour des points stratégiques. De plus, nous proposerons un tarif négocié pour les bornes aspirateurs à moustiques à installer chez soi.');

-- Questions : Centre Ville
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'centreville'), 1, 'Le dernier terrain libre du centre ville est voué, d''après le plan local d''urbanisme approuvé par la municipalité sortante, à être entièrement urbanisé par un mix de logements en étages (jusqu''à 3 étages) et de commerces et services en rez-de-chaussée. Nous estimons que cet espace doit au contraire accueillir une vingtaine de logements tout au plus, et un parc-relais pour les véhicules, permettant le stationnement et facilitant le covoiturage. Quelle orientation préférez-vous ?'),
  ((SELECT id FROM quartiers WHERE slug = 'centreville'), 2, 'Nous souhaitons d''une part revitaliser l''attractivité du village en proposant à des jeunes entreprises de l''artisanat de bouche (chocolatier, glacier, salon de thés...) d''être hébergées dans un des locaux vides du village, assorti d''une autorisation de terrasse. D''autre part, nous vous proposons de remodeler la place Jean Moulin, en construisant à la place de l''ancien Saint-Géran un immeuble de bureau accueillant en rez-de-chaussée un véritable boulanger, avec un fournil. Qu''en pensez-vous ?'),
  ((SELECT id FROM quartiers WHERE slug = 'centreville'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?');

-- Questions : Les Revenants
INSERT INTO quartier_questions (quartier_id, question_number, question_text) VALUES
  ((SELECT id FROM quartiers WHERE slug = 'revenants'), 1, 'La circulation automobile asphyxie notre commune. Et, à courte échéance puisqu''il est prévu dans l''orientation d''aménagement programmée de San Banquis actuellement à l''étape de l''évaluation environnementale préfectorale, il est prévu qu''un demi-échangeur déboule de l''A51 au niveau de la Croix d''Or. Objectif affiché : reporter du trafic depuis les 2 sorties adjacentes des Chabauds et des Trois Pigeons. C''est une conséquence directe de la politique d''urbanisme : il est évident qu''avec les 600 logements en cours d''instruction à Violesi et les 350 à la Malle, la partie sud de la RD8n doit être soulagée. Cependant, cela rabatrait aussi une partie du flux des Trois Pigeons vers la zone des Milles, annulant par avance toute amélioration qui pourrait être obtenue dans la gestion de ce giratoire traversé par la limite communale entre Bouc et Aix. De plus, dans une partie nord de la RD8n plus embouteillée que jamais, le chemin des Revenants deviendrait encore bien davantage qu''aujourd''hui une voie de délestage pour les automobilistes pressés. Aussi, d''après vous, que devons-nous prioriser dans ce dossier ?'),
  ((SELECT id FROM quartiers WHERE slug = 'revenants'), 2, 'Un mur anti-bruit a été érigé il y a maintenant deux décennies du côté des Ormeaux (à droite en roulant vers Aix). Les Revenants étant le quartier le plus exposé au bruit à Bouc-Bel-Air, nous souhaitons créer un tel mur anti-bruit de l''autre côté.'),
  ((SELECT id FROM quartiers WHERE slug = 'revenants'), 3, 'La création de réseaux 5G propres à la mairie permet d''envisager aujourd''hui la pose de caméras et de capteurs de bruit (afin d''intervenir pour les troubles à la tranquillité) et de qualité de l''air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l''éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?');
