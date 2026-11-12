/* عامل خدمة: يجعل التطبيق يعمل بعد أول زيارة حتى بلا إنترنت (النسخة المنشورة فقط) */
const V = "pcb-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || !r.url.startsWith(self.location.origin)) return;   /* الروابط الخارجية (Drive) تمرّ كما هي */
  if (r.url.includes("/books/manifest.json")) { e.respondWith(fetch(r).then(x => { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); return x; }).catch(() => caches.match(r))); return; }
  const isDoc = r.mode === "navigate" || r.destination === "document";
  if (isDoc) {                                                     /* الصفحة: الشبكة أولاً ثم النسخة المحفوظة */
    e.respondWith(fetch(r).then(x => { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); return x; }).catch(() => caches.match(r).then(m => m || caches.match("./index.html"))));
    return;
  }
  /* بقية الملفات: نعرض المحفوظ فوراً ونحدّثه في الخلفية */
  e.respondWith(caches.match(r).then(m => { const net = fetch(r).then(x => { if (x.ok) { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); } return x; }).catch(() => m); return m || net; }));
});
