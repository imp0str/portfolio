// js/project-modal.js
export default function initProjectModal() {
  const overlay   = document.getElementById('project-modal-overlay');
  const modal     = document.getElementById('project-modal');
  const wrapper   = document.getElementById('modal-wrapper');
  const content   = document.getElementById('modal-content');
  const closeBtn  = document.getElementById('modal-close');
  const infoPane  = document.getElementById('modal-info');
  const slider    = document.getElementById('modal-slider');
  const dotsEl    = document.getElementById('modal-dots');
  const embedEl   = document.getElementById('modal-itch-embed');

  let images = [], idx = 0, intervalId;

  function renderSlide() {
    // slide the container left by idx * 100%
    const container = slider.querySelector('#modal-slide-container');
    container.style.transform = `translateX(-${idx * 100}%)`;

    // update the radio dot
    const radio = dotsEl.querySelector(
      `input[name="modal-slides"][data-index="${idx}"]`
    );
    if (radio) radio.checked = true;
  }

  function showModal({ title, desc, images: imgs, github, linkUrl, linkLabel }) {
  // 1) Title, divider, desc
  infoPane.innerHTML = `
    <h3 class="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${title}</h3>
    <div class="w-48 h-[2px] bg-primary my-2 mx-auto"></div>
    <p class="mt-6">${desc}</p>
  `;

  // 2) Build images array
  images = imgs.split(',').map(s => `./images/${s.trim()}`);
  idx = 0;

  // 3) Inject slide container with ALL images, side by side
  slider.innerHTML = `
    <div
      id="modal-slide-container"
      class="flex h-full transition-transform duration-500 ease-in-out"
      style="transform: translateX(0%)"
    >
      ${images.map(
        src => `<img src="${src}"
                   class="w-full h-full flex-shrink-0 object-cover draggable-false"/>`
      ).join('')}
    </div>
  `;

  // 4) Build radio dots
  dotsEl.innerHTML = images.map((_, i) =>
    `<input
       type="radio"
       class="radio radio-primary radio-xs"
       name="modal-slides"
       data-index="${i}"
       ${i === 0 ? 'checked' : ''}
     />`
  ).join('');
  dotsEl.querySelectorAll('input').forEach(r => {
    r.addEventListener('change', () => {
      idx = +r.dataset.index;
      renderSlide();
    });
  });

  // 5) Inject the gradient link with override support
  const url   = linkUrl || github;
  const label = linkLabel
                  || (url.includes('itch.io') ? 'Play on Itch.io'
                      : 'View on GitHub');
  embedEl.innerHTML = `
    <a href="${url}" target="_blank"
       class="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-6 inline-block">
      ${label}
    </a>
  `;

  // 6) Show overlay + modal and trigger grow
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  wrapper.classList.remove('open');
  void wrapper.offsetWidth;
  wrapper.classList.add('open');

  // 7) Start automatic rotation
  renderSlide();
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    idx = (idx + 1) % images.length;
    renderSlide();
  }, 6000);
}

  function hideModal() {
    wrapper.classList.remove('open');
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    clearInterval(intervalId);
  }

  closeBtn.addEventListener('click', hideModal);
  overlay.addEventListener('click', hideModal);

  // Wire up each carousel card
  document.querySelectorAll('.carousel-item').forEach(card => {
    const hitZone = card.querySelector('.card') || card;
    hitZone.querySelectorAll('img').forEach(img => img.draggable = false);
    hitZone.style.cursor = 'pointer';

    hitZone.addEventListener('pointerup', () => {
      if (window.isCarouselDragging) {
        window.isCarouselDragging = false;
        return;
      }
      showModal({
        title:     card.dataset.title,
        desc:      card.dataset.desc,
        images:    card.dataset.images,
        github:    card.dataset.github,
        linkUrl:   card.dataset.linkUrl,    // ← add this
        linkLabel: card.dataset.linkLabel   // ← and this
      });
    });
  });
}
