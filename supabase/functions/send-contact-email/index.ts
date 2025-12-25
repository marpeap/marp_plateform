// Supabase Edge Function pour envoyer un email de notification
// lorsqu'un nouveau contact est créé

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "https://esm.sh/resend@2.0.0"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RECIPIENT_EMAIL = Deno.env.get('RECIPIENT_EMAIL') || 'adnan.najim@pm.me'
// Utiliser onboarding@resend.dev par défaut (fonctionne sans domaine vérifié)
// Une fois le domaine marpeap.digital vérifié, changez pour noreply@marpeap.digital
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev'

interface ContactData {
  name: string
  email: string
  phone?: string
  service?: string
  project_type?: string
  budget?: string
  timeline?: string
  message: string
}

serve(async (req) => {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Vérifier que Resend est configuré
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY non configuré')
    return new Response(
      JSON.stringify({ error: 'Email service not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Parser les données du contact
    const contactData: ContactData = await req.json()

    // Valider les données requises
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Initialiser Resend
    const resend = new Resend(RESEND_API_KEY)

    // Préparer le contenu de l'email
    const emailSubject = `Nouveau message de contact - ${contactData.name}`
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 Nouveau message de contact</h2>
              <p>Vous avez reçu un nouveau message depuis www.marpeap.digital</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nom complet</div>
                <div class="value">${contactData.name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">${contactData.email}</div>
              </div>
              
              ${contactData.phone ? `
              <div class="field">
                <div class="label">📞 Téléphone</div>
                <div class="value">${contactData.phone}</div>
              </div>
              ` : ''}
              
              ${contactData.service ? `
              <div class="field">
                <div class="label">💼 Service concerné</div>
                <div class="value">${contactData.service}</div>
              </div>
              ` : ''}
              
              ${contactData.project_type ? `
              <div class="field">
                <div class="label">🎯 Type de projet</div>
                <div class="value">${contactData.project_type}</div>
              </div>
              ` : ''}
              
              ${contactData.budget ? `
              <div class="field">
                <div class="label">💰 Budget estimé</div>
                <div class="value">${contactData.budget}</div>
              </div>
              ` : ''}
              
              ${contactData.timeline ? `
              <div class="field">
                <div class="label">⏰ Délai souhaité</div>
                <div class="value">${contactData.timeline}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="message-box">${contactData.message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p><strong>Répondre à:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Envoyer l'email via Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      reply_to: contactData.email,
      subject: emailSubject,
      html: emailHtml,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Email envoyé avec succès:', data)
    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur dans la fonction:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

