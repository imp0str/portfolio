// Keep live ecosystem destinations centralized here.
const destinations = Object.freeze({
  game: 'https://game.imp0str.dev',
  web: 'https://web.imp0str.dev'
});

document.querySelectorAll('[data-destination]').forEach((link) => {
  const destination = destinations[link.dataset.destination];
  if (destination) link.href = destination;
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
