
const { createServer } = require('http');
const { createProxyServer } = require('http-proxy');
const { LRUCache } = require('lru-cache');

const servers = [
  { target: 'http://localhost:5012' },
  { target: 'http://localhost:5001' },
  { target: 'http://localhost:5002' },
  { target: 'http://localhost:5003' },
  { target: 'http://localhost:5004' },
  { target: 'http://localhost:5005' },
  { target: 'http://localhost:5006' },
  { target: 'http://localhost:5007' },
  { target: 'http://localhost:5008' },
  { target: 'http://localhost:5009' },
  { target: 'http://localhost:5010' },
  { target: 'http://localhost:5011' },
  // Add more server targets as needed
];

// Create a proxy with load balancing
const proxy = createProxyServer();

// Initialize the index to 0 for round-robin
let currentIndex = 0;

// Initialize an LRU cache with a max size and expiration time
const cache = new LRUCache({ max: 100, maxAge: 5000 }); // Max 100 items, expire after 5 seconds

// Create the load balancer server
const server = createServer((req, res) => {
  // Check if the request method is GET
  if (req.method === 'GET') {
    const cachedData = cache.get(req.url);
    if (cachedData) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cachedData));
      return;
    }
  }

  // Select the server using round-robin approach
  const selectedServer = servers[currentIndex];

  // Update the index for the next request
  currentIndex = (currentIndex + 1) % servers.length;

  // Proxy the request to the selected server
  proxy.web(req, res, {
    target: selectedServer.target,
  });

  // Intercept the response from the server to cache GET requests
  proxy.on('proxyRes', (proxyRes, req, res) => {
    if (req.method === 'GET') {
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk;
      });
      proxyRes.on('end', () => {
        const responseBody = JSON.parse(body);
        cache.set(req.url, responseBody);
      });
    }
  });
});

// Listen on port 8000 for incoming requests
server.listen(8000, () => {
  console.log('Load balancer with cache server running on port 8000');
});
