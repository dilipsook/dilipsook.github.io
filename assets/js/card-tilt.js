/* ==========================================================================
   DILIP KUMAR PORTFOLIO - APPLE VISIONOS 3D CARD TILT & MAGNETIC INTERACTION
   Critically-damped 3D perspective transforms, holographic specular sheen,
   counter-depth orbital badges, & iPadOS magnetic button attraction
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  // ------------------------------------------------------------------------
  // 1. Multi-Layer 3D Tilt on Showcase Cards (Perspective & Specular Sheen)
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll(
    '.pillar-card, .project-card, .metric-card, .stat-card, .contact-info-card, .contact-form-card, .edu-card, .story-card, .cert-card, .timeline-card'
  );

  tiltCards.forEach(card => {
    let bounds = null;
    let isHovering = false;
    let rafId = null;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      isHovering = true;
      card.classList.add('is-hovered');
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!isHovering || !bounds) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      card.style.setProperty('--mouse-x', `${mouseX.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${mouseY.toFixed(1)}px`);

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      const rotateX = (-deltaY * 5.5).toFixed(2);
      const rotateY = (deltaX * 5.5).toFixed(2);

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale3d(1.015, 1.015, 1.015)`;
          rafId = null;
        });
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      bounds = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      card.classList.remove('is-hovered');
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    }, { passive: true });
  });

  // ------------------------------------------------------------------------
  // 2. Hero Holographic Portrait 3D Parallax with Counter-Depth Badges
  // ------------------------------------------------------------------------
  const heroWrap = document.querySelector('.hero-portrait-wrapper') || document.querySelector('.holo-portrait-frame');
  const heroFrame = document.querySelector('.holo-portrait-frame') || heroWrap;
  const chipLeft = document.querySelector('.hero-floating-chip.chip-left');
  const chipRight = document.querySelector('.hero-floating-chip.chip-bottom-right');

  if (heroWrap) {
    let heroBounds = null;
    let heroHover = false;
    let heroRaf = null;

    heroWrap.addEventListener('mouseenter', () => {
      heroBounds = heroWrap.getBoundingClientRect();
      heroHover = true;
      if (heroFrame) heroFrame.style.transition = 'transform 0.15s ease-out';
      if (chipLeft) chipLeft.style.transition = 'transform 0.15s ease-out';
      if (chipRight) chipRight.style.transition = 'transform 0.15s ease-out';
    }, { passive: true });

    heroWrap.addEventListener('mousemove', (e) => {
      if (!heroHover || !heroBounds) return;

      const hX = (e.clientX - (heroBounds.left + heroBounds.width / 2)) / (heroBounds.width / 2);
      const hY = (e.clientY - (heroBounds.top + heroBounds.height / 2)) / (heroBounds.height / 2);

      const rotX = (-hY * 8.5).toFixed(2);
      const rotY = (hX * 8.5).toFixed(2);

      if (!heroRaf) {
        heroRaf = requestAnimationFrame(() => {
          if (heroFrame) {
            heroFrame.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(14px) scale3d(1.02, 1.02, 1.02)`;
          }

          // Counter-depth parallax: badges float in separate 3D planes
          if (chipLeft) {
            const lx = (-hX * 12).toFixed(1);
            const ly = (-hY * 12).toFixed(1);
            chipLeft.style.transform = `translate3d(${lx}px, ${ly}px, 40px) scale(1.05)`;
          }

          if (chipRight) {
            const rx = (-hX * 16).toFixed(1);
            const ry = (-hY * 16).toFixed(1);
            chipRight.style.transform = `translate3d(${rx}px, ${ry}px, 50px) scale(1.05)`;
          }
          heroRaf = null;
        });
      }
    }, { passive: true });

    heroWrap.addEventListener('mouseleave', () => {
      heroHover = false;
      heroBounds = null;
      if (heroRaf) {
        cancelAnimationFrame(heroRaf);
        heroRaf = null;
      }

      const resetEase = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      if (heroFrame) {
        heroFrame.style.transition = resetEase;
        heroFrame.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      }
      if (chipLeft) {
        chipLeft.style.transition = resetEase;
        chipLeft.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
      if (chipRight) {
        chipRight.style.transition = resetEase;
        chipRight.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 3. iPadOS-Style Magnetic Attraction on Primary Buttons & Controls
  // ------------------------------------------------------------------------
  const magneticTargets = document.querySelectorAll(
    '.btn-primary, .btn-glass, .brand-monogram, .theme-toggle, #btnPlaySkillsReel, .scroll-top-btn, .side-scroll-hud'
  );

  magneticTargets.forEach(el => {
    let rect = null;

    el.addEventListener('mouseenter', () => {
      rect = el.getBoundingClientRect();
      el.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)';
    }, { passive: true });

    el.addEventListener('mousemove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (e.clientX - centerX) * 0.22;
      const pullY = (e.clientY - centerY) * 0.22;

      el.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      rect = null;
      el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'translate3d(0, 0, 0)';
    }, { passive: true });
  });

  // Invalidate cached rects on resize
  window.addEventListener('resize', () => {
    magneticTargets.forEach(el => el.style.transform = 'translate3d(0, 0, 0)');
  }, { passive: true });
});
