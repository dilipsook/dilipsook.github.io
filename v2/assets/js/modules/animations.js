/**
 * ANTIGRAVITY MOTION & ANIMATION ORCHESTRATOR (v2)
 * High-performance GPU-accelerated motion systems:
 * 1. IntersectionObserver Staggered Scroll Reveals
 * 2. Metric Number Counter Odometer (Hero & Flagship)
 * 3. Dynamic Cursor Flashlight / Card Spotlight
 * 4. 3D Interactive Card Tilt Physics
 * 5. Magnetic Button Interactions
 * 6. Infinite Client & Tech Stack Marquee
 */

export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  initScrollReveals();
  initMetricCounters();
  initCardSpotlights();
  init3DTilt();
  initMagneticButtons();
  initInfiniteMarquee();
}

/**
 * 1. INTERSECTION OBSERVER SCROLL REVEALS
 */
function initScrollReveals() {
  const targets = [
    '.sec-index-tag',
    '.sec-kicker',
    '.sec-title',
    '.sec-subtitle',
    '.philosophy-copy',
    '.tech-spec-card',
    '.arch-visualizer-box',
    '.flagship-card',
    '.flagship-sub-card',
    '.timeline-item',
    '.project-card',
    '.matrix-card',
    '.skills-nav',
    '.skill-card',
    '.story-card',
    '.finops-calculator-wrap',
    '.cert-card',
    '.honors-card',
    '.edu-card',
    '.contact-info-card',
    '.contact-form-card'
  ];

  const elements = document.querySelectorAll(targets.join(','));

  // Stagger siblings in grids
  const gridSelectors = [
    '.tech-spec-cards-wrap',
    '.flagship-cards-grid',
    '.timeline-wrap',
    '.projects-grid',
    '.matrix-grid',
    '.skills-grid',
    '.story-grid',
    '.certs-grid'
  ];

  gridSelectors.forEach(gridSel => {
    const grid = document.querySelector(gridSel);
    if (!grid) return;
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      child.classList.add('reveal-on-scroll');
      child.classList.add(`stagger-${(idx % 6) + 1}`);
    });
  });

  elements.forEach(el => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 80px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Check elements already in view or approaching view
  const checkInView = () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('is-revealed');
      }
    });
  };

  window.addEventListener('scroll', checkInView, { passive: true });
  checkInView();

  // Reveal hero elements immediately
  const heroElements = document.querySelectorAll('.hero-section .hero-grid > div, .hero-metrics-strip, .hero-giant-watermark');
  heroElements.forEach(el => {
    el.classList.add('is-revealed');
  });
}

/**
 * 2. METRIC NUMBER ODOMETER ROLL-UP
 */
function initMetricCounters() {
  const metricElements = document.querySelectorAll('.metric-num, .flagship-metric-num');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  metricElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    if (text.includes('CFR')) return; // Non-numeric badge

    let targetNum = 0;
    let prefix = '';
    let suffix = '';
    let decimals = 0;

    if (text.startsWith('$')) {
      prefix = '$';
    }

    if (text.includes('99.999%') || text.includes('.')) {
      const match = text.match(/([\d\.]+)/);
      if (match) {
        targetNum = parseFloat(match[1]);
        decimals = 3;
        suffix = text.replace(match[1], '').replace(prefix, '');
      }
    } else if (text.includes('K')) {
      const match = text.match(/(\d+)/);
      if (match) {
        targetNum = parseInt(match[1], 10);
        suffix = text.slice(text.indexOf('K'));
      }
    } else {
      const cleanNum = text.replace(/[^\d]/g, '');
      if (cleanNum) {
        targetNum = parseInt(cleanNum, 10);
        const numIndex = text.indexOf(cleanNum);
        suffix = text.slice(numIndex + cleanNum.length);
      }
    }

    if (targetNum <= 0) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = eased * targetNum;

      let displayVal = '';
      if (decimals > 0) {
        displayVal = currentVal.toFixed(decimals);
      } else if (targetNum >= 1000) {
        displayVal = Math.round(currentVal).toLocaleString();
      } else {
        displayVal = Math.round(currentVal).toString();
      }

      el.textContent = `${prefix}${displayVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = text;
        el.classList.add('metric-finished-glow');
        setTimeout(() => el.classList.remove('metric-finished-glow'), 1000);
      }
    }

    requestAnimationFrame(update);
  }
}

/**
 * 3. DYNAMIC CURSOR FLASHLIGHT / CARD SPOTLIGHT
 */
function initCardSpotlights() {
  const cardSelectors = [
    '.portrait-noir-card',
    '.flagship-card',
    '.flagship-sub-card',
    '.project-card',
    '.matrix-card',
    '.skill-card',
    '.story-card',
    '.cert-card',
    '.tech-spec-card',
    '.finops-calculator-wrap',
    '.contact-info-card',
    '.contact-form-card',
    '.arch-visualizer-box'
  ];

  const cards = document.querySelectorAll(cardSelectors.join(','));
  cards.forEach(card => {
    card.classList.add('spotlight-card');
    if (card.closest('#finops') || card.classList.contains('finops-calculator-wrap')) {
      card.classList.add('spotlight-emerald');
    } else if (card.closest('#flagships') || card.classList.contains('arch-visualizer-box') || card.closest('#certifications')) {
      card.classList.add('spotlight-cyan');
    }

    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 4. 3D INTERACTIVE CARD PERSPECTIVE TILT
 */
function init3DTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const tiltTargets = document.querySelectorAll(
    '.portrait-noir-card, .flagship-cards-grid > .flagship-card:first-child, .story-card'
  );

  tiltTargets.forEach(card => {
    card.classList.add('tilt-card');

    let rafId = null;

    card.addEventListener('pointermove', e => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = -normY * 9;
        const rotateY = normX * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
      });
    });

    card.addEventListener('pointerleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });
}

/**
 * 5. MAGNETIC BUTTON INTERACTIONS
 */
function initMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const buttons = document.querySelectorAll(
    '.btn-primary-dispatch, .btn-secondary-arch, .btn-executive-resume, .btn-skills-reel-play, .btn-traffic-spike, .btn-submit-form'
  );

  buttons.forEach(btn => {
    btn.classList.add('magnetic-btn');

    let rafId = null;

    btn.addEventListener('pointermove', e => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;

        btn.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
      });
    });

    btn.addEventListener('pointerleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * 6. INFINITE CLIENT & TECH STACK MARQUEE
 */
function initInfiniteMarquee() {
  const container = document.getElementById('clientLogosContainer');
  if (!container) return;

  const enterpriseClients = [
    'Cognizant',
    'Johnson & Johnson',
    'Dhani Financial Services',
    'LoanTap',
    'ISRO',
    'Indian Air Force',
    'Biryani By Kilo',
    'KSRSAC',
    'Navi Technologies',
    'ServicePlus'
  ];

  const techEcosystem = [
    'AWS Solutions Architecture',
    'Azure Enterprise Landing Zones',
    'HashiCorp Terraform',
    'Kubernetes (EKS / AKS)',
    'FinOps Capital Governance',
    'LabWare LIMS & ELN',
    'Oracle RAC Multi-Master',
    'GxP & 21 CFR Part 11',
    'Python & Bash Automation',
    'CloudWatch & Datadog Telemetry'
  ];

  function buildChips(list, accentColor = 'var(--accent)') {
    const triple = [...list, ...list, ...list];
    return triple.map(item => `
      <span class="client-chip">
        <span style="color: ${accentColor}; font-size: 0.65rem;">●</span>
        <span>${item}</span>
      </span>
    `).join('');
  }

  container.innerHTML = `
    <div class="marquee-wrapper">
      <div class="marquee-track">
        ${buildChips(enterpriseClients, 'var(--accent)')}
      </div>
      <div class="marquee-track track-reverse">
        ${buildChips(techEcosystem, '#00f0ff')}
      </div>
    </div>
  `;
}
