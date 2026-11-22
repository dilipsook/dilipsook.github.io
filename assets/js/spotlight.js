/* ==========================================================================
   DYNAMIC MOUSE SPOTLIGHT BORDER & SURFACE GLOW (Linear / Aceternity Effect)
   144Hz rAF throttled cursor coordinate tracking with cached element bounds
   ========================================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Select all cards across projects, pillars, timeline, skills, stats, and gallery
    const targetCards = document.querySelectorAll(`
      .project-card,
      .pillar-card,
      .timeline-card,
      .stat-card,
      .skill-item,
      .story-card,
      .finops-calculator-wrap,
      .arch-visualizer-box
    `);

    targetCards.forEach(card => {
      card.classList.add('spotlight-card');

      let cardRect = null;
      let ticking = false;
      let clientX = 0;
      let clientY = 0;

      card.addEventListener('mouseenter', () => {
        cardRect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        clientX = e.clientX;
        clientY = e.clientY;

        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            if (cardRect) {
              const x = clientX - cardRect.left;
              const y = clientY - cardRect.top;
              card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
              card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
            }
            ticking = false;
          });
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        cardRect = null;
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      }, { passive: true });
    });

    // Invalidate rect caches on window resize
    window.addEventListener('resize', () => {
      targetCards.forEach(card => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    }, { passive: true });
  });
})();
