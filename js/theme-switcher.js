// ./js/theme-switcher.js
export default function initThemeSwitcher() {
  console.log('🌗 initThemeSwitcher() start');

  const themes = [
    'light','dark','cupcake','bumblebee','emerald','corporate',
    'synthwave','retro','cyberpunk','valentine','halloween','garden',
    'forest','aqua','lofi','pastel','fantasy','wireframe','black',
    'luxury','dracula','cmyk','autumn','business','acid','lemonade',
    'night','coffee','winter','dim','nord','sunset'
  ];
  console.log('→ theme array length:', themes.length);

  const selectEl = document.getElementById('themeSwitcher');
  console.log('→ selectEl:', selectEl);

  if (!selectEl) {
    console.error('❌ Cannot find <select id="themeSwitcher">');
    return;
  }

  // Populate options in one go
  selectEl.innerHTML = themes
    .map(t => `<option value="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</option>`)
    .join('');
  console.log('→ options populated, count:', selectEl.options.length);

  // Pre-select current theme
  const current = document.documentElement.getAttribute('data-theme');
  if (current) {
    selectEl.value = current;
    console.log('→ initial select value set to:', current);
  }

  // Wire up change handler
  selectEl.addEventListener('change', e => {
    const newTheme = e.target.value;
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log('→ theme changed to:', newTheme);
  });

  console.log('🌗 initThemeSwitcher() done');
}
