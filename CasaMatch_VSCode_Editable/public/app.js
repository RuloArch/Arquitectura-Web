const $ = id => document.getElementById(id);

const state = { results: [] };

const fmt = n => n
  ? new Intl.NumberFormat('es-MX',{
      style:'currency',
      currency:'MXN',
      maximumFractionDigits:0
    }).format(n)
  : 'Precio no detectado';

function escapeHtml(value=''){
  return String(value)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

function safeUrl(value=''){
  try{
    const url=new URL(value,location.origin);
    return ['http:','https:'].includes(url.protocol) ? url.href : '#';
  }catch{
    return '#';
  }
}

async function jfetch(url,opt){
  const response=await fetch(url,opt);
  const text=await response.text();

  if(!text) throw new Error('El buscador respondió vacío.');

  let data;
  try{ data=JSON.parse(text); }
  catch{ throw new Error('CasaMatch recibió una respuesta no válida.'); }

  if(!response.ok){
    throw new Error(data.error || `Error HTTP ${response.status}`);
  }

  return data;
}

async function health(){
  const pill=$('serverStatus');
  try{
    await jfetch('/api/health');
    pill.classList.remove('error');
    pill.classList.add('ok');
    pill.querySelector('span:last-child').textContent='Buscador activo';
  }catch{
    pill.classList.remove('ok');
    pill.classList.add('error');
    pill.querySelector('span:last-child').textContent='Buscador desconectado';
  }
}

function sourceStatusText(report){
  if(report.status==='ok') return report.found ? `${report.found} candidatos` : 'Fuente disponible';
  if(report.status==='timeout') return 'Tardó demasiado';
  if(report.status==='blocked') return 'Acceso bloqueado';
  if(report.status==='special') return 'Integración especial';
  if(report.status==='error') return 'No disponible';
  return report.status || 'Pendiente';
}

async function loadSources(){
  const grid=$('sourcesGrid');

  try{
    const sources=await jfetch('/api/sources');
    grid.innerHTML=sources.map(source=>`
      <article class="source-card">
        <strong>${escapeHtml(source.name)}</strong>
        <p>${escapeHtml(source.url)}</p>
        <span class="source-status ${source.mode==='special'?'special':''}">
          ${source.mode==='special'?'Integración especial':'Lista para consultar'}
        </span>
      </article>
    `).join('');
  }catch(error){
    grid.innerHTML=`
      <article class="source-card">
        <strong>No hay conexión con CasaMatch</strong>
        <p>${escapeHtml(error.message)}</p>
        <span class="source-status error">Sin conexión</span>
      </article>
    `;
  }
}

function getFilters(){
  return {
    operation:document.querySelector('input[name="operation"]:checked').value,
    city:$('city').value.trim(),
    maxPrice:Number($('maxPrice').value || 0),
    type:$('type').value,
    bedrooms:Number($('bedrooms').value || 0),
    bathrooms:Number($('bathrooms').value || 0)
  };
}

function renderSources(reports=[]){
  $('sourcesGrid').innerHTML=reports.map(report=>`
    <article class="source-card">
      <strong>${escapeHtml(report.name)}</strong>
      <p>
        ${escapeHtml(sourceStatusText(report))}
        ${report.ms ? ` · ${escapeHtml(report.ms)} ms` : ''}
        ${report.message ? `<br>${escapeHtml(report.message)}` : ''}
      </p>
      <span class="source-status ${escapeHtml(report.status)}">${escapeHtml(report.status)}</span>
      <a href="${escapeHtml(safeUrl(report.url))}" target="_blank" rel="noopener">Abrir fuente →</a>
    </article>
  `).join('');
}

function sortedResults(){
  const data=[...state.results];

  if($('sortBy').value==='price'){
    data.sort((a,b)=>(a.price||Infinity)-(b.price||Infinity));
  }else{
    data.sort((a,b)=>(b.match||0)-(a.match||0));
  }

  return data;
}

function renderResults(){
  const grid=$('resultsGrid');
  const empty=$('emptyState');
  const data=sortedResults();

  if(!data.length){
    grid.innerHTML='';
    empty.hidden=false;
    return;
  }

  empty.hidden=true;

  grid.innerHTML=data.map((p,index)=>`
    <article class="result-card ${index===0?'best':''}">
      <div class="result-accent"></div>
      <div class="result-body">
        <div class="result-top">
          <div class="result-source">
            ${index===0?'<span class="best-label">★ MEJOR COINCIDENCIA</span>':''}
            ${escapeHtml(p.source)}
          </div>
          <div class="match-score">${Number(p.match||0)}%</div>
        </div>

        <h3>${escapeHtml(p.title || 'Propiedad publicada')}</h3>
        <div class="price">${fmt(p.price)}</div>

        <div class="features">
          ${p.bedrooms!=null?`<span>${escapeHtml(p.bedrooms)} recámaras</span>`:''}
          ${p.bathrooms!=null?`<span>${escapeHtml(p.bathrooms)} baños</span>`:''}
        </div>

        ${p.alsoSeen?.length>1
          ? `<div class="also-seen">También localizada en ${escapeHtml(p.alsoSeen.join(', '))}</div>`
          : ''}

        <a class="original-link" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener">
          <span>Ver anuncio original</span>
          <b>↗</b>
        </a>
      </div>
    </article>
  `).join('');
}

async function runSearch(){
  const loading=$('loadingCard');
  loading.hidden=false;

  $('resultsGrid').innerHTML='';
  $('emptyState').hidden=true;
  $('resultsSummary').textContent='Consultando fuentes y comparando candidatos…';

  try{
    const data=await jfetch('/api/search',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(getFilters())
    });

    state.results=data.listings || [];

    const sourceWord=data.totals.responded===1?'fuente respondió':'fuentes respondieron';
    const optionWord=data.totals.unique===1?'opción única':'opciones únicas';

    $('resultsSummary').textContent=
      `${data.totals.unique} ${optionWord} · `+
      `${data.totals.responded} ${sourceWord} · `+
      `${data.totals.raw} candidatos detectados`+
      `${data.cached?' · búsqueda acelerada con caché':''}.`;

    renderSources(data.reports || []);
    renderResults();
  }catch(error){
    state.results=[];
    $('resultsSummary').textContent='No se pudo completar la búsqueda.';
    $('emptyState').hidden=true;

    $('resultsGrid').innerHTML=`
      <article class="result-card">
        <div class="result-accent"></div>
        <div class="result-body">
          <div class="result-source">CASAMATCH</div>
          <h3>No pudimos consultar las fuentes</h3>
          <div class="also-seen">${escapeHtml(error.message)}</div>
        </div>
      </article>
    `;
  }finally{
    loading.hidden=true;
  }
}

$('searchForm').addEventListener('submit',event=>{
  event.preventDefault();
  runSearch();
  $('resultados').scrollIntoView({behavior:'smooth',block:'start'});
});

$('sortBy').addEventListener('change',renderResults);

document.querySelectorAll('[data-step]').forEach(button=>{
  button.addEventListener('click',()=>{
    const input=$(button.dataset.step);
    const dir=Number(button.dataset.dir);
    const min=Number(input.min || 0);
    const max=Number(input.max || 99);
    input.value=Math.min(max,Math.max(min,Number(input.value || 0)+dir));
  });
});

document.querySelectorAll('input[name="operation"]').forEach(input=>{
  input.addEventListener('change',()=>{
    if(!input.checked) return;
    $('maxPrice').value=input.value==='renta' ? 18000 : 3000000;
  });
});

health();
loadSources();


function setLargeText(enabled){
  document.documentElement.classList.toggle('large-text',enabled);
  const btn=$('textSizeBtn');
  if(btn){
    btn.setAttribute('aria-pressed',String(enabled));
    btn.querySelector('span:last-child').textContent=enabled?'Texto normal':'Texto grande';
    btn.querySelector('span:first-child').textContent=enabled?'A':'A+';
  }
  try{localStorage.setItem('casamatch-large-text',enabled?'1':'0')}catch{}
}

$('textSizeBtn')?.addEventListener('click',()=>{
  setLargeText(!document.documentElement.classList.contains('large-text'));
});

try{
  if(localStorage.getItem('casamatch-large-text')==='1'){
    setLargeText(true);
  }
}catch{}
