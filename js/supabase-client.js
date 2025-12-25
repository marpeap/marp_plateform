// Client Supabase pour JavaScript vanilla
const SUPABASE_URL = 'https://bllhmxwzdkvmldqdjcxh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbGhteHd6ZGt2bWxkcWRqY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjEwNTgsImV4cCI6MjA4MDY5NzA1OH0.fBkvjIQaxWviHInwPH8PhR33BQPp9yH7PdfBiDRwAbg';

// Fonction pour créer le client Supabase
function createSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase n\'est pas configuré. Veuillez définir SUPABASE_URL et SUPABASE_ANON_KEY dans js/supabase-client.js');
    return null;
  }

  // Utilisation de l'API REST de Supabase directement
  return {
    url: SUPABASE_URL,
    key: SUPABASE_ANON_KEY,
    
    // Fonction pour insérer un contact
    async insertContact(contactData) {
      try {
        const response = await fetch(`${this.url}/rest/v1/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            service: contactData.service || null,
            project_type: contactData.projectType || null,
            budget: contactData.budget || null,
            timeline: contactData.timeline || null,
            message: contactData.message
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
        }

        return { success: true };
      } catch (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }
    },
    
    // Fonction pour envoyer un email via Edge Function
    async sendContactEmail(contactData) {
      try {
        const response = await fetch(`${this.url}/functions/v1/send-contact-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.key}`
          },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone || '',
            service: contactData.service || '',
            project_type: contactData.projectType || '',
            budget: contactData.budget || '',
            timeline: contactData.timeline || '',
            message: contactData.message
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return { success: true, data: result };
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
      }
    }
  };
}

// Export pour utilisation dans d'autres fichiers
if (typeof window !== 'undefined') {
  window.supabaseClient = createSupabaseClient();
  
  // Vérifier l'initialisation
  if (window.supabaseClient) {
    console.log('✅ Supabase client initialisé avec succès');
  } else {
    console.warn('⚠️ Supabase client non initialisé. Vérifiez la configuration dans js/supabase-client.js');
  }
}

