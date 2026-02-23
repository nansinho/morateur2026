
# Correction des largeurs de container - Page Equipe

## Probleme

Les cartes de l'equipe utilisent des largeurs fixes (`w-[260px]`) dans un scroll horizontal au lieu de remplir toute la largeur du container. La photo de groupe est aussi limitee par `max-w-5xl`. Le resultat : les elements semblent flotter sans occuper l'espace disponible.

## Solution

Remplacer le scroll horizontal par une **grille responsive** qui occupe tout le `container`, et supprimer la contrainte `max-w-5xl` sur la photo de groupe.

### Modifications dans `src/pages/Equipe.tsx`

**1. Photo de groupe (hero)** : Retirer `max-w-5xl mx-auto` pour que l'image prenne toute la largeur du container.

**2. Section equipe** : Remplacer le `flex overflow-x-auto` avec largeurs fixes par une grille CSS responsive :

```text
Avant :  flex gap-5 overflow-x-auto + w-[260px] fixe par carte
Apres :  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5
```

Chaque carte prendra automatiquement 25% de la largeur sur desktop, 50% sur tablette, 100% sur mobile -- plus besoin de largeurs fixes.

**3. Ratio des cartes** : Garder le ratio `aspect-[9/16]` existant mais les cartes s'adapteront fluidement a la largeur de leur colonne dans la grille.

**4. Conteneur** : Mettre les cartes dans le meme `container mx-auto px-4 sm:px-6` que le titre pour un alignement coherent.

### Structure finale

```text
container mx-auto
  +-- Titre "Nos colistiers"
  +-- Grid 4 colonnes (desktop)
       +-- Carte 1 (25%)
       +-- Carte 2 (25%)
       +-- Carte 3 (25%)
       +-- Carte 4 (25%)
```

### Fichier modifie
- `src/pages/Equipe.tsx` : lignes 49-66 (photo groupe) et lignes 80-125 (section equipe)
