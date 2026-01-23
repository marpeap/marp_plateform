import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient, { checkApiStatus } from '../api/client';

const Admin = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledge, setKnowledge] = useState([]);
  const [newKnowledge, setNewKnowledge] = useState({ category: 'Product', content: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [apiStatus, setApiStatus] = useState(false);

  // Vérifier si la clé admin est déjà en localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
      setIsAuthenticated(true);
      // Vérifier le statut de l'API
      checkApiStatus().then(setApiStatus);
      // Charger les connaissances existantes
      loadKnowledge();
      // Charger le statut de l'agence
      loadAgencyStatus();
    }
  }, []);

  // Fonction pour sauvegarder la clé admin
  const handleAuth = () => {
    if (adminKey.trim()) {
      localStorage.setItem('admin_key', adminKey);
      setIsAuthenticated(true);
      checkApiStatus().then(setApiStatus);
      loadKnowledge();
      loadAgencyStatus();
    }
  };

  // Fonction pour charger le statut de l'agence
  const loadAgencyStatus = async () => {
    try {
      const response = await apiClient.get('/admin/status');
      setIsOnline(response.data.online || false);
    } catch (error) {
      console.error('Erreur lors du chargement du statut:', error);
    }
  };

  // Fonction pour charger les connaissances
  const loadKnowledge = async () => {
    try {
      const response = await apiClient.get('/admin/knowledge');
      setKnowledge(response.data.knowledge || []);
    } catch (error) {
      console.error('Erreur lors du chargement des connaissances:', error);
      // Si l'endpoint n'existe pas encore, on initialise avec un tableau vide
      setKnowledge([]);
    }
  };

  // Fonction pour changer le statut de l'agence (Kill Switch)
  const toggleAgencyStatus = async () => {
    setIsLoading(true);
    setStatusMessage('');
    try {
      const newStatus = !isOnline;
      const response = await apiClient.post('/admin/status', {
        online: newStatus,
      });
      setIsOnline(newStatus);
      setStatusMessage(
        newStatus
          ? '✅ Agence activée avec succès'
          : '🔴 Agence désactivée avec succès'
      );
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage(
        `❌ Erreur: ${error.response?.data?.message || error.message}`
      );
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour injecter une nouvelle connaissance
  const injectKnowledge = async (e) => {
    e.preventDefault();
    if (!newKnowledge.content.trim()) {
      setStatusMessage('❌ Le contenu ne peut pas être vide');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setStatusMessage('');
    try {
      const response = await apiClient.post('/admin/knowledge', {
        category: newKnowledge.category,
        content: newKnowledge.content,
      });
      
      // Ajouter la nouvelle connaissance à la liste
      const newItem = {
        id: response.data.id || Date.now(),
        category: newKnowledge.category,
        content: newKnowledge.content,
        created_at: new Date().toISOString(),
      };
      setKnowledge([...knowledge, newItem]);
      
      // Réinitialiser le formulaire
      setNewKnowledge({ category: 'Product', content: '' });
      setStatusMessage('✅ Mémoire injectée avec succès');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage(
        `❌ Erreur: ${error.response?.data?.message || error.message}`
      );
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer une connaissance
  const deleteKnowledge = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette connaissance ?')) {
      return;
    }

    setIsLoading(true);
    setStatusMessage('');
    try {
      await apiClient.delete(`/admin/knowledge/${id}`);
      setKnowledge(knowledge.filter((item) => item.id !== id));
      setStatusMessage('✅ Connaissance supprimée avec succès');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage(
        `❌ Erreur: ${error.response?.data?.message || error.message}`
      );
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Si non authentifié, afficher le prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-900/90 border-2 border-red-500/50 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🔐</div>
              <h1 className="text-2xl font-bold text-red-400 mb-2 font-mono">
                COMMAND COCKPIT
              </h1>
              <p className="text-slate-400 text-sm">Accès Administrateur Requis</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2 font-mono">
                  ADMIN KEY
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 font-mono focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="Enter admin key..."
                  autoFocus
                />
              </div>
              
              <button
                onClick={handleAuth}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors font-mono shadow-lg shadow-red-500/20"
              >
                [AUTHENTICATE]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Interface principale du Command Cockpit
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-red-400 font-mono mb-2">
                &gt; COMMAND_COCKPIT.exe
              </h1>
              <p className="text-slate-400 text-sm font-mono">
                AI Agency Control Panel v1.0
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg font-mono text-sm ${
                apiStatus 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
                API: {apiStatus ? 'ONLINE' : 'OFFLINE'}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('admin_key');
                  setIsAuthenticated(false);
                  setAdminKey('');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-mono text-sm border border-slate-700"
              >
                [LOGOUT]
              </button>
            </div>
          </div>
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-slate-900/90 border-2 border-slate-700 rounded-lg font-mono text-sm"
            >
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Kill Switch Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-6 font-mono">
              &gt; KILL_SWITCH
            </h2>
            
            <div className="space-y-6">
              {/* Toggle Switch */}
              <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700">
                <div>
                  <p className="text-slate-300 font-mono text-sm mb-1">
                    AGENCY STATUS
                  </p>
                  <p className={`text-2xl font-bold font-mono ${
                    isOnline ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isOnline ? '[ONLINE]' : '[OFFLINE]'}
                  </p>
                </div>
                
                <button
                  onClick={toggleAgencyStatus}
                  disabled={isLoading}
                  className={`relative w-20 h-10 rounded-full transition-colors font-mono text-xs font-bold ${
                    isOnline
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    {isOnline ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Warning */}
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 font-mono text-xs">
                  ⚠️ WARNING: Toggling this switch will immediately affect all AI operations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Knowledge Injection Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">
              &gt; KNOWLEDGE_INJECTION
            </h2>
            
            <form onSubmit={injectKnowledge} className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-300 text-sm mb-2 font-mono">
                  CATEGORY
                </label>
                <select
                  value={newKnowledge.category}
                  onChange={(e) =>
                    setNewKnowledge({ ...newKnowledge, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Product">Product</option>
                  <option value="Rule">Rule</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2 font-mono">
                  CONTENT
                </label>
                <textarea
                  value={newKnowledge.content}
                  onChange={(e) =>
                    setNewKnowledge({ ...newKnowledge, content: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 font-mono focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="Enter knowledge content..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '[PROCESSING...]' : '[INJECT_MEMORY]'}
              </button>
            </form>

            {/* Knowledge List */}
            <div>
              <h3 className="text-lg font-bold text-slate-300 mb-4 font-mono">
                &gt; CURRENT_KNOWLEDGE_BASE
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {knowledge.length === 0 ? (
                  <p className="text-slate-500 text-sm font-mono text-center py-8">
                    No knowledge entries
                  </p>
                ) : (
                  knowledge.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-mono rounded">
                              {item.category}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">
                              {new Date(item.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-200 text-sm font-mono whitespace-pre-wrap">
                            {item.content}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteKnowledge(item.id)}
                          disabled={isLoading}
                          className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded font-mono text-xs border border-red-500/50 disabled:opacity-50"
                        >
                          [DELETE]
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
