/* غفيركو: يخزّن التطبيق والخريطة على الجهاز، فيفتح بسرعة على النت الضعيف ومن غير نت */
var V='gh-v9';
var SHELL=['./','index.html','manifest.json','vendor/leaflet.js','vendor/leaflet.css','assets/logo-badge-112.webp','assets/icon-192.png','assets/mascot-welcome.webp','assets/mascot-alert.webp','assets/mascot-ok.webp','assets/mascot-review.webp','assets/mascot-help.webp','assets/mascot-done.webp','maps/city/idx-top.js','maps/city/9/301/210.webp'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){});}));}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V&&k.indexOf('gh-')===0;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  if(/\/(maps|assets|vendor)\//.test(u.pathname)){e.respondWith(caches.open(V).then(function(c){return c.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok)c.put(r,res.clone());return res;});});}));return;}
  e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(m){var net=fetch(r).then(function(res){if(res.ok)c.put(r,res.clone());return res;}).catch(function(){return m;});return m||net;});}));});
