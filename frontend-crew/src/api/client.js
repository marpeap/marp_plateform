import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://103.7.55.99:4000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 secondes pour les réponses longues
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] Requête vers: ${config.url}`);
    
    // Ajouter le header admin key si disponible
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      config.headers['x-admin-key'] = adminKey;
    }
    
    return config;
  },
  (error) => {
    console.error('[API] Erreur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API] Réponse reçue:', response.status);
    console.log('📦 LE CONTENU DU COLIS (Data):', response.data);
    return response;
  },
  (error) => {
    console.error('[API] Erreur de réponse:', error);
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('[API] Status:', error.response.status);
      console.error('[API] Data:', error.response.data);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('[API] Pas de réponse du serveur');
    }
    return Promise.reject(error);
  }
);

/**
 * Vérifie le statut de l'API
 * @returns {Promise<boolean>} true si l'API est accessible
 */
export const checkApiStatus = async () => {
  try {
    // Essayer d'abord /health si disponible
    try {
      const response = await apiClient.get('/health', { timeout: 5000 });
      return response.status === 200;
    } catch (healthError) {
      // Si /health n'existe pas (404), on considère l'API comme disponible
      // Le vrai test se fera lors de la première requête réelle
      if (healthError.response?.status === 404) {
        return true; // L'API répond, mais /health n'existe pas
      }
      // Pour les autres erreurs (timeout, réseau), on considère l'API comme hors ligne
      return false;
    }
  } catch (error) {
    console.error('[API] Health check échoué:', error);
    return false;
  }
};

/**
 * Envoie une requête de chat à l'API
 * @param {string} message - Le message de l'utilisateur
 * @returns {Promise<Object>} La réponse de l'API avec les analyses de Marp1 et Marp3
 */
export const sendChatMessage = async (message) => {
  try {
    const response = await apiClient.post('/api/chat', {
      message: message,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Erreur lors de la communication avec le serveur'
    );
  }
};

export default apiClient;
