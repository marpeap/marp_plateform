# 🔧 Debug - Formulaire de Contact

## ✅ Corrections effectuées

### 1. Initialisation EmailJS améliorée
- **Problème** : L'initialisation EmailJS se faisait avant que le SDK ne soit chargé
- **Solution** : Ajout d'une attente pour que le SDK soit complètement chargé avant l'initialisation
- **Fichier modifié** : `js/emailjs-config.js`

### 2. Ajout de la PUBLIC_KEY dans les appels
- **Problème** : La PUBLIC_KEY n'était pas passée explicitement dans les appels `emailjs.send()`
- **Solution** : Ajout de `config.PUBLIC_KEY` comme 4ème paramètre dans tous les appels
- **Fichiers modifiés** : `js/contact.js` (fonctions `sendEmailNotification` et `sendAutoReply`)

### 3. Logs de débogage améliorés
- Ajout de logs détaillés pour diagnostiquer les problèmes
- Affichage des paramètres envoyés à EmailJS
- Messages d'erreur plus explicites

## 🔍 Vérifications à faire dans EmailJS Dashboard

### 1. Vérifier le Template de Notification (`template_k5lgn2g`)

1. Allez sur [EmailJS Dashboard](https://dashboard.emailjs.com/admin/template)
2. Ouvrez le template `template_k5lgn2g`
3. **IMPORTANT** : Vérifiez que le champ **"To Email"** contient :
   ```
   {{to_email}}
   ```
   ⚠️ **Ne pas mettre** `marpeap@gmail.com` directement, mais bien la variable `{{to_email}}`

4. Vérifiez que les autres variables sont bien présentes :
   - `{{from_name}}` - Nom du client
   - `{{from_email}}` - Email du client
   - `{{phone}}` - Téléphone
   - `{{service}}` - Service demandé
   - `{{project_type}}` - Type de projet
   - `{{budget}}` - Budget
   - `{{timeline}}` - Délai
   - `{{message}}` - Message
   - `{{date}}` - Date

### 2. Vérifier le Service EmailJS (`service_gvyrpik`)

1. Allez sur [Email Services](https://dashboard.emailjs.com/admin/integration)
2. Vérifiez que le service `service_gvyrpik` est actif
3. Vérifiez que l'email de l'intégration (Gmail, Outlook, etc.) est correctement configuré

### 3. Vérifier la Public Key

1. Allez sur [API Keys](https://dashboard.emailjs.com/admin/account)
2. Vérifiez que la Public Key est bien `FDKh_5nUofVZbjniz`
3. Si ce n'est pas la bonne, mettez à jour `js/emailjs-config.js`

## 🧪 Test du formulaire

### 1. Ouvrir la console du navigateur

1. Ouvrez `contact.html` dans votre navigateur
2. Appuyez sur `F12` pour ouvrir les outils de développement
3. Allez dans l'onglet **Console**

### 2. Vérifier les messages de la console

Vous devriez voir :
```
✅ EmailJS initialisé avec succès
✅ Supabase client initialisé avec succès
```

Si vous voyez des erreurs, notez-les.

### 3. Tester l'envoi

1. Remplissez le formulaire de contact
2. Cliquez sur "Envoyer le message"
3. Regardez les messages dans la console :
   - `📧 Envoi de l'email de notification...`
   - `📋 Paramètres: {...}`
   - `✅ Email de notification envoyé avec succès`
   - `📬 Email envoyé à: marpeap@gmail.com`

### 4. Erreurs courantes

#### Erreur : "EmailJS SDK non chargé"
- **Cause** : Le script EmailJS n'est pas chargé
- **Solution** : Vérifiez que `contact.html` contient bien :
  ```html
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  ```

#### Erreur : "Template ID not found"
- **Cause** : Le Template ID est incorrect ou le template n'existe pas
- **Solution** : Vérifiez dans EmailJS Dashboard que le template `template_k5lgn2g` existe

#### Erreur : "Service ID not found"
- **Cause** : Le Service ID est incorrect ou le service n'existe pas
- **Solution** : Vérifiez dans EmailJS Dashboard que le service `service_gvyrpik` existe et est actif

#### Erreur : "Invalid Public Key"
- **Cause** : La Public Key est incorrecte
- **Solution** : Vérifiez dans EmailJS Dashboard et mettez à jour `js/emailjs-config.js`

#### L'email n'arrive pas à `marpeap@gmail.com`
- **Cause 1** : Le template EmailJS n'utilise pas `{{to_email}}` dans le champ "To Email"
- **Solution** : Modifiez le template pour utiliser `{{to_email}}` au lieu d'une adresse fixe
- **Cause 2** : L'email est dans les spams
- **Solution** : Vérifiez votre dossier spam/courrier indésirable

## 📧 Configuration actuelle

```javascript
// js/emailjs-config.js
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'FDKh_5nUofVZbjniz',
  SERVICE_ID: 'service_gvyrpik',
  TEMPLATE_ID: 'template_k5lgn2g',
  AUTOREPLY_TEMPLATE_ID: 'template_didr2ab',
  RECIPIENT_EMAIL: 'marpeap@gmail.com'
};
```

## 🔗 Liens utiles

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Templates EmailJS](https://dashboard.emailjs.com/admin/template)
- [Services EmailJS](https://dashboard.emailjs.com/admin/integration)

## 📝 Notes importantes

1. **Le champ "To Email" dans le template doit utiliser `{{to_email}}`**, pas l'adresse email directement
2. **La PUBLIC_KEY est maintenant passée explicitement** dans tous les appels `emailjs.send()`
3. **L'initialisation EmailJS attend maintenant** que le SDK soit complètement chargé
4. **Les logs de débogage** vous aideront à identifier les problèmes



