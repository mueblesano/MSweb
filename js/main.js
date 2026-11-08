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

const slides = [...document.querySelectorAll('.sl')];
let actual = 0;
setInterval(() => {
  slides[actual].classList.remove('on');
  actual = (actual + 1) % slides.length;
  slides[actual].classList.add('on');
}, 5500);
