/**
 * MAIN CLIENT APPLICATION ENTRY POINT
 * Noir & Crimson Portfolio System
 */

import { siteConfig } from './config/site.js';
import { careerTimeline, clientLogos } from './data/experience.js';
import { renderDeployments } from './modules/deployments.js';
import { renderSystemsMatrix } from './modules/matrix.js';
import { initFinOpsCalculator } from './modules/finops.js';
import { initContactActions } from './modules/contact.js';
import { initSwarm, toggleSwarm } from './modules/swarm.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Hero Content from siteConfig
  populateHero();

  // 2. Populate Philosophy & Certifications
  populatePhilosophy();

  // 3. Render Flagship Deployments
  renderDeployments('flagshipContainer');

  // 4. Render Systems Matrix & Modal
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

  // Certifications
  const certContainer = document.getElementById('philosophyCertContainer');
  if (certContainer && siteConfig.certifications) {
    certContainer.innerHTML = siteConfig.certifications.map(c => `
      <div class="cert-card">
        <div class="cert-badge-wrap">
          <img src="${c.badge}" alt="${c.title}" loading="lazy">
        </div>
        <div class="cert-meta">
          <span class="cert-title">${c.title}</span>
          <span class="cert-issuer">${c.issuer} &bull; ${c.id}</span>
        </div>
      </div>
    `).join('');
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
