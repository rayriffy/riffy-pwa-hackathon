importScripts('js/sw-toolbox.js');

toolbox.precache([
  'index.html','https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css', 'js/sw-toolbox.js', 'js/materialize.js','js/jquery.min.js','https://fonts.googleapis.com/icon?family=Material+Icons'
])

toolbox.options.debug = true;
toolbox.options.cache.name = "mindsharp-v1";

self.addEventListener('install', function install() {
  self.skipWaiting();
})
self.addEventListener('activate', function activate(e) {
  e.waitUntil(self.clients.claim())
})

toolbox.router.get("(.*)", function get(req, vals, opts) {
  return toolbox.networkFirst(req, vals, opts)
    .catch(function(error) {
      console.log({req, vals, opts, error})
      if (req.method === "GET" && req.headers.get("accept").includes("text/html")) {
        return toolbox.cacheOnly(new Request("index.html"), vals, opts)
      }
      throw error
    })
})

toolbox.router.get("css/*.css", toolbox.fastest)
toolbox.router.get("js/*.js", toolbox.fastest)
toolbox.router.get("fonts/*", toolbox.fastest)
toolbox.router.get("img/*.jpg", toolbox.fastest)
toolbox.router.get("img/*.gif", toolbox.fastest)
toolbox.router.get("img/*.svg", toolbox.fastest)
toolbox.router.get("img/*.png", toolbox.fastest)
toolbox.router.get("manifest.json", toolbox.networkFirst)
