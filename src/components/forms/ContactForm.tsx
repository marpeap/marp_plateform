"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler l'envoi (à remplacer par un vrai endpoint API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous pouvez ajouter un appel API pour envoyer le message
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      setSent(true);
      setFormData({ subject: "", message: "" });
      
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      alert("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
        <Send className="h-5 w-5 text-blue-600" />
        Formulaire de contact
      </h3>
      
      {sent ? (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
          <p className="font-medium">Message envoyé avec succès !</p>
          <p className="text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-2">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="input"
              placeholder="Ex: Question sur une formation"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input resize-none"
              placeholder="Décrivez votre demande..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Envoyer le message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

