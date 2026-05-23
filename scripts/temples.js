// Populate footer: copyright year + last modified
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;

// Hamburger navigation toggle (mobile only)
const hamburgerBtn = document.querySelector('.hamburger');
const nav = document.getElementById('primary-nav');
const hamburgerIcon = document.querySelector('.hamburger-icon');

function isMobileView() {
  // keep consistent with CSS breakpoint above (700px)
  return window.matchMedia('(max-width: 699px)').matches;
}

function setHamburgerState(open) {
  if (!hamburgerIcon) return;
  // ☰ for open, ✕ for close
  hamburgerIcon.textContent = open ? '✕' : '☰';

  if (nav) {
    if (open) nav.classList.add('open');
    else nav.classList.remove('open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
}

if (hamburgerBtn && nav) {
  // Initialize state
  setHamburgerState(false);

  hamburgerBtn.addEventListener('click', () => {
    if (!isMobileView()) return;

    const isOpen = nav.classList.contains('open');
    setHamburgerState(!isOpen);

    const openLabel = !isOpen ? 'Close navigation menu' : 'Open navigation menu';
    hamburgerBtn.setAttribute('aria-label', openLabel);
  });
}

// If the viewport changes to larger, ensure nav is visible and button state doesn't trap it.
window.addEventListener('resize', () => {
  if (nav && !isMobileView()) {
    nav.classList.remove('open');
  }
});

