/* ==========================================================================
   DILIP KUMAR PORTFOLIO — INTERACTIVE CLOUD NETWORK CONSTELLATION
   High-performance 60fps HTML5 Canvas background
   ========================================================================== */

(function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let nodes = [];
  let packets = [];
  let mouse = { x: -9999, y: -9999, radius: 140 };

  const COLORS = {
    azure: { r: 56, g: 189, b: 248 },
    aws: { r: 255, g: 153, b: 0 },
    finops: { r: 16, g: 185, b: 129 }
  };

  const COLOR_KEYS = ['azure', 'aws', 'finops'];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);
    for (let i = 0; i < count; i++) {
      const type = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        type: type,
        color: COLORS[type]
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Sporadic data packets traversing the network
  function spawnPacket(n1, n2) {
    if (packets.length > 20) return;
    packets.push({
      n1: n1,
      n2: n2,
      progress: 0,
      speed: 0.015 + Math.random() * 0.02,
      color: n1.color
    });
  }

  let lastPacketTime = 0;

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Movement
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse repulsion
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        node.x -= (dx / dist) * force * 2.5;
        node.y -= (dy / dist) * force * 2.5;
      }

      // Draw Node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.7)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Connections
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist2 = Math.hypot(node.x - n2.x, node.y - n2.y);
        const maxDist = 135;

        if (dist2 < maxDist) {
          const alpha = (1 - dist2 / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Occasionally spawn a packet
          if (time - lastPacketTime > 400 && Math.random() < 0.003) {
            spawnPacket(node, n2);
            lastPacketTime = time;
          }
        }
      }
    }

    // Render packets
    for (let p = packets.length - 1; p >= 0; p--) {
      const pkt = packets[p];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        packets.splice(p, 1);
        continue;
      }

      const px = pkt.n1.x + (pkt.n2.x - pkt.n1.x) * pkt.progress;
      const py = pkt.n1.y + (pkt.n2.y - pkt.n1.y) * pkt.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  resize();
  requestAnimationFrame(render);
})();
