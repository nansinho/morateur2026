

# Refonte Complete - Style Sportif, Fun et Premium

## Constat actuel
Le site est visuellement "mort" : le Hero ne s'affiche plus correctement (ecran navy vide), les couleurs sont ternes, la typographie manque de personnalite. Il faut tout reprendre de zero avec une identite forte.

---

## Nouvelle palette de couleurs (basee sur l'image fournie)

```text
Teal Profond    : #0E6E85  (couleur dominante, remplace le navy)
Bleu Acier      : #4A7FA8  (accents, fonds secondaires)
Glace           : #E4EEF8  (fond clair, sections alternees)
Vert Olive      : #5E8C2A  (succes, validations, nature)
Lime Vif        : #B2C714  (CTA, accents energiques, "fun")
```

Toutes les variables CSS seront mises a jour dans `src/index.css` pour cette nouvelle palette.

---

## Nouvelle typographie sportive

**Remplacement complet** des polices actuelles :
- **Titres** : `Sora` en extrabold uppercase -- geometrique, condensee, sportive
- **Corps** : `Plus Jakarta Sans` -- lisible, moderne  
- **Accents/chiffres** : `Sora` en bold avec tracking large

**Regle anti-debordement** : tous les titres auront `overflow-hidden`, `break-words` et des tailles responsives avec `clamp()` pour ne jamais depasser leur conteneur.

---

## Inspirations du site Rachida Dati (adaptees)

Ce qui est repris :
- Titres en gros blocs de texte empiles (mot par mot, ligne par ligne)
- Sections alternees photo+texte avec mise en page asymetrique
- Bande de texte defilant (marquee) coloree et energique
- Section "Rejoignez-moi" avec liens sociaux en grille
- Footer en colonnes structurees

Ce qui est DIFFERENT (pas le Hero de Dati) :
- Hero avec split 50/50 photo/texte, fond teal avec gradient dynamique
- Animations de texte qui defile et qui revele mot par mot (sportif)
- Boutons avec effet de pulse/glow lime

---

## Section par section

### 1. Navbar
- Fond **teal** au top, puis **blanc + ombre** au scroll
- Logo "MORATEUR 2026" en Sora bold uppercase, le "2026" en lime
- CTA "Rejoignez-nous" en lime vif (pas vert fonce)
- Liens en uppercase tracking large, taille controlee

### 2. Hero (refonte totale)
- Fond **teal profond** avec gradient diagonal vers bleu acier
- Layout split : texte a gauche (60%), photo du candidat a droite (40%)
- Titre empile style sportif :
  - Ligne 1 : "BOUC BEL AIR" en Sora extrabold blanc, taille clamp(3rem, 7vw, 6rem)
  - Ligne 2 : "A DE L'AVENIR" en lime vif, meme taille
- Animation : chaque mot slide-in depuis la gauche avec delai sequentiel
- Badge "Municipales 2026" compact en haut
- Sous-titre : "Avec Mathieu Morateur" en Plus Jakarta Sans
- 2 boutons : "Le Programme" (lime, fond plein) + "Rejoignez-nous" (bordure blanche)
- Fleche scroll en bas qui pulse

### 3. Marquee Band
- Fond **lime vif** avec texte **teal profond** (inversion pour impact)
- Police Sora bold uppercase
- Une seule bande, defilement fluide
- Icones Lucide entre les mots

### 4. Section Candidat
- Fond **glace** (bleu tres clair)
- Layout asymetrique : grande photo portrait a gauche (45%), texte a droite (55%)
- Label "LE CANDIDAT" en Sora uppercase tracking-widest, couleur lime
- Nom "MATHIEU MORATEUR" en gros Sora extrabold, empile sur 2 lignes
- Citation en gras (pas italic, pas serif) avec barre laterale lime
- Stats en 3 colonnes avec chiffres anime en lime et labels en teal
- 3 cartes competences sous le texte avec icones teal et fond blanc

### 5. Village Banner
- Photo parallax conservee (`projet-banner.png`)
- Overlay teal semi-transparent
- Titre "NOTRE VILLAGE, NOTRE AVENIR" en Sora extrabold blanc, taille clamp pour pas deborder
- Sous-texte defilant horizontalement (animation marquee locale)

### 6. Programme (Bento Grid)
- Fond **teal profond** 
- Titre "LE PROGRAMME" en blanc avec "PROGRAMME" en lime
- 3 cartes en bento grid (1 grande + 2 petites) sur fond blanc/glace
- Chaque carte : icone lime, titre Sora bold, liste a puces
- Bouton "Voir le programme complet" en lime

### 7. Roadmap
- Fond **blanc**
- Titre empile "LES GRANDES / ETAPES" avec "ETAPES" en lime
- Scroll horizontal conserve mais avec cartes fond glace, bordure teal/lime selon statut
- Numeros "01" "02" etc en Sora extrabold lime geant (mais en background, opacity faible)
- Cartes done = bordure lime + badge check lime

### 8. Actualites (conservee avec ajustements couleurs)
- Fond glace au lieu de muted
- Tags en lime/teal au lieu de green/gold
- Le reste est garde tel quel (carousel, hover, structure)

### 9. Equipe
- Fond **teal profond**
- Titre "L'EQUIPE" en blanc, Sora extrabold
- 4 cartes sur fond blanc/glace avec bordure teal subtile
- Chaque carte : icone dans cercle lime, nom en Sora bold, role en bleu acier, description en teal
- Hover : elevation + bordure lime

### 10. Engagez-vous
- Fond **lime vif** (section haute energie)
- Titre "REJOIGNEZ LA CAMPAGNE" en teal profond, Sora extrabold
- 6 actions en pills/boutons teal sur fond blanc, en flex wrap
- Effet hover : fond teal, texte lime

### 11. Procuration
- Fond **blanc**
- Titre empile avec "NOUS" en lime
- Formulaire sur fond glace avec bordures teal
- Bouton submit en lime vif
- Carte procuration avec fond teal et texte blanc

### 12. Footer
- Fond **teal profond** gradient
- Logo Sora bold, "2026" en lime
- 3 colonnes : navigation, suivez-nous, contact
- Separateur lime subtil
- Copyright discret

---

## Plan technique

### Fichiers modifies

| # | Fichier | Changements |
|---|---------|------------|
| 1 | `index.html` | Verifier import Google Fonts (Sora + Plus Jakarta Sans) |
| 2 | `src/index.css` | Nouvelle palette CSS (teal/bleu/glace/olive/lime), supprimer anciennes variables, nouveaux gradients |
| 3 | `tailwind.config.ts` | Mettre a jour les couleurs campaign-*, font-accent = Sora, supprimer font-editorial |
| 4 | `src/components/Navbar.tsx` | Fond teal->blanc, logo lime, CTA lime |
| 5 | `src/components/HeroSection.tsx` | Refonte complete : fond teal, titre empile sportif avec clamp(), animations slide-in, boutons lime |
| 6 | `src/components/MarqueeBand.tsx` | Fond lime, texte teal, Sora bold |
| 7 | `src/components/CandidateSection.tsx` | Fond glace, photo+texte, stats lime, cartes blanches |
| 8 | `src/components/VillageBanner.tsx` | Overlay teal, titre Sora clamp() |
| 9 | `src/components/ProgrammeSection.tsx` | Fond teal, cartes blanches, accents lime |
| 10 | `src/components/RoadmapSection.tsx` | Fond blanc, numeros lime, cartes glace |
| 11 | `src/components/ActualitesSection.tsx` | Fond glace, tags lime/teal |
| 12 | `src/components/TeamSection.tsx` | Fond teal, cartes blanches, icones lime |
| 13 | `src/components/EngagezVousSection.tsx` | Fond lime, texte teal, pills blancs |
| 14 | `src/components/ProcurationSection.tsx` | Fond blanc, accents lime/teal |
| 15 | `src/components/Footer.tsx` | Fond teal, accents lime |

### Points techniques anti-debordement
- Tous les titres utilisent `text-[clamp(Xrem, Yvw, Zrem)]` pour s'adapter
- `overflow-hidden` sur toutes les sections
- `break-words` et `max-w-full` sur les conteneurs de texte
- Test des tailles mobile/tablet/desktop via les valeurs clamp

### Aucune nouvelle dependance
- Sora et Plus Jakarta Sans sont deja importees via Google Fonts

