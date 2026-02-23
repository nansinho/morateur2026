

## Attribuer une couleur unique a chaque carte du Programme

Actuellement, les 5 cartes du carrousel Programme utilisent des couleurs generiques (gradient-lime, gradient-teal, campaign-steel, campaign-olive, gradient-teal-deep). Tu avais fourni 5 couleurs distinctes :

1. **#0B162C** - Bleu nuit profond
2. **#1B9476** - Vert teal
3. **#8BD59E** - Vert menthe
4. **#C7DBC2** - Sauge pale
5. **#F4EBD6** - Creme

### Plan

**Fichier : `src/components/ProgrammeSection.tsx`**

Remplacer le `bg` de chaque pilier par un fond inline utilisant directement les couleurs hex :

| Carte | Titre | Couleur fond | Texte |
|-------|-------|-------------|-------|
| 01 | Faire barrage aux promoteurs | `#1B9476` (teal) | Blanc |
| 02 | Des infrastructures a la hauteur | `#0B162C` (bleu nuit) | Blanc |
| 03 | Revitaliser le village | `#8BD59E` (menthe) | Bleu nuit |
| 04 | Environnement & cadre de vie | `#C7DBC2` (sauge) | Bleu nuit |
| 05 | Ecoles & jeunesse | `#F4EBD6` (creme) | Bleu nuit |

### Details techniques

- Remplacer les classes `bg` par des styles inline `style={{ background: '#...' }}` pour chaque carte, car ces couleurs exactes ne sont pas toutes dans le systeme Tailwind.
- Adapter `textColor`, `subtextColor` et `iconColor` pour assurer le contraste : texte blanc sur fonds sombres (01, 02), texte bleu nuit sur fonds clairs (03, 04, 05).
- Conserver la structure du carrousel et les animations existantes.

