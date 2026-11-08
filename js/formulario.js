// Formulario de cotización.
// PENDIENTE: conectar a un servicio de recepción (Formspree, Netlify Forms o función serverless).
// El mensaje de confirmación debe mostrarse SOLO si el envío fue exitoso.
const form = document.getElementById('fm');
const ok = document.getElementById('ok');

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  // const resp = await fetch('URL_DEL_SERVICIO', { method: 'POST', body: new FormData(form) });
  // if (!resp.ok) { ok.textContent = 'No pudimos enviar tu solicitud. Intenta por WhatsApp.'; ok.style.display = 'block'; return; }
  ok.textContent = 'Maqueta: aquí aparecerá la confirmación solo después de un envío real exitoso.';
  ok.style.display = 'block';
});
