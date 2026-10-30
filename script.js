/**
 * FLOR DE LIZ TURISMO — INTERACTIVE ENGINE
 * Handlers: WhatsApp pre-filled generator, persona tabs, lightbox, mobile nav
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '5598984512420';

  // --- 1. WhatsApp Pre-filled Generator para o Booking Dock ---
  const bookingForm = document.getElementById('bookingDockForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const experience = document.getElementById('dockExperience').value;
      const guests = document.getElementById('dockGuests').value;
      const period = document.getElementById('dockPeriod').value;

      let msg = `Olá! Gostaria de planejar minha viagem para os Lençóis Maranhenses com a Flor de Liz Turismo.\n\n`;
      msg += `📍 *Experiência de Interesse:* ${experience}\n`;
      msg += `👥 *Viajantes:* ${guests}\n`;
      msg += `📅 *Período Desejado:* ${period || 'A definir'}\n\n`;
      msg += `Poderiam me enviar valores, disponibilidade e opções de roteiro personalizado?`;

      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`, '_blank');
    });
  }

  // --- 2. Persona Tabs Switcher (Famílias, Casais, Aventura) ---
  const tabButtons = document.querySelectorAll('.persona-tab-btn');
  const tabPanels = document.querySelectorAll('.persona-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // --- 3. Lightbox para Galeria Imersiva ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('[data-lightbox-src]');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      if (src && lightboxModal && lightboxImg) {
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // --- 4. Mobile Menu Drawer Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // --- 5. Rolar Suavemente para o Topo ou Seções com Offset de Navbar ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 6. Botões de Ação de Pacote com Mensagens Dinâmicas ---
  const tourButtons = document.querySelectorAll('.btn-tour-cta');
  tourButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourName = btn.getAttribute('data-tour-name') || 'Passeio Off-Road';
      let msg = `Olá! Tenho muito interesse no roteiro *${tourName}* com a Flor de Liz Turismo. Poderiam me passar os detalhes, valores e datas disponíveis?`;
      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`, '_blank');
    });
  });
});

