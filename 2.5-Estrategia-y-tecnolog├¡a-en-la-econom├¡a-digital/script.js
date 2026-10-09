const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section[id]');
const reveals = document.querySelectorAll('.reveal');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const activateLink = () => {
  let currentId = '';
  sections.forEach(section => {
    const top = window.scrollY + 120;
    if (top >= section.offsetTop) currentId = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => revealObserver.observe(el));
window.addEventListener('scroll', activateLink, { passive: true });
window.addEventListener('load', activateLink);
