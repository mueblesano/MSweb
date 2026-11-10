// Portafolio: se arma desde data/proyectos.json. Para agregar un proyecto, añada una entrada al JSON.
// Importante: abrir el sitio con un servidor local (ver README), porque fetch no funciona con file://
const galeria = document.getElementById('gl');
const filtros = document.getElementById('fl');
const vacio = document.getElementById('em');
const visor = document.getElementById('lb');

function selectCategory(category) {
  const button = filtros.querySelector(`[data-f="${category}"]`);
  if (!button) return;
  filtros.querySelectorAll('button').forEach(item => item.classList.toggle('on', item === button));
  let visible = 0;
  galeria.querySelectorAll('figure').forEach(figure => {
    const show = category === 'all' || figure.dataset.c === category;
    figure.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  vacio.textContent = 'Aún no hay proyectos cargados en esta categoría.';
  vacio.style.display = visible ? 'none' : 'block';
}

function syncCategoryFromHash({ scroll = false } = {}) {
  const match = /^#categoria-(coc|clo|com|ins|esp)$/.exec(location.hash);
  if (!match) return;
  const category = match[1];
  selectCategory(category);
  if (scroll) {
    requestAnimationFrame(() => {
      filtros.querySelector(`#categoria-${category}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

fetch('data/proyectos.json')
  .then(r => r.json())
  .then(({ categorias, proyectos }) => {
    filtros.innerHTML = Object.entries(categorias)
      .map(([k, v], i) => `<button id="${k === 'all' ? 'categoria-all' : `categoria-${k}`}" class="${i ? '' : 'on'}" data-f="${k}">${v}</button>`).join('');
    galeria.innerHTML = proyectos.map(p =>
      `<figure data-c="${p.categoria}"><img src="${p.foto}" alt="${p.alt}" loading="lazy"><figcaption>${p.titulo}</figcaption></figure>`).join('');
    syncCategoryFromHash({ scroll: true });
  })
  .catch(() => { vacio.textContent = 'No se pudieron cargar los proyectos.'; vacio.style.display = 'block'; });

filtros.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  const hash = b.dataset.f === 'all' ? '#proyectos' : `#categoria-${b.dataset.f}`;
  if (location.hash === hash) selectCategory(b.dataset.f);
  else location.hash = hash;
};

document.addEventListener('project:navigate', event => {
  const { categoryId } = event.detail;
  if (categoryId) syncCategoryFromHash({ scroll: true });
  else if (location.hash === '#proyectos' && filtros.querySelector('[data-f="all"]')) selectCategory('all');
});

galeria.onclick = e => {
  const im = e.target.closest('figure img');
  if (im) { visor.firstElementChild.src = im.src; visor.classList.add('on'); }
};
visor.onclick = () => visor.classList.remove('on');
