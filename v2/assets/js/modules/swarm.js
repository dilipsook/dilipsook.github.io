/**
 * SWARM MULTIPLAYER CURSOR ANIMATION MODULE (v2)
 * Faithful implementation of the Swarm experience from the reference video:
 * - 20 colorful boids flocking using Craig Reynolds algorithm
 * - Blueprint bounding box inspection with technical corner brackets
 * - Autonomous smooth auto-scrolling tour across key sections
 * - Interactive element trigger simulations (visualizer tabs, traffic surge, finops slider)
 * - Video HUD bar: [🔴 🟡 🟢 🔵] 20 agents 117 / 252 layers — Touring 1x ⏸ ✕
 * - Tour completion banner: Rebuilt by 20 agents in 49.6s [ Go Live ] [ Replay ]
 */

import { selectLayer } from './deployments.js';

const AGENT_COLORS = [
  '#00f0ff', // Electric Cyan
  '#ff3366', // Crimson Coral
  '#b026ff', // Cyber Violet
  '#00ff88', // Emerald Mint
  '#ffea00', // Neon Gold
  '#ff7700', // Blaze Orange
  '#38bdf8', // Azure Sky
  '#e879f9'  // Fuchsia
];

const AGENT_TAGS = [
  'DK-LEAD',
  'FINOPS-ENG',
  'AWS-SA',
  'AZURE-700',
  'GxP-VAL',
  'MIGRATE-01',
  'AIR-GAP',
  'K8S-POD',
  'ORACLE-RAC',
  'TERRAFORM',
  '21-CFR-11',
  'SLA-999',
  'CSPM-SEC',
  'CUR-QUERY',
  'ZERO-TRUST',
  'EKS-CORE',
  'DIRECT-CONNECT',
  'SAVINGS-PLAN',
  'ATHENA-SQL',
  'SOVEREIGN-NET'
];

class Boid {
  constructor(id, x, y, color, tag) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.maxSpeed = 3.6;
    this.color = color;
    this.tag = tag;
    this.target = null;

    // DOM element
    this.el = document.createElement('div');
    this.el.className = 'swarm-cursor';
    this.el.innerHTML = `
      <svg class="swarm-cursor-arrow" viewBox="0 0 24 24" fill="${this.color}" stroke="#000000" stroke-width="1.2">
        <path d="M4.5 3L19 12L12 14L9 20L4.5 3Z" />
      </svg>
      <div class="swarm-cursor-tag" style="background-color: ${this.color};">${this.tag}</div>
    `;
  }

  update(targets, boids, speedFactor) {
    let targetForce = { x: 0, y: 0 };
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 8) {
        targetForce.x = (dx / dist) * this.maxSpeed - this.vx;
        targetForce.y = (dy / dist) * this.maxSpeed - this.vy;
      }
    }

    // Separation
    let sep = { x: 0, y: 0 };
    let count = 0;
    for (let other of boids) {
      if (other !== this) {
        let d = Math.hypot(this.x - other.x, this.y - other.y);
        if (d > 0 && d < 42) {
          sep.x += (this.x - other.x) / d;
          sep.y += (this.y - other.y) / d;
          count++;
        }
      }
    }
    if (count > 0) {
      sep.x /= count;
      sep.y /= count;
    }

    // Apply forces
    this.vx += (targetForce.x * 0.09 + sep.x * 0.16) * speedFactor;
    this.vy += (targetForce.y * 0.09 + sep.y * 0.16) * speedFactor;

    // Speed limits
    const spd = Math.hypot(this.vx, this.vy);
    const effMax = this.maxSpeed * speedFactor;
    if (spd > effMax) {
      this.vx = (this.vx / spd) * effMax;
      this.vy = (this.vy / spd) * effMax;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Keep on screen viewport
    const pad = 30;
    if (this.x < pad) this.vx += 0.5;
    if (this.x > window.innerWidth - pad) this.vx -= 0.5;
    if (this.y < pad) this.vy += 0.5;
    if (this.y > window.innerHeight - pad) this.vy -= 0.5;

    // Update DOM position
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }
}

class SwarmEngine {
  constructor() {
    this.active = false;
    this.paused = false;
    this.speed = 1.0;
    this.boids = [];
    this.targets = [];
    this.currentTargetIndex = 0;
    this.container = null;
    this.hud = null;
    this.targetBox = null;
    this.rafId = null;
    this.tourInterval = null;
    this.startTime = 0;
  }

  init() {
    // 1. Create Swarm Layer Container
    this.container = document.createElement('div');
    this.container.id = 'swarmCanvasContainer';
    document.body.appendChild(this.container);

    // 2. Blueprint Inspection Bounding Box
    this.targetBox = document.createElement('div');
    this.targetBox.className = 'swarm-target-box';
    this.targetBox.innerHTML = `
      <div class="target-corner top-left"></div>
      <div class="target-corner top-right"></div>
      <div class="target-corner bottom-left"></div>
      <div class="target-corner bottom-right"></div>
      <div class="target-badge-label" id="targetBadgeLabel">[ SCANNING: CORE ]</div>
    `;
    this.container.appendChild(this.targetBox);

    // 3. Create Video Matching HUD
    this.hud = document.createElement('div');
    this.hud.className = 'swarm-hud-bar';
    this.hud.innerHTML = `
      <div class="swarm-hud-content" id="swarmHudContent">
        <div class="swarm-hud-dots">
          <span class="swarm-hud-dot" style="background:#ff3344;"></span>
          <span class="swarm-hud-dot" style="background:#ffea00;"></span>
          <span class="swarm-hud-dot" style="background:#00ff88;"></span>
          <span class="swarm-hud-dot" style="background:#00f0ff;"></span>
        </div>
        <div class="swarm-hud-text">
          <span class="swarm-hud-counter" id="swarmAgentCounter">20 agents</span>
          <span class="swarm-hud-layers" id="swarmLayersCounter">117 / 252 layers</span>
          <span class="swarm-hud-sep">&mdash;</span>
          <span class="swarm-hud-status-badge" id="swarmStatusBadge">Touring</span>
        </div>
        <button class="swarm-hud-btn active" id="btnSwarmSpeed" title="Cycle speed">1x</button>
        <button class="swarm-hud-btn" id="btnSwarmPause" title="Pause / Play">⏸</button>
        <button class="swarm-hud-close" id="btnSwarmClose" title="Exit Motion">✕</button>
      </div>
      <div class="swarm-completion-banner" id="swarmCompletionBanner" style="display: none;">
        <span class="completion-text">Rebuilt by 20 agents in <span id="completionTime">49.6s</span></span>
        <button class="btn-completion-action" id="btnCompletionGoLive">Go Live</button>
        <button class="btn-completion-action highlight" id="btnCompletionReplay">Replay</button>
      </div>
    `;
    document.body.appendChild(this.hud);

    // HUD Listeners
    document.getElementById('btnSwarmSpeed').addEventListener('click', () => {
      this.speed = this.speed === 1.0 ? 2.0 : 1.0;
      document.getElementById('btnSwarmSpeed').textContent = `${this.speed}x`;
    });
    document.getElementById('btnSwarmPause').addEventListener('click', () => this.togglePause());
    document.getElementById('btnSwarmClose').addEventListener('click', () => this.stop());

    // Completion Banner Listeners
    document.getElementById('btnCompletionGoLive').addEventListener('click', () => this.stop());
    document.getElementById('btnCompletionReplay').addEventListener('click', () => this.replay());

    // Shortcut: Alt + Shift + S
    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        this.toggle();
      }
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      if (this.active) {
        this.updateTargetBoundingBox();
      }
    });

    // Auto-start swarm animation matching video presentation
    setTimeout(() => {
      this.start();
    }, 600);
  }

  toggle() {
    if (this.active) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.paused = false;
    this.startTime = Date.now();
    this.currentTargetIndex = 0;

    this.container.classList.add('active');
    this.hud.classList.add('visible');
    document.getElementById('swarmHudContent').style.display = 'flex';
    document.getElementById('swarmCompletionBanner').style.display = 'none';

    // Collect DOM target anchors
    this.collectTargets();

    // Spawn 20 agents matching video
    this.boids = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const color = AGENT_COLORS[i % AGENT_COLORS.length];
      const tag = AGENT_TAGS[i % AGENT_TAGS.length];
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const boid = new Boid(i, startX, startY, color, tag);
      this.container.appendChild(boid.el);
      this.boids.push(boid);
    }

    this.assignTarget();
    this.loop();

    // Tour timer every 4.2 seconds
    this.tourInterval = setInterval(() => {
      if (!this.paused) {
        this.nextTarget();
      }
    }, 4200);

    const btn = document.getElementById('btnNavMotion');
    if (btn) btn.classList.add('active');
  }

  stop() {
    this.active = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.tourInterval) clearInterval(this.tourInterval);

    this.container.classList.remove('active');
    this.hud.classList.remove('visible');
    this.targetBox.style.display = 'none';

    for (let b of this.boids) {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
    }
    this.boids = [];

    const btn = document.getElementById('btnNavMotion');
    if (btn) btn.classList.remove('active');
  }

  replay() {
    this.stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.start();
    }, 400);
  }

  togglePause() {
    this.paused = !this.paused;
    const btn = document.getElementById('btnSwarmPause');
    if (btn) btn.textContent = this.paused ? '▶' : '⏸';
    const status = document.getElementById('swarmStatusBadge');
    if (status) status.textContent = this.paused ? 'Paused' : 'Touring';
  }

  collectTargets() {
    const candidates = [
      { sel: '.hero-name-pill', label: 'NAME: DILIP.' },
      { sel: '.portrait-noir-card', label: 'PORTRAIT: SOVEREIGN' },
      { sel: '#skillsReelDeck', label: 'AI ARCHITECT REEL' },
      { sel: '.philosophy-quote-box', label: 'PHILOSOPHY' },
      { sel: '.tech-spec-cards-wrap', label: 'TECH SPECS' },
      { sel: '#visualizer', label: 'TOPOLOGY SIMULATOR: MULTI-AZ' },
      { sel: '#flagshipContainer', label: 'FLAGSHIP DEPLOYMENTS' },
      { sel: '#experience', label: 'CAREER TIMELINE' },
      { sel: '#projects', label: 'ENTERPRISE MISSIONS' },
      { sel: '#matrix', label: 'SYSTEMS MATRIX' },
      { sel: '#skills', label: 'CAPABILITIES STACK' },
      { sel: '#vision', label: 'ARCHITECTURAL VISION' },
      { sel: '#finops', label: 'FINOPS FRAMEWORK: $134K' },
      { sel: '#certifications', label: 'VERIFIED CREDENTIALS' },
      { sel: '#contact', label: 'DIRECT DISPATCH' }
    ];

    this.targets = [];
    candidates.forEach(c => {
      const el = document.querySelector(c.sel);
      if (el) {
        this.targets.push({ el, label: c.label });
      }
    });
  }

  assignTarget() {
    if (!this.targets || this.targets.length === 0) return;

    if (this.currentTargetIndex >= this.targets.length) {
      this.onTourComplete();
      return;
    }

    const item = this.targets[this.currentTargetIndex];
    const el = item.el;
    if (!el) return;

    // Smoothly scroll the browser window to follow the swarm tour!
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const absoluteElementTop = rect.top + scrollTop;
    const targetScrollY = Math.max(0, absoluteElementTop - window.innerHeight / 3.5);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    // Update blueprint bounding box position
    this.updateTargetBoundingBox();

    // Interactive Trigger Simulations:
    // 1. If at Visualizer, click traffic surge button after 1s!
    if (item.label.includes('TOPOLOGY SIMULATOR')) {
      setTimeout(() => {
        const spikeBtn = document.getElementById('simulateTrafficBtn');
        if (spikeBtn && !spikeBtn.classList.contains('active')) {
          spikeBtn.click();
          setTimeout(() => {
            if (spikeBtn.classList.contains('active')) spikeBtn.click();
          }, 2400);
        }
      }, 800);
    }

    // 2. If at FinOps, animate slider spend!
    if (item.label.includes('FINOPS')) {
      setTimeout(() => {
        const slider = document.getElementById('spendSlider');
        if (slider) {
          slider.value = 65000;
          slider.dispatchEvent(new Event('input'));
          setTimeout(() => {
            slider.value = 35000;
            slider.dispatchEvent(new Event('input'));
          }, 2000);
        }
      }, 700);
    }

    // Update HUD counters
    const layersVal = Math.min(252, Math.floor(40 + (this.currentTargetIndex / this.targets.length) * 212));
    const layersEl = document.getElementById('swarmLayersCounter');
    if (layersEl) layersEl.textContent = `${layersVal} / 252 layers`;
  }

  updateTargetBoundingBox() {
    if (!this.targets || !this.targets[this.currentTargetIndex]) return;
    const item = this.targets[this.currentTargetIndex];
    const el = item.el;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    this.targetBox.style.display = 'block';
    this.targetBox.style.left = `${Math.max(4, rect.left - 8)}px`;
    this.targetBox.style.top = `${Math.max(4, rect.top - 8)}px`;
    this.targetBox.style.width = `${Math.min(window.innerWidth - 8, rect.width + 16)}px`;
    this.targetBox.style.height = `${rect.height + 16}px`;

    const labelEl = document.getElementById('targetBadgeLabel');
    if (labelEl) labelEl.textContent = `[ ${item.label} ]`;

    // Assign flock target coordinates around element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.boids.forEach((boid, idx) => {
      const angle = (idx / this.boids.length) * Math.PI * 2;
      const radiusX = Math.min(rect.width / 2 + 30, 220);
      const radiusY = Math.min(rect.height / 2 + 30, 150);
      boid.target = {
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY
      };
    });
  }

  nextTarget() {
    this.currentTargetIndex++;
    this.assignTarget();
  }

  onTourComplete() {
    const elapsedSeconds = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const hudContent = document.getElementById('swarmHudContent');
    const compBanner = document.getElementById('swarmCompletionBanner');
    const compTime = document.getElementById('completionTime');

    if (compTime) compTime.textContent = `${elapsedSeconds}s`;
    if (hudContent) hudContent.style.display = 'none';
    if (compBanner) compBanner.style.display = 'flex';

    const contactCard = document.querySelector('.contact-info-card');
    if (contactCard) {
      const rect = contactCard.getBoundingClientRect();
      this.boids.forEach((boid, idx) => {
        const offset = (idx - 10) * 16;
        boid.target = {
          x: Math.min(window.innerWidth - 60, rect.right + 40),
          y: rect.top + rect.height / 2 + offset
        };
      });
    }
  }

  loop() {
    if (!this.active) return;

    this.updateTargetBoundingBox();

    for (let b of this.boids) {
      b.update(this.targets, this.boids, this.speed);
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }
}

let engineInstance = null;

export function initSwarm() {
  if (!engineInstance) {
    engineInstance = new SwarmEngine();
    engineInstance.init();
  }
  return engineInstance;
}

export function toggleSwarm() {
  if (engineInstance) {
    engineInstance.toggle();
  }
}
