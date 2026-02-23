

# Refonte des cards "Rejoignez la campagne"

## Probleme
Les cards actuelles sont fades : gradients trop legers, icones petites, manque de personnalite et de couleur par theme.

## Solution
Redesign complet des 6 cards avec des couleurs vives et distinctes par theme, des icones plus grosses dans des cercles colores, des fonds plus marques et un effet hover plus dynamique.

## Details techniques

**Fichier modifie** : `src/components/EngagezVousSection.tsx`

### Nouveaux styles par card :
1. **J'agis sur le terrain** : fond lime/vert vif, bordure lime marquee, icone lime pleine
2. **Procuration** : fond teal/bleu profond, bordure teal, icone teal pleine
3. **Instagram** : fond rose/violet degrade, bordure pink, icone gradient pink-to-purple
4. **Facebook** : fond bleu Facebook, bordure bleue, icone bleue pleine
5. **Newsletter** : fond steel/bleu acier, bordure steel, icone steel pleine
6. **Le programme** : fond olive/vert, bordure olive, icone olive pleine

### Changements concrets :
- Fonds de cards avec des gradients plus satures (passer de `/15` a `/30-40`)
- Icones dans des cercles plus grands (w-14 h-14 au lieu de w-12 h-12) avec des couleurs plus vives
- Bordure gauche epaisse coloree par theme (border-l-4) pour un effet visuel fort
- Texte du titre en couleur du theme (pas juste foreground generique)
- Hover : shadow plus prononcee + scale plus fort + changement de fond
- Padding plus genereux et espacement ameliore
- Fond de section reste `campaign-ice` mais les cards ressortent bien plus

