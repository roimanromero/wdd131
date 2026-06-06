// Sample temple data array (used to generate temple cards + apply filters)
// NOTE: Dedicated dates are stored as comma-separated values: "YYYY, Month, D"

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  // Added at least 3 more temple objects:
  {
    templeName: "Davao Philippines",
    location: "Davao City, Philippines",
    dedicated: "2024, June, 30",
    area: 25000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/davao-philippines-temple/davao-philippines-temple-66549.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "Guarulhos, São Paulo, Brazil",
    dedicated: "1978, March, 19",
    area: 100000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-55945.jpg",
  },
  {
    templeName: "St. Louis Missouri",
    location: "Chesterfield, Missouri, United States",
    dedicated: "2000, September, 17",
    area: 101000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/st.-louis-missouri-temple/st.-louis-missouri-temple-68003.jpg",
  },
];

function parseDedicatedYear(dedicatedStr) {
  // dedicatedStr format: "YYYY, Month, D"
  const year = Number(String(dedicatedStr).split(',')[0].trim());
  return Number.isFinite(year) ? year : NaN;
}

function formatArea(area) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(area);
}

function createTempleCard(temple) {
  const figure = document.createElement('figure');

  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = 'lazy';

  const figcaption = document.createElement('figcaption');

  // Keep figcaption simple but informative
  const dedicatedYear = parseDedicatedYear(temple.dedicated);
  const dedicatedText = Number.isFinite(dedicatedYear)
    ? String(dedicatedYear)
    : temple.dedicated;

  figcaption.innerHTML = `
    <div><strong>${temple.templeName}</strong></div>
    <div>${temple.location}</div>
    <div>Dedicated: ${dedicatedText}</div>
    <div>Area: ${formatArea(temple.area)} sq ft</div>
  `;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

function renderTemples(list) {
  const grid = document.getElementById('templeGrid');
  if (!grid) return;

  grid.innerHTML = '';
  list.forEach((t) => grid.appendChild(createTempleCard(t)));
}

function applyFilter(filterKey) {
  const filtered = temples.filter((t) => {
    const year = parseDedicatedYear(t.dedicated);
    if (!Number.isFinite(year)) return false;

    switch (filterKey) {
      case 'old':
        return year < 1900;
      case 'new':
        return year > 2000;
      case 'large':
        return t.area > 90000;
      case 'small':
        return t.area < 10000;
      case 'home':
      default:
        return true;
    }
  });

  renderTemples(filtered);
}

function wireNavigationFiltering() {
  const grid = document.getElementById('templeGrid');
  if (!grid) return;

  // Expected IDs exist in HTML: #old, #new, #large, #small
  const oldLink = document.querySelector('a[href="#old"]');
  const newLink = document.querySelector('a[href="#new"]');
  const largeLink = document.querySelector('a[href="#large"]');
  const smallLink = document.querySelector('a[href="#small"]');
  const homeLink = document.querySelector('a[href="#"]');

  const setClick = (el, key) => {
    if (!el) return;
    el.addEventListener('click', (evt) => {
      evt.preventDefault();
      applyFilter(key);
    });
  };

  setClick(oldLink, 'old');
  setClick(newLink, 'new');
  setClick(largeLink, 'large');
  setClick(smallLink, 'small');
  setClick(homeLink, 'home');
}

// Populate footer: copyright year + last modified
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;

// Hamburger navigation toggle (mobile only) - keeps existing behavior
const hamburgerBtn = document.querySelector('.hamburger');
const nav = document.getElementById('primary-nav');
const hamburgerIcon = document.querySelector('.hamburger-icon');

function isMobileView() {
  return window.matchMedia('(max-width: 699px)').matches;
}

function setHamburgerState(open) {
  if (!hamburgerIcon) return;
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
  setHamburgerState(false);

  hamburgerBtn.addEventListener('click', () => {
    if (!isMobileView()) return;

    const isOpen = nav.classList.contains('open');
    setHamburgerState(!isOpen);

    const openLabel = !isOpen ? 'Close navigation menu' : 'Open navigation menu';
    hamburgerBtn.setAttribute('aria-label', openLabel);
  });
}

window.addEventListener('resize', () => {
  if (nav && !isMobileView()) {
    nav.classList.remove('open');
  }
});

// Init page
wireNavigationFiltering();
renderTemples(temples);

