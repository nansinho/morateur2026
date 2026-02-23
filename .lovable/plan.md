
# Restructuration du site -- Accueil minimaliste + Pages separees

## Objectif
Transformer le site one-page en un site multi-pages avec une page d'accueil epuree et impactante, et des pages dediees pour le contenu detaille. Chaque section principale occupera 100vh (plein ecran).

## Architecture des pages

```text
/              -> Accueil minimaliste (Hero + Candidat + Programme apercu + CTA Rejoignez-nous)
/programme     -> Programme complet (existe deja, a adapter)
/equipe        -> Nouvelle page Equipe
/actualites    -> Nouvelle page Actualites
```

## Page d'accueil `/` (Index.tsx)

Sections conservees (chacune en 100vh ou min-h-screen) :
1. **Hero** -- deja 100vh, aucun changement
2. **MarqueeBand** -- bandeau entre hero et candidat (pas 100vh, c'est un element decoratif)
3. **CandidateSection** -- passe en `min-h-screen` avec centrage vertical via `flex items-center`
4. **ProgrammeSection** -- passe en `min-h-screen`, garde l'apercu des 5 piliers + bouton "Voir le programme complet" (lien vers /programme)
5. **ProcurationSection** (Rejoignez-nous / formulaire) -- passe en `min-h-screen`
6. **Footer**

Sections retirees de l'accueil :
- EngagezVousSection (les CTAs sont deja dans Procuration et le footer)
- VillageBanner (decoratif, alourdit la page)
- RoadmapSection (deplace dans /programme comme timeline)
- ActualitesSection (nouvelle page /actualites)
- TeamSection (nouvelle page /equipe)

## Nouvelle page `/equipe` (pages/Equipe.tsx)

- Navbar partagee (avec navigation inter-pages au lieu d'ancres)
- Section hero compacte avec titre "L'EQUIPE"
- Carrousel horizontal des membres (TeamSection actuel)
- Footer

## Nouvelle page `/actualites` (pages/Actualites.tsx)

- Navbar partagee
- Section hero compacte avec titre "ACTUALITES"
- Grille/carrousel des actualites (ActualitesSection actuel)
- Footer

## Mise a jour de la navigation (Navbar.tsx)

Les liens de navigation passent d'ancres (`#candidat`) a des routes :

```text
Le Candidat   -> /#candidat (scroll sur la home)
Programme     -> /programme
L'Equipe      -> /equipe
Actualites    -> /actualites
Procuration   -> /#procuration (scroll sur la home)
```

Le bouton "Rejoignez-nous" redirige vers `/#procuration`.

## Sections 100vh

Pour les sections principales (Candidat, Programme, Procuration), ajouter `min-h-screen flex items-center` sur le wrapper pour que chaque section occupe au minimum tout l'ecran avec le contenu centre verticalement.

## Fichiers concernes

| Fichier | Action |
|---|---|
| `src/pages/Index.tsx` | Retirer EngagezVous, VillageBanner, Roadmap, Actualites, Team |
| `src/pages/Equipe.tsx` | Creer -- Navbar + TeamSection + Footer |
| `src/pages/Actualites.tsx` | Creer -- Navbar + ActualitesSection + Footer |
| `src/App.tsx` | Ajouter routes `/equipe` et `/actualites` |
| `src/components/Navbar.tsx` | Passer les liens en routes (useNavigate) au lieu d'ancres |
| `src/components/CandidateSection.tsx` | Ajouter `min-h-screen` + centrage vertical |
| `src/components/ProgrammeSection.tsx` | Ajouter `min-h-screen` + centrage vertical |
| `src/components/ProcurationSection.tsx` | Ajouter `min-h-screen` + centrage vertical |
| `src/components/Footer.tsx` | Mettre a jour les liens de navigation vers les nouvelles routes |
| `src/pages/Programme.tsx` | Integrer la RoadmapSection en bas de page |
