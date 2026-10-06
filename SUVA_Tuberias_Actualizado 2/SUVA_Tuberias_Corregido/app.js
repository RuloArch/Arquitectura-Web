const BUSINESS = {
  name: 'SUVA Tuberías y Conexiones',
  whatsapp: '5214773068925',
  hours: 'Lun–Vie 9:00–18:00 · Sáb 9:00–14:00 · Dom cerrado',
  branches: {
    hidalgo: {
      name: 'Hidalgo',
      phone: '477 195-5688',
      tel: '+524771955688',
      email: 'ventas@suvatuberiayconexiones.com',
      address: 'Blvd. Hidalgo #1827, local 5, col. San Jerónimo 2, León, Gto., C.P. 37148',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Blvd.%20Hidalgo%201827%20Local%205%20San%20Jeronimo%202%20Leon%20Guanajuato%2037148',
      mapEmbed: 'https://www.google.com/maps?q=Blvd.%20Hidalgo%201827%20Local%205%2C%20San%20Jeronimo%202%2C%20Leon%2C%20Guanajuato%2037148&output=embed'
    },
    delta: {
      name: 'Delta',
      phone: '477 167-6205',
      tel: '+524771676205',
      email: 'ventasdelta@suvatuberiayconexiones.com',
      address: 'Av. Delta #915, fracc. Ind. Delta, León, Gto.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.%20Delta%20915%20Fracc.%20Industrial%20Delta%20Leon%20Guanajuato',
      mapEmbed: 'https://www.google.com/maps?q=Av.%20Delta%20915%2C%20Fracc.%20Industrial%20Delta%2C%20Leon%2C%20Guanajuato&output=embed'
    },
    bosco: {
      name: 'San Juan Bosco',
      phone: '477 688-2288',
      tel: '+524776882288',
      // VERIFICAR: el dominio se conserva tal como aparece en la fuente oficial hasta confirmación.
      email: 'ventasbosco@suvatuberiasyconexiones.com',
      address: 'Blvd. San Juan Bosco #3819, col. La Ermita, León, Gto., C.P. 37358',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Blvd.%20San%20Juan%20Bosco%203819%20La%20Ermita%20Leon%20Guanajuato%2037358',
      mapEmbed: 'https://www.google.com/maps?q=Blvd.%20San%20Juan%20Bosco%203819%2C%20La%20Ermita%2C%20Leon%2C%20Guanajuato%2037358&output=embed'
    }
  }
};


const PRODUCT_IMAGE_DIR = 'SUVA_imagenes_web_productos/assets/products';
const PRODUCT_PLACEHOLDER = `${PRODUCT_IMAGE_DIR}/producto-placeholder.webp`;

const products = [
  {id:'pvc-sanitaria',name:'Tubería PVC sanitaria',category:'PVC sanitario',image:`${PRODUCT_IMAGE_DIR}/pvc-sanitaria.webp`,description:'Línea de tubería para instalaciones sanitarias. La aplicación y especificación final se confirman al cotizar.',measures:['2”','3”','4”','6”'],presentation:'Tramo',tags:['sanitaria','drenaje','pvc']},
  {id:'pvc-ced40',name:'Tubería PVC Cédula 40',category:'PVC hidráulico',image:`${PRODUCT_IMAGE_DIR}/pvc-ced40.webp`,description:'Tubería PVC Cédula 40 dentro de las líneas comercializadas por SUVA.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Tramo',tags:['hidráulica','cedula 40','pvc']},
  {id:'pvc-ced80',name:'Tubería PVC Cédula 80',category:'PVC hidráulico',image:`${PRODUCT_IMAGE_DIR}/pvc-ced80.webp`,description:'Tubería PVC Cédula 80 para proyectos que requieren esta especificación.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Tramo',tags:['cedula 80','pvc','industrial']},
  {id:'pvc-rd26',name:'Tubería PVC RD-26',category:'PVC hidráulico',image:`${PRODUCT_IMAGE_DIR}/pvc-rd26.webp`,description:'Línea de tubería PVC RD-26 disponible para cotización según requerimiento.',measures:['1 1/2”','2”','3”','4”','6”'],presentation:'Tramo',tags:['rd26','pvc','hidráulica']},
  {id:'cpvc-cts',name:'Tubería CPVC CTS / FlowGuard Gold',category:'CPVC',image:`${PRODUCT_IMAGE_DIR}/cpvc-cts.webp`,description:'Línea CPVC CTS / FlowGuard Gold y opciones relacionadas. Disponibilidad y presentación se confirman al cotizar.',measures:['1/2”','3/4”','1”','1 1/4”','1 1/2”','2”'],presentation:'Tramo',tags:['cpvc','cts','flowguard gold']},
  {id:'cpvc-ced80',name:'Tubería CPVC Cédula 80',category:'CPVC',image:`${PRODUCT_IMAGE_DIR}/cpvc-ced80.webp`,description:'Tubería CPVC Cédula 80 dentro del portafolio comercial de SUVA.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Tramo',tags:['cpvc','cedula 80']},
  {id:'codo90-pvc',name:'Codo PVC 90°',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/codo90-pvc.webp`,description:'Conexión para cambio de dirección de 90° en líneas compatibles.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Pieza',tags:['codo','90','conexion','pvc']},
  {id:'codo45-pvc',name:'Codo PVC 45°',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/codo45-pvc.webp`,description:'Conexión para cambio de dirección de 45° en líneas compatibles.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Pieza',tags:['codo','45','conexion','pvc']},
  {id:'tee-pvc',name:'Tee PVC',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/tee-pvc.webp`,description:'Conexión en T para derivaciones dentro de una instalación compatible.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Pieza',tags:['tee','t','derivación','pvc']},
  {id:'cople-pvc',name:'Cople PVC',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/cople-pvc.webp`,description:'Conexión recta para unir tramos de tubería del mismo diámetro.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”','6”'],presentation:'Pieza',tags:['cople','unión','conexion','pvc']},
  {id:'reduccion-pvc',name:'Reducción PVC',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/reduccion-pvc.webp`,description:'Conexión para realizar transiciones entre diámetros compatibles.',measures:['1” x 3/4”','1 1/2” x 1”','2” x 1 1/2”','3” x 2”','4” x 3”'],presentation:'Pieza',tags:['reducción','reductor','conexion','pvc']},
  {id:'adaptador-pvc',name:'Adaptador PVC roscado',category:'Conexiones PVC',image:`${PRODUCT_IMAGE_DIR}/adaptador-pvc.webp`,description:'Adaptador para transición entre tipos de unión compatibles.',measures:['1/2”','3/4”','1”','1 1/2”','2”'],presentation:'Pieza',tags:['adaptador','rosca','conexion','pvc']},
  {id:'conexiones-cpvc',name:'Conexiones CPVC CTS / Cédula 80',category:'Conexiones CPVC',image:`${PRODUCT_IMAGE_DIR}/conexiones-cpvc.webp`,description:'Conexiones para líneas CPVC CTS y CPVC Cédula 80. Tipo y medida se confirman al cotizar.',measures:['Consultar tipo y medida'],presentation:'Pieza',tags:['cpvc','conexiones','cts','cedula 80','flowguard']},
  {id:'alcantarillado',name:'Tubería para alcantarillado',category:'Alcantarillado',image:`${PRODUCT_IMAGE_DIR}/alcantarillado.webp`,description:'Línea de tubería para sistemas de alcantarillado y conducción por gravedad.',measures:['4”','6”','8”','10”','12”'],presentation:'Tramo',tags:['alcantarillado','drenaje']},
  {id:'cople-alcantarillado',name:'Conexiones para alcantarillado',category:'Alcantarillado',image:`${PRODUCT_IMAGE_DIR}/cople-alcantarillado.webp`,description:'Conexiones para complementar líneas de alcantarillado. Tipo y medida se confirman al cotizar.',measures:['4”','6”','8”','10”','12”'],presentation:'Pieza',tags:['alcantarillado','conexiones','cople']},
  {id:'hidraulica-campana',name:'Tubería hidráulica con campana y anillo',category:'Hidráulica campana',image:`${PRODUCT_IMAGE_DIR}/hidraulica-campana.webp`,description:'Tubería hidráulica con campana y anillo en clases 5, 7 y 10.',measures:['Clase 5 · diámetro por confirmar','Clase 7 · diámetro por confirmar','Clase 10 · diámetro por confirmar'],presentation:'Tramo',tags:['campana','anillo','clase 5','clase 7','clase 10','hidráulica']},
  {id:'conexiones-hidraulica-campana',name:'Conexiones para línea hidráulica con campana',category:'Hidráulica campana',image:`${PRODUCT_IMAGE_DIR}/conexiones-hidraulica-campana.webp`,description:'Conexiones para complementar la línea hidráulica con campana y anillo.',measures:['Consultar tipo y medida'],presentation:'Pieza',tags:['campana','anillo','conexiones','hidráulica']},
  {id:'tuberia-corrugada',name:'Tubería corrugada',category:'Corrugada',image:`${PRODUCT_IMAGE_DIR}/tuberia-corrugada.webp`,description:'Línea de tubería corrugada comercializada por SUVA. Medida y presentación se confirman al cotizar.',measures:['Consultar medida disponible'],presentation:'Tramo',tags:['corrugada','tubería']},
  {id:'conexiones-corrugada',name:'Conexiones para tubería corrugada',category:'Corrugada',image:`${PRODUCT_IMAGE_DIR}/conexiones-corrugada.webp`,description:'Conexiones para complementar líneas de tubería corrugada.',measures:['Consultar tipo y medida'],presentation:'Pieza',tags:['corrugada','conexiones']},
  {id:'tuberia-galvanizada',name:'Tubería galvanizada',category:'Metálicas y Tuboplus',image:`${PRODUCT_IMAGE_DIR}/tuberia-galvanizada.webp`,description:'Tubería galvanizada dentro de las líneas comercializadas por SUVA.',measures:['Consultar medida disponible'],presentation:'Tramo',tags:['galvanizada','metal','tubería']},
  {id:'tuberia-cobre',name:'Tubería de cobre',category:'Metálicas y Tuboplus',image:`${PRODUCT_IMAGE_DIR}/tuberia-cobre.webp`,description:'Tubería de cobre disponible para cotización según requerimiento.',measures:['Consultar medida disponible'],presentation:'Tramo',tags:['cobre','metal','tubería']},
  {id:'tuberia-tuboplus',name:'Tubería Tuboplus',category:'Metálicas y Tuboplus',image:`${PRODUCT_IMAGE_DIR}/tuberia-tuboplus.webp`,description:'Línea Tuboplus comercializada por SUVA. La especificación se confirma con la sucursal.',measures:['Consultar medida disponible'],presentation:'Tramo',tags:['tuboplus','tubería']},
  {id:'conexiones-metal-tuboplus',name:'Conexiones para galvanizada, cobre y Tuboplus',category:'Metálicas y Tuboplus',image:`${PRODUCT_IMAGE_DIR}/conexiones-metal-tuboplus.webp`,description:'Conexiones para las líneas galvanizada, cobre y Tuboplus. Tipo y medida se confirman al cotizar.',measures:['Consultar tipo y medida'],presentation:'Pieza',tags:['galvanizada','cobre','tuboplus','conexiones']},
  {id:'tinacos',name:'Tinacos',category:'Almacenamiento',image:`${PRODUCT_IMAGE_DIR}/tinacos.webp`,description:'Tinacos para almacenamiento de agua. Capacidad, marca y disponibilidad se confirman al cotizar.',measures:['Consultar capacidad disponible'],presentation:'Pieza',tags:['tinaco','almacenamiento','agua']},
  {id:'cisternas',name:'Cisternas',category:'Almacenamiento',image:`${PRODUCT_IMAGE_DIR}/cisternas.webp`,description:'Cisternas dentro de la oferta complementaria de SUVA. Capacidad y disponibilidad se confirman al cotizar.',measures:['Consultar capacidad disponible'],presentation:'Pieza',tags:['cisterna','almacenamiento','agua']},
  {id:'valvula-bola',name:'Válvula de bola PVC',category:'Válvulas',image:`${PRODUCT_IMAGE_DIR}/valvula-bola.webp`,description:'Válvula de accionamiento manual para apertura y cierre de flujo en instalaciones compatibles.',measures:['1/2”','3/4”','1”','1 1/2”','2”','3”','4”'],presentation:'Pieza',tags:['válvula','bola','cierre']},
  {id:'cemento-pvc',name:'Cementos para PVC',category:'Cementos',image:`${PRODUCT_IMAGE_DIR}/cemento-pvc.webp`,description:'Cementos para diferentes tipos de PVC. Producto y presentación se confirman al cotizar.',measures:['Presentación por confirmar'],presentation:'Lata',tags:['cemento','pegamento','adhesivo','pvc']}
];

let activeCategory = 'all';
let activeSearch = '';
let storageProblem = false;
let cart = loadCart();

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const productGrid = $('#productGrid');
const categoryFilter = $('#categoryFilter');
const categoryChips = $('#categoryChips');
const searchInput = $('#searchInput');
const cartDrawer = $('#cartDrawer');
const cartOverlay = $('#cartOverlay');
const productDialog = $('#productDialog');

function validQty(value) {
  return Number.isSafeInteger(value) && value >= 1 && value <= 9999;
}

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem('suva-cart') || '[]');
    if (!Array.isArray(raw)) return [];
    const clean = [];
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue;
      const product = products.find((p) => p.id === item.productId);
      if (!product || !product.measures.includes(item.measure) || !validQty(item.qty)) continue;
      const key = `${product.id}__${item.measure}`;
      const existing = clean.find((i) => i.key === key);
      if (existing) existing.qty = Math.min(9999, existing.qty + item.qty);
      else clean.push({key, productId: product.id, measure: item.measure, qty: item.qty});
    }
    return clean;
  } catch {
    storageProblem = true;
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem('suva-cart', JSON.stringify(cart));
    storageProblem = false;
  } catch {
    storageProblem = true;
    showToast('No se pudo guardar el carrito. Se conservará solo mientras esta página siga abierta.');
  }
  renderCart();
  $('#storageNotice').hidden = !storageProblem;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

function icon(id) {
  return `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function normalizeSearch(text = '') {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[”″]/g, ' pulgadas ');
}

function initCategories() {
  const categories = [...new Set(products.map((product) => product.category))];
  categoryFilter.insertAdjacentHTML('beforeend', categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join(''));
  categoryChips.innerHTML = `<button class="chip active" type="button" data-category="all">Todos</button>${categories.map((category) => `<button class="chip" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}`;
}

function filteredProducts() {
  const query = normalizeSearch(activeSearch.trim());
  return products.filter((product) => {
    const categoryMatches = activeCategory === 'all' || product.category === activeCategory;
    const searchable = [product.name, product.category, product.description, ...product.measures, ...product.tags].join(' ');
    return categoryMatches && normalizeSearch(searchable).includes(query);
  });
}

function renderProducts() {
  const list = filteredProducts();
  $('#resultCount').textContent = `${list.length} producto${list.length === 1 ? '' : 's'} encontrados`;
  $('#emptyState').hidden = list.length > 0;
  productGrid.innerHTML = list.map((product) => `
    <article class="product-card">
      <div class="product-media">
        <span class="category-badge">${escapeHtml(product.category)}</span>
        <img src="${product.image}" alt="Ilustración de ${escapeHtml(product.name)}" loading="lazy" decoding="async" width="500" height="500" onerror="this.onerror=null;this.src='${PRODUCT_PLACEHOLDER}'">
      </div>
      <div class="product-body">
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-measures"><strong>Opciones:</strong> ${escapeHtml(product.measures.slice(0, 3).join(' · '))}${product.measures.length > 3 ? ' · +' : ''}</div>
        <button class="btn btn-secondary product-open" type="button" data-id="${product.id}">Ver producto y agregar</button>
      </div>
    </article>
  `).join('');
}

function openProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  $('#dialogContent').innerHTML = `
    <div class="dialog-grid">
      <div class="dialog-media"><img src="${product.image}" alt="Ilustración de ${escapeHtml(product.name)}" decoding="async" width="500" height="500" onerror="this.onerror=null;this.src='${PRODUCT_PLACEHOLDER}'"></div>
      <div class="dialog-info">
        <span class="eyebrow">${escapeHtml(product.category)}</span>
        <h2 id="productTitle">${escapeHtml(product.name)}</h2>
        <p>${escapeHtml(product.description)}</p>
        <ul class="detail-list">
          <li><strong>Presentación:</strong> ${escapeHtml(product.presentation)}</li>
          <li><strong>Disponibilidad:</strong> Se confirma al cotizar</li>
          <li><strong>Precio:</strong> Se cotiza según producto y cantidad</li>
        </ul>
        <div class="product-form">
          <label>Medida / opción
            <select id="dialogMeasure">${product.measures.map((measure) => `<option>${escapeHtml(measure)}</option>`).join('')}</select>
          </label>
          <label>Cantidad
            <div class="quantity-input">
              <button type="button" id="qtyMinus" aria-label="Restar cantidad">−</button>
              <input id="dialogQty" type="number" min="1" max="9999" step="1" value="1" inputmode="numeric" aria-describedby="qtyError">
              <button type="button" id="qtyPlus" aria-label="Sumar cantidad">+</button>
            </div>
          </label>
          <p id="qtyError" class="validation-message" role="alert" hidden></p>
          <button class="btn btn-primary" type="button" id="dialogAdd">${icon('i-cart')} Agregar al pedido</button>
        </div>
      </div>
    </div>`;

  productDialog.showModal();
  $('#qtyMinus').onclick = () => { $('#dialogQty').value = Math.max(1, (Number($('#dialogQty').value) || 1) - 1); };
  $('#qtyPlus').onclick = () => { $('#dialogQty').value = Math.min(9999, (Number($('#dialogQty').value) || 1) + 1); };
  $('#dialogAdd').onclick = () => {
    const qty = Number($('#dialogQty').value);
    if (!addToCart(product.id, $('#dialogMeasure').value, qty)) {
      $('#qtyError').textContent = 'Escribe una cantidad entera entre 1 y 9999. El total de esta partida no puede superar 9999.';
      $('#qtyError').hidden = false;
      $('#dialogQty').setAttribute('aria-invalid', 'true');
      $('#dialogQty').focus();
      return;
    }
    productDialog.close();
    showToast(storageProblem ? 'Producto agregado; guardado permanente no disponible.' : 'Producto agregado al pedido');
  };
}

function addToCart(productId, measure, qty) {
  const product = products.find((item) => item.id === productId);
  if (!product || !product.measures.includes(measure) || !validQty(qty)) return false;
  const key = `${productId}__${measure}`;
  const found = cart.find((item) => item.key === key);
  if (found) {
    if (!validQty(found.qty + qty)) return false;
    found.qty += qty;
  } else {
    cart.push({key, productId, measure, qty});
  }
  saveCart();
  return true;
}

function updateQty(key, delta) {
  const item = cart.find((entry) => entry.key === key);
  if (!item) return;
  const qty = item.qty + delta;
  if (!validQty(qty)) return;
  item.qty = qty;
  saveCart();
}

function removeItem(key) {
  cart = cart.filter((item) => item.key !== key);
  saveCart();
}

function renderCart() {
  const count = cart.reduce((total, item) => total + item.qty, 0);
  $('#cartCount').textContent = count;
  const empty = cart.length === 0;
  $('#cartEmpty').hidden = !empty;
  $('#cartContent').hidden = empty;
  $('#cartFooter').hidden = empty;
  if (empty) return;

  $('#cartItems').innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return '';
    return `<div class="cart-item">
      <div class="cart-thumb"><img src="${product.image}" alt="" loading="lazy" decoding="async" width="64" height="64" onerror="this.onerror=null;this.src='${PRODUCT_PLACEHOLDER}'"></div>
      <div>
        <h4>${escapeHtml(product.name)}</h4>
        <small>${escapeHtml(item.measure)} · ${escapeHtml(product.presentation)}</small>
        <div class="qty-row">
          <button type="button" data-action="minus" data-key="${escapeHtml(item.key)}" aria-label="Restar una unidad">${icon('i-minus')}</button>
          <strong>${item.qty}</strong>
          <button type="button" data-action="plus" data-key="${escapeHtml(item.key)}" aria-label="Sumar una unidad">${icon('i-plus')}</button>
        </div>
      </div>
      <button class="icon-btn delete-item" type="button" data-action="delete" data-key="${escapeHtml(item.key)}" aria-label="Eliminar producto">${icon('i-trash')}</button>
    </div>`;
  }).join('');

  $('#cartLines').textContent = cart.length;
  $('#cartUnits').textContent = count;
}

let cartReturnFocus = null;
function openCart() {
  if (cartDrawer.classList.contains('open')) return;
  cartReturnFocus = document.activeElement;
  cartDrawer.inert = false;
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  for (const element of document.querySelectorAll('header,main,footer,.topbar')) element.inert = true;
  $('#cartClose').focus();
}

function closeCart() {
  if (!cartDrawer.classList.contains('open')) return;
  for (const element of document.querySelectorAll('header,main,footer,.topbar')) element.inert = false;
  cartDrawer.classList.remove('open');
  cartOverlay.hidden = true;
  document.body.style.overflow = '';
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartDrawer.inert = true;
  if (cartReturnFocus && cartReturnFocus.isConnected) cartReturnFocus.focus();
  else $('#cartButton').focus();
}

cartDrawer.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const focusable = [...cartDrawer.querySelectorAll('button,input,select,textarea,a[href]')].filter((element) => !element.disabled && element.getClientRects().length);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function updateCartBranchInfo() {
  const branch = BUSINESS.branches[$('#pickupBranch').value] || BUSINESS.branches.hidalgo;
  $('#cartBranchInfo').innerHTML = `<strong>${escapeHtml(branch.name)}</strong><br>${escapeHtml(branch.address)}<br>${escapeHtml(BUSINESS.hours)}`;
}

function makeWhatsAppMessage() {
  const name = $('#clientName').value.trim();
  const phone = $('#clientPhone').value.trim();
  const type = $('#orderType').value;
  const branch = BUSINESS.branches[$('#pickupBranch').value] || BUSINESS.branches.hidalgo;
  const fulfillment = $('#fulfillmentMethod').value;
  const notes = $('#clientNotes').value.trim();

  if (!cart.length) {
    showToast('Agrega al menos un producto');
    return null;
  }
  if (!name || !phone) {
    showToast('Completa nombre o empresa y teléfono');
    (!name ? $('#clientName') : $('#clientPhone')).focus();
    return null;
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (!/^[+()\d\s-]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    showToast('Escribe un teléfono válido de 10 a 15 dígitos');
    $('#clientPhone').focus();
    return null;
  }

  const lines = cart.map((item, index) => {
    const product = products.find((entry) => entry.id === item.productId);
    return `${index + 1}. ${product.name}\n   Medida / opción: ${item.measure}\n   Cantidad: ${item.qty} ${product.presentation.toLowerCase()}${item.qty === 1 ? '' : 's'}`;
  }).join('\n\n');

  return `Hola, quiero solicitar una cotización con SUVA Tuberías y Conexiones.\n\n*DATOS DEL CLIENTE*\nNombre / empresa: ${name}\nTeléfono: ${phone}\nTipo de solicitud: ${type}\nModalidad: ${fulfillment}\nSucursal elegida: ${branch.name}\nHorario: ${BUSINESS.hours}\nDirección: ${branch.address}\n\n*PEDIDO*\n${lines}${notes ? `\n\n*OBSERVACIONES*\n${notes}` : ''}\n\nQuedo pendiente de disponibilidad y cotización. Gracias.`;
}

function sendWhatsApp() {
  const message = makeWhatsAppMessage();
  if (!message) return;
  const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function getContactData() {
  const name = $('#contactName').value.trim();
  const email = $('#contactEmail').value.trim();
  const phone = $('#contactPhone').value.trim();
  const message = $('#contactMessage').value.trim();
  const branchKey = $('#contactBranch').value;
  const branch = BUSINESS.branches[branchKey] || BUSINESS.branches.hidalgo;
  const error = $('#contactError');

  error.hidden = true;
  for (const field of ['#contactName', '#contactEmail', '#contactPhone', '#contactMessage']) $(field).removeAttribute('aria-invalid');

  if (!name || !email || !phone || !message) {
    error.textContent = 'Completa nombre, email, teléfono y mensaje.';
    error.hidden = false;
    const firstEmpty = [$('#contactName'), $('#contactEmail'), $('#contactPhone'), $('#contactMessage')].find((field) => !field.value.trim());
    if (firstEmpty) { firstEmpty.setAttribute('aria-invalid', 'true'); firstEmpty.focus(); }
    return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = 'Escribe un email válido.';
    error.hidden = false;
    $('#contactEmail').setAttribute('aria-invalid', 'true');
    $('#contactEmail').focus();
    return null;
  }
  const digits = phone.replace(/\D/g, '');
  if (!/^[+()\d\s-]+$/.test(phone) || digits.length < 10 || digits.length > 15) {
    error.textContent = 'Escribe un teléfono válido de 10 a 15 dígitos.';
    error.hidden = false;
    $('#contactPhone').setAttribute('aria-invalid', 'true');
    $('#contactPhone').focus();
    return null;
  }
  return {name, email, phone, message, branch};
}

function contactViaWhatsApp(event) {
  event.preventDefault();
  const data = getContactData();
  if (!data) return;
  const text = `Hola, quiero información de SUVA.\n\nNombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nSucursal de interés: ${data.branch.name}\n\nMensaje:\n${data.message}`;
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
}

function contactViaEmail() {
  const data = getContactData();
  if (!data) return;
  const subject = `Consulta desde la web · Sucursal ${data.branch.name}`;
  const body = `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nSucursal de interés: ${data.branch.name}\n\nMensaje:\n${data.message}`;
  window.location.href = `mailto:${data.branch.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function switchMap(branchKey) {
  const branch = BUSINESS.branches[branchKey];
  if (!branch) return;
  $('#branchMap').src = branch.mapEmbed;
  $('#branchMap').title = `Mapa de SUVA sucursal ${branch.name}`;
  $('#mapTitle').textContent = `Mapa · Sucursal ${branch.name}`;
  $('#mapDirections').href = branch.mapsUrl;
  $('#contactBranch').value = branchKey;
  $('.map-panel').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center'});
}

let toastTimer;
function showToast(text) {
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function resetFilters() {
  activeCategory = 'all';
  activeSearch = '';
  searchInput.value = '';
  categoryFilter.value = 'all';
  $$('.chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.category === 'all'));
  renderProducts();
}

initCategories();
renderProducts();
renderCart();
updateCartBranchInfo();
$('#year').textContent = new Date().getFullYear();

searchInput.addEventListener('input', (event) => { activeSearch = event.target.value; renderProducts(); });
categoryFilter.addEventListener('change', (event) => {
  activeCategory = event.target.value;
  $$('.chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.category === activeCategory));
  renderProducts();
});
categoryChips.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  categoryFilter.value = activeCategory;
  $$('.chip').forEach((chip) => chip.classList.toggle('active', chip === button));
  renderProducts();
});
productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.product-open');
  if (button) openProduct(button.dataset.id);
});

$('#clearFilters').onclick = resetFilters;
$('#emptyClear').onclick = resetFilters;
$('#cartButton').onclick = openCart;
$('#cartClose').onclick = closeCart;
cartOverlay.onclick = closeCart;
$('#browseProducts').onclick = () => { closeCart(); location.hash = 'catalogo'; };
$('#dialogClose').onclick = () => productDialog.close();
productDialog.addEventListener('click', (event) => { if (event.target === productDialog) productDialog.close(); });
$('#cartItems').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const {action, key} = button.dataset;
  if (action === 'plus') updateQty(key, 1);
  if (action === 'minus') updateQty(key, -1);
  if (action === 'delete') removeItem(key);
});
$('#pickupBranch').addEventListener('change', updateCartBranchInfo);
$('#sendWhatsapp').onclick = sendWhatsApp;
$('#clientForm').addEventListener('submit', (event) => { event.preventDefault(); sendWhatsApp(); });
$('#storageNotice').hidden = !storageProblem;
$('#clearCart').onclick = () => {
  if (confirm('¿Vaciar todo el pedido?')) {
    cart = [];
    saveCart();
  }
};
$('#wholesaleButton').onclick = () => {
  $('#orderType').value = 'Mayoreo';
  openCart();
  showToast('Solicitud marcada como mayoreo');
};
$('#contactForm').addEventListener('submit', contactViaWhatsApp);
$('#contactEmailButton').addEventListener('click', contactViaEmail);
$('#branchesGrid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-map-branch]');
  if (button) switchMap(button.dataset.mapBranch);
});
$('#menuBtn').onclick = () => {
  const nav = $('#mainNav');
  const open = nav.classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', String(open));
};
$$('#mainNav a').forEach((link) => {
  link.onclick = () => {
    $('#mainNav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
  };
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartDrawer.classList.contains('open')) closeCart();
});
