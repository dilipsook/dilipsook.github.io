(function () {
  'use strict';

  /* ── SCROLL PROGRESS BAR ─────────────────────────────── */
  var bar = document.getElementById('scroll-progress-bar');
  function updateProgress() {
    var h = document.documentElement;
    var scrolled = h.scrollTop || document.body.scrollTop;
    var height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
    var pct = height > 0 ? (scrolled / height) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* ── BACK TO TOP ─────────────────────────────────────── */
  var backTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    if (!backTop) return;
    if (window.pageYOffset > 500) backTop.classList.add('show');
    else backTop.classList.remove('show');
  }, { passive: true });

  /* ── CURSOR GLOW + DOT (pointer:fine devices only) ────── */
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    var glow = document.getElementById('cursor-glow');
    var dot = document.getElementById('cursor-dot');
    var mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (dot) {
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
        dot.classList.add('active');
      }
      if (glow) glow.classList.add('active');
    });
    (function raf() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      if (glow) glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      requestAnimationFrame(raf);
    })();

    var hoverables = 'a, button, .btn-floating, .card, .skill-icon, input, textarea, .card-title.activator';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hoverables) && dot) dot.classList.add('hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hoverables) && dot) dot.classList.remove('hover');
    });
  }

  /* ── ANIMATED NAV INDICATOR ───────────────────────────── */
  (function () {
    var nav = document.querySelector('ul.side-nav.fixed');
    var indicator = document.getElementById('nav-indicator');
    if (!nav || !indicator) return;

    function place() {
      var active = nav.querySelector('li:not(.logo) a.active');
      if (!active) { indicator.style.opacity = '0'; return; }
      var navRect = nav.getBoundingClientRect();
      var linkRect = active.getBoundingClientRect();
      indicator.style.top = (linkRect.top - navRect.top + nav.scrollTop) + 'px';
      indicator.style.height = linkRect.height + 'px';
      indicator.style.opacity = '1';
    }

    var mo = new MutationObserver(place);
    nav.querySelectorAll('li:not(.logo) a').forEach(function (a) {
      mo.observe(a, { attributes: true, attributeFilter: ['class'] });
    });
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    setTimeout(place, 600);
    setTimeout(place, 1400);
  })();

  /* ── SKILL ICON STAGGER (sets --si per icon within its row) ─ */
  (function () {
    var rows = document.querySelectorAll('#skills .row.text-center');
    rows.forEach(function (row) {
      var icons = row.querySelectorAll('.skill-icon');
      icons.forEach(function (icon, i) { icon.style.setProperty('--si', i % 12); });
    });

    // Re-trigger the pop animation each time a skills card scrolls into view
    var cards = document.querySelectorAll('#skills .card, #certifications .card');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-icon').forEach(function (icon) {
              icon.style.animation = 'none';
              // force reflow then restore
              void icon.offsetWidth;
              icon.style.animation = '';
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(function (c) { obs.observe(c); });
    }
  })();

  /* ── CARD TILT ON HOVER (subtle, desktop only) ────────── */
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      var raf = null;
      card.addEventListener('mousemove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'translateY(-6px) rotateX(' + (py * -3) + 'deg) rotateY(' + (px * 3) + 'deg)';
          raf = null;
        });
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── MAGNETIC BUTTONS ──────────────────────────────────── */
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.contact-btn, #back-to-top').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (mx * 0.25) + 'px,' + (my * 0.25) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }
})();
