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
