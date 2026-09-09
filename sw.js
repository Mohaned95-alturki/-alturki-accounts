const CACHE='alturki-accounts-4.6';
const CORE=['./','./index.html','./manifest.json','./logo.jpg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin && (req.mode==='navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js') || url.pathname.endsWith('/manifest.json'))){
    event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  if(url.origin===location.origin){
    event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res})));
  }
});
