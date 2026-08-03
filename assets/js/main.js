// All navbar link elements.
const navLinks = document.querySelectorAll('.topnav a');

// Map with section ID to corresponding navbar element.
const linkById = {};
navLinks.forEach(function (link) {
  const sectionId = link.getAttribute('href').slice(1);
  linkById[sectionId] = link;
});

// Moves the "active" highlight from whichever link currently has it onto the given link.
function setActive(link) {
  document.querySelector('.topnav a.active').classList.remove('active');
  link.classList.add('active');
}

// Highlights a link when clicked.
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    setActive(link);
  });
});

// Find navbar height and set it as CSS variable.
const navHeight = document.querySelector('.topnav').offsetHeight;
document.documentElement.style.setProperty('--nav-height', navHeight + 'px');

// Callback to select section when it scrolls into view.
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const link = linkById[entry.target.id];
    if (link) setActive(link);
  });
}, {
  rootMargin: '-' + navHeight + 'px 0px -70% 0px',
  threshold: 0
});

// Observe each section and fire the observer callback when scrolling.
const sections = ['home', 'members', 'decklists', 'placements', 'recruitment']
  .map(function (id) { return document.getElementById(id); })
  .filter(function (el) { return el !== null; });

sections.forEach(function (section) {
  observer.observe(section);
});
