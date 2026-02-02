addEventListener('fetch', event => {
  event.respondWith(new Response('<h1>TinyPrompters Dashboard</h1><p>It works!</p>', {
    headers: { 'Content-Type': 'text/html' }
  }));
});
