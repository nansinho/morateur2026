-- ============================================
-- Morateur 2026 — Données initiales (seed)
-- ============================================

-- Articles / Actualités
INSERT INTO articles (title, date, image, tag, description, sort_order) VALUES
('Lancement officiel de la campagne', '15 Janvier 2026', 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=500&fit=crop', 'Événement', 'Le coup d''envoi de notre aventure collective pour redonner à Bouc-Bel-Air le dynamisme qu''elle mérite.', 1),
('Rencontre avec les commerçants du centre-ville', '28 Janvier 2026', 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop', 'Terrain', 'Échanges concrets avec les commerçants sur la revitalisation du centre ancien et les aides à l''installation.', 2),
('Réunion publique : urbanisme et cadre de vie', '5 Février 2026', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop', 'Programme', 'Présentation de nos mesures contre les promoteurs et pour un urbanisme maîtrisé.', 3),
('Porte-à-porte dans le quartier des Music', '12 Février 2026', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop', 'Terrain', 'À la rencontre des habitants, quartier par quartier, pour écouter et comprendre vos besoins.', 4),
('Tribune : Protégeons nos espaces naturels', '20 Février 2026', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop', 'Tribune', 'Un appel à la préservation des collines et espaces boisés face à la pression immobilière.', 5);

-- Programme : Piliers
INSERT INTO programme_pillars (id, title, intro, icon, color, icon_bg, sort_order) VALUES
('a1000000-0000-0000-0000-000000000001', 'Faire barrage aux promoteurs', 'Notre commune se trouve à un tournant. En moins d''un an, des permis pour plus de 1000 logements ont été déposés. Il est temps d''agir.', 'ShieldCheck', 'border-campaign-lime/30', 'gradient-lime', 1),
('a1000000-0000-0000-0000-000000000002', 'Des infrastructures à la hauteur', 'La vétusté de nos bâtiments publics est indigne de notre commune. Écoles, crèches, voiries : tout doit être remis à niveau.', 'Building2', 'border-campaign-steel/30', 'gradient-teal', 2),
('a1000000-0000-0000-0000-000000000003', 'Revitaliser le village', 'Notre centre ancien a tant à offrir. Retrouver son âme, ramener la vie dans ses ruelles pittoresques : c''est notre priorité.', 'Store', 'border-campaign-olive/30', 'bg-campaign-olive', 3);

-- Programme : Mesures
INSERT INTO programme_measures (pillar_id, title, detail, sort_order) VALUES
-- Pilier 1 : Faire barrage aux promoteurs
('a1000000-0000-0000-0000-000000000001', 'Refus systématique des permis de construire des promoteurs', 'Nous refuserons systématiquement les permis de construire demandés par les promoteurs immobiliers afin de les forcer à la négociation et protéger le cadre de vie des Boucains.', 1),
('a1000000-0000-0000-0000-000000000001', 'Droit de préemption urbain', 'Utilisation systématique du droit de préemption urbain pour permettre la création de logements sociaux adaptés à notre commune, sans laisser le champ libre aux promoteurs.', 2),
('a1000000-0000-0000-0000-000000000001', 'Soutien aux recours des riverains', 'Nous soutiendrons activement les recours intentés par les riverains sur les permis existants, en leur apportant un accompagnement juridique et technique.', 3),
('a1000000-0000-0000-0000-000000000001', 'Bail réel solidaire', 'Recours au bail réel solidaire pour l''intégralité des projets collectifs afin de limiter les constructions spéculatives et de privilégier les parcours résidentiels des Boucains.', 4),
-- Pilier 2 : Des infrastructures à la hauteur
('a1000000-0000-0000-0000-000000000002', 'Rénovation des bâtiments municipaux', 'Réaliser la rénovation complète de l''ensemble des bâtiments municipaux, y compris le foyer des Anciens, pour offrir des conditions dignes à tous les usagers.', 1),
('a1000000-0000-0000-0000-000000000002', 'Climatisation dans les écoles et crèches', 'Installer la climatisation réversible dans toutes les crèches, toutes les écoles et au foyer des anciens. Il est inacceptable que le thermomètre dépasse 30°C dès mai dans certaines écoles.', 2),
('a1000000-0000-0000-0000-000000000002', 'Requalification des axes routiers', 'Requalifier et renouveler les principaux axes de notre commune : avenue Thiers, avenue de la Mounine, avenue Beausoleil, chemin de Sauvecanne… et la RD8n.', 3),
('a1000000-0000-0000-0000-000000000002', 'Échangeurs autoroutiers', 'Lancer les études sur l''aménagement des échangeurs autoroutiers des Trois Pigeons et des Chabauds, afin de présenter un projet solide à l''État.', 4),
-- Pilier 3 : Revitaliser le village
('a1000000-0000-0000-0000-000000000003', 'Centre ancien attractif', 'Faire de notre centre ancien un lieu attractif pour l''ensemble des habitants, en s''appuyant sur son caractère unique, son histoire et son patrimoine architectural.', 1),
('a1000000-0000-0000-0000-000000000003', 'Animations et vie culturelle', 'Étendre les animations au-delà de la place principale, dans les ruelles pittoresques du centre ancien. Retrouver l''esprit des retraites aux flambeaux et des fêtes de village.', 2),
('a1000000-0000-0000-0000-000000000003', 'Incubateur commercial et artisanal', 'Créer un incubateur d''entreprises de restauration et de savoir-faire artisanaux pour redonner vie au commerce local et attirer de nouveaux talents.', 3),
('a1000000-0000-0000-0000-000000000003', 'Offre commerciale renouvelée', 'Développer une offre commerciale de proximité diversifiée, en accompagnant les porteurs de projets et en facilitant l''installation de nouveaux commerces dans le centre-ville.', 4);

-- Événements / Roadmap
INSERT INTO events (icon, date, title, description, is_done, sort_order) VALUES
('Megaphone', 'Janvier 2026', 'Lancement de la campagne', 'Présentation officielle de la liste et du programme.', true, 1),
('Users', 'Février 2026', 'Rencontres de terrain', 'Porte-à-porte, réunions publiques dans tous les quartiers.', true, 2),
('Flag', 'Mars 2026', 'Meetings publics', 'Grands rassemblements thématiques sur les 3 piliers du programme.', false, 3),
('CalendarCheck', 'Mars 2026', '1ᵉʳ tour', 'Jour de vote – chaque voix compte pour l''avenir de notre commune.', false, 4),
('Vote', 'Mars 2026', '2ᵉ tour', 'Mobilisation générale pour confirmer le choix du renouveau.', false, 5),
('PartyPopper', 'Avril 2026', 'Installation du conseil', 'Mise en œuvre immédiate des premières mesures du programme.', false, 6);

-- Membres de l'équipe
INSERT INTO team_members (name, role, image, description, sort_order) VALUES
('Manon Clément-Costa', 'Cheffe d''entreprise', '/images/equipe-1.png', 'Entrepreneure engagée, elle met son expérience de la gestion et de l''innovation au service du territoire.', 1),
('Jean-Luc Berger', 'Responsable financier', '/images/equipe-2.png', 'Expert en finances publiques, garant d''une gestion rigoureuse et transparente des budgets communaux.', 2),
('Valérie Castineiras', 'RH & Pompier volontaire', '/images/equipe-3.png', 'Professionnelle des ressources humaines et pompier volontaire, elle incarne l''engagement citoyen au quotidien.', 3),
('François Deniau', 'Dir. commercial retraité', '/images/equipe-4.png', 'Fort de 30 ans d''expérience, il apporte sa vision stratégique et son ancrage local.', 4);

-- Articles de presse
INSERT INTO press_articles (source, author, date, title, excerpt, url, logo, sort_order) VALUES
('La Marseillaise', 'Eva Bonnet-Gonnet', '24 Décembre 2025', 'Mathieu Morateur revient comme candidat', 'Après une première expérience municipale, Mathieu Morateur annonce son retour sur la scène politique locale de Bouc-Bel-Air avec l''ambition de proposer une alternative crédible aux habitants.', 'https://www.lamarseillaise.fr/accueil/mathieu-morateur-revient-comme-candidat-ON19366109', '/images/logo-lamarseillaise.svg', 1),
('La Provence', 'Carole Barletta', '25 Octobre 2025', 'Municipales 2026 à Bouc-Bel-Air : Mathieu Morateur veut faire barrage aux promoteurs', 'Le candidat aux municipales de 2026 à Bouc-Bel-Air affirme sa volonté de protéger le cadre de vie des Boucains face à la pression immobilière et aux projets des promoteurs.', 'https://www.laprovence.com/article/elections/1485411779646614/municipales-2026-a-bouc-bel-air-mathieu-morateur-se-veut-faire-barrage-aux-promoteurs', '/images/logo-laprovence.svg', 2);

-- Pages SEO
INSERT INTO seo_pages (path, title, description, keywords, og_image) VALUES
('/', 'Morateur 2026 — Bouc Bel Air a de l''Avenir', 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l''équipe.', 'Morateur 2026, Mathieu Morateur, municipales 2026, Bouc-Bel-Air, élections municipales, candidat maire', '/images/candidat-banner.png'),
('/candidat', 'Le Candidat | Morateur 2026', 'Découvrez le parcours et les engagements de Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air.', 'Mathieu Morateur, candidat, parcours, engagements, Bouc-Bel-Air', '/images/candidat-banner.png'),
('/programme', 'Le Programme | Morateur 2026', 'Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu''elle mérite. Urbanisme, infrastructures, village.', 'programme municipal, urbanisme, infrastructures, village, Bouc-Bel-Air', '/images/candidat-banner.png'),
('/actualites', 'Actualités | Morateur 2026', 'Suivez notre campagne au quotidien, sur le terrain et auprès des Boucains.', 'actualités, campagne, terrain, Bouc-Bel-Air, municipales', '/images/candidat-banner.png'),
('/equipe', 'L''Équipe | Morateur 2026', 'Découvrez l''équipe qui porte le projet Morateur 2026 pour Bouc-Bel-Air.', 'équipe, liste municipale, candidats, Bouc-Bel-Air', '/images/equipe-groupe.png'),
('/presse', 'Presse | Morateur 2026', 'Retrouvez les articles de presse consacrés à notre campagne pour Bouc-Bel-Air.', 'presse, médias, articles, La Provence, La Marseillaise, Bouc-Bel-Air', '/images/candidat-banner.png');
