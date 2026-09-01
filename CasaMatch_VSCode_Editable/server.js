const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

const SOURCES = [
  {id:'inmuebles24',name:'Inmuebles24',mode:'public',url:'https://www.inmuebles24.com/casas-en-renta-en-leon.html'},
  {id:'lamudi',name:'Lamudi',mode:'public',url:'https://www.lamudi.com.mx/guanajuato/leon/casa/for-rent/'},
  {id:'facebook',name:'Facebook Groups',mode:'special',url:'https://www.facebook.com/groups/127471917663433/?locale=es_LA'},
  {id:'hogare',name:'Hogare',mode:'public',url:'https://hogare.mx/propiedades/'},
  {id:'propiedades',name:'Propiedades.com',mode:'public',url:'https://propiedades.com/leon/casas-renta'},
  {id:'rentola',name:'Rentola',mode:'public',url:'https://rentola.mx/renta/leon'},
  {id:'mercadolibre',name:'Mercado Libre Inmuebles',mode:'public',url:'https://inmuebles.mercadolibre.com.mx/casas/renta/guanajuato/leon/'},
  {id:'vivanuncios',name:'Vivanuncios',mode:'public',url:'https://www.vivanuncios.com.mx/s-renta-inmuebles/leon/v1c1098l10339p1'},
  {id:'connectleon',name:'Connect León',mode:'public',url:'https://connectleon.com/renta-de-propiedades/'},
  {id:'pincali',name:'Pincali',mode:'public',url:'https://www.pincali.com/inmuebles/casas-en-renta-en-leon-guanajuato'}
];

const CACHE = new Map();
const CACHE_TTL = 3 * 60 * 1000;

function json(res,status,obj){
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'content-type':'application/json; charset=utf-8',
    'cache-control':'no-store',
    'content-length':Buffer.byteLength(body)
  });
  res.end(body);
}

function htmlDecode(s=''){
  return s
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&quot;/gi,'"')
    .replace(/&#39;/gi,"'")
    .replace(/&lt;/gi,'<')
    .replace(/&gt;/gi,'>');
}

function strip(s=''){
  return htmlDecode(
    s.replace(/<script[\s\S]*?<\/script>/gi,' ')
     .replace(/<style[\s\S]*?<\/style>/gi,' ')
     .replace(/<[^>]+>/g,' ')
     .replace(/\s+/g,' ')
  ).trim();
}

function money(v){
  if(!v) return null;
  const n = Number(String(v).replace(/[^\d]/g,''));
  return Number.isFinite(n) && n>0 ? n : null;
}

function absolute(base, href){
  try{return new URL(href,base).href}catch{return base}
}

function extractListings(source,html){
  const out=[]; const seen=new Set();
  const re=/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;

  while((m=re.exec(html)) && out.length<100){
    const href=m[1];
    const title=strip(m[2]).slice(0,180);
    if(!title || title.length<5) continue;

    const low=(href+' '+title).toLowerCase();
    if(!/(casa|depart|inmueble|propiedad|renta|alquiler|venta)/.test(low)) continue;

    const start=Math.max(0,m.index-1100);
    const end=Math.min(html.length,re.lastIndex+1800);
    const block=strip(html.slice(start,end));

    const pm=block.match(/(?:MXN|M\.N\.|MN|\$)\s*([\d][\d.,]{2,})/i);
    if(!pm) continue;

    const price=money(pm[1]);
    if(!price) continue;

    const bed=block.match(/(\d+(?:\.\d+)?)\s*(?:rec[aá]maras?|habitaciones?|dormitorios?|rec\.?)/i);
    const bath=block.match(/(\d+(?:\.\d+)?)\s*(?:baños?|banos?|bath(?:room)?s?)/i);
    const url=absolute(source.url,href);
    const key=url+'|'+price;

    if(seen.has(key)) continue;
    seen.add(key);

    out.push({
      source:source.name,
      sourceId:source.id,
      title,
      url,
      price,
      bedrooms:bed?Number(bed[1]):null,
      bathrooms:bath?Number(bath[1]):null
    });
  }
  return out;
}

function score(p,f){
  let s=100;

  if(f.maxPrice && p.price){
    if(p.price>f.maxPrice){
      s-=Math.min(60,((p.price-f.maxPrice)/f.maxPrice)*120);
    } else {
      s+=Math.min(4,((f.maxPrice-p.price)/f.maxPrice)*8);
    }
  }

  if(f.bedrooms){
    if(p.bedrooms==null) s-=5;
    else if(p.bedrooms<f.bedrooms) s-=(f.bedrooms-p.bedrooms)*18;
    else s+=2;
  }

  if(f.bathrooms){
    if(p.bathrooms==null) s-=5;
    else if(p.bathrooms<f.bathrooms) s-=(f.bathrooms-p.bathrooms)*14;
    else s+=2;
  }

  return Math.max(1,Math.min(100,Math.round(s)));
}

function fingerprint(p){
  return (p.title||'')
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñ]+/gi,' ')
    .trim()
    .split(' ')
    .slice(0,7)
    .join(' ')
    +'|'+Math.round((p.price||0)/500);
}

async function querySource(source,filters){
  if(source.mode==='special'){
    return {
      id:source.id,name:source.name,status:'special',found:0,url:source.url,
      message:'Requiere acceso o integración autorizada.'
    };
  }

  const started=Date.now();
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),6500);

  try{
    const r=await fetch(source.url,{
      headers:{
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36',
        'accept-language':'es-MX,es;q=0.9',
        'accept':'text/html,application/xhtml+xml'
      },
      redirect:'follow',
      signal:controller.signal
    });

    if(!r.ok){
      return {
        id:source.id,name:source.name,status:'blocked',found:0,url:source.url,
        ms:Date.now()-started,message:'HTTP '+r.status
      };
    }

    const html=await r.text();
    const listings=extractListings(source,html)
      .map(x=>({...x,match:score(x,filters)}));

    return {
      id:source.id,name:source.name,status:'ok',found:listings.length,url:source.url,
      ms:Date.now()-started,listings
    };
  }catch(e){
    return {
      id:source.id,name:source.name,
      status:e.name==='AbortError'?'timeout':'error',
      found:0,url:source.url,ms:Date.now()-started,
      message:e.name==='AbortError'?'Tiempo agotado':e.message
    };
  }finally{
    clearTimeout(timer);
  }
}

async function search(filters){
  const cacheKey=JSON.stringify(filters);
  const cached=CACHE.get(cacheKey);
  if(cached && Date.now()-cached.at<CACHE_TTL){
    return {...cached.data,cached:true};
  }

  const reports=await Promise.all(SOURCES.map(s=>querySource(s,filters)));
  const all=reports.flatMap(r=>r.listings||[]);

  const map=new Map();
  for(const p of all){
    const k=fingerprint(p);
    const old=map.get(k);
    if(!old){
      map.set(k,{...p,alsoSeen:[p.source]});
    }else{
      old.alsoSeen=[...new Set([...old.alsoSeen,p.source])];
      if(old.bedrooms==null && p.bedrooms!=null) old.bedrooms=p.bedrooms;
      if(old.bathrooms==null && p.bathrooms!=null) old.bathrooms=p.bathrooms;
    }
  }

  let listings=[...map.values()];

  if(filters.maxPrice){
    listings=listings.filter(p=>!p.price || p.price<=filters.maxPrice*1.25);
  }

  listings.sort((a,b)=>b.match-a.match || (a.price||Infinity)-(b.price||Infinity));

  const result={
    generatedAt:new Date().toISOString(),
    filters,
    totals:{
      sources:SOURCES.length,
      responded:reports.filter(r=>r.status==='ok').length,
      raw:all.length,
      unique:listings.length
    },
    reports:reports.map(({listings,...r})=>r),
    listings:listings.slice(0,100),
    cached:false
  };

  CACHE.set(cacheKey,{at:Date.now(),data:result});
  return result;
}

function serveStatic(req,res){
  let pathname = new URL(req.url,'http://localhost').pathname;
  if(pathname==='/') pathname='/index.html';

  const safePath=pathname.replace(/^\/+/,'');
  const file=path.normalize(path.join(PUBLIC,safePath));

  if(!file.startsWith(PUBLIC)){
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file,(err,data)=>{
    if(err){
      res.writeHead(404);
      return res.end('Not found');
    }

    const ext=path.extname(file).toLowerCase();
    const types={
      '.html':'text/html; charset=utf-8',
      '.js':'application/javascript; charset=utf-8',
      '.css':'text/css; charset=utf-8',
      '.svg':'image/svg+xml'
    };

    res.writeHead(200,{
      'content-type':types[ext]||'application/octet-stream',
      'cache-control':'no-cache'
    });
    res.end(data);
  });
}

const server=http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://localhost');

    if(req.method==='GET' && u.pathname==='/api/health'){
      return json(res,200,{
        ok:true,
        service:'CasaMatch',
        version:'10.0 GitHub Moderno',
        port:PORT,
        sources:SOURCES.length
      });
    }

    if(req.method==='GET' && u.pathname==='/api/sources'){
      return json(res,200,SOURCES);
    }

    if(req.method==='POST' && u.pathname==='/api/search'){
      let body='';

      req.on('data',d=>{
        body+=d;
        if(body.length>1e6) req.destroy();
      });

      req.on('end',async()=>{
        try{
          const x=body?JSON.parse(body):{};
          const f={
            operation:x.operation==='venta'?'venta':'renta',
            city:String(x.city||'León'),
            maxPrice:Number(x.maxPrice||0),
            type:String(x.type||'todos'),
            bedrooms:Number(x.bedrooms||0),
            bathrooms:Number(x.bathrooms||0)
          };

          const result=await search(f);
          return json(res,200,result);
        }catch(e){
          return json(res,500,{
            error:'No se pudo completar la búsqueda.',
            detail:e.message
          });
        }
      });
      return;
    }

    return serveStatic(req,res);
  }catch(e){
    return json(res,500,{
      error:'Error interno del servidor.',
      detail:e.message
    });
  }
});

server.on('clientError',(err,socket)=>{
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT,()=>{
  console.log('');
  console.log('==============================================');
  console.log('        CASAMATCH V7 PORTABLE');
  console.log('==============================================');
  console.log(`Abre: http://localhost:${PORT}`);
  console.log('No cierres esta ventana mientras uses CasaMatch.');
  console.log('');
});
