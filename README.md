# BluePay — Site Vitrine

Site web vitrine professionnel pour **BluePay**, la solution SaaS de gestion de la paie marocaine.

🌐 **Domaine :** [bluepay.ma](https://bluepay.ma)

---

## Stack Technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16 (App Router) | Framework principal |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | 4 | Styles & Design System |
| Framer Motion | 12 | Animations |
| React Hook Form | 7 | Gestion des formulaires |
| Zod | 4 | Validation des schémas |
| Lucide React | latest | Icônes |
| next-sitemap | 4 | Génération sitemap SEO |

---

## Pages

| Route | Description |
|---|---|
| `/` | Accueil — Hero, Fonctionnalités, Avantages, CTA |
| `/solutions` | Modes de déploiement SaaS & On-Premise |
| `/pricing` | Offres tarifaires (Starter, Business, Enterprise) |
| `/simulateur` | Simulateur de paie Brut→Net & Net→Brut |
| `/contact` | Formulaire de contact + Google Maps |

---

## Architecture du Projet

```
src/
├── app/                  # Routes Next.js App Router + metadata SEO
│   ├── api/contact/      # Route Handler — envoi formulaire contact
│   ├── solutions/        # Page /solutions
│   ├── pricing/          # Page /pricing
│   ├── simulateur/       # Page /simulateur
│   └── contact/          # Page /contact
├── components/
│   ├── layout/           # Navbar, Footer, Container
│   └── ui/               # Button, Card, Badge, Input, Textarea, SectionTitle
├── features/             # Composants métier par domaine
│   ├── home/             # HeroSection, TrustBar, PresentationSection, FeaturesSection, AdvantagesSection
│   ├── solutions/        # SolutionCard, DeploymentDiagram, ComparisonTable
│   ├── pricing/          # PricingCard, PricingFAQ
│   ├── simulator/        # SimulatorEngine (IPayrollEngine + MockPayrollEngine), SimulatorBrutNet, SimulatorNetBrut
│   ├── contact/          # ContactForm, ContactInfo, MapEmbed
│   └── shared/           # CTASection, PageHero
├── data/                 # Données statiques centralisées (pricing.ts, features.ts, solutions.ts, contact.ts)
├── types/                # Types TypeScript globaux (index.ts)
├── constants/            # navigation.ts, site.ts
├── lib/                  # utils.ts (cn, formatCurrency)
└── services/             # contact.ts (appels API)
```

---

## Démarrage Local

```bash
# Cloner le repo
git clone https://github.com/[org]/bluepay-website.git
cd bluepay-website

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos valeurs

# Démarrer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'Environnement

Voir `.env.local.example` pour la liste complète.

| Variable | Description | Obligatoire |
|---|---|---|
| `SITE_URL` | URL de production | Non (défaut: https://bluepay.ma) |
| `SMTP_HOST` | Hôte SMTP pour le formulaire de contact | Oui (prod) |
| `SMTP_USER` | Utilisateur SMTP | Oui (prod) |
| `SMTP_PASS` | Mot de passe SMTP | Oui (prod) |
| `CONTACT_EMAIL` | Email destinataire des formulaires | Oui (prod) |

---

## Design System

Palette de couleurs définie dans `src/app/globals.css` via `@theme` Tailwind v4 :

| Token | Valeur | Usage |
|---|---|---|
| `primary` | `#0066CC` | CTA, liens actifs, icônes |
| `primary-dark` | `#004499` | Hover states |
| `secondary` | `#0099E6` | Accents, badges |
| `dark` | `#0A1628` | Textes, fond header |
| `surface` | `#F8FAFC` | Sections alternées |
| `muted` | `#64748B` | Textes secondaires |

---

## Simulateur de Paie — Architecture

Le simulateur est conçu pour un branchement facile avec le moteur réel BluePay :

```typescript
// src/features/simulator/SimulatorEngine.ts
export interface IPayrollEngine {
  calculateBrutToNet(input: SimulatorInputBrutNet): SimulatorResult;
  calculateNetToBrut(input: SimulatorInputNetBrut): SimulatorResult;
}

// Remplacer MockPayrollEngine par le vrai moteur lors de l'intégration
export const payrollEngine: IPayrollEngine = new MockPayrollEngine();
```

Pour intégrer le moteur réel, créer une classe `RealPayrollEngine implements IPayrollEngine` et remplacer l'instance exportée.

---

## Build & Production

```bash
# Build de production (inclut génération du sitemap)
npm run build

# Démarrer le serveur de production
npm start
```

---

## Déploiement — Ubuntu + Nginx + PM2

### 1. Prérequis serveur

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
npm install -g pm2

# Nginx
sudo apt install -y nginx

# Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Déploiement initial

```bash
# Cloner le repo sur le serveur
git clone https://github.com/[org]/bluepay-website.git /var/www/bluepay-website
cd /var/www/bluepay-website

# Installer les dépendances de production
npm ci

# Configurer les variables d'environnement
cp .env.local.example .env.production.local
nano .env.production.local  # remplir les valeurs

# Build
npm run build

# Démarrer avec PM2
pm2 start npm --name "bluepay-website" -- start
pm2 save
pm2 startup  # configurer le démarrage automatique
```

### 3. Configuration Nginx

Créer `/etc/nginx/sites-available/bluepay.ma` :

```nginx
server {
    listen 80;
    server_name bluepay.ma www.bluepay.ma;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bluepay.ma www.bluepay.ma;

    ssl_certificate /etc/letsencrypt/live/bluepay.ma/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bluepay.ma/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache des assets statiques
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/bluepay.ma /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4. SSL Let's Encrypt

```bash
sudo certbot --nginx -d bluepay.ma -d www.bluepay.ma
```

Le renouvellement automatique est géré par le timer systemd certbot. Vérifier :

```bash
sudo systemctl status certbot.timer
```

### 5. Configuration DNS

| Type | Nom | Valeur |
|---|---|---|
| A | `bluepay.ma` | `IP_SERVEUR` |
| A | `www.bluepay.ma` | `IP_SERVEUR` |
| MX | `bluepay.ma` | Votre serveur mail |

### 6. Mise à jour de production

```bash
cd /var/www/bluepay-website
git pull origin main
npm ci
npm run build
pm2 restart bluepay-website
```

---

## Convention de Commits

Ce projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: implement home page
feat: add payroll simulator
fix: resolve navigation mobile issue
style: improve responsive layout
refactor: reorganize feature components
chore: update dependencies
```

---

## SEO

- Metadata Next.js (title, description, keywords) sur chaque page
- Open Graph + Twitter Cards
- `robots.txt` dans `public/`
- `sitemap.xml` généré automatiquement lors du build via `next-sitemap`
- Schema.org JSON-LD prévu sur la home et la page contact

---

## Licence

Propriétaire — © 2024 BluePay. Tous droits réservés.
