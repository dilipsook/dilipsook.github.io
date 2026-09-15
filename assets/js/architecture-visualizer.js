/* ==========================================================================
   INTERACTIVE MULTI-CLOUD ARCHITECTURE TOPOLOGY VISUALIZER
   Animated packet flow canvas, multi-topology switcher, and live node inspector
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const topologies = {
    'jnj': {
      title: 'Johnson & Johnson: Enterprise Multi-AZ LIMS Platform (AWS)',
      badge: 'HEALTHCARE COMPLIANT · MULTI-AZ HIGH AVAILABILITY',
      themeColor: '#38bdf8',
      nodes: [
        {
          id: 'jnj-dns',
          title: 'Route 53 & Anycast DNS',
          subtitle: 'Global Edge Ingress',
          icon: '🌐',
          type: 'Network Ingress',
          sla: '100% SLA',
          status: 'HEALTHY',
          metrics: { 'Latency': '< 15ms', 'Protection': 'AWS Shield Standard', 'Resolution': 'Latency-based' },
          details: 'Configured Amazon Route 53 with health checks and latency-based DNS routing to ensure seamless failover across availability zones.'
        },
        {
          id: 'jnj-nlb',
          title: 'AWS WAF & Network Load Balancer',
          subtitle: 'Multi-AZ Layer 4 / Layer 7 Distribution',
          icon: '🛡️',
          type: 'Load Balancer',
          sla: '99.99% Uptime',
          status: 'ACTIVE',
          metrics: { 'Throughput': 'Multi-Gigabit', 'WAF Rules': 'SQLi, XSS, Rate-Limit', 'TLS': 'v1.3 Strict' },
          details: 'Dual-tier ingress security using AWS WAF rulesets fronting a high-throughput Network Load Balancer distributing traffic across 10+ virtual machines.'
        },
        {
          id: 'jnj-app',
          title: 'WebLogic EC2 Application Fleet',
          subtitle: 'Private Multi-AZ Subnets',
          icon: '⚙️',
          type: 'Compute Fleet',
          sla: '99.95% Availability',
          status: 'OPERATIONAL',
          metrics: { 'Fleet Size': '10+ Instances', 'Stack': 'Oracle WebLogic 14c', 'Deploy': 'Automated EAR' },
          details: 'Isolated compute tier in non-routable private subnets, running clustered Oracle WebLogic server instances with automated patch baselines via SSM.'
        },
        {
          id: 'jnj-db',
          title: 'AWS RDS Multi-AZ Database',
          subtitle: 'Synchronous Standby Failover',
          icon: '🗄️',
          type: 'Managed Database',
          sla: 'RPO: 0 | RTO: < 60s',
          status: 'SYNCHRONIZED',
          metrics: { 'Replication': 'Synchronous Standby', 'Backups': 'Automated Daily + PITR', 'Encryption': 'AWS KMS AES-256' },
          details: 'Mission-critical database tier configured with automatic synchronous multi-AZ standby failover, zero data loss guarantee, and 35-day point-in-time recovery.'
        },
        {
          id: 'jnj-storage',
          title: 'Encrypted S3 & CloudWatch',
          subtitle: 'Compliance Telemetry & Cold Archive',
          icon: '📦',
          type: 'Storage & Audit',
          sla: '99.999999999% Durability',
          status: 'COMPLIANT',
          metrics: { 'Audit Logs': 'CloudTrail Immutable', 'Storage': 'S3 Intelligent-Tiering', 'Alerts': 'SNS + PagerDuty' },
          details: 'Healthcare regulatory compliance enforced via immutable CloudTrail audit logs, automated S3 lifecycle transitions, and real-time CloudWatch alarm thresholds.'
        }
      ]
    },
    'dhani': {
      title: 'Dhani Financial Services: FinOps Optimization Pipeline (AWS)',
      badge: 'FINOPS EXCELLENCE · $28,000/MONTH DOCUMENTED SAVINGS',
      themeColor: '#10b981',
      nodes: [
        {
          id: 'dhani-telemetry',
          title: 'Cost Explorer & Compute Optimizer',
          subtitle: 'Telemetry & Workload Profiling',
          icon: '📊',
          type: 'Governance Engine',
          sla: 'Continuous Audit',
          status: 'ANALYZING',
          metrics: { 'Fleet Audited': '150+ EC2 Instances', 'Overprovisioned': '42% Flagged', 'Sampling': '14-Day Baseline' },
          details: 'Initiated deep architectural audit across Dhani multi-account footprint using AWS Cost Explorer and ML-driven AWS Compute Optimizer recommendations.'
        },
        {
          id: 'dhani-rightsize',
          title: 'Automated Instance Rightsizing',
          subtitle: 'Graviton & Modern Generation Cutover',
          icon: '⚡',
          type: 'Compute Optimization',
          sla: 'Zero Performance Degradation',
          status: 'OPTIMIZED',
          metrics: { 'Instances Rightsized': '100+ Nodes', 'Generation': 'Migrated to c6g/m6g', 'Immediate Savings': '$12,000/mo' },
          details: 'Systematically executed zero-downtime rolling rightsizing of 100+ over-allocated EC2 instances, upgrading older generations to cost-efficient AWS Graviton processors.'
        },
        {
          id: 'dhani-commitments',
          title: 'Savings Plans & Reserved Instances',
          subtitle: 'Strategic Long-Term Cost Governance',
          icon: '💰',
          type: 'Pricing Commitments',
          sla: '3-Year Flexibility',
          status: 'ACTIVE COMMITMENT',
          metrics: { 'Discount Achieved': 'Up to 62%', 'Coverage Rate': '88% Steady-State', 'Recurring Savings': '$10,500/mo' },
          details: 'Structured customized Compute Savings Plans and Convertible Reserved Instances for steady-state production workloads, securing up to 62% discounts.'
        },
        {
          id: 'dhani-storage',
          title: 'S3 Intelligent-Tiering & Lifecycle',
          subtitle: 'Automated Storage Optimization',
          icon: '🗂️',
          type: 'Storage FinOps',
          sla: 'Zero Retrieval Penalty',
          status: 'AUTO-TIERING',
          metrics: { 'Data Managed': '45+ Terabytes', 'EBS Unattached': '100% Cleaned', 'Storage Savings': '$5,500/mo' },
          details: 'Automated policy-driven data tiering using S3 Intelligent-Tiering, purging orphaned EBS snapshots, and sweeping unattached elastic IPs across all regions.'
        },
        {
          id: 'dhani-impact',
          title: 'Executive Financial Outcome',
          subtitle: 'Total Documented Cost Reduction',
          icon: '🏆',
          type: 'Business Metric',
          sla: 'Recurrent Monthly Impact',
          status: 'VERIFIED',
          metrics: { 'Monthly Saved': '$28,000 / month', 'Annual Impact': '$336,000 / year', 'ROI Realized': '3.8x Target' },
          details: 'Delivered an audited recurring savings of $28,000 every single month with zero application latency regression, earning praise from executive leadership.'
        }
      ]
    },
    'isro': {
      title: 'ISRO (SDSC SHAR): High-Security Isolated VDI Infrastructure',
      badge: 'AEROSPACE ENCLAVE · 100-SEAT AIR-GAPPED VDI',
      themeColor: '#f59e0b',
      nodes: [
        {
          id: 'isro-terminals',
          title: '100x Dell Wyse Thin Clients',
          subtitle: 'Secure Engineer Workstations',
          icon: '🖥️',
          type: 'Hardware Endpoints',
          sla: 'Dedicated Aerospace Lab',
          status: 'DEPLOYED',
          metrics: { 'Total Terminals': '100 Terminals', 'OS': 'ThinOS Encrypted', 'Peripherals': 'Hardened USB Locks' },
          details: 'Installed and configured 100 enterprise Dell Wyse hardware thin client terminals for aerospace scientists and payload engineers at SDSC SHAR.'
        },
        {
          id: 'isro-network',
          title: 'Air-Gapped Fiber Network',
          subtitle: 'Zero Internet Egress Enclave',
          icon: '🔒',
          type: 'Isolated Network',
          sla: '100% Air-Gapped',
          status: 'ISOLATED',
          metrics: { 'External Access': 'ZERO (Physically Isolated)', 'Core Switches': 'Cisco 10G Redundant', 'VLANs': 'Segmented Security' },
          details: 'Physically isolated internal network with zero internet routing, isolated VLANs, and hardware firewall rules to guarantee complete aerospace intellectual property security.'
        },
        {
          id: 'isro-horizon',
          title: 'VMware Horizon View Cluster',
          subtitle: 'High-Performance Session Brokers',
          icon: '🎛️',
          type: 'VDI Orchestrator',
          sla: 'Sub-10ms Display Latency',
          status: 'LOAD BALANCED',
          metrics: { 'Concurrent Sessions': '100 Active Desktops', 'Protocol': 'Blast Extreme / PCoIP', 'Broker': 'Horizon View 7.x' },
          details: 'Engineered high-density VMware Horizon View Connection Server brokers providing instant desktop provisioning and low-latency graphical display performance.'
        },
        {
          id: 'isro-compute',
          title: 'VMware ESXi Enterprise Cluster',
          subtitle: 'Redundant Hypervisor Compute Fleet',
          icon: '🏢',
          type: 'Virtualization Host',
          sla: 'N+1 Redundancy',
          status: 'HIGH AVAILABILITY',
          metrics: { 'Hypervisors': 'Fujitsu Primergy Blades', 'Clustering': 'vSphere HA + DRS', 'RAM Provisioned': '512 GB Tier' },
          details: 'Built resilient VMware ESXi cluster with automated DRS load distribution and HA failover to guarantee uninterrupted simulation runs.'
        },
        {
          id: 'isro-storage',
          title: 'Fujitsu Eternus DX-500 SAN',
          subtitle: 'Dual-Controller 10G SFP Fiber SAN',
          icon: '💾',
          type: 'Enterprise SAN Storage',
          sla: 'Zero Data Loss',
          status: 'ONLINE',
          metrics: { 'RAID Level': 'Hardware RAID-5', 'Channel': '10G SFP Optical Fabric', 'Enclosures': '9 Dense SAS Shelves' },
          details: 'Connected 9 storage shelves to Fujitsu Eternus DX-500 dual-controller SAN storage over redundant 10G SFP optical transceivers for mission-critical telemetry persistence.'
        }
      ]
    }
  };

  let currentKey = 'jnj';
  let activeNodeIndex = 0;
  let animId = null;

  const tabsContainer = document.getElementById('archTabs');
  const nodesContainer = document.getElementById('archNodesGrid');
  const canvas = document.getElementById('archCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  // Inspector Elements
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorSubtitle = document.getElementById('inspectorSubtitle');
  const inspectorType = document.getElementById('inspectorType');
  const inspectorSla = document.getElementById('inspectorSla');
  const inspectorStatus = document.getElementById('inspectorStatus');
  const inspectorDetails = document.getElementById('inspectorDetails');
  const inspectorMetrics = document.getElementById('inspectorMetrics');
  const archHeaderTitle = document.getElementById('archHeaderTitle');
  const archBadge = document.getElementById('archBadge');

  if (!canvas || !ctx || !nodesContainer) return;

  function renderTabs() {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    Object.keys(topologies).forEach(key => {
      const topo = topologies[key];
      const btn = document.createElement('button');
      btn.className = 'arch-tab-btn ' + (key === currentKey ? 'active' : '');
      const icon = key === 'jnj' ? '🏥' : key === 'dhani' ? '💰' : '🚀';
      btn.innerHTML = '<span>' + icon + '</span> <span>' + topo.title.split(':')[0] + '</span>';
      btn.addEventListener('click', () => {
        if (currentKey === key) return;
        currentKey = key;
        activeNodeIndex = 0;
        document.querySelectorAll('.arch-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        switchTopology();
      });
      tabsContainer.appendChild(btn);
    });
  }

  let packets = [];
  function initPackets() {
    packets = [];
    for (let i = 0; i < 8; i++) {
      packets.push({
        from: Math.floor(Math.random() * 4),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.006,
        size: 3 + Math.random() * 2.5
      });
    }
  }

  function resizeCanvas() {
    if (!canvas || !nodesContainer) return;
    const rect = nodesContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  window.addEventListener('resize', resizeCanvas);

  function switchTopology() {
    const topo = topologies[currentKey];
    if (archHeaderTitle) archHeaderTitle.textContent = topo.title;
    if (archBadge) {
      archBadge.textContent = topo.badge;
      archBadge.style.color = topo.themeColor;
      archBadge.style.borderColor = topo.themeColor;
    }

    renderNodes();
    inspectNode(0);
    initPackets();
    setTimeout(resizeCanvas, 50);
  }

  function renderNodes() {
    const topo = topologies[currentKey];
    nodesContainer.innerHTML = '';

    topo.nodes.forEach((node, idx) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'arch-node-card ' + (idx === activeNodeIndex ? 'active' : '');
      nodeEl.setAttribute('data-node-id', node.id);

      nodeEl.innerHTML = `
        <div class="node-step-number">0${idx + 1}</div>
        <div class="node-icon">${node.icon}</div>
        <div class="node-meta">
          <div class="node-title">${node.title}</div>
          <div class="node-sub">${node.subtitle}</div>
        </div>
        <div class="node-status-pill">
          <span class="status-pulse-dot" style="background: ${topo.themeColor};"></span>
          <span>${node.status}</span>
        </div>
      `;

      nodeEl.addEventListener('click', () => {
        activeNodeIndex = idx;
        document.querySelectorAll('.arch-node-card').forEach(n => n.classList.remove('active'));
        nodeEl.classList.add('active');
        inspectNode(idx);
      });

      nodesContainer.appendChild(nodeEl);
    });
  }

  function inspectNode(idx) {
    const topo = topologies[currentKey];
    const node = topo.nodes[idx];
    if (!node) return;

    if (inspectorTitle) inspectorTitle.textContent = node.title;
    if (inspectorSubtitle) inspectorSubtitle.textContent = node.subtitle;
    if (inspectorType) inspectorType.textContent = node.type;
    if (inspectorSla) inspectorSla.textContent = node.sla;
    if (inspectorStatus) {
      inspectorStatus.textContent = '● ' + node.status;
      inspectorStatus.style.color = topo.themeColor;
    }
    if (inspectorDetails) inspectorDetails.textContent = node.details;

    if (inspectorMetrics) {
      inspectorMetrics.innerHTML = '';
      Object.entries(node.metrics).forEach(([k, v]) => {
        const metricDiv = document.createElement('div');
        metricDiv.className = 'telemetry-metric-item';
        metricDiv.innerHTML = '<span class="metric-label">' + k + '</span><span class="metric-value" style="color: ' + topo.themeColor + ';">' + v + '</span>';
        inspectorMetrics.appendChild(metricDiv);
      });
    }
  }

  function animatePackets() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodeCards = nodesContainer.querySelectorAll('.arch-node-card');
    if (nodeCards.length < 2) {
      animId = requestAnimationFrame(animatePackets);
      return;
    }

    const containerRect = nodesContainer.getBoundingClientRect();
    const centers = [];

    nodeCards.forEach(card => {
      const r = card.getBoundingClientRect();
      centers.push({
        x: (r.left + r.width / 2) - containerRect.left,
        y: (r.top + r.height / 2) - containerRect.top
      });
    });

    const topo = topologies[currentKey];
    const color = topo.themeColor || '#38bdf8';

    // Draw connecting cables
    for (let i = 0; i < centers.length - 1; i++) {
      const p1 = centers[i];
      const p2 = centers[i + 1];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw glowing animated packets
    packets.forEach(p => {
      const p1 = centers[p.from];
      const p2 = centers[p.from + 1];

      if (p1 && p2) {
        const curX = p1.x + (p2.x - p1.x) * p.progress;
        const curY = p1.y + (p2.y - p1.y) * p.progress;

        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(curX, curY, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.from = Math.floor(Math.random() * (centers.length - 1));
      }
    });

    animId = requestAnimationFrame(animatePackets);
  }

  renderTabs();
  switchTopology();
  resizeCanvas();
  animatePackets();
});
