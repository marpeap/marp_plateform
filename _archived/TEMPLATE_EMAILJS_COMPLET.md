# Template EmailJS Complet - Formulaire de Contact et Rendez-vous

Ce document contient le template EmailJS complet mis à jour pour récupérer **TOUS** les choix utilisateurs :
- **Messages de contact** (avec service, type de projet, budget, délai)
- **Demandes de rendez-vous** (avec date, heure, type, lieu, coordonnées GPS)

Le template `template_k5lgn2g` est **UNIFIÉ** et gère les deux types de demandes.

## Template de Notification UNIFIÉ (pour vous)

**Template ID:** `template_k5lgn2g`

**Ce template gère à la fois :**
- Les messages de contact classiques
- Les demandes de rendez-vous

**Sujet de l'email:**
```
Nouveau message de contact - {{from_name}}
```
(Le même sujet est utilisé pour les deux types de demandes)

**Corps de l'email (HTML):**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- En-tête -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #2563eb;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px;">📧 Nouveau message de contact</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Reçu le {{date}}</p>
        </div>

        <!-- Informations du contact -->
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px; font-size: 18px;">👤 Informations du contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Nom :</td>
                    <td style="padding: 8px 0; color: #333;">{{from_name}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Email :</td>
                    <td style="padding: 8px 0; color: #333;">
                        <a href="mailto:{{from_email}}" style="color: #2563eb; text-decoration: none;">{{from_email}}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Téléphone :</td>
                    <td style="padding: 8px 0; color: #333;">{{phone}}</td>
                </tr>
            </table>
        </div>

        <!-- Section RENDEZ-VOUS -->
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
            <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📅 Détails du rendez-vous</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555; width: 180px;">Date souhaitée :</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 16px;">{{appointment_date}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Heure souhaitée :</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 16px;">{{appointment_time}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Type de rendez-vous :</td>
                    <td style="padding: 8px 0; color: #333;">{{appointment_type}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">📍 Lieu :</td>
                    <td style="padding: 8px 0; color: #333;">{{appointment_location}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">🗺️ Coordonnées GPS :</td>
                    <td style="padding: 8px 0; color: #333; font-size: 12px; font-family: monospace;">{{appointment_coordinates}}</td>
                </tr>
            </table>
        </div>

        <!-- Détails du projet -->
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🎯 Détails du projet</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Service :</td>
                    <td style="padding: 8px 0; color: #333;">{{service}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Type de projet :</td>
                    <td style="padding: 8px 0; color: #333;">{{project_type}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Budget :</td>
                    <td style="padding: 8px 0; color: #333;">{{budget}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Délai souhaité :</td>
                    <td style="padding: 8px 0; color: #333;">{{timeline}}</td>
                </tr>
            </table>
        </div>

        <!-- Message -->
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 6px; border-left: 4px solid #ffc107; margin-bottom: 25px;">
            <h2 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💬 Message</h2>
            <div style="color: #333; white-space: pre-wrap; line-height: 1.8;">{{message}}</div>
        </div>

        <!-- Actions rapides -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
            <a href="mailto:{{from_email}}?subject=Re: Nouveau message de contact - {{from_name}}" 
               style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">
                ✉️ Répondre par email
            </a>
        </div>

        <!-- Pied de page -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
            <p style="margin: 5px 0 0 0;">Marpeap Digitals - Développeur Web Indépendant à Rennes</p>
        </div>
    </div>
</body>
</html>
```

---

## Template d'Auto-Réponse (pour le client)

**Template ID:** `template_didr2ab`

**Sujet de l'email:**
```
Merci pour votre message - Marpeap Digitals
```

**Corps de l'email (HTML):**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Merci pour votre message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- En-tête -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #2563eb;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px;">✅ Message reçu !</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">{{date}}</p>
        </div>

        <!-- Message de confirmation -->
        <div style="margin-bottom: 25px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
                Bonjour <strong>{{from_name}}</strong>,
            </p>
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
                Merci de m'avoir contacté ! J'ai bien reçu votre message et je vous répondrai dans les <strong>24 heures</strong>.
            </p>
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
                En attendant, voici un récapitulatif de votre demande :
            </p>
        </div>

        <!-- Récapitulatif -->
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Récapitulatif de votre message</h2>
            <div style="color: #333; white-space: pre-wrap; line-height: 1.8; background-color: #ffffff; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
{{message}}
            </div>
        </div>

        <!-- Prochaines étapes -->
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
            <h2 style="color: #2563eb; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Prochaines étapes</h2>
            <ul style="color: #333; padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 10px;">Je vais analyser votre demande en détail</li>
                <li style="margin-bottom: 10px;">Je vous répondrai sous 24 heures avec une proposition adaptée</li>
                <li style="margin-bottom: 10px;">Nous pourrons planifier un échange pour discuter de votre projet</li>
            </ul>
        </div>

        <!-- Contact -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
            <p style="color: #666; margin-bottom: 15px;">Besoin d'une réponse urgente ?</p>
            <p style="margin: 0;">
                <a href="tel:0649710370" style="color: #2563eb; text-decoration: none; font-weight: bold;">📞 06 49 71 03 70</a>
            </p>
        </div>

        <!-- Pied de page -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0; font-weight: bold; color: #2563eb;">Marpeap Digitals</p>
            <p style="margin: 5px 0 0 0;">Développeur Web Indépendant à Rennes</p>
            <p style="margin: 5px 0 0 0;">
                <a href="https://www.marpeap.digital" style="color: #2563eb; text-decoration: none;">www.marpeap.digital</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## Variables utilisées dans les templates

### Template de Notification UNIFIÉ (template_k5lgn2g)

**Variables communes :**
- `{{from_name}}` - Nom du contact
- `{{from_email}}` - Email du contact
- `{{phone}}` - Téléphone (ou "Non renseigné")
- `{{message}}` - Message du contact
- `{{date}}` - Date et heure de réception
- `{{reply_to}}` - Email pour répondre
- `{{subject}}` - Sujet de l'email
- `{{to_email}}` - Email du destinataire

**Variables pour les rendez-vous :**
- `{{appointment_date}}` - Date du rendez-vous (format long en français) ou vide
- `{{appointment_time}}` - Heure du rendez-vous (ex: "14:00") ou vide
- `{{appointment_type}}` - Type de rendez-vous ("Rendez-vous téléphonique" ou "Rendez-vous dans un café") ou vide
- `{{appointment_location}}` - Lieu du rendez-vous (adresse complète) ou "Non applicable"
- `{{appointment_coordinates}}` - Coordonnées GPS (lat, lng) ou "Non applicable"

**Variables pour les messages de contact :**
- `{{service}}` - Service demandé (ou "Non spécifié")
- `{{project_type}}` - Type de projet (ou "Non spécifié")
- `{{budget}}` - Budget (ou "Non spécifié")
- `{{timeline}}` - Délai souhaité (ou "Non spécifié")

**Note importante :** Le template affiche TOUTES les sections. Les valeurs vides ou "Non applicable" / "Non spécifié" seront simplement affichées comme telles dans l'email.

### Template d'Auto-Réponse
- `{{from_name}}` - Nom du contact
- `{{from_email}}` - Email du contact (destinataire de l'auto-réponse)
- `{{message}}` - Message du contact
- `{{date}}` - Date et heure d'envoi

---

## Instructions d'utilisation

1. **Connectez-vous à EmailJS Dashboard** : https://www.emailjs.com/
2. **Allez dans "Email Templates"**
3. **Pour le template de notification** :
   - Sélectionnez ou créez le template avec l'ID `template_k5lgn2g`
   - Copiez le contenu HTML du "Template de Notification"
   - Configurez le sujet : `Nouveau message de contact - {{from_name}}`
   - Définissez le destinataire : `{{to_email}}` (ou votre email directement)
   - Définissez l'expéditeur : `{{from_email}}`
   - Activez le mode HTML

4. **Pour le template d'auto-réponse** :
   - Sélectionnez ou créez le template avec l'ID `template_didr2ab`
   - Copiez le contenu HTML du "Template d'Auto-Réponse"
   - Configurez le sujet : `Merci pour votre message - Marpeap Digitals`
   - Définissez le destinataire : `{{from_email}}`
   - Définissez l'expéditeur : votre email
   - Activez le mode HTML

5. **Testez les templates** en utilisant le formulaire de contact de votre site

---

## Notes importantes

- Tous les champs sont inclus dans le template, même s'ils sont optionnels
- Les valeurs par défaut ("Non renseigné", "Non spécifié") sont gérées dans le code JavaScript
- Le template est responsive et s'affiche correctement sur mobile
- Les couleurs utilisées (#2563eb) correspondent au thème de votre site

