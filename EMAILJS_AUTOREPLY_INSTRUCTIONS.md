# Instructions pour configurer l'Auto-Reply EmailJS

Ce guide vous explique comment configurer l'email d'auto-réponse qui sera envoyé automatiquement au client après qu'il ait soumis le formulaire de contact.

## 📋 Variables disponibles

Le template utilise les variables suivantes :

- `{{from_name}}` - Nom complet du client
- `{{from_email}}` - Email du client (destinataire de l'auto-réponse)
- `{{service}}` - Service concerné
- `{{project_type}}` - Type de projet
- `{{timeline}}` - Délai souhaité
- `{{message}}` - Message du client
- `{{date}}` - Date et heure (format français)

## 🔧 Configuration dans EmailJS

### 1. Créer le template Auto-Reply

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Connectez-vous à votre compte
3. Allez dans **Email Templates**
4. Cliquez sur **Create New Template**

### 2. Configurer le template

1. **Template Name** : `Contact Form Auto-Reply` (ou un nom de votre choix)

2. **Subject** : 
   ```
   Merci pour votre message - Marpeap Digitals
   ```
   ou
   ```
   Confirmation de réception - {{from_name}}
   ```

3. **Content** : 
   - Copiez tout le contenu du fichier `EMAILJS_AUTOREPLY_TEMPLATE.html`
   - Collez-le dans l'éditeur EmailJS
   - **Important** : Utilisez le mode **HTML** (pas Text)

4. **From Name** : `Marpeap Digitals`

5. **From Email** : Utilisez l'email de votre service EmailJS configuré

6. **To Email** : `{{from_email}}` (l'email du client qui a rempli le formulaire)

7. **Reply To** : `contact@marpeap.digital` (ou votre email de contact)

### 3. Tester le template

1. Dans EmailJS, utilisez l'onglet **Test** du template
2. Remplissez les variables de test :
   ```json
   {
     "from_name": "Jean Dupont",
     "from_email": "jean.dupont@example.com",
     "service": "Développement Web",
     "project_type": "Nouveau projet",
     "timeline": "1-3 mois",
     "message": "Bonjour, je souhaite créer un site web pour mon entreprise.",
     "date": "27 janvier 2025, 14:30"
   }
   ```
3. Cliquez sur **Send Test Email**
4. Vérifiez que vous recevez l'email avec le bon formatage

### 4. Noter le Template ID Auto-Reply

1. Une fois le template créé, **copiez le Template ID**
2. Il ressemble à : `template_xxxxx`
3. **Notez-le** pour l'utiliser dans le code JavaScript

## 💻 Intégration dans le code

Pour envoyer l'auto-réponse, vous devez modifier `js/contact.js` pour envoyer un deuxième email après l'envoi de la notification.

### Option 1 : Envoyer l'auto-réponse dans la même fonction

Modifiez la fonction `sendEmailNotification` dans `js/contact.js` pour envoyer les deux emails :

```javascript
// Envoyer la notification au propriétaire
await window.emailjs.send(
  config.SERVICE_ID,
  config.TEMPLATE_ID, // Template de notification
  templateParams
);

// Envoyer l'auto-réponse au client
await window.emailjs.send(
  config.SERVICE_ID,
  config.AUTOREPLY_TEMPLATE_ID, // Template d'auto-réponse
  {
    from_name: contactData.name,
    from_email: contactData.email,
    service: contactData.service || 'Non spécifié',
    project_type: contactData.projectType || 'Non spécifié',
    timeline: contactData.timeline || 'Non spécifié',
    message: contactData.message,
    date: new Date().toLocaleString('fr-FR')
  }
);
```

### Option 2 : Créer une fonction séparée

Ajoutez cette fonction dans `js/contact.js` :

```javascript
async function sendAutoReply(contactData) {
  const config = window.EMAILJS_CONFIG;
  
  if (!config.AUTOREPLY_TEMPLATE_ID) {
    console.warn('⚠️ Template Auto-Reply non configuré');
    return { success: false };
  }
  
  try {
    const autoReplyParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      service: contactData.service || 'Non spécifié',
      project_type: contactData.projectType || 'Non spécifié',
      timeline: contactData.timeline || 'Non spécifié',
      message: contactData.message,
      date: new Date().toLocaleString('fr-FR')
    };
    
    const response = await window.emailjs.send(
      config.SERVICE_ID,
      config.AUTOREPLY_TEMPLATE_ID,
      autoReplyParams
    );
    
    console.log('✅ Auto-réponse envoyée avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'auto-réponse:', error);
    return { success: false, error: error.message || error };
  }
}
```

Puis appelez cette fonction après l'envoi de la notification :

```javascript
// Après l'envoi de la notification
await sendEmailNotification(contactData);

// Envoyer l'auto-réponse au client
await sendAutoReply(contactData);
```

### Option 3 : Ajouter le Template ID dans la config

Ajoutez le Template ID Auto-Reply dans `js/emailjs-config.js` :

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'FDKh_5nUofVZbjniz',
  SERVICE_ID: 'service_gvyrpik',
  TEMPLATE_ID: 'template_xxxxx', // Template de notification
  AUTOREPLY_TEMPLATE_ID: 'template_yyyyy', // Template d'auto-réponse
  RECIPIENT_EMAIL: 'adnan.najim@pm.me'
};
```

## ✅ Vérification

Une fois configuré :

1. Testez le formulaire de contact sur votre site
2. Vérifiez que :
   - Vous recevez la notification (vous)
   - Le client reçoit l'auto-réponse (lui)
3. Vérifiez les deux emails dans les boîtes de réception respectives

## 📝 Notes importantes

- **Deux emails sont envoyés** : un pour vous (notification) et un pour le client (auto-réponse)
- L'auto-réponse utilise `{{from_email}}` comme destinataire (l'email du client)
- Le template est conçu pour être rassurant et professionnel
- Les deux templates peuvent utiliser le même Service ID

## 🎨 Personnalisation

Vous pouvez personnaliser l'auto-réponse en modifiant :

- **Le message de bienvenue** : Adaptez le texte selon votre ton de communication
- **Les informations de contact** : Mettez à jour l'email de contact si nécessaire
- **Le délai de réponse** : Indiquez un délai réaliste (ex: "sous 24-48h")
- **Les couleurs** : Adaptez les couleurs à votre charte graphique

## 🔗 Liens utiles

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Documentation EmailJS Templates](https://www.emailjs.com/docs/user-guide/creating-email-templates/)
- [Template de notification](EMAILJS_TEMPLATE.html)
- [Guide de configuration EmailJS](EMAILJS_SETUP.md)

