

# Refonte complete - Design Premium, Moderne et Dynamique

## Problemes identifies

1. **Photos IA inutilisables** : Les photos generees ne ressemblent pas du tout au candidat (personnes differentes, age different). Il faut les supprimer et utiliser uniquement la vraie photo du candidat.
2. **Playfair Display = catastrophe** : Cette police serif italic donne un rendu pretentieux et date. Les titres avec decoupage colore lettre par lettre ("Equi" + "pe") sont illisibles.
3. **Design fade et sans impact** : Trop de beige/creme, pas assez de contraste, manque de punch visuel.
4. **Navbar invisible** : Les liens de navigation disparaissent sur fond clair (texte `primary-foreground` = blanc sur fond transparent).

---

## Direction artistique : BOLD + CLEAN + DYNAMIQUE

### Nouvelle typographie
- **Supprimer Playfair Display** completement
- **Plus Jakarta Sans** reste la police principale mais utilisee de maniere plus audacieuse :
  - Titres en **800 (extrabold)**, tailles enormes, uppercase ou mix uppercase/lowercase
  - Sous-titres en **700 (bold)**, tracking large
- **Sora** comme police d'accent (condensee, geometrique, moderne) -- deja disponible via Google Fonts
- Principe : PAS de serif, PAS d'italique partout. Tout en sans-serif moderne, bold, impactant

### Palette de couleurs renforcee
- **Navy profond** (`#0F1729`) comme couleur dominante forte
- **Vert campagne** plus vif et sature
- **Blanc pur** pour le contraste (pas de beige/creme fade)
- **Or/Gold** en accent uniquement (pas partout)
- Suppression des couleurs "pastel" (coral, lavender, mint) qui diluent l'impact

### Photos
- **Utiliser uniquement `header_candidat_portrait.png`** (la vraie photo du candidat)
- **Supprimer toutes les photos IA** (terrain, reunion, portrait, marche)
- Pour les sections qui ont besoin de visuels : utiliser des photos Unsplash de Bouc-Bel-Air / Provence (paysages, village, marche provencal) -- PAS des photos de personnes
- La photo du village (`projet-banner.png`) est conservee

---

## Refonte section par section

### Navbar
- Fond **blanc avec ombre** quand scrolle (pas transparent -> navy)
- Texte **navy** (lisible sur fond clair ET fonce)
- Logo "MORATEUR 2026" en bold uppercase, pas en serif

### Hero
- Layout 50/50 conserve mais nettoye
- Titre "Bouc Bel Air" en **Plus Jakarta Sans extrabold**, pas en serif italic
- "a de l'Avenir" en vert + or, sans italic
- Suppression du label "Elections municipales 2026" redondant -> le remplacer par un badge compact
- Boutons plus compacts et modernes (pas de rounded-full geant)
- La vraie photo du candidat reste a droite

### Marquee Band
- Garder le concept mais simplifier : une seule bande, fond navy, texte blanc + vert
- Police Plus Jakarta Sans bold, pas de serif

### Section Candidat
- **Supprimer les photos IA** (terrain + reunion)
- Layout simple : texte + stats sur fond blanc
- Citation en grand bold (pas en italic serif)
- Stats horizontales avec chiffres bold en vert
- Les 3 highlights (adjoint, analyste, service public) en cartes compactes

### Village Banner
- Garder le parallax avec `projet-banner.png`
- Titre en Plus Jakarta Sans extrabold uppercase, pas en serif italic

### Programme (Bento Grid)
- Garder le layout bento grid (c'est bien)
- Mais supprimer les "stat" geantes en fond et les polices serif
- Cartes blanches sur fond navy, clean et lisibles
- Icones + titres bold + listes a puces

### Roadmap
- Garder le scroll horizontal (c'est bien)
- Supprimer les numeros serif geants, les remplacer par des numeros bold sans-serif
- Nettoyer les styles

### Actualites
- **Garder tel quel** (l'utilisateur l'aime)
- Juste mettre a jour les polices (supprimer les serif si il y en a)

### Equipe
- Supprimer les initiales serif geantes
- Cards simples : icone + nom bold + role + description
- Fond navy, cartes avec bordure subtile

### Engagez-vous
- **Supprimer la photo IA** (candidat-marche.jpg) en background
- Fond navy uni ou gradient navy
- Titre bold sans serif
- Actions en boutons/pills modernes

### Procuration
- Garder le formulaire (il fonctionne bien)
- Mettre a jour les titres (supprimer serif)

### Footer
- Supprimer la police serif
- Tout en Plus Jakarta Sans

---

## Plan technique

### Fichiers a modifier
1. **`index.html`** -- Supprimer l'import de Playfair Display de Google Fonts
2. **`tailwind.config.ts`** -- Supprimer `font-editorial`, ajouter `font-accent` avec Sora
3. **`src/index.css`** -- Supprimer toutes les classes `.font-editorial`, nettoyer les gradients, fond blanc au lieu de creme
4. **`src/components/Navbar.tsx`** -- Fond blanc avec ombre, texte navy, logo uppercase bold
5. **`src/components/HeroSection.tsx`** -- Titre en sans-serif bold, suppression italic, badge compact
6. **`src/components/MarqueeBand.tsx`** -- Police sans-serif, une seule bande
7. **`src/components/CandidateSection.tsx`** -- Supprimer photos IA, layout texte + stats simple
8. **`src/components/VillageBanner.tsx`** -- Titre bold uppercase sans serif
9. **`src/components/ProgrammeSection.tsx`** -- Cartes nettoyees, suppression serif
10. **`src/components/RoadmapSection.tsx`** -- Numeros sans-serif, style nettoye
11. **`src/components/ActualitesSection.tsx`** -- Mise a jour polices uniquement
12. **`src/components/TeamSection.tsx`** -- Suppression initiales serif, cards modernes
13. **`src/components/EngagezVousSection.tsx`** -- Suppression photo IA background, fond uni
14. **`src/components/ProcurationSection.tsx`** -- Titres sans serif
15. **`src/components/Footer.tsx`** -- Police sans serif

### Fichiers a supprimer (references)
- Les imports de `candidat-terrain.jpg`, `candidat-reunion.jpg`, `candidat-portrait-decontracte.jpg`, `candidat-marche.jpg` seront retires des composants (les fichiers resteront mais ne seront plus utilises)

### Aucune nouvelle dependance
- Tout se fait avec Plus Jakarta Sans (deja presente) + eventuellement Sora via Google Fonts CDN

