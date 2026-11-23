/**
 * Elora Events — main.js
 * Vanilla JS for: sticky nav, mobile menu, scroll reveal,
 * lightbox, gallery filters, counter animation, form handling.
 */

'use strict';

/* ══════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════ */
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════
   1. STICKY NAV — add shadow on scroll
   ══════════════════════════════════════════ */
function initStickyNav() {
  const nav = qs('.site-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════
   2. MOBILE NAV — hamburger toggle
   ══════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = qs('.hamburger');
  const mobileNav = qs('.mobile-nav');
  const closeLinks = qsa('.mobile-nav a');

  if (!hamburger || !mobileNav) return;

  const toggle = (forceClose = false) => {
    const isOpen = mobileNav.classList.contains('open');
    const shouldClose = forceClose || isOpen;

    mobileNav.classList.toggle('open', !shouldClose);
    hamburger.classList.toggle('active', !shouldClose);
    document.body.style.overflow = shouldClose ? '' : 'hidden';
  };

  hamburger.addEventListener('click', () => toggle());
  closeLinks.forEach(link => link.addEventListener('click', () => toggle(true)));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggle(true);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) toggle(true);
  });
}

/* ══════════════════════════════════════════
   3. SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════ */
function initScrollReveal() {
  const elements = qsa('.reveal');
  if (!elements.length) return;

  // Skip animation for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   4. HERO IMAGE — Ken Burns reveal
   ══════════════════════════════════════════ */
function initHero() {
  const bg = qs('.hero__bg');
  if (!bg) return;
  // Trigger Ken Burns after brief delay for smooth feel
  setTimeout(() => bg.classList.add('loaded'), 100);
}

/* ══════════════════════════════════════════
   5. COUNTER ANIMATION (stats bar)
   ══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, step);
}

function initCounters() {
  const counters = qsa('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   6. GALLERY LIGHTBOX
   ══════════════════════════════════════════ */
function initLightbox() {
  const lightbox = qs('.lightbox');
  if (!lightbox) return;

  const img = qs('.lightbox__img', lightbox);
  const closeBtn = qs('.lightbox__close', lightbox);
  const prevBtn = qs('.lightbox__prev', lightbox);
  const nextBtn = qs('.lightbox__next', lightbox);

  let galleryItems = [];
  let currentIndex = 0;

  const openAt = (index) => {
    galleryItems = qsa('.gallery-masonry__item img, .gallery-strip__item img');
    currentIndex = index;
    const src = galleryItems[currentIndex]?.src || galleryItems[currentIndex]?.dataset.src;
    const alt = galleryItems[currentIndex]?.alt || 'Elora Events';
    if (!src) return;
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  };

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  };

  const navigate = (dir) => {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    const src = galleryItems[currentIndex]?.src || galleryItems[currentIndex]?.dataset.src;
    const alt = galleryItems[currentIndex]?.alt || 'Elora Events';
    img.src = src;
    img.alt = alt;
  };

  // Bind triggers — gallery page items
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-masonry__item, .gallery-strip__item');
    if (!item) return;
    const allItems = qsa('.gallery-masonry__item img, .gallery-strip__item img');
    const itemImg = item.querySelector('img');
    const idx = allItems.indexOf(itemImg);
    openAt(idx >= 0 ? idx : 0);
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });
}

/* ══════════════════════════════════════════
   7. GALLERY FILTER (gallery.html)
   ══════════════════════════════════════════ */
function initGalleryFilters() {
  const filterBtns = qsa('.filter-btn');
  const galleryItems = qsa('.gallery-masonry__item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category || 'all';
        const show = filter === 'all' || category === filter;
        item.style.opacity = show ? '1' : '0';
        item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        item.style.display = show ? 'block' : 'none';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
    });
  });
}

/* ══════════════════════════════════════════
   8. CONTACT FORM (front-end only)
   ══════════════════════════════════════════ */
function initContactForm() {
  const form = qs('#contactForm');
  const success = qs('.form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = qsa('[required]', form);
    let valid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--color-pink)';
        field.focus();
      }
    });

    if (!valid) return;

    // TODO: connect to form backend / email service (e.g. Formspree, Netlify Forms, EmailJS)
    // Placeholder: mailto fallback
    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const phone = form.querySelector('#phone')?.value || '';
    const service = form.querySelector('#service')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
    );

    // Show success state
    form.style.display = 'none';
    if (success) success.classList.add('visible');

    // Open mailto as fallback
    setTimeout(() => {
      window.location.href = `mailto:info@eloraevents.co.za?subject=Event%20Enquiry%20from%20${encodeURIComponent(name)}&body=${mailtoBody}`;
    }, 800);
  });
}

/* ══════════════════════════════════════════
   9. ACTIVE NAV LINK (multi-page)
   ══════════════════════════════════════════ */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  qsa('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href === `./${currentPage}`)) {
      link.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════════
   10. SET CURRENT YEAR IN FOOTER
   ══════════════════════════════════════════ */
function setYear() {
  const el = qs('.footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════
   INIT ON DOM READY
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileNav();
  initScrollReveal();
  initHero();
  initCounters();
  initLightbox();
  initGalleryFilters();
  initContactForm();
  initActiveNavLink();
  setYear();
});
