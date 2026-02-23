

## Diagnostic

Le theme "Sapin" est visuellement identique au theme par defaut car :

1. Les 7 variables `--campaign-*` sont copiees a l'identique dans `.theme-sapin`
2. Les variables structurelles (`--primary`, `--secondary`) ont aussi les memes valeurs
3. Seules `--background`, `--foreground`, `--card`, `--muted` et `--border` changent, mais la plupart des composants n'utilisent PAS `bg-background` — ils utilisent `bg-primary`, `gradient-teal-deep`, `text-primary-foreground` directement

Resultat : les sections principales (Hero, Candidat, Programme, Footer) sont 100% identiques entre les deux themes.

## Solution proposee

### Etape 1 — Redefinir les variables structurelles du theme Sapin dans `src/index.css`

Dans `.theme-sapin`, modifier les variables pour creer un vrai contraste :

- `--background` : fond tres sombre (bleu nuit profond, ex: `220 40% 6%`)
- `--foreground` : blanc casse (`210 20% 95%`)
- `--primary` : vert sapin moyen (`152 45% 28%`) au lieu du teal — c'est ca qui change le look des sections entieres
- `--primary-foreground` : blanc pur
- `--card` : bleu nuit legerement plus clair (`220 35% 10%`)
- `--muted` : bleu nuit moyen (`220 30% 14%`)
- `--accent` : vert sapin clair (`152 50% 40%`) au lieu du lime
- `--border` : bleu nuit borde (`220 25% 18%`)

### Etape 2 — Redefinir les variables campaign dans le theme Sapin

C'est ici que ca change vraiment. Dans `.theme-sapin` :

- `--campaign-teal` → vert sapin (`152 45% 28%`) au lieu de teal
- `--campaign-teal-light` → vert sapin clair (`152 40% 38%`)
- `--campaign-steel` → bleu nuit moyen (`220 30% 35%`)
- `--campaign-ice` → blanc casse (`210 20% 92%`)
- `--campaign-olive` → vert foret (`140 40% 30%`)
- `--campaign-lime` → vert sapin vif (`152 60% 45%`) — l'accent principal change de lime jaune-vert a vert sapin lumineux
- `--campaign-lime-light` → vert sapin lumineux (`152 55% 55%`)

### Etape 3 — Mettre a jour les gradients dans `src/index.css`

Les utilitaires `.gradient-teal`, `.gradient-teal-deep`, `.gradient-lime` utilisent deja `var(--campaign-*)`, donc ils s'adapteront automatiquement grace a l'etape 2. Rien a changer ici.

### Etape 4 — Verifier la Navbar (`src/components/Navbar.tsx`)

La navbar utilise `bg-primary` et `text-primary-foreground` qui changeront automatiquement. Le texte "2026" utilise `text-campaign-lime` qui deviendra vert sapin vif. Le bouton "Rejoignez-nous" utilise `gradient-lime` qui deviendra un degrade vert sapin. Pas de modification de code necessaire.

### Etape 5 — Verifier les composants principaux

Tous les composants suivants utilisent des variables CSS qui changeront automatiquement :
- `HeroSection.tsx` : `bg-primary`, `text-primary-foreground`, `text-campaign-lime` — OK
- `CandidateSection.tsx` : `gradient-teal-deep`, `text-campaign-lime` — OK
- `ProgrammeSection.tsx` : `gradient-teal-deep`, `bg-campaign-steel`, `bg-campaign-olive` — OK
- `Programme.tsx` : `bg-primary`, `gradient-teal`, `gradient-lime` — OK

Aucune modification de composant TSX necessaire.

## Resultat attendu

- **Theme clair (defaut)** : fond blanc, sections teal/bleu, accents lime jaune-vert — inchange
- **Theme Sapin** : fond bleu nuit profond, sections vert sapin, accents vert sapin lumineux — visuellement tres different

Seul le fichier `src/index.css` sera modifie (la section `.theme-sapin`).

## Details techniques

Fichier modifie : `src/index.css` (lignes 56-101)

La section `.theme-sapin` sera entierement reecrite avec les nouvelles valeurs HSL pour garantir une palette coherente et visuellement distincte du theme par defaut.
