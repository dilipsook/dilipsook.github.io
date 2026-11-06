/**
 * ALL PROJECTS & MISSIONS BROWSER MODULE
 * Renders all 9 projects from root index.html with interactive filters, search, and blueprint modal.
 */
import { allProjects } from '../data/projects.js';

let currentFilter = 'all';
let searchQuery = '';

export function initProjectsModule(filterBarId, gridContainerId, searchInputId, modalBackdropId) {
  const filterBar = document.getElementById(filterBarId);
  const gridContainer = document.getElementById(gridContainerId);
  const searchInput = document.getElementById(searchInputId);
  const modalBackdrop = document.getElementById(modalBackdropId);

  if (!gridContainer) return;

  // Render projects
  renderProjectCards(gridContainer);

  // Setup filters
  if (filterBar) {
    const btns = filterBar.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderProjectCards(gridContainer);
      });
    });
  }

  // Setup search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjectCards(gridContainer);
    });
  }

  // Setup Blueprint Modal Click Delegations
  gridContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inspect-modal');
    if (btn) {
      const pid = btn.getAttribute('data-project-id');
      openBlueprintModal(pid, modalBackdrop);
    }
  });

  // Modal Backdrop Close
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop || e.target.closest('.modal-close-btn')) {
        closeBlueprintModal(modalBackdrop);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeBlueprintModal(modalBackdrop);
      }
    });
  }
}

function renderProjectCards(container) {
  const filtered = allProjects.filter(p => {
    const matchesFilter = currentFilter === 'all' || p.category.includes(currentFilter);
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery) ||
      p.client.toLowerCase().includes(searchQuery) ||
      p.summary.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-projects-state">
        <span class="empty-icon">🔍</span>
        <h4 style="margin: 8px 0; color: var(--text-primary);">No missions found</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try selecting another filter or clearing your search query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="project-card" id="proj-${p.id}">
      <div class="project-card-inner">
        <div class="project-top">
          <div class="client-logo-box">
            <img src="${p.logo}" alt="${p.client}" loading="lazy">
          </div>
          <span class="impact-badge">${p.impactBadge}</span>
        </div>

        <h3 class="project-title">${p.title}</h3>
        <div class="project-client-name">${p.client}</div>
        <p class="project-summary">${p.summary}</p>

        <ul class="project-achievements">
          ${p.achievements.map(a => `<li><span class="bullet-dot">&bull;</span><span>${a}</span></li>`).join('')}
        </ul>
      </div>

      <div class="project-footer">
        <div class="project-chips">
          ${p.tags.slice(0, 3).map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
        <button class="btn-inspect-modal" data-project-id="${p.id}" title="Inspect Blueprint">
          <span>Blueprint</span>
          <span>↗</span>
        </button>
      </div>
    </div>
  `).join('');
}

function openBlueprintModal(projectId, modalBackdrop) {
  if (!modalBackdrop) return;
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return;

  const modalContainer = modalBackdrop.querySelector('.modal-dialog-content');
  if (!modalContainer) return;

  const bp = project.blueprintDetails;

  modalContainer.innerHTML = `
    <div class="modal-blueprint-header">
      <div class="modal-blueprint-top">
        <img src="${project.logo}" alt="${project.client}" style="height: 24px; object-fit: contain;">
        <span class="impact-badge">${project.impactBadge}</span>
      </div>
      <h3 class="modal-blueprint-title">${project.title}</h3>
      <div class="modal-blueprint-client">${project.client}</div>
    </div>

    <p class="modal-blueprint-summary">${project.summary}</p>

    <div class="blueprint-specs-grid">
      <div class="blueprint-spec-item">
        <span class="blueprint-spec-lbl">SYSTEM ARCHITECTURE</span>
        <span class="blueprint-spec-val">${bp.architecture}</span>
      </div>
      <div class="blueprint-spec-item">
        <span class="blueprint-spec-lbl">OPERATIONAL SLA</span>
        <span class="blueprint-spec-val">${bp.sla}</span>
      </div>
      <div class="blueprint-spec-item">
        <span class="blueprint-spec-lbl">SECURITY POSTURE</span>
        <span class="blueprint-spec-val">${bp.security}</span>
      </div>
      <div class="blueprint-spec-item">
        <span class="blueprint-spec-lbl">FINOPS CAPITAL IMPACT</span>
        <span class="blueprint-spec-val" style="color: var(--accent);">${bp.finops}</span>
      </div>
    </div>

    <div class="modal-blueprint-section">
      <h5 style="margin-bottom: 8px; font-size: 0.85rem; letter-spacing: 0.08em; color: var(--text-muted); text-transform: uppercase;">Key Delivery Milestones</h5>
      <ul class="project-achievements" style="margin-bottom: 16px;">
        ${project.achievements.map(a => `<li><span class="bullet-dot">&bull;</span><span>${a}</span></li>`).join('')}
      </ul>
    </div>

    <div class="modal-blueprint-tags">
      ${project.tags.map(t => `<span class="tech-chip">${t}</span>`).join('')}
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBlueprintModal(modalBackdrop) {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}
