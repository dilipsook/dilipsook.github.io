/* ==========================================================================
   DILIP KUMAR PORTFOLIO — 3D CARD TILT & MULTI-LAYER DEPTH PARALLAX
   High-performance 3D perspective, child-element Z-depth, and mouse spotlight
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  // 1. Multi-Layer 3D Tilt on Cards
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

      card.style.setProperty('--mouse-x', mouseX + 'px');
      card.style.setProperty('--mouse-y', mouseY + 'px');

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      const rotateX = (-deltaY * 7).toFixed(2);
      const rotateY = (deltaX * 7).toFixed(2);

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }, { passive: true });
  });

  // 2. Hero Portrait 3D Parallax Tilt with Counter-Depth Badges
  const heroWrap = document.querySelector('.portrait-container');
  const heroBadges = document.querySelectorAll('.float-card');

  if (heroWrap) {
    let heroBounds;
    let heroHover = false;

    heroWrap.addEventListener('mouseenter', () => {
      heroBounds = heroWrap.getBoundingClientRect();
      heroHover = true;
      heroWrap.style.transition = 'transform 0.2s ease-out';
    }, { passive: true });

    heroWrap.addEventListener('mousemove', (e) => {
      if (!heroHover) return;
      heroBounds = heroWrap.getBoundingClientRect();
      const hX = (e.clientX - (heroBounds.left + heroBounds.width / 2)) / (heroBounds.width / 2);
      const hY = (e.clientY - (heroBounds.top + heroBounds.height / 2)) / (heroBounds.height / 2);

      const rotX = (-hY * 8).toFixed(2);
      const rotY = (hX * 8).toFixed(2);

      heroWrap.style.transform = 'perspective(1200px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';

      heroBadges.forEach((badge, idx) => {
        const factor = (idx + 1) * 6;
        badge.style.transform = 'translate3d(' + (-hX * factor) + 'px, ' + (-hY * factor) + 'px, 45px)';
      });
    }, { passive: true });

    heroWrap.addEventListener('mouseleave', () => {
      heroHover = false;
      heroWrap.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      heroWrap.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      heroBadges.forEach(badge => {
        badge.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        badge.style.transform = 'translate3d(0, 0, 30px)';
      });
    }, { passive: true });
  }

  // 3. Interactive 3D Holographic Cloud Cube Controller
  const cube3D = document.getElementById('cloudCube3D');
  if (cube3D) {
    const cubeWrap = cube3D.parentElement;
    cubeWrap.addEventListener('mousemove', (e) => {
      const rect = cubeWrap.getBoundingClientRect();
      const cX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const cY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      cube3D.style.animationPlayState = 'paused';
      cube3D.style.transform = 'rotateX(' + (-cY * 40) + 'deg) rotateY(' + (cX * 50) + 'deg)';
    });

    cubeWrap.addEventListener('mouseleave', () => {
      cube3D.style.animationPlayState = 'running';
      cube3D.style.transform = '';
    });
  }

  // 4. Ambient Cursor Light Spotlight
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
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
});
