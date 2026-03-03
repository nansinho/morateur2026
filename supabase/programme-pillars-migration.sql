-- ============================================
-- Migration : 9 engagements du programme
-- Remplace les anciens piliers par les 9 engagements du circulaire
-- À exécuter via l'éditeur SQL de Supabase
-- ============================================

BEGIN;

-- 1. Supprimer les anciens piliers et mesures (CASCADE supprime les mesures liées)
DELETE FROM programme_measures;
DELETE FROM programme_pillars;

-- 2. Insérer les 9 piliers (engagements du circulaire)
INSERT INTO programme_pillars (id, title, intro, icon, color, icon_bg, sort_order) VALUES
('a1000000-0000-0000-0000-000000000001', 'Écoles, crèches & centre aéré : le refus du nivellement par le bas', 'L''état de nos bâtiments municipaux dévolus à l''accueil des enfants est indigne d''une commune comme la nôtre. Miser sur l''éclairage adaptatif et le confort thermique en classe, été comme hiver.', 'GraduationCap', 'border-campaign-lime/30', 'gradient-lime', 1),
('a1000000-0000-0000-0000-000000000002', 'Une mixité sociale choisie & non subie', 'Nous n''accepterons pas de nouveaux logements locatifs sociaux. Toute nouvelle construction collective sera commercialisée en bail réel solidaire (BRS) : nous ne construisons que le nécessaire.', 'Heart', 'border-campaign-steel/30', 'gradient-teal', 2),
('a1000000-0000-0000-0000-000000000003', 'Vous avez, réellement, la parole !', 'Tous les projets supérieurs à 1M€ d''engagement seront soumis à référendum local, et devront dépasser 25% des électeurs inscrits les approuvant.', 'Megaphone', 'border-campaign-olive/30', 'bg-campaign-olive', 3),
('a1000000-0000-0000-0000-000000000004', 'Un réseau 5G communal pour déployer capteurs & caméras nomades', 'Créer un réseau 5G propre à la commune pour renvoyer les images et informations captées par des caméras nomades, dont la localisation peut être modifiée de manière réactive.', 'Wifi', 'border-campaign-teal/30', 'gradient-teal-deep', 4),
('a1000000-0000-0000-0000-000000000005', 'Lutte contre les moustiques & les nuisibles', 'Pour vaincre le moustique, nous devrons lancer une offensive savante : exemplarité totale sur l''espace public et mobilisation massive des citoyens pour assécher les gîtes privés.', 'Leaf', 'border-campaign-lime/30', 'gradient-lime', 5),
('a1000000-0000-0000-0000-000000000006', 'Lutte contre l''urbanisation galopante', 'Nous ferons barrage aux promoteurs immobiliers avec tous les moyens à disposition de la puissance publique. Seuls les détachements familiaux seront facilités.', 'ShieldCheck', 'border-campaign-steel/30', 'gradient-teal', 6),
('a1000000-0000-0000-0000-000000000007', '6 agents de terrains supplémentaires à la police municipale', 'Comment financer 6 agents de terrain, sans augmenter vos impôts ? Par des économies sur le train de vie municipal. Total : 600 000€ par an.', 'Target', 'border-campaign-olive/30', 'bg-campaign-olive', 7),
('a1000000-0000-0000-0000-000000000008', 'Gouvernance métropolitaine : l''intérêt des Boucains !', 'Libres de toute allégeance partisane, nous représenterons Bouc-Bel-Air dans les instances métropolitaines et intercommunales en ayant à cœur uniquement les intérêts des Boucains.', 'Globe', 'border-campaign-teal/30', 'gradient-teal-deep', 8),
('a1000000-0000-0000-0000-000000000009', 'Les fast lanes boucaines', 'De 7h à 9h et de 16h à 19h, des voies stratégiques seront réservées à la circulation de transit : une barrière commandée par caméra reconnaissant les plaques enregistrées en mairie.', 'Zap', 'border-campaign-lime/30', 'gradient-lime', 9);

-- 3. Insérer toutes les mesures
INSERT INTO programme_measures (pillar_id, title, detail, sort_order) VALUES
-- 1 : Écoles, crèches & centre aéré
('a1000000-0000-0000-0000-000000000001', 'Éclairage adaptatif et confort thermique', 'Les études scientifiques recommandent de miser sur l''éclairage adaptatif et le confort thermique en classe, été comme hiver, afin d''améliorer les facultés d''apprentissage et de limiter les risques de développer des troubles de l''attention.', 1),
('a1000000-0000-0000-0000-000000000001', 'Grand marché de rénovation énergétique', 'En intégrant ces travaux dans un grand marché global de rénovation énergétique, ce sont les économies d''énergie qui financeront ces travaux plus que jamais nécessaires.', 2),
-- 2 : Mixité sociale choisie
('a1000000-0000-0000-0000-000000000002', 'Bail réel solidaire (BRS)', 'Avec le BRS, nous ne construisons que le nécessaire. Si nous avons besoin de 60 logements pour nos quotas, nous construisons 60 appartements en BRS. Pas besoin d''en construire 60 de plus à côté pour rentabiliser l''opération.', 1),
('a1000000-0000-0000-0000-000000000002', 'Fin des grands ensembles', 'C''est la fin des grands ensembles imposés par les promoteurs. Avec le BRS, nous ne faisons pas venir des locataires de passage.', 2),
('a1000000-0000-0000-0000-000000000002', 'Des familles propriétaires', 'Nous permettons à des familles propriétaires de s''installer. Un propriétaire respecte son bien, entretient son jardin et veille à la tranquillité de son quartier car c''est son investissement.', 3),
('a1000000-0000-0000-0000-000000000002', 'Identité de Bouc-Bel-Air préservée', 'C''est la garantie d''une mixité sociale réussie, apaisée, et respectueuse de l''identité de Bouc-Bel-Air.', 4),
-- 3 : Vous avez la parole
('a1000000-0000-0000-0000-000000000003', 'Référendum local obligatoire', 'Tous les projets supérieurs à 1M€ d''engagement seront soumis à référendum local.', 1),
('a1000000-0000-0000-0000-000000000003', 'Seuil de 25% des électeurs inscrits', 'Les projets devront dépasser 25% des électeurs inscrits les approuvant pour être validés.', 2),
-- 4 : Réseau 5G communal
('a1000000-0000-0000-0000-000000000004', 'Caméras nomades de vidéoprotection', 'Parce que les caméras fixes sont facilement identifiées et évitées par les délinquants, nous déployons des caméras nomades dont la localisation peut être modifiée de manière extrêmement réactive.', 1),
('a1000000-0000-0000-0000-000000000004', 'Capteurs de maintenance préventive', 'Raccorder au réseau 5G des capteurs pour la maintenance préventive des voiries et des bâtiments municipaux.', 2),
('a1000000-0000-0000-0000-000000000004', 'Surveillance qualité de l''air et des eaux', 'Déployer des dispositifs pour surveiller la qualité de l''air et des eaux en temps réel.', 3),
('a1000000-0000-0000-0000-000000000004', 'Éclairage public intelligent', 'Installer l''éclairage public piloté par des capteurs de présence, réduisant la consommation énergétique.', 4),
-- 5 : Moustiques & nuisibles
('a1000000-0000-0000-0000-000000000005', 'Piégeage et prédateurs naturels', 'Ce combat de terrain s''appuiera sur des solutions écologiques innovantes, comme le piégeage et les prédateurs naturels.', 1),
('a1000000-0000-0000-0000-000000000005', 'Assécher les gîtes privés', 'Mobilisation massive des citoyens pour assécher les gîtes privés où prolifèrent les moustiques.', 2),
('a1000000-0000-0000-0000-000000000005', 'Réglementation municipale stricte', 'Mesures encadrées par une réglementation municipale stricte pour garantir l''efficacité de la lutte.', 3),
-- 6 : Urbanisation galopante
('a1000000-0000-0000-0000-000000000006', 'Suppression des OAP', 'Suppression des opérations d''aménagement programmées et réduction des droits à construire des immeubles collectifs.', 1),
('a1000000-0000-0000-0000-000000000006', 'Préemption systématique', 'Droit de préemption systématique sur les terrains permettant un aménagement collectif.', 2),
('a1000000-0000-0000-0000-000000000006', 'Retrait et refus des permis promoteurs', 'Retrait des permis récemment octroyés à des promoteurs, refus des permis nouveaux quitte à aller au contentieux.', 3),
('a1000000-0000-0000-0000-000000000006', 'Détachements familiaux facilités', 'Seuls les détachements familiaux seront facilités, pour permettre aux Boucains de transmettre leur patrimoine.', 4),
('a1000000-0000-0000-0000-000000000006', 'Parc naturel au vallat de Violesi', 'Sanctuariser un espace naturel au plus près des quartiers bétonnés en créant un parc enjambant le vallat de Violesi.', 5),
-- 7 : Police municipale
('a1000000-0000-0000-0000-000000000007', 'Suppression du collaborateur de cabinet', 'Économie annuelle : 85 000€.', 1),
('a1000000-0000-0000-0000-000000000007', 'Baisse des frais de représentation', 'Économie annuelle : 10 500€.', 2),
('a1000000-0000-0000-0000-000000000007', 'Réduction de 5% du budget communication', 'Économie annuelle : 200 000€.', 3),
('a1000000-0000-0000-0000-000000000007', 'Recouvrement effectif de la TLPE', 'Économie annuelle : 50 000€.', 4),
('a1000000-0000-0000-0000-000000000007', 'Gains de productivité', 'IA et non-remplacement à l''usure pour optimiser les services municipaux.', 5),
('a1000000-0000-0000-0000-000000000007', 'Total : 600 000€ par an', 'Financés par des économies sur le train de vie municipal, sans augmentation d''impôts.', 6),
-- 8 : Gouvernance métropolitaine
('a1000000-0000-0000-0000-000000000008', 'Indépendance politique', 'Libres de toute allégeance partisane, nous représenterons Bouc-Bel-Air sans inféodation à un parti.', 1),
('a1000000-0000-0000-0000-000000000008', 'Défendre les intérêts des Boucains', 'Dans les instances métropolitaines et intercommunales, nous aurons à cœur uniquement les intérêts des Boucains.', 2),
-- 9 : Fast lanes boucaines
('a1000000-0000-0000-0000-000000000009', 'Voies réservées aux heures de pointe', 'Le chemin de Violesi, le chemin des Revenants et le chemin de Sauvecanne seront réservés à la circulation de transit de 7h à 9h et de 16h à 19h.', 1),
('a1000000-0000-0000-0000-000000000009', 'Barrière par reconnaissance de plaques', 'Une barrière commandée par une caméra reconnaissant les plaques enregistrées en mairie sera installée. Seuls les Boucains passeront !', 2),
('a1000000-0000-0000-0000-000000000009', 'Responsabiliser Département et Métropole', 'Ainsi, le Département et la Métropole devront prendre leurs responsabilités pour réaliser les aménagements jugés nécessaires : sorties des 3 Pigeons, Intersite D9 vers A51-Nord.', 3);

-- 4. Mettre à jour les références "3 piliers" dans les événements et SEO
UPDATE events SET description = 'Grands rassemblements thématiques sur les 9 engagements du programme.' WHERE title = 'Meetings publics';
UPDATE seo_pages SET description = '9 engagements concrets pour redonner à Bouc-Bel-Air le cadre de vie qu''elle mérite.', keywords = 'programme municipal, engagements, sécurité, urbanisme, écoles, moustiques, 5G, fast lanes, Bouc-Bel-Air' WHERE path = '/programme';

COMMIT;
