/* ==========================================================================
   DYNAMIC MOUSE & TOUCH SPOTLIGHT BORDER & SURFACE GLOW (Linear / Aceternity Effect)
   144Hz rAF throttled coordinate tracking with cached element bounds
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

      function updateSpotlight(x, y) {
        clientX = x;
        clientY = y;

        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            if (cardRect) {
              const relX = clientX - cardRect.left;
              const relY = clientY - cardRect.top;
              card.style.setProperty('--mouse-x', `${relX.toFixed(1)}px`);
              card.style.setProperty('--mouse-y', `${relY.toFixed(1)}px`);
            }
            ticking = false;
          });
        }
      }

      function clearSpotlight() {
        cardRect = null;
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      }

      // Mouse events
      card.addEventListener('mouseenter', () => {
        cardRect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        updateSpotlight(e.clientX, e.clientY);
      }, { passive: true });

      card.addEventListener('mouseleave', clearSpotlight, { passive: true });

      // Mobile Touch events
      card.addEventListener('touchstart', (e) => {
        cardRect = card.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
          updateSpotlight(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      card.addEventListener('touchmove', (e) => {
        if (!cardRect) cardRect = card.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
          updateSpotlight(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      card.addEventListener('touchend', clearSpotlight, { passive: true });
      card.addEventListener('touchcancel', clearSpotlight, { passive: true });
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
