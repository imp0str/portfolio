// ./js/form-switcher.js
export default function initFormHandler() {
  console.log('📬 initFormHandler()');

  const form = document.getElementById('contact-form');
  if (!form) {
    console.error('❌ #contact-form not found');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('✉️ Submit intercepted');

    try {
      // send form
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || 'Submission failed');
      }

      // success
      showAlert('✅ Message sent! Thanks for reaching out.', 'success');
      form.reset();
      console.log('📨 Form submission successful');
    } catch (err) {
      console.error('❌ Submission error', err);
      showAlert(`❌ ${err.message}`, 'error');
    }
  });

function showAlert(message, type = 'success') {
  // remove any existing alert
  const existing = document.getElementById('form-alert');
  if (existing) existing.remove();

  const colors = {
    success: {
      border: 'border-success',
      text:   'text-success',
    },
    error: {
      border: 'border-error',
      text:   'text-error',
    }
  }[type] || { border: 'border-base-content', text: 'text-base-content' };

  // build custom outlined alert
  const alert = document.createElement('div');
  alert.id = 'form-alert';
  alert.className = [
    'fixed top-16 right-4 z-50 w-80 max-w-full',
    'p-4',
    'bg-base-100',        // light background that matches your theme
    'border',             // show border
    colors.border,        // green or red border
    colors.text,          // green or red text
    'rounded-lg',
    'shadow-lg',
    'pointer-events-auto'
  ].join(' ');
  alert.innerHTML = `<div>${message}</div>`;

  document.body.appendChild(alert);

  // auto‑dismiss
  setTimeout(() => {
    alert.classList.add('opacity-0', 'transition-opacity');
    alert.addEventListener('transitionend', () => alert.remove());
  }, 4000);
}

}
