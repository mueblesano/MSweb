# Instrucciones de diseño y desarrollo — Mueble Sano

Referencia estructural: restaurantetriciclo.com (sitio Wix). Contenido: "Informe maestro para el desarrollo web de Mueble Sano".
Se imita la **estructura y el ritmo visual**, no el contenido, las fotos ni la marca de Triciclo.

## 1. Qué se tomó de Triciclo

| Elemento de Triciclo | Cómo se traduce en Mueble Sano |
|---|---|
| Cabecera fija con logo y 6 enlaces | Cabecera transparente sobre la portada que pasa a fondo sólido al hacer scroll. En celular, menú desplegable. |
| Portada a pantalla completa con fotos que se alternan y una frase centrada | 3 fotos de proyectos reales con fundido cada 5,5 s, el título "Diseñamos espacios. Fabricamos soluciones." y 2 botones. |
| "Nuestro sueño": foto grande junto a texto largo | Sección **Nosotros**: foto + texto + misión, visión y valores. |
| Bloques alternados foto/texto (Cocina, Carta, Bodega) | Sección **Servicios** en tarjetas con foto (las 6 categorías del informe). |
| Cita destacada sobre fondo diferenciado ("La joya de Triciclo") | Sección **Tecnología**: fondo verde oscuro, frase destacada y tratamiento gráfico distinto, como pide el informe. |
| Banda con foto de fondo y botón ("Descubre las otras caras") | Banda de llamado a la acción antes del contacto. |
| Pie en 4 columnas (Estamos en / Llámanos / Escríbenos / Abierto) | Mismo pie de 4 columnas; los datos sin confirmar aparecen en amarillo. |
| Tipografía fina, mayúsculas con mucho espaciado, mucho aire | Jost Light (alternativa libre a Futura) y Libre Baskerville cursiva para frases destacadas, la misma serif que usa Triciclo. |

## 2. Qué se añadió porque Mueble Sano lo necesita

- Franja de 4 beneficios bajo la portada.
- Portafolio con filtros por categoría y ampliación de fotos.
- Proceso en 5 pasos, con la visita técnica gratuita como mensaje central.
- Preguntas frecuentes desplegables.
- Formulario de cotización completo y botón de WhatsApp siempre visible.

## 3. Identidad visual

- Verde principal `#5fae2e` (tomado del logo, la araucaria) y verde oscuro `#2f4a1f`.
- Fondos blancos y beige claro `#f5f3ee`; modo oscuro automático.
- Fotos reales de proyectos como protagonistas. Nada de imágenes de stock.

## 4. Mapa de secciones (orden de la página)

1. Cabecera · 2. Portada · 3. Franja de beneficios · 4. Nosotros · 5. Servicios · 6. Tecnología · 7. Proyectos · 8. Cómo trabajamos · 9. Preguntas frecuentes · 10. Banda de cotización · 11. Contacto · 12. Pie

Navegación interna con anclas (`#nosotros`, `#servicios`, `#tecnologia`, `#proyectos`, `#proceso`, `#contacto`). Sin páginas separadas.

## 5. Pasar de la maqueta al sitio final

La maqueta es **un solo archivo** con fotos incrustadas para poder verla de inmediato. Para publicar en GitHub Pages, separar según el informe:

```
mueble-sano/
├── index.html
├── css/style.css        ← contenido de la etiqueta <style>
├── js/main.js           ← contenido de la etiqueta <script>
├── data/proyectos.json  ← una entrada por foto del portafolio
├── img/                 ← fotos originales optimizadas (ver punto 6)
└── CNAME
```

Pasos:
1. Mover el CSS y el JS a sus archivos y enlazarlos desde `index.html`.
2. Reemplazar cada `data:image/jpeg;base64,...` por una ruta `img/...`.
3. Generar la galería desde `proyectos.json` (campos: nombre, categoría, comuna, fecha, descripción, materiales, fotos) en lugar de escribir cada `<figure>` a mano.
4. Conectar el formulario a un servicio de recepción (Formspree, Netlify Forms o función serverless) y mostrar el mensaje de confirmación **solo** si el envío fue exitoso.
5. Añadir metadatos SEO, datos estructurados (`LocalBusiness`) y analítica con evento de conversión al enviar el formulario.

## 6. Fotos

- Las 48 fotos vienen con nombres de Facebook; renombrar con nombres descriptivos (`cocina-isla-blanca.jpg`).
- Exportar en WebP o JPEG de 1600 px (portada) y 900 px (galería), y añadir `loading="lazy"` en las que están bajo la portada.
- La maqueta usa 22 de las 48. El resto sirve para completar el portafolio.
- **No hay ninguna foto de baño**: la tarjeta "Muebles de baño" y su filtro quedan marcados como pendientes.
- Pedir autorización antes de publicar fotos donde se vea a personas o que identifiquen al cliente.

## 7. Datos pendientes (no inventar)

Según el informe, antes de publicar hay que confirmar:

- Teléfono y WhatsApp vigentes. La maqueta usa el número del directorio Mercantil (+56 9 9275 6229) **solo** para probar el botón; es un dato histórico de terceros.
- Correo oficial, dirección y horario (el pie los muestra en amarillo).
- Comunas de atención, plazos de fabricación, garantías y condiciones de pago.
- Certificaciones antimicrobianas. No publicar porcentajes de eficacia (por ejemplo "99,9 %") ni afirmaciones de prevención de enfermedades sin ficha técnica.
- Servicios realmente ofrecidos (el informe pide contrastar las 6 categorías con el portafolio).

## 8. Criterios de calidad

- Probar en celular antes que en computador.
- Contraste de texto suficiente sobre las fotos de la portada (ya lleva una capa oscura).
- Textos alternativos descriptivos en cada foto.
- Formulario con validación y protección antispam.
- HTTPS activo con el dominio definitivo.
