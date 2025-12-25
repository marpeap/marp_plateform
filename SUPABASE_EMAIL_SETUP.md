# Configuration Email via Supabase Edge Functions

Ce guide vous explique comment configurer l'envoi d'emails via Supabase Edge Functions avec Resend, sans avoir besoin d'EmailJS.

## 🎯 Avantages

- ✅ Tout centralisé dans Supabase
- ✅ Pas besoin d'EmailJS
- ✅ Gratuit jusqu'à 3000 emails/mois avec Resend
- ✅ Meilleure délivrabilité
- ✅ Emails HTML personnalisés

## 📋 Prérequis

1. Un projet Supabase actif
2. Un compte Resend (gratuit) : [https://resend.com](https://resend.com)
3. Supabase CLI installé (optionnel, pour déployer la fonction)

## 🔧 Étapes de configuration

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit (3000 emails/mois)
3. Vérifiez votre email
4. Allez dans **API Keys** et créez une nouvelle clé API
5. **Copiez la clé API** (commence par `re_...`)

### 2. Vérifier votre domaine (optionnel mais recommandé)

Pour une meilleure délivrabilité, vous pouvez vérifier votre domaine :

1. Dans Resend, allez dans **Domains**
2. Ajoutez votre domaine (ex: `marpeap.digital`)
3. Suivez les instructions DNS pour vérifier le domaine
4. Une fois vérifié, vous pourrez utiliser `noreply@marpeap.digital` comme expéditeur

**Note:** Sans domaine vérifié, vous pouvez utiliser l'email fourni par Resend (ex: `onboarding@resend.dev`)

### 3. Déployer la Edge Function Supabase

#### Option A : Via Supabase Dashboard (Recommandé)

1. Allez dans votre projet Supabase
2. Naviguez vers **Edge Functions** dans le menu
3. Cliquez sur **Create a new function**
4. Nommez-la `send-contact-email`
5. Copiez le contenu de `supabase/functions/send-contact-email/index.ts`
6. Collez-le dans l'éditeur
7. Cliquez sur **Deploy**

#### Option B : Via Supabase CLI

```bash
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Se connecter à votre projet
supabase login

# Lier votre projet
supabase link --project-ref votre-project-ref

# Déployer la fonction
supabase functions deploy send-contact-email
```

### 4. Configurer les variables d'environnement

Dans votre projet Supabase :

1. Allez dans **Project Settings** > **Edge Functions** > **Secrets**
2. Ajoutez les secrets suivants :

```
RESEND_API_KEY = re_6DRGfv4b_HyskXKW7nxiGJKgFB7mekU4d
RECIPIENT_EMAIL = adnan.najim@pm.me
FROM_EMAIL = onboarding@resend.dev
```

**Note:** 
- Utilisez `onboarding@resend.dev` pour `FROM_EMAIL` tant que votre domaine n'est pas vérifié
- Une fois le domaine `marpeap.digital` vérifié (voir `RESEND_DNS_CONFIG.md`), vous pourrez utiliser `noreply@marpeap.digital` ou `contact@marpeap.digital`

### 5. Tester la fonction

Vous pouvez tester la fonction directement depuis le dashboard Supabase :

1. Allez dans **Edge Functions** > `send-contact-email`
2. Cliquez sur **Invoke function**
3. Utilisez ce JSON de test :

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+33 6 12 34 56 78",
  "service": "Développement Web",
  "project_type": "Nouveau projet",
  "budget": "À discuter",
  "timeline": "1-3 mois",
  "message": "Ceci est un message de test"
}
```

4. Cliquez sur **Invoke**
5. Vérifiez que vous recevez l'email

## ✅ Vérification

1. Remplissez le formulaire de contact sur votre site
2. Vérifiez la console du navigateur (F12)
3. Vous devriez voir : `✅ Email de notification envoyé avec succès via Supabase`
4. Vérifiez votre boîte email (et spam)

## 🔍 Dépannage

### La fonction ne s'exécute pas

- Vérifiez que la fonction est bien déployée
- Vérifiez les logs dans **Edge Functions** > **Logs**
- Vérifiez que les secrets sont bien configurés

### Erreur "Email service not configured"

- Vérifiez que `RESEND_API_KEY` est bien défini dans les secrets
- Vérifiez que la clé API est correcte

### Erreur "Failed to send email"

- Vérifiez que votre compte Resend est actif
- Vérifiez que vous n'avez pas dépassé la limite (3000/mois)
- Vérifiez les logs Resend dans leur dashboard

### Emails non reçus

- Vérifiez votre boîte spam
- Vérifiez que `RECIPIENT_EMAIL` est correct
- Vérifiez les logs dans Resend dashboard

## 📝 Structure de la fonction

La fonction Edge Function se trouve dans :
```
supabase/functions/send-contact-email/index.ts
```

Elle :
1. Reçoit les données du contact
2. Valide les données
3. Formate un email HTML
4. Envoie l'email via Resend
5. Retourne le résultat

## 🎨 Personnalisation de l'email

Vous pouvez modifier le template HTML dans `index.ts` pour personnaliser l'apparence de l'email.

## 🔗 Liens utiles

- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation Resend](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/emails)
- [Supabase Dashboard](https://app.supabase.com)
- [Configuration DNS pour Resend](RESEND_DNS_CONFIG.md) - Guide complet pour vérifier votre domaine

## 💡 Alternative : Utiliser un trigger de base de données

Au lieu d'appeler la fonction manuellement, vous pouvez créer un trigger PostgreSQL qui appelle automatiquement la fonction lorsqu'un nouveau contact est inséré :

```sql
-- Créer une fonction pour appeler l'Edge Function
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := current_setting('app.supabase_url') || '/functions/v1/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key')
      ),
      body := jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'phone', NEW.phone,
        'service', NEW.service,
        'project_type', NEW.project_type,
        'budget', NEW.budget,
        'timeline', NEW.timeline,
        'message', NEW.message
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER on_new_contact
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

**Note:** Cette méthode nécessite l'extension `pg_net` activée dans Supabase.

