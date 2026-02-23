

## Refonte du Footer + Bloc SEO

Le footer actuel est fonctionnel mais basique (3 colonnes simples). Voici le plan pour le rendre plus original et ajouter un bloc de texte SEO en dessous.

### 1. Redesign du Footer (`src/components/Footer.tsx`)

**Structure revisitee :**

- **Partie haute** : un grand bloc d'appel a l'action avec le slogan "Bouc Bel Air a de l'Avenir" en typographie imposante, avec un bouton CTA "Rejoignez-nous" stylise comme dans la Navbar (gradient-lime, leger tilt)
- **Partie centrale** : la grille 3 colonnes existante (Logo, Navigation, Reseaux sociaux) est conservee mais amelioree :
  - Logo : plus grand, avec le slogan en dessous
  - Navigation : liens avec un petit indicateur au hover (trait lime qui apparait a gauche)
  - Reseaux sociaux : icones dans des cercles avec effet hover plus marque (fond lime au hover)
- **Partie basse (copyright)** : conservee telle quelle avec le bouton retour en haut
- **Decoration** : ajout d'un element graphique subtil (un trait diagonal ou un motif de points) pour casser la monotonie du bloc gradient

### 2. Nouveau bloc SEO sous le footer

**Nouveau composant : `src/components/FooterSEO.tsx`**

Un bloc separee, en dessous du footer principal, avec un fond plus sombre (bg-foreground ou noir profond) contenant :

- Un titre discret en petites majuscules ("A propos de Bouc-Bel-Air et des elections municipales 2026")
- 2-3 paragraphes de texte riche en mots-cles SEO, ecrit en petit (text-xs), couleur attenuee (opacity faible), couvrant :
  - Presentation de la commune de Bouc-Bel-Air (Bouches-du-Rhone, Provence)
  - Les elections municipales 2026 et la candidature de Mathieu Morateur
  - Les enjeux : urbanisme, ecoles, village, environnement, infrastructures
- Ce texte est present pour le SEO mais visuellement discret pour ne pas distraire les visiteurs

### 3. Integration

- Ajouter `<FooterSEO />` juste apres `<Footer />` dans toutes les pages qui utilisent le footer (Index, Candidat, Programme, Equipe, Actualites)
- Ou bien l'integrer directement dans `Footer.tsx` pour centraliser

### Details techniques

**Fichiers modifies :**
- `src/components/Footer.tsx` : refonte du design avec bloc CTA en haut, amelioration des hovers, ajout de decorations
- Creation de `src/components/FooterSEO.tsx` : bloc texte SEO avec fond sombre
- `src/pages/Index.tsx`, `src/pages/Candidat.tsx`, `src/pages/Programme.tsx`, `src/pages/Equipe.tsx`, `src/pages/Actualites.tsx` : ajout de `<FooterSEO />` apres `<Footer />`

**Approche alternative (plus simple)** : integrer le bloc SEO directement dans `Footer.tsx` pour eviter de modifier toutes les pages. C'est l'approche retenue.

