// Activate child domains here only after each destination is live and verified.
// Until then, the HTML fragment fallbacks keep both gateway actions safe.
const destinations = Object.freeze({
  game: '#game',
  web: '#web'
});

document.querySelectorAll('[data-destination]').forEach((link) => {
  const destination = destinations[link.dataset.destination];
  if (destination) link.href = destination;
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
