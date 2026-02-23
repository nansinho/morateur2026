
# Refonte complete du site - Design elegant et equilibre

## Diagnostic
Le site actuel souffre de trois problemes majeurs :
- **Monotonie** : 4 sections sur 6 sont en bleu marine fonce, creant une experience visuelle fatigante
- **Manque de contraste** : pas de rythme visuel clair/sombre entre les sections
- **Design generique** : les cartes, typographies et espacements manquent de personnalite

## Nouvelle direction artistique

### Principe : alternance claire/sombre elegante
Le site doit respirer. Chaque section alterne entre fond clair (blanc casse / creme) et fond sombre (navy), creant un rythme visuel naturel et agreable.

```text
Hero          -> SOMBRE (navy + photo candidat)
Candidat      -> CLAIR  (fond creme, photo pleine largeur en haut)
Programme     -> SOMBRE (navy, mais avec des cartes claires/colorees)
Roadmap       -> CLAIR  (fond blanc, timeline coloree)
Equipe        -> SOMBRE (navy, photo + cartes glassmorphism)
Procuration   -> CLAIR  (fond creme, formulaire propre)
Footer        -> SOMBRE (navy, compact)
```

---

## Plan section par section

### 1. Section Candidat (CLAIR)
- Garder la photo pleine largeur en haut avec zoom-out au scroll
- Fond **blanc casse / creme** (`bg-campaign-warm` ou `bg-background`) pour le contenu en dessous
- Stats avec chiffres verts sur fond clair (bien lisibles)
- Citation avec une barre laterale verte, texte sombre
- Highlight cards en blanc avec bordure subtile et ombre douce (pas de navy)
- Animations scroll douces (fade-in, pas de slide agressif)

### 2. Section Programme (SOMBRE mais avec des cartes variees)
- Header sur fond navy
- Remplacer le sticky-scroll par un layout plus lisible : 3 cartes cote a cote sur fond navy
- Chaque carte a un fond legerement different (degrade subtil) avec bordures lumineuses
- Les items de liste sont visibles et lisibles (texte plus lumineux)
- Le stat geant reste mais en plus petit (pas 9xl, plutot 6xl)
- CTA en bas avec glow

### 3. Section Roadmap (CLAIR)
- Fond **blanc/creme** au lieu de navy
- Timeline verticale verte sur fond clair
- Les dots/icones restent verts
- Les cartes en blanc avec ombre portee douce
- Le texte des dates, titres et descriptions en couleurs sombres (lisibles)
- Les cartes "done" avec un liseré vert a gauche
- Les cartes "a venir" avec opacite reduite

### 4. Section Equipe (SOMBRE)
- Fond navy avec photo d'equipe en pleine largeur (Ken Burns conserve)
- Les cartes membres passent en glassmorphism (fond semi-transparent blanc/10) 
- Les initiales restent dans des badges verts
- Le texte est clair et lisible sur fond sombre

### 5. Section Procuration (CLAIR)
- Fond **blanc casse / creme**
- Le texte "Rejoignez-nous" en sombre (foreground), pas en blanc
- Le formulaire avec des inputs a fond blanc, bordures grises, texte sombre
- Labels sombres, focus state vert
- La carte de procuration en blanc avec bordure verte subtile
- Le bouton Envoyer reste vert gradient

### 6. Footer (SOMBRE)
- Fond navy compact
- Reduire le padding
- Garder les icones sociales et le copyright

---

## Fichiers modifies

1. **`src/components/CandidateSection.tsx`** - Fond clair, cartes blanches, meilleure lisibilite
2. **`src/components/ProgrammeSection.tsx`** - Remplacer sticky-scroll par grille lisible, garder fond navy mais cartes plus lumineuses
3. **`src/components/RoadmapSection.tsx`** - Fond clair, timeline verte, cartes blanches
4. **`src/components/TeamSection.tsx`** - Garder navy, ameliorer glassmorphism des cartes
5. **`src/components/ProcurationSection.tsx`** - Fond clair, formulaire blanc, texte sombre
6. **`src/components/Footer.tsx`** - Simplifier et compacter
7. **`src/index.css`** - Ajuster les utilitaires pour supporter les deux themes (clair/sombre)
