// Initialize animations on scroll library
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Start counting stats when in viewport
  const statElements = document.querySelectorAll('.stat-value');
  let started = false;

  window.addEventListener('scroll', function() {
    if (isInViewport(document.querySelector('.stats')) && !started) {
      countStats();
      started = true;
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
  }
});

// Function to check if element is in viewport
function isInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Count up animation for stats
function countStats() {
  const statElements = document.querySelectorAll('.stat-value');

  statElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps

    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  // Hide all testimonials
  testimonials.forEach(item => {
    item.classList.remove('active');
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show the selected testimonial and activate dot
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');

  // Update current index
  currentTestimonial = index;
}

function nextTestimonial() {
  let next = currentTestimonial + 1;
  if (next >= testimonials.length) {
    next = 0;
  }
  showTestimonial(next);
}

function prevTestimonial() {
  let prev = currentTestimonial - 1;
  if (prev < 0) {
    prev = testimonials.length - 1;
  }
  showTestimonial(prev);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 6000);

// Pause auto-rotation when user interacts
document.querySelector('.testimonial-navigation').addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

document.querySelector('.testimonial-navigation').addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(nextTestimonial, 6000);
});

// Video modal functionality
function playDemoVideo() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside content
window.onclick = function(event) {
  const modal = document.getElementById('videoModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Page navigation
function navigateTo(page) {
  window.location.href = page;
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky header effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Highlight active navigation item based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      const navItems = document.querySelectorAll('nav a');
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + section.getAttribute('id')) {
          item.classList.add('active');
        }
      });
    }
  });
});
function checkAnswer(questionCard, correctAnswer) {
  const buttons = questionCard.querySelectorAll('button');

  buttons.forEach(button => {
    button.disabled = true;
    if (button.getAttribute('data-answer') === correctAnswer) {
      button.classList.add('correct');
    }
  });

  const userClicked = event.target.getAttribute('data-answer');
  if (userClicked !== correctAnswer) {
    event.target.classList.add('wrong');
  }
}


function showPractice() {
  document.getElementById('practice-questions').style.display = 'block';
}

function checkAnswer(button, isCorrect) {
  if (isCorrect) {
    button.parentElement.parentElement.style.backgroundColor = '#d4edda'; // Green
  } else {
    button.parentElement.parentElement.style.backgroundColor = '#f8d7da'; // Red
  }

  // Disable all buttons in the question
  const buttons = button.parentElement.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);
}
