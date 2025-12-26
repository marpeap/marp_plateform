# 🔧 Correction des permissions Supabase

## ❌ Problème actuel

Vous recevez l'erreur :
```
POST https://bllhmxwzdkvmldqdjcxh.supabase.co/rest/v1/contacts 401 (Unauthorized)
Erreur Supabase: Error: permission denied for table contacts
```

Cela signifie que les **permissions RLS (Row Level Security)** ne sont pas correctement configurées dans Supabase.

## ✅ Solution

### Étape 1 : Ouvrir le SQL Editor de Supabase

1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Cliquez sur **"SQL Editor"** dans le menu de gauche

### Étape 2 : Exécuter le script SQL

1. Ouvrez le fichier `supabase-permissions.sql` dans ce projet
2. Copiez tout le contenu
3. Collez-le dans le SQL Editor de Supabase
4. Cliquez sur **"Run"** ou appuyez sur `Ctrl+Enter` (ou `Cmd+Enter` sur Mac)

### Étape 3 : Vérifier que ça fonctionne

1. Retournez sur votre site
2. Remplissez le formulaire de contact
3. Envoyez le message
4. Vérifiez la console du navigateur :
   - Vous devriez voir : `✅ Message sauvegardé dans Supabase`
   - Plus d'erreur 401

## 📋 Ce que fait le script SQL

Le script `supabase-permissions.sql` :

1. **Crée la table `contacts`** si elle n'existe pas déjà
2. **Active Row Level Security (RLS)** sur la table
3. **Crée une politique** qui permet à tous (clé anonyme) d'insérer des contacts
4. **Ne permet PAS la lecture** par défaut (sécurité)

## 🔒 Sécurité

- ✅ Les contacts peuvent être **insérés** par n'importe qui (nécessaire pour le formulaire public)
- ❌ Les contacts **ne peuvent pas être lus** par n'importe qui (seulement par vous via le dashboard Supabase)
- ✅ Vos données sont protégées

## 🧪 Test

Après avoir exécuté le script SQL, testez le formulaire :

1. Ouvrez `contact.html` dans votre navigateur
2. Ouvrez la console (F12)
3. Remplissez et envoyez le formulaire
4. Vérifiez les messages :
   - `✅ Email de notification envoyé avec succès à marpeap@gmail.com`
   - `✅ Message sauvegardé dans Supabase`
   - Plus d'erreur 401

## 📧 Important : L'email fonctionne maintenant même si Supabase échoue

J'ai modifié le code pour que **l'email soit envoyé AVANT** d'essayer de sauvegarder dans Supabase. Cela signifie que :

- ✅ **L'email sera toujours envoyé** à `marpeap@gmail.com`, même si Supabase échoue
- ✅ Le formulaire fonctionnera même si les permissions Supabase ne sont pas encore configurées
- ⚠️ Mais il est recommandé de corriger les permissions Supabase pour sauvegarder les messages

## 🔗 Liens utiles

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Documentation Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor Supabase](https://supabase.com/dashboard/project/_/sql)

