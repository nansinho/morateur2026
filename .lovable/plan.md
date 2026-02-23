
## Refonte complete du Footer

Le probleme actuel : le fond `gradient-teal-deep` se confond avec le reste du site, et les opacites tres basses (`/20`, `/30`, `/40`) rendent le texte quasi invisible.

### Changements prevus (`src/components/Footer.tsx`)

**1. Fond du footer**
- Remplacer `gradient-teal-deep` par un fond sombre solide : `bg-[#0B162C]` (bleu nuit profond) qui cree un vrai contraste avec le contenu du site
- Ajouter un separateur visuel en haut : un trait gradient lime pleine largeur (4px)

**2. Section CTA (partie haute)**
- Titre "Bouc Bel Air a de l'Avenir" : passer le texte en `text-white` au lieu de `text-primary-foreground` pour garantir la lisibilite
- Sous-titre : monter l'opacite a `/70` au lieu de `/40`
- Bouton CTA : conserver le style actuel (gradient-lime, tilt) qui fonctionne bien

**3. Grille principale (Logo / Nav / Socials)**
- Tous les textes : remplacer les `text-primary-foreground/60` par `text-white/70` et les `/30` par `text-white/50` pour une lisibilite correcte
- Labels "NAVIGATION" et "SUIVEZ-NOUS" : garder en `text-campaign-lime` (bien visible sur fond sombre)
- Separateurs : monter de `/[0.06]` a `/[0.15]` pour qu'ils soient visibles

**4. Barre copyright**
- Monter l'opacite du texte copyright de `/20` a `/50`
- Bouton retour en haut : border plus visible (`/20` au lieu de `/10`)

**5. Bloc SEO**
- Fond : utiliser `bg-[#060E1E]` (encore plus sombre que le footer) pour creer une separation nette
- Titre SEO : `text-white/30` au lieu de `text-background/20`
- Paragraphes : `text-white/20` au lieu de `text-background/15`

### Fichier modifie
- `src/components/Footer.tsx` uniquement
