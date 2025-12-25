# Configuration EmailJS

Ce guide vous explique comment configurer EmailJS pour recevoir les notifications par email lorsque quelqu'un remplit le formulaire de contact.

## 📋 Prérequis

1. Un compte EmailJS (gratuit) : [https://www.emailjs.com/](https://www.emailjs.com/)
2. Un service email (Gmail, Outlook, etc.)

## 🔧 Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer un service email

1. Dans le dashboard EmailJS, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte
5. **Notez le Service ID** (ex: `service_xxxxx`)

### 3. Créer un template email

1. Dans le dashboard, allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Utilisez ce template de base :

```
Sujet: Nouveau message de contact - {{from_name}}

Bonjour,

Vous avez reçu un nouveau message de contact depuis www.marpeap.digital :

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}

Service concerné: {{service}}
Type de projet: {{project_type}}
Budget: {{budget}}
Délai souhaité: {{timeline}}

Message:
{{message}}

---
Date: {{date}}
Répondre à: {{reply_to}}
```

4. **Notez le Template ID** (ex: `template_xxxxx`)

### 4. Obtenir la Public Key

1. Dans le dashboard, allez dans **Account** > **General**
2. Trouvez la section **API Keys**
3. **Notez la Public Key** (ex: `xxxxxxxxxxxxx`)

### 5. Configurer le fichier emailjs-config.js

1. Ouvrez le fichier `js/emailjs-config.js`
2. Remplacez les valeurs suivantes :

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'VOTRE_PUBLIC_KEY_ICI',
  SERVICE_ID: 'VOTRE_SERVICE_ID_ICI',
  TEMPLATE_ID: 'VOTRE_TEMPLATE_ID_ICI',
  RECIPIENT_EMAIL: 'adnan.najim@pm.me' // Déjà configuré
};
```

### 6. Variables disponibles dans le template

Les variables suivantes sont disponibles dans votre template EmailJS :

- `{{to_email}}` : Email du destinataire (adnan.najim@pm.me)
- `{{from_name}}` : Nom de l'expéditeur
- `{{from_email}}` : Email de l'expéditeur
- `{{phone}}` : Téléphone
- `{{service}}` : Service concerné
- `{{project_type}}` : Type de projet
- `{{budget}}` : Budget estimé
- `{{timeline}}` : Délai souhaité
- `{{message}}` : Message
- `{{reply_to}}` : Email pour répondre
- `{{subject}}` : Sujet de l'email
- `{{date}}` : Date et heure

## ✅ Vérification

1. Ouvrez la console du navigateur (F12)
2. Remplissez le formulaire de contact
3. Vous devriez voir :
   - `✅ EmailJS initialisé avec succès` (si configuré)
   - `✅ Email de notification envoyé avec succès` (après envoi)

## ⚠️ Dépannage

### EmailJS non initialisé

- Vérifiez que `js/emailjs-config.js` est bien chargé dans `contact.html`
- Vérifiez que la Public Key est correcte
- Vérifiez la console pour les erreurs

### Emails non reçus

- Vérifiez votre boîte spam
- Vérifiez que le Service ID et Template ID sont corrects
- Vérifiez les logs dans le dashboard EmailJS
- Vérifiez que le service email est bien connecté

### Erreur "EmailJS SDK not loaded"

- Vérifiez que le script EmailJS est inclus dans `contact.html`
- Vérifiez votre connexion internet
- Vérifiez que le CDN n'est pas bloqué

## 📝 Notes importantes

- **Gratuit** : Le plan gratuit d'EmailJS permet 200 emails/mois
- **Sécurité** : Ne partagez jamais vos clés publiques dans un repository public
- **Fallback** : Si EmailJS n'est pas configuré, les messages sont quand même sauvegardés dans Supabase ou localStorage

## 🔗 Liens utiles

- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Dashboard EmailJS](https://dashboard.emailjs.com/)
- [Support EmailJS](https://www.emailjs.com/support/)

