/* ==========================================================================
   DILIP KUMAR PORTFOLIO — 144Hz HIGH-REFRESH RATE MOMENTUM SCROLL ENGINE
   Critically-damped subpixel lerp physics, delta-time compensation across
   60Hz/120Hz/144Hz/240Hz, GPU-composited HUD transforms, & zero-jank mobile touch
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Core DOM Elements
  const scrollBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.getElementById('scrollProgressCircle');
  const topProgressBar = document.getElementById('topScrollProgress');
  const sideScrollHud = document.getElementById('sideScrollHud');
  const hudScrollText = document.getElementById('hudScrollText');
  const hudSectionName = document.getElementById('hudSectionName');
  const sideRailTrack = document.getElementById('sideRailTrack');
  const sideRailThumb = document.getElementById('sideRailThumb');
  const railWaypoints = document.querySelectorAll('.rail-waypoint');

  // SVG Circular Ring Setup
  let circumference = 144.5;
  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value || 23;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
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

  function getActiveSection(currentScroll) {
    const scrollPos = currentScroll + 220;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollPos) {
        return sections[i];
      }
    }
    return sections[0];
  }

  // ---------------------------------------------------------------------------
  // GPU-Composited Visual Updates (144Hz Reflow-Free Subpixel Transforms)
  // ---------------------------------------------------------------------------
  function updateIndicators(scrollTop) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = 0;

    if (scrollHeight > 0) {
      scrollPercent = Math.min(1, Math.max(0, scrollTop / scrollHeight));

      // 1. Update SVG Circular Ring
      if (progressCircle) {
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }

      // 2. Update Top Aurora Progress Line via GPU scaleX (Zero Reflow)
      if (topProgressBar) {
        topProgressBar.style.transform = `scaleX(${scrollPercent})`;
      }

      // 3. Update In-Page Side Rail Thumb via GPU translate3d (Zero Reflow)
      if (sideRailTrack && sideRailThumb) {
        const trackHeight = sideRailTrack.clientHeight;
        const thumbHeight = sideRailThumb.clientHeight || 38;
        const maxTravel = Math.max(0, trackHeight - thumbHeight);
        const yPos = scrollPercent * maxTravel;
        sideRailThumb.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
      }

      // 4. Update Floating Side Scroll HUD Pill
      if (sideScrollHud && hudScrollText) {
        const percentInt = Math.round(scrollPercent * 100);
        hudScrollText.textContent = `${percentInt}%`;

        const activeSec = getActiveSection(scrollTop);
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

  // ---------------------------------------------------------------------------
  // 144Hz Delta-Time Compensated Momentum Physics Engine
  // ---------------------------------------------------------------------------
  let currentY = window.pageYOffset || document.documentElement.scrollTop;
  let targetY = currentY;
  let isRunning = false;
  let lastTime = 0;
  let currentLambda = 0.108; // Critically-damped spring factor

  function tickPhysics(now) {
    if (!isRunning) return;

    if (!lastTime) lastTime = now;
    const elapsed = now - lastTime;
    lastTime = now;

    // Normalize delta time to 60fps (16.667ms reference).
    // On 144Hz monitors, elapsed is ~6.94ms, so dt is ~0.416.
    // Exponential formula: alpha = 1 - Math.exp(-lambda * dt) guarantees
    // the exact same physical curve on 60Hz, 120Hz, 144Hz, and 240Hz screens.
    const dt = Math.min(Math.max(elapsed / 16.667, 0.1), 3.0);
    const alpha = 1 - Math.exp(-currentLambda * dt);

    currentY += (targetY - currentY) * alpha;

    if (Math.abs(targetY - currentY) < 0.35) {
      currentY = targetY;
      window.scrollTo({ top: currentY, behavior: 'auto' });
      updateIndicators(currentY);
      isRunning = false;
      lastTime = 0;
      return;
    }

    window.scrollTo({ top: currentY, behavior: 'auto' });
    updateIndicators(currentY);
    requestAnimationFrame(tickPhysics);
  }

  function smoothScrollTo(destY, stiffness = 0.115) {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    targetY = Math.max(0, Math.min(destY, maxScroll));
    currentLambda = stiffness;

    if (!isRunning) {
      isRunning = true;
      lastTime = performance.now();
      requestAnimationFrame(tickPhysics);
    }
  }

  // Helper: check if pointer/event is inside an interactive scrollable container (modals, terminals)
  function isInsideScrollable(el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    if (el.closest && el.closest('#terminalModal.open, #commandPaletteModal.open, #projectModal.open, .modal-open, .terminal-modal.open, .cmd-modal.open, .finops-modal.open')) {
      return true;
    }
    let cur = el;
    while (cur && cur !== document.body && cur !== document.documentElement) {
      const style = window.getComputedStyle(cur);
      const ov = style.overflowY;
      if ((ov === 'auto' || ov === 'scroll') && cur.scrollHeight > cur.clientHeight + 4) {
        return true;
      }
      cur = cur.parentElement;
    }
    return false;
  }

  // Expose for modal hooks & debugging
  window.isInsideScrollable = isInsideScrollable;
  window.smoothScrollTo = smoothScrollTo;

  // ---------------------------------------------------------------------------
  // Desktop Wheel Interception with Trackpad Auto-Detection
  // ---------------------------------------------------------------------------
  window.addEventListener('wheel', (e) => {
    // Pass-through browser zoom (Ctrl + wheel)
    if (e.ctrlKey) return;

    // Do NOT intercept if hovering inside open modals or scrollable elements
    if (isInsideScrollable(e.target)) return;

    // Intercept standard wheel to apply 144Hz momentum smoothing
    e.preventDefault();

    // Trackpad emits small fractional deltaY values; stepped mouse wheels emit larger integer multiples (e.g. 100, 120)
    const isTrackpad = Math.abs(e.deltaY) < 32 || (e.deltaY % 1 !== 0);
    currentLambda = isTrackpad ? 0.28 : 0.108;

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 34; // Line mode
    else if (e.deltaMode === 2) delta *= window.innerHeight; // Page mode
    else if (!isTrackpad) delta *= 1.12; // Natural momentum curve for stepped wheels

    targetY = Math.max(0, Math.min(targetY + delta, maxScroll));

    if (!isRunning) {
      isRunning = true;
      lastTime = performance.now();
      requestAnimationFrame(tickPhysics);
    }
  }, { passive: false });

  // ---------------------------------------------------------------------------
  // Touch Handling: Zero-Jank Mobile Compositor Pass-Through
  // ---------------------------------------------------------------------------
  window.addEventListener('touchstart', () => {
    // Seamlessly hand off to native mobile GPU touch inertia on touch devices
    if (isRunning) {
      isRunning = false;
      lastTime = 0;
    }
    currentY = targetY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  // Native window scroll sync (runs during mobile touch flick, native scrollbar drag, etc.)
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!isRunning) {
      currentY = targetY = window.pageYOffset || document.documentElement.scrollTop;
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          updateIndicators(currentY);
          scrollTicking = false;
        });
      }
    }
  }, { passive: true });

  // ---------------------------------------------------------------------------
  // Keyboard Navigation: 144Hz Smooth Gliding
  // ---------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
      return;
    }
    if (isInsideScrollable(active)) return;

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let handled = false;

    switch (e.key) {
      case 'ArrowDown':
        smoothScrollTo(targetY + 110, 0.13);
        handled = true;
        break;
      case 'ArrowUp':
        smoothScrollTo(targetY - 110, 0.13);
        handled = true;
        break;
      case 'PageDown':
        smoothScrollTo(targetY + window.innerHeight * 0.85, 0.095);
        handled = true;
        break;
      case 'PageUp':
        smoothScrollTo(targetY - window.innerHeight * 0.85, 0.095);
        handled = true;
        break;
      case ' ':
        if (e.shiftKey) {
          smoothScrollTo(targetY - window.innerHeight * 0.85, 0.095);
        } else {
          smoothScrollTo(targetY + window.innerHeight * 0.85, 0.095);
        }
        handled = true;
        break;
      case 'Home':
        smoothScrollTo(0, 0.09);
        handled = true;
        break;
      case 'End':
        smoothScrollTo(maxScroll, 0.09);
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
    }
  });

  // ---------------------------------------------------------------------------
  // Anchor Link Smooth Navigation (Navbar & In-Page CTAs)
  // ---------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#' && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const navHeight = 72;
          const targetOffset = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight);
          smoothScrollTo(targetOffset, 0.092);

          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            const burgerBtn = document.getElementById('burgerBtn');
            burgerBtn?.click();
          }
        }
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Back to Top Button
  // ---------------------------------------------------------------------------
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(0, 0.088);
    });
  }

  // ---------------------------------------------------------------------------
  // Floating Side HUD Pill Click Action
  // ---------------------------------------------------------------------------
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
      const activeSec = getActiveSection(currentY);
      const currIndex = sections.findIndex(s => s.id === activeSec.id);
      if (currIndex >= 0 && currIndex < sections.length - 1) {
        const nextEl = document.getElementById(sections[currIndex + 1].id);
        if (nextEl) {
          const navHeight = 72;
          smoothScrollTo(nextEl.offsetTop - navHeight, 0.095);
          return;
        }
      }
      smoothScrollTo(0, 0.088);
    });
  }

  // ---------------------------------------------------------------------------
  // Side Rail Track & Waypoint Setup (Click & Pointer Drag Support)
  // ---------------------------------------------------------------------------
  function initWaypoints() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    railWaypoints.forEach(wp => {
      const targetId = wp.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const pct = Math.min(100, Math.max(0, (targetEl.offsetTop / scrollHeight) * 100));
        wp.style.top = `${pct}%`;
        wp.addEventListener('click', (e) => {
          e.stopPropagation();
          const navHeight = 72;
          smoothScrollTo(targetEl.offsetTop - navHeight, 0.095);
        });
      }
    });
  }

  if (sideRailTrack) {
    setTimeout(initWaypoints, 400);
    window.addEventListener('resize', initWaypoints);

    let isPointerDragging = false;

    function handleTrackInteraction(clientY) {
      const rect = sideRailTrack.getBoundingClientRect();
      const clickY = clientY - rect.top;
      const pct = Math.min(1, Math.max(0, clickY / rect.height));
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      smoothScrollTo(pct * scrollHeight, 0.12);
    }

    sideRailTrack.addEventListener('pointerdown', (e) => {
      isPointerDragging = true;
      sideRailTrack.setPointerCapture?.(e.pointerId);
      handleTrackInteraction(e.clientY);
    });

    sideRailTrack.addEventListener('pointermove', (e) => {
      if (isPointerDragging) {
        handleTrackInteraction(e.clientY);
      }
    });

    sideRailTrack.addEventListener('pointerup', (e) => {
      isPointerDragging = false;
      sideRailTrack.releasePointerCapture?.(e.pointerId);
    });

    sideRailTrack.addEventListener('pointercancel', () => {
      isPointerDragging = false;
    });
  }

  // Initial draw
  updateIndicators(currentY);
});
