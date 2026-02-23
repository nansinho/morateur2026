

# Refonte complete du site - Style Magazine Moderne + Photos IA

## Vision
Transformer le site en un **magazine editorial de campagne** : grandes photos pleine largeur, typographie serif/sans-serif mixee, mises en page asymetriques et dynamiques, mouvement elegant. Le site actuel est trop "template SaaS" -- il faut un veritable impact visuel de magazine.

---

## 1. Generation de photos IA du candidat

Utilisation de l'API Lovable AI (Gemini image) pour generer **4 nouvelles photos** du candidat a partir de la photo existante :

- **Sur le terrain** : le candidat marchant dans une rue de village provencal avec des habitants
- **En reunion publique** : le candidat parlant devant un public dans une salle des fetes
- **Portrait decontracte** : le candidat souriant dans un cadre naturel/parc
- **En action** : le candidat serrant des mains sur un marche provencal

Ces images seront generees via un edge function Supabase et stockees comme assets dans le projet. Elles viendront alimenter les sections Candidat, Actualites, et la nouvelle galerie.

**Important** : La generation d'images IA necessite Lovable Cloud. Si ce n'est pas encore connecte, il faudra l'activer en premier.

---

## 2. Nouvelle typographie - Style editorial

### Police d'accent : Playfair Display (serif)
- Utilisee pour les **grands titres** des sections, en mix avec Plus Jakarta Sans
- Cree un contraste editorial "magazine" immediat
- Import via Google Fonts

### Principe typographique
```text
Titres principaux  -> Playfair Display, italic ou regular, tres grand (8xl+)
Sous-titres        -> Plus Jakarta Sans, extrabold, uppercase, tracking large
Corps de texte     -> Plus Jakarta Sans, regular
Labels/tags        -> Plus Jakarta Sans, bold, uppercase, petit
```

---

## 3. Section par section

### Hero (refonte majeure)
- Layout **split 50/50** : texte a gauche, photo pleine hauteur a droite
- Titre avec mix typographique : "Bouc Bel Air" en Playfair Display serif italic + "a de l'Avenir" en sans-serif bold
- Suppression des badges "36 ans" et "2014-2020" (deplacees dans la section Candidat)
- Fond plus clair avec un **gradient editorial** subtil (pas le navy plein ecran)
- Animation d'entree par mots (reveal mot par mot)
- Gros bouton CTA avec fleche animee

### Marquee Band (amelioration)
- Garder le concept mais ajouter un **fond gradient** (green -> gold) au lieu du vert plat
- Augmenter la taille du texte
- Ajouter une deuxieme bande qui scroll dans le sens inverse

### Section Candidat (refonte editoriale)
- **Layout magazine** : grande photo a gauche (2/3 de la largeur), bloc texte a droite (1/3)
- Citation en typographie serif italic tres grande
- Stats en ligne horizontale avec separateurs visuels
- Les highlights deviennent des **puces editoriales** avec numeros, pas des cartes colorees
- Fond alterne (blanc casse / creme)

### Village Banner (amelioration)
- Garder le parallax mais ajouter un **titre en typographie serif** mixee
- Le titre doit etre plus dramatique, plein ecran

### Programme (refonte)
- Layout **bento grid** au lieu de 3 colonnes egales
- La premiere carte est 2x plus grande (occupe 2/3 de la largeur)
- Chaque carte a une **grande icone coloree** en arriere-plan (semi-transparente)
- Les stats sont integrees dans la carte, pas en gros au-dessus
- Fond navy conserve mais avec plus de contraste dans les cartes (fond blanc/creme)

### Roadmap (refonte)
- Remplacer la timeline verticale par un **layout horizontal scrollable**
- Chaque etape est une carte plein format avec un grand numero (01, 02, 03...)
- Les cartes "done" ont un check vert et une photo d'illustration
- Scrollable horizontalement avec fleches (comme les Actualites)
- Fond blanc/creme

### Actualites (garder tel quel)
- La section est appreciee par l'utilisateur -- pas de changements majeurs
- Eventuellement integrer les **photos IA generees** dans les cartes d'actualites

### Equipe (refonte)
- Supprimer la photo de groupe (ou la garder en petit)
- Chaque membre a un **bloc editorial** : grande initiale en serif + texte a cote
- Layout en **2 colonnes asymetriques**
- Fond navy avec cartes claires (inversion du contraste actuel)

### Engagez-vous (refonte)
- Transformer en **banniere pleine largeur** avec un titre geant en serif
- Les 6 actions deviennent des **boutons/liens** en ligne plutot que des cartes
- Design plus compact et percutant
- Fond avec photo floue du village en arriere-plan

### Procuration (simplification)
- Formulaire plus compact
- Le titre utilise la typographie serif pour plus d'impact
- Garder le layout 2 colonnes

### Footer (amelioration)
- Plus editorial : logo en serif, navigation en colonnes
- Reseaux sociaux avec icones rondes et noms en texte

---

## 4. Fichiers modifies/crees

### Fichiers crees
1. **`supabase/functions/generate-image/index.ts`** - Edge function pour generer des photos IA via Lovable AI
2. **`src/components/PhotoGallery.tsx`** - Composant optionnel de galerie photo (si les images IA sont pretes)

### Fichiers modifies
3. **`src/index.css`** - Import police Playfair Display, nouvelles classes utilitaires editoriales
4. **`tailwind.config.ts`** - Ajout font-serif Playfair Display, nouvelles animations
5. **`src/components/HeroSection.tsx`** - Layout 50/50 editorial, typographie mixee serif/sans-serif
6. **`src/components/MarqueeBand.tsx`** - Double bande, gradient colore
7. **`src/components/CandidateSection.tsx`** - Layout magazine asymetrique, puces editoriales
8. **`src/components/VillageBanner.tsx`** - Titre serif dramatique
9. **`src/components/ProgrammeSection.tsx`** - Bento grid, cartes a fond clair sur navy
10. **`src/components/RoadmapSection.tsx`** - Timeline horizontale scrollable avec numeros
11. **`src/components/TeamSection.tsx`** - Blocs editoriaux avec initiales serif
12. **`src/components/EngagezVousSection.tsx`** - Banniere pleine largeur + liens en ligne
13. **`src/components/ProcurationSection.tsx`** - Titre serif, formulaire compact
14. **`src/components/Footer.tsx`** - Style editorial en colonnes

### Dependances
- Aucune nouvelle dependance requise (Playfair Display via Google Fonts CDN)

---

## 5. Photos IA - Approche technique

La generation d'images IA se fait en deux etapes :

**Etape 1** : Creer une edge function `generate-image` qui utilise le modele `google/gemini-2.5-flash-image` via la Lovable AI Gateway pour generer des images a partir de descriptions textuelles

**Etape 2** : Appeler cette fonction pour generer 4 variantes du candidat dans differents contextes. Les images resultantes seront encodees en base64 et sauvegardees dans les assets du projet ou affichees directement.

**Note** : La qualite des images generees par IA peut varier. Les images serviront d'illustrations complementaires aux photos reelles existantes. Le candidat sur les images generees ne ressemblera pas forcement au vrai candidat -- ce seront des illustrations de contexte (reunion, terrain, etc.).

