# Guide d'Intégration CSS pour Botpress Chatbot

## 📋 Fichier CSS Créé

Le fichier `css/botpress-chatbot.css` contient un style sobre et puissant adapté à votre site web Marpeap Digitals.

## 🎨 Caractéristiques du Design

- **Couleurs** : Alignées avec votre palette (#2563eb, #9333ea, #06b6d4)
- **Style** : Moderne, sobre, avec des effets de glow et gradients
- **Animations** : Transitions fluides et animations subtiles
- **Responsive** : Adapté mobile, tablette et desktop
- **Accessibilité** : Focus visible et contraste optimisé

## 🔧 Méthodes d'Intégration

### Méthode 1 : Via le Dashboard Botpress (Recommandé)

1. **Connectez-vous au Dashboard Botpress**
   - Allez sur https://app.botpress.cloud
   - Sélectionnez votre bot

2. **Accédez aux paramètres Webchat**
   - Dans le menu de gauche, allez dans **Webchat** > **Deploy Settings**
   - Ou **Webchat** > **Customization**

3. **Ajoutez le CSS personnalisé**
   - Cherchez la section **Custom CSS** ou **Theme Customization**
   - Copiez-collez le contenu du fichier `css/botpress-chatbot.css`
   - Sauvegardez les modifications

4. **Publiez les changements**
   - Cliquez sur **Publish** ou **Deploy**
   - Les modifications seront appliquées immédiatement

### Méthode 2 : Via Configuration JavaScript

Si Botpress permet la configuration via JavaScript, ajoutez ce code dans votre site :

```html
<!-- Après les scripts Botpress -->
<script>
  // Attendre que Botpress soit chargé
  window.addEventListener('load', function() {
    // Créer un élément <style> avec le CSS personnalisé
    const style = document.createElement('style');
    style.textContent = `
      /* Copier ici le contenu de css/botpress-chatbot.css */
    `;
    document.head.appendChild(style);
  });
</script>
```

### Méthode 3 : Via Fichier CSS Externe

1. **Hébergez le fichier CSS**
   - Uploadez `css/botpress-chatbot.css` sur votre serveur
   - Notez l'URL complète (ex: `https://www.marpeap.digital/css/botpress-chatbot.css`)

2. **Ajoutez le lien dans votre HTML**
   ```html
   <!-- Dans le <head> de vos pages HTML -->
   <link rel="stylesheet" href="/css/botpress-chatbot.css?v=2.1.0">
   ```

3. **Important** : Assurez-vous que le CSS se charge APRÈS les styles Botpress par défaut

### Méthode 4 : Via Configuration Botpress (Advanced)

Si vous avez accès à la configuration avancée de Botpress :

1. **Dans le Dashboard Botpress**
   - Allez dans **Configuration** > **Advanced Settings**
   - Cherchez **Custom Styles** ou **CSS Override**

2. **Ajoutez le CSS**
   - Copiez le contenu de `css/botpress-chatbot.css`
   - Collez dans le champ prévu à cet effet

## 🎯 Vérification

Après l'intégration, vérifiez que :

- ✅ Le bouton de chat a un style avec gradient bleu/violet
- ✅ La fenêtre de chat s'ouvre avec une animation fluide
- ✅ Les messages utilisateur ont un fond gradient
- ✅ Les messages bot ont un fond sombre avec bordure
- ✅ Les boutons de suggestion sont stylisés
- ✅ Le design est responsive sur mobile

## 🔍 Sélecteurs CSS Utilisés

Le CSS cible les classes suivantes de Botpress :

- `.bp-widget-button` - Bouton de lancement
- `.bp-widget-window` - Fenêtre de chat
- `.bp-widget-header` - En-tête
- `.bp-widget-messages` - Zone de messages
- `.bp-widget-message-user` - Messages utilisateur
- `.bp-widget-message-bot` - Messages bot
- `.bp-widget-input` - Zone de saisie
- `.bp-widget-send-button` - Bouton d'envoi
- `.bp-widget-suggestions` - Suggestions rapides

**Note** : Les sélecteurs peuvent varier selon la version de Botpress. Si certains styles ne s'appliquent pas, inspectez le DOM du chatbot pour identifier les classes exactes.

## 🛠️ Personnalisation

### Modifier les Couleurs

Dans `css/botpress-chatbot.css`, modifiez les variables CSS :

```css
:root {
  --bp-primary: #2563eb;        /* Bleu principal */
  --bp-secondary: #9333ea;       /* Violet secondaire */
  --bp-accent: #06b6d4;         /* Cyan accent */
  /* ... */
}
```

### Modifier la Taille

```css
.bp-widget-window {
  width: 400px !important;       /* Largeur */
  height: 600px !important;      /* Hauteur */
}
```

### Modifier la Position

```css
.bp-widget-button {
  bottom: 24px !important;       /* Distance du bas */
  right: 24px !important;        /* Distance de la droite */
}
```

## 📱 Responsive

Le CSS inclut des media queries pour :
- **Mobile** (< 768px) : Fenêtre pleine écran
- **Tablette** (< 1024px) : Ajustements de taille
- **Desktop** : Design complet

## 🐛 Dépannage

### Les styles ne s'appliquent pas

1. **Vérifiez la spécificité CSS**
   - Utilisez `!important` si nécessaire (déjà inclus)
   - Vérifiez que votre CSS se charge après celui de Botpress

2. **Inspectez le DOM**
   - Ouvrez les outils de développement (F12)
   - Inspectez les éléments du chatbot
   - Identifiez les classes réelles utilisées

3. **Vérifiez la version Botpress**
   - Les classes peuvent varier selon la version
   - Consultez la documentation Botpress pour votre version

### Le chatbot ne s'affiche pas

1. Vérifiez que les scripts Botpress sont bien chargés
2. Vérifiez la console pour les erreurs JavaScript
3. Assurez-vous que le CSS ne bloque pas l'affichage

## 📚 Ressources

- [Documentation Botpress Webchat](https://www.botpress.com/docs/webchat)
- [Botpress Customization Guide](https://www.botpress.com/docs/webchat/configure-webchat)

## ✅ Checklist d'Intégration

- [ ] Fichier CSS créé (`css/botpress-chatbot.css`)
- [ ] CSS intégré dans Botpress Dashboard ou site web
- [ ] Styles appliqués et visibles
- [ ] Test responsive (mobile, tablette, desktop)
- [ ] Test des interactions (messages, boutons, suggestions)
- [ ] Vérification des animations
- [ ] Test d'accessibilité (focus, contraste)

---

**Créé pour** : Marpeap Digitals  
**Date** : Décembre 2025  
**Version CSS** : 1.0


