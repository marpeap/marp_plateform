# Marpeap Digitals - Plateforme de Gestion Clients & Produits

Une plateforme MVP complète pour gérer des clients et leur proposer des produits, formations et objets physiques.

## 🚀 Stack Technique

- **Frontend** : Next.js 14 (App Router) + React 18 + TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Paiements** : Stripe Checkout
- **Déploiement recommandé** : Vercel

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (auth)/          # Pages d'authentification
│   ├── (public)/        # Pages publiques (catalogue)
│   ├── (protected)/     # Pages protégées (dashboard client)
│   ├── (admin)/         # Panneau d'administration
│   └── api/             # Routes API (Stripe, interactions)
├── components/
│   ├── ui/              # Composants UI réutilisables
│   ├── layout/          # Header, Footer
│   ├── products/        # Composants produits
│   ├── forms/           # Formulaires
│   └── admin/           # Composants admin
├── lib/
│   ├── supabase/        # Client et helpers Supabase
│   ├── stripe/          # Utilitaires Stripe
│   └── utils.ts         # Fonctions utilitaires
├── hooks/               # Hooks React personnalisés
└── types/               # Types TypeScript
```

## 🔧 Installation

### Prérequis

- Node.js 18+
- Compte Supabase
- Compte Stripe

### Étapes

1. **Cloner et installer les dépendances**
```bash
npm install
```

2. **Configurer les variables d'environnement**

Copier `env.example` vers `.env.local` et remplir les valeurs :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Configurer la base de données Supabase**

Exécuter les migrations SQL dans l'ordre :
- `supabase/migrations/001_initial_schema.sql` - Création des tables
- `supabase/migrations/002_rls_policies.sql` - Politiques de sécurité
- `supabase/migrations/003_seed_data.sql` - Données de démonstration

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📊 Base de Données

### Tables principales

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (extension de auth.users) |
| `categories` | Catégories de produits |
| `products` | Catalogue de produits/formations |
| `interactions` | Suivi des actions utilisateurs |
| `orders` | Commandes |
| `order_items` | Lignes de commande |

### Types de produits
- `digital` : Produits téléchargeables
- `physical` : Objets physiques
- `formation` : Formations en ligne

### Types d'interactions
- `view` : Consultation
- `interest` : Marqué comme intéressé
- `cart` : Ajouté au panier
- `purchase` : Acheté
- `download` : Téléchargé

## 🔐 Authentification

L'authentification est gérée par Supabase Auth avec :
- Inscription par email/mot de passe
- Connexion
- Réinitialisation du mot de passe
- Protection des routes via middleware

## 💳 Paiements Stripe

### Configuration

1. Créer un compte Stripe
2. Récupérer les clés API (test ou production)
3. Configurer le webhook pour `checkout.session.completed`

### Flux de paiement

1. L'utilisateur clique sur "Acheter"
2. Création d'une session Stripe Checkout
3. Redirection vers Stripe
4. Après paiement, webhook reçoit la confirmation
5. Création de la commande dans Supabase

## 👑 Panneau Admin

Accessible uniquement aux utilisateurs avec `role = 'admin'` dans la table `profiles`.

Pour créer un admin, exécuter dans Supabase SQL Editor :
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'votre@email.com';
```

### Fonctionnalités admin
- Dashboard avec statistiques
- Gestion des produits (CRUD)
- Liste des clients
- Gestion des commandes

## 📝 Modèles de Contenus

Des modèles de textes pour les produits, emails et messages sont disponibles dans `content/templates.md`.

## 🚀 Déploiement

### Vercel (recommandé)

1. Connecter le repo à Vercel
2. Configurer les variables d'environnement
3. Déployer

### Variables d'environnement Vercel
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL
```

## 📚 Documentation Complémentaire

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Support

Pour toute question ou assistance, contactez l'équipe de développement.

---

Développé avec ❤️ par Marpeap Digitals

