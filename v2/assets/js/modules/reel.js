/**
 * AI ARCHITECT REEL & SKILLS BRIEFING MODULE (v2)
 * Interactive Audio-Visual AI Architect Briefing with 4 Synced Chapters
 * Matches Image 5: AI ARCHITECT REEL • COGNIZANT ISG
 */

export function initSkillsReel() {
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

  // Spectrum bars
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
    const barWidth = (canvas.width / BAR_COUNT) - 2.5;

    for (let i = 0; i < BAR_COUNT; i++) {
      const b = bars[i];
      if (isPlaying) {
        const mid = BAR_COUNT / 2;
        const dist = Math.abs(i - mid) / mid;
        const energy = (1 - dist * 0.4) * (Math.random() * 24 + 6);
        b.targetHeight = energy;
      } else {
        b.targetHeight = Math.sin(Date.now() * 0.003 + i * 0.3) * 3 + 5;
      }

      b.height += (b.targetHeight - b.height) * b.speed;

      const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - b.height);
      grad.addColorStop(0, '#00f0ff');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#10b981');

      ctx.fillStyle = grad;
      const x = i * (barWidth + 2.5) + 2;
      const y = canvas.height - b.height;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, b.height, [2, 2, 0, 0]);
      } else {
        ctx.rect(x, y, barWidth, b.height);
      }
      ctx.fill();
    }

    animId = requestAnimationFrame(drawVisualizer);
  }

  drawVisualizer();

  // ------------------------------------------------------------------------
  // 2. Synthesizer Tone Engine
  // ------------------------------------------------------------------------
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  // Pre-unlock AudioContext on first user interaction (touch/click)
  const unlockAudio = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener('click', unlockAudio, { once: true, capture: true });
  window.addEventListener('touchstart', unlockAudio, { once: true, capture: true, passive: true });

  function playTone(freq, type = 'sine', duration = 0.15, volume = 0.08) {
    if (isMuted) return;
    try {
      const actx = getAudioContext();
      if (!actx) return;
      if (actx.state === 'suspended') actx.resume().catch(() => {});
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
      // AudioContext unavailable
    }
  }

  function playChapterChime() {
    playTone(523.25, 'triangle', 0.12, 0.06);
    setTimeout(() => playTone(659.25, 'sine', 0.18, 0.06), 90);
    setTimeout(() => playTone(783.99, 'sine', 0.25, 0.08), 180);
  }

  // ------------------------------------------------------------------------
  // 3. Chapters & Narration
  // ------------------------------------------------------------------------
  const CHAPTERS = [
    {
      id: 0,
      title: 'CHAPTER 01 • MULTI-CLOUD ENGINEERING',
      shortName: '01 Cloud Arch',
      speech: "Welcome. I am Dilip Kumar, Multi-Cloud and FinOps Architect at Cognizant. I engineer multi-region resilient architectures across AWS and Microsoft Azure with active-active topologies and 99.999% SLA."
    },
    {
      id: 1,
      title: 'CHAPTER 02 • FINOPS CLOUD ECONOMICS',
      shortName: '02 FinOps',
      speech: "Specializing in enterprise cloud economics, I lead financial governance frameworks that delivered over $60,000 every single month in documented cost optimization across compute, database, and storage tiers."
    },
    {
      id: 2,
      title: 'CHAPTER 03 • 1,000+ ZERO-DOWNTIME MIGRATIONS',
      shortName: '03 Migrations',
      speech: "Over a decade of progressive infrastructure leadership, I have spearheaded more than 1,000 zero-downtime server and database migrations for Cognizant, Johnson & Johnson, LoanTap, ISRO, and the Indian Air Force."
    },
    {
      id: 3,
      title: 'CHAPTER 04 • MODERN IAC & LIFE SCIENCES GXP',
      shortName: '04 IaC & GxP',
      speech: "I automate mission-critical platforms using Terraform, Docker, and Kubernetes, enforcing strict 21 CFR Part 11 and GxP regulatory compliance for Cognizant's Life Sciences LabWare Practice."
    }
  ];

  let synthUtterance = null;
  let speechWatchdog = null;

  function speakText(text, onComplete) {
    clearInterval(speechWatchdog);
    if (!('speechSynthesis' in window) || isMuted) {
      const estDuration = Math.max(text.length * 72, 10000);
      chapterTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, estDuration);
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch (_) {}

    // Allow cancel() to complete before queuing next utterance
    setTimeout(() => {
      if (!isPlaying || isMuted) return;

      synthUtterance = new SpeechSynthesisUtterance(text);
      // Store globally to prevent garbage collection dropping speech mid-sentence
      window.__activeUtterance = synthUtterance;
      synthUtterance.rate = 1.02;
      synthUtterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices() || [];
      const preferred = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Samantha')));
      if (preferred) synthUtterance.voice = preferred;

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        clearInterval(speechWatchdog);
        clearTimeout(chapterTimer);
        window.__activeUtterance = null;
        if (onComplete) onComplete();
      };

      synthUtterance.onend = done;
      synthUtterance.onerror = (e) => {
        console.warn('[speechSynthesis error]', e);
        done();
      };

      // Watchdog: Chrome speech synthesis sometimes pauses after 15s; this unblocks it
      speechWatchdog = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(speechWatchdog);
        } else if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 3500);

      // Safety timeout: ensure chapter finishes even if mobile browser drops onend
      const maxMs = Math.max(text.length * 90 + 4000, 14000);
      chapterTimer = setTimeout(done, maxMs);

      try {
        window.speechSynthesis.speak(synthUtterance);
        // Resume immediately in case browser started it paused
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      } catch (err) {
        console.warn('[speechSynthesis.speak error]', err);
        done();
      }
    }, 60);
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
    }, 32);
  }

  function playChapter(index) {
    if (index >= CHAPTERS.length) {
      stopReel();
      if (chapterLabel) chapterLabel.textContent = 'BRIEFING COMPLETE';
      if (subtitleText) subtitleText.textContent = 'Executive presentation complete. Scroll down to explore detailed architecture case studies and the interactive FinOps calculator.';
      return;
    }

    currentChapter = index;
    const ch = CHAPTERS[index];

    chapterPills.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });

    if (chapterLabel) chapterLabel.textContent = ch.title;
    playChapterChime();
    typeSubtitle(ch.speech);

    speakText(ch.speech, () => {
      if (isPlaying) {
        playChapter(currentChapter + 1);
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

  // Event Listeners
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

  btnTheater?.addEventListener('click', () => {
    const hero = document.getElementById('overview');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (!isPlaying) startReel();
      }, 500);
    }
  });
}
