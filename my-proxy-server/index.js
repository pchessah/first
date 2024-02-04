const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001; // Choose any available port

// Define the API server URL
const apiServer = 'https://mawingu.cbaloop.com/cba/api/v1';

// Create a proxy middleware for the API server
const apiProxy = createProxyMiddleware({
  target: apiServer,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove the '/api' prefix when forwarding requests to the API server
  },
});

// Use the proxy middleware for requests to '/api'
app.use('/api', apiProxy);

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
