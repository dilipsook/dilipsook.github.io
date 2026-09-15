/* ==========================================================================
   DILIP KUMAR PORTFOLIO — ANIMATED METRIC COUNTERS
   ========================================================================== */

(function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAll();
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  } else {
    animateAll();
  }

  function animateAll() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target')) || 0;
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(ease * target);

        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }
})();
