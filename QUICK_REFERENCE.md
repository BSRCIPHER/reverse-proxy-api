# 🚀 Quick Reference - Swagger Proxy Server

## Start Server
```bash
npm start
```
Server runs on: **http://localhost:3000**

---

## 📚 Swagger Documentation

| URL | Description |
|-----|-------------|
| http://localhost:3000/api-docs | Interactive Swagger UI |
| http://localhost:3000/api-docs.json | OpenAPI JSON spec |
| http://localhost:3000/swagger-embed.html | Clean UI for iframe |
| http://localhost:3000/demo.html | Interactive demo |

---

## 🎯 API Endpoints

### Health Check
```bash
GET http://localhost:3000/
```

### Check URL Frameability
```bash
POST http://localhost:3000/check
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### Proxy URL
```bash
GET http://localhost:3000/proxy/https://example.com
```

---

## 💻 Quick Examples

### JavaScript
```javascript
// Check URL
const check = await fetch('http://localhost:3000/check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
});

// Use proxy
const iframe = document.createElement('iframe');
iframe.src = 'http://localhost:3000/proxy/https://example.com';
```

### React
```jsx
<iframe
  src="http://localhost:3000/swagger-embed.html"
  style={{ width: '100%', height: '100vh', border: 'none' }}
/>
```

### cURL
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

---

## 🎨 Confluence Integration

### Method 1: HTML Macro
```html
<iframe 
  src="http://localhost:3000/swagger-embed.html"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

### Method 2: Swagger Macro
1. Install "Swagger for Confluence"
2. Add `/swagger` macro
3. URL: `http://localhost:3000/api-docs.json`

---

## 📖 Documentation

- `README.md` - Full documentation
- `SETUP_COMPLETE.md` - Setup summary
- `TESTING_GUIDE.md` - Testing instructions
- `IFRAME_QUICK_START.md` - iFrame guide

---

## 🔧 Common Commands

```bash
# Start server
npm start

# Development mode
npm run dev

# Change port
PORT=8080 npm start

# Test health
curl http://localhost:3000/

# View Swagger
open http://localhost:3000/api-docs
```

---

## ✅ Checklist

- [ ] Server starts without errors
- [ ] Swagger UI loads at /api-docs
- [ ] Can test endpoints in Swagger
- [ ] Proxy endpoint works
- [ ] Check endpoint returns results
- [ ] iFrame embedding works
- [ ] Ready for Confluence

---

**Need help?** Check `SETUP_COMPLETE.md` for detailed instructions!
