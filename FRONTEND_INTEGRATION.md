# 🎨 Frontend Integration Guide

## Your Production URLs

Based on your Vercel deployment: `https://reverse-proxy-007-9si2.vercel.app`

---

## 📚 Swagger Documentation URLs

| Purpose | URL |
|---------|-----|
| **Interactive Swagger UI** | https://reverse-proxy-007-9si2.vercel.app/api-docs |
| **Swagger JSON (for Confluence)** | https://reverse-proxy-007-9si2.vercel.app/api-docs.json |
| **Clean iFrame Version** | https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html |
| **Styled Page** | https://reverse-proxy-007-9si2.vercel.app/ |

---

## 🚀 Quick Integration Examples

### 1. Embed Swagger in React

```jsx
function ApiDocs() {
  return (
    <iframe
      src="https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="API Documentation"
    />
  );
}
```

### 2. Embed in HTML

```html
<iframe 
  src="https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

### 3. Call Check API from Frontend

```javascript
// Check if URL is frameable
async function checkUrl(url) {
  const response = await fetch('https://reverse-proxy-007-9si2.vercel.app/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  return await response.json();
}

// Usage
const result = await checkUrl('https://example.com');
console.log(result.frameable); // true or false
```

### 4. Use Proxy API

```javascript
// Proxy a URL to bypass CORS
const proxyUrl = 'https://reverse-proxy-007-9si2.vercel.app/proxy/https://example.com';

// In iframe
document.getElementById('myIframe').src = proxyUrl;

// Or fetch content
const response = await fetch(proxyUrl);
const html = await response.text();
```

---

## 🎯 Complete React Example

```jsx
import React, { useState } from 'react';

function ProxyApp() {
  const [url, setUrl] = useState('');
  const [isFrameable, setIsFrameable] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reverse-proxy-007-9si2.vercel.app/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setIsFrameable(data.frameable);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const proxyUrl = `https://reverse-proxy-007-9si2.vercel.app/proxy/${url}`;

  return (
    <div>
      <h1>URL Proxy & Checker</h1>
      
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL (e.g., https://example.com)"
        style={{ width: '400px', padding: '10px' }}
      />
      
      <button onClick={checkUrl} disabled={loading}>
        {loading ? 'Checking...' : 'Check URL'}
      </button>

      {isFrameable !== null && (
        <div>
          <p>
            {isFrameable ? '✅ URL is frameable' : '❌ URL is NOT frameable'}
          </p>
          {isFrameable && (
            <iframe
              src={proxyUrl}
              style={{ width: '100%', height: '600px', border: '1px solid #ddd' }}
              title="Proxied Content"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProxyApp;
```

---

## 📱 Vue.js Example

```vue
<template>
  <div>
    <h1>API Documentation</h1>
    <iframe
      src="https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html"
      style="width: 100%; height: 100vh; border: none;"
    />
  </div>
</template>

<script>
export default {
  name: 'ApiDocs'
}
</script>
```

---

## 🌐 Angular Example

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-swagger-docs',
  template: `
    <iframe 
      [src]="swaggerUrl"
      style="width: 100%; height: 100vh; border: none;"
    ></iframe>
  `
})
export class SwaggerDocsComponent {
  swaggerUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.swaggerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html'
    );
  }
}
```

---

## 🔗 For Confluence

### Method 1: Swagger Macro
1. Install "Swagger for Confluence" app
2. Add `/swagger` macro to your page
3. Enter URL: `https://reverse-proxy-007-9si2.vercel.app/api-docs.json`

### Method 2: iFrame Macro
1. Add "iFrame" macro to your page
2. URL: `https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html`
3. Width: `100%`
4. Height: `800px`

### Method 3: HTML Macro
```html
<iframe 
  src="https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 4px;"
></iframe>
```

---

## 🧪 Test Your Integration

### 1. Test in Browser Console
```javascript
// Test health check
fetch('https://reverse-proxy-007-9si2.vercel.app/')
  .then(r => r.json())
  .then(console.log);

// Test check endpoint
fetch('https://reverse-proxy-007-9si2.vercel.app/check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
})
  .then(r => r.json())
  .then(console.log);
```

### 2. Test with cURL
```bash
# Health check
curl https://reverse-proxy-007-9si2.vercel.app/

# Check URL
curl -X POST https://reverse-proxy-007-9si2.vercel.app/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Get Swagger JSON
curl https://reverse-proxy-007-9si2.vercel.app/api-docs.json
```

---

## 💡 Pro Tips

1. **Bookmark this URL for your team:**
   ```
   https://reverse-proxy-007-9si2.vercel.app/api-docs
   ```

2. **For Confluence, use the JSON URL:**
   ```
   https://reverse-proxy-007-9si2.vercel.app/api-docs.json
   ```

3. **For embedding in apps, use:**
   ```
   https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html
   ```

4. **All endpoints support CORS** - Call from any domain

---

## 🎯 Summary

**Your main URLs:**
- 📚 Swagger UI: https://reverse-proxy-007-9si2.vercel.app/api-docs
- 📄 JSON Spec: https://reverse-proxy-007-9si2.vercel.app/api-docs.json
- 🖼️ iFrame: https://reverse-proxy-007-9si2.vercel.app/swagger-embed.html

**API Endpoints:**
- ✅ Health: `GET /`
- 🔍 Check: `POST /check`
- 🔄 Proxy: `GET /proxy/:url`

**Ready to integrate!** 🚀
