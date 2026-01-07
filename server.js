require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== process.env.API_DOCS_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Swagger UI
app.use('/api-docs', authMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint for export
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check and API information
 *     description: Returns server status and available endpoints
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Swagger Proxy Server
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     proxy:
 *                       type: string
 *                       example: /proxy/:encodedUrl (supports base64url encoding)
 *                     proxyLegacy:
 *                       type: string
 *                       example: /proxy/* (wildcard path)
 *                     check:
 *                       type: string
 *                       example: /check (POST with {url})
 *                     broken:
 *                       type: string
 *                       example: /broken (POST with {url} - checks if frameable)
 */
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Swagger Proxy Server',
    endpoints: {
      proxy: '/proxy/:encodedUrl (supports base64url encoding)',
      proxyLegacy: '/proxy/* (wildcard path)',
      check: '/check (POST with {url})',
      broken: '/broken (POST with {url} - checks if frameable)'
    }
  });
});

/**
 * @swagger
 * /check:
 *   post:
 *     summary: Check if URL is frameable
 *     description: Checks if a URL can be embedded in an iframe by examining X-Frame-Options and CSP headers
 *     tags: [Proxy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com
 *                 description: The URL to check
 *     responses:
 *       200:
 *         description: URL check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frameable:
 *                   type: boolean
 *                   example: true
 *                 xFrameOptions:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 csp:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad request - URL is required
 *       500:
 *         description: Server error
 */
app.post('/check', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.head(url, {
      maxRedirects: 5,
      validateStatus: () => true
    });

    const xFrameOptions = response.headers['x-frame-options'];
    const csp = response.headers['content-security-policy'];
    const frameable = !xFrameOptions && !csp?.includes('frame-ancestors');

    res.json({
      frameable,
      xFrameOptions: xFrameOptions || null,
      csp: csp || null
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      frameable: false
    });
  }
});

/**
 * @swagger
 * /broken:
 *   post:
 *     summary: Check if URL is frameable (alias for /check)
 *     description: Checks if a URL can be embedded in an iframe by examining X-Frame-Options and CSP headers
 *     tags: [Proxy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com
 *                 description: The URL to check
 *     responses:
 *       200:
 *         description: URL check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frameable:
 *                   type: boolean
 *                   example: true
 *                 xFrameOptions:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 csp:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad request - URL is required
 *       500:
 *         description: Server error
 */
app.post('/broken', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.head(url, {
      maxRedirects: 5,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const xFrameOptions = response.headers['x-frame-options'];
    const csp = response.headers['content-security-policy'];
    const frameable = !xFrameOptions && !csp?.includes('frame-ancestors');

    res.json({
      frameable,
      xFrameOptions: xFrameOptions || null,
      csp: csp || null
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      frameable: false
    });
  }
});

/**
 * @swagger
 * /proxy/{encodedUrl}:
 *   get:
 *     summary: Proxy a URL with base64url encoding support
 *     description: Proxies a URL and removes X-Frame-Options and CSP headers. Supports both plain URLs and base64url encoded URLs
 *     tags: [Proxy]
 *     parameters:
 *       - in: path
 *         name: encodedUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The URL to proxy (can be plain or base64url encoded)
 *         example: https://example.com
 *     responses:
 *       200:
 *         description: Proxied content
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Bad request - URL is required
 *       500:
 *         description: Proxy error
 */
app.get('/proxy/:encodedUrl', async (req, res) => {
  let targetUrl = req.params.encodedUrl;
  
  if (!targetUrl) {
    return res.status(400).send('URL is required');
  }

  // Try to decode if it's base64url encoded
  try {
    // Convert base64url to base64
    const base64 = targetUrl.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    const padded = base64 + '==='.slice((base64.length + 3) % 4);
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');
    
    // Check if decoded string looks like a URL
    if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
      targetUrl = decoded;
    }
  } catch (e) {
    // If decode fails, treat as regular URL
  }

  try {
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      maxRedirects: 5,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Remove headers that prevent iframing
    const headers = { ...response.headers };
    delete headers['x-frame-options'];
    delete headers['content-security-policy'];
    delete headers['content-security-policy-report-only'];

    // Set CORS headers
    res.set({
      ...headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    });
    console.log(`Proxied URL: ${targetUrl}`);

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send(`Proxy Error: ${error.message}`);
  }
});

/**
 * @swagger
 * /proxy/{url}:
 *   get:
 *     summary: Legacy proxy endpoint (wildcard path)
 *     description: Proxies any URL and removes X-Frame-Options and CSP headers. Uses wildcard path matching
 *     tags: [Proxy]
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The full URL to proxy
 *         example: https://example.com/page
 *     responses:
 *       200:
 *         description: Proxied content
 *       400:
 *         description: Bad request - URL is required
 *       500:
 *         description: Proxy error
 */
app.get('/proxy/*', async (req, res) => {
  const targetUrl = req.params[0];
  
  if (!targetUrl) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      maxRedirects: 5,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Remove headers that prevent iframing
    const headers = { ...response.headers };
    delete headers['x-frame-options'];
    delete headers['content-security-policy'];
    delete headers['content-security-policy-report-only'];

    // Set CORS headers
    res.set({
      ...headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send(`Proxy Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
  console.log(`📋 Proxy URL: http://localhost:${PORT}/proxy/`);
  console.log(`🔍 Check URL: http://localhost:${PORT}/check`);
  console.log(`🔍 Broken Check: http://localhost:${PORT}/broken`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
});
