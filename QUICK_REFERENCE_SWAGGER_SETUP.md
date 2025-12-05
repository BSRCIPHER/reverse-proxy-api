# ⚡ Quick Reference: Swagger Setup for Any Backend

## 🚀 5-Minute Setup

### 1. Install (30 seconds)
```bash
npm install swagger-ui-express swagger-jsdoc --save
```

### 2. Create swagger.js (2 minutes)
```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'Your API Description'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development' },
      { url: 'https://your-api.com', description: 'Production' }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerSpec };
```

### 3. Add to Server (1 minute)
```javascript
const { swaggerUi, swaggerSpec } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
```

### 4. Document Endpoints (2 min per endpoint)
```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/api/users', getAllUsers);
```

### 5. Test & Export (1 minute)
- View: `http://localhost:3000/api-docs`
- Export: `http://localhost:3000/api-docs.json`

---

## 📝 Common Swagger Patterns

### GET with Parameters
```javascript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
```

### POST with Body
```javascript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
```

### With Authentication
```javascript
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Admin only endpoint
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
```

Add to swagger.js:
```javascript
components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
}
```

---

## 🎯 Confluence Export

### Option 1: Link (Easiest)
```
API Docs: https://your-api.com/api-docs
```

### Option 2: Paste JSON (Best)
1. Get JSON: `curl https://your-api.com/api-docs.json > swagger.json`
2. In Confluence: `/swagger` macro → Paste JSON

### Option 3: URL (If allowed)
In Confluence: `/swagger` macro → Enter URL: `https://your-api.com/api-docs.json`

---

## ✅ Checklist

- [ ] Install packages
- [ ] Create swagger.js
- [ ] Add to server
- [ ] Document endpoints
- [ ] Test locally
- [ ] Deploy
- [ ] Add to Confluence

---

## 🔧 Common Data Types

```javascript
type: 'string'          // Text
type: 'integer'         // Number (whole)
type: 'number'          // Number (decimal)
type: 'boolean'         // true/false
type: 'array'           // List
type: 'object'          // JSON object
format: 'date-time'     // ISO date
format: 'email'         // Email address
format: 'password'      // Password field
```

---

## 📚 Tags for Organization

```javascript
tags: [Users]
tags: [Authentication]
tags: [Products]
tags: [Orders]
tags: [Admin]
```

---

## ⚠️ Common Mistakes

❌ Wrong indentation in YAML-style comments
✅ Use proper spacing (2 spaces)

❌ Missing `apis` paths in swagger.js
✅ Include all route files

❌ Forgetting to restart server
✅ Restart after config changes

❌ Not testing before deploying
✅ Always test at `/api-docs` first

---

## 🎓 Pro Tips

1. **Group by feature** - Use tags to organize endpoints
2. **Add examples** - Include realistic sample data
3. **Document errors** - Show all possible response codes
4. **Use schemas** - Define reusable data models
5. **Keep updated** - Update docs when changing APIs

---

*Save this file for future projects!*
