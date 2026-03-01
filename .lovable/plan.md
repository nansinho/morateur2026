

## Mise a jour du theme Sapin avec la nouvelle palette

Palette demandee :
- `#174895` → HSL ~220 73% 34% (bleu profond) — couleur principale
- `#43BB83` → HSL ~152 48% 50% (vert) — accent
- `#FFFFFF` → blanc — texte principal
- `#EFEFEF` → gris clair — texte secondaire

### Fichier modifie : `src/index.css`

**Theme `.theme-sapin`** — remapper toutes les variables :

| Variable | Ancienne valeur | Nouvelle valeur |
|---|---|---|
| `--background` | 221 60% 7% | 220 73% 10% (bleu tres sombre) |
| `--foreground` | 42 52% 90% (creme) | 0 0% 100% (blanc) |
| `--card` | 221 55% 11% | 220 70% 15% |
| `--card-foreground` | creme | blanc |
| `--primary` | 221 60% 15% | 220 73% 34% (#174895) |
| `--primary-foreground` | creme | blanc |
| `--secondary` | 221 50% 13% | 220 60% 25% |
| `--secondary-foreground` | creme | blanc |
| `--muted` | 221 45% 12% | 220 50% 18% |
| `--muted-foreground` | 150 15% 65% | 0 0% 94% (#EFEFEF) |
| `--accent` | 165 69% 34% | 152 48% 50% (#43BB83) |
| `--accent-foreground` | blanc | blanc |
| `--border` | 221 40% 18% | 220 50% 22% |
| `--input` | idem | idem |
| `--ring` | 165 69% 34% | 152 48% 50% |
| `--campaign-teal` | 221 60% 15% | 220 73% 34% |
| `--campaign-teal-light` | 165 69% 34% | 220 60% 45% |
| `--campaign-steel` | 221 50% 13% | 220 60% 25% |
| `--campaign-ice` | 42 52% 90% | 0 0% 94% |
| `--campaign-olive` | 165 45% 30% | 152 40% 35% |
| `--campaign-lime` | 165 69% 34% | 152 48% 50% (#43BB83) |
| `--campaign-lime-light` | 140 45% 69% | 152 55% 62% |
| Sidebar vars | anciens bleu nuit/creme | memes tokens bleu/vert/blanc |
| `::selection` | lime ancien | 152 48% 50% / 0.3 |

Aussi mettre a jour la memoire style/theming pour refleter la nouvelle palette.

