// Configuration EmailJS
// IMPORTANT: Remplacez les valeurs ci-dessous par vos identifiants EmailJS
// Obtenez-les sur https://www.emailjs.com/

const EMAILJS_CONFIG = {
  // Public Key EmailJS (trouvable dans Account > API Keys)
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  // Service ID EmailJS (trouvable dans Email Services)
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // Template ID EmailJS (trouvable dans Email Templates)
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Email du destinataire (déjà configuré)
  RECIPIENT_EMAIL: 'adnan.najim@pm.me'
};

// Vérifier si EmailJS est configuré
function isEmailJSConfigured() {
  return EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
         EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
         EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
         typeof window !== 'undefined' &&
         typeof window.emailjs !== 'undefined';
}

// Initialiser EmailJS si configuré
if (typeof window !== 'undefined') {
  if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof window.emailjs !== 'undefined') {
    try {
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
    }
  } else {
    console.warn('⚠️ EmailJS non configuré. Les emails ne seront pas envoyés.');
  }
  
  // Exporter la configuration
  window.EMAILJS_CONFIG = EMAILJS_CONFIG;
  window.isEmailJSConfigured = isEmailJSConfigured;
}

