

# Audit complet : Mobile-First, SEO/SEA/AEO et HTML semantique

## 1. Problemes identifies

### A. Mobile-First

- **`App.css`** : contient des styles par defaut de Vite (`max-width: 1280px`, `padding: 2rem` sur `#root`) qui contraignent inutilement le layout sur mobile.
- **Hero** : boutons CTA avec `px-10 py-5` trop grands sur petit ecran, pas de taille reduite mobile-first.
- **Navbar** : padding `px-6` fixe sans variante mobile (`px-4`).
- **EngagezVousSection** : `min-h-screen` force une hauteur excessive sur mobile pour seulement 6 cartes empilees.
- **CandidateSection** : `min-h-screen` inutile sur mobile (le contenu depasse deja la hauteur).
- **ProgrammeSection** : `min-h-screen` idem.
- **ProcurationSection** : `min-h-screen` idem.
- **ActualitesSection** : `min-h-screen` idem.
- **RoadmapSection** : cartes avec largeurs fixes (`w-[260px]`) plutot que fluides.
- **VillageBanner** : hauteur fixe `h-[60vh]` peut etre trop haute sur mobile paysage.
- **Footer** : grid 3 colonnes sans breakpoint tablette intermediaire.

### B. SEO / SEA / AEO

- **`index.html`** : manque `og:url`, `og:locale`, `canonical link`, `theme-color`, et `og:site_name`.
- **Pas de sitemap.xml** dans `/public`.
- **`robots.txt`** : ne reference pas le sitemap.
- **Pas de balise `<link rel="icon">` explicite** (seulement un `favicon.ico` implicite).
- **Donnees structurees (JSON-LD)** : aucune. Essentiel pour AEO (Answer Engine Optimization) -- les moteurs de recherche/IA ont besoin de schema.org pour comprendre le contenu.
- **Pages secondaires** (`/programme`, `/equipe`, `/actualites`) : pas de `<title>` ni `<meta description>` specifiques (SPA sans gestion de head dynamique).
- **Images** : pas d'attribut `loading="lazy"` sur la plupart des images (hero, candidat, village banner, actualites homepage).
- **Alt texts** : certains sont generiques ("Vue du village").

### C. HTML semantique

- **`<main>` sur toutes les pages** : correct.
- **`<section>` sans `aria-label`** : les sections n'ont pas de labels accessibles quand elles n'ont pas de `<h2>` visible imbriquee directement.
- **`<nav>` du footer** : pas de balise `<nav>` (juste des `<button>`).
- **Formulaire** : le `<form>` a un `role="form"` et `aria-label` -- correct.
- **Page 404** : pas de semantique `<main>`, pas de `<h1>` adapte, texte en anglais au lieu du francais.
- **Liens vs boutons** : les cartes programme utilisent `<div>` cliquable au lieu de `<a>` ou `<button>`.
- **Marquee** : pas de `role="marquee"` ou `aria-live`.
- **Images decoratives** : le carre lime derriere la photo candidat n'a pas `aria-hidden`.
- **`<head>`** : deux lignes vides/commentees (lignes 13-14).

---

## 2. Plan de corrections

### Fichier 1 : `src/App.css`
- Supprimer les styles `#root` herites de Vite (max-width, padding, text-align) qui brident le mobile.

### Fichier 2 : `index.html`
- Ajouter `<link rel="canonical">` pointant vers l'URL publiee.
- Ajouter `<meta property="og:url">`, `<meta property="og:locale" content="fr_FR">`, `<meta property="og:site_name">`.
- Ajouter `<meta name="theme-color" content="#0e6478">`.
- Ajouter `<link rel="icon" href="/favicon.ico">` explicite.
- Ajouter un bloc `<script type="application/ld+json">` avec des donnees structurees schema.org (Organization + WebSite + PoliticalCandidate).
- Nettoyer les lignes vides dans le `<head>`.

### Fichier 3 : `public/robots.txt`
- Ajouter `Sitemap: https://campaign-bright-spark.lovable.app/sitemap.xml`.

### Fichier 4 : `public/sitemap.xml` (nouveau)
- Creer un sitemap XML listant `/`, `/programme`, `/equipe`, `/actualites`.

### Fichier 5 : `src/components/HeroSection.tsx`
- Reduire padding des boutons CTA sur mobile : `px-6 py-4 sm:px-10 sm:py-5`.
- Ajouter `loading="eager"` et `fetchpriority="high"` sur l'image hero (LCP).
- Ameliorer l'alt text : "Mathieu Morateur, candidat aux municipales 2026 a Bouc-Bel-Air".

### Fichier 6 : `src/components/Navbar.tsx`
- Ajuster padding container : `px-4 sm:px-6`.
- Ajouter `aria-label="Navigation principale"` sur la `<nav>`.
- Ajouter `aria-expanded` sur le bouton mobile.

### Fichier 7 : `src/components/CandidateSection.tsx`
- Remplacer `min-h-screen` par rien (le contenu definit la hauteur naturellement).
- Ajouter `loading="lazy"` sur l'image candidat.
- Ajouter `aria-hidden="true"` sur le carre decoratif.

### Fichier 8 : `src/components/ProgrammeSection.tsx`
- Retirer `min-h-screen`.
- Ajouter `aria-label` sur la section.

### Fichier 9 : `src/components/EngagezVousSection.tsx`
- Retirer `min-h-screen`.
- Supprimer les imports Carousel inutilises.

### Fichier 10 : `src/components/ActualitesSection.tsx`
- Retirer `min-h-screen`.
- Ajouter `loading="lazy"` sur les images d'actualites.

### Fichier 11 : `src/components/ProcurationSection.tsx`
- Retirer `min-h-screen`.

### Fichier 12 : `src/components/VillageBanner.tsx`
- Ajuster hauteur mobile : `h-[50vh] md:h-[70vh]`.
- Ajouter `loading="lazy"` sur l'image.
- Ameliorer l'alt : "Vue panoramique de Bouc-Bel-Air, commune des Bouches-du-Rhone".

### Fichier 13 : `src/components/MarqueeBand.tsx`
- Ajouter `aria-label="Messages cles de la campagne"` et `role="marquee"`.

### Fichier 14 : `src/components/Footer.tsx`
- Envelopper la nav dans `<nav aria-label="Navigation secondaire">`.
- Rendre le lien de retour haut plus accessible : `aria-label="Retour en haut de page"`.

### Fichier 15 : `src/components/RoadmapSection.tsx`
- Rendre les cartes fluides : remplacer `w-[260px] sm:w-[300px] md:w-[320px]` par `w-[75vw] sm:w-[300px] md:w-[320px]` pour un meilleur scaling mobile.

### Fichier 16 : `src/pages/NotFound.tsx`
- Traduire en francais ("Page introuvable", "Retour a l'accueil").
- Envelopper dans `<main>`.
- Ajouter une balise `<title>` dynamique via document.title.

### Fichier 17 : Gestion des `<title>` dynamiques par page
- Ajouter un hook `useDocumentMeta` qui met a jour `document.title` et la meta description pour chaque page (`/programme`, `/equipe`, `/actualites`).
- Appliquer dans chaque page.

---

## 3. Details techniques

### Donnees structurees JSON-LD (dans index.html)

```text
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Morateur 2026",
      "url": "https://campaign-bright-spark.lovable.app"
    },
    {
      "@type": "Person",
      "name": "Mathieu Morateur",
      "jobTitle": "Candidat aux elections municipales 2026",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bouc-Bel-Air",
        "addressRegion": "Bouches-du-Rhone"
      }
    }
  ]
}
```

### Hook useDocumentMeta

Un hook simple utilise dans chaque page pour definir le titre et la description :

```text
useDocumentMeta({
  title: "Programme | Morateur 2026",
  description: "Decouvrez les 3 piliers du programme..."
});
```

### Fichiers concernes : 17 fichiers au total
- 1 nouveau fichier : `public/sitemap.xml`
- 1 nouveau hook : `src/hooks/useDocumentMeta.ts`
- 15 fichiers existants modifies

