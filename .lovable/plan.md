
## Modifications du Footer

### 1. Centrer le texte SEO
Le bloc SEO en bas du footer sera centre (`text-center`) au lieu d'etre aligne a gauche.

### 2. Ajouter une colonne "Legales" dans la grille
La grille passe de 3 colonnes (`md:grid-cols-3`) a 4 colonnes (`md:grid-cols-4`) :
- Logo
- Navigation (existant)
- **Legales** (nouvelle colonne) avec les liens :
  - Mentions legales
  - Cookies
  - Politique de confidentialite
- Suivez-nous (existant)

Les liens legaux auront le meme style que la colonne Navigation (meme taille, meme hover lime). Pour l'instant ils ne meneront nulle part (ancre `#`).

### Details techniques

**Fichier modifie** : `src/components/Footer.tsx`

- Ligne 87 : `grid-cols-3` devient `grid-cols-4`
- Apres le bloc Nav (ligne 110), ajout d'une nouvelle colonne "Legales" avec 3 boutons : Mentions legales, Cookies, Politique de confidentialite
- Ligne 150-172 : ajout de `text-center` et suppression de `max-w-4xl` sur le bloc SEO pour centrer le texte
