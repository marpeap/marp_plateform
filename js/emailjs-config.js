// Configuration EmailJS
// IMPORTANT: Remplacez les valeurs ci-dessous par vos identifiants EmailJS
// Obtenez-les sur https://www.emailjs.com/

const EMAILJS_CONFIG = {
  // Public Key EmailJS (trouvable dans Account > API Keys)
  PUBLIC_KEY: 'FDKh_5nUofVZbjniz',
  
  // Service ID EmailJS (trouvable dans Email Services)
  SERVICE_ID: 'service_gvyrpik',
  
  // Template ID EmailJS - Notification pour le propriétaire
  TEMPLATE_ID: 'template_k5lgn2g', // Contact Us - Notification
  
  // Template ID EmailJS - Auto-réponse pour le client
  AUTOREPLY_TEMPLATE_ID: 'template_didr2ab', // Auto-Reply
  
  // Email du destinataire (déjà configuré)
  RECIPIENT_EMAIL: 'marpeap@gmail.com'
};

// Vérifier si EmailJS est configuré
function isEmailJSConfigured() {
  return EMAILJS_CONFIG.PUBLIC_KEY === 'FDKh_5nUofVZbjniz' && // Public Key configurée
         EMAILJS_CONFIG.SERVICE_ID === 'service_gvyrpik' && // Service ID configuré
         EMAILJS_CONFIG.TEMPLATE_ID === 'template_k5lgn2g' && // Template ID notification configuré
         EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID === 'template_didr2ab' && // Template ID auto-réponse configuré
         typeof window !== 'undefined' &&
         typeof window.emailjs !== 'undefined';
}

// Initialiser EmailJS si configuré
if (typeof window !== 'undefined') {
  if (EMAILJS_CONFIG.PUBLIC_KEY === 'FDKh_5nUofVZbjniz' && typeof window.emailjs !== 'undefined') {
    try {
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
    }
  } else {
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'FDKh_5nUofVZbjniz') {
      console.warn('⚠️ EmailJS SDK non chargé. Vérifiez que le script EmailJS est inclus dans contact.html');
    } else {
      console.warn('⚠️ EmailJS non configuré. Les emails ne seront pas envoyés.');
    }
  }
  
  // Exporter la configuration
  window.EMAILJS_CONFIG = EMAILJS_CONFIG;
  window.isEmailJSConfigured = isEmailJSConfigured;
}

