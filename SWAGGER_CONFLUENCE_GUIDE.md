# Swagger Integration & Confluence Export Guide

## ✅ What Has Been Done

### 1. Installed Swagger Dependencies
- `swagger-ui-express` - Provides Swagger UI interface
- `swagger-jsdoc` - Generates Swagger specification from JSDoc comments

### 2. Created Swagger Configuration (`swagger.js`)
- Configured OpenAPI 3.0 specification
- Added server URLs (localhost and production)
- Defined security schemes (JWT Bearer authentication)
- Created reusable schemas for User and Error responses

### 3. Integrated Swagger UI into Server
- Added Swagger UI route at `/api-docs`
- Configured to scan routes and server files for documentation

### 4. Documented All API Endpoints
- **GET /** - Health check endpoint
- **GET /users** - Get all users (requires auth)
- **GET /users/:id** - Get user by ID (requires auth)
- **PUT /users/:id** - Update user (requires auth)
- **DELETE /users/:id** - Delete user (requires auth)

## 🚀 How to Access Swagger Documentation

### Local Development
1. Start your server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001/api-docs
   ```

### Production
```
https://reverse-proxy-007-9si2.vercel.app/api-docs
```

## 📋 Exporting to Confluence

### Method 1: Using Swagger JSON (Recommended)

1. **Get the Swagger JSON:**
   - Visit: `http://localhost:3001/api-docs/swagger.json`
   - Or add this endpoint to your server.js:
   ```javascript
   app.get('/api-docs.json', (req, res) => {
     res.setHeader('Content-Type', 'application/json');
     res.send(swaggerSpec);
   });
   ```

2. **Import to Confluence:**
   - Install "Swagger for Confluence" app from Atlassian Marketplace
   - In Confluence page, use `/swagger` macro
   - Paste the JSON URL or content
   - The documentation will render automatically

### Method 2: HTML Export

1. **Copy Swagger UI HTML:**
   - Open `http://localhost:3001/api-docs`
   - Right-click → "View Page Source"
   - Copy the entire HTML

2. **Paste in Confluence:**
   - Create a new Confluence page
   - Use HTML macro
   - Paste the copied HTML

### Method 3: Screenshots & Manual Documentation

1. Open Swagger UI at `/api-docs`
2. Take screenshots of each endpoint
3. Create a Confluence page with:
   - API overview
   - Endpoint descriptions
   - Request/response examples
   - Screenshots from Swagger UI

### Method 4: Using Confluence REST API (Advanced)

You can automate the export using Confluence REST API:

```javascript
const axios = require('axios');
const fs = require('fs');

// Get Swagger spec
const swaggerSpec = require('./swagger').swaggerSpec;

// Convert to Confluence Storage Format
const confluenceContent = {
  type: 'page',
  title: 'API Documentation',
  space: { key: 'YOUR_SPACE_KEY' },
  body: {
    storage: {
      value: `<ac:structured-macro ac:name="code">
        <ac:plain-text-body><![CDATA[${JSON.stringify(swaggerSpec, null, 2)}]]></ac:plain-text-body>
      </ac:structured-macro>`,
      representation: 'storage'
    }
  }
};

// Post to Confluence
axios.post(
  'https://your-domain.atlassian.net/wiki/rest/api/content',
  confluenceContent,
  {
    auth: {
      username: 'your-email@example.com',
      password: 'your-api-token'
    },
    headers: { 'Content-Type': 'application/json' }
  }
);
```

## 🔧 Customization Options

### Add More Details to Swagger
Edit `swagger.js` to add:
- More detailed descriptions
- Example values
- Additional schemas
- Authentication details

### Add Swagger JSON Endpoint
Add this to `server.js`:
```javascript
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
```

### Customize Swagger UI Theme
Modify the Swagger UI setup in `server.js`:
```javascript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "My API Docs"
}));
```

## 📝 Best Practices for Confluence

1. **Keep Documentation Updated:** Update Swagger comments when APIs change
2. **Use Confluence Macros:** Install Swagger/OpenAPI macros for better rendering
3. **Link to Live Docs:** Add a link to your live Swagger UI in Confluence
4. **Version Control:** Document API versions in both Swagger and Confluence
5. **Add Examples:** Include real request/response examples in Swagger annotations

## 🎯 Next Steps

1. Test the Swagger UI at `http://localhost:3001/api-docs`
2. Choose your preferred export method
3. Set up Confluence page structure
4. Import/embed the API documentation
5. Share with your team!

## 📚 Additional Resources

- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Confluence REST API](https://developer.atlassian.com/cloud/confluence/rest/v1/intro/)
- [Swagger for Confluence App](https://marketplace.atlassian.com/search?query=swagger)
