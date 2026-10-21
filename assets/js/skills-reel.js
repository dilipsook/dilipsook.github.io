/* ==========================================================================
   DILIP KUMAR PORTFOLIO - HOLOGRAPHIC 3D CYBER FACE & SKILLS REEL ENGINE
   Interactive Audio-Visual AI Architect Briefing with 4 Synced Chapters
   ========================================================================== */

(function initSkillsReel() {
  document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('heroVoiceVisualizer');
    const btnPlay = document.getElementById('btnPlaySkillsReel');
    const deck = document.getElementById('skillsReelDeck');
    const chapterPills = document.querySelectorAll('.chapter-pill');
    const subtitleText = document.getElementById('reelSubtitleText');
    const chapterLabel = document.getElementById('reelChapterLabel');
    const timerLabel = document.getElementById('reelTimer');
    const btnMute = document.getElementById('btnMuteNarration');
    const btnRestart = document.getElementById('btnRestartReel');
    const btnTheater = document.getElementById('btnExpandTheater');

    if (!canvas || !btnPlay) return;

    // ------------------------------------------------------------------------
    // 1. Audio Visualizer Canvas Setup
    // ------------------------------------------------------------------------
    const ctx = canvas.getContext('2d');
    let animId = null;
    let isPlaying = false;
    let isMuted = false;
    let currentChapter = 0;
    let chapterTimer = null;
    let tickerInterval = null;
    let secondsElapsed = 0;
    const totalSeconds = 60;

    // Simulated spectrum bars
    const BAR_COUNT = 36;
    const bars = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      bars.push({
        height: Math.random() * 8 + 4,
        targetHeight: 6,
        speed: 0.15 + Math.random() * 0.1
      });
    }

    function drawVisualizer() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / BAR_COUNT) - 3;

      for (let i = 0; i < BAR_COUNT; i++) {
        const b = bars[i];
        if (isPlaying) {
          // Energetic speech frequencies
          const mid = BAR_COUNT / 2;
          const dist = Math.abs(i - mid) / mid;
          const energy = (1 - dist * 0.4) * (Math.random() * 26 + 8);
          b.targetHeight = energy;
        } else {
          // Calm idling pulse
          b.targetHeight = Math.sin(Date.now() * 0.003 + i * 0.3) * 4 + 7;
        }

        b.height += (b.targetHeight - b.height) * b.speed;

        // Gradient color: Cyan to Emerald
        const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - b.height);
        grad.addColorStop(0, '#0284c7');
        grad.addColorStop(0.5, '#38bdf8');
        grad.addColorStop(1, '#34d399');

        ctx.fillStyle = grad;
        const x = i * (barWidth + 3) + 2;
        const y = canvas.height - b.height;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, b.height, [2, 2, 0, 0]);
        ctx.fill();
      }

      animId = requestAnimationFrame(drawVisualizer);
    }

    drawVisualizer();

    // ------------------------------------------------------------------------
    // 2. Web Audio Synthesizer Sound FX
    // ------------------------------------------------------------------------
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.15, volume = 0.08) {
      if (isMuted) return;
      try {
        const actx = getAudioContext();
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, actx.currentTime);
        gain.gain.setValueAtTime(volume, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + duration);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + duration);
      } catch (e) {
        // AudioContext restricted or unsupported
      }
    }

    function playChapterChime() {
      playTone(523.25, 'triangle', 0.12, 0.06); // C5
      setTimeout(() => playTone(659.25, 'sine', 0.18, 0.06), 90); // E5
      setTimeout(() => playTone(783.99, 'sine', 0.25, 0.08), 180); // G5
    }

    // ------------------------------------------------------------------------
    // 3. 4 Synced Chapters & Speech Engine
    // ------------------------------------------------------------------------
    const CHAPTERS = [
      {
        id: 0,
        title: 'CHAPTER 01 • MULTI-CLOUD ENGINEERING',
        shortName: '01 Multi-Cloud',
        speech: "Welcome. I am Dilip Kumar, Multi-Cloud and FinOps Architect at Cognizant. I engineer multi-region resilient architectures across AWS and Microsoft Azure with active-active topologies and 99.999% SLA.",
        chips: ['AWS & Azure Certified', 'SLA 99.999%']
      },
      {
        id: 1,
        title: 'CHAPTER 02 • FINOPS CLOUD ECONOMICS',
        shortName: '02 FinOps ($60K)',
        speech: "Specializing in enterprise cloud economics, I lead financial governance frameworks that delivered over $60,000 every single month in documented cost optimization across compute, database, and storage tiers.",
        chips: ['$60K+/mo Saved FinOps']
      },
      {
        id: 2,
        title: 'CHAPTER 03 • 1,000+ ZERO-DOWNTIME MIGRATIONS',
        shortName: '03 Migrations',
        speech: "Over a decade of progressive infrastructure leadership, I have spearheaded more than 1,000 zero-downtime server and database migrations for Cognizant, Johnson & Johnson, LoanTap, ISRO, and the Indian Air Force.",
        chips: ['1,000+ Zero-Downtime Migrations']
      },
      {
        id: 3,
        title: 'CHAPTER 04 • MODERN IAC & LIFE SCIENCES GXP',
        shortName: '04 IaC & GxP',
        speech: "I automate mission-critical platforms using Terraform, Docker, and Kubernetes, enforcing strict 21 CFR Part 11 and GxP regulatory compliance for Cognizant's Life Sciences LabWare Practice.",
        chips: ['Terraform IaC', 'GxP Compliance']
      }
    ];

    let synthUtterance = null;

    function speakText(text, onComplete) {
      if (!('speechSynthesis' in window) || isMuted) {
        // Fallback timer when speech synthesis is disabled or muted
        const estDuration = Math.max(text.length * 75, 12000);
        chapterTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, estDuration);
        return;
      }

      window.speechSynthesis.cancel();
      synthUtterance = new SpeechSynthesisUtterance(text);
      synthUtterance.rate = 1.05;
      synthUtterance.pitch = 0.98;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Alex')));
      if (preferred) synthUtterance.voice = preferred;

      synthUtterance.onend = () => {
        if (onComplete) onComplete();
      };

      synthUtterance.onerror = () => {
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(synthUtterance);
    }

    function typeSubtitle(fullText) {
      if (!subtitleText) return;
      subtitleText.textContent = '';
      let charIdx = 0;
      clearInterval(tickerInterval);

      tickerInterval = setInterval(() => {
        if (charIdx < fullText.length) {
          subtitleText.textContent += fullText[charIdx];
          charIdx++;
        } else {
          clearInterval(tickerInterval);
        }
      }, 35);
    }

    function playChapter(index) {
      if (index >= CHAPTERS.length) {
        // Finished all chapters!
        stopReel();
        chapterLabel.textContent = 'BRIEFING COMPLETE';
        subtitleText.textContent = 'Executive presentation complete. Scroll down to explore detailed architecture case studies and the interactive FinOps calculator.';
        return;
      }

      currentChapter = index;
      const ch = CHAPTERS[index];

      // Update active pills
      chapterPills.forEach((p, i) => {
        p.classList.toggle('active', i === index);
      });

      // Update Labels
      if (chapterLabel) chapterLabel.textContent = ch.title;
      playChapterChime();
      typeSubtitle(ch.speech);

      // Highlight corresponding floating chip
      highlightChips(ch.chips);

      // Start speaking
      speakText(ch.speech, () => {
        if (isPlaying) {
          playChapter(currentChapter + 1);
        }
      });
    }

    function highlightChips(tags) {
      const allChips = document.querySelectorAll('.hero-floating-chip, .hero-sla-pill');
      allChips.forEach(chip => {
        const text = chip.textContent;
        const matches = tags.some(t => text.toLowerCase().includes(t.toLowerCase().substring(0, 8)));
        if (matches) {
          chip.style.borderColor = '#38bdf8';
          chip.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.6)';
          chip.style.transform = 'scale(1.08)';
          setTimeout(() => {
            chip.style.borderColor = '';
            chip.style.boxShadow = '';
            chip.style.transform = '';
          }, 4500);
        }
      });
    }

    function startReel() {
      isPlaying = true;
      deck?.classList.add('playing', 'active');
      btnPlay.innerHTML = `
        <span class="play-icon-triangle">❚❚</span>
        <span class="play-btn-label">PAUSE ARCHITECT BRIEFING</span>
        <span class="audio-waves-mini"><span></span><span></span><span></span><span></span><span></span></span>
      `;
      getAudioContext();
      playChapter(currentChapter);

      // Elapsed timer
      clearInterval(window.reelProgressInterval);
      window.reelProgressInterval = setInterval(() => {
        if (!isPlaying) return;
        secondsElapsed++;
        if (secondsElapsed > totalSeconds) secondsElapsed = totalSeconds;
        const mins = Math.floor(secondsElapsed / 60);
        const secs = secondsElapsed % 60;
        if (timerLabel) {
          timerLabel.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs} / 1:00`;
        }
      }, 1000);
    }

    function pauseReel() {
      isPlaying = false;
      deck?.classList.remove('playing');
      btnPlay.innerHTML = `
        <span class="play-icon-triangle">▶</span>
        <span class="play-btn-label">RESUME BRIEFING</span>
        <span class="audio-waves-mini"><span></span><span></span><span></span><span></span><span></span></span>
      `;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      clearTimeout(chapterTimer);
    }

    function stopReel() {
      isPlaying = false;
      deck?.classList.remove('playing');
      btnPlay.innerHTML = `
        <span class="play-icon-triangle">▶</span>
        <span class="play-btn-label">PLAY ARCHITECT BRIEFING (60s)</span>
        <span class="audio-waves-mini"><span></span><span></span><span></span><span></span><span></span></span>
      `;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      clearTimeout(chapterTimer);
      clearInterval(tickerInterval);
      clearInterval(window.reelProgressInterval);
    }

    // ------------------------------------------------------------------------
    // 4. Event Listeners & Controls
    // ------------------------------------------------------------------------
    btnPlay.addEventListener('click', () => {
      if (isPlaying) {
        pauseReel();
      } else {
        if ('speechSynthesis' in window && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          isPlaying = true;
          deck?.classList.add('playing');
          btnPlay.innerHTML = `
            <span class="play-icon-triangle">❚❚</span>
            <span class="play-btn-label">PAUSE ARCHITECT BRIEFING</span>
            <span class="audio-waves-mini"><span></span><span></span><span></span><span></span><span></span></span>
          `;
        } else {
          startReel();
        }
      }
    });

    chapterPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        stopReel();
        currentChapter = idx;
        secondsElapsed = idx * 15;
        startReel();
      });
    });

    btnRestart?.addEventListener('click', () => {
      stopReel();
      currentChapter = 0;
      secondsElapsed = 0;
      if (timerLabel) timerLabel.textContent = '0:00 / 1:00';
      startReel();
    });

    btnMute?.addEventListener('click', () => {
      isMuted = !isMuted;
      btnMute.textContent = isMuted ? '🔇 Voice OFF' : '🔊 Voice ON';
      if (isMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      } else if (!isMuted && isPlaying) {
        playChapter(currentChapter);
      }
    });

    // Theater Mode Trigger: Focuses page on Hero and auto-plays
    btnTheater?.addEventListener('click', () => {
      const hero = document.getElementById('overview');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (!isPlaying) startReel();
        }, 500);
      }
    });

  });
})();
