const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');

if (cluster.isPrimary) {
  // create a worker for each available CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // create an Express app and server for each worker
  const app = express();
  const PORT = 5000 + cluster.worker.id; // assign a different port for each worker
  app.use(cors()); // Allow requests from proxy server

  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: `Server is at '/' and working correctly on port ${PORT}!`,
    });
  });
  app.get('/hi', (req, res) => {
    res.status(200).json({
      success: true,
      message: `Server is at '/hi' and working correctly on port ${PORT}! Go on !`,
    });
  });
  app.get('/lmao', (req, res) => {
    res.status(200).json({
      success: true,
      message: `Server is at '/lmao' and working correctly on port ${PORT}! Go on !`,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
