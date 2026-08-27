/**
 * SURYA KESAVADASUPALEM - PORTFOLIO INTERACTIVE SCRIPTS
 * Handles Typing Effects, Scroll Reveals, Sticky Navigation,
 * Portfolio Filters, Modals, and Contact Form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  initAmbientMouseGlow();
});

/* --- 1. Typing Animation Effect in Hero --- */
function initTypingEffect() {
  const target = document.getElementById('typingElement');
  if (!target) return;

  const roles = [
    'JAVA FULL STACK Developer',
    'Spring Boot & React Enthusiast',
    'Photography & Visual Editor',
    'Creative Web Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function type() {
    const currentText = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --- 2. Sticky Navbar & Active Section Tracker --- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Glassmorphism on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- 3. Mobile Hamburger Menu Toggle --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const toggleIcon = document.getElementById('toggleIcon');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleIcon.className = 'fa-solid fa-bars';
    });
  });
}

/* --- 4. Intersection Observer for Scroll Reveals --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));
}

/* --- 5. Back to Top Button --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- 7. Mouse Ambient Glow Reaction --- */
function initAmbientMouseGlow() {
  const glow1 = document.getElementById('glow1');
  const glow3 = document.getElementById('glow3');

  if (window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      if (glow1) glow1.style.transform = `translate(${x}px, ${y}px)`;
      if (glow3) glow3.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
    }, { passive: true });
  }
}

/* --- 8. Resume Modal Controls --- */
const resumeModal = document.getElementById('resumeModal');
const previewResumeBtn = document.getElementById('previewResumeBtn');

if (previewResumeBtn && resumeModal) {
  previewResumeBtn.addEventListener('click', () => {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function closeResumeModal() {
  if (resumeModal) {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

if (resumeModal) {
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });
}

/* --- 9. Blog Article Modals --- */
const blogModal = document.getElementById('blogModal');
const blogModalContent = document.getElementById('blogModalContent');

const blogArticlesData = {
  'java-backend': {
    category: 'JAVA ARCHITECTURE',
    title: 'Building Scalable RESTful Services with Spring Boot & MySQL',
    date: 'August 2026 • 5 min read',
    content: `
      <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1.2rem;">
        In modern enterprise software engineering, building reliable backend architectures requires strict adherence to clean code principles, proper layered architecture (Controller, Service, Repository), and transactional boundary management.
      </p>
      <h4 style="font-family: var(--font-heading); color: #fff; margin: 1.5rem 0 0.8rem;">Key Architecture Patterns</h4>
      <ul style="color: var(--text-muted); padding-left: 1.2rem; line-height: 1.8; list-style-type: square; margin-bottom: 1.2rem;">
        <li><strong>DTO (Data Transfer Object) Pattern:</strong> Decouples internal database entities from external client API contracts.</li>
        <li><strong>Exception Handling:</strong> Centralized @ControllerAdvice to return uniform JSON error responses with status codes.</li>
        <li><strong>Connection Pooling:</strong> Utilizing HikariCP configured in Spring Boot for rapid MySQL transaction execution.</li>
      </ul>
      <p style="color: var(--text-muted); line-height: 1.8;">
        Continuous profiling and relational indexing are essential to ensure scalable high-throughput services.
      </p>
    `
  },
  'react-modern': {
    category: 'FRONTEND ENGINEERING',
    title: 'Modern Reactive UI Patterns with Clean JavaScript & CSS Glassmorphism',
    date: 'August 2026 • 4 min read',
    content: `
      <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1.2rem;">
        Crafting modern web user interfaces demands a deep balance between aesthetic sophistication and raw computational performance. Glassmorphic design combines backdrop filters, translucent borders, and ambient light sources.
      </p>
      <h4 style="font-family: var(--font-heading); color: #fff; margin: 1.5rem 0 0.8rem;">Design System Guidelines</h4>
      <ul style="color: var(--text-muted); padding-left: 1.2rem; line-height: 1.8; list-style-type: square; margin-bottom: 1.2rem;">
        <li><strong>Subtle Multi-layer Alpha:</strong> Keep translucent layers between 0.65 and 0.85 opacity to prevent washed-out text contrast.</li>
        <li><strong>Hardware-accelerated Transforms:</strong> Use transform: translate3d and opacity for 60fps animations.</li>
        <li><strong>Fluid Typography:</strong> Use clamp() functions for seamless scaling from 320px to 4K displays.</li>
      </ul>
    `
  },
  'visual-editing': {
    category: 'VISUAL STORYTELLING',
    title: 'The Art of High-Contrast Dark Mood Photography & Color Grading',
    date: 'August 2026 • 3 min read',
    content: `
      <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1.2rem;">
        Moody visual photography relies heavily on the manipulation of shadow gradients, chiaroscuro lighting, and controlled split-toning.
      </p>
      <h4 style="font-family: var(--font-heading); color: #fff; margin: 1.5rem 0 0.8rem;">Composition Principles</h4>
      <ul style="color: var(--text-muted); padding-left: 1.2rem; line-height: 1.8; list-style-type: square; margin-bottom: 1.2rem;">
        <li><strong>Leading Lines & Perspective:</strong> Directing the viewer's eye straight toward high-contrast focal points.</li>
        <li><strong>Cyan & Amber Split Toning:</strong> Embedding cool cyan tones into shadows while retaining natural warm amber highlights.</li>
        <li><strong>Atmospheric Depth:</strong> Embracing fog, rain reflections, and natural twilight transitions.</li>
      </ul>
    `
  }
};

function openBlogModal(articleKey) {
  const article = blogArticlesData[articleKey];
  if (!article || !blogModal || !blogModalContent) return;

  blogModalContent.innerHTML = `
    <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">
      ${article.category} • ${article.date}
    </div>
    <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #fff; line-height: 1.3; margin-bottom: 1.2rem;">
      ${article.title}
    </h2>
    <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.2rem;">
      ${article.content}
    </div>
  `;

  blogModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
  if (blogModal) {
    blogModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

if (blogModal) {
  blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) {
      closeBlogModal();
    }
  });
}

/* --- 10. Contact Form Submission & Toast Trigger --- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('messageSubject').value.trim();
  const message = document.getElementById('messageBody').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill out all required fields.');
    return;
  }

  // Construct mailto link for direct sending
  const mailtoUrl = `mailto:suryakesavadasupalem03@gmail.com?subject=${encodeURIComponent(subject || 'Message from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  // Show friendly notification
  showToast(`Thank you ${name}! Opening mail client to send...`);

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1000);

  // Reset form
  document.getElementById('contactForm').reset();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Global key listener for ESC key to close any active modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResumeModal();
    closeBlogModal();
  }
});
