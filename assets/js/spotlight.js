/* ==========================================================================
   DYNAMIC MOUSE SPOTLIGHT BORDER & SURFACE GLOW (Linear / Aceternity Effect)
   Tracks cursor coordinates across interactive cards for realistic light reflection
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

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  });
})();
