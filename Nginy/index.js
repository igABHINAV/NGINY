const http = require('http');
const httpProxy = require('http-proxy');

// Define the list of servers to which requests will be load balanced
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
  { target: 'http://localhost:5011' }
  // Add more server targets as needed
];

// Create a proxy with load balancing
const proxy = httpProxy.createProxyServer();

// Initialize the index to 0 for round-robin
let currentIndex = 0;

// Create the load balancer server
const server = http.createServer((req, res) => {
  // Select the server using round-robin approach
  const selectedServer = servers[currentIndex];
  
  // Update the index for the next request
  currentIndex = (currentIndex + 1) % servers.length;

  // Proxy the request to the selected server
  proxy.web(req, res, {
    target: selectedServer.target,
  });
});

// Listen on port 8000 for incoming requests
server.listen(8000, () => {
  console.log('Load balancer server running on port 8000');
});
