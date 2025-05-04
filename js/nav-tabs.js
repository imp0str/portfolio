// js/nav-tabs.js
// ——————————————————————————————
// Requires Anime.js loaded globally (e.g. via CDN in your <head>)
// ——————————————————————————————

export default function initNavTabs() {
  console.log('📑 initNavTabs()');

  // MAIN NAV
  const navButtons   = Array.from(document.querySelectorAll('.tab-button.btn'));
  const mainSections = Array.from(document.querySelectorAll('.tab-content'));
  const logo         = document.getElementById('logo-btn');

  // Animate between main sections
  async function activateMain(name) {
    console.log(`→ Main tab: ${name}`);

    // 1) Slide out current
    const current = mainSections.find(sec => sec.classList.contains('block'));
    if (current) {
      await anime({
        targets:    current,
        translateX: [0, -50],
        opacity:    [1,   0],
        easing:     'easeInQuad',
        duration:   300,
      }).finished;
      current.classList.replace('block','hidden');
    }

    // 2) Reset buttons
    navButtons.forEach(b => b.classList.remove('tab-active'));

    // 3) Prep next panel off-screen right
    const next = document.getElementById(name);
    next.style.transform = 'translateX(50px)';
    next.style.opacity   = 0;
    next.classList.replace('hidden','block');

    // 4) Slide it in
    await anime({
      targets:    next,
      translateX: [50, 0],
      opacity:    [0,  1],
      easing:     'easeOutQuad',
      duration:   300,
    }).finished;

    // 5) Activate its button
    const btn = navButtons.find(b => b.dataset.tab === name);
    btn && btn.classList.add('tab-active');
  }

  // Wire up main nav clicks
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      // If this button is already active, bail out
      if (btn.classList.contains('tab-active')) {
        console.log(`↩️ Already on "${target}", skipping animation.`);
        return;
      }
      activateMain(target);
    });
  });

  // Logo click: only trigger if not already on home
  logo && logo.addEventListener('click', () => {
    const homeBtn = navButtons.find(b => b.dataset.tab === 'home');
    if (homeBtn && homeBtn.classList.contains('tab-active')) {
      console.log('↩️ Already on "home", skipping animation.');
      return;
    }
    activateMain('home');
  });

  // Kickoff initial tab
  if (navButtons.length) {
    activateMain(navButtons[0].dataset.tab);
  }

  // PROJECTS INNER TABS
  const projectTabs   = Array.from(document.querySelectorAll('.tabs.tabs-bordered > button'));
  const projectPanels = Array.from(document.querySelectorAll('.projects-tab-content'));

  projectTabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      const targetId = tab.dataset.tab;

      // If clicking the already‑active sub‑tab, do nothing
      if (tab.classList.contains('tab-active')) {
        console.log(`↩️ Already on project tab "${targetId}", skipping.`);
        return;
      }

      console.log(`→ Projects tab: ${targetId}`);

      // 1) Hide current
      const curr = projectPanels.find(p => p.classList.contains('block'));
      if (curr) {
        await anime({
          targets:    curr,
          translateX: [0, -30],
          opacity:    [1,   0],
          easing:     'easeInQuad',
          duration:   300,
        }).finished;
        curr.classList.replace('block','hidden');
      }

      // 2) Reset tab states
      projectTabs.forEach(t => t.classList.remove('tab-active'));

      // 3) Prep & show next
      const nextP = document.getElementById(targetId);
      nextP.style.transform = 'translateX(30px)';
      nextP.style.opacity   = 0;
      nextP.classList.replace('hidden','block');

      // 4) Slide it in
      await anime({
        targets:    nextP,
        translateX: [30, 0],
        opacity:    [0,  1],
        easing:     'easeOutQuad',
        duration:   300,
      }).finished;

      // 5) Activate this tab
      tab.classList.add('tab-active');
    });
  });
}
