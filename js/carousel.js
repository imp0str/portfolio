// ./js/carousel.js
export default function makeCarouselsDraggable() {
  console.log('🛞 makeCarouselsDraggable()');
  window.isCarouselDragging = false;

  document.querySelectorAll('.carousel').forEach(carousel => {
    let down = false,
        startX,
        scrollLeft;

    carousel.classList.add('cursor-grab');

    carousel.addEventListener('pointerdown', e => {
      down = true;
      window.isCarouselDragging = false;
      startX = e.clientX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.replace('cursor-grab','cursor-grabbing');
      // don’t capture pointer yet
    });

    const stop = () => {
      down = false;
      carousel.classList.replace('cursor-grabbing','cursor-grab');
      // release pointer if we ever captured it
      try { carousel.releasePointerCapture && carousel.releasePointerCapture(); } catch{}
      window.isCarouselDragging = false;
    };
    carousel.addEventListener('pointerup',   stop);
    carousel.addEventListener('pointerleave', stop);

    carousel.addEventListener('pointermove', e => {
      if (!down) return;
      const x = e.clientX - carousel.offsetLeft;
      // only start an actual drag if moved >5px
      if (!window.isCarouselDragging && Math.abs(x - startX) > 5) {
        window.isCarouselDragging = true;
        // now capture the pointer to keep the drag smooth
        carousel.setPointerCapture(e.pointerId);
      }
      if (window.isCarouselDragging) {
        e.preventDefault();
        carousel.scrollLeft = scrollLeft - (x - startX)*1.5;
      }
    });
  });
}
