// Portafolio: se arma desde data/proyectos.json. Para agregar un proyecto, añada una entrada al JSON.
// Importante: abrir el sitio con un servidor local (ver README), porque fetch no funciona con file://
const galeria = document.getElementById('gl');
const filtros = document.getElementById('fl');
const vacio = document.getElementById('em');
const visor = document.getElementById('lb');

fetch('data/proyectos.json')
  .then(r => r.json())
  .then(({ categorias, proyectos }) => {
    filtros.innerHTML = Object.entries(categorias)
      .map(([k, v], i) => `<button class="${i ? '' : 'on'}" data-f="${k}">${v}</button>`).join('');
    galeria.innerHTML = proyectos.map(p =>
      `<figure data-c="${p.categoria}"><img src="${p.foto}" alt="${p.alt}" loading="lazy"><figcaption>${p.titulo}</figcaption></figure>`).join('');
  })
  .catch(() => { vacio.textContent = 'No se pudieron cargar los proyectos.'; vacio.style.display = 'block'; });

filtros.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  filtros.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  let n = 0;
  galeria.querySelectorAll('figure').forEach(f => {
    const ver = b.dataset.f === 'all' || f.dataset.c === b.dataset.f;
    f.style.display = ver ? '' : 'none'; if (ver) n++;
  });
  vacio.textContent = 'Aún no hay proyectos cargados en esta categoría.';
  vacio.style.display = n ? 'none' : 'block';
};

galeria.onclick = e => {
  const im = e.target.closest('figure img');
  if (im) { visor.firstElementChild.src = im.src; visor.classList.add('on'); }
};
visor.onclick = () => visor.classList.remove('on');
