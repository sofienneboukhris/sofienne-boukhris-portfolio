# Documentation Technique Complète — Sofienne Boukhris Portfolio & Plateforme Client

---

## 1. Présentation Générale du Projet

### 1.1 Contexte et Objectif Principal
La plateforme **Sofienne Boukhris** est une application web full-stack moderne conçue pour présenter l'activité de développeur web freelance full-stack et expert SEO basé à Sousse (Tunisie). Au-delà d'un portfolio vitrine classique, le système intègre un ensemble d'outils interactifs et d'administration à forte valeur ajoutée :
- Un **calculateur de devis en ligne dynamique et multi-devises** permettant aux prospects d'estimer instantanément le budget de leur projet selon l'envergure, les options techniques sélectionnées et leur localisation géographique.
- Un **moteur de détection de devises et géolocalisation par IP/fuseau horaire** prenant en charge 11 devises internationales (avec traitement prioritaire du Dinar tunisien et des marchés européens/américains).
- Un **système de routage international trilingue** (Français, Anglais, Arabe avec support complet de la lecture RTL).
- Un **back-office d'administration sécurisé** (11 onglets de gestion) permettant la gestion de contenu (CMS), la supervision des leads, l'audit SEO automatisé, le monitoring analytique autonome et la configuration tarifaire.
- Une infrastructure technique optimisée pour le **référencement naturel (SEO)** avec balisage Schema.org JSON-LD, sitemap XML dynamique généré par le serveur et pages d'atterrissage locales ciblées (Tunisie, Sousse).

---

## 2. Vue d'Ensemble de l'Architecture Technique

L'application repose sur une architecture **Full-Stack JavaScript/TypeScript** découplée mais co-hébergée, combinant un serveur HTTP Node.js/Express et une Single Page Application (SPA) React compilée via Vite :

```
                                      ┌──────────────────────────────────────────────┐
                                      │           Navigateur Client (SPA)            │
                                      │  React 19 + TypeScript + Tailwind CSS v4     │
                                      └───────┬───────────────────────────────▲──────┘
                                              │                               │
                      Requêtes API (JSON)     │                               │ Réponses JSON / Assets
                      & Authentification JWT  │                               │ HTML / WebManifest
                                              ▼                               │
┌─────────────────────────────────────────────────────────────────────────────┴──────┐
│                            Serveur Backend (server.ts)                             │
│                  Express 4 + Middleware Vite (Dev) / Static Serve (Prod)           │
│                                                                                    │
│   ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────────────┐   │
│   │   Rate Limiters     │  │   Auth Middleware   │  │   Générateur Sitemap     │   │
│   │ (Auth/Register/Lead)│  │ (requireAuth / JWT) │  │       Dynamique XML      │   │
│   └─────────────────────┘  └─────────────────────┘  └──────────────────────────┘   │
└──────────────┬──────────────────────────────┬──────────────────────────────┬───────┘
               │                              │                              │
               ▼                              ▼                              ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────┐
│  PostgreSQL / Cloud SQL      │ │   Client & Admin Firebase    │ │ Services Externes│
│  (Drizzle ORM + Pool 'pg')   │ │   (SDKs client & admin)      │ │                  │
│                              │ │                              │ │ - country.is     │
│ - admins                     │ │ - Firebase Auth              │ │   (Géo-IP)       │
│ - site_config (JSONB)        │ │ - Firestore Database         │ │ - WhatsApp API   │
│ - calculator_leads (JSONB)   │ │   (Instance ai-studio-       │ │   (Direct Chat)  │
│ - form_submissions           │ │    sofienneboukhris-...)     │ │                  │
│ - users                      │ │                              │ │                  │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────┘
```

---

## 3. Synthèse des Technologies Utilisées

| Domaine | Technologies & Bibliothèques | Version / Détail |
| :--- | :--- | :--- |
| **Langage Principal** | TypeScript | `~5.8.2` (Typage strict de bout en bout) |
| **Frontend Framework** | React / React DOM | `^19.0.1` (Hooks, Contexts, Suspense, Lazy loading) |
| **Bundler & Outillage** | Vite / @vitejs/plugin-react / TSX / esbuild | Vite `^6.2.3`, TSX `^4.21.0` |
| **Design & UI** | Tailwind CSS v4, Lucide React, Motion | Tailwind `@tailwindcss/vite ^4.1.14`, `lucide-react ^0.546.0`, `motion ^12.23.24` |
| **Visualisation de Données**| Recharts | `^3.10.1` (Graphiques du tableau de bord Analytics) |
| **Traitement d'Images & SVG**| Sharp, Potrace | `sharp ^0.35.4`, `potrace ^2.1.8` |
| **Serveur Backend** | Node.js, Express, HTTP natif | Express `^4.21.2` |
| **Sécurité & Protection** | jsonwebtoken, bcryptjs, express-rate-limit | `jsonwebtoken ^9.0.3`, `bcryptjs ^3.0.3`, `express-rate-limit ^8.7.0` |
| **ORM & Base Relationnelle**| Drizzle ORM, Drizzle Kit, pg (node-postgres) | `drizzle-orm ^0.45.2`, `pg ^8.23.0`, PostgreSQL |
| **Écosystème Cloud / BaaS** | Firebase Web SDK, Firebase Admin SDK | `firebase ^12.19.0`, `firebase-admin ^14.4.0` |

---

## 4. Modèle de Données & Base de Données (PostgreSQL / Drizzle ORM)

La persistance relationnelle est pilotée par **Drizzle ORM** avec un pool de connexions global persistant (`Pool` de `pg`) géré dans `src/db/index.ts`.

### 4.1 Entités et Schéma (`src/db/schema.ts`)

#### 1. Table `admins`
Gère les comptes utilisateurs autorisés à accéder au tableau de bord.
- `id` : `serial` (Clé primaire).
- `name` : `text` (Nom complet de l'administrateur, non nul).
- `email` : `text` (Adresse email unique, non nul).
- `password_hash` : `text` (Mot de passe salé et haché via bcrypt avec un facteur de coût de 10).
- `role` : `varchar(50)` (Défaut : `'admin'`).
- `created_at` : `timestamp` (Défaut : date courante).

#### 2. Table `site_config`
Gère la persistance dynamique des contenus CMS (Services, Projets, Articles de Blog, Barèmes du Calculateur, Traductions).
- `id` : `serial` (Clé primaire).
- `key` : `text` (Clé unique d'identification, ex: `'app_data'`).
- `value` : `jsonb` (Document JSON complet contenant l'ensemble de l'état éditorial sérialisé).
- `updated_at` : `timestamp` (Horodatage de la dernière sauvegarde).

#### 3. Table `calculator_leads`
Stocke l'ensemble des estimations et demandes de devis générées via le calculateur interactif.
- `id` : `serial` (Clé primaire).
- `client_name` : `text` (Nom du demandeur).
- `client_email` : `text` (Email du demandeur).
- `client_phone` : `text` (Numéro de téléphone / WhatsApp).
- `client_company` : `text` (Société / Raison sociale).
- `project_type_id` : `text` (Identifiant du type de projet choisi).
- `project_type_name` : `text` (Nom textuel du type de projet).
- `selected_features` : `jsonb` (Liste des IDs des fonctionnalités cochées).
- `options` : `jsonb` (Niveau de design, délai d'exécution, niveau de support, volume de pages).
- `calculated_price` : `integer` (Prix total calculé).
- `currency` : `text` (Devise sélectionnée au moment du calcul, ex: `'TND'`, `'EUR'`, `'USD'`).
- `cost_breakdown` : `jsonb` (Ventilation complète du devis : prix de base, surcoût pages, options, multiplicateurs).
- `status` : `varchar(50)` (Statut de traitement du prospect : `'new'`, `'contacted'`, `'won'`, `'lost'`).
- `created_at` : `timestamp` (Date de soumission).

#### 4. Table `form_submissions`
Conserve tous les messages reçus via le formulaire de contact principal.
- `id` : `serial` (Clé primaire).
- `client_name` : `text` (Nom de l'expéditeur).
- `client_email` : `text` (Email).
- `client_phone` : `text` (Téléphone, si renseigné).
- `source` : `text` (Source de soumission, ex: `'Contact Form'`).
- `message` : `text` (Message incluant les détails de qualification : type de projet, budget estimé, délai souhaité, entreprise).
- `status` : `varchar(50)` (Statut de suivi : `'new'`, `'read'`, `'replied'`, `'archived'`).
- `created_at` : `timestamp` (Date d'envoi).

#### 5. Table `users`
Prévue pour l'association entre identifiants Firebase Auth et profil applicatif.
- `id` : `serial` (Clé primaire).
- `uid` : `text` (Identifiant unique Firebase Auth UID).
- `email` : `text` (Adresse email).
- `created_at` : `timestamp`.

---

## 5. Description Détaillée des Modules Développés

---

### Module 1 : Serveur Backend & Passerelle d'API REST
- **Localisation** : `/server.ts`, `src/middleware/auth.ts`
- **Objectif Principal** : Point d'entrée serveur Express hébergeant l'API REST, gérant le contrôle d'accès JWT, appliquant les règles de limitation de débit (rate limiting) et servant les assets statiques ainsi que le sitemap XML dynamique.
- **Fonctionnalités Implémentées** :
  - Headers de sécurité stricts : `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`.
  - Body parsers avec limitation de charge utile à 1 Mo pour parer les attaques par déni de service (DoS).
  - Rate Limiting granulaire :
    - Authentification (`authLimiter`) : 5 tentatives par tranche de 15 minutes.
    - Inscription (`registerLimiter`) : 3 créations par heure.
    - Soumissions publiques (`submissionLimiter`) : 10 envois par heure par IP.
  - Endpoints exposés :
    - `GET /api/health` : Bilan de santé du serveur.
    - `GET /sitemap.xml` : Génération à la volée d'un sitemap XML complet avec priorités, fréquences de mise à jour et injection dynamique des slugs de services, projets et articles de blog existants.
    - `GET /api/config` & `POST /api/config` : Lecture publique et mise à jour protégée (admin) de la configuration globale du site.
    - `POST /api/calculator-leads` & `GET|PATCH|DELETE /api/calculator-leads` : Collecte publique et gestion administrative des prospects du calculateur.
    - `POST /api/form-submissions` & `GET|PATCH|DELETE /api/form-submissions` : Réception publique et administration des messages de contact.
    - `POST /api/auth/register` : Création sécurisée d'un administrateur (exige la clé secrète `ADMIN_INVITE_SECRET`).
    - `POST /api/auth/login` : Authentification admin et émission du token JWT valable 24 heures.
    - `GET /api/users` : Route protégée pour la récupération des profils.
- **Technologies** : Node.js, Express, jsonwebtoken, bcryptjs, express-rate-limit, Drizzle ORM.
- **Interactions** : Interagit directement avec la couche base de données (`src/db/*`) et le middleware d'authentification `src/middleware/auth.ts`.

---

### Module 2 : Routage & Système International Trilingue
- **Localisation** : `src/context/RouterContext.tsx`, `src/utils/i18nHelper.ts`, `src/data/translations.ts`
- **Objectif Principal** : Gestion de l'historique de navigation SPA sans dépendance de routage externe lourde, avec prise en charge complète du multilinguisme en Français (`fr`), Anglais (`en`) et Arabe (`ar`).
- **Fonctionnalités Implémentées** :
  - Synchronisation bidirectionnelle avec l'historique du navigateur via l'API HTML5 `window.history` (`pushState`, `popState`).
  - Détection automatique de la langue courante à partir du préfixe de chemin d'accès (`/en/*` ou `/ar/*` -> `en` ou `ar`, sinon fallback sur `fr`).
  - Table de correspondance de routes équivalentes bilingues (`ROUTE_MAP_FR_TO_EN` et `ROUTE_MAP_EN_TO_FR`) assurant le basculement contextuel instantané (ex : passage de `/tarifs` à `/en/pricing`, ou de `/realisations/ecommerce-mode-luxe` à `/en/projects/ecommerce-mode-luxe`).
  - Synchronisation automatique du DOM : mise à jour immédiate de `document.documentElement.lang` et de l'orientation de lecture `document.documentElement.dir` (`rtl` pour l'arabe, `ltr` pour le français et l'anglais).
  - Préservation des routes d'administration sans préfixe linguistique (`/admin/*`).
  - Résolution robuste des chaînes multilingues (`getLocalizedText` et `getLocalizedArray`) avec système de cascade : Langue demandée -> Français -> Anglais -> Fallback.
- **Technologies** : React Context, HTML5 History API, TypeScript.

---

### Module 3 : Détection Géographique & Multi-Devises
- **Localisation** : `src/context/CurrencyContext.tsx`, `src/utils/geoCurrency.ts`, `src/services/geoLocationMock.ts`
- **Objectif Principal** : Détection de la provenance géographique du visiteur et conversion dynamique des montants à travers 11 devises internationales.
- **Fonctionnalités Implémentées** :
  - Prise en charge de 11 devises : Dinar tunisien (`TND`), Euro (`EUR`), Dollar américain (`USD`), Livre sterling (`GBP`), Dollar canadien (`CAD`), Franc suisse (`CHF`), Dirham des Émirats (`AED`), Riyal saoudien (`SAR`), Dirham marocain (`MAD`), Dinar algérien (`DZD`), Dollar australien (`AUD`).
  - Processus de détection à deux niveaux :
    1. *Détection synchrone instantanée* au montage via le fuseau horaire (`Intl.DateTimeFormat().resolvedOptions().timeZone`) et la locale du navigateur (`navigator.language`).
    2. *Enrichissement asynchrone par IP* via l'API `https://api.country.is/` avec temporisation (timeout à 2s) et mise en cache dans `sessionStorage`.
  - Règle métier stricte : si l'environnement indique la Tunisie (fuseau `Africa/Tunis` ou pays `TN`), le Dinar tunisien (`TND`) reste la devise autoritaire prioritaire.
  - Moteur de conversion financière (`getAmountInCurrency`) avec règles d'arrondis commerciaux propres (paliers à 25, 10 ou 5 unités pour des tarifs élégants sans décimales superflues).
  - Profils de simulation géographique (`detectGeoLocationMock`, `MOCK_GEO_PROFILES`) permettant de tester instantanément le comportement de l'interface sous diverses localisations.
- **Technologies** : React Hooks, Web Storage API (`sessionStorage`), Fetch API, API `country.is`.

---

### Module 4 : Calculateur de Devis Interactif (Wizard 5 Étapes)
- **Localisation** : `src/views/CalculatorView.tsx`, `src/components/calculator/*`, `src/utils/calculatorLogic.ts`, `src/types/calculator.ts`
- **Objectif Principal** : Assistant interactif d'estimation budgétaire en temps réel permettant aux porteurs de projet de configurer leurs besoins et d'obtenir un devis détaillé.
- **Fonctionnalités Implémentées** :
  - **Étape 1 : Choix du type de projet** (`StepProjectType.tsx`) : 7 architectures (Site Vitrine, E-Commerce, Application Web SaaS, Landing Page, Portail Institutionnel, Refonte Globale, Développement Sur-Mesure) avec prix de base et quota de pages incluses.
  - **Étape 2 : Sélection modulaire des fonctionnalités** (`StepFeatures.tsx`) : Options classées par catégories (Paiement en ligne, Multilingue, Espace membre, SEO technique avancé, Blog intégré, etc.) avec tarification unitaire par devise.
  - **Étape 3 : Personnalisation avancée** (`StepCustomization.tsx`) :
    - Volume de pages supplémentaires (calcul automatique du surcoût à la page unitaire).
    - Degré de design (Template épuré x1.0, Design sur-mesure x1.25, Création artistique x1.5).
    - Délais de livraison (Standard x1.0, Accéléré x1.2, Express prioritaire x1.4).
    - Support & maintenance post-lancement (Documentation, Formation en direct, Support VIP).
  - **Étape 4 : Récapitulatif et ventilation des coûts** (`StepSummary.tsx`) : Affichage transparent de chaque poste de dépense, calcul du sous-total et du total final dans la devise choisie.
  - **Étape 5 : Coordonnées et transmission** (`StepContact.tsx`) :
    - Validation du nom, de l'email et du téléphone.
    - Génération d'une référence officielle unique au format `SB-DEV-YYYY-XXXX`.
    - Sauvegarde locale et transmission réseau au backend via `POST /api/calculator-leads`.
    - Bouton d'exportation vers WhatsApp générant un message pré-rempli exhaustif avec l'ensemble des choix du client et le montant estimé.
    - Copie du devis formaté dans le presse-papier en un clic.
  - Barre de progression animée (`CalculatorProgressBar.tsx`) et barre sticky de coût total (`CalculatorFloatingBar.tsx`).
  - Version condensée intégrable (`EmbeddedCalculator.tsx`) pour réutilisation dans d'autres vues.
- **Technologies** : React, Motion (animations d'étapes et transitions), Lucide Icons, Fetch API.

---

### Module 5 : CMS Interne & Gestionnaire d'État Global
- **Localisation** : `src/context/DataContext.tsx`, `src/utils/servicePricing.ts`, `src/data/*`
- **Objectif Principal** : Source unique de vérité (Single Source of Truth) pour l'intégralité des données dynamiques du site, accessible sur le front-end et administrable via le back-office.
- **Fonctionnalités Implémentées** :
  - Gestion des entités : Prestations de services, Projets du portfolio, Articles de blog, Configuration du calculateur, Grille des tarifs par page, Traductions complètes.
  - Stratégie de double persistance :
    1. Données d'amorçage embarquées (fichiers par défaut dans `src/data/`).
    2. Chargement initial distant depuis la base de données via `GET /api/config`.
    3. Sauvegarde automatique avec debouncing vers `POST /api/config` lors des modifications effectuées par un administrateur connecté (avec transmission du header `Authorization: Bearer <token>`).
  - Exportation intégrale de l'état du site au format JSON téléchargeable et importation avec validation de schéma.
  - Fonctionnalité de réinitialisation sécurisée vers les valeurs usine d'origine (`resetToDefaults`).
- **Technologies** : React Context, LocalStorage API, Fetch API.

---

### Module 6 : Espace d'Administration & Back-Office
- **Localisation** : `src/views/admin/*`, `src/components/ProtectedRoute.tsx`, `src/context/AuthContext.tsx`
- **Objectif Principal** : Console de commande unifiée réservée à l'administrateur, protégée par jeton JWT et mot de passe chiffré.
- **Onglets et Fonctionnalités** :
  1. **Vue Globale (`AdminOverviewTab.tsx`)** : Synthèse des indicateurs d'activité, compteurs d'articles, projets, services et statut de synchronisation.
  2. **Analytics (`AdminAnalyticsTab.tsx`)** : Tableau de bord de fréquentation complet avec graphiques Recharts (courbes de trafic quotidien, histogrammes de requêtes de devis, camemberts de répartition des navigateurs, OS, et pays d'origine, filtrage temporel aujourd'hui/hier/7j/30j/tout).
  3. **Audit SEO (`AdminSEOAuditTab.tsx`)** : Analyseur de conformité SEO explorant le contenu du site en temps réel. Analyse la longueur des balises `<title>`, les meta descriptions, la hiérarchie des titres `<h1>`-`<h6>`, la détection de liens internes brisés et l'attribution d'un score de santé sur 100 par page.
  4. **Services & Prestations (`AdminServicesTab.tsx`, `ServicePriceFields.tsx`)** : Création, modification, désactivation et suppression des services. Gestion granulaire des tarifs par devise (USD, TND, EUR, GBP, CAD).
  5. **Configuration du Calculateur (`AdminCalculatorTab.tsx`)** : Ajustement des prix de base par type de projet, surcoûts par fonctionnalité, prix de la page additionnelle par devise et coefficients multiplicateurs.
  6. **Demandes du Calculateur (`AdminCalculatorLeadsTab.tsx`)** : Liste des prospects ayant généré un devis. Filtrage par statut (`new`, `contacted`, `won`, `lost`), consultation du détail de la demande et suppression.
  7. **Formulaires & Messages (`AdminFormSubmissionsTab.tsx`)** : Gestionnaire des messages reçus depuis le formulaire de contact avec suivi des statuts (`new`, `read`, `replied`, `archived`).
  8. **Traductions (`AdminTranslationsTab.tsx`)** : Interface d'édition en direct des textes de l'application dans les trois langues (FR, EN, AR).
  9. **Articles de Blog (`AdminBlogTab.tsx`)** : Gestion éditoriale des publications techniques (création, mise à jour, publication, archivage).
  10. **Portfolio Réalisations (`AdminProjectsTab.tsx`)** : Administration des études de cas du portfolio (images, URL en direct, technologies, métriques de résultats).
  11. **Sauvegardes & Données (`AdminSettingsTab.tsx`)** : Outils d'exportation/importation JSON et contrôle du stockage.
- **Technologies** : React, Recharts, Lucide Icons, bcryptjs, jsonwebtoken.

---

### Module 7 : Moteur SEO Technique & Données Structurées
- **Localisation** : `src/components/SEOHead.tsx`, `server.ts` (`/sitemap.xml`), `index.html`, `public/robots.txt`
- **Objectif Principal** : Optimisation maximale du référencement naturel sur Google, Bing et réseaux sociaux.
- **Fonctionnalités Implémentées** :
  - Injection dynamique par page des balises `<title>`, `<meta name="description">`, `<meta name="keywords">` et `<link rel="canonical">`.
  - Balises OpenGraph et Twitter Card (`og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`).
  - Balisage sémantique **Schema.org en JSON-LD** injecté dynamiquement dans le `<head>` :
    - Entité `Person` : Profil de Sofienne Boukhris, spécialités, notation globale 5.0/5.0, réseaux sociaux, coordonnées.
    - Entité `WebSite` : Données de site web officiel avec URL canonique.
    - Entités contextuelles selon la page : `ProfessionalService` (pages de services), `FAQPage` (questions fréquentes avec schéma Q&A complet), `Article` (articles de blog avec date de publication et auteur), `BreadcrumbList` (fil d'Ariane hiérarchique).
  - Deux pages de destination locales dédiées (`LocalLandingView.tsx`) ciblant spécifiquement :
    - `/developpeur-web-tunisie`
    - `/developpeur-web-sousse`
  - Sitemap XML dynamique généré par le serveur (`server.ts`) listant toutes les déclinaisons linguistiques et les slugs dynamiques issus de la base de données.

---

### Module 8 : Recherche Globale Instantanée
- **Localisation** : `src/components/SearchModal.tsx`
- **Objectif Principal** : Palette de commande et recherche textuelle unifiée à travers tout le contenu du site.
- **Fonctionnalités Implémentées** :
  - Raccourci clavier universel (`Ctrl+K` / `Cmd+K`) ou déclenchement via l'icône de loupe de l'en-tête.
  - Recherche simultanée parmi les Services, les Réalisations du portfolio et les Articles de blog.
  - Algorithme de normalisation Unicode (NFD) insensible aux accents et à la casse (ex: "creation" trouve "création").
  - Filtres par onglets (`Tous`, `Projets`, `Blog`, `Services`).
  - Navigation complète au clavier (touches fléchées haut/bas, touche Entrée pour naviguer, touche Échap pour fermer).
- **Technologies** : React, Motion, Lucide Icons.

---

### Module 9 : Moteur d'Analyse d'Audience Autonome (Privacy-Friendly Analytics)
- **Localisation** : `src/services/analyticsService.ts`, `src/components/AnalyticsTracker.tsx`
- **Objectif Principal** : Suivi de fréquentation interne sans dépendance envers Google Analytics ni recours à des cookies tiers intrusifs.
- **Fonctionnalités Implémentées** :
  - Écoute automatique des changements de routes via le composant `AnalyticsTracker`.
  - Exclusion automatique du tracking sur les pages d'administration (`/admin/*`).
  - Détection automatique du navigateur (Chrome, Safari, Firefox, Edge, Opera, Samsung Internet) et du système d'exploitation (Windows, macOS, iOS, Android, Linux).
  - Classification intelligente de la source de trafic :
    - `search` : Moteurs de recherche (Google, Bing, Yahoo, DuckDuckGo, Ecosia, Qwant).
    - `social` : Réseaux sociaux (Facebook, LinkedIn, Twitter/X, Instagram, TikTok).
    - `campaign` : Liens sponsorisés avec paramètres `utm_source=`.
    - `referral` : Sites référents externes.
    - `direct` : Accès direct ou non renseigné.
  - Enregistrement des demandes de devis et corrélation de conversion.
  - Stockage local (`localStorage`) visualisable dans l'onglet Analytics du tableau de bord.
- **Technologies** : TypeScript, Web Storage API, Navigator API.

---

### Module 10 : Interaction Client, Formulaire & Newsletter
- **Localisation** : `src/components/ContactForm.tsx`, `src/components/Newsletter.tsx`, `src/components/WhatsAppButton.tsx`, `src/services/newsletterService.ts`
- **Objectif Principal** : Canaux de contact directs et engagement de l'audience.
- **Fonctionnalités Implémentées** :
  - Formulaire de contact avec qualification du besoin client (Type de projet, Budget estimé, Délai souhaité, Société, Description du projet).
  - Sécurité anti-spam par pot de miel (champ masqué honeypot).
  - Validation des adresses email conforme à la norme RFC 5322.
  - Inscription newsletter (`newsletterService.ts`) avec vérification d'unicité et simulation de latence réseau.
  - Bouton flottant WhatsApp permanent avec message pré-formaté selon la langue courante de navigation.

---

### Module 11 : Vues Publiques de l'Application
- **Localisation** : `src/views/*`
- **Objectif Principal** : Présentation soignée de l'offre commerciale et du savoir-faire technique.
- **Vues Implémentées** :
  - `HomeView.tsx` : Page d'accueil avec section Hero, badges de compétences, grille de services, aperçu des projets phares, témoignages clients et FAQ.
  - `ServicesIndexView.tsx` & `ServiceDetailView.tsx` : Catalogue et fiches de détail des prestations (vitrine, e-commerce, Laravel, Shopify, maintenance, SEO).
  - `ProjectsIndexView.tsx` & `ProjectDetailView.tsx` : Galerie et études de cas exhaustives (contexte, objectifs, architecture, technologies, captures, résultats chiffrés).
  - `PricingView.tsx` : Grille tarifaire claire avec sélecteur de devise interactif.
  - `AboutView.tsx` : Parcours professionnel, méthodologie de travail, valeurs et technologies maîtrisées.
  - `FAQView.tsx` : Foire aux questions catégorisée avec accordéons pliables et recherche intégrée.
  - `ContactView.tsx` : Page de contact avec coordonnées directes, réseaux sociaux et formulaire.
  - `BlogIndexView.tsx` & `BlogPostView.tsx` : Blog technique avec temps de lecture, badges de catégories, auteur et coloration syntaxique de code (`CodeBlock`).
  - `NotFoundView.tsx` : Page d'erreur 404 personnalisée avec liens de redirection rapide.
- **Technologies** : React, React.lazy/Suspense (découpage du bundle en chunks asynchrones), Motion.

---

## 6. Sécurité, Performance et Bonnes Pratiques

### 6.1 Sécurité
1. **Contrôle d'accès par JWT** : Le middleware `requireAuth` extrait et valide le jeton Bearer sur chaque endpoint sensible (`/api/config`, `/api/calculator-leads`, `/api/form-submissions`, `/api/users`).
2. **Hachage des mots de passe** : `bcryptjs` avec un sel robuste (salt rounds = 10) garantit l'inviolabilité des mots de passe administrateur en base de données.
3. **Protection contre l'enregistrement non autorisé** : L'endpoint `/api/auth/register` est verrouillé par la variable secrète `ADMIN_INVITE_SECRET`. Tout enregistrement sans ce secret valide est rejeté avec un code HTTP 403.
4. **Limitation de débit (Rate Limiting)** : Protection contre le force brute et le spam via `express-rate-limit` sur les points d'entrée critiques.
5. **Protection Anti-Spam Honeypot** : Les formulaires de contact et de newsletter intègrent des champs invisibles pour les humains piégeant les robots d'indexation automatisés.

### 6.2 Performance
1. **Code-Splitting (React.lazy & Suspense)** : Toutes les vues secondaires sont chargées dynamiquement à la demande, garantissant un temps de chargement initial minimal du bundle principal.
2. **Traitement d'images et Favicon haute résolution** : Utilisation de formats modernes WebP et SVG vectoriels (`favicon.svg`) assurant une netteté absolue sur tous les écrans sans pénalité de poids réseau.
3. **Mise en cache HTTP optimisée** : En production, les assets statiques compilés (`/assets/*`) sont servis avec l'en-tête `Cache-Control: public, max-age=31536000, immutable`, tandis que `index.html` est servi en `no-cache` pour garantir la fraîcheur applicative immédiate.
4. **Pool de connexions PostgreSQL persistant** : Déclaré dans le scope global Node.js pour éviter l'épuisement des sockets lors des rechargements à chaud.

---

## 7. Variables d'Environnement et Déploiement

### 7.1 Variables d'Environnement Requises (`.env.example`)
| Variable | Rôle et Usage | Obligatoire |
| :--- | :--- | :--- |
| `JWT_SECRET` | Clé secrète de signature et vérification des jetons d'authentification administrateur | Oui (en production) |
| `ADMIN_INVITE_SECRET` | Clé secrète requise pour autoriser la création d'un nouveau compte administrateur | Oui |
| `SQL_HOST` | Hôte du serveur PostgreSQL / Cloud SQL | Oui (si base active) |
| `SQL_USER` | Utilisateur de connexion à la base de données | Oui |
| `SQL_PASSWORD` | Mot de passe de l'utilisateur de base de données | Oui |
| `SQL_DB_NAME` | Nom de la base de données relationnelle | Oui |
| `GEMINI_API_KEY` | Clé d'API Google Gemini (injectée par AI Studio) | Optionnelle / Runtime |
| `APP_URL` | URL publique de déploiement de l'application | Injectée automatiquement |

### 7.2 Scripts de Build et Exécution (`package.json`)
- `npm run dev` : Lance le serveur de développement en direct (`tsx server.ts`) intégrant Vite en mode middleware.
- `npm run lint` : Vérification stricte des types TypeScript sans émission de code (`tsc --noEmit`).
- `npm run build` : Compilation conjointe du front-end via Vite (`vite build`) et compilation du serveur Node.js via esbuild (`esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`).
- `npm run start` : Exécution du serveur de production compilé (`node dist/server.cjs`).

---

## 8. État des Intégrations et Dépendances Externes

- **Cloud SQL / PostgreSQL** : Schéma relationnel complet défini via Drizzle ORM avec tables de gestion des administrateurs, des configurations, des leads et des messages.
- **Firebase Auth & Firestore** : Configuré dans `firebase-applet-config.json` et initialisé dans `src/lib/firebase.ts` et `src/lib/firebase-admin.ts` (projet `gen-lang-client-0522460274`, base `ai-studio-sofienneboukhris-43a81793-fe51-45fe-808a-ebe30e4e026a`). Actuellement, l'authentification administrateur fonctionne de manière autonome via JWT/PostgreSQL, laissant le module Firebase prêt pour l'authentification client/utilisateur.
- **Service Géo-IP `country.is`** : Consommé côté client pour la détection du code pays du visiteur avec bascule fluide vers le fuseau horaire en cas d'indisponibilité.
- **WhatsApp Web API** : Intégration par liens profonds universels (`https://wa.me/21653742140?text=...`) sans dépendance de SDK tiers.
