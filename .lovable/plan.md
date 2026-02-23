

# Refonte section Equipe -- style cards Actualites

## Objectif
Reprendre le meme style de cards que la section Actualites (visible sur le screenshot) pour presenter les membres de l'equipe : photo plein cadre, coins arrondis, gradient sombre en bas, badge/tag en haut, nom et role en overlay bas.

## Changements dans `src/components/TeamSection.tsx`

### Layout
- Remplacer le carrousel scrollable (`flex overflow-x-auto`) par une grille `grid grid-cols-2 lg:grid-cols-4 gap-5`
- Supprimer le `useRef`, `snap-x`, `scrollbar-hide`

### Style des cards (copie du pattern Actualites)
- Card : `rounded-2xl overflow-hidden aspect-[3/4] shadow-lg` avec `group cursor-pointer`
- Photo : `w-full h-full object-cover object-center` avec `group-hover:scale-110 transition-transform duration-700`
- Gradient overlay : `bg-gradient-to-t from-primary/90 via-primary/20 to-transparent`
- Badge en haut a gauche : tag avec le role (ex: "Cheffe d'entreprise") style `gradient-lime text-accent-foreground px-4 py-1.5 rounded-lg text-xs font-bold uppercase`
- Texte en bas : nom en `font-accent font-extrabold text-primary-foreground text-lg` avec hover `text-campaign-lime`

### Hover
- Zoom photo via CSS `group-hover:scale-110`
- Nom passe en lime au hover
- Lift card via framer-motion `whileHover={{ y: -6 }}`

### Donnees
- Garder les 4 membres existants avec leurs images importees (`equipe-1.png` a `equipe-4.png`)

