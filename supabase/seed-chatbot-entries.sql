-- ============================================
-- Morateur 2026 — Données initiales (Chatbot)
-- ============================================

-- Nettoyage préalable (optionnel)
-- DELETE FROM chatbot_entries;

-- =====================
-- 1. Sujets racines
-- =====================

INSERT INTO chatbot_entries (id, question, answer, category, parent_id, link_url, sort_order, is_active) VALUES

-- Le candidat
('c0000000-0000-0000-0000-000000000001',
 'Le candidat',
 'Mathieu Morateur, 36 ans, est un enfant de Bouc-Bel-Air. Ancien adjoint au maire (2014-2020), il est analyste financier spécialisé en délégation de service public. Diplômé de Sciences Po Aix et de l''INSP, il met son expertise au service de sa commune natale.',
 'Candidat', NULL, '/candidat', 1, true),

-- Le programme
('c0000000-0000-0000-0000-000000000002',
 'Le programme',
 'Notre projet repose sur 9 engagements concrets pour redonner à Bouc-Bel-Air le cadre de vie qu''elle mérite. Sécurité, urbanisme maîtrisé, écoles rénovées, démocratie locale renforcée : découvrez nos propositions.',
 'Programme', NULL, '/programme', 2, true),

-- L''élection
('c0000000-0000-0000-0000-000000000003',
 'L''élection',
 'Les élections municipales de Bouc-Bel-Air se tiendront le 15 mars 2026 (1er tour) et le 22 mars 2026 (2nd tour). Chaque voix compte pour l''avenir de notre commune !',
 'Élection', NULL, '/#roadmap', 3, true),

-- Nous rejoindre
('c0000000-0000-0000-0000-000000000004',
 'Nous rejoindre',
 'Plusieurs façons de soutenir notre campagne et de participer à l''aventure collective pour Bouc-Bel-Air !',
 'Engagement', NULL, '/#procuration', 4, true),

-- Nous contacter
('c0000000-0000-0000-0000-000000000005',
 'Nous contacter',
 'Retrouvez-nous sur Instagram (@morateur2026) et Facebook (Morateur 2026). Vous pouvez aussi nous écrire via le formulaire de contact sur le site. Nous sommes à votre écoute !',
 'Contact', NULL, '/#procuration', 5, true),

-- L''équipe
('c0000000-0000-0000-0000-000000000006',
 'L''équipe',
 'Découvrez les membres de notre équipe de campagne, engagés pour l''avenir de Bouc-Bel-Air.',
 'Équipe', NULL, '/equipe', 6, true),

-- Actualités
('c0000000-0000-0000-0000-000000000007',
 'Actualités',
 'Suivez toute l''actualité de notre campagne : événements, rencontres, annonces et prises de position.',
 'Actualités', NULL, '/actualites', 7, true),

-- Presse
('c0000000-0000-0000-0000-000000000008',
 'Presse',
 'Retrouvez les articles de presse et revues médiatiques concernant notre campagne et nos propositions.',
 'Presse', NULL, '/presse', 8, true);

-- =====================
-- 2. Sous-sujets
-- =====================

-- --- Le candidat (enfants) ---
INSERT INTO chatbot_entries (question, answer, category, parent_id, link_url, sort_order, is_active) VALUES
('Son parcours',
 'Natif de Bouc-Bel-Air, Mathieu Morateur a grandi dans cette commune qu''il aime profondément. Diplômé de Sciences Po Aix et de l''INSP (anciennement ENA), il est analyste financier expert en délégation de service public et en mutualisation des moyens. Il a été adjoint au maire de 2014 à 2020.',
 'Candidat', 'c0000000-0000-0000-0000-000000000001', '/candidat', 1, true),

('Sa motivation',
 'Père de jeunes enfants, Mathieu Morateur veut leur permettre de grandir avec les mêmes chances que celles qu''il a eues dans une commune préservée et ambitieuse. Face à l''urbanisation galopante et à la dégradation des équipements, il s''engage pour que Bouc-Bel-Air retrouve son dynamisme.',
 'Candidat', 'c0000000-0000-0000-0000-000000000001', '/candidat', 2, true);

-- --- Le programme (9 engagements) ---
-- Les ancres correspondent aux slugs générés depuis les titres des piliers
INSERT INTO chatbot_entries (question, answer, category, parent_id, link_url, sort_order, is_active) VALUES
('Écoles, crèches et centre aéré',
 'L''état de nos bâtiments scolaires est indigne : fuites, 30°C en mai, 16°C en hiver. Nous lancerons un grand marché de rénovation énergétique pour offrir un éclairage adaptatif et un confort thermique optimal. Ce sont les économies d''énergie qui financeront ces travaux.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#ecoles-creches-et-centre-aere', 1, true),

('Mixité sociale choisie (BRS)',
 'Nous ne construirons que le nécessaire grâce au Bail Réel Solidaire (BRS). Si nous avons besoin de 60 logements pour nos quotas, nous construisons 60 appartements en BRS — pas 60 de plus pour les promoteurs. C''est la fin des grands ensembles imposés et la garantie de familles propriétaires investies dans leur quartier.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#mixite-sociale-choisie-brs', 2, true),

('Référendum local',
 'Tous les projets supérieurs à 1 million d''euros seront soumis à un référendum local. Ils devront recueillir l''approbation de plus de 25% des électeurs inscrits pour être validés. Vous avez réellement la parole !',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#referendum-local', 3, true),

('Réseau 5G communal et caméras',
 'Nous créerons un réseau 5G propre à la commune pour déployer des caméras nomades de vidéoprotection (dont la localisation peut changer rapidement), des capteurs de bruit, de qualité de l''air et d''éclairage intelligent par détection de présence — le tout pour un coût divisé par 10.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#reseau-5g-communal-et-cameras', 4, true),

('Lutte contre les moustiques',
 'Nous lancerons une offensive complète : piégeage et prédateurs naturels dans l''espace public, mobilisation citoyenne pour assécher les gîtes privés, pose de bornes aspirateurs autour des écoles et espaces verts, et tarifs négociés pour les dispositifs à installer chez soi.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#lutte-contre-les-moustiques', 5, true),

('Urbanisation maîtrisée',
 'Nous ferons barrage aux promoteurs : suppression des opérations d''aménagement programmées (OAP), réduction des droits à construire, préemption systématique, retrait des permis récemment octroyés aux promoteurs. Seuls les détachements familiaux seront facilités. Un parc naturel sera créé au vallat de Violesi.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#urbanisation-maitrisee', 6, true),

('6 agents de police supplémentaires',
 'Comment financer 6 agents de terrain sans augmenter vos impôts ? Par des économies : suppression du collaborateur de cabinet (85 000€), baisse des frais de représentation (10 500€), réduction de 5% du budget communication (200 000€), recouvrement effectif de la TLPE (50 000€). Total : 600 000€/an.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#6-agents-de-police-supplementaires', 7, true),

('Gouvernance métropolitaine',
 'Libres de toute allégeance partisane, nous représenterons Bouc-Bel-Air dans les instances métropolitaines et intercommunales en ayant à cœur uniquement les intérêts des Boucains. Notre indépendance politique est notre force.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#gouvernance-metropolitaine', 8, true),

('Fast lanes boucaines',
 'De 7h à 9h et de 16h à 19h, le chemin de Violesi, le chemin des Revenants et le chemin de Sauvecanne seront réservés aux Boucains grâce à des barrières commandées par reconnaissance de plaques enregistrées en mairie. Cela forcera le Département et la Métropole à réaliser les aménagements routiers nécessaires.',
 'Programme', 'c0000000-0000-0000-0000-000000000002', '/programme#fast-lanes-boucaines', 9, true);

-- --- L''élection (enfants) ---
INSERT INTO chatbot_entries (question, answer, category, parent_id, link_url, sort_order, is_active) VALUES
('Dates clés',
 '1er tour : dimanche 15 mars 2026. 2nd tour : dimanche 22 mars 2026. Chaque voix compte pour l''avenir de Bouc-Bel-Air. Mobilisez-vous !',
 'Élection', 'c0000000-0000-0000-0000-000000000003', '/#roadmap', 1, true),

('Faire une procuration',
 'Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un proche sur maprocuration.gouv.fr. C''est simple, rapide, et votre voix comptera quand même !',
 'Élection', 'c0000000-0000-0000-0000-000000000003', '/#procuration', 2, true);

-- --- Nous rejoindre (enfants) ---
INSERT INTO chatbot_entries (question, answer, category, parent_id, link_url, sort_order, is_active) VALUES
('Agir sur le terrain',
 'Rejoignez-nous pour le porte-à-porte, les distributions de tracts et les événements de campagne ! Contactez-nous via les réseaux sociaux ou le formulaire du site pour nous rejoindre sur le terrain.',
 'Engagement', 'c0000000-0000-0000-0000-000000000004', '/#procuration', 1, true),

('Réseaux sociaux',
 'Suivez notre campagne au quotidien ! Instagram : @morateur2026 pour les coulisses et les actualités. Facebook : Morateur 2026 pour rejoindre la communauté et partager nos publications.',
 'Engagement', 'c0000000-0000-0000-0000-000000000004', '/#procuration', 2, true),

('Donner votre avis',
 'Participez aux consultations citoyennes par quartier sur notre site ! Roumanille-Thiers, La Bergerie, La Mounine, Centre Ville... Chaque quartier a ses enjeux, et votre avis compte pour construire notre projet.',
 'Engagement', 'c0000000-0000-0000-0000-000000000004', '/quartiers', 3, true);
