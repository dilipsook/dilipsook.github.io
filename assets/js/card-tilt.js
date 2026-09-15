/* ==========================================================================
   DILIP KUMAR PORTFOLIO — 3D CARD TILT & MOUSE SPOTLIGHT EFFECT
   High-performance Vanilla JS 3D perspective and dynamic radial glow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll(
    '.pillar-card, .project-card, .stat-card, .contact-info-card, .contact-form-card, .edu-card, .gallery-item, .float-card, .cert-card'
  );

  tiltCards.forEach(card => {
    let bounds;
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      isHovering = true;
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      card.style.setProperty('--mouse-x', ${mouseX}px);
      card.style.setProperty('--mouse-y', ${mouseY}px);

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      const rotateX = (-deltaY * 5).toFixed(2);
      const rotateY = (deltaX * 5).toFixed(2);

      card.style.transform = perspective(1000px) rotateX(deg) rotateY(deg) scale3d(1.015, 1.015, 1.015);
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }, { passive: true });
  });

  // Ambient Cursor Light Spotlight
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-ambient-spotlight';
  cursorGlow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorGlow);

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursorGlow.style.left = ${currentX}px;
    cursorGlow.style.top = ${currentY}px;
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
});
