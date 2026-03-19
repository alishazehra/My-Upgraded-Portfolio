const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = '⚠️ Please fill in all required fields.';
    formStatus.className = 'form-status error';
    return;
  }

  // Disable button while "sending"
  const btn = form.querySelector('.submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const originalText = btnText.textContent;
  btn.disabled = true;
  btnText.textContent = 'Sending...';

  // Send data to Formspree (replace URL with your endpoint)
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => {
      if (response.ok) {
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        form.reset();
      } else {
        formStatus.textContent = '❌ Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
      }
    })
    .catch(() => {
      formStatus.textContent = '❌ Network error. Please try again later.';
      formStatus.className = 'form-status error';
    })
    .finally(() => {
      btn.disabled = false;
      btnText.textContent = originalText;

      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    });
});
