/* ============================================
   MAYUR RANGE PORTFOLIO - FORM JS
   Contact form validation & submission
   ============================================ */

'use strict';

// ══════════════════════════════════════════
// FORM HANDLING
// ══════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMessage = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit');

  // Validation rules
  const validators = {
    name: {
      validate: v => v.trim().length >= 2,
      message: 'Please enter your full name (at least 2 characters).'
    },
    email: {
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Please enter a valid email address.'
    },
    phone: {
      validate: v => v.trim() === '' || /^[\d\s\+\-\(\)]{7,15}$/.test(v.trim()),
      message: 'Please enter a valid phone number.'
    },
    subject: {
      validate: v => v.trim().length >= 3,
      message: 'Please enter a subject (at least 3 characters).'
    },
    message: {
      validate: v => v.trim().length >= 20,
      message: 'Please enter a message (at least 20 characters).'
    }
  };

  // Anti-spam honeypot
  const honeypot = document.getElementById('form-honeypot');

  function validateField(field) {
    const name = field.name || field.id.replace('field-', '');
    const validator = validators[name];
    if (!validator) return true;

    const isValid = validator.validate(field.value);
    const errorEl = document.getElementById(`error-${name}`);

    field.classList.toggle('error', !isValid);
    if (errorEl) {
      errorEl.textContent = isValid ? '' : validator.message;
      errorEl.classList.toggle('visible', !isValid);
    }

    return isValid;
  }

  // Real-time validation on blur
  Object.keys(validators).forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-spam check
    if (honeypot && honeypot.value) {
      console.log('Spam detected');
      return;
    }

    // Validate all fields
    let allValid = true;
    Object.keys(validators).forEach(name => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field && !validateField(field)) {
        allValid = false;
      }
    });

    if (!allValid) {
      // Shake form on error
      form.style.animation = 'none';
      void form.offsetWidth; // Reflow
      form.style.animation = 'shake 0.4s ease';
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="31.416" stroke-dashoffset="10" stroke-linecap="round"/>
      </svg>
      Sending...
    `;

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Use Formspree endpoint (free tier)
      // You need to replace YOUR_FORM_ID with actual Formspree ID
      // Register at formspree.io with rangemayur@gmail.com
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          subject: data.subject,
          message: data.message,
          _replyto: data.email,
          _subject: `Portfolio Contact: ${data.subject}`
        })
      });

      if (response.ok) {
        // Success
        form.reset();
        form.style.display = 'none';
        successMessage.classList.add('visible');

        // Reset after 6 seconds
        setTimeout(() => {
          form.style.display = '';
          successMessage.classList.remove('visible');
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Send Message
          `;
        }, 6000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Fallback: mailto
      const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\n\nMessage:\n${data.message}`
      );
      window.location.href = `mailto:rangemayur@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
        Send Message
      `;
    }
  });
}

// Shake animation for invalid form
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .spin {
    animation: spinAnim 1s linear infinite;
  }
  @keyframes spinAnim {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(shakeStyle);

document.addEventListener('DOMContentLoaded', initContactForm);
