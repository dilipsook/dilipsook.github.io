/**
 * FLAGSHIP DEPLOYMENTS RENDERER & INTERACTION
 * Renders 1 Primary Ecosystem Card + 3-Column Secondary Grid (Matching Video)
 */
import { primaryFlagship, secondaryFlagships } from '../data/projects.js';

export function renderDeployments(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Primary Highlight Card
  const primary = primaryFlagship;
  const metricsHtml = primary.metrics.map(m => `
    <div class="flagship-metric-item">
      <span class="flagship-metric-num">${m.num}</span>
      <span class="flagship-metric-lbl">${m.label}</span>
    </div>
  `).join('');

  const stackLayersHtml = primary.stack.map(s => `
    <div class="stack-layer-row">
      <span class="stack-layer-name">${s.layer}</span>
      <span class="stack-layer-tech">${s.tech}</span>
    </div>
  `).join('');

  const primaryHtml = `
    <article class="flagship-primary-card">
      <div class="flagship-card-header">
        <span class="flagship-pill-tag">● ${primary.tag}</span>
        <span class="flagship-hardware-tag">${primary.hardwareTag}</span>
      </div>

      <h3 class="flagship-title">${primary.title}</h3>
      <span class="flagship-client">${primary.client} &bull; ${primary.year}</span>
      <p class="flagship-summary">${primary.summary}</p>

      <div class="flagship-metrics-grid">
        ${metricsHtml}
      </div>

      <div class="stack-trigger-row">
        <div class="stack-trigger-info">
          <span class="stack-trigger-title">${primary.stackTitle}</span>
          <span class="stack-trigger-sub">${primary.stackSubtitle}</span>
        </div>
        <button class="stack-accordion-btn" id="btnTogglePrimaryStack" aria-expanded="false" title="Inspect implementation layers">
          <span class="accordion-icon">+</span>
        </button>
      </div>

      <div class="stack-layers-panel" id="primaryStackPanel">
        ${stackLayersHtml}
      </div>
    </article>
  `;

  // 2. Secondary 3-Column Grid (matching frame_034.0s.jpg)
  const secondaryCardsHtml = secondaryFlagships.map(item => `
    <div class="flagship-col-card">
      <span class="flagship-col-kicker">${item.kicker}</span>
      <h4 class="flagship-col-title">${item.title}</h4>
      <p class="flagship-col-summary">${item.summary}</p>
      
      <ul class="flagship-col-bullets">
        ${item.bullets.map(b => `<li><span class="bullet-dot">&bull;</span><span>${b}</span></li>`).join('')}
      </ul>

      <div class="flagship-col-tags">
        ${item.tags.map(t => `<span class="flagship-col-chip">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  const secondaryGridHtml = `
    <div class="flagship-secondary-grid">
      ${secondaryCardsHtml}
    </div>
  `;

  container.innerHTML = primaryHtml + secondaryGridHtml;

  // Attach stack accordion listener
  const toggleBtn = document.getElementById('btnTogglePrimaryStack');
  const panel = document.getElementById('primaryStackPanel');
  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        toggleBtn.querySelector('.accordion-icon').textContent = '+';
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        panel.classList.add('open');
        toggleBtn.querySelector('.accordion-icon').textContent = '−';
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
}
