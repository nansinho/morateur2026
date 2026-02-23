
# Plan de centrage des titres dans les cartes du programme

L'objectif est de déplacer les titres et descriptions des cartes du programme (et par extension celles de la section engagement pour garder une cohérence) vers le centre vertical de chaque carte. Cela permet d'équilibrer le design "TikTok" en plaçant le message principal au cœur du visuel.

## Modifications proposées

### 1. Section Programme (`src/components/ProgrammeSection.tsx`)
- **Centrage vertical** : Dans la boucle d'affichage des piliers, le conteneur `div` qui enveloppe le titre (`h3`) et la description (`p`) passera d'un alignement `justify-end` à un alignement `justify-center`.
- **Rendu** : Le bloc de texte sera désormais positionné au milieu de la carte, entre l'icône (en haut) et l'indicateur "En savoir plus" (en bas).

### 2. Section Rejoignez la campagne (`src/components/EngagezVousSection.tsx`)
- **Cohérence visuelle** : Comme demandé précédemment pour que toutes les cartes soient similaires, j'appliquerai le même centrage vertical (`justify-center`) aux cartes d'action de cette section.
- **Rendu** : Les titres comme "Instagram", "Facebook" ou "Newsletter" seront centrés au milieu de leurs cartes respectives.

## Détails techniques
- Utilisation des classes utilitaires Tailwind CSS : remplacement de `justify-end` par `justify-center` sur les conteneurs `flex flex-col` qui portent la propriété `flex-1`.
- Conservation de la structure globale `justify-between` de la carte pour maintenir l'espacement entre les éléments fixes (icône en haut, indicateur en bas).

---
*Ce changement simple améliorera grandement la lisibilité en plaçant l'information textuelle là où l'œil se pose naturellement : au centre de la carte.*