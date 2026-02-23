

# Rendre le site fun, interactif et vivant

## Constat actuel
Le site est trop sobre et statique. Il manque de personnalite, de mouvement et de couleurs. Les references montrent des sites de campagne modernes avec des typographies audacieuses, des grilles de cartes colorees, des carousels d'actualites et des liens vers les reseaux sociaux.

---

## Nouveautes a ajouter

### 1. Nouvelle section "Actualites" (carousel de news)
Inspiree directement de la reference (image 2), une section avec :
- Un carousel horizontal (Embla Carousel deja installe) de cartes d'actualites
- Chaque carte = grande photo + date + titre en overlay
- Fleches de navigation gauche/droite
- Donnees en dur pour l'instant (titre, date, image placeholder)
- Positionnee entre la Roadmap et l'Equipe

### 2. Nouvelle section "Engagez-vous" (grille d'actions)
Inspiree de la reference (image 1 - "Rejoignez-moi pour changer Paris") :
- Titre en typographie bold et fun avec couleurs alternees (navy + vert + bleu clair)
- Grille 2x4 de cartes d'action cliquables avec icones :
  - "J'agis sur le terrain" (navy)
  - "Je fais une procuration" (orange/vert accent)
  - "Sur Instagram" avec lien vers le compte Instagram
  - "Sur Facebook" avec lien vers le Facebook
  - "Je m'abonne a la newsletter"
  - "Je decouvre le programme"
- Chaque carte a un fond colore, une icone dans un cercle, un titre bold et une description
- Animations au hover (scale + ombre)
- Remplace ou complete la section Procuration actuelle

### 3. Photo du village (projet-banner.png)
- Integrer la photo uploadee du village de Bouc-Bel-Air
- Utilisee comme banniere entre deux sections (par ex. avant le Programme)
- Pleine largeur avec texte overlay en typographie bold

### 4. Typographie plus fun et audacieuse
- Ajouter la police "Plus Jakarta Sans" ou garder Sora mais l'utiliser de maniere plus expressive
- Titres plus gros, plus gras, avec des mots en couleurs alternees (navy / vert / bleu clair)
- Inspires de l'image 4 : lignes decalees, tailles variees, couleurs mixees

### 5. Plus de mouvement partout
- Animations d'entree plus visibles sur les cartes (slide-up avec rebond)
- Hover effects sur toutes les cartes (scale 1.03 + ombre portee)
- Scroll-triggered animations sur les titres (mots qui apparaissent un par un)
- Boutons avec micro-animations au hover (scale + legere rotation)

### 6. Plus de couleurs
- Introduire un bleu clair (`campaign-sky`) et un orange accent pour casser la monotonie navy/vert
- Cartes avec fonds colores varies (pas toutes navy ou toutes blanches)
- Badges et tags colores

### 7. Integration Instagram / Reseaux sociaux
- Dans la section "Engagez-vous", liens directs vers Instagram et Facebook
- Icones plus grandes et colorees dans le footer
- Bandeau "Suivez la campagne sur nos reseaux sociaux" avec icones rondes cliquables (comme dans la ref image 2)

---

## Plan technique - Fichiers modifies/crees

### Fichiers crees
1. **`src/components/ActualitesSection.tsx`** - Nouvelle section carousel d'actualites avec Embla Carousel
2. **`src/components/EngagezVousSection.tsx`** - Nouvelle grille de cartes d'action colorees
3. **`src/components/VillageBanner.tsx`** - Banniere pleine largeur avec la photo du village

### Fichiers modifies
4. **`src/pages/Index.tsx`** - Ajouter les nouvelles sections dans le bon ordre
5. **`src/components/CandidateSection.tsx`** - Typographie plus expressive, animations plus visibles
6. **`src/components/ProgrammeSection.tsx`** - Cartes plus colorees, hover effects, typo plus fun
7. **`src/components/RoadmapSection.tsx`** - Plus de couleurs sur les cartes, animations ameliorees
8. **`src/components/TeamSection.tsx`** - Hover effects sur les cartes membres, couleurs plus vives
9. **`src/components/ProcurationSection.tsx`** - Simplifier (le gros du CTA passe dans EngagezVous)
10. **`src/components/Footer.tsx`** - Bandeau reseaux sociaux plus visible, icones colorees
11. **`src/components/HeroSection.tsx`** - Typographie plus audacieuse avec couleurs alternees
12. **`src/index.css`** - Nouvelles couleurs (orange accent, bleu clair), animations supplementaires
13. **`tailwind.config.ts`** - Ajout couleurs campaign-orange, animation bounce-in

### Asset a copier
- `projet-banner.png` -> `src/assets/projet-banner.png`

### Ordre des sections sur la page
```text
Navbar
Hero
CandidateSection
VillageBanner (NOUVEAU - photo pleine largeur du village)
ProgrammeSection
RoadmapSection
ActualitesSection (NOUVEAU - carousel de news)
TeamSection
EngagezVousSection (NOUVEAU - grille d'actions + reseaux sociaux)
ProcurationSection (simplifie - juste le formulaire)
Footer (avec bandeau reseaux sociaux)
```

