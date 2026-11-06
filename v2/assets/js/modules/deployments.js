/**
 * FLAGSHIP DEPLOYMENTS RENDERER & INTERACTIVE 7-LAYER STACK
 * Matches video layout (frame_018.0s.jpg, frame_030.0s.jpg, frame_034.0s.jpg)
 */
import { primaryFlagship, secondaryFlagships } from '../data/projects.js';

let activeLayerIndex = 0;

export function renderDeployments(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const primary = primaryFlagship;

  // 1. Primary Metrics
  const metricsHtml = primary.metrics.map(m => `
    <div class="flagship-metric-item" data-metric-id="${m.num}">
      <span class="flagship-metric-num">${m.num}</span>
      <span class="flagship-metric-lbl">${m.label}</span>
    </div>
  `).join('');

  // 2. 7-Layer Tabs
  const layerTabsHtml = primary.layers.map((l, idx) => `
    <button class="layer-tab-btn ${idx === 0 ? 'active' : ''}" data-layer-idx="${idx}">
      ${l.layer}
    </button>
  `).join('');

  // 3. Initial Active Layer Content
  const initialLayer = primary.layers[0];
  const layerInspectorHtml = `
    <div class="layer-inspector-card" id="layerInspectorContent">
      <div class="layer-inspector-header">
        <span class="layer-inspector-kicker">${initialLayer.category}</span>
      </div>
      <h4 class="layer-inspector-title">${initialLayer.title}</h4>
      <p class="layer-inspector-desc">${initialLayer.description}</p>
      <div class="layer-inspector-chips">
        ${initialLayer.chips.map(c => `<span class="tech-chip">${c}</span>`).join('')}
      </div>
    </div>
  `;

  // Primary Card HTML
  const primaryHtml = `
    <article class="flagship-primary-card" id="flagshipPrimaryCard">
      <div class="flagship-card-header">
        <span class="flagship-pill-tag">● ${primary.tag}</span>
        <span class="flagship-hardware-tag">${primary.hardwareTag}</span>
      </div>

      <h3 class="flagship-title">${primary.title}</h3>
      <div class="flagship-client-row">
        <span class="flagship-client">${primary.client} &bull; ${primary.year}</span>
      </div>
      <p class="flagship-summary">${primary.summary}</p>

      <div class="flagship-metrics-grid">
        ${metricsHtml}
      </div>

      <!-- 7-Layer Constitutional Stack (Matching Video frame_030.0s.jpg) -->
      <div class="flagship-stack-block">
        <div class="stack-block-header">
          <span class="stack-block-title">${primary.stackTitle}</span>
          <span class="stack-block-sub">${primary.stackSubtitle}</span>
        </div>

        <div class="layer-tabs-scroll" id="layerTabsContainer">
          ${layerTabsHtml}
        </div>

        ${layerInspectorHtml}
      </div>
    </article>
  `;

  // 4. Secondary 3-Column Grid
  const secondaryCardsHtml = secondaryFlagships.map(item => `
    <div class="flagship-col-card" id="${item.id}">
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

  // Setup Layer Tab Click Listeners
  setupLayerTabs();
}

function setupLayerTabs() {
  const tabs = document.querySelectorAll('.layer-tab-btn');
  const inspector = document.getElementById('layerInspectorContent');
  if (!tabs.length || !inspector) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-layer-idx'), 10);
      selectLayer(idx);
    });
  });
}

export function selectLayer(idx) {
  const primary = primaryFlagship;
  if (!primary.layers[idx]) return;

  activeLayerIndex = idx;
  const l = primary.layers[idx];
  const tabs = document.querySelectorAll('.layer-tab-btn');
  const inspector = document.getElementById('layerInspectorContent');

  tabs.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });

  if (inspector) {
    inspector.innerHTML = `
      <div class="layer-inspector-header">
        <span class="layer-inspector-kicker">${l.category}</span>
      </div>
      <h4 class="layer-inspector-title">${l.title}</h4>
      <p class="layer-inspector-desc">${l.description}</p>
      <div class="layer-inspector-chips">
        ${l.chips.map(c => `<span class="tech-chip">${c}</span>`).join('')}
      </div>
    `;
  }
}
