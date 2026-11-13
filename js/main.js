// Cabecera, menú móvil y portada con fotos que se alternan
const hd = document.getElementById('hd'), nv = document.getElementById('nv');
const menuBtn = document.getElementById('menu');
const closeBtn = document.getElementById('menu-close');
const menuBackdrop = document.getElementById('menu-backdrop');
addEventListener('scroll', () => hd.classList.toggle('s', scrollY > 40));
function setMenuOpen(open) {
  nv.classList.toggle('on', open);
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
}
menuBtn.addEventListener('click', () => setMenuOpen(!nv.classList.contains('on')));
closeBtn.addEventListener('click', () => setMenuOpen(false));
menuBackdrop.addEventListener('click', () => setMenuOpen(false));
nv.addEventListener('click', event => {
  if (event.target.closest('a')) setMenuOpen(false);
});
addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

function updatePageView() {
  const hash = location.hash.slice(1);
  const categoryId = /^categoria-(coc|clo|com|ins|esp|ban)$/.test(hash) ? hash : '';
  const projectsOpen = hash === 'proyectos' || Boolean(categoryId);
  document.body.classList.toggle('projects-view', projectsOpen);
  document.dispatchEvent(new CustomEvent('project:navigate', {
    detail: { categoryId }
  }));
}

addEventListener('hashchange', updatePageView);
updatePageView();

const slides = [...document.querySelectorAll('.sl')];
const slideButtons = [...document.querySelectorAll('.hero-dot')];
const previousSlide = document.querySelector('[data-carousel-prev]');
const nextSlide = document.querySelector('[data-carousel-next]');
let actual = 0;
let carouselTimer;

function showSlide(index) {
  slides[actual].classList.remove('on');
  actual = (index + slides.length) % slides.length;
  slides[actual].classList.add('on');
  slideButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === actual;
    button.classList.toggle('on', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function restartCarousel() {
  clearInterval(carouselTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    carouselTimer = setInterval(() => showSlide(actual + 1), 5500);
  }
}

previousSlide.addEventListener('click', () => {
  showSlide(actual - 1);
  restartCarousel();
});
nextSlide.addEventListener('click', () => {
  showSlide(actual + 1);
  restartCarousel();
});
slideButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showSlide(index);
    restartCarousel();
  });
});
restartCarousel();

const renderSlides = [...document.querySelectorAll('.render-item')];
const renderSlideButtons = [...document.querySelectorAll('.render-dot')];
const previousRenderSlide = document.querySelector('[data-render-prev]');
const nextRenderSlide = document.querySelector('[data-render-next]');
const mobileRenderCarousel = window.matchMedia('(max-width: 900px)');
let actualRender = 0;
let renderCarouselTimer;

function showRenderSlide(index) {
  renderSlides[actualRender].classList.remove('on');
  renderSlides[actualRender].setAttribute('aria-hidden', 'true');
  actualRender = (index + renderSlides.length) % renderSlides.length;
  renderSlides[actualRender].classList.add('on');
  renderSlides[actualRender].setAttribute('aria-hidden', 'false');
  renderSlideButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === actualRender;
    button.classList.toggle('on', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function restartRenderCarousel() {
  clearInterval(renderCarouselTimer);
  if (
    mobileRenderCarousel.matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    renderCarouselTimer = setInterval(
      () => showRenderSlide(actualRender + 1),
      5500,
    );
  }
}

previousRenderSlide.addEventListener('click', () => {
  showRenderSlide(actualRender - 1);
  restartRenderCarousel();
});
nextRenderSlide.addEventListener('click', () => {
  showRenderSlide(actualRender + 1);
  restartRenderCarousel();
});
renderSlideButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showRenderSlide(index);
    restartRenderCarousel();
  });
});
mobileRenderCarousel.addEventListener('change', restartRenderCarousel);
restartRenderCarousel();
