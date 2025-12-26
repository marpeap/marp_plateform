# Diagnostic EmailJS - Résolution des problèmes

## 🔍 Vérifications à faire

### 1. Vérifier le Template ID

**Problème principal identifié :** Le Template ID n'est pas configuré dans `js/emailjs-config.js`

**Solution :**
1. Allez sur [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Allez dans **Email Templates**
3. Trouvez votre template (ou créez-en un avec `EMAILJS_TEMPLATE.html`)
4. **Copiez le Template ID** (ex: `template_abc123`)
5. Ouvrez `js/emailjs-config.js`
6. Remplacez `TEMPLATE_ID: 'YOUR_TEMPLATE_ID'` par `TEMPLATE_ID: 'template_abc123'`

### 2. Vérifier la console du navigateur

Ouvrez la console (F12) et vérifiez les messages :

**✅ Messages normaux :**
- `✅ EmailJS initialisé avec succès`
- `✅ Email de notification envoyé avec succès`

**❌ Messages d'erreur possibles :**
- `⚠️ EmailJS non configuré` → Template ID manquant
- `❌ EmailJS SDK non chargé` → Script EmailJS non inclus
- `❌ Erreur lors de l'envoi de l'email` → Voir les détails ci-dessous

### 3. Vérifier que EmailJS SDK est chargé

Dans `contact.html`, vérifiez que cette ligne existe :
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

### 4. Vérifier la configuration complète

Dans `js/emailjs-config.js`, vérifiez :
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'FDKh_5nUofVZbjniz',      // ✅ Configuré
  SERVICE_ID: 'service_gvyrpik',       // ✅ Configuré
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',     // ❌ À configurer
  RECIPIENT_EMAIL: 'adnan.najim@pm.me' // ✅ Configuré
};
```

### 5. Vérifier les variables du template

Dans votre template EmailJS, assurez-vous que les variables correspondent :
- `{{to_email}}` ou `{{to_email}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{phone}}`
- `{{service}}`
- `{{project_type}}`
- `{{budget}}`
- `{{timeline}}`
- `{{message}}`
- `{{reply_to}}`
- `{{date}}`

### 6. Tester directement dans EmailJS Dashboard

1. Allez dans **Email Templates** > Votre template
2. Cliquez sur l'onglet **Test**
3. Remplissez les variables de test
4. Cliquez sur **Send Test Email**
5. Vérifiez si l'email est reçu

## 🛠️ Erreurs courantes et solutions

### Erreur : "Template ID is invalid"
**Cause :** Template ID incorrect ou non configuré
**Solution :** Vérifiez que le Template ID dans `js/emailjs-config.js` correspond exactement à celui dans EmailJS Dashboard

### Erreur : "Service ID is invalid"
**Cause :** Service ID incorrect
**Solution :** Vérifiez que `SERVICE_ID: 'service_gvyrpik'` est correct

### Erreur : "Public Key is invalid"
**Cause :** Public Key incorrect
**Solution :** Vérifiez que `PUBLIC_KEY: 'FDKh_5nUofVZbjniz'` est correct

### Erreur : "EmailJS SDK not loaded"
**Cause :** Le script EmailJS n'est pas chargé
**Solution :** Vérifiez que le script est inclus dans `contact.html` avant `emailjs-config.js`

### Erreur : "Template variables mismatch"
**Cause :** Les variables dans le template ne correspondent pas
**Solution :** Vérifiez que toutes les variables utilisées dans le template sont envoyées dans `templateParams`

## 📝 Checklist de configuration

- [ ] Template créé dans EmailJS Dashboard
- [ ] Template ID copié et ajouté dans `js/emailjs-config.js`
- [ ] Public Key configurée : `FDKh_5nUofVZbjniz`
- [ ] Service ID configuré : `service_gvyrpik`
- [ ] EmailJS SDK inclus dans `contact.html`
- [ ] Variables du template correspondent
- [ ] Test effectué dans EmailJS Dashboard
- [ ] Console du navigateur vérifiée (F12)

## 🧪 Test rapide

Ajoutez ce code temporairement dans la console du navigateur (F12) pour tester :

```javascript
// Test EmailJS
if (window.emailjs && window.EMAILJS_CONFIG) {
  console.log('Config:', window.EMAILJS_CONFIG);
  console.log('EmailJS disponible:', typeof window.emailjs.send === 'function');
  
  // Test d'envoi
  window.emailjs.send(
    window.EMAILJS_CONFIG.SERVICE_ID,
    window.EMAILJS_CONFIG.TEMPLATE_ID,
    {
      to_email: 'adnan.najim@pm.me',
      from_name: 'Test User',
      from_email: 'test@example.com',
      phone: '+33 6 12 34 56 78',
      service: 'Développement Web',
      project_type: 'Nouveau projet',
      budget: 'À discuter',
      timeline: '1-3 mois',
      message: 'Message de test',
      reply_to: 'test@example.com',
      date: new Date().toLocaleString('fr-FR')
    }
  ).then(
    response => console.log('✅ Succès:', response),
    error => console.error('❌ Erreur:', error)
  );
} else {
  console.error('❌ EmailJS non disponible');
}
```

## 🔗 Liens utiles

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Logs EmailJS](https://dashboard.emailjs.com/admin/integration)




