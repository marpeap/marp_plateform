// Admin functionality with localStorage
document.addEventListener('DOMContentLoaded', function() {
  const ADMIN_USERNAME = 'Marpeap';
  const ADMIN_PASSWORD = 'MySiteIsDirty'; // In production, use environment variable or more secure method

  const loginScreen = document.getElementById('loginScreen');
  const adminContent = document.getElementById('adminContent');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if user is logged in
  function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
      showAdminContent();
    } else {
      showLoginScreen();
    }
  }

  function showLoginScreen() {
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminContent) adminContent.style.display = 'none';
  }

  function showAdminContent() {
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    loadDashboard();
    loadClients();
    loadServices();
  }

  // Login form
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const loginMessage = document.getElementById('loginMessage');

      // Clear previous errors
      ['loginEmail', 'loginPassword'].forEach(id => {
        const errorEl = document.getElementById(id + 'Error');
        if (errorEl) errorEl.classList.remove('show');
      });

      // Validate
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        if (loginMessage) {
          loginMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
          loginMessage.className = 'form-message show error';
        }
        return;
      }

      // Login successful
      localStorage.setItem('adminLoggedIn', 'true');
      showAdminContent();
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('adminLoggedIn');
      showLoginScreen();
      if (loginForm) loginForm.reset();
    });
  }

  // Load dashboard data
  function loadDashboard() {
    // Load contacts count
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactsCount = document.getElementById('contactsCount');
    if (contactsCount) {
      contactsCount.textContent = contacts.length;
    }

    // Load clients count
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const clientsCount = document.getElementById('clientsCount');
    if (clientsCount) {
      clientsCount.textContent = clients.length;
    }

    // Load recent contacts
    const recentContacts = document.getElementById('recentContacts');
    if (recentContacts) {
      if (contacts.length === 0) {
        recentContacts.innerHTML = '<p class="empty-message">Aucun message pour le moment</p>';
      } else {
        const recent = contacts.slice(-5).reverse();
        recentContacts.innerHTML = recent.map(contact => `
          <div class="contact-item">
            <div class="contact-item-header">
              <span class="contact-item-name">${escapeHtml(contact.name)}</span>
              <span class="contact-item-email">${escapeHtml(contact.email)}</span>
            </div>
            <div class="contact-item-meta">
              <span class="contact-badge">${escapeHtml(contact.service || 'N/A')}</span>
              <span class="contact-badge">${escapeHtml(contact.projectType || 'N/A')}</span>
              <span class="contact-badge">${escapeHtml(contact.budget || 'N/A')}</span>
            </div>
            <p class="contact-item-message">${escapeHtml(contact.message)}</p>
            <p class="contact-item-date">${formatDate(contact.created_at)}</p>
          </div>
        `).join('');
      }
    }
  }

  // Load clients
  function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const clientsListCount = document.getElementById('clientsListCount');
    const clientsTableBody = document.getElementById('clientsTableBody');

    if (clientsListCount) {
      clientsListCount.textContent = clients.length;
    }

    if (clientsTableBody) {
      if (clients.length === 0) {
        clientsTableBody.innerHTML = '<tr><td colspan="5" class="empty-message">Aucun client pour le moment</td></tr>';
      } else {
        clientsTableBody.innerHTML = clients.map(client => `
          <tr>
            <td>${escapeHtml(client.name)}</td>
            <td>${escapeHtml(client.email)}</td>
            <td>
              <span class="status-badge ${client.status || 'active'}">
                ${client.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            </td>
            <td>${formatDate(client.created_at)}</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-outline btn-sm" onclick="toggleClientStatus('${client.id}')">
                  ${client.status === 'active' ? 'Désactiver' : 'Activer'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteClient('${client.id}')">
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // Client form
  const clientForm = document.getElementById('clientForm');
  if (clientForm) {
    clientForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const clientMessage = document.getElementById('clientMessage');

      // Validate
      if (name.length < 2) {
        if (clientMessage) {
          clientMessage.textContent = 'Le nom doit contenir au moins 2 caractères';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (clientMessage) {
          clientMessage.textContent = 'Email invalide';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      // Check if email already exists
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      if (clients.some(c => c.email === email)) {
        if (clientMessage) {
          clientMessage.textContent = 'Un client avec cet email existe déjà';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      // Create client
      const client = {
        id: Date.now().toString(),
        name: name,
        email: email,
        status: 'active',
        created_at: new Date().toISOString()
      };

      clients.push(client);
      localStorage.setItem('clients', JSON.stringify(clients));

      // Show success
      if (clientMessage) {
        clientMessage.textContent = 'Client créé avec succès !';
        clientMessage.className = 'form-message show success';
      }

      // Reset form
      clientForm.reset();

      // Reload clients list
      loadClients();

      // Clear message after 3 seconds
      setTimeout(() => {
        if (clientMessage) {
          clientMessage.classList.remove('show');
        }
      }, 3000);
    });
  }

  // Toggle client status
  window.toggleClientStatus = function(clientId) {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const client = clients.find(c => c.id === clientId);
    if (client) {
      client.status = client.status === 'active' ? 'inactive' : 'active';
      localStorage.setItem('clients', JSON.stringify(clients));
      loadClients();
    }
  };

  // Delete client
  window.deleteClient = function(clientId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      return;
    }
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const filtered = clients.filter(c => c.id !== clientId);
    localStorage.setItem('clients', JSON.stringify(filtered));
    loadClients();
  };

  // Utility functions
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Services Management
  const servicesData = {
    'developpement-web': {
      id: 'developpement-web',
      icon: '💻',
      title: 'Développement Web',
      description: 'Sites web modernes et performants avec les dernières technologies',
      modalTitle: 'Développement Web',
      modalDescription: [
        'Le développement web consiste à créer des sites internet modernes, performants et adaptés à vos besoins spécifiques. Que vous ayez besoin d\'un site vitrine, d\'un portfolio, d\'un site institutionnel ou d\'une plateforme complexe, je conçois des solutions sur mesure utilisant les dernières technologies web.',
        'Chaque projet est développé avec une attention particulière à la performance, la sécurité, l\'accessibilité et l\'expérience utilisateur. Les sites sont optimisés pour tous les appareils (responsive design) et respectent les standards du web moderne.'
      ],
      modalFeatures: [
        'Sites vitrines et portfolios personnalisés',
        'Sites institutionnels et corporate',
        'Applications web interactives',
        'Intégration de systèmes de gestion de contenu (CMS)',
        'Optimisation des performances et du temps de chargement'
      ],
      prices: {
        marpeap: {
          simple: '200€ - 450€',
          complex: '2 000€ - 5 000€'
        },
        freelance: {
          simple: '300€ - 700€',
          complex: '3 000€ - 8 000€'
        },
        agency: {
          simple: '5 000€ - 15 000€',
          complex: '15 000€ - 50 000€+'
        }
      },
      comparison: {
        marpeap: {
          interlocuteur: '✓ Direct, sans intermédiaire',
          reactivite: '✓ Réponse sous 24h',
          personnalisation: '✓ 100% sur-mesure',
          transparence: '✓ Devis clair, pas de frais cachés',
          suivi: '✓ Accompagnement personnalisé'
        },
        freelance: {
          interlocuteur: '✓ Direct, sans intermédiaire',
          reactivite: '✓ Réponse sous 24h',
          personnalisation: '✓ 100% sur-mesure',
          transparence: '✓ Devis clair, pas de frais cachés',
          suivi: '✓ Accompagnement personnalisé'
        },
        agency: {
          interlocuteur: '✗ Équipe fragmentée',
          reactivite: '✗ Délais administratifs',
          personnalisation: '✗ Solutions standardisées',
          transparence: '✗ Frais de structure inclus',
          suivi: '✗ Support générique'
        }
      },
      note: 'En tant que développeur freelance, je vous offre une relation directe, sans intermédiaire. Vous économisez jusqu\'à 60% par rapport à une agence tout en bénéficiant d\'un service personnalisé et réactif. Chaque projet est traité avec la même attention, car votre satisfaction est ma priorité.'
    },
    'design-uiux': {
      id: 'design-uiux',
      icon: '🎨',
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur intuitives et esthétiques pour une expérience optimale',
      modalTitle: 'Design UI/UX',
      modalDescription: [
        'Le design UI/UX (Interface Utilisateur / Expérience Utilisateur) est essentiel pour créer des interfaces qui sont à la fois esthétiques et fonctionnelles. Un bon design améliore l\'expérience de vos utilisateurs, augmente l\'engagement et favorise les conversions.',
        'Je conçois des interfaces modernes, intuitives et accessibles qui reflètent votre identité de marque tout en optimisant l\'expérience utilisateur. Chaque design est pensé pour guider naturellement l\'utilisateur vers ses objectifs.'
      ],
      modalFeatures: [
        'Maquettes et prototypes interactifs',
        'Design system et charte graphique',
        'Optimisation de l\'expérience utilisateur',
        'Tests d\'utilisabilité et itérations',
        'Design responsive pour tous les écrans'
      ],
      prices: {
        marpeap: {
          simple: '480€ - 1 500€',
          complex: '1 500€ - 3 600€'
        },
        freelance: {
          simple: '750€ - 2 400€',
          complex: '2 300€ - 5 500€'
        },
        agency: {
          simple: '3 000€ - 8 000€',
          complex: '8 000€ - 25 000€+'
        }
      },
      comparison: {
        marpeap: {
          vision: '✓ Design et développement alignés',
          iterations: '✓ Modifications en temps réel',
          comprehension: '✓ Vision globale technique'
        },
        freelance: {
          vision: '✓ Design et développement alignés',
          iterations: '✓ Modifications en temps réel',
          comprehension: '✓ Vision globale technique'
        },
        agency: {
          vision: '✗ Séparation design/dev',
          iterations: '✗ Processus lourd',
          comprehension: '✗ Vision fragmentée'
        }
      },
      note: 'En tant que développeur freelance, je maîtrise à la fois le design et le développement. Cela signifie que mes designs sont toujours réalisables techniquement et optimisés pour la performance. Vous économisez jusqu\'à 70% par rapport à une agence tout en bénéficiant d\'une vision cohérente de votre projet.'
    },
    'ecommerce': {
      id: 'ecommerce',
      icon: '🛒',
      title: 'E-commerce',
      description: 'Solutions e-commerce sur mesure pour développer votre activité en ligne',
      modalTitle: 'E-commerce',
      modalDescription: [
        'Une solution e-commerce performante est essentielle pour développer votre activité en ligne. Je crée des boutiques en ligne sécurisées, optimisées pour les conversions et faciles à gérer, que vous vendiez quelques produits ou des milliers d\'articles.',
        'Chaque boutique e-commerce est conçue pour offrir une expérience d\'achat fluide, avec des fonctionnalités sur mesure adaptées à votre secteur d\'activité. Intégration de moyens de paiement, gestion des stocks, suivi des commandes : tout est pensé pour votre réussite commerciale.'
      ],
      modalFeatures: [
        'Boutiques en ligne sur mesure',
        'Intégration de systèmes de paiement sécurisés',
        'Gestion des stocks et commandes',
        'Optimisation du tunnel d\'achat',
        'Intégration avec vos outils existants'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 450€',
          complex: '4 800€ - 12 000€'
        },
        freelance: {
          simple: 'À partir de 700€',
          complex: '7 200€ - 19 000€'
        },
        agency: {
          simple: '12 000€ - 30 000€',
          complex: '30 000€ - 100 000€+'
        }
      },
      comparison: {
        marpeap: {
          commission: '✗ Aucune',
          formation: '✓ Incluse dans le projet',
          maintenance: '✓ Tarifs transparents',
          personnalisation: '✓ 100% adapté à vos besoins'
        },
        freelance: {
          commission: '✗ Aucune',
          formation: '✓ Incluse dans le projet',
          maintenance: '✓ Tarifs transparents',
          personnalisation: '✓ 100% adapté à vos besoins'
        },
        agency: {
          commission: '⚠️ Parfois demandée',
          formation: '✗ Supplémentaire',
          maintenance: '✗ Contrats onéreux',
          personnalisation: '✗ Solutions génériques'
        }
      },
      note: 'Les solutions e-commerce d\'agences sont souvent surdimensionnées et coûteuses. En tant que freelance, je crée des boutiques optimisées pour vos besoins réels, sans fonctionnalités inutiles. Vous économisez jusqu\'à 75% tout en obtenant une solution parfaitement adaptée à votre activité.'
    },
    'applications-web': {
      id: 'applications-web',
      icon: '📱',
      title: 'Applications Web',
      description: 'Applications web progressives (PWA) et applications métier sur mesure',
      modalTitle: 'Applications Web',
      modalDescription: [
        'Les applications web modernes (PWA - Progressive Web Apps) offrent une expérience proche des applications natives, directement depuis le navigateur. Elles fonctionnent hors ligne, peuvent être installées sur l\'écran d\'accueil et offrent des performances exceptionnelles.',
        'Je développe également des applications métier sur mesure pour automatiser vos processus, gérer vos données ou créer des outils spécifiques à votre activité. Chaque application est conçue pour répondre exactement à vos besoins opérationnels.'
      ],
      modalFeatures: [
        'Applications web progressives (PWA)',
        'Applications métier sur mesure',
        'Outils de gestion et d\'automatisation',
        'Interfaces d\'administration personnalisées',
        'Intégrations avec vos systèmes existants'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 650€',
          complex: '9 000€ - 24 000€'
        },
        freelance: {
          simple: 'À partir de 950€',
          complex: '13 500€ - 38 000€'
        },
        agency: {
          simple: '20 000€ - 60 000€',
          complex: '60 000€ - 200 000€+'
        }
      },
      comparison: {
        marpeap: {
          delai: '✓ Plus rapide, moins de bureaucratie',
          flexibilite: '✓ Choix technologiques adaptés',
          evolutivite: '✓ Ajouts progressifs'
        },
        freelance: {
          delai: '✓ Plus rapide, moins de bureaucratie',
          flexibilite: '✓ Choix technologiques adaptés',
          evolutivite: '✓ Ajouts progressifs'
        },
        agency: {
          delai: '✗ Processus lourd',
          flexibilite: '✗ Solutions imposées',
          evolutivite: '✗ Contrats rigides'
        }
      },
      note: 'Les applications métier nécessitent une compréhension approfondie de vos besoins. En tant que freelance, je travaille directement avec vous pour créer exactement ce dont vous avez besoin, sans surdimensionnement. Vous économisez jusqu\'à 80% par rapport à une agence tout en obtenant une solution parfaitement adaptée.'
    },
    'optimisation-seo': {
      id: 'optimisation-seo',
      icon: '🚀',
      title: 'Optimisation SEO',
      description: 'Amélioration de votre visibilité en ligne et référencement naturel',
      modalTitle: 'Optimisation SEO',
      modalDescription: [
        'Le SEO (Search Engine Optimization) est essentiel pour améliorer votre visibilité dans les résultats de recherche Google. Un bon référencement naturel attire des visiteurs qualifiés vers votre site, sans coût publicitaire, et génère un trafic durable dans le temps.',
        'J\'optimise votre site pour les moteurs de recherche en travaillant sur la structure technique, le contenu, les performances et les liens. Chaque optimisation est mesurée et ajustée pour maximiser votre positionnement sur vos mots-clés stratégiques.'
      ],
      modalFeatures: [
        'Audit SEO complet de votre site',
        'Optimisation technique (vitesse, structure)',
        'Optimisation du contenu et des mots-clés',
        'Stratégie de netlinking',
        'Suivi et reporting des performances'
      ],
      prices: {
        marpeap: {
          audit: '300€ - 900€',
          mensuel: '180€ - 480€/mois'
        },
        freelance: {
          audit: '500€ - 1 500€',
          mensuel: '280€ - 750€/mois'
        },
        agency: {
          audit: '2 000€ - 5 000€',
          mensuel: '1 500€ - 5 000€+/mois'
        }
      },
      comparison: {
        marpeap: {
          engagement: '✓ Flexible, sans engagement',
          transparence: '✓ Explications détaillées',
          reactivite: '✓ Ajustements rapides'
        },
        freelance: {
          engagement: '✓ Flexible, sans engagement',
          transparence: '✓ Explications détaillées',
          reactivite: '✓ Ajustements rapides'
        },
        agency: {
          engagement: '✗ Contrats annuels imposés',
          transparence: '✗ Reporting générique',
          reactivite: '✗ Processus lent'
        }
      },
      note: 'Le SEO nécessite une compréhension technique approfondie de votre site. En tant que développeur freelance, je peux optimiser directement le code et la structure, ce qu\'une agence SEO classique ne peut pas faire. Vous économisez jusqu\'à 70% tout en bénéficiant d\'une approche technique complète.'
    },
    'maintenance-support': {
      id: 'maintenance-support',
      icon: '🔧',
      title: 'Maintenance & Support',
      description: 'Accompagnement continu et maintenance de vos solutions digitales',
      modalTitle: 'Maintenance & Support',
      modalDescription: [
        'Un site web nécessite une maintenance régulière pour rester performant, sécurisé et à jour. Je propose un accompagnement continu pour garantir la pérennité de votre solution digitale, avec des mises à jour, des sauvegardes et un support réactif en cas de problème.',
        'Que ce soit pour des corrections de bugs, des améliorations fonctionnelles, des mises à jour de sécurité ou des évolutions de votre site, je vous accompagne avec des tarifs transparents et une réactivité maximale.'
      ],
      modalFeatures: [
        'Maintenance préventive et corrective',
        'Mises à jour de sécurité et de contenu',
        'Sauvegardes régulières',
        'Support technique réactif',
        'Évolutions et améliorations continues'
      ],
      prices: {
        marpeap: {
          mensuel: '90€ - 300€/mois'
        },
        freelance: {
          mensuel: '140€ - 480€/mois'
        },
        agency: {
          mensuel: '500€ - 2 000€+/mois'
        }
      },
      comparison: {
        marpeap: {
          temps: '✓ Sous 24h, souvent immédiat',
          connaissance: '✓ J\'ai créé votre site',
          flexibilite: '✓ Selon vos besoins',
          transparence: '✓ Devis avant intervention'
        },
        freelance: {
          temps: '✓ Sous 24h, souvent immédiat',
          connaissance: '✓ J\'ai créé votre site',
          flexibilite: '✓ Selon vos besoins',
          transparence: '✓ Devis avant intervention'
        },
        agency: {
          temps: '✗ 48h-72h minimum',
          connaissance: '✗ Équipe différente',
          flexibilite: '✗ Forfaits imposés',
          transparence: '✗ Facturation complexe'
        }
      },
      note: 'Qui mieux que le développeur qui a créé votre site peut le maintenir efficacement ? En tant que freelance, je connais parfaitement votre projet et peux intervenir rapidement. Vous économisez jusqu\'à 75% par rapport aux forfaits d\'agence tout en bénéficiant d\'un service personnalisé et réactif.'
    },
    'refonte-site': {
      id: 'refonte-site',
      icon: '🔄',
      title: 'Refonte de Site Web',
      description: 'Modernisation complète de votre site existant avec les dernières technologies',
      modalTitle: 'Refonte de Site Web',
      modalDescription: [
        'La refonte d\'un site web est essentielle lorsque votre site actuel ne répond plus à vos besoins, est obsolète techniquement ou ne convertit plus efficacement. Je modernise complètement votre site existant en conservant votre identité tout en améliorant significativement ses performances, son design et son expérience utilisateur.',
        'Une refonte bien menée peut transformer un site qui ne génère plus de résultats en une plateforme performante et moderne. Je m\'assure de préserver votre référencement existant tout en améliorant tous les aspects techniques et visuels.'
      ],
      modalFeatures: [
        'Analyse de votre site actuel et identification des points d\'amélioration',
        'Modernisation du design et de l\'interface utilisateur',
        'Migration vers des technologies modernes et performantes',
        'Optimisation du référencement et préservation du SEO',
        'Amélioration de la conversion et de l\'expérience utilisateur'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 800€',
          complex: '3 000€ - 8 000€'
        },
        freelance: {
          simple: 'À partir de 1 200€',
          complex: '4 500€ - 12 500€'
        },
        agency: {
          simple: '8 000€ - 20 000€',
          complex: '20 000€ - 60 000€+'
        }
      },
      comparison: {
        marpeap: {
          seo: '✓ Expertise technique complète',
          connaissance: '✓ Analyse approfondie avant refonte',
          delai: '✓ Plus rapide, focus sur l\'essentiel'
        },
        freelance: {
          seo: '✓ Expertise technique complète',
          connaissance: '✓ Analyse approfondie avant refonte',
          delai: '✓ Plus rapide, focus sur l\'essentiel'
        },
        agency: {
          seo: '✗ Risque de perte de référencement',
          connaissance: '✗ Approche standardisée',
          delai: '✗ Processus long et complexe'
        }
      },
      note: 'La refonte nécessite une compréhension fine de votre site existant et de vos besoins. En tant que freelance, je prends le temps d\'analyser en profondeur votre site actuel avant de proposer une solution optimale. Vous économisez jusqu\'à 70% par rapport à une agence tout en bénéficiant d\'une refonte sur-mesure qui préserve votre référencement.'
    },
    'integration-api': {
      id: 'integration-api',
      icon: '🔌',
      title: 'Intégration API & Webhooks',
      description: 'Connexion de votre site avec vos outils et services externes',
      modalTitle: 'Intégration API & Webhooks',
      modalDescription: [
        'Les intégrations API permettent à votre site web de communiquer avec d\'autres services et outils : systèmes de paiement, CRM, outils marketing, bases de données externes, etc. Je crée des connexions robustes et sécurisées entre votre site et tous les services dont vous avez besoin pour automatiser vos processus et centraliser vos données.',
        'Les webhooks permettent à votre site de recevoir des notifications en temps réel d\'autres services, créant ainsi des flux de travail automatisés. Que vous ayez besoin d\'intégrer un système de paiement, un CRM, un outil d\'emailing ou tout autre service, je m\'assure que l\'intégration est fiable, sécurisée et performante.'
      ],
      modalFeatures: [
        'Intégration de systèmes de paiement (Stripe, PayPal, etc.)',
        'Connexion avec CRM et outils de gestion',
        'Intégration d\'outils marketing et emailing',
        'Webhooks pour notifications en temps réel',
        'API personnalisées pour vos besoins spécifiques'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 350€',
          complex: '1 200€ - 4 000€'
        },
        freelance: {
          simple: 'À partir de 550€',
          complex: '1 800€ - 6 200€'
        },
        agency: {
          simple: '3 000€ - 8 000€',
          complex: '8 000€ - 25 000€+'
        }
      },
      comparison: {
        marpeap: {
          expertise: '✓ Spécialisé en intégrations',
          reactivite: '✓ Corrections rapides',
          documentation: '✓ Documentation complète fournie'
        },
        freelance: {
          expertise: '✓ Spécialisé en intégrations',
          reactivite: '✓ Corrections rapides',
          documentation: '✓ Documentation complète fournie'
        },
        agency: {
          expertise: '✗ Approche générique',
          reactivite: '✗ Délais administratifs',
          documentation: '✗ Documentation minimale'
        }
      },
      note: 'Les intégrations API nécessitent une expertise technique pointue et une compréhension approfondie de votre architecture. En tant que freelance spécialisé, je crée des intégrations sur-mesure, bien documentées et faciles à maintenir. Vous économisez jusqu\'à 75% par rapport à une agence tout en obtenant une solution technique de qualité professionnelle.'
    },
    'migration-modernisation': {
      id: 'migration-modernisation',
      icon: '🚀',
      title: 'Migration & Modernisation',
      description: 'Migration vers de nouvelles technologies et modernisation de votre infrastructure',
      modalTitle: 'Migration & Modernisation',
      modalDescription: [
        'La migration et la modernisation consistent à transférer votre site ou application vers de nouvelles technologies plus performantes, sécurisées et maintenables. Que vous souhaitiez migrer d\'un CMS obsolète vers un système moderne, passer d\'un framework à un autre, ou moderniser votre infrastructure, je vous accompagne dans cette transition en minimisant les risques et les interruptions de service.',
        'Une migration bien planifiée permet d\'améliorer significativement les performances, la sécurité et la maintenabilité de votre solution digitale. Je m\'assure que toutes vos données sont préservées et que la transition se fait en douceur, sans perte de fonctionnalités ni d\'interruption pour vos utilisateurs.'
      ],
      modalFeatures: [
        'Migration de CMS (WordPress, Drupal, etc.)',
        'Migration vers des frameworks modernes',
        'Modernisation de l\'infrastructure et de l\'hébergement',
        'Migration de bases de données',
        'Préservation des données et du référencement'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 1 200€',
          complex: '4 000€ - 12 000€'
        },
        freelance: {
          simple: '3 000€ - 8 000€',
          complex: '8 000€ - 20 000€'
        },
        agency: {
          simple: '10 000€ - 30 000€',
          complex: '30 000€ - 100 000€+'
        }
      },
      comparison: {
        marpeap: {
          planification: '✓ Plan de migration personnalisé',
          preservation: '✓ Aucune perte garantie',
          support: '✓ Accompagnement inclus'
        },
        freelance: {
          planification: '✓ Plan de migration personnalisé',
          preservation: '✓ Aucune perte garantie',
          support: '✓ Accompagnement inclus'
        },
        agency: {
          planification: '✗ Processus standardisé',
          preservation: '⚠️ Risque de perte',
          support: '✗ Supplémentaire'
        }
      },
      note: 'Les migrations nécessitent une attention méticuleuse et une planification rigoureuse. En tant que freelance, je prends le temps nécessaire pour comprendre votre système actuel et créer un plan de migration sur-mesure. Vous économisez jusqu\'à 80% par rapport à une agence tout en bénéficiant d\'une migration sécurisée et bien planifiée.'
    },
    'audit-technique': {
      id: 'audit-technique',
      icon: '🔍',
      title: 'Audit Technique',
      description: 'Analyse approfondie de votre site : performance, sécurité, code qualité',
      modalTitle: 'Audit Technique',
      modalDescription: [
        'Un audit technique complet permet d\'identifier les faiblesses, les opportunités d\'amélioration et les risques de votre site web. J\'analyse en profondeur la performance, la sécurité, la qualité du code, l\'accessibilité, le référencement et l\'expérience utilisateur pour vous fournir un rapport détaillé avec des recommandations prioritaires et un plan d\'action concret.',
        'Un audit bien réalisé est la base d\'une stratégie d\'amélioration efficace. Il vous permet de comprendre précisément l\'état de votre site, d\'identifier les problèmes avant qu\'ils n\'impactent vos utilisateurs, et de prioriser les améliorations selon leur impact et leur urgence.'
      ],
      modalFeatures: [
        'Audit de performance et vitesse de chargement',
        'Analyse de sécurité et vulnérabilités',
        'Revue de la qualité du code et de l\'architecture',
        'Audit SEO et référencement',
        'Analyse de l\'accessibilité et de l\'expérience utilisateur'
      ],
      prices: {
        marpeap: {
          audit: '250€ - 800€'
        },
        freelance: {
          audit: '400€ - 1 300€'
        },
        agency: {
          audit: '2 500€ - 8 000€'
        }
      },
      comparison: {
        marpeap: {
          delai: '✓ 3-5 jours ouvrés',
          profondeur: '✓ Analyse technique approfondie',
          rapport: '✓ Rapport complet avec plan d\'action',
          suivi: '✓ Recommandations prioritaires'
        },
        freelance: {
          delai: '✓ 5-7 jours ouvrés',
          profondeur: '✓ Analyse technique approfondie',
          rapport: '✓ Rapport complet avec plan d\'action',
          suivi: '✓ Recommandations prioritaires'
        },
        agency: {
          delai: '✗ 2-3 semaines',
          profondeur: '✗ Analyse superficielle',
          rapport: '✗ Rapport générique',
          suivi: '✗ Liste générique'
        }
      },
      note: 'Un audit technique efficace nécessite une expertise technique approfondie et du temps pour analyser en détail. En tant que freelance, je prends le temps nécessaire pour examiner chaque aspect de votre site et vous fournir un rapport actionnable. Vous économisez jusqu\'à 75% par rapport à une agence tout en obtenant une analyse plus détaillée et personnalisée.'
    },
    'formation-accompagnement': {
      id: 'formation-accompagnement',
      icon: '📚',
      title: 'Formation & Accompagnement',
      description: 'Formation personnalisée pour maîtriser votre site et vos outils',
      modalTitle: 'Formation & Accompagnement',
      modalDescription: [
        'La formation et l\'accompagnement vous permettent de maîtriser votre site web et vos outils digitaux en toute autonomie. Je vous forme de manière personnalisée sur l\'utilisation de votre site, la gestion de contenu, les outils d\'administration, et vous accompagne dans vos premiers pas pour que vous soyez totalement autonome.',
        'Que vous ayez besoin d\'une formation complète ou d\'un accompagnement ponctuel, j\'adapte mon approche à votre niveau et à vos besoins spécifiques. L\'objectif est de vous donner les compétences et la confiance nécessaires pour gérer votre présence digitale de manière indépendante.'
      ],
      modalFeatures: [
        'Formation à la gestion de contenu (CMS)',
        'Formation aux outils d\'administration',
        'Accompagnement personnalisé selon vos besoins',
        'Documentation et guides personnalisés',
        'Support post-formation inclus'
      ],
      prices: {
        marpeap: {
          simple: '150€ - 300€',
          complex: '400€ - 1 000€'
        },
        freelance: {
          simple: '230€ - 480€',
          complex: '600€ - 1 600€'
        },
        agency: {
          simple: '800€ - 2 000€',
          complex: '3 000€ - 8 000€'
        }
      },
      comparison: {
        marpeap: {
          personnalisation: '✓ 100% adapté à votre site',
          flexibilite: '✓ Selon vos disponibilités',
          support: '✓ Questions par email incluses'
        },
        freelance: {
          personnalisation: '✓ 100% adapté à votre site',
          flexibilite: '✓ Selon vos disponibilités',
          support: '✓ Questions par email incluses'
        },
        agency: {
          personnalisation: '✗ Formation générique',
          flexibilite: '✗ Horaires imposés',
          support: '✗ Supplémentaire'
        }
      },
      note: 'La formation est plus efficace quand elle est personnalisée à votre site et à votre niveau. En tant que freelance, je connais parfaitement votre site puisque je l\'ai créé, et j\'adapte la formation à vos besoins réels. Vous économisez jusqu\'à 80% par rapport à une agence tout en bénéficiant d\'une formation sur-mesure et d\'un accompagnement personnalisé.'
    },
    'hebergement-deploiement': {
      id: 'hebergement-deploiement',
      icon: '☁️',
      title: 'Hébergement & Déploiement',
      description: 'Configuration et gestion de l\'hébergement et du déploiement de votre site',
      modalTitle: 'Hébergement & Déploiement',
      modalDescription: [
        'L\'hébergement et le déploiement consistent à mettre en ligne votre site web de manière optimale, sécurisée et performante. Je configure votre hébergement, met en place les processus de déploiement automatisés, configure les domaines, les certificats SSL, et m\'assure que tout fonctionne parfaitement en production.',
        'Un bon hébergement et un déploiement bien configuré sont essentiels pour la performance et la disponibilité de votre site. Je vous aide à choisir la meilleure solution d\'hébergement selon vos besoins et configure tout pour que votre site soit accessible rapidement et de manière fiable.'
      ],
      modalFeatures: [
        'Configuration d\'hébergement optimisé',
        'Mise en place de déploiements automatisés',
        'Configuration de domaines et certificats SSL',
        'Optimisation des performances serveur',
        'Configuration de sauvegardes automatiques'
      ],
      prices: {
        marpeap: {
          simple: '200€ - 600€',
          mensuel: '50€ - 150€/mois'
        },
        freelance: {
          simple: '320€ - 950€',
          mensuel: '80€ - 240€/mois'
        },
        agency: {
          simple: '2 000€ - 6 000€',
          mensuel: '300€ - 1 000€+/mois'
        }
      },
      comparison: {
        marpeap: {
          transparence: '✓ Coûts hébergement transparents',
          reactivite: '✓ Intervention rapide en cas de problème',
          optimisation: '✓ Configuration optimale pour votre site'
        },
        freelance: {
          transparence: '✓ Coûts hébergement transparents',
          reactivite: '✓ Intervention rapide en cas de problème',
          optimisation: '✓ Configuration optimale pour votre site'
        },
        agency: {
          transparence: '✗ Marges cachées',
          reactivite: '✗ Délais de réponse',
          optimisation: '✗ Configuration standard'
        }
      },
      note: 'L\'hébergement et le déploiement nécessitent une configuration adaptée à votre site spécifique. En tant que freelance, je configure tout de manière optimale pour votre projet, sans marges cachées. Vous économisez jusqu\'à 70% par rapport à une agence tout en bénéficiant d\'une configuration sur-mesure et d\'un support réactif.'
    },
    'optimisation-performance': {
      id: 'optimisation-performance',
      icon: '⚡',
      title: 'Optimisation de Performance',
      description: 'Amélioration de la vitesse, du temps de chargement et de l\'expérience utilisateur',
      modalTitle: 'Optimisation de Performance',
      modalDescription: [
        'L\'optimisation de performance améliore significativement la vitesse de chargement, la réactivité et l\'expérience utilisateur de votre site web. Un site rapide améliore le référencement, réduit le taux de rebond, augmente les conversions et améliore la satisfaction des utilisateurs. Je travaille sur tous les aspects techniques pour rendre votre site aussi performant que possible.',
        'L\'optimisation de performance touche de nombreux aspects : compression d\'images, mise en cache, optimisation du code, réduction des requêtes, optimisation des bases de données, CDN, etc. Chaque amélioration est mesurée pour garantir des résultats concrets et mesurables.'
      ],
      modalFeatures: [
        'Optimisation de la vitesse de chargement',
        'Compression et optimisation d\'images',
        'Mise en cache et optimisation des ressources',
        'Optimisation du code et des requêtes',
        'Configuration de CDN et optimisation réseau'
      ],
      prices: {
        marpeap: {
          simple: '300€ - 800€',
          complex: '1 000€ - 3 000€'
        },
        freelance: {
          simple: '450€ - 1 300€',
          complex: '1 500€ - 4 800€'
        },
        agency: {
          simple: '2 500€ - 6 000€',
          complex: '8 000€ - 20 000€+'
        }
      },
      comparison: {
        marpeap: {
          mesure: '✓ Avant/après détaillé',
          approche: '✓ Optimisations ciblées',
          suivi: '✓ Monitoring inclus'
        },
        freelance: {
          mesure: '✓ Avant/après détaillé',
          approche: '✓ Optimisations ciblées',
          suivi: '✓ Monitoring inclus'
        },
        agency: {
          mesure: '✗ Rapport générique',
          approche: '✗ Solutions génériques',
          suivi: '✗ Supplémentaire'
        }
      },
      note: 'L\'optimisation de performance nécessite une analyse technique approfondie de votre site spécifique. En tant que freelance, j\'identifie les vrais goulots d\'étranglement et applique des optimisations ciblées et mesurables. Vous économisez jusqu\'à 75% par rapport à une agence tout en obtenant des résultats concrets et mesurables.'
    },
    'securite-web': {
      id: 'securite-web',
      icon: '🔒',
      title: 'Sécurité Web',
      description: 'Renforcement de la sécurité de votre site et protection contre les menaces',
      modalTitle: 'Sécurité Web',
      modalDescription: [
        'La sécurité web est essentielle pour protéger votre site, vos données et celles de vos utilisateurs contre les menaces et les attaques. Je renforce la sécurité de votre site en identifiant et corrigeant les vulnérabilités, en mettant en place des mesures de protection, et en vous fournissant des recommandations pour maintenir un niveau de sécurité optimal.',
        'Un site sécurisé protège non seulement vos données mais aussi votre réputation et la confiance de vos utilisateurs. Je m\'assure que votre site respecte les meilleures pratiques de sécurité et reste protégé contre les menaces courantes : injections SQL, XSS, CSRF, attaques par force brute, etc.'
      ],
      modalFeatures: [
        'Audit de sécurité et identification des vulnérabilités',
        'Correction des failles de sécurité',
        'Mise en place de mesures de protection',
        'Configuration de certificats SSL et HTTPS',
        'Recommandations de sécurité et bonnes pratiques'
      ],
      prices: {
        marpeap: {
          audit: '400€ - 1 200€',
          complex: '1 500€ - 4 000€'
        },
        freelance: {
          audit: '600€ - 1 950€',
          complex: '2 300€ - 6 500€'
        },
        agency: {
          audit: '3 000€ - 10 000€',
          complex: '12 000€ - 40 000€+'
        }
      },
      comparison: {
        marpeap: {
          expertise: '✓ Spécialisé en sécurité web',
          rapidite: '✓ Correction urgente possible',
          documentation: '✓ Rapport détaillé des corrections'
        },
        freelance: {
          expertise: '✓ Spécialisé en sécurité web',
          rapidite: '✓ Correction urgente possible',
          documentation: '✓ Rapport détaillé des corrections'
        },
        agency: {
          expertise: '✗ Approche superficielle',
          rapidite: '✗ Délais administratifs',
          documentation: '✗ Documentation minimale'
        }
      },
      note: 'La sécurité web nécessite une expertise technique pointue et une attention aux détails. En tant que freelance spécialisé, je prends le temps d\'analyser en profondeur votre site et de corriger toutes les vulnérabilités identifiées. Vous économisez jusqu\'à 80% par rapport à une agence tout en bénéficiant d\'un niveau de sécurité professionnel et d\'une documentation complète.'
    },
    'chiffrement-grapheneos': {
      id: 'chiffrement-grapheneos',
      icon: '📱🔐',
      title: 'Chiffrement Graphène OS',
      description: 'Installation et configuration de Graphène OS pour sécuriser votre téléphone Android',
      modalTitle: 'Chiffrement Graphène OS',
      modalDescription: [
        'Graphène OS est un système d\'exploitation Android open-source axé sur la sécurité et la confidentialité. Il offre une protection renforcée contre les menaces, un meilleur contrôle des permissions, et une expérience Android sans les services Google par défaut. Je vous accompagne dans l\'installation, la configuration et l\'optimisation de Graphène OS sur votre téléphone compatible.',
        'Ce service est idéal pour les personnes soucieuses de leur vie privée numérique, les professionnels qui gèrent des données sensibles, ou toute personne souhaitant reprendre le contrôle sur ses données personnelles. Graphène OS offre un niveau de sécurité supérieur à Android standard tout en conservant une expérience utilisateur fluide.'
      ],
      modalFeatures: [
        'Vérification de la compatibilité de votre appareil',
        'Installation complète de Graphène OS',
        'Configuration de la sécurité et du chiffrement',
        'Installation des applications essentielles',
        'Formation à l\'utilisation et aux bonnes pratiques'
      ],
      prices: {
        marpeap: {
          simple: 'À partir de 450€',
          complex: '300€ - 600€'
        },
        freelance: {
          simple: 'À partir de 700€',
          complex: '450€ - 950€'
        },
        agency: {
          simple: '1 500€ - 3 000€',
          complex: '2 500€ - 5 000€'
        }
      },
      comparison: {
        marpeap: {
          expertise: '✓ Spécialisé en sécurité mobile',
          support: '✓ Support inclus 30 jours',
          sauvegarde: '✓ Sauvegarde complète avant installation',
          formation: '✓ Adaptée à votre niveau'
        },
        freelance: {
          expertise: '✓ Spécialisé en sécurité mobile',
          support: '✓ Support inclus 30 jours',
          sauvegarde: '✓ Sauvegarde complète avant installation',
          formation: '✓ Adaptée à votre niveau'
        },
        agency: {
          expertise: '✗ Approche générique',
          support: '✗ Supplémentaire',
          sauvegarde: '⚠️ Risque de perte',
          formation: '✗ Formation standardisée'
        }
      },
      note: 'L\'installation de Graphène OS nécessite une expertise technique pointue et une attention méticuleuse pour éviter toute perte de données. En tant que freelance spécialisé, je prends le temps nécessaire pour sauvegarder vos données, installer le système correctement et vous former à son utilisation. Vous économisez jusqu\'à 85% par rapport à une agence tout en bénéficiant d\'un service personnalisé et d\'un support réactif.'
    },
    'consulting-digital': {
      id: 'consulting-digital',
      icon: '💼',
      title: 'Consulting Digital',
      description: 'Conseil stratégique et accompagnement pour vos projets digitaux',
      modalTitle: 'Consulting Digital',
      modalDescription: [
        'Le consulting digital vous offre un accompagnement stratégique pour définir, planifier et optimiser vos projets digitaux. Que vous souhaitiez lancer un nouveau projet, améliorer votre présence en ligne, ou optimiser vos processus existants, je vous apporte mon expertise technique et stratégique pour prendre les meilleures décisions.',
        'Un bon consulting digital permet d\'éviter les erreurs coûteuses, d\'optimiser vos investissements, et de garantir que vos projets digitaux répondent à vos objectifs business. Je vous aide à définir une stratégie claire, à choisir les bonnes technologies, et à planifier l\'exécution de vos projets de manière efficace.'
      ],
      modalFeatures: [
        'Audit de votre situation digitale actuelle',
        'Définition de stratégie et roadmap',
        'Conseil sur le choix des technologies',
        'Planification de projets digitaux',
        'Optimisation de processus existants'
      ],
      prices: {
        marpeap: {
          simple: '150€ - 300€',
          complex: '800€ - 2 500€'
        },
        freelance: {
          simple: '230€ - 480€',
          complex: '1 200€ - 4 000€'
        },
        agency: {
          simple: '800€ - 2 000€',
          complex: '5 000€ - 20 000€+'
        }
      },
      comparison: {
        marpeap: {
          approche: '✓ 100% adapté à vos besoins',
          expertise: '✓ Vision technique complète',
          rapport: '✓ Rapport actionnable avec plan concret',
          suivi: '✓ Questions par email incluses'
        },
        freelance: {
          approche: '✓ 100% adapté à vos besoins',
          expertise: '✓ Vision technique complète',
          rapport: '✓ Rapport actionnable avec plan concret',
          suivi: '✓ Questions par email incluses'
        },
        agency: {
          approche: '✗ Solutions standardisées',
          expertise: '✗ Vision fragmentée',
          rapport: '✗ Rapport générique',
          suivi: '✗ Supplémentaire'
        }
      },
      note: 'Le consulting digital est plus efficace quand il est personnalisé à votre situation spécifique. En tant que freelance, je prends le temps de comprendre en profondeur vos besoins et votre contexte avant de proposer des recommandations concrètes et actionnables. Vous économisez jusqu\'à 80% par rapport à une agence tout en bénéficiant d\'un conseil plus pertinent et d\'un accompagnement personnalisé.'
    }
  };

  // Load services from localStorage or use default
  function loadServices() {
    const savedServices = localStorage.getItem('servicesData');
    const services = savedServices ? JSON.parse(savedServices) : servicesData;
    const servicesList = document.getElementById('servicesList');
    
    if (!servicesList) return;

    servicesList.innerHTML = Object.values(services).map(service => `
      <div class="service-admin-item" data-service-id="${service.id}">
        <div class="service-admin-header" onclick="toggleServiceEditor('${service.id}')">
          <div class="service-admin-info">
            <span class="service-admin-icon">${service.icon}</span>
            <div>
              <h3 class="service-admin-title">${escapeHtml(service.title)}</h3>
              <p class="service-admin-desc">${escapeHtml(service.description)}</p>
            </div>
          </div>
          <button class="btn btn-outline btn-sm">Modifier</button>
        </div>
        <div class="service-admin-editor" id="editor-${service.id}" style="display: none;">
          ${renderServiceEditor(service)}
        </div>
      </div>
    `).join('');

    // Attach event listeners
    attachServiceEditorListeners();
  }

  function renderServiceEditor(service) {
    return `
      <div class="service-editor-form">
        <div class="form-section">
          <h4>Informations de base</h4>
          <div class="form-row">
            <div class="form-group">
              <label>Icône (emoji)</label>
              <input type="text" class="service-icon-input" data-field="icon" value="${service.icon}" maxlength="2">
            </div>
            <div class="form-group">
              <label>Titre</label>
              <input type="text" class="service-title-input" data-field="title" value="${escapeHtml(service.title)}">
            </div>
          </div>
          <div class="form-group">
            <label>Description courte</label>
            <textarea class="service-description-input" data-field="description" rows="2">${escapeHtml(service.description)}</textarea>
          </div>
        </div>

        <div class="form-section">
          <h4>Modal - Description détaillée</h4>
          <div class="form-group">
            <label>Titre du modal</label>
            <input type="text" class="service-modal-title-input" data-field="modalTitle" value="${escapeHtml(service.modalTitle)}">
          </div>
          <div class="form-group">
            <label>Paragraphes de description (un par ligne)</label>
            <textarea class="service-modal-description-input" data-field="modalDescription" rows="4">${service.modalDescription.join('\n')}</textarea>
          </div>
          <div class="form-group">
            <label>Fonctionnalités (une par ligne)</label>
            <textarea class="service-modal-features-input" data-field="modalFeatures" rows="5">${service.modalFeatures.join('\n')}</textarea>
          </div>
        </div>

        <div class="form-section">
          <h4>Prix - Marpeap</h4>
          <div class="form-row">
            ${service.prices.marpeap.simple ? `
              <div class="form-group">
                <label>Prix simple</label>
                <input type="text" class="price-input" data-type="marpeap" data-category="simple" value="${service.prices.marpeap.simple}">
              </div>
            ` : ''}
            ${service.prices.marpeap.complex ? `
              <div class="form-group">
                <label>Prix complexe</label>
                <input type="text" class="price-input" data-type="marpeap" data-category="complex" value="${service.prices.marpeap.complex}">
              </div>
            ` : ''}
            ${service.prices.marpeap.audit ? `
              <div class="form-group">
                <label>Prix audit</label>
                <input type="text" class="price-input" data-type="marpeap" data-category="audit" value="${service.prices.marpeap.audit}">
              </div>
            ` : ''}
            ${service.prices.marpeap.mensuel ? `
              <div class="form-group">
                <label>Prix mensuel</label>
                <input type="text" class="price-input" data-type="marpeap" data-category="mensuel" value="${service.prices.marpeap.mensuel}">
              </div>
            ` : ''}
          </div>
        </div>

        <div class="form-section">
          <h4>Prix - Freelance Lambda</h4>
          <div class="form-row">
            ${service.prices.freelance.simple ? `
              <div class="form-group">
                <label>Prix simple</label>
                <input type="text" class="price-input" data-type="freelance" data-category="simple" value="${service.prices.freelance.simple}">
              </div>
            ` : ''}
            ${service.prices.freelance.complex ? `
              <div class="form-group">
                <label>Prix complexe</label>
                <input type="text" class="price-input" data-type="freelance" data-category="complex" value="${service.prices.freelance.complex}">
              </div>
            ` : ''}
            ${service.prices.freelance.audit ? `
              <div class="form-group">
                <label>Prix audit</label>
                <input type="text" class="price-input" data-type="freelance" data-category="audit" value="${service.prices.freelance.audit}">
              </div>
            ` : ''}
            ${service.prices.freelance.mensuel ? `
              <div class="form-group">
                <label>Prix mensuel</label>
                <input type="text" class="price-input" data-type="freelance" data-category="mensuel" value="${service.prices.freelance.mensuel}">
              </div>
            ` : ''}
          </div>
        </div>

        <div class="form-section">
          <h4>Prix - Agence Professionnelle</h4>
          <div class="form-row">
            ${service.prices.agency.simple ? `
              <div class="form-group">
                <label>Prix simple</label>
                <input type="text" class="price-input" data-type="agency" data-category="simple" value="${service.prices.agency.simple}">
              </div>
            ` : ''}
            ${service.prices.agency.complex ? `
              <div class="form-group">
                <label>Prix complexe</label>
                <input type="text" class="price-input" data-type="agency" data-category="complex" value="${service.prices.agency.complex}">
              </div>
            ` : ''}
            ${service.prices.agency.audit ? `
              <div class="form-group">
                <label>Prix audit</label>
                <input type="text" class="price-input" data-type="agency" data-category="audit" value="${service.prices.agency.audit}">
              </div>
            ` : ''}
            ${service.prices.agency.mensuel ? `
              <div class="form-group">
                <label>Prix mensuel</label>
                <input type="text" class="price-input" data-type="agency" data-category="mensuel" value="${service.prices.agency.mensuel}">
              </div>
            ` : ''}
          </div>
        </div>

        <div class="form-section">
          <h4>Note de comparaison</h4>
          <div class="form-group">
            <textarea class="service-note-input" data-field="note" rows="3">${escapeHtml(service.note)}</textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-primary" onclick="saveService('${service.id}')">Sauvegarder ce service</button>
          <button type="button" class="btn btn-outline" onclick="toggleServiceEditor('${service.id}')">Annuler</button>
        </div>
      </div>
    `;
  }

  function attachServiceEditorListeners() {
    // Price inputs
    document.querySelectorAll('.price-input').forEach(input => {
      input.addEventListener('input', function() {
        const serviceId = this.closest('.service-admin-item').dataset.serviceId;
        markServiceAsModified(serviceId);
      });
    });

    // Other inputs
    document.querySelectorAll('.service-icon-input, .service-title-input, .service-description-input, .service-modal-title-input, .service-modal-description-input, .service-modal-features-input, .service-note-input').forEach(input => {
      input.addEventListener('input', function() {
        const serviceId = this.closest('.service-admin-item').dataset.serviceId;
        markServiceAsModified(serviceId);
      });
    });
  }

  function markServiceAsModified(serviceId) {
    const serviceItem = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (serviceItem) {
      serviceItem.classList.add('modified');
    }
  }

  window.toggleServiceEditor = function(serviceId) {
    const editor = document.getElementById(`editor-${serviceId}`);
    if (editor) {
      editor.style.display = editor.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.saveService = function(serviceId) {
    const serviceItem = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (!serviceItem) return;

    const savedServices = JSON.parse(localStorage.getItem('servicesData') || JSON.stringify(servicesData));
    const service = savedServices[serviceId] || servicesData[serviceId];

    // Update basic info
    const iconInput = serviceItem.querySelector('.service-icon-input');
    const titleInput = serviceItem.querySelector('.service-title-input');
    const descInput = serviceItem.querySelector('.service-description-input');
    
    if (iconInput) service.icon = iconInput.value;
    if (titleInput) service.title = titleInput.value;
    if (descInput) service.description = descInput.value;

    // Update modal info
    const modalTitleInput = serviceItem.querySelector('.service-modal-title-input');
    const modalDescInput = serviceItem.querySelector('.service-modal-description-input');
    const modalFeaturesInput = serviceItem.querySelector('.service-modal-features-input');
    
    if (modalTitleInput) service.modalTitle = modalTitleInput.value;
    if (modalDescInput) service.modalDescription = modalDescInput.value.split('\n').filter(l => l.trim());
    if (modalFeaturesInput) service.modalFeatures = modalFeaturesInput.value.split('\n').filter(l => l.trim());

    // Update prices
    serviceItem.querySelectorAll('.price-input').forEach(input => {
      const type = input.dataset.type;
      const category = input.dataset.category;
      if (service.prices[type] && service.prices[type][category] !== undefined) {
        service.prices[type][category] = input.value;
      }
    });

    // Update note
    const noteInput = serviceItem.querySelector('.service-note-input');
    if (noteInput) service.note = noteInput.value;

    // Save to localStorage
    savedServices[serviceId] = service;
    localStorage.setItem('servicesData', JSON.stringify(savedServices));

    // Show success message
    showMessage('Service sauvegardé avec succès !', 'success');
    
    // Reload services list
    loadServices();
  };

  // Save all services
  const saveAllBtn = document.getElementById('saveAllServices');
  if (saveAllBtn) {
    saveAllBtn.addEventListener('click', function() {
      const savedServices = JSON.parse(localStorage.getItem('servicesData') || JSON.stringify(servicesData));
      localStorage.setItem('servicesData', JSON.stringify(savedServices));
      showMessage('Tous les services ont été sauvegardés !', 'success');
      
      // Reload to clear modified markers
      loadServices();
    });
  }

  function showMessage(message, type) {
    // Create or update message element
    let messageEl = document.getElementById('adminMessage');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.id = 'adminMessage';
      messageEl.className = 'admin-message';
      document.querySelector('.admin-content .container').insertBefore(messageEl, document.querySelector('.admin-content .container').firstChild);
    }
    messageEl.textContent = message;
    messageEl.className = `admin-message show ${type}`;
    
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 3000);
  }

  // Navigation handling
  function updateActiveNavLink() {
    const hash = window.location.hash || '#dashboard';
    document.querySelectorAll('.admin-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash || (hash === '#dashboard' && link.getAttribute('href') === 'admin.html#dashboard')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('hashchange', updateActiveNavLink);
  updateActiveNavLink();

  // Initialize
  checkAuth();
});

