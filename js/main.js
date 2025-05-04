// ./js/main.js
console.log('⚡️ main.js loaded');

import initTyped from './typed-init.js';
import initNavTabs from './nav-tabs.js';
import initThemeSwitcher from './theme-switcher.js';
import makeCarouselsDraggable from './carousel.js';
import initProjectModal from './project-modal.js';
import initFormHandler from './form-switcher.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').classList.replace('hidden','block');
  initTyped();
  initNavTabs();
  initThemeSwitcher();
  makeCarouselsDraggable();
  initProjectModal();
  initFormHandler();
});
