/* ==========================================================================
   LINEAR-STYLE COMMAND PALETTE (Cmd+K / Ctrl+K)
   Keyboard-first spotlight navigation & action execution
   ========================================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const paletteModal = document.getElementById('commandPaletteModal');
    const paletteInput = document.getElementById('paletteSearchInput');
    const paletteResults = document.getElementById('paletteResults');
    const openBtns = document.querySelectorAll('#openCommandPaletteBtn, .open-palette-btn');
    const closeBtn = document.getElementById('closePaletteBtn');

    if (!paletteModal || !paletteInput || !paletteResults) return;

    const commandRegistry = [
      // Quick Actions
      { id: 'act-resume', category: 'Actions', icon: '📄', title: 'Download Executive Resume (PDF)', subtitle: 'Strictly 2-page verified PDF with Cognizant & Life Sciences', action: () => { window.open('Dilip_Kumar_Resume.pdf', '_blank'); } },
      { id: 'act-cli', category: 'Actions', icon: '💻', title: 'Open Interactive Cloud CLI (dilip-cli)', subtitle: 'Simulate AWS/Azure migration checks, FinOps models & whoami', action: () => { document.getElementById('openTerminalBtn')?.click(); } },
      { id: 'act-probe', category: 'Actions', icon: '⚡', title: 'Run Multi-Cloud Latency Probe', subtitle: 'Live edge ping telemetry across Mumbai, Virginia, Frankfurt, Singapore', action: () => { document.getElementById('hudPingBtn')?.click(); } },
      { id: 'act-calc', category: 'Actions', icon: '📊', title: 'Launch FinOps ROI Calculator', subtitle: 'Calculate cloud spend rightsizing, Savings Plans & S3 tiering', action: () => { document.getElementById('finops')?.scrollIntoView({ behavior: 'smooth' }); } },
      { id: 'act-theme', category: 'Actions', icon: '☀️/🌙', title: 'Toggle Light / Dark Obsidian Theme', subtitle: 'Switch between Deep Obsidian and Clean Executive Light mode', action: () => { document.getElementById('themeToggleBtn')?.click(); } },
      { id: 'act-email', category: 'Actions', icon: '✉️', title: 'Copy Email: dilipsook@gmail.com', subtitle: 'Copy direct contact address to clipboard', action: () => { navigator.clipboard.writeText('dilipsook@gmail.com'); alert('Copied dilipsook@gmail.com to clipboard!'); } },
      { id: 'act-phone', category: 'Actions', icon: '📞', title: 'Copy Phone: +91-8050898731', subtitle: 'Copy mobile contact number to clipboard', action: () => { navigator.clipboard.writeText('+918050898731'); alert('Copied +91-8050898731 to clipboard!'); } },

      // Architecture Blueprints (9 Projects)
      { id: 'proj-jnj', category: 'Blueprints', icon: '🔬', title: 'Johnson & Johnson: Labvantage LIMS Infrastructure', subtitle: 'Multi-AZ AWS EC2, RDS, WebLogic & Zero-Downtime Migration', action: () => openBlueprint('jnj') },
      { id: 'proj-dhani', category: 'Blueprints', icon: '💰', title: 'Dhani: Cloud FinOps Transformation ($28K/mo)', subtitle: 'Automated Compute Optimizer, Savings Plans & Glacier Tiering', action: () => openBlueprint('dhani') },
      { id: 'proj-loantap', category: 'Blueprints', icon: '💳', title: 'LoanTap Fintech: AWS Cloud & CI/CD Pipeline', subtitle: 'High-availability fintech architecture & Employee of Quarter award', action: () => openBlueprint('loantap') },
      { id: 'proj-isro', category: 'Blueprints', icon: '🚀', title: 'ISRO (SDSC SHAR): Air-Gapped VMware VDI', subtitle: '100-Seat isolated engineering enclave with zero single points of failure', action: () => openBlueprint('isro') },
      { id: 'proj-iaf', category: 'Blueprints', icon: '✈️', title: 'Indian Air Force: 300+ Node Enterprise Stack', subtitle: 'Mission-critical defense infrastructure & AD DS domain controllers', action: () => openBlueprint('iaf') },
      { id: 'proj-serviceplus', category: 'Blueprints', icon: '🔄', title: 'ServicePlus: Rackspace to AWS RDS Migration', subtitle: 'Zero data loss migration with AWS DMS continuous replication', action: () => openBlueprint('serviceplus') },
      { id: 'proj-navi', category: 'Blueprints', icon: '🔍', title: 'Navi Technologies: AWS Migration Hub Landing Zone', subtitle: 'Automated 40+ server dependency discovery & GuardDuty landing zone', action: () => openBlueprint('navi') },
      { id: 'proj-bbk', category: 'Blueprints', icon: '⚡', title: 'BBK Delivery: Auto-Scaling Aurora Cluster', subtitle: 'Flash-sale resilience handling 10x traffic surges under 60 seconds', action: () => openBlueprint('bbk') },
      { id: 'proj-ksrsac', category: 'Blueprints', icon: '📡', title: 'KSRSAC: 45U Geospatial Enterprise Data Center', subtitle: 'Fujitsu Eternus DX-500 SAN fabric & 10G optical transceivers', action: () => openBlueprint('ksrsac') },

      // Navigation
      { id: 'nav-exp', category: 'Navigation', icon: '🏢', title: 'Career Journey (Cognizant, Hanu/Insight, LoanTap)', subtitle: 'Jump to 10+ years progressive leadership milestones', action: () => navigateTo('experience') },
      { id: 'nav-skills', category: 'Navigation', icon: '🛠️', title: 'Skills Matrix (Life Sciences LIMS, AWS, Azure, DevOps)', subtitle: 'Jump to interactive multi-cloud capabilities grid', action: () => navigateTo('skills') },
      { id: 'nav-arch', category: 'Navigation', icon: '🏛️', title: 'Multi-Cloud Architecture Pillars', subtitle: 'Zero-Downtime, FinOps, DevSecOps & Enterprise Reliability', action: () => navigateTo('architecture') },
      { id: 'nav-vis', category: 'Navigation', icon: '🌐', title: 'Interactive Multi-Cloud Architecture Visualizer', subtitle: 'Live 4-tier infrastructure explorer with traffic simulation', action: () => navigateTo('visualizer') },
      { id: 'nav-story', category: 'Navigation', icon: '🏔️', title: 'Perspective & Architectural Story Gallery', subtitle: 'Summit Vision, High-Altitude Strategy & Continuous Mastery', action: () => navigateTo('gallery') },
      { id: 'nav-contact', category: 'Navigation', icon: '📬', title: 'Contact Dilip Kumar', subtitle: 'Transmit direct inquiry or schedule architecture consultation', action: () => navigateTo('contact') }
    ];

    let selectedIndex = 0;
    let filteredCommands = [...commandRegistry];

    function openBlueprint(id) {
      closePalette();
      const btn = document.querySelector(`.btn-inspect-modal[data-project-id="${id}"]`);
      if (btn) btn.click();
    }

    function navigateTo(id) {
      closePalette();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function renderResults() {
      paletteResults.innerHTML = '';

      if (filteredCommands.length === 0) {
        paletteResults.innerHTML = `
          <div class="palette-empty">
            <span class="empty-icon">🔍</span>
            <div>No matching commands or architecture blueprints found for "<strong>${paletteInput.value}</strong>"</div>
          </div>
        `;
        return;
      }

      // Group by category
      let currentCategory = '';
      filteredCommands.forEach((cmd, idx) => {
        if (cmd.category !== currentCategory) {
          currentCategory = cmd.category;
          const header = document.createElement('div');
          header.className = 'palette-group-header';
          header.textContent = currentCategory;
          paletteResults.appendChild(header);
        }

        const item = document.createElement('div');
        item.className = `palette-item ${idx === selectedIndex ? 'selected' : ''}`;
        item.setAttribute('data-index', idx);
        item.innerHTML = `
          <span class="palette-item-icon">${cmd.icon}</span>
          <div class="palette-item-meta">
            <div class="palette-item-title">${cmd.title}</div>
            <div class="palette-item-subtitle">${cmd.subtitle}</div>
          </div>
          <span class="palette-item-action-hint">↵ Select</span>
        `;

        item.addEventListener('mouseenter', () => {
          selectedIndex = idx;
          updateSelectedHighlight();
        });

        item.addEventListener('click', () => {
          executeCommand(idx);
        });

        paletteResults.appendChild(item);
      });

      ensureVisible();
    }

    function updateSelectedHighlight() {
      const items = paletteResults.querySelectorAll('.palette-item');
      items.forEach((item, idx) => {
        item.classList.toggle('selected', idx === selectedIndex);
      });
      ensureVisible();
    }

    function ensureVisible() {
      const selected = paletteResults.querySelector('.palette-item.selected');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }

    function executeCommand(index) {
      const cmd = filteredCommands[index];
      if (cmd && cmd.action) {
        if (window.DilipAudio) window.DilipAudio.playClick();
        cmd.action();
        closePalette();
      }
    }

    function filterCommands(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        filteredCommands = [...commandRegistry];
      } else {
        filteredCommands = commandRegistry.filter(c => 
          c.title.toLowerCase().includes(q) || 
          c.subtitle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }
      selectedIndex = 0;
      renderResults();
    }

    function openPalette() {
      paletteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      paletteInput.value = '';
      filterCommands('');
      if (window.DilipAudio) window.DilipAudio.playPing();
      setTimeout(() => paletteInput.focus(), 80);
    }

    function closePalette() {
      paletteModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Keyboard global listener (Cmd+K / Ctrl+K / Escape / Arrow navigation)
    document.addEventListener('keydown', (e) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (paletteModal.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
        return;
      }

      if (!paletteModal.classList.contains('open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        updateSelectedHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedHighlight();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          executeCommand(selectedIndex);
        }
      }
    });

    paletteInput.addEventListener('input', (e) => {
      filterCommands(e.target.value);
    });

    openBtns.forEach(btn => btn.addEventListener('click', openPalette));
    closeBtn?.addEventListener('click', closePalette);
    paletteModal.addEventListener('click', (e) => {
      if (e.target === paletteModal) closePalette();
    });

    // Expose open helper
    window.openCommandPalette = openPalette;
  });
})();
