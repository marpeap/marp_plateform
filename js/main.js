// Navigation mobile toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar glassmorphism effect on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active nav link highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/index.html' && linkPath === '/')) {
      link.classList.add('active');
    }
  });

  // Scroll reveal animations (inspired by Digital Cover)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections and cards
  document.querySelectorAll('section, .service-card, .portfolio-card, .mission-card').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }
    });
  }

  // "Voir plus" button for About section
  const btnVoirPlus = document.getElementById('btnVoirPlus');
  const aboutTextHidden = document.getElementById('aboutTextHidden');
  const btnVoirPlusText = document.getElementById('btnVoirPlusText');
  
  if (btnVoirPlus && aboutTextHidden && btnVoirPlusText) {
    btnVoirPlus.addEventListener('click', function() {
      const isExpanded = aboutTextHidden.classList.contains('expanded');
      
      aboutTextHidden.classList.toggle('expanded');
      btnVoirPlus.classList.toggle('expanded');
      
      // Update button text
      btnVoirPlusText.textContent = isExpanded ? 'Voir plus' : 'Voir moins';
      
      // Scroll to button if expanding (to show the new content)
      if (!isExpanded) {
        setTimeout(() => {
          btnVoirPlus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  }

  // Service Modals Management
  const serviceCards = document.querySelectorAll('.service-card[data-service]');
  const serviceModals = document.querySelectorAll('.service-modal');
  const modalOverlays = document.querySelectorAll('.service-modal-overlay');
  const modalCloseButtons = document.querySelectorAll('.service-modal-close');

  // Open modal when clicking on a service card
  serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const serviceId = this.getAttribute('data-service');
      const modal = document.getElementById(`modal-${serviceId}`);
      
      if (modal) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  // Close modal functions
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Close modal when clicking on close button
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const modal = this.closest('.service-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal when clicking on overlay
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const modal = this.closest('.service-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      serviceModals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // Prevent modal content clicks from closing the modal
  serviceModals.forEach(modal => {
    const modalContent = modal.querySelector('.service-modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
});

// Utility functions
const utils = {
  // Format date
  formatDate: function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Show message
  showMessage: function(elementId, message, type = 'success') {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = `form-message show ${type}`;
      setTimeout(() => {
        element.classList.remove('show');
      }, 5000);
    }
  },

  // Clear form
  clearForm: function(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.reset();
      // Clear error messages
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.classList.remove('show'));
    }
  }
};

// Export utils for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = utils;
}

