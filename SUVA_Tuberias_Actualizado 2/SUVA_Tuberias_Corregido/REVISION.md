# Revisión técnica de esta entrega

## Comprobaciones realizadas
- `node --check app.js`: JavaScript sin errores de sintaxis.
- Revisión automática de rutas locales de `index.html`: no se encontraron assets, hojas de estilo o scripts faltantes.
- Revisión de estructura del HTML: formularios, labels, logo y favicon presentes.
- Revisión de cobertura del catálogo: se localizaron las líneas oficiales solicitadas y las tres sucursales.
- Revisión de contraste de la paleta principal: blanco sobre `--suva-blue` = 4.86:1; blanco sobre `--suva-blue-strong` = 5.43:1; blanco sobre `--suva-blue-dark` = 11.67:1; texto `--muted` sobre blanco = 5.04:1.
- El correo de San Juan Bosco conserva el comentario `VERIFICAR` en HTML y JavaScript.

## Limitaciones de la prueba
- Se intentó realizar una captura automatizada con Chromium headless, pero el proceso no terminó correctamente en este entorno; por eso no se afirma que se haya completado una prueba visual automatizada.
- No se enviaron mensajes reales por WhatsApp, llamadas ni correos.
- No se probó la recepción de mensajes por parte de SUVA.
- Los iframes de Google Maps dependen de conexión externa y de las políticas del navegador del usuario.

## Antes de publicar
Revisar visualmente la página en Chrome/Edge/Safari, probar el carrito en celular y escritorio, abrir los tres enlaces de Google Maps y confirmar los datos marcados en `CHANGELOG.md`.
