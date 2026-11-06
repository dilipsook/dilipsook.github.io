/**
 * CONTACT ACTIONS & MESSAGE FORM MODULE
 * Handles clipboard email copy and interactive "Send a Note" contact form.
 */
import { siteConfig } from '../config/site.js';

export function initContactActions() {
  // 1. One-click Email Copy
  const copyBtns = document.querySelectorAll('.btn-copy-email, #copyEmailBtn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = siteConfig.contact.email;
      navigator.clipboard.writeText(email).then(() => {
        const origText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.borderColor = 'var(--accent)';
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.borderColor = '';
        }, 2500);
      }).catch(() => {
        window.location.href = `mailto:${siteConfig.contact.email}`;
      });
    });
  });

  // 2. Contact Message Form
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('contactName')?.value || '').trim();
      const email = (document.getElementById('contactEmail')?.value || '').trim();
      const subject = (document.getElementById('contactSubject')?.value || 'General Inquiry');
      const message = (document.getElementById('contactMessage')?.value || '').trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.style.background = 'rgba(227, 43, 60, 0.15)';
          formFeedback.style.border = '1px solid var(--accent)';
          formFeedback.style.color = '#ff6b7a';
          formFeedback.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      // Display success feedback
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
        formFeedback.style.border = '1px solid #10b981';
        formFeedback.style.color = '#34d399';
        formFeedback.innerHTML = `
          <strong>Note Dispatched!</strong><br>
          Thank you, ${name}. Your message regarding <em>${subject}</em> has been prepared. Opening your email client to complete dispatch...
        `;
      }

      // Compose mailto link to guarantee delivery
      setTimeout(() => {
        const mailtoUri = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUri;
      }, 1200);

      contactForm.reset();
    });
  }
}
