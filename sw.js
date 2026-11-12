// 修改 index.html 後，把版本號加 1，已安裝的 APP 就會更新
const CACHE = 'hunter-v19';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
const IMGS = ["img/A1.jpg", "img/A2.jpg", "img/A3.jpg", "img/A4.jpg", "img/A5.jpg", "img/A6.jpg", "img/B1.jpg", "img/B2.jpg", "img/B3.jpg", "img/B4.jpg", "img/B5.jpg", "img/B6.jpg", "img/C1.jpg", "img/C10.jpg", "img/C11.jpg", "img/C12.jpg", "img/C13.jpg", "img/C14.jpg", "img/C15.jpg", "img/C16.jpg", "img/C2.jpg", "img/C3.jpg", "img/C4.jpg", "img/C5.jpg", "img/C6.jpg", "img/C7.jpg", "img/C8.jpg", "img/C9.jpg", "img/D1.jpg", "img/D10.jpg", "img/D11.jpg", "img/D12.jpg", "img/D2.jpg", "img/D3.jpg", "img/D4.jpg", "img/D5.jpg", "img/D6.jpg", "img/D7.jpg", "img/D8.jpg", "img/D9.jpg", "img/E1.jpg", "img/E10.jpg", "img/E11.jpg", "img/E12.jpg", "img/E13.jpg", "img/E14.jpg", "img/E15.jpg", "img/E16.jpg", "img/E17.jpg", "img/E18.jpg", "img/E19.jpg", "img/E2.jpg", "img/E20.jpg", "img/E21.jpg", "img/E22.jpg", "img/E23.jpg", "img/E24.jpg", "img/E25.jpg", "img/E26.jpg", "img/E3.jpg", "img/E4.jpg", "img/E5.jpg", "img/E6.jpg", "img/E7.jpg", "img/E8.jpg", "img/E9.jpg", "img/F1.jpg", "img/F10.jpg", "img/F11.jpg", "img/F12.jpg", "img/F2.jpg", "img/F3.jpg", "img/F4.jpg", "img/F5.jpg", "img/F6.jpg", "img/F7.jpg", "img/F8.jpg", "img/F9.jpg", "img/I01.png", "img/I02.png", "img/I03.png", "img/I04.png", "img/K01.jpg", "img/K02.jpg", "img/K03.jpg", "img/K04.jpg", "img/K05.jpg", "img/K06.jpg", "img/K07.jpg", "img/K08.jpg", "img/K09.jpg", "img/K10.jpg", "img/K11.jpg", "img/K12.jpg", "img/K13.jpg", "img/K14.jpg", "img/O01.jpg", "img/O02.jpg", "img/O03.jpg", "img/O04.jpg", "img/O05.jpg", "img/O06.jpg", "img/O07.png", "img/O08.png", "img/O09.png", "img/O10.png", "img/S01.jpg", "img/S03.jpg", "img/S05.jpg", "img/S06.jpg", "img/S07.jpg", "img/S08.jpg", "img/S09.jpg", "img/S10.jpg", "img/S11.jpg", "img/S12.jpg", "img/S14.jpg", "img/S15.jpg", "img/S16.jpg", "img/S17.jpg", "img/S18.jpg"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() => Promise.all(IMGS.map(u => c.add(u).catch(() => {}))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 有網路時抓最新版，沒網路時用快取，所以可離線使用
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html')))
  );
});
