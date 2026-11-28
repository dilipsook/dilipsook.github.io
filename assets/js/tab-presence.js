/**
 * Tab Presence & Dynamic Title Engine
 * Keeps the browser tab informative, engaging, and perfectly sized to fit within one tab (<25 chars)
 * Ensures 100% visibility without browser truncation (...)
 * Shows core value propositions (Cloud Architect, FinOps $60K+, AWS & Azure, 10+ Yrs Exp)
 */
(function() {
  'use strict';

  // High-impact executive highlights designed to fit inside a single browser tab (<= 25 chars)
  // Tested to never truncate with an ellipsis (...) in Chrome, Edge, Safari, Brave, and Firefox
  const executiveHighlights = [
    'Dilip Kumar | Architect',
    'Dilip Kumar | FinOps $60K',
    'Dilip Kumar | AWS & Azure',
    'Dilip Kumar | Cloud Lead',
    'Dilip Kumar | 1K+ Migrs',
    'Dilip Kumar | Cognizant'
  ];

  // Inactive tab prompts when visitor switches away (<= 25 chars)
  const inactiveTitles = [
    '👋 Dilip Kumar | Lead',
    '⚡ 1,000+ Migrations',
    '💰 $60K+/mo FinOps ROI'
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
      updateTitle('✨ Dilip Kumar | Online');
      setTimeout(() => {
        updateTitle(currentSectionTitle || executiveHighlights[currentHighlightIndex]);
        startHighlightRotation();
      }, 2000);
    }
  });

  // Section Observer for context-aware titles (< 25 chars each)
  const sectionMap = {
    'overview': null, // default to rotation
    'architecture': 'Dilip Kumar | Pillars',
    'projects': 'Dilip Kumar | Projects',
    'finops': 'Dilip Kumar | FinOps',
    'experience': 'Dilip Kumar | Journey',
    'skills': 'Dilip Kumar | 79 Skills',
    'gallery': 'Dilip Kumar | Arch Story',
    'certifications': 'Dilip Kumar | Certs',
    'contact': 'Dilip Kumar | Contact'
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
          updateTitle('▶ Briefing Playing...');
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
