/**
 * MAIN CLIENT APPLICATION ENTRY POINT
 * Noir & Crimson Portfolio System (Exact Video Match)
 */

import { siteConfig } from './config/site.js';
import { clientLogos } from './data/experience.js';
import { renderDeployments } from './modules/deployments.js';
import { renderSystemsMatrix } from './modules/matrix.js';
import { initFinOpsCalculator } from './modules/finops.js';
import { initContactActions } from './modules/contact.js';
import { initSwarm, toggleSwarm } from './modules/swarm.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Hero Content from siteConfig
  populateHero();

  // 2. Populate Philosophy, Technical Specs & Certifications
  populatePhilosophy();

  // 3. Render Flagship Deployments (1 Primary Hero Card + 3-Column Grid)
  renderDeployments('flagshipContainer');

  // 4. Render Systems Matrix & Modal (with arrow icons)
  renderSystemsMatrix('matrixFilterBar', 'matrixGridContainer', 'matrixModalBackdrop');

  // 5. Initialize FinOps Calculator
  initFinOpsCalculator(
    'finopsSpendSlider',
    'finopsSpendDisplay',
    'finopsAnnualOutput',
    'finopsMonthlyOutput',
    'breakdownRightsizing',
    'breakdownSP',
    'breakdownWaste'
  );

  // 6. Initialize Contact Actions
  initContactActions();

  // 7. Initialize Swarm Motion Engine
  initSwarm();
  const motionBtn = document.getElementById('btnNavMotion');
  if (motionBtn) {
    motionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSwarm();
    });
  }

  // 8. Navigation Active State & Mobile Menu
  setupNavigation();
});

function populateHero() {
  const cfg = siteConfig.identity;

  // Name Pill
  const nameEl = document.getElementById('heroNamePill');
  if (nameEl) nameEl.textContent = cfg.displayName;

  // Kicker Pill
  const kickerEl = document.getElementById('heroKickerText');
  if (kickerEl) kickerEl.textContent = `${cfg.profession} • ${cfg.practice}`;

  // Headline
  const headEl = document.getElementById('heroHeadlineText');
  if (headEl) {
    headEl.innerHTML = `${cfg.headline.split('.')[0]}. <span>${cfg.headline.split('.')[1] || ''}</span>`;
  }

  // Intro
  const introEl = document.getElementById('heroIntroText');
  if (introEl) introEl.innerHTML = cfg.intro;

  // Portrait Image
  const portraitImg = document.getElementById('heroPortraitImg');
  if (portraitImg && cfg.portrait) {
    portraitImg.src = cfg.portrait;
  }

  // Metrics
  const metricsContainer = document.getElementById('heroMetricsContainer');
  if (metricsContainer && siteConfig.metrics) {
    metricsContainer.innerHTML = siteConfig.metrics.map(m => `
      <div class="metric-item">
        <span class="metric-num">${m.value}</span>
        <span class="metric-lbl">${m.label}</span>
      </div>
    `).join('');
  }
}

function populatePhilosophy() {
  const cfg = siteConfig.identity;

  const quoteEl = document.getElementById('philosophyQuoteText');
  if (quoteEl) quoteEl.textContent = `"${cfg.philosophyQuote}"`;

  const aboutEl = document.getElementById('philosophyAboutText');
  if (aboutEl) aboutEl.textContent = cfg.about;

  // Right Column: Technical Spec Cards (matching frame_010.0s.jpg) + Certifications Strip
  const certContainer = document.getElementById('philosophyCertContainer');
  if (certContainer) {
    const techSpecsHtml = `
      <div class="tech-spec-cards-wrap">
        <div class="tech-spec-card">
          <div class="tech-spec-header">
            <span class="tech-spec-title">Sovereign Architecture</span>
            <span class="tech-spec-badge">Active Deployment</span>
          </div>
          <p class="tech-spec-desc">Zero vendor cloud lock-in architecture with centralized IAM federation and immutable audit controls.</p>
          <div class="tech-spec-chips">
            <span class="tech-spec-chip">AWS Landing Zones</span>
            <span class="tech-spec-chip">Azure Management Groups</span>
            <span class="tech-spec-chip">Terraform</span>
            <span class="tech-spec-chip">Transit Gateway</span>
          </div>
        </div>

        <div class="tech-spec-card">
          <div class="tech-spec-header">
            <span class="tech-spec-title">Sub-50ms Event Loops</span>
            <span class="tech-spec-badge">High Availability</span>
          </div>
          <p class="tech-spec-desc">Multi-region latency-based routing, active-passive failover, and zero-data-loss database disaster recovery.</p>
          <div class="tech-spec-chips">
            <span class="tech-spec-chip">Route 53</span>
            <span class="tech-spec-chip">CloudFront</span>
            <span class="tech-spec-chip">Aurora Multi-Master</span>
            <span class="tech-spec-chip">EKS</span>
          </div>
        </div>

        <div class="tech-spec-card">
          <div class="tech-spec-header">
            <span class="tech-spec-title">GxP &amp; 21 CFR Part 11</span>
            <span class="tech-spec-badge">Validated Practice</span>
          </div>
          <p class="tech-spec-desc">Strict compliance framework for Life Sciences LabWare LIMS with S3 Object Lock immutable audit trail.</p>
          <div class="tech-spec-chips">
            <span class="tech-spec-chip">LabWare LIMS</span>
            <span class="tech-spec-chip">S3 Object Lock</span>
            <span class="tech-spec-chip">CloudTrail Vault</span>
            <span class="tech-spec-chip">Audit Trails</span>
          </div>
        </div>
      </div>

      <div class="cert-badges-strip">
        ${siteConfig.certifications.map(c => `
          <div class="cert-badge-wrap" title="${c.title} (${c.id})">
            <img src="${c.badge}" alt="${c.title}" loading="lazy">
          </div>
        `).join('')}
      </div>
    `;
    certContainer.innerHTML = techSpecsHtml;
  }

  // Client Logos
  const clientContainer = document.getElementById('clientLogosContainer');
  if (clientContainer && clientLogos) {
    clientContainer.innerHTML = clientLogos.map(l => `
      <span class="client-chip">
        <span style="color: var(--accent);">●</span>
        <span>${l.name}</span>
      </span>
    `).join('');
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile toggle menu
  const mobileToggle = document.getElementById('btnMobileToggle');
  const navLinksList = document.querySelector('.nav-links');
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinksList.style.display === 'flex';
      navLinksList.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinksList.style.position = 'absolute';
        navLinksList.style.top = 'var(--header-height)';
        navLinksList.style.left = '0';
        navLinksList.style.width = '100%';
        navLinksList.style.background = '#090909';
        navLinksList.style.flexDirection = 'column';
        navLinksList.style.padding = '20px';
        navLinksList.style.borderBottom = '1px solid var(--border-medium)';
      }
    });

    // Close on link click
    navLinksList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinksList.style.display = 'none';
        }
      });
    });
  }
}
