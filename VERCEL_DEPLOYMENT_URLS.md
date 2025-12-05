# 🌐 Vercel Deployment URLs

## Your Vercel URL

After deploying to Vercel, your app will be available at:
```
https://your-app-name.vercel.app
```

Or if you already have it:
```
https://reverse-proxy-007-9si2.vercel.app
```

---

## 📚 Swagger Documentation URLs

### 1. Interactive Swagger UI
```
https://your-app-name.vercel.app/api-docs
```
**Use this for:** Viewing and testing API in browser

### 2. Swagger JSON Specification
```
https://your-app-name.vercel.app/api-docs.json
```
**Use this for:** 
- Importing into Confluence
- API clients (Postman, Insomnia)
- Code generation tools

### 3. Clean Swagger for iFrame
```
https://your-app-name.vercel.app/swagger-embed.html
```
**Use this for:** Embedding in your frontend app

### 4. Styled Page
```
https://your-app-name.vercel.app/
```
**Use this for:** Full page with header

---

## 🎯 API Endpoints (for your frontend)

### Health Check
```javascript
GET https://your-app-name.vercel.app/
```

### Check if URL is Frameable
```javascript
POST https://your-app-name.vercel.app/check
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### Proxy a URL
```javascript
GET https://your-app-name.vercel.app/proxy/https://example.com
```

---

## 💻 Frontend Integration Examples

### React Component - Embed Swagger

```jsx
import React from 'react';

const SwaggerDocs = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://your-app-name.vercel.app/swagger-embed.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="API Documentation"
      />
    </div>
  );
};

export default SwaggerDocs;
```

### React Component - Use Proxy API

```jsx
import React, { useState } from 'react';

const ProxyChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const checkUrl = async () => {
    const response = await fetch('https://your-app-name.vercel.app/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <input 
        value={url} 
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to check"
      />
      <button onClick={checkUrl}>Check</button>
      {result && (
        <div>
          <p>Frameable: {result.frameable ? '✅' : '❌'}</p>
          <p>X-Frame-Options: {result.xFrameOptions || 'None'}</p>
        </div>
      )}
    </div>
  );
};
```

### JavaScript/Fetch - Call API

```javascript
// Check if URL is frameable
const checkUrl = async (url) => {
  const response = await fetch('https://your-app-name.vercel.app/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  return await response.json();
};

// Use proxy
const proxyUrl = 'https://your-app-name.vercel.app/proxy/https://example.com';
document.getElementById('myIframe').src = proxyUrl;
```

### Axios Example

```javascript
import axios from 'axios';

const API_BASE = 'https://your-app-name.vercel.app';

// Check URL
const checkFrameable = async (url) => {
  const { data } = await axios.post(`${API_BASE}/check`, { url });
  return data;
};

// Get proxied content
const getProxiedContent = async (targetUrl) => {
  const { data } = await axios.get(`${API_BASE}/proxy/${targetUrl}`);
  return data;
};
```

---

## 🎨 Confluence Integration

### Option 1: iFrame Macro
```
URL: https://your-app-name.vercel.app/swagger-embed.html
Width: 100%
Height: 800px
```

### Option 2: Swagger Macro
```
Swagger URL: https://your-app-name.vercel.app/api-docs.json
```

### Option 3: HTML Macro
```html
<iframe 
  src="https://your-app-name.vercel.app/swagger-embed.html"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 4px;"
></iframe>
```

---

## 🔧 Environment Variables (Optional)

If you want to use environment variables in your frontend:

```javascript
// .env
REACT_APP_API_URL=https://your-app-name.vercel.app

// In your code
const API_URL = process.env.REACT_APP_API_URL;
const swaggerUrl = `${API_URL}/swagger-embed.html`;
```

---

## 📱 Testing Your Deployment

### 1. Test Health Endpoint
```bash
curl https://your-app-name.vercel.app/
```

### 2. Test Check Endpoint
```bash
curl -X POST https://your-app-name.vercel.app/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

### 3. Test Swagger JSON
```bash
curl https://your-app-name.vercel.app/api-docs.json
```

### 4. Open in Browser
```
https://your-app-name.vercel.app/api-docs
```

---

## 🚀 Quick Deploy to Vercel

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically on push

---

## 📋 URL Checklist

After deployment, verify these URLs work:

- [ ] `https://your-app-name.vercel.app/` - Health check
- [ ] `https://your-app-name.vercel.app/api-docs` - Swagger UI
- [ ] `https://your-app-name.vercel.app/api-docs.json` - JSON spec
- [ ] `https://your-app-name.vercel.app/swagger-embed.html` - iFrame version
- [ ] `https://your-app-name.vercel.app/check` - POST endpoint works
- [ ] `https://your-app-name.vercel.app/proxy/https://example.com` - Proxy works

---

## 🔒 CORS Configuration

Your server already has CORS enabled for all origins:
```javascript
app.use(cors());
```

This means your frontend can call the API from any domain. If you want to restrict it:

```javascript
app.use(cors({
  origin: ['https://your-frontend.com', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 💡 Pro Tips

1. **Use the JSON URL for Confluence** - It auto-updates when you deploy
2. **Use swagger-embed.html for iframes** - It's cleaner without the top bar
3. **Bookmark /api-docs** - Share with your team for easy testing
4. **Use environment variables** - Makes switching between dev/prod easier

---

## 🎯 Most Common Use Cases

### For Confluence Documentation
```
https://your-app-name.vercel.app/api-docs.json
```

### For Frontend iFrame Embedding
```
https://your-app-name.vercel.app/swagger-embed.html
```

### For API Testing
```
https://your-app-name.vercel.app/api-docs
```

### For Programmatic Access
```
https://your-app-name.vercel.app/check
https://your-app-name.vercel.app/proxy/:url
```

---

**Replace `your-app-name` with your actual Vercel app name!**
