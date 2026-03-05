const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const allNavLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sectionNavLinks = allNavLinks.filter((link) =>
  link.getAttribute('href')?.startsWith('#')
);
const sections = sectionNavLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const langSelect = document.querySelector('#lang-select');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const setActiveLink = () => {
  const current = window.scrollY + 140;

  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const active = current >= top && current < bottom;

    if (active) {
      sectionNavLinks.forEach((link) => link.classList.remove('active'));
      sectionNavLinks[index].classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

if (langSelect) {
  langSelect.addEventListener('change', (event) => {
    const targetPath = event.target.value;
    const hash = window.location.hash || '';
    window.location.href = `${targetPath}${hash}`;
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));
