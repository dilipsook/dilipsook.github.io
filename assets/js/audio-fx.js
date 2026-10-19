/* ==========================================================================
   HIGH-TECH WEB AUDIO SYNTHESIZER (Native Web Audio API)
   Generates ultra-subtle futuristic UI sounds (0 external audio files needed)
   ========================================================================== */

(function() {
  'use strict';

  let audioCtx = null;
  let isMuted = localStorage.getItem('dilip-audio-muted') === 'true';

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Futuristic Soft Click
  function playClick() {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy guard
    }
  }

  // High-Tech Ping / Command Palette Open
  function playPing() {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.03); // A5
      osc.frequency.setValueAtTime(1174.66, audioCtx.currentTime + 0.06); // D6

      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  // Success Chime (e.g. Cutover simulation or probe complete)
  function playSuccess() {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    try {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.05);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.05 + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + i * 0.05);
        osc.stop(audioCtx.currentTime + i * 0.05 + 0.15);
      });
    } catch (e) {}
  }

  function setMuted(muted) {
    isMuted = muted;
    localStorage.setItem('dilip-audio-muted', muted);
    const audioBtn = document.getElementById('hudAudioBtn');
    const audioIcon = document.getElementById('audioIcon');
    const dockAudioBtn = document.getElementById('dockAudioBtn');
    const dockAudioIcon = document.getElementById('dockAudioIcon');
    if (audioIcon) audioIcon.textContent = isMuted ? '🔇' : '🔊';
    if (dockAudioIcon) dockAudioIcon.textContent = isMuted ? '🔇' : '🔊';
    if (audioBtn) audioBtn.setAttribute('title', isMuted ? 'Unmute Tech Audio' : 'Mute Tech Audio');
    if (dockAudioBtn) dockAudioBtn.setAttribute('title', isMuted ? 'Unmute Tech Audio' : 'Mute Tech Audio');
  }

  function toggleMute() {
    setMuted(!isMuted);
    if (!isMuted) playClick();
  }

  // Expose to window
  window.DilipAudio = {
    playClick,
    playPing,
    playSuccess,
    toggleMute,
    isMuted: () => isMuted
  };

  document.addEventListener('DOMContentLoaded', () => {
    const audioBtn = document.getElementById('hudAudioBtn');
    const dockAudioBtn = document.getElementById('dockAudioBtn');
    setMuted(isMuted);
    audioBtn?.addEventListener('click', toggleMute);
    dockAudioBtn?.addEventListener('click', toggleMute);

    // Attach subtle audio feedback to interactive controls
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, .btn-primary, .btn-secondary, .nav-link, .filter-btn, .term-chip, .skill-tab-btn, .blueprint-mode-btn, .dock-item');
      if (target && target.id !== 'hudAudioBtn' && target.id !== 'dockAudioBtn') {
        playClick();
      }
    });
  });
})();
