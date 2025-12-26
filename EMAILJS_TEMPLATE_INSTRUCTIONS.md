# Instructions pour configurer le template EmailJS

Ce guide vous explique comment utiliser le template HTML fourni dans EmailJS.

## 📋 Variables disponibles

Le template utilise les variables suivantes qui sont automatiquement remplies par le formulaire :

- `{{from_name}}` - Nom complet de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{phone}}` - Numéro de téléphone
- `{{service}}` - Service concerné
- `{{project_type}}` - Type de projet
- `{{budget}}` - Budget estimé
- `{{timeline}}` - Délai souhaité
- `{{message}}` - Message du formulaire
- `{{date}}` - Date et heure (format français)
- `{{to_email}}` - Email du destinataire (adnan.najim@pm.me)
- `{{reply_to}}` - Email pour répondre (identique à from_email)
- `{{subject}}` - Sujet de l'email

## 🔧 Configuration dans EmailJS

### 1. Créer le template

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Connectez-vous à votre compte
3. Allez dans **Email Templates**
4. Cliquez sur **Create New Template**

### 2. Configurer le template

1. **Template Name** : `Contact Form Notification` (ou un nom de votre choix)

2. **Subject** : 
   ```
   Nouveau message de contact - {{from_name}}
   ```

3. **Content** : 
   - Copiez tout le contenu du fichier `EMAILJS_TEMPLATE.html`
   - Collez-le dans l'éditeur EmailJS
   - **Important** : Dans EmailJS, utilisez le mode **HTML** (pas Text)

4. **From Name** : `Marpeap Digitals`

5. **From Email** : Utilisez l'email de votre service EmailJS configuré

6. **To Email** : `adnan.najim@pm.me`

7. **Reply To** : `{{reply_to}}` (ou `{{from_email}}`)

### 3. Tester le template

1. Dans EmailJS, utilisez l'onglet **Test** du template
2. Remplissez les variables de test :
   ```json
   {
     "from_name": "Jean Dupont",
     "from_email": "jean.dupont@example.com",
     "phone": "+33 6 12 34 56 78",
     "service": "Développement Web",
     "project_type": "Nouveau projet",
     "budget": "À discuter",
     "timeline": "1-3 mois",
     "message": "Bonjour, je souhaite créer un site web pour mon entreprise.",
     "date": "27 janvier 2025, 14:30",
     "to_email": "adnan.najim@pm.me",
     "reply_to": "jean.dupont@example.com",
     "subject": "Nouveau message de contact - Jean Dupont"
   }
   ```
3. Cliquez sur **Send Test Email**
4. Vérifiez que vous recevez l'email avec le bon formatage

### 4. Noter le Template ID

1. Une fois le template créé, **copiez le Template ID**
2. Il ressemble à : `template_xxxxx`
3. Remplacez `YOUR_TEMPLATE_ID` dans `js/emailjs-config.js` par ce Template ID

## 📝 Notes importantes

- Le template utilise des **styles inline** pour une compatibilité maximale avec les clients email
- Les **icônes emoji** sont utilisées pour une meilleure lisibilité
- Le design est **responsive** et s'adapte aux différentes tailles d'écran
- Les couleurs utilisées sont celles de votre marque (gradient violet/bleu)

## 🎨 Personnalisation

Vous pouvez personnaliser le template en modifiant :

- **Couleurs** : Remplacez `#667eea` et `#764ba2` par vos couleurs de marque
- **Icônes** : Remplacez les emojis par d'autres si vous préférez
- **Structure** : Ajoutez ou supprimez des sections selon vos besoins

## ✅ Vérification finale

Une fois configuré :

1. Vérifiez que `js/emailjs-config.js` contient :
   - `SERVICE_ID: 'service_gvyrpik'` ✅
   - `TEMPLATE_ID: 'template_xxxxx'` (votre Template ID)
   - `PUBLIC_KEY: 'votre_public_key'` (votre Public Key)

2. Testez le formulaire de contact sur votre site
3. Vérifiez que vous recevez l'email avec le bon formatage

## 🔗 Liens utiles

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Documentation EmailJS Templates](https://www.emailjs.com/docs/user-guide/creating-email-templates/)
- [Guide de configuration EmailJS](EMAILJS_SETUP.md)


