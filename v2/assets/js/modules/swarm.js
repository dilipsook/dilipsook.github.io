/**
 * SWARM MULTIPLAYER CURSOR ANIMATION MODULE
 * Boids flocking simulation + DOM scanning + Tour mode
 */

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
  'EKS-CORE'
];

class Boid {
  constructor(id, x, y, color, tag) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.maxSpeed = 3.5;
    this.maxForce = 0.12;
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
      if (dist > 10) {
        targetForce.x = (dx / dist) * this.maxSpeed - this.vx;
        targetForce.y = (dy / dist) * this.maxSpeed - this.vy;
      }
    }

    // Flocking: Separation
    let sep = { x: 0, y: 0 };
    let count = 0;
    for (let other of boids) {
      if (other !== this) {
        let d = Math.hypot(this.x - other.x, this.y - other.y);
        if (d > 0 && d < 45) {
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
    this.vx += (targetForce.x * 0.08 + sep.x * 0.15) * speedFactor;
    this.vy += (targetForce.y * 0.08 + sep.y * 0.15) * speedFactor;

    // Limit speed
    const spd = Math.hypot(this.vx, this.vy);
    const effMax = this.maxSpeed * speedFactor;
    if (spd > effMax) {
      this.vx = (this.vx / spd) * effMax;
      this.vy = (this.vy / spd) * effMax;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Bounds wrap
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (this.x < -20) this.x = w + 20;
    if (this.x > w + 20) this.x = -20;
    if (this.y < -20) this.y = h + 20;
    if (this.y > h + 20) this.y = -20;

    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }
}

class SwarmSimulation {
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
  }

  init() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'swarmCanvasContainer';
    document.body.appendChild(this.container);

    // Target box
    this.targetBox = document.createElement('div');
    this.targetBox.className = 'swarm-target-box';
    this.container.appendChild(this.targetBox);

    // Create HUD
    this.hud = document.createElement('div');
    this.hud.className = 'swarm-hud-bar';
    this.hud.innerHTML = `
      <div class="swarm-hud-dots">
        <span class="swarm-hud-dot" style="background:#00f0ff;"></span>
        <span class="swarm-hud-dot" style="background:#ff3366;"></span>
        <span class="swarm-hud-dot" style="background:#00ff88;"></span>
      </div>
      <div class="swarm-hud-text">
        <span class="swarm-hud-status-badge">SWARM ACTIVE</span>
        <span id="swarmStatusLabel">Scanning Page...</span>
      </div>
      <button class="swarm-hud-btn active" id="btnSwarmSpeed1">1x</button>
      <button class="swarm-hud-btn" id="btnSwarmSpeed2">2x</button>
      <button class="swarm-hud-btn" id="btnSwarmPause">Pause</button>
      <button class="swarm-hud-close" id="btnSwarmClose" title="Exit Motion">✕</button>
    `;
    document.body.appendChild(this.hud);

    // Event listeners for HUD
    document.getElementById('btnSwarmSpeed1').addEventListener('click', () => this.setSpeed(1.0));
    document.getElementById('btnSwarmSpeed2').addEventListener('click', () => this.setSpeed(2.0));
    document.getElementById('btnSwarmPause').addEventListener('click', () => this.togglePause());
    document.getElementById('btnSwarmClose').addEventListener('click', () => this.stop());

    // Keyboard shortcut Alt + Shift + S
    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        this.toggle();
      }
    });
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
    this.container.classList.add('active');
    this.hud.classList.add('visible');

    // Collect DOM target anchors
    this.collectTargets();

    // Spawn 16 boids
    this.boids = [];
    const count = Math.min(16, AGENT_TAGS.length);
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

    // Tour timer every 4 seconds to cycle through page sections
    this.tourInterval = setInterval(() => {
      if (!this.paused) {
        this.nextTarget();
      }
    }, 4500);

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

    // Clear boid DOM elements
    for (let b of this.boids) {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
    }
    this.boids = [];

    const btn = document.getElementById('btnNavMotion');
    if (btn) btn.classList.remove('active');
  }

  togglePause() {
    this.paused = !this.paused;
    const btn = document.getElementById('btnSwarmPause');
    if (btn) btn.textContent = this.paused ? 'Play' : 'Pause';
    const status = document.getElementById('swarmStatusLabel');
    if (status) status.textContent = this.paused ? 'Paused' : 'Touring Page...';
  }

  setSpeed(s) {
    this.speed = s;
    const b1 = document.getElementById('btnSwarmSpeed1');
    const b2 = document.getElementById('btnSwarmSpeed2');
    if (s === 1.0) {
      b1.classList.add('active');
      b2.classList.remove('active');
    } else {
      b2.classList.add('active');
      b1.classList.remove('active');
    }
  }

  collectTargets() {
    const candidates = document.querySelectorAll(
      '.hero-name-pill, .flagship-card, .matrix-card, .portrait-noir-card, .philosophy-quote-box, .finops-calculator-deck, .contact-email-bar'
    );
    this.targets = Array.from(candidates);
  }

  assignTarget() {
    if (!this.targets || this.targets.length === 0) return;
    const el = this.targets[this.currentTargetIndex % this.targets.length];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Highlight target bounding box
    this.targetBox.style.display = 'block';
    this.targetBox.style.left = `${rect.left - 6}px`;
    this.targetBox.style.top = `${rect.top - 6}px`;
    this.targetBox.style.width = `${rect.width + 12}px`;
    this.targetBox.style.height = `${rect.height + 12}px`;

    // Assign flock points around the element
    this.boids.forEach((boid, idx) => {
      const angle = (idx / this.boids.length) * Math.PI * 2;
      const radius = Math.min(rect.width, rect.height) * 0.45 + 30;
      boid.target = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });

    const status = document.getElementById('swarmStatusLabel');
    if (status) {
      status.textContent = `Inspecting Layer [${this.currentTargetIndex + 1}/${this.targets.length}]`;
    }
  }

  nextTarget() {
    this.currentTargetIndex++;
    this.collectTargets();
    this.assignTarget();
  }

  loop() {
    if (!this.active) return;
    if (!this.paused) {
      for (let b of this.boids) {
        b.update(this.targets, this.boids, this.speed);
      }
    }
    this.rafId = requestAnimationFrame(() => this.loop());
  }
}

let swarmInstance = null;

export function initSwarm() {
  if (!swarmInstance) {
    swarmInstance = new SwarmSimulation();
    swarmInstance.init();
  }
  return swarmInstance;
}

export function toggleSwarm() {
  const swarm = initSwarm();
  swarm.toggle();
}
