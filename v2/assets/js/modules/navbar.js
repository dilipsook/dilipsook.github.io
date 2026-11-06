/**
 * FLOATING LUXURY PILL NAVBAR & ACTION HUB MODULE
 * Implements live telemetry ping ticker, linear-style command palette,
 * edge latency probe modal, audio briefing toggle, and mobile drawer.
 */

import { allProjects } from '../data/projects.js';

export function initNavbar() {
  const navbarPill = document.getElementById('mainNavbar');
  const navRegionTicker = document.getElementById('navRegionTicker');
  const navTelemetryBtn = document.getElementById('navTelemetryBtn');
  const latencyProbeModal = document.getElementById('latencyProbeModal');
  const closeProbeModalBtn = document.getElementById('closeProbeModalBtn');
  const runProbeActionBtn = document.getElementById('runProbeActionBtn');
  const probeNodesList = document.getElementById('probeNodesList');

  const openPaletteBtn = document.getElementById('openCommandPaletteBtn');
  const paletteModal = document.getElementById('commandPaletteModal');
  const paletteInput = document.getElementById('paletteSearchInput');
  const paletteResults = document.getElementById('paletteResults');
  const closePaletteBtn = document.getElementById('closePaletteBtn');

  const navAudioToggleBtn = document.getElementById('navAudioToggleBtn');
  const navAudioIcon = document.getElementById('navAudioIcon');

  const btnMobileToggle = document.getElementById('btnMobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');

  // =========================================================================
  // 1. Scroll-Spy & Sticky Scrolled State
  // =========================================================================
  const navLinks = document.querySelectorAll('.navbar-pill .nav-link');
  const sectionMap = [
    { id: 'overview', link: 'Overview' },
    { id: 'matrix', link: 'Pillars' },
    { id: 'projects', link: 'Case Studies' },
    { id: 'finops', link: 'FinOps' },
    { id: 'experience', link: 'Journey' },
    { id: 'skills', link: 'Skills' },
    { id: 'contact', link: 'Contact' }
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (navbarPill) {
      if (scrollY > 20) {
        navbarPill.classList.add('scrolled');
      } else {
        navbarPill.classList.remove('scrolled');
      }
    }

    let currentSectionId = 'overview';
    sectionMap.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.offsetTop - 180;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = item.id;
        }
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // =========================================================================
  // 2. Live AWS / Multi-Cloud Latency Ping Ticker
  // =========================================================================
  const regions = [
    { name: 'AWS ap-southeast-1 (Singapore)', base: 37.0, loss: '0% Loss' },
    { name: 'AWS ap-south-1 (Mumbai)', base: 11.2, loss: '0% Loss' },
    { name: 'Azure centralindia (Pune)', base: 13.4, loss: '0% Loss' },
    { name: 'AWS us-east-1 (Virginia)', base: 66.8, loss: '0% Loss' },
    { name: 'AWS eu-central-1 (Frankfurt)', base: 73.9, loss: '0% Loss' },
    { name: 'CloudFront Anycast Edge', base: 3.8, loss: '0% Loss' }
  ];

  let currentRegionIdx = 0;
  function updatePingTicker() {
    if (!navRegionTicker) return;
    const r = regions[currentRegionIdx];
    const jitter = (Math.random() * 1.2 - 0.6).toFixed(1);
    const ms = (r.base + parseFloat(jitter)).toFixed(1);
    navRegionTicker.innerHTML = `${r.name}: <span class="hud-ping-val">${ms}ms</span> <em>(${r.loss})</em>`;
    currentRegionIdx = (currentRegionIdx + 1) % regions.length;
  }
  setInterval(updatePingTicker, 3200);
  updatePingTicker();

  // =========================================================================
  // 3. Global Multi-Cloud Edge Latency Probe Modal
  // =========================================================================
  const probeTargets = [
    { region: 'AWS Singapore (ap-southeast-1)', base: 37.0, status: 'Optimal' },
    { region: 'AWS Mumbai (ap-south-1)', base: 11.2, status: 'Optimal' },
    { region: 'Azure Pune (Central India)', base: 13.4, status: 'Optimal' },
    { region: 'AWS N. Virginia (us-east-1)', base: 66.8, status: 'Optimal' },
    { region: 'AWS Frankfurt (eu-central-1)', base: 73.9, status: 'Optimal' },
    { region: 'CloudFront Global Anycast Edge', base: 3.8, status: 'Sub-5ms' }
  ];

  function renderProbeNodes() {
    if (!probeNodesList) return;
    probeNodesList.innerHTML = probeTargets.map(t => {
      const jitter = (Math.random() * 1.4 - 0.7).toFixed(1);
      const ms = (t.base + parseFloat(jitter)).toFixed(1);
      const widthPct = Math.min(100, Math.max(8, (parseFloat(ms) / 80) * 100));
      return `
        <div class="probe-node-row">
          <div class="probe-node-meta">
            <span class="telemetry-live-dot"></span>
            <span class="probe-node-name">${t.region}</span>
          </div>
          <span class="probe-node-status">${t.status}</span>
          <div class="probe-node-telemetry">
            <div class="probe-node-bar-track">
              <div class="probe-node-bar-fill" style="width: ${widthPct}%;"></div>
            </div>
            <span class="probe-node-ms">${ms} ms</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function openProbeModal() {
    if (!latencyProbeModal) return;
    renderProbeNodes();
    latencyProbeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProbeModal() {
    if (!latencyProbeModal) return;
    latencyProbeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navTelemetryBtn) navTelemetryBtn.addEventListener('click', openProbeModal);
  if (closeProbeModalBtn) closeProbeModalBtn.addEventListener('click', closeProbeModal);
  if (latencyProbeModal) {
    latencyProbeModal.addEventListener('click', (e) => {
      if (e.target === latencyProbeModal) closeProbeModal();
    });
  }
  if (runProbeActionBtn) {
    runProbeActionBtn.addEventListener('click', () => {
      runProbeActionBtn.innerHTML = `<span>Probing Edge... ⚡</span>`;
      setTimeout(() => {
        renderProbeNodes();
        runProbeActionBtn.innerHTML = `<span>Re-Probe Latency Now ⚡</span>`;
      }, 350);
    });
  }

  // =========================================================================
  // 4. Linear-Style Command Palette (Cmd+K / Ctrl+K)
  // =========================================================================
  const commandRegistry = [
    // Actions
    { id: 'act-resume', category: 'Action', icon: '📄', title: 'Download Executive Resume (PDF)', subtitle: 'Multi-Cloud & FinOps Architect verified credentials', action: () => { window.open('Dilip_Kumar_Resume.pdf', '_blank'); } },
    { id: 'act-probe', category: 'Action', icon: '⚡', title: 'Run Multi-Cloud Latency Probe', subtitle: 'Live edge ping telemetry across Singapore, Mumbai, Virginia, Frankfurt', action: () => { closeCommandPalette(); openProbeModal(); } },
    { id: 'act-finops', category: 'Action', icon: '📊', title: 'Launch FinOps ROI Calculator', subtitle: 'Interactive benchmark model ($5K to $200K+/mo spend vectors)', action: () => { closeCommandPalette(); document.getElementById('finops')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'act-sim', category: 'Action', icon: '🔬', title: 'Simulate 15K Req/s Traffic Surge', subtitle: 'Interactive Multi-AZ Architecture Platform Simulator', action: () => { closeCommandPalette(); document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' }); document.getElementById('visSurgeBtn')?.click(); } },
    { id: 'act-email', category: 'Action', icon: '✉️', title: 'Copy Email: dilipsook@gmail.com', subtitle: 'Direct enterprise correspondence address', action: () => { navigator.clipboard.writeText('dilipsook@gmail.com'); alert('Copied dilipsook@gmail.com to clipboard!'); } },
    { id: 'act-phone', category: 'Action', icon: '📞', title: 'Copy Phone: +91-8050898731', subtitle: 'Direct mobile contact number', action: () => { navigator.clipboard.writeText('+918050898731'); alert('Copied +91-8050898731 to clipboard!'); } },

    // Blueprints (All 9 Projects)
    ...allProjects.map(p => ({
      id: `proj-${p.id}`,
      category: 'Blueprint',
      icon: '🏛️',
      title: `${p.client}: ${p.title}`,
      subtitle: `${p.impactBadge} • ${p.role}`,
      action: () => {
        closeCommandPalette();
        const btn = document.querySelector(`.btn-inspect-modal[data-project-id="${p.id}"]`);
        if (btn) btn.click();
      }
    })),

    // Navigation jumps
    { id: 'nav-overview', category: 'Jump', icon: '🏠', title: 'Executive Overview & Hero', subtitle: 'Top of portfolio & metrics summary', action: () => { closeCommandPalette(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-pillars', category: 'Jump', icon: '💎', title: 'Architecture Pillars & Systems Matrix', subtitle: '6 Modular Multi-Cloud Enterprise Blueprints', action: () => { closeCommandPalette(); document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-projects', category: 'Jump', icon: '💼', title: 'Case Studies & High-Impact Missions', subtitle: 'All 9 production cloud migration & FinOps delivery cases', action: () => { closeCommandPalette(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-experience', category: 'Jump', icon: '🚀', title: 'Career Journey (Cognizant, Hanu/Insight, LoanTap)', subtitle: '10+ years enterprise infrastructure leadership timeline', action: () => { closeCommandPalette(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-skills', category: 'Jump', icon: '🛠️', title: 'Multi-Cloud Skills Matrix', subtitle: 'AWS, Microsoft Azure, FinOps, GxP LabWare & IaC tooling', action: () => { closeCommandPalette(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-vision', category: 'Jump', icon: '🏔️', title: 'Architectural Mindset & Vision', subtitle: 'Perspective from Summit & continuous engineering evolution', action: () => { closeCommandPalette(); document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-certs', category: 'Jump', icon: '🎖️', title: 'Industry Certifications & Accolades', subtitle: 'AWS SA Associate, SysOps, Azure AZ-104, AZ-700 & MCSA', action: () => { closeCommandPalette(); document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'nav-contact', category: 'Jump', icon: '📬', title: 'Direct Transmission & Contact Dispatch', subtitle: 'Schedule multi-cloud architecture review or dispatch note', action: () => { closeCommandPalette(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }
  ];

  let selectedIdx = 0;
  let currentResults = [...commandRegistry];

  function renderPaletteItems() {
    if (!paletteResults) return;
    if (currentResults.length === 0) {
      paletteResults.innerHTML = `<div style="padding: 24px; text-align: center; color: #64748b; font-family: var(--font-mono); font-size: 0.85rem;">No matching commands or blueprints found.</div>`;
      return;
    }

    paletteResults.innerHTML = currentResults.map((cmd, idx) => `
      <div class="palette-item ${idx === selectedIdx ? 'selected' : ''}" data-idx="${idx}">
        <div class="palette-item-icon">${cmd.icon}</div>
        <div class="palette-item-content">
          <div class="palette-item-title">${cmd.title}</div>
          <div class="palette-item-sub">${cmd.subtitle}</div>
        </div>
        <span class="palette-item-badge">${cmd.category}</span>
      </div>
    `).join('');

    // Click Delegation
    paletteResults.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.getAttribute('data-idx'), 10);
        if (currentResults[i] && currentResults[i].action) {
          currentResults[i].action();
        }
      });
    });
  }

  function filterPalette(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      currentResults = [...commandRegistry];
    } else {
      currentResults = commandRegistry.filter(cmd => 
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
      );
    }
    selectedIdx = 0;
    renderPaletteItems();
  }

  function openCommandPalette() {
    if (!paletteModal || !paletteInput) return;
    paletteModal.classList.add('open');
    paletteInput.value = '';
    currentResults = [...commandRegistry];
    selectedIdx = 0;
    renderPaletteItems();
    document.body.style.overflow = 'hidden';
    setTimeout(() => paletteInput.focus(), 50);
  }

  function closeCommandPalette() {
    if (!paletteModal) return;
    paletteModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openPaletteBtn) openPaletteBtn.addEventListener('click', openCommandPalette);
  if (closePaletteBtn) closePaletteBtn.addEventListener('click', closeCommandPalette);
  if (paletteModal) {
    paletteModal.addEventListener('click', (e) => {
      if (e.target === paletteModal) closeCommandPalette();
    });
  }

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      filterPalette(e.target.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = (selectedIdx + 1) % currentResults.length;
        renderPaletteItems();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = (selectedIdx - 1 + currentResults.length) % currentResults.length;
        renderPaletteItems();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentResults[selectedIdx] && currentResults[selectedIdx].action) {
          currentResults[selectedIdx].action();
        }
      } else if (e.key === 'Escape') {
        closeCommandPalette();
      }
    });
  }

  // Global Keybinding (Cmd+K / Ctrl+K and ESC)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteModal && paletteModal.classList.contains('open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape') {
      if (paletteModal && paletteModal.classList.contains('open')) {
        closeCommandPalette();
      }
      if (latencyProbeModal && latencyProbeModal.classList.contains('open')) {
        closeProbeModal();
      }
    }
  });

  // =========================================================================
  // 5. Audio Briefing Voice Narration Toggle
  // =========================================================================
  let isAudioActive = false;
  if (navAudioToggleBtn && navAudioIcon) {
    navAudioToggleBtn.addEventListener('click', () => {
      isAudioActive = !isAudioActive;
      if (isAudioActive) {
        navAudioIcon.textContent = '🔊';
        navAudioToggleBtn.style.borderColor = 'var(--accent)';
        navAudioToggleBtn.style.boxShadow = '0 0 16px rgba(227, 43, 60, 0.4)';
        // Trigger play on Skills Reel briefing if paused
        const playBtn = document.getElementById('btnPlaySkillsReel') || document.getElementById('playBriefingBtn');
        if (playBtn) playBtn.click();
      } else {
        navAudioIcon.textContent = '🔇';
        navAudioToggleBtn.style.borderColor = '';
        navAudioToggleBtn.style.boxShadow = '';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      }
    });
  }

  // =========================================================================
  // 6. Mobile Drawer Navigation (Interactive Toggle with Touch & Click)
  // =========================================================================
  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.style.visibility = 'visible';
      mobileDrawer.classList.add('open');
    }
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.style.visibility = 'visible';
      mobileMenuBackdrop.classList.add('open');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      setTimeout(() => {
        if (!mobileDrawer.classList.contains('open')) {
          mobileDrawer.style.visibility = 'hidden';
        }
      }, 360);
    }
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.classList.remove('open');
      setTimeout(() => {
        if (!mobileMenuBackdrop.classList.contains('open')) {
          mobileMenuBackdrop.style.visibility = 'hidden';
        }
      }, 310);
    }
    document.body.style.overflow = '';
  }

  let lastMobileToggleTime = 0;
  function toggleMobileDrawer(e) {
    const now = Date.now();
    if (now - lastMobileToggleTime < 280) return;
    lastMobileToggleTime = now;
    if (e && e.cancelable && e.type === 'touchend') e.preventDefault();

    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  }

  if (btnMobileToggle) {
    btnMobileToggle.addEventListener('click', toggleMobileDrawer);
    btnMobileToggle.addEventListener('touchend', toggleMobileDrawer, { passive: false });
  }
  if (mobileDrawerCloseBtn) {
    mobileDrawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileDrawer();
    });
    mobileDrawerCloseBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      closeMobileDrawer();
    }, { passive: false });
  }
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileDrawer);
    mobileMenuBackdrop.addEventListener('touchend', (e) => {
      e.preventDefault();
      closeMobileDrawer();
    }, { passive: false });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });
}
