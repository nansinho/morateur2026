

# Remplacement des badges par le trait + refonte des boutons

## 1. Remplacer les badges par le style "trait + texte" (section-label)

Le site utilise deja un style `section-label` (trait horizontal lime + texte en majuscules) dans les sections Candidat, Roadmap et Procuration. Mais certaines sections utilisent encore des badges (pilules arrondies) peu lisibles. On va les uniformiser.

**Sections a modifier :**

- **HeroSection** : le badge "MUNICIPALES 2026" (pilule arrondie avec fond vert transparent) sera remplace par le style section-label (trait + texte), en version claire adaptee au fond sombre.
- **ActualitesSection** : le badge "SUR LE TERRAIN" (pilule gradient-teal) sera remplace par un `section-label`.
- **ProgrammeSection** : le label "Notre vision" est deja en texte simple mais sans le trait. On ajoutera la classe `section-label` pour y ajouter le trait lime.
- **EngagezVousSection** : le label "Passez a l'action" utilise deja `section-label` -- aucun changement.

## 2. Boutons plus fun et dynamiques

Les boutons CTA principaux seront rendus plus expressifs :

- **Legere rotation** : ajout d'un `rotate` de -1 a -2 degres sur les boutons principaux (lime) pour casser la rigidite.
- **Effets hover ameliores** : au survol, le bouton se redresse (`rotate-0`), grossit legerement (`scale(1.05)`), et gagne une ombre portee plus marquee.
- **Transition fluide** : animation CSS douce sur la rotation, l'echelle et l'ombre.

**Boutons concernes :**
- Hero : "Decouvrir le programme" et "Rejoignez-nous"
- Programme : "Voir le programme complet"
- Procuration : "Envoyer" et lien procuration

## Details techniques

### HeroSection.tsx
- Lignes 41-50 : remplacer le `div` badge par un `span` avec la classe `section-label` adaptee au fond sombre (texte campaign-lime, trait lime).
- Lignes 95-112 : ajouter `-rotate-1 hover:rotate-0` + `hover:shadow-2xl` sur les boutons, avec `transition-all duration-300`.

### ActualitesSection.tsx
- Lignes 62-65 : remplacer la pilule "Sur le terrain" par un `<span className="section-label">Sur le terrain</span>`.

### ProgrammeSection.tsx
- Le label "Notre vision" (ligne avec `text-campaign-lime`) sera remplace par un `section-label` adapte au fond sombre.
- Le bouton "Voir le programme complet" recevra la rotation et les effets hover.

### ProcurationSection.tsx
- Le bouton "Envoyer" recevra les memes effets de rotation et hover.

