/**
 * Tab Presence & Dynamic Title Engine
 * Keeps the browser tab informative, engaging, and perfectly sized to fit within one tab (<30 chars)
 * Shows core value propositions (Cloud Architect, FinOps $60K+, AWS & Azure, 10+ Yrs Exp)
 */
(function() {
  'use strict';

  // High-impact executive highlights designed to fit inside a single browser tab (~28-30 chars)
  const executiveHighlights = [
    'Dilip Kumar • Cloud Architect',
    'Dilip Kumar • FinOps ($60K+/mo)',
    'Dilip Kumar • Dual AWS & Azure',
    'Dilip Kumar • 10+ Yrs Cloud Lead',
    'Dilip Kumar • 1,000+ Migrations',
    'Dilip Kumar • Cognizant Manager'
  ];

  // Inactive tab prompts when visitor switches away
  const inactiveTitles = [
    '👋 Dilip Kumar • Cloud Architect',
    '⚡ 1,000+ Migrations • Dilip',
    '💰 $60K+/mo FinOps • Dilip'
  ];

  let currentHighlightIndex = 0;
  let rotateInterval = null;
  let isPageVisible = !document.hidden;
  let currentSectionTitle = null;
  let isAudioPlaying = false;

  function updateTitle(newTitle) {
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  }

  function startHighlightRotation() {
    stopHighlightRotation();
    rotateInterval = setInterval(() => {
      if (!isPageVisible || currentSectionTitle || isAudioPlaying) return;
      currentHighlightIndex = (currentHighlightIndex + 1) % executiveHighlights.length;
      updateTitle(executiveHighlights[currentHighlightIndex]);
    }, 3800);
  }

  function stopHighlightRotation() {
    if (rotateInterval) {
      clearInterval(rotateInterval);
      rotateInterval = null;
    }
  }

  // Handle Tab Switch (Page Visibility API)
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (document.hidden) {
      stopHighlightRotation();
      let inactiveIdx = 0;
      updateTitle(inactiveTitles[0]);
      // Alternate between inactive prompts every 3.5 seconds
      rotateInterval = setInterval(() => {
        inactiveIdx = (inactiveIdx + 1) % inactiveTitles.length;
        updateTitle(inactiveTitles[inactiveIdx]);
      }, 3500);
    } else {
      stopHighlightRotation();
      updateTitle('✨ Welcome Back! • Dilip Kumar');
      setTimeout(() => {
        updateTitle(executiveHighlights[currentHighlightIndex]);
        startHighlightRotation();
      }, 2200);
    }
  });

  // Section Observer for context-aware titles
  const sectionMap = {
    'overview': null, // default to rotation
    'architecture': 'Dilip Kumar • Cloud Pillars',
    'projects': 'Dilip Kumar • Case Studies',
    'finops': 'Dilip Kumar • FinOps Engine',
    'experience': 'Dilip Kumar • Career Journey',
    'skills': 'Dilip Kumar • 79 Tech Skills',
    'gallery': 'Dilip Kumar • Arch Story',
    'certifications': 'Dilip Kumar • AWS/Azure Certs',
    'contact': 'Dilip Kumar • Get In Touch'
  };

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (sectionMap.hasOwnProperty(id)) {
          currentSectionTitle = sectionMap[id];
          if (currentSectionTitle && isPageVisible && !isAudioPlaying) {
            updateTitle(currentSectionTitle);
          } else if (!currentSectionTitle && isPageVisible && !isAudioPlaying) {
            updateTitle(executiveHighlights[currentHighlightIndex]);
          }
        }
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', () => {
    // Set initial clean title
    updateTitle(executiveHighlights[0]);
    startHighlightRotation();

    // Observe all sections
    Object.keys(sectionMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Listen to Skills Reel Audio briefing events
    const audioBtn = document.getElementById('btnPlaySkillsReel');
    if (audioBtn) {
      const audioObserver = new MutationObserver(() => {
        const deck = document.getElementById('skillsReelDeck');
        const isPlaying = deck && deck.classList.contains('playing');
        if (isPlaying && !isAudioPlaying) {
          isAudioPlaying = true;
          updateTitle('▶ Playing Briefing • Dilip');
        } else if (!isPlaying && isAudioPlaying) {
          isAudioPlaying = false;
          updateTitle(currentSectionTitle || executiveHighlights[currentHighlightIndex]);
        }
      });
      const deck = document.getElementById('skillsReelDeck');
      if (deck) {
        audioObserver.observe(deck, { attributes: true, attributeFilter: ['class'] });
      }
    }
  });

})();
