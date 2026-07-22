/* ============================================================
   CEARÁ ECONOMIC OUTLOOK — GSAP Animations & Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ── Respect reduced motion ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ── Navigation scroll effect ──
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  // ── Hero Particles ──
  const particlesContainer = document.getElementById('hero-particles');
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particlesContainer.appendChild(particle);

    gsap.to(particle, {
      y: -100 - Math.random() * 200,
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: 4 + Math.random() * 6,
      repeat: -1,
      delay: Math.random() * 4,
      ease: 'none'
    });
  }

  // ── Hero Entrance Animations ──
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .from('#hero-bg-img', { scale: 1.2, duration: 2 })
    .from('#hero-eyebrow', { y: 30, opacity: 0, duration: 0.8 }, 0.3)
    .from('.hero-line', { y: 60, opacity: 0, duration: 1, stagger: 0.15 }, 0.5)
    .from('#hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, 1)
    .from('.hero-stat-card', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'back.out(1.4)'
    }, 1.2)
    .from('#hero-cta', { y: 20, opacity: 0, duration: 0.6 }, 1.6)
    .from('#scroll-indicator', { opacity: 0, duration: 0.5 }, 2);

  // ── Stat Counter Animation ──
  function animateCounters(selector, trigger) {
    document.querySelectorAll(selector).forEach(el => {
      const target = parseFloat(el.dataset.target);
      if (isNaN(target)) return;

      const decimals = (target % 1 !== 0) ? 1 : 0;
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: trigger || el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = obj.val.toFixed(decimals);
            }
          });
        }
      });
    });
  }

  animateCounters('.stat-value[data-target]', '#hero-stats');
  animateCounters('.big-num[data-target]');

  // ── Overview Section ──
  gsap.from('#gdp-card', {
    scrollTrigger: { trigger: '#gdp-card', start: 'top 85%' },
    y: 60, opacity: 0, rotationX: 10, duration: 0.9, ease: 'power3.out', clearProps: 'transform'
  });

  gsap.from('#sector-card', {
    scrollTrigger: { trigger: '#sector-card', start: 'top 85%' },
    y: 60, opacity: 0, rotationX: 10, duration: 0.9, delay: 0.15, ease: 'power3.out', clearProps: 'transform'
  });

  gsap.from('#labor-card', {
    scrollTrigger: { trigger: '#labor-card', start: 'top 85%' },
    y: 60, opacity: 0, rotationX: 10, duration: 0.9, delay: 0.3, ease: 'power3.out', clearProps: 'transform'
  });

  // ── Animate Bar Chart ──
  ScrollTrigger.create({
    trigger: '#gdp-chart',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.bar.ceara').forEach(bar => {
        const val = parseFloat(bar.dataset.value);
        bar.style.width = (val / 4) * 100 + '%';
      });
      document.querySelectorAll('.bar.brazil').forEach(bar => {
        const val = parseFloat(bar.dataset.value);
        bar.style.width = (val / 4) * 100 + '%';
      });
    }
  });

  // ── Animate Ring Charts ──
  ScrollTrigger.create({
    trigger: '.sector-rings',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.ring').forEach(ring => {
        const percent = parseInt(ring.dataset.percent);
        const circle = ring.querySelector('.ring-fill');
        const circumference = 2 * Math.PI * 52; // r=52
        const offset = circumference - (percent / 100) * circumference;

        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    }
  });

  // ── Section Headers Entrance ──
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 85%' },
      y: 40, opacity: 0, rotationX: 15, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'transform'
    });
  });

  // ── Sector Panels ──
  document.querySelectorAll('.sector-panel').forEach((panel, i) => {
    gsap.from(panel, {
      scrollTrigger: { trigger: panel, start: 'top 85%' },
      y: 80,
      opacity: 0,
      rotationX: 10,
      duration: 1,
      delay: i * 0.1,
      ease: 'power3.out',
      clearProps: 'transform'
    });
  });

  // ── Mini Cards ──
  gsap.from('.mini-card', {
    scrollTrigger: { trigger: '.mini-cards-row', start: 'top 85%' },
    y: 50,
    opacity: 0,
    rotationX: 15,
    duration: 0.7,
    stagger: 0.1,
    ease: 'back.out(1.4)',
    clearProps: 'transform'
  });

  // ── Timeline Items ──
  document.querySelectorAll('.timeline-item').forEach(item => {
    const isLeft = item.classList.contains('left');
    gsap.from(item.querySelector('.timeline-card'), {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      x: isLeft ? -60 : 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from(item.querySelector('.timeline-dot'), {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      scale: 0,
      duration: 0.5,
      ease: 'back.out(2)'
    });
  });

  // ── Risk & Opportunity Cards ──
  gsap.from('.ro-card', {
    scrollTrigger: { trigger: '.risk-oppty-grid', start: 'top 85%' },
    y: 50,
    opacity: 0,
    rotationX: 10,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'transform'
  });

  // ── Social Cards ──
  gsap.from('.social-card', {
    scrollTrigger: { trigger: '.social-grid', start: 'top 85%' },
    y: 60,
    opacity: 0,
    rotationX: 15,
    duration: 0.7,
    stagger: 0.12,
    ease: 'back.out(1.4)',
    clearProps: 'transform'
  });

  // ── Conclusion ──
  const conclusionTL = gsap.timeline({
    scrollTrigger: { trigger: '.conclusion-content', start: 'top 80%' }
  });

  conclusionTL
    .from('.conclusion-content .section-tag', { y: 30, opacity: 0, duration: 0.6 })
    .from('.conclusion-title', { y: 40, opacity: 0, duration: 0.8 }, 0.1)
    .from('.conclusion-text', { y: 30, opacity: 0, duration: 0.7 }, 0.3)
    .from('.conclusion-stat', {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)'
    }, 0.5);

  // ── Floating orb animations ──
  gsap.to('.orb-1', {
    y: 30, x: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  gsap.to('.orb-2', {
    y: -25, x: 15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  gsap.to('.orb-3', {
    y: 20, x: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // ── Parallax on Hero Background ──
  gsap.to('#hero-bg-img', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 200,
    scale: 1.15,
    ease: 'none'
  });

  // ── will-change performance hints ──
  document.querySelectorAll('.glass-card, .orb, .hero-particle').forEach(el => {
    el.style.willChange = 'transform';
  });
});

// ── Animação da seção de mapas ──
ScrollTrigger.create({
  trigger: '#routes-map',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.map-wrapper', {
      y: 60,
      opacity: 0,
      rotationX: 10,
      duration: 1,
      ease: 'power3.out'
    });
  }
});