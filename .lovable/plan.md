
# Refonte Scrollytelling - Toutes les sections

## Objectif
Transformer le site en une experience de **scrollytelling immersive** inspiree des pages produit Apple et des long-forms du New York Times. Chaque section doit raconter une histoire au fil du scroll avec des effets de parallaxe, zoom, et reveal progressif.

---

## Problemes actuels identifies

1. **Section Candidat** : Layout classique 2 colonnes sans dynamisme, la photo et le texte sont statiques, les stats en haut sont deconnectees du reste
2. **Section Programme** : Cartes en grille standard sans profondeur, les animations sont basiques (simple fade-in)
3. **Section Roadmap** : Timeline verticale generique, manque d'immersion
4. **Section Equipe** : Grille de cartes plate, photo d'equipe sous-exploitee
5. **Section Procuration** : Split layout formulaire sans lien narratif
6. **Footer** : Basique, pas de transition visuelle memorable

---

## Plan de refonte section par section

### 1. Section Candidat - "Storytelling immersif"

**Concept** : La photo du candidat se revele par un effet de zoom-out au scroll (comme les pages Apple). Le texte apparait progressivement en couches.

- Supprimer le bandeau de stats isole en haut
- Integrer les stats directement dans le flow narratif, apparaissant au scroll
- Photo en pleine largeur qui se reduit progressivement avec un effet de parallaxe inverse
- Citation qui se "tape" (typewriter effect) au scroll
- Les highlights cards apparaissent en cascade avec un decalage horizontal (stagger slide-in)
- Fond avec un leger degrade qui evolue au scroll (du blanc vers un gris chaud)

### 2. Section Programme - "Reveal cinematique"

**Concept** : Chaque pilier du programme se revele en plein ecran au scroll, puis se compresse en carte quand on passe au suivant.

- Les 3 piliers se succedent avec un effet de "sticky scroll" : chaque carte reste fixe pendant le scroll puis laisse place a la suivante
- Icone et stat avec un effet de scale-up au moment du reveal
- Les items de liste apparaissent un par un au scroll (pas au viewport entry)
- Transition de fond qui evolue subtilement entre chaque pilier (nuance de bleu navy differente)
- Le CTA final arrive avec un effet de glow pulse

### 3. Section Roadmap - "Progression vivante"

**Concept** : La ligne de progression se remplit reellement au scroll. Les milestones s'activent un par un comme un voyage.

- Conserver le concept de timeline mais rendre la ligne de progression plus visible et fluide
- Chaque milestone "pulse" quand il devient actif
- Les cartes completees ont un effet de lueur verte plus prononce
- Ajouter un indicateur de progression en pourcentage
- Les cartes futures apparaissent en transparence et se solidifient au scroll

### 4. Section Equipe - "Galerie vivante"

**Concept** : La photo d'equipe se revele avec un effet de panoramique (pan horizontal) au scroll, puis les membres apparaissent en superposition.

- Photo d'equipe avec effet Ken Burns (zoom lent + pan) au scroll
- Les fiches membres apparaissent en overlay flottant au-dessus de la photo au scroll
- Chaque fiche s'anime avec un leger tilt 3D au hover
- Transition de fond lumineux derriere la photo

### 5. Section Procuration - "Call to action immersif"

**Concept** : Split screen avec le formulaire qui slide depuis la droite au scroll, pendant que le texte d'accroche reste sticky a gauche.

- Texte gauche en position sticky pendant le scroll du formulaire
- Le formulaire entre avec un mouvement fluide depuis le bord droit
- Les champs du formulaire apparaissent en cascade

### 6. Footer - "Signature cinematique"

- Transition fondue depuis la section precedente (pas de coupure nette)
- Logo et liens sociaux avec micro-animation de breathe (pulsation lente)

---

## Details techniques

### Approche technique globale
- Utilisation intensive de `useScroll` + `useTransform` de Framer Motion pour les animations liees au scroll
- Sticky positioning (`position: sticky`) pour les effets de sections qui restent en place
- `useInView` pour les animations ponctuelles (compteurs, cascade de cartes)
- CSS `clip-path` et `mask-image` pour les effets de reveal
- Gradients dynamiques via des variables CSS animees

### Fichiers modifies
1. **`src/components/CandidateSection.tsx`** : Refonte complete avec full-width photo, scroll-zoom, stats integrees
2. **`src/components/ProgrammeSection.tsx`** : Refonte sticky-scroll avec reveal sequentiel des piliers
3. **`src/components/RoadmapSection.tsx`** : Amelioration timeline avec progression scroll et activation dynamique
4. **`src/components/TeamSection.tsx`** : Refonte galerie avec Ken Burns et overlays anime
5. **`src/components/ProcurationSection.tsx`** : Sticky left + slide-in formulaire
6. **`src/components/Footer.tsx`** : Transition fondue et micro-animations
7. **`src/index.css`** : Nouveaux utilitaires pour les effets scrollytelling (sticky sections, reveals)
