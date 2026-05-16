/* ============================================
   NEUROVEDA — Main JavaScript
   ============================================ */

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    }
  });
}

// ---- Scroll-triggered fade-up animations ----
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- FAQ accordion ----
function toggleFaq(questionEl) {
  const item = questionEl.parentElement;
  const wasOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    openItem.classList.remove('open');
  });

  // Open clicked item if it wasn't already open
  if (!wasOpen) {
    item.classList.add('open');
  }
}

// ---- Video modal ----
function openVideoModal(url) {
  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('videoFrame');
  if (!modal || !frame) return;
  frame.src = url + '?autoplay=1&rel=0';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('videoFrame');
  if (!modal || !frame) return;
  frame.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('videoModal');
  if (modal && e.target === modal) {
    closeVideoModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

// ---- Sticky nav shadow on scroll ----
const navEl = document.getElementById('nav');
if (navEl) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navEl.style.boxShadow = '0 4px 32px rgba(0,0,0,0.14)';
    } else {
      navEl.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
  }, { passive: true });
}

// ---- Video slider logic ----
const videoSlider = document.getElementById('videoSlider');
const videoGrid = videoSlider ? videoSlider.querySelector('.video-testimonials__grid') : null;
const prevBtn = document.getElementById('videoPrev');
const nextBtn = document.getElementById('videoNext');

if (videoSlider && videoGrid && prevBtn && nextBtn) {
  let currentIndex = 0;
  const cards = videoGrid.querySelectorAll('.video-card');
  const totalCards = cards.length;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Ensure currentIndex is within bounds
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = window.innerWidth <= 768 ? 16 : 24; 
    const moveDistance = currentIndex * (cardWidth + gap);
    
    videoGrid.style.transform = `translateX(-${moveDistance}px)`;
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    if (currentIndex < totalCards - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  });

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSlider, 250);
  });

  // Initial update
  updateSlider();
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
