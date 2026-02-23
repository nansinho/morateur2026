

# Amelioration des cards "Rejoignez la campagne"

## Problemes
1. Le hover n'est pas assez reactif (animations trop lentes ou subtiles)
2. La grille en 1 ligne de 6 est trop comprimee -- passer a 2 lignes de 3

## Changements

**Fichier** : `src/components/EngagezVousSection.tsx`

### Grille : 2 lignes de 3
- Changer `lg:grid-cols-6` en `lg:grid-cols-3`
- Garder `sm:grid-cols-3` et `grid-cols-2` pour mobile
- Supprimer `aspect-[3/4]` pour laisser les cards respirer en hauteur

### Hover plus reactif
- Reduire la `transition.duration` de framer-motion de 0.5s a 0.2s
- Augmenter le scale hover de 1.03 a 1.06
- Augmenter le lift de `y: -8` a `y: -12`
- Ajouter `transition-all duration-200` au className pour un CSS hover instantane
- Ajouter un changement de luminosite au hover (`brightness-110` ou fond plus clair)

