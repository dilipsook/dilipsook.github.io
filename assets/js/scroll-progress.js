/* ==========================================================================
   SCROLL PROGRESS SYSTEM: TOP AURORA LINE, SIDE HUD & ROCKET BUTTON
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.getElementById('scrollProgressCircle');
  const topProgressBar = document.getElementById('topScrollProgress');
  const sideScrollHud = document.getElementById('sideScrollHud');
  const hudScrollText = document.getElementById('hudScrollText');
  const hudSectionName = document.getElementById('hudSectionName');
  const sideRailTrack = document.getElementById('sideRailTrack');
  const sideRailThumb = document.getElementById('sideRailThumb');
  const railWaypoints = document.querySelectorAll('.rail-waypoint');

  let circumference = 144.5;
  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value || 23;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference + ' ' + circumference;
    progressCircle.style.strokeDashoffset = circumference;
  }

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'finops', name: 'FinOps ROI' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills' },
    { id: 'gallery', name: 'Story' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'contact', name: 'Contact' }
  ];

  let hideHudTimer = null;

  function getActiveSection() {
    const scrollPos = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollPos) {
        return sections[i];
      }
    }
    return sections[0];
  }

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    let scrollPercent = 0;
    if (scrollHeight > 0) {
      scrollPercent = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      
      // Update SVG Circular Ring
      if (progressCircle) {
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }

      // Update Top Aurora Progress Line
      if (topProgressBar) {
        topProgressBar.style.width = (scrollPercent * 100) + '%';
      }

      // Update In-Page Side Rail Thumb
      if (sideRailTrack && sideRailThumb) {
        const trackHeight = sideRailTrack.clientHeight;
        const thumbHeight = sideRailThumb.clientHeight || 38;
        const maxTravel = Math.max(0, trackHeight - thumbHeight);
        sideRailThumb.style.top = (scrollPercent * maxTravel) + 'px';
      }

      // Update Floating Side Scroll HUD Pill
      if (sideScrollHud && hudScrollText) {
        const percentInt = Math.round(scrollPercent * 100);
        hudScrollText.textContent = `${percentInt}%`;
        
        const activeSec = getActiveSection();
        if (hudSectionName && activeSec) {
          hudSectionName.textContent = activeSec.name;
        }

        // Highlight active waypoint
        railWaypoints.forEach(wp => {
          if (wp.getAttribute('data-target') === activeSec.id) {
            wp.classList.add('active');
          } else {
            wp.classList.remove('active');
          }
        });

        // Show HUD with smooth slide-in
        sideScrollHud.classList.add('active');
        clearTimeout(hideHudTimer);
        hideHudTimer = setTimeout(() => {
          sideScrollHud.classList.remove('active');
        }, 1800);
      }
    }

    // Toggle Back-to-Top Rocket Button
    if (scrollBtn) {
      if (scrollTop > 350) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Clicking the Side Scroll HUD scrolls to the next section or top
  if (sideScrollHud) {
    sideScrollHud.addEventListener('mouseenter', () => {
      clearTimeout(hideHudTimer);
      sideScrollHud.classList.add('active');
    });

    sideScrollHud.addEventListener('mouseleave', () => {
      hideHudTimer = setTimeout(() => {
        sideScrollHud.classList.remove('active');
      }, 1000);
    });

    sideScrollHud.addEventListener('click', () => {
      const activeSec = getActiveSection();
      const currIndex = sections.findIndex(s => s.id === activeSec.id);
      if (currIndex >= 0 && currIndex < sections.length - 1) {
        const nextEl = document.getElementById(sections[currIndex + 1].id);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Side Rail Elements & Waypoint Setup
  function initWaypoints() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) return;

    railWaypoints.forEach(wp => {
      const targetId = wp.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const pct = Math.min(100, Math.max(0, (targetEl.offsetTop / scrollHeight) * 100));
        wp.style.top = pct + '%';
        wp.addEventListener('click', (e) => {
          e.stopPropagation();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  if (sideRailTrack) {
    setTimeout(initWaypoints, 400);
    window.addEventListener('resize', initWaypoints);

    sideRailTrack.addEventListener('click', (e) => {
      const rect = sideRailTrack.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const pct = Math.min(1, Math.max(0, clickY / rect.height));
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      window.scrollTo({
        top: pct * scrollHeight,
        behavior: 'smooth'
      });
    });
  }
});
