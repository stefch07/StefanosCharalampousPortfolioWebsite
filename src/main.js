// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

// Scroll-reveal: add .visible when hero/sections enter viewport
const sections = document.querySelectorAll('.section');
const revealTargets = document.querySelectorAll('.hero, .section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

// Active nav highlight based on visible section
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sectionById = new Map(
  Array.from(sections).map((section) => [section.id, section])
);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.5 }
);

sectionById.forEach((section) => navObserver.observe(section));
