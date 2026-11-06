/**
 * INDUSTRY CERTIFICATIONS & ACCOLADES MODULE (v2)
 * Matches Image 3: 5 Official Verified Badges + Honors & Recognition + Education
 */
import { certificationsData, honorsData, educationData } from '../data/certifications.js';

export function renderCertificationsModule(certsContainerId, honorsContainerId, eduContainerId) {
  const certsContainer = document.getElementById(certsContainerId);
  if (certsContainer) {
    certsContainer.innerHTML = certificationsData.map((item, idx) => `
      <div class="cert-card" id="cert-${item.id}">
        <div class="cert-top">
          <img src="${item.badge}" alt="${item.title}" class="cert-badge-img" loading="lazy">
          <div class="cert-vendor">${item.vendor}</div>
          <h3 class="cert-name">${item.title}</h3>
        </div>
        <span class="cert-verified">${item.verified}</span>
      </div>
    `).join('');
  }

  const honorsContainer = document.getElementById(honorsContainerId);
  if (honorsContainer) {
    honorsContainer.innerHTML = honorsData.map(item => `
      <div class="award-item">
        <h4 class="award-title">${item.title}</h4>
        <div class="award-org">${item.org}</div>
        <div class="award-date">${item.date}</div>
        <p class="award-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  const eduContainer = document.getElementById(eduContainerId);
  if (eduContainer) {
    eduContainer.innerHTML = educationData.map(item => `
      <div class="edu-item">
        <h4 class="edu-title">${item.degree}</h4>
        <div class="edu-org">${item.school}</div>
        <div class="edu-date">${item.period}</div>
      </div>
    `).join('');
  }
}
