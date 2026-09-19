const CACHE='ticketbox-v1.9.15-test-review-types';
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
  const title=d.title||'TicketBox';
  const options={body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',data:{ticketId:d.ticketId||'',url:d.url||'./'}};
  event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const d=event.notification.data||{}, url=d.url||'./';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    if(list.length){
      const c=list[0];
      if(d.ticketId)c.postMessage({type:'OPEN_TICKET',ticketId:d.ticketId});
      return c.focus();
    }
    return clients.openWindow(url);
  }));
});
