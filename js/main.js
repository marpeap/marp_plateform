// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    // Attendre un peu pour que l'animation soit visible
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      // Retirer complètement du DOM après l'animation
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 600);
    }, 500);
  }
});

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

  // Navbar glassmorphism effect on scroll (optimisé avec throttle)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
      const scrollY = window.pageYOffset;
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
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

  // Scroll reveal animations (optimisé avec IntersectionObserver)
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Utiliser requestAnimationFrame pour une animation fluide
        requestAnimationFrame(() => {
          entry.target.classList.add('revealed');
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections and cards (chargement progressif)
  const elementsToObserve = document.querySelectorAll('section, .service-card, .portfolio-card, .mission-card, .why-card, .process-step');
  elementsToObserve.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  // Parallax effect for hero section (optimisé avec requestAnimationFrame)
  const hero = document.querySelector('.hero');
  if (hero) {
    let ticking = false;
    const heroContent = hero.querySelector('.hero-content');
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
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

  // Open modal when clicking on a service card or button
  serviceCards.forEach(card => {
    const serviceId = card.getAttribute('data-service');
    const modal = document.getElementById(`modal-${serviceId}`);
    
    if (modal) {
      // Click on entire card
      card.addEventListener('click', function(e) {
        // Don't open if clicking on a link inside
        if (e.target.tagName === 'A' && e.target.href) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
      
      // Click on button inside card
      const button = card.querySelector('.service-cta');
      if (button) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
    }
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

// Hero Slideshow (optimisé)
document.addEventListener('DOMContentLoaded', function() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  let slideInterval = null;
  let isPageVisible = true;
  
  if (heroSlides.length > 0) {
    // Précharger les images de fond
    const imageUrls = ['assets/images/background.png', 'assets/images/img1j.png', 'assets/images/img3.png'];
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
    
    function nextSlide() {
      if (!isPageVisible) return;
      
      heroSlides[currentSlide].classList.remove('hero-slide-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('hero-slide-active');
    }
    
    // Démarrer le slideshow après un court délai pour laisser le temps au chargement
    setTimeout(() => {
      slideInterval = setInterval(nextSlide, 5000);
    }, 1000);
    
    // Pause le slideshow quand la page n'est pas visible
    document.addEventListener('visibilitychange', function() {
      isPageVisible = !document.hidden;
      if (isPageVisible && !slideInterval) {
        slideInterval = setInterval(nextSlide, 5000);
      } else if (!isPageVisible && slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    });
  }
});

// Toggle "Plus de projets techniques"
document.addEventListener('DOMContentLoaded', function() {
  const servicesMoreToggle = document.getElementById('servicesMoreToggle');
  const servicesMore = document.getElementById('servicesMore');
  
  if (servicesMoreToggle && servicesMore) {
    servicesMoreToggle.addEventListener('click', function() {
      const isHidden = servicesMore.style.display === 'none' || !servicesMore.style.display;
      servicesMore.style.display = isHidden ? 'grid' : 'none';
      
      const svg = servicesMoreToggle.querySelector('svg');
      if (svg) {
        svg.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }
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

