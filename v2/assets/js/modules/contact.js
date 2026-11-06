/**
 * CONTACT & CLIPBOARD MODULE
 */
import { siteConfig } from '../config/site.js';

export function initContactActions() {
  const btnCopy = document.getElementById('btnCopyEmail');
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(siteConfig.contact.email);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = 'Copied to Clipboard!';
        btnCopy.style.backgroundColor = '#10b981';
        setTimeout(() => {
          btnCopy.textContent = originalText;
          btnCopy.style.backgroundColor = '';
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${siteConfig.contact.email}`;
      }
    });
  }

  // Back to top smooth scroll
  const btnTop = document.getElementById('btnBackToTop');
  if (btnTop) {
    btnTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
