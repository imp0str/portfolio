// Activate future destinations here only after each site is live and verified.
// Keep the HTML href fallbacks working when JavaScript is unavailable.
const destinations = Object.freeze({ game: '#game', web: '#web' });
document.querySelectorAll('[data-destination]').forEach(link => {
  const destination = destinations[link.dataset.destination];
  if (destination) link.href = destination;
});
document.getElementById('currentYear').textContent = new Date().getFullYear();
