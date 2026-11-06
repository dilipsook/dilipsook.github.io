/**
 * FLAGSHIP DEPLOYMENTS RENDERER & INTERACTION
 */
import { flagshipProjects } from '../data/projects.js';

export function renderDeployments(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = flagshipProjects.map((project, index) => {
    const metricsHtml = project.metrics.map(m => `
      <div class="flagship-metric-item">
        <span class="flagship-metric-num">${m.num}</span>
        <span class="flagship-metric-lbl">${m.label}</span>
      </div>
    `).join('');

    const stackLayersHtml = project.stack.map(s => `
      <div class="stack-layer-row">
        <span class="stack-layer-name">${s.layer}</span>
        <span class="stack-layer-tech">${s.tech}</span>
      </div>
    `).join('');

    return `
      <article class="flagship-card" data-index="${index}">
        <div class="flagship-card-header">
          <span class="flagship-pill-tag">● ${project.badge}</span>
          <span class="flagship-status-tag">${project.status}</span>
        </div>

        <h3 class="flagship-title">${project.title}</h3>
        <span class="flagship-client">${project.client} &bull; ${project.year}</span>
        <p class="flagship-summary">${project.description}</p>

        <div class="flagship-metrics-grid">
          ${metricsHtml}
        </div>

        <button class="stack-accordion-btn" data-target="stack-${project.id}">
          <span class="accordion-icon">+</span>
          <span>Inspect Architecture Stack (${project.stack.length} Layers)</span>
        </button>

        <div class="stack-layers-panel" id="stack-${project.id}">
          ${stackLayersHtml}
        </div>
      </article>
    `;
  }).join('');

  // Attach accordion toggle listeners
  container.querySelectorAll('.stack-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      const icon = btn.querySelector('.accordion-icon');
      if (panel) {
        const isOpen = panel.classList.contains('open');
        if (isOpen) {
          panel.classList.remove('open');
          icon.textContent = '+';
        } else {
          panel.classList.add('open');
          icon.textContent = '−';
        }
      }
    });
  });
}
