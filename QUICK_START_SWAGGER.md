# 🚀 Quick Start - Swagger to Confluence

## Step 1: Start Your Server
```bash
npm start
```

## Step 2: View Swagger Documentation
Open in browser: **http://localhost:3001/api-docs**

## Step 3: Export for Confluence

### Option A: Direct JSON URL (Easiest)
1. Get JSON: **http://localhost:3001/api-docs.json**
2. In Confluence, install "Swagger for Confluence" app
3. Add `/swagger` macro to your page
4. Paste the JSON URL or content

### Option B: Copy-Paste
1. Visit: http://localhost:3001/api-docs.json
2. Copy all JSON content
3. In Confluence, use "Code" or "Swagger" macro
4. Paste the JSON

### Option C: Screenshots
1. Open http://localhost:3001/api-docs
2. Take screenshots of each endpoint
3. Add to Confluence page with descriptions

## 📍 Available Endpoints

- **Swagger UI:** http://localhost:3001/api-docs
- **Swagger JSON:** http://localhost:3001/api-docs.json
- **Production:** https://reverse-proxy-007-9si2.vercel.app/api-docs

## ✅ What's Documented

- ✓ Health check endpoint (/)
- ✓ Get all users (GET /users)
- ✓ Get user by ID (GET /users/:id)
- ✓ Update user (PUT /users/:id)
- ✓ Delete user (DELETE /users/:id)
- ✓ JWT Authentication schema
- ✓ Request/Response examples

## 🎯 Recommended Confluence Setup

1. Create a page titled "API Documentation"
2. Install "Swagger for Confluence" from Marketplace
3. Add the `/swagger` macro
4. Point it to: http://localhost:3001/api-docs.json
5. Done! Auto-updating documentation ✨
