/* ==========================================================================
   GLOBAL CLOUD TELEMETRY & EDGE LATENCY PROBE HUD
   Simulates real-time enterprise multi-cloud observability & ICMP edge ping
   ========================================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const clockEl = document.getElementById('hudClock');
    const tickerEl = document.getElementById('globalRegionTicker');
    const pingBtn = document.getElementById('hudPingBtn');
    const probeModal = document.getElementById('latencyProbeModal');
    const closeProbeBtn = document.getElementById('closeProbeModalBtn');
    const runProbeActionBtn = document.getElementById('runProbeActionBtn');
    const probeNodesList = document.getElementById('probeNodesList');

    // 1. Live UTC & IST Clock
    function updateClock() {
      if (!clockEl) return;
      const now = new Date();
      const utcStr = now.toUTCString().split(' ')[4] + ' UTC';
      clockEl.textContent = utcStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Global Region Latency Ticker with micro-fluctuations
    const regions = [
      { name: 'AWS ap-south-1 (Mumbai)', base: 11 },
      { name: 'AWS us-east-1 (Virginia)', base: 66 },
      { name: 'Azure centralindia (Pune)', base: 13 },
      { name: 'AWS eu-central-1 (Frankfurt)', base: 74 },
      { name: 'CloudFront Edge CDN', base: 4 },
      { name: 'AWS ap-southeast-1 (Singapore)', base: 38 }
    ];

    let tickerIndex = 0;
    function updateTicker() {
      if (!tickerEl) return;
      const r = regions[tickerIndex];
      const jitter = (Math.random() * 2 - 1).toFixed(1);
      const ping = (r.base + parseFloat(jitter)).toFixed(1);
      tickerEl.innerHTML = `<strong>${r.name}:</strong> <span class="hud-ping-val">${ping}ms</span> <span class="hud-ping-dot"></span> <em>(0% Loss)</em>`;
      tickerIndex = (tickerIndex + 1) % regions.length;
    }
    setInterval(updateTicker, 3200);
    updateTicker();

    // 3. Global Latency Probe Modal
    const probeTargets = [
      { code: 'ap-south-1', region: 'AWS Mumbai, IN', baseMs: 11.2, jitter: '±0.6ms', status: 'Optimal' },
      { code: 'centralindia', region: 'Azure Pune, IN', baseMs: 13.8, jitter: '±0.4ms', status: 'Optimal' },
      { code: 'us-east-1', region: 'AWS N. Virginia, US', baseMs: 67.4, jitter: '±1.2ms', status: 'Optimal' },
      { code: 'eu-central-1', region: 'AWS Frankfurt, DE', baseMs: 73.1, jitter: '±0.9ms', status: 'Optimal' },
      { code: 'ap-southeast-1', region: 'AWS Singapore, SG', baseMs: 37.9, jitter: '±0.7ms', status: 'Optimal' },
      { code: 'global-cf', region: 'CloudFront Anycast Edge', baseMs: 3.8, jitter: '±0.2ms', status: 'Sub-5ms' }
    ];

    function renderProbeNodes(animate = false) {
      if (!probeNodesList) return;
      probeNodesList.innerHTML = '';

      probeTargets.forEach((target, i) => {
        const jitterVal = (Math.random() * 1.5 - 0.75).toFixed(1);
        const currentMs = (target.baseMs + parseFloat(jitterVal)).toFixed(1);

        const row = document.createElement('div');
        row.className = 'probe-node-row';
        if (animate) {
          row.style.opacity = '0';
          row.style.transform = 'translateY(8px)';
          setTimeout(() => {
            row.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
          }, i * 70);
        }

        row.innerHTML = `
          <div class="probe-node-col probe-node-info">
            <span class="probe-node-dot"></span>
            <div>
              <div class="probe-node-name">${target.region}</div>
              <div class="probe-node-code"><code>${target.code}</code></div>
            </div>
          </div>
          <div class="probe-node-col">
            <span class="probe-node-ping">${currentMs} ms</span>
            <span class="probe-node-jitter">${target.jitter}</span>
          </div>
          <div class="probe-node-col">
            <span class="probe-badge-status">${target.status}</span>
          </div>
        `;
        probeNodesList.appendChild(row);
      });
    }

    function openProbeModal() {
      if (!probeModal) return;
      probeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.DilipAudio) window.DilipAudio.playPing();
      renderProbeNodes(true);
    }

    function closeProbeModal() {
      if (!probeModal) return;
      probeModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    pingBtn?.addEventListener('click', openProbeModal);
    closeProbeBtn?.addEventListener('click', closeProbeModal);
    probeModal?.addEventListener('click', (e) => {
      if (e.target === probeModal) closeProbeModal();
    });

    runProbeActionBtn?.addEventListener('click', () => {
      runProbeActionBtn.disabled = true;
      runProbeActionBtn.innerHTML = '<span>Probing Multi-Cloud Edges...</span> <span>⏳</span>';
      if (window.DilipAudio) window.DilipAudio.playClick();

      setTimeout(() => {
        renderProbeNodes(true);
        runProbeActionBtn.disabled = false;
        runProbeActionBtn.innerHTML = '<span>Re-Probe Latency Now</span> <span>⚡</span>';
        if (window.DilipAudio) window.DilipAudio.playSuccess();
      }, 700);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && probeModal?.classList.contains('open')) {
        closeProbeModal();
      }
    });
  });
})();
