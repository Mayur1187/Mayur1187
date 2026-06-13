/* ============================================
   MAYUR RANGE PORTFOLIO - ANIMATIONS JS
   Scroll reveal, counters
   ============================================ */

'use strict';

// ══════════════════════════════════════════
// INTERSECTION OBSERVER - SCROLL REVEALS
// ══════════════════════════════════════════
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep visible once triggered
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealClasses = [
    '.reveal',
    '.reveal-left',
    '.reveal-right',
    '.reveal-scale',
    '.stagger-children',
    '.experience-list'
  ];

  revealClasses.forEach(cls => {
    document.querySelectorAll(cls).forEach(el => observer.observe(el));
  });
}

// ══════════════════════════════════════════
// ANIMATED COUNTERS
// ══════════════════════════════════════════
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = prefix + current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = prefix + target + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const duration = parseInt(entry.target.dataset.duration) || 2000;
        animateCounter(entry.target, target, duration);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ══════════════════════════════════════════
// SECTION BACKGROUND PARALLAX
// ══════════════════════════════════════════
function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.1 + i * 0.05;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// ══════════════════════════════════════════
// PROGRESS BARS (for skill levels)
// ══════════════════════════════════════════
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ══════════════════════════════════════════
// SKILL TAG STAGGER ANIMATION
// ══════════════════════════════════════════
function initSkillTags() {
  const categories = document.querySelectorAll('.skill-category');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          tag.style.opacity = '0';
          tag.style.transform = 'scale(0.8)';
          setTimeout(() => {
            tag.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
          }, i * 60);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  categories.forEach(cat => observer.observe(cat));
}

// ══════════════════════════════════════════
// INIT ALL ANIMATIONS
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initParallax();
  initProgressBars();
  initSkillTags();
});
