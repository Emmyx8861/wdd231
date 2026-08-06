import { attractions } from '../data/discover-data.mjs';

const navToggle = document.querySelector('#navToggle');
const primaryNav = document.querySelector('#primaryNav');
const galleryContainer = document.querySelector('#galleryGrid');
const visitMessage = document.querySelector('#visitMessage');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function formatVisitMessage(lastVisitMs) {
  if (!lastVisitMs) {
    return 'Welcome! Let us know if you have any questions.';
  }

  const now = Date.now();
  const elapsedMs = now - lastVisitMs;
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (elapsedMs < oneDayMs) {
    return 'Back so soon! Awesome!';
  }

  const days = Math.floor(elapsedMs / oneDayMs);
  return `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
}

function renderAttractions() {
  if (!galleryContainer) return;

  galleryContainer.innerHTML = attractions
    .map((item, index) => {
      const areaClass = `item${index + 1}`;
      return `
        <article class="item-card ${areaClass}">
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" class="learn-more">Learn more</button>
        </article>
      `;
    })
    .join('');
}

function showVisitMessage() {
  if (!visitMessage) return;

  const rawStored = localStorage.getItem('discoverLastVisit');
  const storedVisit = rawStored ? Number(rawStored) : null;
  const message = formatVisitMessage(storedVisit);
  visitMessage.textContent = message;
  localStorage.setItem('discoverLastVisit', String(Date.now()));
}

function updateFooterDetails() {
  const year = document.getElementById('current-year');
  const lastModified = document.getElementById('lastModified');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
}

renderAttractions();
showVisitMessage();
updateFooterDetails();
