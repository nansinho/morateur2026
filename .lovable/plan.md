

# Page Candidat - Lettre integrale de Mathieu Morateur

## Objectif

Creer une page dediee `/candidat` qui presente la lettre integrale du candidat dans un design editorial premium, avec des effets visuels et une mise en forme riche.

## Structure de la page

```text
Navbar
  |
  Hero (portrait + nom + section-label)
  |
  Lettre integrale
    - Salutation en accroche stylisee
    - Paragraphes avec mise en valeur des passages cles (highlights, citations pull-quotes, chiffres en gros)
    - Separateurs visuels entre les blocs thematiques
    - Encarts chiffres cles (1000 logements, 650 acceptes, 450 annules...)
    - Bloc signature + photo
  |
  CTA "Rejoignez-nous"
  |
  Footer
```

## Design editorial

La lettre sera decoupee en blocs thematiques avec des effets pour casser la monotonie d'un long texte :

1. **Pull-quotes** : Les phrases fortes extraites et affichees en grand format avec bordure lime (ex: "Ma motivation est de permettre a mes enfants de grandir avec les memes chances...")
2. **Chiffres-cles** : Les donnees marquantes (1000 logements, 650 acceptes, 30 degres dans les ecoles) mises en evidence dans des encarts animes avec compteurs
3. **Drop cap** : Premiere lettre du premier paragraphe en lettrine stylisee
4. **Fade-in au scroll** : Chaque bloc apparait avec une animation framer-motion au scroll
5. **Separateurs** : Lignes gradient lime entre les sections thematiques
6. **Mise en evidence** : Mots/phrases cles en gras ou en couleur lime dans le texte

## Decoupage thematique de la lettre

| Bloc | Theme | Effet special |
|------|-------|---------------|
| 1 | Introduction personnelle | Drop cap + pull-quote motivation |
| 2 | Urbanisme / promoteurs | Encart chiffres (1000, 650, 450 logements) |
| 3 | Infrastructures degradees | Pull-quote sur les 30 degres dans les ecoles |
| 4 | Village qui se meurt | Pull-quote sur les souvenirs d'enfance |
| 5 | Parcours et competences | Highlights iconiques (comme sur la section candidat actuelle) |
| 6 | Appel a l'engagement | Signature + CTA |

## Modifications techniques

### Fichier 1 : `src/pages/Candidat.tsx` (nouveau)

- Page complete avec Navbar, Footer, useDocumentMeta
- Hero similaire aux autres pages (gradient-teal-deep, section-label, h1 style)
- Corps de la lettre en prose stylisee avec les effets decrits ci-dessus
- Composants internes : PullQuote, StatHighlight, LetterBlock
- Animations framer-motion whileInView sur chaque bloc
- Image du candidat reutilisee depuis `header_candidat_portrait.png`
- Fond `gradient-teal-deep` coherent avec le reste du site

### Fichier 2 : `src/App.tsx`

- Ajouter la route `/candidat` pointant vers la nouvelle page

### Fichier 3 : `src/components/Navbar.tsx`

- Modifier le lien "Le Candidat" dans navItems : changer `/#candidat` en `/candidat` pour pointer vers la nouvelle page dediee

### Fichier 4 : `public/sitemap.xml`

- Ajouter `/candidat` dans le sitemap

### Fichiers concernes : 4 fichiers (1 nouveau, 3 modifies)

