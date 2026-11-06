/**
 * WORK EXPERIENCE TIMELINE MODULE
 * Renders all 5 verified career milestones in high-contrast editorial style.
 */
import { experienceData } from '../data/experience.js';

export function renderExperience(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <div class="timeline-line"></div>
    ${experienceData.map(item => `
      <div class="timeline-item ${item.isCurrent ? 'current' : ''}" id="exp-${item.id}">
        <div class="timeline-node ${item.isCurrent ? 'current' : ''}"></div>
        <div class="timeline-card ${item.isCurrent ? 'current-job-card' : ''}">
          <div class="timeline-header">
            <div>
              ${item.isCurrent ? '<span class="current-role-badge">CURRENT ROLE</span>' : ''}
              <h3 class="timeline-role">${item.role}</h3>
            </div>
            <span class="timeline-date">${item.date} &bull; ${item.location}</span>
          </div>

          <div class="timeline-company">
            <img src="${item.logo}" alt="${item.company}" class="company-logo-img">
            <span>${item.company} &bull; <strong>${item.division}</strong></span>
          </div>

          <ul class="timeline-points">
            ${item.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="timeline-tags">
            ${item.tags.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  `;

  container.innerHTML = html;
}
