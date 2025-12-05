# 📚 Complete Guide: Swagger API Documentation for Any Backend Project

## 🎯 Overview
This guide helps you integrate Swagger/OpenAPI documentation into any Node.js/Express backend project and export it to Confluence or other platforms.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Documenting Endpoints](#documenting-endpoints)
5. [Testing](#testing)
6. [Exporting to Confluence](#exporting-to-confluence)
7. [Framework-Specific Examples](#framework-specific-examples)

---

## Prerequisites

- Node.js backend project (Express, Fastify, Koa, etc.)
- npm or yarn package manager
- Basic understanding of your API endpoints

---

## Installation

### Step 1: Install Swagger Packages

```bash
npm install swagger-ui-express swagger-jsdoc --save
```

**What these do:**
- `swagger-ui-express` - Provides the Swagger UI interface
- `swagger-jsdoc` - Generates OpenAPI spec from JSDoc comments in your code

---

## Configuration

### Step 2: Create Swagger Configuration File

Create a file named `swagger.js` in your project root:

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'API documentation for Your Project',
      contact: {
        name: 'API Support',
        email: 'support@yourcompany.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key'
        }
      },
      schemas: {
        // Define your data models here
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            code: {
              type: 'string',
              description: 'Error code'
            }
          }
        }
      }
    }
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js', './controllers/*.js', './server.js', './app.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
```

### Step 3: Integrate into Your Server

**For Express.js:**

```javascript
const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

// Your existing middleware
app.use(express.json());

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint (for Confluence)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Your other routes
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});
```

---

## Documenting Endpoints

### Step 4: Add Swagger Comments to Your Routes

#### Basic GET Endpoint

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/api/users', getAllUsers);
```

#### GET with Path Parameters

```javascript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/api/users/:id', getUserById);
```

#### POST with Request Body

```javascript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/api/users', createUser);
```

#### PUT/PATCH for Updates

```javascript
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/api/users/:id', updateUser);
```

#### DELETE Endpoint

```javascript
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/api/users/:id', deleteUser);
```

#### Endpoint with Authentication

```javascript
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     description: Retrieve all users - requires admin authentication
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/api/admin/users', authMiddleware, adminOnly, getAllUsers);
```

#### Endpoint with Query Parameters

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Search users
 *     description: Search and filter users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/api/users', searchUsers);
```

---

## Testing

### Step 5: Test Your Documentation

1. **Start your server:**
   ```bash
   npm start
   ```

2. **Open Swagger UI in browser:**
   ```
   http://localhost:3000/api-docs
   ```

3. **Verify JSON endpoint:**
   ```
   http://localhost:3000/api-docs.json
   ```

4. **Test each endpoint** in the Swagger UI interface

---

## Exporting to Confluence

### Step 6: Export Documentation

#### Method 1: Direct URL (If Network Allows)

1. Deploy your application to production
2. In Confluence, install "Swagger for Confluence" app
3. Add `/swagger` macro to your page
4. Enter URL: `https://your-api.com/api-docs.json`

#### Method 2: Copy JSON Content (Recommended)

1. **Export JSON:**
   ```bash
   curl http://localhost:3000/api-docs.json > swagger-export.json
   ```

2. **In Confluence:**
   - Type `/swagger` or `/openapi`
   - Select "Paste JSON" option
   - Copy content from `swagger-export.json`
   - Paste and save

#### Method 3: Link to Live Documentation

Simply add a link in Confluence:
```
📚 API Documentation: https://your-api.com/api-docs
```

---

## Framework-Specific Examples

### For Fastify

```javascript
const fastify = require('fastify')();
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

await fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Your API',
      version: '1.0.0'
    }
  }
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/api-docs'
});
```

### For NestJS

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Your API')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

### For Koa

```javascript
const koaSwagger = require('koa2-swagger-ui');
const { koaSwagger: koaSwaggerSpec } = require('koa2-swagger-ui');

app.use(koaSwagger({
  routePrefix: '/api-docs',
  swaggerOptions: {
    url: '/api-docs.json'
  }
}));
```

---

## Best Practices

### 1. Organize by Tags
Group related endpoints using tags:
```javascript
tags: [Users]
tags: [Authentication]
tags: [Products]
```

### 2. Use Reusable Schemas
Define common schemas in `swagger.js`:
```javascript
components: {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
}
```

Then reference them:
```javascript
schema:
  $ref: '#/components/schemas/User'
```

### 3. Add Examples
Include realistic examples:
```javascript
example: {
  id: "123",
  name: "John Doe",
  email: "john@example.com"
}
```

### 4. Document Error Responses
Always document error cases:
```javascript
responses:
  400:
    description: Bad request
  401:
    description: Unauthorized
  404:
    description: Not found
  500:
    description: Server error
```

### 5. Keep Documentation Updated
- Update Swagger comments when changing endpoints
- Review documentation during code reviews
- Test documentation after deployments

---

## Troubleshooting

### Issue: Swagger UI not loading
**Solution:** Check that paths in `apis` array match your file structure

### Issue: Endpoints not showing
**Solution:** Verify Swagger comment syntax is correct (proper indentation)

### Issue: Confluence fetch failed
**Solution:** Use Method 2 (paste JSON content directly)

### Issue: Authentication not working in Swagger UI
**Solution:** Add security schemes in configuration and use `security` in endpoints

---

## Quick Reference Checklist

- [ ] Install `swagger-ui-express` and `swagger-jsdoc`
- [ ] Create `swagger.js` configuration file
- [ ] Add Swagger routes to your server
- [ ] Document all endpoints with `@swagger` comments
- [ ] Test at `/api-docs` endpoint
- [ ] Export JSON from `/api-docs.json`
- [ ] Add to Confluence using preferred method
- [ ] Share documentation link with team

---

## Additional Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [JSDoc Swagger Examples](https://github.com/Surnet/swagger-jsdoc)

---

## Summary

**For any new backend project:**

1. Install packages: `npm install swagger-ui-express swagger-jsdoc`
2. Create `swagger.js` config file
3. Add routes to your server
4. Document endpoints with `@swagger` comments
5. Test at `/api-docs`
6. Export and share with team

**Time required:** 15-30 minutes for initial setup, then 2-3 minutes per endpoint

---

*Last Updated: December 2025*
