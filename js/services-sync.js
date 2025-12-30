// Services Synchronization Script
// This script loads services data from localStorage and updates the DOM

(function() {
  'use strict';

  function loadServicesData() {
    const savedServices = localStorage.getItem('servicesData');
    if (!savedServices) return null;
    
    try {
      return JSON.parse(savedServices);
    } catch (e) {
      console.error('Error parsing services data:', e);
      return null;
    }
  }

  function updateServiceCards() {
    const servicesData = loadServicesData();
    if (!servicesData) return;

    // Update service cards
    Object.values(servicesData).forEach(service => {
      const card = document.querySelector(`[data-service="${service.id}"]`);
      if (!card) return;

      // Update icon
      const iconEl = card.querySelector('.service-icon');
      if (iconEl && service.icon) {
        iconEl.textContent = service.icon;
      }

      // Update title
      const titleEl = card.querySelector('.service-title');
      if (titleEl && service.title) {
        titleEl.textContent = service.title;
      }

      // Update description
      const descEl = card.querySelector('.service-description');
      if (descEl && service.description) {
        descEl.textContent = service.description;
      }
    });
  }

  function updateServiceModals() {
    const servicesData = loadServicesData();
    if (!servicesData) return;

    Object.values(servicesData).forEach(service => {
      const modal = document.getElementById(`modal-${service.id}`);
      if (!modal) return;

      // Update modal header
      const modalIcon = modal.querySelector('.service-modal-icon');
      const modalTitle = modal.querySelector('.service-modal-title');
      if (modalIcon && service.icon) modalIcon.textContent = service.icon;
      if (modalTitle && service.modalTitle) modalTitle.textContent = service.modalTitle;

      // Update description section
      const descSection = modal.querySelector('.service-description-section');
      if (descSection && service.modalDescription) {
        const paragraphs = descSection.querySelectorAll('p');
        service.modalDescription.forEach((text, index) => {
          if (paragraphs[index]) {
            paragraphs[index].textContent = text;
          }
        });

        // Update features list
        const featuresList = descSection.querySelector('ul');
        if (featuresList && service.modalFeatures) {
          featuresList.innerHTML = service.modalFeatures.map(feature => 
            `<li>${escapeHtml(feature)}</li>`
          ).join('');
        }
      }

      // Update comparison table prices
      updateComparisonTable(modal, service);

      // Update note
      const noteSection = modal.querySelector('.comparison-note');
      if (noteSection && service.note) {
        const noteText = noteSection.querySelector('p:last-child');
        if (noteText) {
          noteText.textContent = service.note;
        }
      }
    });
  }

  function updateComparisonTable(modal, service) {
    const table = modal.querySelector('.comparison-table');
    if (!table || !service.prices) return;

    // Update prices in table rows
    const rows = table.querySelectorAll('.comparison-row:not(.comparison-header)');
    
    rows.forEach(row => {
      const firstCell = row.querySelector('.comparison-cell:first-child');
      if (!firstCell) return;

      const cellText = firstCell.textContent.trim().toLowerCase();
      
      // Find matching price category
      let category = null;
      if (cellText.includes('simple') || cellText.includes('vitrine') || cellText.includes('audit')) {
        category = service.prices.marpeap.simple ? 'simple' : 
                   service.prices.marpeap.audit ? 'audit' : null;
      } else if (cellText.includes('complexe') || cellText.includes('avancée') || cellText.includes('mensuel')) {
        category = service.prices.marpeap.complex ? 'complex' : 
                   service.prices.marpeap.mensuel ? 'mensuel' : null;
      }

      if (!category) return;

      // Update Marpeap price
      const marpeapCell = row.querySelector('.comparison-marpeap');
      if (marpeapCell && service.prices.marpeap[category]) {
        marpeapCell.textContent = service.prices.marpeap[category];
      }

      // Update Freelance price
      const freelanceCell = row.querySelector('.comparison-freelance');
      if (freelanceCell && service.prices.freelance[category]) {
        freelanceCell.textContent = service.prices.freelance[category];
      }

      // Update Agency price
      const agencyCell = row.querySelector('.comparison-agency');
      if (agencyCell && service.prices.agency[category]) {
        agencyCell.textContent = service.prices.agency[category];
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateServiceCards();
      updateServiceModals();
    });
  } else {
    updateServiceCards();
    updateServiceModals();
  }

  // Watch for localStorage changes (for real-time updates)
  window.addEventListener('storage', function(e) {
    if (e.key === 'servicesData') {
      updateServiceCards();
      updateServiceModals();
    }
  });

})();



