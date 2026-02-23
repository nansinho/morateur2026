
## Page Presse

### Ce qui sera fait

1. **Nouvelle page `/presse`** (`src/pages/Presse.tsx`)
   - Hero en haut (meme style que la page Actualites)
   - Grille de cards representant les articles de presse
   - Deux cards initiales :
     - **La Marseillaise** : "Mathieu Morateur revient comme candidat" (24/12/2025, par Eva Bonnet-Gonnet) -- lien vers l'article original
     - **La Provence** : "Municipales 2026 a Bouc-Bel-Air : Mathieu Morateur veut faire barrage aux promoteurs" (25/10/2025, par Carole Barletta) -- lien vers l'article original
   - Chaque card affiche : logo du media, nom du media, titre de l'article, date, court extrait, et un lien "Lire l'article" qui ouvre dans un nouvel onglet

2. **Logo La Marseillaise** : le SVG uploade sera copie dans `src/assets/logo-lamarseillaise.svg` et importe dans le composant

3. **Logo La Provence** : un SVG simple sera cree dans `src/assets/logo-laprovence.svg` (texte "La Provence" stylise en bleu marine, identifiable)

4. **Mise a jour du routeur** (`src/App.tsx`) : ajout de la route `/presse`

5. **Mise a jour de la navbar** (`src/components/Navbar.tsx`) : ajout de "Presse" dans le tableau `navItems`

### Details techniques

**Fichiers crees** :
- `src/pages/Presse.tsx` -- page complete avec Navbar, hero, grille de cards, Footer
- `src/assets/logo-laprovence.svg` -- logo simplifie La Provence
- Copie de `user-uploads://5616c7c1-...svg` vers `src/assets/logo-lamarseillaise.svg`

**Fichiers modifies** :
- `src/App.tsx` : import Presse + route `/presse`
- `src/components/Navbar.tsx` : ajout `{ label: "Presse", to: "/presse" }` dans `navItems`

**Design des cards** :
- Fond blanc avec bordure subtile, coins arrondis (`rounded-2xl`)
- En haut : logo du media (hauteur ~40px) + badge "Presse" style lime
- Titre en `font-accent font-extrabold uppercase`
- Date et auteur en texte secondaire
- Court extrait de l'article
- Lien "Lire l'article" avec icone `ExternalLink` ouvrant dans un nouvel onglet
- Hover : elevation + legere translation vers le haut (comme les cards Actualites)
