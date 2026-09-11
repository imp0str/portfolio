// Activate child domains here only after each destination is live and verified.
// The Web fragment fallback stays safe until its site and domain are approved.
const destinations = Object.freeze({
  game: 'https://game.imp0str.dev',
  web: '#web'
});

document.querySelectorAll('[data-destination]').forEach((link) => {
  const destination = destinations[link.dataset.destination];
  if (destination) link.href = destination;
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
