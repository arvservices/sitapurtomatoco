// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== IMAGE FALLBACK =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';
    img.src = 'sitapur-tomato-company.png';
    img.classList.add('image-fallback');
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    counter.dataset.animated = 'true';
    requestAnimationFrame(update);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateCounters();
  });
}, { threshold: 0.3 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ===== FAQ TOGGLE =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked one (if it wasn't already open)
    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
