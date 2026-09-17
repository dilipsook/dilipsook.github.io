/* ==========================================================================
   SCROLL PROGRESS RING & FLOATING BACK-TO-TOP ROCKET
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.getElementById('scrollProgressCircle');
  
  if (!scrollBtn || !progressCircle) return;

  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = circumference + ' ' + circumference;
  progressCircle.style.strokeDashoffset = circumference;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight);
      const offset = circumference - (scrollPercent * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }

    if (scrollTop > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
