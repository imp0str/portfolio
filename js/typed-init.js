// ./js/typed-init.js
export default function initTyped() {
  if (typeof window.Typed !== 'function') {
    console.error('Typed.js not found!');
    return;
  }
  console.log('🖋️ initTyped()');
  new window.Typed('#typed', {
    strings: ['Game Developer.', 'Programmer.', 'Veteran.', 'Father.', 'Husband'],
    typeSpeed: 120, backSpeed: 150, backDelay: 1500,
    smartBackspace: true, loop: true, showCursor: true,
    preStringTyped(arrayPos, self) {
      if (arrayPos === 0 && self.loopCount > 0) {
        self.stop();
        setTimeout(() => self.start(), 500);
      }
    }
  });
}
