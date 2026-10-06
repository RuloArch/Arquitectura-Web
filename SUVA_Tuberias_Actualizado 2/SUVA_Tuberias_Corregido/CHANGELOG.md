# CHANGELOG — SUVA Tuberías y Conexiones

## Versión actualizada

### Agregado a partir de la información oficial
- Sección **Quiénes somos** con origen guanajuatense, más de 30 años de experiencia, asesoría personalizada y referencia a certificaciones con principales marcas.
- Cobertura ampliada del catálogo para incluir las líneas indicadas por SUVA: PVC sanitario, Cédula 40, RD-26, Cédula 80, CPVC Cédula 80, CPVC CTS / FlowGuard Gold, alcantarillado, hidráulica con campana y anillo clases 5/7/10, corrugada, galvanizada, cobre, Tuboplus, tinacos, cisternas, cementos, válvulas y conexiones relacionadas.
- Sección de **3 sucursales**: Hidalgo, Delta y San Juan Bosco, con teléfono, correo, dirección, enlace “Cómo llegar” y mapa seleccionable.
- Horario general: **Lun–Vie 9:00–18:00 · Sáb 9:00–14:00 · Dom cerrado**.
- Formas de pago solicitadas: **Cheque, Depósito, Efectivo, Mastercard y Visa**.
- Formulario de contacto sin backend: permite abrir WhatsApp o `mailto:` con la información prellenada.
- Enlace **Conoce más de SUVA** hacia `https://www.suvaleon.com/`.
- Logo real recibido en el proyecto y favicon PNG generado a partir de ese archivo.

### Mejoras al flujo existente
- Se conservó el carrito editable y el guardado en `localStorage`.
- El pedido por WhatsApp ahora permite elegir **sucursal** y **modalidad**: recolección en sucursal o consulta de opción de entrega.
- El mensaje generado incluye la sucursal elegida, dirección y horario.
- Se mantuvo el envío final bajo control del usuario: la web abre WhatsApp con el mensaje preparado, pero no lo envía automáticamente.
- Se añadieron estados de foco visibles, labels y mejoras responsive para móvil.

### Descartado deliberadamente
- No se copió la frase “No ofrecemos garantías”. En su lugar se usan mensajes neutrales sobre confirmar condiciones, disponibilidad y especificaciones en sucursal.
- No se copiaron errores ortográficos, repeticiones ni texto de relleno SEO del sitio oficial.
- No se añadieron precios, garantías, marcas adicionales, cifras o certificaciones distintas de las indicadas en las fuentes proporcionadas.
- No se añadieron números de WhatsApp específicos para Delta o San Juan Bosco porque no fueron proporcionados. Esas tarjetas usan llamada; el formulario y el pedido utilizan el WhatsApp general publicado por SUVA.

### Verificar antes de publicar
- **Correo San Juan Bosco:** `ventasbosco@suvatuberiasyconexiones.com`. Se conserva exactamente como fue proporcionado y aparece comentado en `index.html` y `app.js` con `VERIFICAR`.
- Confirmar que los teléfonos de las tres sucursales siguen vigentes.
- Confirmar que el horario general aplica sin cambios a las tres sucursales.
- Confirmar si Delta y San Juan Bosco tienen números propios de WhatsApp. Si existen, se pueden agregar sin cambiar el resto del flujo.
- Sustituir las ilustraciones de catálogo por fotografías oficiales si SUVA cuenta con un banco de imágenes autorizado.
