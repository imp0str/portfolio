// Modern imp0str Brand Portfolio JavaScript Implementation

// Projects Data Store for Gallery Modal
const projectsData = {
  1: {
    id: 1,
    title: 'PersonaPal AI Character Chatbot',
    tag: 'Web Application',
    description: 'An interactive AI-powered character chatbot that brings virtual personalities to life. Features customized character prompt personas, context memory, and responsive conversational UI.',
    images: [
      'images/PersonaPal/1.jpg',
      'images/PersonaPal/2.jpg',
      'images/PersonaPal/3.jpg',
      'images/PersonaPal/4.jpg',
    ],
    repoUrl: 'https://github.com/imp0str/PersonaPal',
    liveUrl: null, // Audited dead link removed
  },
  2: {
    id: 2,
    title: 'Pokemon Guessing Game',
    tag: 'Godot Game',
    description: 'A fun and engaging Pokemon guessing game built with Godot engine. Test your Pokemon knowledge by identifying characters from silhouettes, sprites, and hints. Features full normal and shiny Pokedex and online leaderboards.',
    images: [
      'images/PokemonGuessingGame/1.png',
      'images/PokemonGuessingGame/2.png',
      'images/PokemonGuessingGame/3.png',
      'images/PokemonGuessingGame/4.png',
    ],
    repoUrl: 'https://github.com/imp0str/PokemonGuessingGame',
    liveUrl: 'https://imp0str.itch.io/pokemon-guessing-game',
  },
  3: {
    id: 3,
    title: 'Planet Defense',
    tag: 'Godot Game',
    description: 'An action-packed space defense game where you protect your planet from incoming asteroids and alien threats. Built with Godot, featuring smooth controls, power-ups, and progressive difficulty.',
    images: [
      'images/PlanetDefense/1.png',
      'images/PlanetDefense/2.png',
      'images/PlanetDefense/3.png',
    ],
    repoUrl: 'https://github.com/imp0str/PlanetDefense',
    liveUrl: 'https://imp0str.itch.io/planet-defense',
  },
  4: {
    id: 4,
    title: 'LunaIPTV Stream Player',
    tag: 'Python Application',
    description: 'A feature-rich IPTV Xtream player built with Python. Stream live TV channels, movies, and series with an intuitive interface. Supports multiple playlist formats and includes EPG integration.',
    images: [
      'images/LunaIPTV/1.png',
      'images/LunaIPTV/2.png',
      'images/LunaIPTV/3.png',
      'images/LunaIPTV/4.png',
    ],
    repoUrl: 'https://github.com/imp0str/LunaIPTV',
    liveUrl: null,
  }
};

// Current Modal Gallery State
let currentModalProject = null;
let currentModalImageIdx = 0;

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initTypedText();
  initMobileNavigation();
  initProjectFilters();
  initProjectModal();
  initEstimatorWidget();
  initContactForm();
  initFooterYear();
});

// =============================================
// Interactive Canvas Particle Background
// =============================================
function initParticleBackground() {
  const canvas = document.querySelector('.canvas-background');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dots = [];
  const mousePos = { x: -1000, y: -1000 };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
  };

  const createDots = () => {
    dots = [];
    const spacing = 32;
    const cols = Math.floor(canvas.width / spacing);
    const rows = Math.floor(canvas.height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing + spacing / 2,
          y: j * spacing + spacing / 2,
          originX: i * spacing + spacing / 2,
          originY: j * spacing + spacing / 2,
          vx: 0,
          vy: 0,
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      mousePos.x = e.touches[0].clientX;
      mousePos.y = e.touches[0].clientY;
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!prefersReducedMotion && mousePos.x > 0) {
      // Glow under cursor
      const radialGradient = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 0,
        mousePos.x, mousePos.y, 140
      );
      radialGradient.addColorStop(0, 'rgba(188, 19, 254, 0.2)');
      radialGradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.1)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    dots.forEach(dot => {
      if (!prefersReducedMotion && mousePos.x > 0) {
        const dx = mousePos.x - dot.x;
        const dy = mousePos.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * 2.5;
          dot.vy -= Math.sin(angle) * force * 2.5;
        }

        // Return spring physics
        dot.vx += (dot.originX - dot.x) * 0.08;
        dot.vy += (dot.originY - dot.y) * 0.08;
        dot.vx *= 0.88;
        dot.vy *= 0.88;

        dot.x += dot.vx;
        dot.y += dot.vy;
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240, 246, 252, 0.25)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  render();
}

// =============================================
// Typed Text Hero Animation
// =============================================
function initTypedText() {
  const typedElem = document.getElementById('typed-text');
  if (!typedElem) return;

  const phrases = [
    'Custom Business Websites',
    'High-Performance Web Applications',
    'Modern Website Redesigns',
    'Interactive Client Tools & Software'
  ];

  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: phrases,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  } else {
    // Fallback simple Rotator if Typed.js fails to load
    let idx = 0;
    setInterval(() => {
      typedElem.textContent = phrases[idx];
      idx = (idx + 1) % phrases.length;
    }, 3000);
  }
}

// =============================================
// Mobile Drawer & Smooth Scroll Navigation
// =============================================
function initMobileNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburgerBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !hamburgerBtn.classList.contains('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  };

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

// =============================================
// Project Category Filter Tabs
// =============================================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('animate__animated', 'animate__fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// =============================================
// Project Gallery Modal
// =============================================
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalCounter = document.getElementById('modalCounter');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');
  const prevBtn = document.getElementById('modalPrev');
  const nextBtn = document.getElementById('modalNext');
  const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

  if (!modal) return;

  const openModal = (projectId) => {
    const proj = projectsData[projectId];
    if (!proj) return;

    currentModalProject = proj;
    currentModalImageIdx = 0;

    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;

    // Render Action Buttons
    modalLinks.innerHTML = '';
    if (proj.liveUrl) {
      const liveA = document.createElement('a');
      liveA.href = proj.liveUrl;
      liveA.target = '_blank';
      liveA.rel = 'noopener noreferrer';
      liveA.className = 'btn btn-primary btn-sm';
      liveA.textContent = 'Live Project';
      modalLinks.appendChild(liveA);
    }
    if (proj.repoUrl) {
      const repoA = document.createElement('a');
      repoA.href = proj.repoUrl;
      repoA.target = '_blank';
      repoA.rel = 'noopener noreferrer';
      repoA.className = 'btn btn-outline btn-sm';
      repoA.textContent = 'GitHub Repo';
      modalLinks.appendChild(repoA);
    }

    updateModalImage();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const updateModalImage = () => {
    if (!currentModalProject) return;
    const images = currentModalProject.images;
    modalImage.src = images[currentModalImageIdx];
    modalCounter.textContent = `${currentModalImageIdx + 1} / ${images.length}`;
  };

  // Event Listeners for Open Modal Buttons
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      openModal(pId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (!currentModalProject) return;
      currentModalImageIdx--;
      if (currentModalImageIdx < 0) {
        currentModalImageIdx = currentModalProject.images.length - 1;
      }
      updateModalImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!currentModalProject) return;
      currentModalImageIdx++;
      if (currentModalImageIdx >= currentModalProject.images.length) {
        currentModalImageIdx = 0;
      }
      updateModalImage();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

// =============================================
// Interactive Scope & Project Estimator Widget
// =============================================
function initEstimatorWidget() {
  const typeOptions = document.querySelectorAll('.estimator-options[data-type="project-type"] .est-option');
  const pageOptions = document.querySelectorAll('.estimator-options[data-type="page-count"] .est-option');
  const featureCheckboxes = document.querySelectorAll('.est-checkbox input[type="checkbox"]');

  const summaryType = document.getElementById('summaryType');
  const summaryPages = document.getElementById('summaryPages');
  const summaryTime = document.getElementById('summaryTime');
  const summaryFeaturesList = document.getElementById('summaryFeaturesList');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');

  if (!summaryType || !summaryPages || !summaryTime) return;

  const updateSummary = () => {
    const activeType = document.querySelector('.estimator-options[data-type="project-type"] .est-option.active');
    const activePages = document.querySelector('.estimator-options[data-type="page-count"] .est-option.active');

    if (activeType) {
      summaryType.textContent = activeType.querySelector('strong').textContent;
      summaryTime.textContent = activeType.getAttribute('data-time') || '1-2 Weeks';
    }

    if (activePages) {
      summaryPages.textContent = activePages.querySelector('strong').textContent;
    }

    // Features
    summaryFeaturesList.innerHTML = '';
    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        const li = document.createElement('li');
        li.textContent = cb.value;
        summaryFeaturesList.appendChild(li);
      }
    });
  };

  typeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      typeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      updateSummary();
    });
  });

  pageOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      pageOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      updateSummary();
    });
  });

  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const selectedType = summaryType.textContent;
      const selectedPages = summaryPages.textContent;
      const selectedTimeline = summaryTime.textContent;

      const checkedFeatures = Array.from(featureCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value)
        .join(', ');

      const serviceSelect = document.getElementById('service');
      const messageTextarea = document.getElementById('message');

      if (serviceSelect) {
        if (selectedType.includes('Redesign')) {
          serviceSelect.value = 'Website Redesign';
        } else if (selectedType.includes('Application')) {
          serviceSelect.value = 'Custom Web Application';
        } else {
          serviceSelect.value = 'New Business Website';
        }
      }

      if (messageTextarea) {
        messageTextarea.value = `[Project Scope Estimate]\n- Project Type: ${selectedType}\n- Scope: ${selectedPages}\n- Target Timeline: ${selectedTimeline}\n- Features Requested: ${checkedFeatures}\n\nAdditional Details / Business Requirements:\n`;
      }

      // Smooth scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  updateSummary();
}

// =============================================
// Contact Form Submission Logic
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const business = document.getElementById('business') ? document.getElementById('business').value : '';
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`New Project Enquiry from ${name}${business ? ' (' + business + ')' : ''}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business || 'N/A'}\nService Requested: ${service}\n\nMessage / Requirements:\n${message}`
    );

    window.location.href = `mailto:imp0str.dev@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Auto Update Footer Copyright Year
function initFooterYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}
