/**
 * ARCHITECTURAL MINDSET & VISION GALLERY MODULE
 * Renders all 4 perspective photos with philosophical reflections.
 */
import { galleryData } from '../data/gallery.js';

export function renderGalleryModule(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = galleryData.map(item => `
    <div class="story-card" id="gallery-${item.id}">
      <div class="story-img-wrap">
        <span class="story-badge-top">${item.badge}</span>
        <img src="${item.image}" alt="${item.alt}" class="story-img" loading="lazy">
      </div>
      <div class="story-content">
        <h3 class="story-title">${item.title}</h3>
        <p class="story-text">"${item.quote}"</p>
      </div>
    </div>
  `).join('');
}
