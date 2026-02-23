

# Refonte de la page Equipe

## Problemes identifies

1. Il manque la section "Etapes de la campagne" (RoadmapSection) qui existait mais n'est pas incluse dans la page Equipe
2. Le header est trop simple -- il faut y integrer la photo d'equipe complete (image-41.png)
3. La structure generale des sections est a ameliorer

## Modifications prevues

### 1. Ajouter la photo d'equipe dans le header

La photo de groupe (image-41.png) sera copiee dans `src/assets/equipe-groupe.png` puis integree dans le hero de la page Equipe :
- Grande image panoramique sous le titre, avec un effet de gradient sombre par-dessus pour fondre dans le fond teal
- Format large (aspect-ratio ~3:1) avec `object-cover`
- Coins arrondis et ombre portee

### 2. Ajouter la RoadmapSection

Le composant `RoadmapSection` (etapes de la campagne) sera importe et insere entre la grille des membres et le CTA "Rejoignez l'aventure". C'est le meme composant deja utilise sur la page Programme.

### 3. Structure finale de la page

```text
+----------------------------------+
|  Navbar                          |
+----------------------------------+
|  Hero : titre + photo groupe     |
+----------------------------------+
|  Grille des 4 membres            |
+----------------------------------+
|  RoadmapSection (etapes)         |
+----------------------------------+
|  CTA "Rejoignez l'aventure"     |
+----------------------------------+
|  Footer                          |
+----------------------------------+
```

## Details techniques

### Fichiers modifies

**`src/pages/Equipe.tsx`** :
- Import de `equipeGroupe` depuis `@/assets/equipe-groupe.png`
- Import de `RoadmapSection` depuis `@/components/RoadmapSection`
- Dans le hero (section lignes 26-46) : ajout d'un bloc image panoramique apres le paragraphe de description, avec gradient overlay et coins arrondis
- Insertion de `<RoadmapSection />` entre la section team grid et la section CTA (entre lignes 99 et 101)

### Asset a copier

- `user-uploads://image-41.png` vers `src/assets/equipe-groupe.png`

