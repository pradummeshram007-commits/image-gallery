// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 1200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
  if (!cursorVisible) {
    cursor.classList.add('visible');
    cursorVisible = true;
  }
});

// Add hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .category-item, .profile-card, .cast-card, .article-card');
hoverTargets.forEach(target => {
  target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== CATEGORIES HOVER EFFECT =====
const categoryItems = document.querySelectorAll('.category-item');
const imageContainer = document.getElementById('categoryImageContainer');
const categoryImages = imageContainer.querySelectorAll('img');

categoryItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const category = item.dataset.category;
    
    // Show the image container
    imageContainer.classList.add('visible');
    
    // Activate the correct image
    categoryImages.forEach(img => {
      if (img.dataset.category === category) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  });
  
  item.addEventListener('mouseleave', () => {
    // We'll let the container stay visible briefly for smooth transition
  });
});

// Hide images when leaving the entire categories area
const categoriesSection = document.querySelector('.categories-list');
categoriesSection.addEventListener('mouseleave', () => {
  imageContainer.classList.remove('visible');
  categoryImages.forEach(img => img.classList.remove('active'));
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
  observer.observe(el);
});

// ===== PARALLAX EFFECT ON HERO =====
const heroImage = document.getElementById('hero-img');
const heroSection = document.getElementById('hero-section');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;
  
  if (scrolled < heroHeight) {
    const parallax = scrolled * 0.3;
    heroImage.style.transform = `translateY(${parallax}px) scale(1)`;
  }
});

// ===== SMOOTH REVEAL FOR CATEGORY ITEMS =====
const categoryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const items = document.querySelectorAll('.category-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      categoryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Set initial state for category items
document.querySelectorAll('.category-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const categoriesSectionEl = document.getElementById('categories-section');
categoryObserver.observe(categoriesSectionEl);

// ===== STAGGERED ANIMATION FOR PROFILE CARDS =====
const profileObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.profile-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 150);
      });
      profileObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.profile-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const featuredSection = document.getElementById('featured-section');
profileObserver.observe(featuredSection);

// ===== MOUSE MOVE EFFECT ON HERO =====
heroSection.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { width, height } = heroSection.getBoundingClientRect();
  
  const moveX = (clientX / width - 0.5) * 20;
  const moveY = (clientY / height - 0.5) * 20;
  
  const circles = heroSection.querySelectorAll('.hero-circle, .hero-circle-2');
  circles.forEach(circle => {
    circle.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
  });
});

// ===== CATEGORY LINK CLICK HANDLER =====
categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.dataset.category;
    // Smooth scroll to a hypothetical section or just highlight
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
      item.style.transform = 'translateY(0) scale(1)';
    }, 150);
  });
});

console.log('DULCEDO® Website Initialized');
