# 🚀 Swagger Proxy Server

A fully documented proxy server that bypasses CORS and X-Frame-Options restrictions, allowing you to embed any URL in an iframe. Complete with Swagger/OpenAPI documentation.

## ✨ Features

- 🔓 **Bypass X-Frame-Options** - Remove headers that prevent iframing
- 🌐 **CORS Proxy** - Bypass CORS restrictions
- 🔍 **URL Frameability Checker** - Check if a URL can be embedded
- 🔐 **Base64URL Encoding Support** - Encode URLs for security
- 📚 **Full Swagger Documentation** - Interactive API docs
- 🎯 **Multiple Proxy Modes** - Encoded and wildcard path support

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run Server

```bash
npm start
```

Server will start on `http://localhost:3000`

### Development Mode

```bash
npm run dev
```

## 📚 API Documentation

Once the server is running, access the interactive Swagger documentation:

**Swagger UI:** http://localhost:3000/api-docs

**Swagger JSON:** http://localhost:3000/api-docs.json

## 🎯 API Endpoints

### 1. Health Check
```
GET /
```
Returns server status and available endpoints.

**Response:**
```json
{
  "status": "ok",
  "message": "Swagger Proxy Server",
  "endpoints": {
    "proxy": "/proxy/:encodedUrl (supports base64url encoding)",
    "proxyLegacy": "/proxy/* (wildcard path)",
    "check": "/check (POST with {url})",
    "broken": "/broken (POST with {url} - checks if frameable)"
  }
}
```

### 2. Check URL Frameability
```
POST /check
POST /broken (alias)
```

Check if a URL can be embedded in an iframe.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "frameable": true,
  "xFrameOptions": null,
  "csp": null
}
```

### 3. Proxy URL (Encoded)
```
GET /proxy/:encodedUrl
```

Proxy a URL with base64url encoding support.

**Examples:**

Plain URL:
```
http://localhost:3000/proxy/https://example.com
```

Base64URL encoded:
```javascript
// Encode URL
const url = 'https://example.com';
const encoded = Buffer.from(url).toString('base64url');
// Use: http://localhost:3000/proxy/aHR0cHM6Ly9leGFtcGxlLmNvbQ
```

### 4. Proxy URL (Wildcard)
```
GET /proxy/*
```

Legacy proxy endpoint with wildcard path matching.

**Example:**
```
http://localhost:3000/proxy/https://example.com/page
```

## 💻 Usage Examples

### JavaScript/Fetch

```javascript
// Check if URL is frameable
const checkUrl = async (url) => {
  const response = await fetch('http://localhost:3000/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  return await response.json();
};

// Use proxy in iframe
const proxyUrl = 'http://localhost:3000/proxy/https://example.com';
document.getElementById('myIframe').src = proxyUrl;
```

### React Component

```jsx
import React, { useState, useEffect } from 'react';

const ProxyFrame = ({ targetUrl }) => {
  const [frameable, setFrameable] = useState(null);
  const proxyUrl = `http://localhost:3000/proxy/${targetUrl}`;

  useEffect(() => {
    fetch('http://localhost:3000/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl })
    })
      .then(res => res.json())
      .then(data => setFrameable(data.frameable));
  }, [targetUrl]);

  return (
    <div>
      {frameable === false && <p>⚠️ URL may not be frameable</p>}
      <iframe 
        src={proxyUrl}
        width="100%"
        height="600px"
        title="Proxied Content"
      />
    </div>
  );
};
```

### cURL Examples

```bash
# Check URL
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Proxy URL
curl http://localhost:3000/proxy/https://example.com

# Check with /broken endpoint
curl -X POST http://localhost:3000/broken \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'
```

## 🎨 Embed Swagger in Your App

The server includes pre-built HTML pages for embedding Swagger documentation:

- **Clean Swagger UI:** http://localhost:3000/swagger-embed.html
- **Styled Page:** http://localhost:3000/index.html
- **Confluence Ready:** http://localhost:3000/confluence-embed.html
- **Demo Page:** http://localhost:3000/demo.html

### Embed in HTML

```html
<iframe 
  src="http://localhost:3000/swagger-embed.html"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

## 🔒 Security Considerations

⚠️ **Important:** This proxy server removes security headers. Use responsibly:

1. **Rate Limiting:** Add rate limiting in production
2. **Authentication:** Implement API keys or JWT tokens
3. **Whitelist:** Restrict allowed domains
4. **HTTPS:** Always use HTTPS in production
5. **Monitoring:** Log and monitor proxy usage

### Example: Add Domain Whitelist

```javascript
const ALLOWED_DOMAINS = ['example.com', 'trusted-site.com'];

app.post('/check', async (req, res) => {
  const { url } = req.body;
  const domain = new URL(url).hostname;
  
  if (!ALLOWED_DOMAINS.includes(domain)) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }
  // ... rest of code
});
```

## 🌐 Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Update `swagger.js` with your production URL

### Heroku

1. Create `Procfile`:
```
web: node server.js
```

2. Deploy:
```bash
heroku create
git push heroku main
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t swagger-proxy .
docker run -p 3000:3000 swagger-proxy
```

## 📁 Project Structure

```
swagger-proxy-server/
├── server.js              # Main server file with all endpoints
├── swagger.js             # Swagger/OpenAPI configuration
├── package.json           # Dependencies
├── public/                # Static files
│   ├── index.html         # Styled Swagger page
│   ├── swagger-embed.html # Clean Swagger for iframe
│   ├── confluence-embed.html # Confluence-ready embed
│   └── demo.html          # Interactive demo
├── README.md              # This file
└── IFRAME_QUICK_START.md  # iFrame integration guide
```

## 🛠️ Configuration

### Change Port

```javascript
// In server.js
const PORT = process.env.PORT || 3000;
```

Or use environment variable:
```bash
PORT=8080 npm start
```

### Customize Swagger

Edit `swagger.js` to modify:
- API title and description
- Server URLs
- Contact information
- Additional schemas

## 📖 Documentation Files

- `IFRAME_QUICK_START.md` - Quick guide for iframe embedding
- `IFRAME_INTEGRATION_EXAMPLES.md` - Framework-specific examples
- `SWAGGER_CONFLUENCE_GUIDE.md` - Confluence integration guide

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - feel free to use in your projects!

## 🐛 Troubleshooting

### CORS Errors
- Ensure the proxy server is running
- Check that CORS headers are being set correctly
- Verify the target URL is accessible

### Iframe Not Loading
- Check browser console for errors
- Verify the target URL doesn't have additional restrictions
- Try using the `/check` endpoint first

### Base64 Encoding Issues
- Ensure you're using base64url encoding (not standard base64)
- Check that padding is correct
- Verify the decoded URL is valid

## 📞 Support

For issues or questions:
- Check the Swagger documentation at `/api-docs`
- Review the example files in `/public`
- Open an issue on GitHub

## 🎯 Use Cases

- Embedding third-party content in your app
- Creating iframe-based dashboards
- Bypassing CORS for development
- Testing URL frameability
- Building content aggregators
- Creating web scrapers with preview

---

Made with ❤️ for developers who need to embed anything, anywhere.
