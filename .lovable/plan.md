
# Refonte des cartes : Carrousel de cartes TikTok (3.5 visibles)

## Probleme actuel
Les cartes Programme (grille 5 colonnes) et Engagement (grille 6 colonnes) sont trop petites et peu attractives sur desktop. Le format grille ecrase les cartes et rend le design monotone.

## Solution
Remplacer les grilles statiques par des **carrousels Embla** (composant `Carousel` deja present dans le projet) affichant **3.5 cartes visibles** sur desktop, avec un scroll fluide. Les cartes gardent le format vertical TikTok mais deviennent plus grandes et plus soignees.

---

## Section Programme (`ProgrammeSection.tsx`)

- Remplacer la grille `sm:grid-cols-5` par un `Carousel` avec `basis-[28%]` sur desktop (= 3.5 cartes visibles) et `basis-[70%]` sur mobile
- Cartes plus grandes avec :
  - Fond sombre semi-transparent avec un gradient colore en haut
  - Icone plus imposante (w-20 h-20) dans un cercle avec glow subtil
  - Numero du pilier affiche en grand (style editorial "01", "02"...)
  - Titre et description plus lisibles
  - Fleche ou indicateur "en savoir plus" en bas
- Boutons precedent/suivant stylises en lime (comme dans ActualitesSection)
- Dots indicateurs optionnels

## Section Rejoignez la campagne (`EngagezVousSection.tsx`)

- Meme principe : remplacer la grille `lg:grid-cols-6` par un `Carousel` avec `basis-[28%]` sur desktop
- Cartes verticales TikTok avec :
  - Fond colore par theme (rose/Instagram, bleu/Facebook, lime/terrain, teal/newsletter)
  - Icone centree plus grande avec un halo de couleur
  - Texte plus lisible (tailles de police augmentees)
  - Indicateur d'action en bas (fleche externe pour les liens sortants, chevron pour les internes)
- Boutons de navigation carrousel identiques au style lime

## Details techniques

1. **Import du composant Carousel** dans les deux fichiers (deja disponible dans `@/components/ui/carousel`)
2. **Options Embla** : `{ align: "start", loop: true }` pour un defilement en boucle
3. **Breakpoints** :
   - Mobile : `basis-[75%]` (1.3 cartes visibles)
   - Tablette : `basis-[40%]` (2.5 cartes)
   - Desktop : `basis-[28%]` (3.5 cartes)
4. **Espacement** : gap de 20px (`-ml-5` / `pl-5`) comme dans ActualitesSection
5. **Animations** : conserver les `motion.div` avec `whileInView` et `whileHover` existants
6. **Navigation** : boutons prev/next centres sous le carrousel, style `border-2 border-campaign-lime` identique a ActualitesSection

## Fichiers modifies
- `src/components/ProgrammeSection.tsx` : refonte complete du layout en carrousel
- `src/components/EngagezVousSection.tsx` : refonte complete du layout en carrousel
