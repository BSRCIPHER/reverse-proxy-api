# 🧪 Testing Guide - Swagger Proxy Server

## Quick Test Checklist

### 1. Start the Server

```bash
npm start
```

Expected output:
```
🚀 Proxy server running on port 3000
📋 Proxy URL: http://localhost:3000/proxy/
🔍 Check URL: http://localhost:3000/check
🔍 Broken Check: http://localhost:3000/broken
📚 API Docs: http://localhost:3000/api-docs
```

### 2. Test Health Endpoint

**Browser:** http://localhost:3000/

**cURL:**
```bash
curl http://localhost:3000/
```

**Expected Response:**
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

### 3. Test Swagger Documentation

**Browser:** http://localhost:3000/api-docs

You should see:
- ✅ Interactive Swagger UI
- ✅ All 5 endpoints listed
- ✅ Try it out buttons working
- ✅ Schemas defined

### 4. Test Check Endpoint

**Using Swagger UI:**
1. Go to http://localhost:3000/api-docs
2. Find `POST /check`
3. Click "Try it out"
4. Enter URL: `https://example.com`
5. Click "Execute"

**Using cURL:**
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

**Expected Response:**
```json
{
  "frameable": true,
  "xFrameOptions": null,
  "csp": null
}
```

**Test with blocked URL:**
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'
```

**Expected Response:**
```json
{
  "frameable": false,
  "xFrameOptions": "SAMEORIGIN",
  "csp": null
}
```

### 5. Test Broken Endpoint (Alias)

```bash
curl -X POST http://localhost:3000/broken \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com"}'
```

Should return same format as `/check`

### 6. Test Proxy Endpoint

**Browser:** http://localhost:3000/proxy/https://example.com

**cURL:**
```bash
curl http://localhost:3000/proxy/https://example.com
```

You should see the HTML content of example.com

### 7. Test Base64URL Encoding

**Encode a URL:**
```javascript
// In browser console or Node.js
const url = 'https://example.com';
const encoded = Buffer.from(url).toString('base64url');
console.log(encoded); // aHR0cHM6Ly9leGFtcGxlLmNvbQ
```

**Test encoded URL:**
```bash
curl http://localhost:3000/proxy/aHR0cHM6Ly9leGFtcGxlLmNvbQ
```

### 8. Test Wildcard Proxy

```bash
curl http://localhost:3000/proxy/https://example.com/page
```

### 9. Test iFrame Embedding

Create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Proxy Test</title>
</head>
<body>
    <h1>Testing Proxy Server</h1>
    
    <h2>Example.com via Proxy</h2>
    <iframe 
        src="http://localhost:3000/proxy/https://example.com"
        width="100%"
        height="400px"
    ></iframe>
    
    <h2>Swagger Documentation</h2>
    <iframe 
        src="http://localhost:3000/swagger-embed.html"
        width="100%"
        height="600px"
    ></iframe>
</body>
</html>
```

### 10. Test Swagger JSON Export

**Browser:** http://localhost:3000/api-docs.json

**cURL:**
```bash
curl http://localhost:3000/api-docs.json > swagger-spec.json
```

Should download the complete OpenAPI specification.

## 🎯 Test Scenarios

### Scenario 1: Check Multiple URLs

```bash
# Frameable URL
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Non-frameable URL
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'

# Another non-frameable
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://facebook.com"}'
```

### Scenario 2: Proxy Different Content Types

```bash
# HTML page
curl http://localhost:3000/proxy/https://example.com

# JSON API
curl http://localhost:3000/proxy/https://api.github.com/users/github

# Image (save to file)
curl http://localhost:3000/proxy/https://via.placeholder.com/150 > test.png
```

### Scenario 3: Error Handling

```bash
# Missing URL
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{}'

# Invalid URL
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"not-a-url"}'

# Non-existent domain
curl http://localhost:3000/proxy/https://this-domain-does-not-exist-12345.com
```

## 🧪 Automated Testing Script

Create `test.js`:

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Starting tests...\n');

  // Test 1: Health check
  try {
    const health = await axios.get(`${BASE_URL}/`);
    console.log('✅ Health check:', health.data.status);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test 2: Check endpoint
  try {
    const check = await axios.post(`${BASE_URL}/check`, {
      url: 'https://example.com'
    });
    console.log('✅ Check endpoint:', check.data.frameable ? 'frameable' : 'not frameable');
  } catch (error) {
    console.log('❌ Check endpoint failed:', error.message);
  }

  // Test 3: Broken endpoint
  try {
    const broken = await axios.post(`${BASE_URL}/broken`, {
      url: 'https://google.com'
    });
    console.log('✅ Broken endpoint:', broken.data.frameable ? 'frameable' : 'not frameable');
  } catch (error) {
    console.log('❌ Broken endpoint failed:', error.message);
  }

  // Test 4: Proxy endpoint
  try {
    const proxy = await axios.get(`${BASE_URL}/proxy/https://example.com`);
    console.log('✅ Proxy endpoint: received', proxy.data.length, 'bytes');
  } catch (error) {
    console.log('❌ Proxy endpoint failed:', error.message);
  }

  // Test 5: Swagger JSON
  try {
    const swagger = await axios.get(`${BASE_URL}/api-docs.json`);
    console.log('✅ Swagger JSON:', swagger.data.info.title);
  } catch (error) {
    console.log('❌ Swagger JSON failed:', error.message);
  }

  console.log('\n✨ Tests complete!');
}

runTests();
```

Run tests:
```bash
node test.js
```

## 📊 Expected Results Summary

| Endpoint | Method | Expected Status | Expected Response |
|----------|--------|----------------|-------------------|
| `/` | GET | 200 | JSON with status and endpoints |
| `/check` | POST | 200 | JSON with frameable status |
| `/broken` | POST | 200 | JSON with frameable status |
| `/proxy/:url` | GET | 200 | Proxied content |
| `/proxy/*` | GET | 200 | Proxied content |
| `/api-docs` | GET | 200 | Swagger UI HTML |
| `/api-docs.json` | GET | 200 | OpenAPI JSON spec |

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
PORT=3001 npm start
```

### CORS Errors
- Ensure server is running
- Check browser console
- Verify CORS headers in response

### Proxy Not Working
- Check target URL is accessible
- Verify no firewall blocking
- Test with simple URL first (example.com)

## ✅ Success Criteria

All tests pass when:
- ✅ Server starts without errors
- ✅ Health endpoint returns status "ok"
- ✅ Swagger UI loads at /api-docs
- ✅ Check endpoint returns frameable status
- ✅ Proxy endpoint returns content
- ✅ iFrame embedding works
- ✅ No console errors

## 🎉 Next Steps

After testing:
1. Deploy to production
2. Add authentication if needed
3. Implement rate limiting
4. Set up monitoring
5. Share Swagger docs with team
