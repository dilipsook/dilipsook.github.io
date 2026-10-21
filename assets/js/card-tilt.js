/* ==========================================================================
   DILIP KUMAR PORTFOLIO - 3D CARD TILT & MULTI-LAYER SCROLL DEPTH PARALLAX
   High-performance 3D perspective, dynamic scroll physics & mouse spotlight
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  // 1. Multi-Layer 3D Tilt on Cards (Hover)
  const tiltCards = document.querySelectorAll(
    '.pillar-card, .project-card, .metric-card, .stat-card, .contact-info-card, .contact-form-card, .edu-card, .story-card, .cert-card, .timeline-card'
  );

  if (isFinePointer) {
    tiltCards.forEach(card => {
      let bounds;
      let isHovering = false;

      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        isHovering = true;
        card.classList.add('is-hovered');
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

        const rotateX = (-deltaY * 6).toFixed(2);
        const rotateY = (deltaX * 6).toFixed(2);

        card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.classList.remove('is-hovered');
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      }, { passive: true });
    });
  }

  // 2. Hero Holographic Pod & Portrait 3D Parallax Tilt with Counter-Depth Badges
  const heroWrap = document.querySelector('.holo-pod-deck') || document.querySelector('.executive-portrait-container');
  const heroFrame = document.querySelector('.holo-portrait-frame') || document.querySelector('.executive-portrait-frame');
  const heroBadges = document.querySelectorAll('.hero-floating-chip');

  if (heroWrap && isFinePointer) {
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

      if (heroFrame) {
        heroFrame.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(15px)`;
      }

      heroBadges.forEach((badge, idx) => {
        const factor = (idx + 1) * 7;
        badge.style.transform = `translate3d(${-hX * factor}px, ${-hY * factor}px, 45px)`;
      });
    }, { passive: true });

    heroWrap.addEventListener('mouseleave', () => {
      heroHover = false;
      heroWrap.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      if (heroFrame) {
        heroFrame.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
      heroBadges.forEach(badge => {
        badge.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        badge.style.transform = 'translate3d(0, 0, 30px)';
      });
    }, { passive: true });
  }

  // 3. Dynamic 3D Scroll Physics Engine (Scroll-Driven Perspective Transforms)
  let scrollTicking = false;
  const perspectiveCards = document.querySelectorAll('.pillar-card, .project-card, .metric-card, .story-card, .cert-card');

  function onScroll3DPhysics() {
    const viewHeight = window.innerHeight;
    const viewCenter = viewHeight / 2;

    perspectiveCards.forEach(card => {
      if (card.classList.contains('is-hovered')) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewHeight) return; // Off-screen

      const cardCenter = rect.top + rect.height / 2;
      const offset = (cardCenter - viewCenter) / (viewHeight * 0.6);
      const clamped = Math.max(-1, Math.min(1, offset));

      const rotX = (-clamped * 4).toFixed(2);
      const transZ = ((1 - Math.abs(clamped)) * 12).toFixed(1);

      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) translateZ(${transZ}px)`;
    });

    // Orbital Badges Parallax on Scroll
    const scrollY = window.scrollY;
    heroBadges.forEach((badge, idx) => {
      const speed = (idx + 1) * 0.05;
      badge.style.transform = `translate3d(0px, ${-scrollY * speed}px, 30px)`;
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScroll3DPhysics);
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial call
  onScroll3DPhysics();

  // 4. Ambient Cursor Light Spotlight
  if (isFinePointer) {
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
  }
});
