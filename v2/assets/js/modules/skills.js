/**
 * MULTI-CLOUD SKILLS CAPABILITIES MODULE
 * Renders all skills from root index.html with interactive category filter tabs.
 */
import { skillsCategories, skillsData } from '../data/skills.js';

let activeCategory = 'all';

export function renderSkillsModule(navContainerId, gridContainerId) {
  const navContainer = document.getElementById(navContainerId);
  const gridContainer = document.getElementById(gridContainerId);
  if (!gridContainer) return;

  // Render navigation buttons
  if (navContainer) {
    navContainer.innerHTML = skillsCategories.map(cat => `
      <button class="skill-tab-btn ${cat.id === 'all' ? 'active' : ''}" data-skill-group="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    const btns = navContainer.querySelectorAll('.skill-tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-skill-group') || 'all';
        renderSkillsGrid(gridContainer);
      });
    });
  }

  // Render initial grid
  renderSkillsGrid(gridContainer);
}

function renderSkillsGrid(container) {
  const filtered = skillsData.filter(s => activeCategory === 'all' || s.group === activeCategory);

  container.innerHTML = filtered.map(s => `
    <div class="skill-item" data-group="${s.group}">
      ${s.type === 'img' 
        ? `<img src="${s.icon}" alt="${s.name}" class="skill-icon-img" loading="lazy">`
        : `<span class="skill-icon-emoji">${s.icon}</span>`
      }
      <span class="skill-name">${s.name}</span>
    </div>
  `).join('');
}
