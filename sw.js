const CACHE='ticketbox-v1.9.15-final';
const CORE=['./','./index.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))
});

self.addEventListener('push',event=>{
  let d={};
  try{d=event.data?event.data.json():{}}catch(e){d={body:event.data?event.data.text():'TicketBox 通知'}}
  // Supports both legacy Web Push and iOS 18.4+ Declarative Web Push.
  // Newer iOS can display the declarative notification itself if the service worker
  // cannot run in time; older browsers still use this showNotification fallback.
  const n=d.notification||{};
  const title=n.title||d.title||'TicketBox';
  const nd=n.data||{};
  const ticketId=nd.ticketId||d.ticketId||'';
  const url=n.navigate||d.url||'./';
  const options={body:n.body||d.body||'',icon:n.icon||'icon-192.png',badge:n.badge||'icon-192.png',data:{ticketId,url}};
  event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const d=event.notification.data||{};
  const ticketId=d.ticketId||'';
  const target=new URL('./',self.registration.scope);
  if(ticketId)target.searchParams.set('ticket',ticketId);
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async list=>{
    if(list.length){
      const c=list[0];
      try{await c.navigate(target.href)}catch(e){}
      if(ticketId)c.postMessage({type:'OPEN_TICKET',ticketId});
      return c.focus();
    }
    return clients.openWindow(target.href);
  }));
});
