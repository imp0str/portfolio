// Portfolio JavaScript - Vanilla JS conversion from React

// Projects Data
const projectsData = [
  {
    id: 1,
    title: 'PersonaPal',
    tech: 'AI Character Chatbot',
    description: 'An AI-powered character chatbot that brings virtual personalities to life. Engage in natural conversations with your favourite characters, each with their own traits and communication styles.',
    images: [
      'images/PersonaPal/1.jpg',
      'images/PersonaPal/2.jpg',
      'images/PersonaPal/3.jpg',
      'images/PersonaPal/4.jpg',
    ],
    liveUrl: 'https://personapal.pythonanywhere.com/',
    repoUrl: 'https://github.com/imp0str/PersonaPal',
  },
  {
    id: 2,
    title: 'Pokemon Guessing Game',
    tech: 'Godot Game',
    description: 'A fun and engaging Pokemon guessing game built with Godot engine. Test your Pokemon knowledge by identifying characters from silhouettes, sprites, and hints. Features full normal and shiny pokedex and online leaderboards.',
    images: [
      'images/PokemonGuessingGame/1.png',
      'images/PokemonGuessingGame/2.png',
      'images/PokemonGuessingGame/3.png',
      'images/PokemonGuessingGame/4.png',
    ],
    liveUrl: 'https://imp0str.itch.io/pokemon-guessing-game',
    repoUrl: 'https://github.com/imp0str/PokemonGuessingGame',
  },
  {
    id: 3,
    title: 'Planet Defense',
    tech: 'Godot Game',
    description: 'An action-packed space defense game where you protect your planet from incoming asteroids and alien threats. Built with Godot, featuring smooth controls, power-ups, and progressive difficulty.',
    images: [
      'images/PlanetDefense/1.png',
      'images/PlanetDefense/2.png',
      'images/PlanetDefense/3.png',
    ],
    liveUrl: 'https://imp0str.itch.io/planet-defense',
    repoUrl: 'https://github.com/imp0str/PlanetDefense',
  },
  {
    id: 4,
    title: 'LunaIPTV',
    tech: 'Python IPTV Player',
    description: 'A feature-rich IPTV Xstream player built with Python. Stream live TV channels, movies, and series with an intuitive interface. Supports multiple playlist formats and includes EPG integration.',
    images: [
      'images/LunaIPTV/1.png',
      'images/LunaIPTV/2.png',
      'images/LunaIPTV/3.png',
      'images/LunaIPTV/4.png',
    ],
    liveUrl: null,
    repoUrl: 'https://github.com/imp0str/LunaIPTV',
  },
];

// State
let currentSection = 'home';
let currentProjectIndex = 0;
let currentImageIndex = 0;
let isMenuOpen = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initDottedBackground();
  initTypedEffect();
  initNavigation();
  initProjects();
  initContactForm();
});

// =============================================
// Dotted Background Canvas
// =============================================
function initDottedBackground() {
  const canvas = document.querySelector('.canvas-background');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const mousePos = { x: 0, y: 0 };
  let animationFrameId = null;
  let dots = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
  };

  // Initialize dots
  const initDots = () => {
    dots = [];
    const spacing = 25;
    const cols = Math.floor(canvas.width / spacing);
    const rows = Math.floor(canvas.height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing + spacing / 2,
          y: j * spacing + spacing / 2,
          originalX: i * spacing + spacing / 2,
          originalY: j * spacing + spacing / 2,
          vx: 0,
          vy: 0,
        });
      }
    }
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  };

  // Touch move handler
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      mousePos.x = e.touches[0].clientX;
      mousePos.y = e.touches[0].clientY;
    }
  };

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw orb gradient (behind dots)
    if (!prefersReducedMotion) {
      const gradient = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        mousePos.x,
        mousePos.y,
        100
      );
      gradient.addColorStop(0, 'rgba(188, 19, 254, 0.25)');
      gradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    }

    // Draw and update dots
    dots.forEach(dot => {
      if (!prefersReducedMotion) {
        // Calculate distance from mouse
        const dx = mousePos.x - dot.x;
        const dy = mousePos.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;

        if (distance < maxDistance) {
          // Push dots away from cursor
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * 3;
          dot.vy -= Math.sin(angle) * force * 3;
        }

        // Apply spring force to return to original position
        const springForce = 0.1;
        dot.vx += (dot.originalX - dot.x) * springForce;
        dot.vy += (dot.originalY - dot.y) * springForce;

        // Apply damping
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230, 247, 255, 0.3)';
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  // Initialize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('touchstart', handleTouchMove, { passive: true });
  animate();
}

// =============================================
// Typed.js Effect for Home Section
// =============================================
function initTypedEffect() {
  const typedElement = document.getElementById('typed-text');
  
  if (!typedElement) {
    console.error('Typed element not found');
    return;
  }
  
  if (typeof Typed === 'undefined') {
    console.error('Typed.js not loaded');
    return;
  }
  
  try {
    new Typed('#typed-text', {
      strings: ['Father', 'Husband', 'Game Developer', 'Web Designer'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    console.log('Typed.js initialized successfully');
  } catch (error) {
    console.error('Error initializing Typed.js:', error);
  }
}

// =============================================
// Navigation
// =============================================
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('main-menu');
  const menuItems = document.querySelectorAll('.menu-item');

  // Toggle menu
  hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('open');
    menu.style.display = isMenuOpen ? 'block' : 'none';
    hamburger.setAttribute('aria-expanded', isMenuOpen);
  });

  // Menu item clicks
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetSection = item.getAttribute('data-section');
      changeSection(targetSection);
      
      // Update active menu item
      menuItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');
      
      // Close menu
      isMenuOpen = false;
      hamburger.classList.remove('open');
      menu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
      hamburger.classList.remove('open');
      menu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Arrow key navigation in menu
  document.addEventListener('keydown', (e) => {
    if (!isMenuOpen) return;

    const menuItemsArray = Array.from(menuItems);
    const currentIndex = menuItemsArray.findIndex(item => item === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % menuItemsArray.length;
      menuItemsArray[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex <= 0 ? menuItemsArray.length - 1 : currentIndex - 1;
      menuItemsArray[prevIndex].focus();
    }
  });

  // Click outside to close menu
  document.addEventListener('mousedown', (e) => {
    if (isMenuOpen && 
        !menu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      isMenuOpen = false;
      hamburger.classList.remove('open');
      menu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// =============================================
// Section Changes with Animation
// =============================================
function changeSection(newSection) {
  if (newSection === currentSection) return;

  const sections = document.querySelectorAll('.section');
  const currentSectionEl = document.querySelector(`.section[data-section="${currentSection}"]`);
  const newSectionEl = document.querySelector(`.section[data-section="${newSection}"]`);

  if (!currentSectionEl || !newSectionEl) return;

  // Animate out current section
  currentSectionEl.classList.add('animate__animated', 'animate__fadeOutLeft');
  currentSectionEl.style.animationDuration = '0.35s';
  currentSectionEl.style.zIndex = '9';

  // After animation, hide current and show new
  currentSectionEl.addEventListener('animationend', function handler() {
    currentSectionEl.style.display = 'none';
    currentSectionEl.classList.remove('animate__animated', 'animate__fadeOutLeft');
    currentSectionEl.removeEventListener('animationend', handler);
  });

  // Show and animate in new section
  newSectionEl.style.display = 'flex';
  newSectionEl.style.zIndex = '10';
  newSectionEl.classList.add('animate__animated', 'animate__fadeInRight');
  newSectionEl.style.animationDuration = '0.35s';

  newSectionEl.addEventListener('animationend', function handler() {
    newSectionEl.classList.remove('animate__animated', 'animate__fadeInRight');
    newSectionEl.removeEventListener('animationend', handler);
  });

  currentSection = newSection;
}

// =============================================
// Projects Section
// =============================================
function initProjects() {
  const projectBadges = document.querySelectorAll('.project-badge');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  const carouselDiv = document.querySelector('.project-carousel');

  // Project badge clicks
  projectBadges.forEach((badge, index) => {
    badge.addEventListener('click', () => {
      currentProjectIndex = index;
      currentImageIndex = 0;
      updateProjectDisplay();
      
      // Update active badge
      projectBadges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
    });
  });

  // Carousel navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = projectsData[currentProjectIndex].images.length - 1;
      }
      updateProjectDisplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentImageIndex++;
      if (currentImageIndex >= projectsData[currentProjectIndex].images.length) {
        currentImageIndex = 0;
      }
      updateProjectDisplay();
    });
  }

  // Keyboard navigation for carousel
  if (carouselDiv) {
    carouselDiv.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    });
  }

  // Initial display
  updateProjectDisplay();
}

function updateProjectDisplay() {
  const project = projectsData[currentProjectIndex];
  
  // Update project name
  const projectName = document.getElementById('projectName');
  if (projectName) {
    projectName.textContent = project.title;
  }

  // Update image
  const carouselImage = document.querySelector('.carousel-image');
  if (carouselImage) {
    carouselImage.src = project.images[currentImageIndex];
    carouselImage.alt = `${project.title} screenshot ${currentImageIndex + 1}`;
  }

  // Update description
  const description = document.getElementById('projectDescription');
  if (description) {
    description.textContent = project.description;
  }

  // Update links
  const liveDemo = document.getElementById('liveDemo');
  const repoLink = document.getElementById('repoLink');
  
  if (liveDemo) {
    if (project.liveUrl) {
      liveDemo.href = project.liveUrl;
      liveDemo.style.display = 'inline-flex';
    } else {
      liveDemo.style.display = 'none';
    }
  }
  
  if (repoLink) repoLink.href = project.repoUrl;
}

// =============================================
// Contact Form
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Mailto fallback
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
      );
      
      window.location.href = `mailto:imp0str.dev@gmail.com?subject=${subject}&body=${body}`;
    });
  }
}
