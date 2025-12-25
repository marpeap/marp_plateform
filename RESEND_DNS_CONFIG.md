# Configuration DNS pour Resend - marpeap.digital

Ce guide vous explique comment configurer les enregistrements DNS pour vérifier votre domaine `marpeap.digital` avec Resend.

## 📋 Enregistrements DNS à ajouter

Ajoutez les enregistrements suivants dans votre fournisseur DNS (où vous avez acheté le domaine marpeap.digital).

### 1. Vérification du domaine (DKIM)

**Type:** `TXT`  
**Nom:** `resend._domainkey`  
**Contenu:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDS9C81OkAvWFD2MhwnEEzy6uZyaa3ispODrbrzqsQMF8y140mujlwuzReZ2uRCzv8q3Jzpv1TJ9EbU4rHbRzf13bdmRIVwJoE2Voxc35/xG9YcgN8o76VNV7xXdKtXxZhC2dyI+D04u/6BKCicXn1A4zKIe9kSiQSShMOn4i+XawIDAQAB`  
**TTL:** `Auto` (ou 3600)

### 2. SPF (Sender Policy Framework)

**Type:** `TXT`  
**Nom:** `send`  
**Contenu:** `v=spf1 include:amazonses.com ~all`  
**TTL:** `60` (ou 3600)

### 3. MX pour l'envoi

**Type:** `MX`  
**Nom:** `send`  
**Contenu:** `feedback-smtp.eu-west-1.amazonses.com`  
**TTL:** `60`  
**Priorité:** `10`

### 4. MX pour la réception (optionnel)

**Type:** `MX`  
**Nom:** `@` (ou racine du domaine)  
**Contenu:** `inbound-smtp.eu-west-1.amazonaws.com`  
**TTL:** `60`  
**Priorité:** `10`

### 5. DMARC (optionnel mais recommandé)

**Type:** `TXT`  
**Nom:** `_dmarc`  
**Contenu:** `v=DMARC1; p=none;`  
**TTL:** `Auto` (ou 3600)

## 🔧 Instructions par fournisseur DNS

### Cloudflare

1. Connectez-vous à votre compte Cloudflare
2. Sélectionnez le domaine `marpeap.digital`
3. Allez dans **DNS** > **Records**
4. Cliquez sur **Add record** pour chaque enregistrement ci-dessus
5. Pour les enregistrements TXT, sélectionnez **Type: TXT**
6. Pour les enregistrements MX, sélectionnez **Type: MX**
7. Remplissez les champs et sauvegardez

### OVH

1. Connectez-vous à votre espace client OVH
2. Allez dans **Domaines** > **marpeap.digital** > **Zone DNS**
3. Cliquez sur **Ajouter une entrée**
4. Sélectionnez le type d'enregistrement (TXT ou MX)
5. Remplissez les champs et validez

### Namecheap

1. Connectez-vous à votre compte Namecheap
2. Allez dans **Domain List** > **Manage** pour marpeap.digital
3. Allez dans l'onglet **Advanced DNS**
4. Cliquez sur **Add New Record** pour chaque enregistrement
5. Remplissez les champs et sauvegardez

### Google Domains / Squarespace

1. Connectez-vous à votre compte
2. Allez dans les paramètres DNS du domaine
3. Ajoutez chaque enregistrement manuellement
4. Sauvegardez les modifications

## ⏱️ Propagation DNS

- Les enregistrements DNS peuvent prendre **15 minutes à 48 heures** pour se propager
- Utilisez [https://dnschecker.org](https://dnschecker.org) pour vérifier la propagation
- Dans Resend, le statut de vérification sera mis à jour automatiquement

## ✅ Vérification dans Resend

1. Allez sur [https://resend.com/domains](https://resend.com/domains)
2. Cliquez sur votre domaine `marpeap.digital`
3. Vérifiez que tous les enregistrements sont marqués comme **Verified** (vérifiés)
4. Une fois vérifié, vous pourrez utiliser `noreply@marpeap.digital` ou `contact@marpeap.digital` comme expéditeur

## 🚨 En cas de problème

### Le domaine n'est pas vérifié après 48h

- Vérifiez que les enregistrements DNS sont correctement configurés
- Vérifiez la propagation avec [dnschecker.org](https://dnschecker.org)
- Vérifiez qu'il n'y a pas d'erreurs de syntaxe dans les enregistrements
- Contactez le support Resend si nécessaire

### Erreurs d'envoi après vérification

- Vérifiez que le domaine est bien vérifié dans Resend
- Vérifiez que vous utilisez un email du domaine vérifié comme expéditeur
- Vérifiez les logs dans Resend dashboard

## 📝 Notes importantes

- **DKIM** : Nécessaire pour l'authentification des emails
- **SPF** : Protège contre le spoofing
- **DMARC** : Recommandé pour la sécurité (commencez avec `p=none`)
- **MX pour réception** : Optionnel, seulement si vous voulez recevoir des emails sur votre domaine

## 🔗 Liens utiles

- [Documentation Resend - Domain Verification](https://resend.com/docs/dashboard/domains/introduction)
- [Vérificateur DNS](https://dnschecker.org)
- [Resend Dashboard](https://resend.com/domains)

