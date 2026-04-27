// --- Strict Mode for Robustness ---
"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // --- Mobile Menu Toggle ---
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };
  }

  // --- Smooth Dropdown Animation for Docs ---
  const allDetails = document.querySelectorAll('details');
  allDetails.forEach(detail => {
    detail.addEventListener('click', (e) => {
      if (e.target.closest('summary')) {
        e.preventDefault();
        if (detail.classList.contains('is-closing')) return;
        if (detail.open) {
          detail.classList.add('is-closing');
          setTimeout(() => {
            detail.removeAttribute('open');
            detail.classList.remove('is-closing');
          }, 400);
        } else {
          detail.setAttribute('open', 'true');
        }
      }
    });
  });

  // --- DOM CACHING (Optimization for Zero Lag) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');
  const auroraBlobs = document.querySelectorAll('.aurora-blob');
  const heroStage = document.querySelector('.hero-stage');
  const heroCanvas = document.querySelector('#hero-canvas');
  const header = document.querySelector('.header');

  const scrollAnimatedElements = [];
  sections.forEach(section => {
    if (!section.classList.contains('premium-hero') && section.id !== 'docs-section') {
      const children = section.querySelectorAll('.bento-card, .stat-box, .pricing-card');
      scrollAnimatedElements.push({
        section: section,
        children: Array.from(children)
      });
    }
  });

  // --- Smooth Lerp Scroll & Animation Engine ---
  let currentScroll = 0;
  const lerpAmount = 0.08;

  function updateScrollAnimations() {
    // Smoothen the scroll value
    currentScroll += (window.scrollY - currentScroll) * lerpAmount;
    const scrollY = currentScroll;

    // Premium 3D Pinned Sculpture Parallax
    if (heroStage) {
      const heroHeight = heroStage.offsetHeight;
      if (scrollY < heroHeight * 2) {
        const progress = Math.min(1, scrollY / (heroHeight * 1.2));
        if (heroCanvas) {
          const moveZ = progress * -300;
          const scale = 1 - progress * 0.1;
          const rotateY = progress * 15;
          const opacity = 1 - progress * 1.1;
          heroCanvas.style.transform = `translate3d(0, 0, ${moveZ}px) scale(${scale})`;
          heroStage.style.opacity = Math.max(0, opacity);
        }
      } else {
        heroStage.style.opacity = 0;
      }
    }

    // High-End Aurora Parallax
    auroraBlobs.forEach((blob, index) => {
      const depth = (index + 1) * 0.05;
      blob.style.transform = `translate3d(0, ${scrollY * depth}px, 0) scale(${1 + scrollY * 0.0001})`;
    });

    // Organic Side-Slide Reveal
    let currentId = '';
    scrollAnimatedElements.forEach((group) => {
      const section = group.section;
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 400) {
        currentId = section.getAttribute('id');
      }

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const scrolled = scrollY - (sectionTop - window.innerHeight);
        const progress = Math.max(0, Math.min(1, scrolled / window.innerHeight));

        // Premium 3D Perspective Reveal (Makes it not flat)
        section.style.opacity = progress;
        section.style.transform = `translateY(${(1 - progress) * 20}px)`;

        // Granular Side-Sliding for Children (Progressive)
        group.children.forEach((child, i) => {
          const childProgress = Math.max(0, Math.min(1, progress * 1.3 - (i * 0.1)));
          const direction = (i % 2 === 0) ? -1 : 1;
          const translateX = (1 - childProgress) * 400 * direction;

          // Using translate3d for hardware acceleration and scale close to 1 to keep text sharp
          child.style.transform = `translate3d(${translateX}px, 0, 0)`;
          child.style.opacity = childProgress;
        });
      }
    });

    // Update Nav
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Header State
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    requestAnimationFrame(updateScrollAnimations);
  }

  // Start the animation loop
  requestAnimationFrame(updateScrollAnimations);

  // --- Typing Text Animation ---
  const textArray = [
    "Discord Music System",
    "Seamless Playback",
    "Smart Playlists",
    "Advanced Controls",
    "Nonstop Music Vibes"
  ];
  const typingDelay = 100;
  const erasingDelay = 100;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  function type() {
    if (!typedTextSpan || !cursorSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (!typedTextSpan || !cursorSpan) return;
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // --- Hover Tilt Effect Removed ---

  // --- Ambient Background Particles ---
  const particleCanvas = document.getElementById('canvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    resizeCanvas();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            let force = (150 - distance) / 150;
            this.x -= dx * force * 0.05;
            this.y -= dy * force * 0.05;
          }
        }

        if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- Preloader Hiding (Robust Navigation + Scroll Lock) ---
  const handlePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Prevent scrolling while loading
      document.body.style.overflow = 'hidden';

      preloader.style.display = 'flex';
      preloader.classList.remove('fade-out');

      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Re-enable scrolling after fade-out
        setTimeout(() => {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
        }, 800);
      }, 2000);
    }
  };

  // Run on initial load
  window.addEventListener('load', handlePreloader);

  // Run on back/forward navigation (bfcache)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      handlePreloader();
    }
  });

});
