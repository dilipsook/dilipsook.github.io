/**
 * THE SYSTEMS MATRIX MODULE
 * Filterable architecture grid + detailed inspection modal (Matching Video)
 */
import { systemsCategories, systemsMatrix } from '../data/matrix.js';

export function renderSystemsMatrix(filterContainerId, gridContainerId, modalBackdropId) {
  const filterContainer = document.getElementById(filterContainerId);
  const gridContainer = document.getElementById(gridContainerId);
  const modalBackdrop = document.getElementById(modalBackdropId);

  if (!gridContainer) return;

  // Render filter pills
  if (filterContainer) {
    filterContainer.innerHTML = systemsCategories.map((cat, idx) => `
      <button class="matrix-filter-pill ${idx === 0 ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.matrix-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.matrix-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        filterCards(cat);
      });
    });
  }

  // Render cards (matching frame_044.0s.jpg with external link arrow)
  function renderCards(items) {
    gridContainer.innerHTML = items.map(sys => `
      <div class="matrix-card" data-sys-id="${sys.id}">
        <div>
          <div class="matrix-card-header">
            <span class="matrix-kicker-badge">${sys.kicker}</span>
            <div class="matrix-header-meta">
              <span class="matrix-id-tag">${sys.sysNumber}</span>
              <span class="matrix-arrow-icon">&nearr;</span>
            </div>
          </div>
          <h4 class="matrix-card-title">${sys.title}</h4>
          <p class="matrix-card-summary">${sys.summary}</p>
        </div>
        <div class="matrix-tags-wrap">
          ${sys.tags.map(t => `<span class="matrix-tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Attach card click to open modal
    gridContainer.querySelectorAll('.matrix-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-sys-id');
        const sys = systemsMatrix.find(s => s.id === id);
        if (sys) openModal(sys);
      });
    });
  }

  function filterCards(cat) {
    if (cat === 'all') {
      renderCards(systemsMatrix);
    } else {
      const filtered = systemsMatrix.filter(s => s.category === cat);
      renderCards(filtered);
    }
  }

  // Modal open/close logic
  function openModal(sys) {
    if (!modalBackdrop) return;
    const dialog = modalBackdrop.querySelector('.modal-dialog');
    if (!dialog) return;

    dialog.innerHTML = `
      <button class="modal-close-btn" id="btnCloseMatrixModal" aria-label="Close dialog">✕</button>
      <div>
        <span class="sec-kicker">${sys.sysNumber} // ${sys.kicker}</span>
        <h3 class="sec-title" style="font-size: 1.8rem; margin-top: 6px;">${sys.title}</h3>
      </div>
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7;">
        ${sys.details}
      </p>
      <div style="background: rgba(9,9,9,0.7); border: 1px solid var(--border-subtle); padding: 14px 18px; border-radius: 8px;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); text-transform: uppercase;">
          DOCUMENTED IMPACT
        </span>
        <div style="font-size: 1.1rem; font-weight: 700; color: #34d399; margin-top: 4px;">
          ${sys.impact}
        </div>
      </div>
      <div>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">
          CORE TECHNOLOGIES & FRAMEWORKS
        </span>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${sys.tags.map(t => `<span class="matrix-tech-chip" style="color: #ffffff; border-color: rgba(227,43,60,0.3);">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('btnCloseMatrixModal').addEventListener('click', closeModal);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Initial render
  renderCards(systemsMatrix);
}
