// Function to send auto-reply email to client via EmailJS
async function sendAutoReply(contactData) {
  const config = window.EMAILJS_CONFIG;
  
  // Vérifier que EmailJS est configuré
  if (!config || !config.AUTOREPLY_TEMPLATE_ID || !window.emailjs) {
    console.warn('⚠️ Auto-réponse non configurée ou EmailJS SDK non disponible');
    return { success: false, reason: 'Auto-reply not configured' };
  }
  
  try {
    // Préparer les paramètres du template d'auto-réponse
    const autoReplyParams = {
      from_name: contactData.name,
      from_email: contactData.email, // Destinataire de l'auto-réponse
      service: contactData.service || 'Non spécifié',
      project_type: contactData.projectType || 'Non spécifié',
      timeline: contactData.timeline || 'Non spécifié',
      message: contactData.message,
      date: new Date().toLocaleString('fr-FR')
    };
    
    // Envoyer l'auto-réponse via EmailJS
    const response = await window.emailjs.send(
      config.SERVICE_ID,
      config.AUTOREPLY_TEMPLATE_ID,
      autoReplyParams
    );
    
    console.log('✅ Auto-réponse envoyée avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'auto-réponse:', error);
    // Ne pas bloquer le processus si l'auto-réponse échoue
    return { success: false, error: error.message || error };
  }
}

// Function to send email notification via EmailJS
async function sendEmailNotification(contactData) {
  // Vérifier si EmailJS est configuré et disponible
  if (!window.EMAILJS_CONFIG || !window.isEmailJSConfigured || !window.isEmailJSConfigured()) {
    console.warn('⚠️ EmailJS non configuré. Les notifications par email ne seront pas envoyées.');
    console.warn('💡 Pour configurer EmailJS, modifiez js/emailjs-config.js avec vos identifiants.');
    
    // Diagnostic détaillé
    if (window.EMAILJS_CONFIG) {
      console.warn('📋 État de la configuration:');
      console.warn('  - Public Key:', window.EMAILJS_CONFIG.PUBLIC_KEY === 'FDKh_5nUofVZbjniz' ? '✅' : '❌');
      console.warn('  - Service ID:', window.EMAILJS_CONFIG.SERVICE_ID === 'service_gvyrpik' ? '✅' : '❌');
      console.warn('  - Template ID (Notification):', window.EMAILJS_CONFIG.TEMPLATE_ID === 'template_k5lgn2g' ? '✅' : '❌');
      console.warn('  - Template ID (Auto-Reply):', window.EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID === 'template_didr2ab' ? '✅' : '❌');
      console.warn('  - EmailJS SDK:', typeof window.emailjs !== 'undefined' ? '✅' : '❌ NON CHARGÉ');
      
      if (window.EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        console.error('❌ PROBLÈME PRINCIPAL: Template ID non configuré !');
        console.error('💡 Solution: Créez un template dans EmailJS Dashboard et ajoutez le Template ID dans js/emailjs-config.js');
        console.error('💡 Consultez DEBUG_EMAILJS.md pour les instructions détaillées');
      }
    }
    
    return { success: false, reason: 'EmailJS not configured' };
  }
  
  const config = window.EMAILJS_CONFIG;
  
  // Vérifier que window.emailjs est disponible
  if (!window.emailjs || typeof window.emailjs.send !== 'function') {
    console.error('❌ EmailJS SDK non chargé. Vérifiez que le script EmailJS est inclus dans contact.html');
    return { success: false, reason: 'EmailJS SDK not loaded' };
  }
  
  try {
    // Préparer les paramètres du template
    const templateParams = {
      to_email: config.RECIPIENT_EMAIL,
      from_name: contactData.name,
      from_email: contactData.email,
      phone: contactData.phone || 'Non fourni',
      service: contactData.service || 'Non spécifié',
      project_type: contactData.projectType || 'Non spécifié',
      budget: contactData.budget || 'Non spécifié',
      timeline: contactData.timeline || 'Non spécifié',
      message: contactData.message,
      reply_to: contactData.email,
      subject: `Nouveau message de contact - ${contactData.name}`,
      date: new Date().toLocaleString('fr-FR')
    };
    
    // Envoyer l'email via EmailJS
    const response = await window.emailjs.send(
      config.SERVICE_ID,
      config.TEMPLATE_ID,
      templateParams
    );
    
    console.log('✅ Email de notification envoyé avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    // Ne pas bloquer le processus si l'email échoue
    return { success: false, error: error.message || error };
  }
}

// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Modal functionality
  function initModals() {
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
          this.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close modal
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on backdrop click
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${this.id}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
            if (trigger) trigger.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }
    });

    // Handle option selection
    const optionButtons = document.querySelectorAll('.modal-option');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const modal = this.closest('.modal');
        const modalId = modal.id;
        
        // Update hidden input
        let inputId = '';
        let displayId = '';
        
        if (modalId === 'serviceModal') {
          inputId = 'service';
          displayId = 'serviceDisplay';
        } else if (modalId === 'projectTypeModal') {
          inputId = 'projectType';
          displayId = 'projectTypeDisplay';
        } else if (modalId === 'timelineModal') {
          inputId = 'timeline';
          displayId = 'timelineDisplay';
        } else if (modalId === 'budgetModal') {
          inputId = 'budget';
          displayId = 'budgetDisplay';
        }

        if (inputId && displayId) {
          const input = document.getElementById(inputId);
          const display = document.getElementById(displayId);
          
          if (input && display) {
            input.value = value;
            display.textContent = value;
            
            // Update trigger button
            const trigger = document.querySelector(`[data-modal="${modalId}"]`);
            if (trigger) {
              trigger.classList.add('has-value');
              clearError(inputId);
            }
          }
        }

        // Remove selected class from all options
        modal.querySelectorAll('.modal-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');

        // Close modal after short delay
        setTimeout(() => {
          modal.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${modalId}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }, 300);
      });
    });
  }

  initModals();

  // Phone validation regex (French format)
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;

  // Validation functions
  function validateName(name) {
    if (name.length < 2) {
      return 'Le nom doit contenir au moins 2 caractères';
    }
    if (name.length > 100) {
      return 'Le nom ne peut pas dépasser 100 caractères';
    }
    return '';
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email invalide';
    }
    return '';
  }

  function validatePhone(phone) {
    // Remove spaces and format
    const cleaned = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleaned)) {
      return 'Numéro de téléphone invalide (format: +33X XX XX XX XX ou 0X XX XX XX XX)';
    }
    return '';
  }

  function validateMessage(message) {
    if (message.length < 10) {
      return 'Le message doit contenir au moins 10 caractères';
    }
    if (message.length > 1000) {
      return 'Le message ne peut pas dépasser 1000 caractères';
    }
    return '';
  }

  // Show error
  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    const input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '#ef4444';
    }
  }

  // Clear error
  function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
    const input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '';
    }
  }

  // Real-time validation
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      const error = validateName(this.value);
      if (error) {
        showError('name', error);
      } else {
        clearError('name');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const error = validateEmail(this.value);
      if (error) {
        showError('email', error);
      } else {
        clearError('email');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      const error = validatePhone(this.value);
      if (error) {
        showError('phone', error);
      } else {
        clearError('phone');
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', function() {
      const error = validateMessage(this.value);
      if (error) {
        showError('message', error);
      } else {
        clearError('message');
      }
    });
  }

  // Real-time validation for new fields (now using hidden inputs)
  const serviceInput = document.getElementById('service');
  const projectTypeInput = document.getElementById('projectType');
  const budgetInput = document.getElementById('budget');
  const timelineInput = document.getElementById('timeline');

  // Watch for changes in hidden inputs
  if (serviceInput) {
    const observer = new MutationObserver(function() {
      if (serviceInput.value) {
        clearError('service');
      }
    });
    observer.observe(serviceInput, { attributes: true, attributeFilter: ['value'] });
  }

  if (projectTypeInput) {
    const observer = new MutationObserver(function() {
      if (projectTypeInput.value) {
        clearError('projectType');
      }
    });
    observer.observe(projectTypeInput, { attributes: true, attributeFilter: ['value'] });
  }

  if (budgetInput) {
    const observer = new MutationObserver(function() {
      if (budgetInput.value) {
        clearError('budget');
      }
    });
    observer.observe(budgetInput, { attributes: true, attributeFilter: ['value'] });
  }

  if (timelineInput) {
    const observer = new MutationObserver(function() {
      if (timelineInput.value) {
        clearError('timeline');
      }
    });
    observer.observe(timelineInput, { attributes: true, attributeFilter: ['value'] });
  }

  // Form submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Clear previous errors
    ['name', 'email', 'phone', 'service', 'projectType', 'budget', 'timeline', 'message'].forEach(field => clearError(field));

    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const serviceInput = document.getElementById('service');
    const projectTypeInput = document.getElementById('projectType');
    const budgetInput = document.getElementById('budget');
    const timelineInput = document.getElementById('timeline');
    const service = serviceInput ? serviceInput.value : '';
    const projectType = projectTypeInput ? projectTypeInput.value : '';
    const budget = budgetInput ? budgetInput.value : '';
    const timeline = timelineInput ? timelineInput.value : '';
    const message = messageInput.value.trim();

    // Validate all fields
    let hasError = false;
    const nameError = validateName(name);
    if (nameError) {
      showError('name', nameError);
      hasError = true;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      showError('email', emailError);
      hasError = true;
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
      showError('phone', phoneError);
      hasError = true;
    }

    if (!service) {
      showError('service', 'Veuillez sélectionner un service');
      hasError = true;
    }

    if (!projectType) {
      showError('projectType', 'Veuillez sélectionner un type de projet');
      hasError = true;
    }

    if (!budget) {
      showError('budget', 'Veuillez sélectionner une tranche de budget');
      hasError = true;
    }

    if (!timeline) {
      showError('timeline', 'Veuillez sélectionner un délai');
      hasError = true;
    }

    const messageError = validateMessage(message);
    if (messageError) {
      showError('message', messageError);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
    }

    // Prepare contact data
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      service: service,
      projectType: projectType,
      budget: budget,
      timeline: timeline,
      message: message
    };

    // Try to send via Supabase
    const formMessage = document.getElementById('formMessage');
    let success = false;

    try {
      // Check if Supabase client is available
      if (typeof window !== 'undefined' && window.supabaseClient) {
        await window.supabaseClient.insertContact(contactData);
        success = true;
        
        // Send email notification to adnan.najim@pm.me
        const emailResult = await sendEmailNotification(contactData);
        if (!emailResult.success) {
          console.warn('⚠️ L\'email n\'a pas pu être envoyé, mais le message a été sauvegardé dans Supabase.');
          console.warn('💡 Raison:', emailResult.reason || emailResult.error);
          console.warn('💡 Vérifiez DEBUG_EMAILJS.md pour résoudre le problème');
        }
        
        // Send auto-reply to client
        const autoReplyResult = await sendAutoReply(contactData);
        if (!autoReplyResult.success) {
          console.warn('⚠️ L\'auto-réponse n\'a pas pu être envoyée au client.');
        }
      } else {
        // Fallback to localStorage if Supabase is not configured
        console.warn('Supabase non configuré, utilisation de localStorage comme fallback');
        const contact = {
          id: Date.now().toString(),
          ...contactData,
          created_at: new Date().toISOString()
        };
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        success = true;
        
        // Send email notification even with localStorage fallback
        const emailResult = await sendEmailNotification(contactData);
        if (!emailResult.success) {
          console.warn('⚠️ L\'email n\'a pas pu être envoyé, mais le message a été sauvegardé localement.');
        }
        
        // Send auto-reply to client
        const autoReplyResult = await sendAutoReply(contactData);
        if (!autoReplyResult.success) {
          console.warn('⚠️ L\'auto-réponse n\'a pas pu être envoyée au client.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      
      // Fallback to localStorage on error
      try {
        const contact = {
          id: Date.now().toString(),
          ...contactData,
          created_at: new Date().toISOString()
        };
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        success = true;
      } catch (fallbackError) {
        console.error('Erreur fallback:', fallbackError);
        if (formMessage) {
          formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          formMessage.className = 'form-message show error';
        }
        
        // Re-enable submit button on error
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer le message';
        }
        return;
      }
    }

    // Show success message
    if (success && formMessage) {
      formMessage.textContent = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
      formMessage.className = 'form-message show success';
    }

    // Reset form
    contactForm.reset();
    
    // Reset modal triggers
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
      trigger.classList.remove('has-value');
      const displayId = trigger.querySelector('span').id;
      if (displayId) {
        const display = document.getElementById(displayId);
        if (display) {
          if (displayId === 'serviceDisplay') display.textContent = 'Sélectionnez un service';
          else if (displayId === 'projectTypeDisplay') display.textContent = 'Sélectionnez un type';
          else if (displayId === 'timelineDisplay') display.textContent = 'Sélectionnez un délai';
          else if (displayId === 'budgetDisplay') display.textContent = 'Sélectionnez une tranche de budget';
        }
      }
    });

    // Re-enable submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      if (formMessage) {
        formMessage.classList.remove('show');
      }
    }, 5000);
  });
});

