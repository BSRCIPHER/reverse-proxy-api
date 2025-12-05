# 🔧 Confluence Setup - Fix "Fetch Failed" Error

## Problem
Confluence is showing "fetch failed" when trying to load the Swagger JSON from URL.

## ✅ Solution: Use Direct JSON Content

Since the URL is working but Confluence can't fetch it (possibly due to network/firewall restrictions), use the direct JSON content instead.

---

## Method 1: Paste JSON Content Directly (Recommended)

### Step 1: Get the JSON Content
The Swagger JSON has been exported to `swagger-formatted.json` in your project folder.

### Step 2: In Confluence
1. Create or edit your Confluence page
2. Type `/code` and select "Code Block" macro
3. Set language to `json`
4. Copy the entire content from `swagger-formatted.json`
5. Paste it into the code block
6. Save the page

### Step 3: Add Swagger Viewer (If Available)
If you have "Swagger for Confluence" or "OpenAPI for Confluence" app:
1. Type `/swagger` or `/openapi`
2. Select the macro
3. Choose "Paste JSON" option (not URL)
4. Paste the content from `swagger-formatted.json`
5. Save

---

## Method 2: Use Swagger UI HTML Embed

### Step 1: Create HTML File
I'll create a standalone HTML file you can host or embed.

### Step 2: In Confluence
1. Type `/html` and select "HTML" macro
2. Paste the HTML content
3. Save

---

## Method 3: Screenshots + Manual Documentation

If Swagger macros don't work, create manual documentation:

1. **Open Swagger UI locally:**
   - Visit: http://localhost:3001/api-docs
   - Or: https://reverse-proxy-007-9si2.vercel.app/api-docs

2. **Take screenshots** of each endpoint section

3. **In Confluence, create sections:**

### API Overview
- Base URL: `https://reverse-proxy-007-9si2.vercel.app`
- Authentication: JWT Bearer Token

### Endpoints

#### Health Check
- **GET /** 
- Returns: `{"msg": "Hello World!"}`

#### Get All Users
- **GET /users**
- Auth: Required (Bearer Token)
- Returns: Array of user objects

#### Get User by ID
- **GET /users/{id}**
- Auth: Required
- Parameters: `id` (string)
- Returns: User object

#### Update User
- **PUT /users/{id}**
- Auth: Required
- Parameters: `id` (string)
- Body: `{"name": "string", "email": "string"}`
- Returns: Updated user object

#### Delete User
- **DELETE /users/{id}**
- Auth: Required
- Parameters: `id` (string)
- Returns: `{"message": "User deleted successfully"}`

---

## Method 4: Link to External Swagger UI

Simply add a link in Confluence to your live Swagger documentation:

**Live API Documentation:** https://reverse-proxy-007-9si2.vercel.app/api-docs

This way users can click and view the interactive documentation directly.

---

## Why "Fetch Failed" Happens

Common reasons:
1. **Corporate Firewall** - Confluence server can't reach external URLs
2. **CORS Issues** - Though your API has CORS enabled
3. **SSL/Certificate Issues** - Vercel uses valid certs, but some corporate networks block
4. **Confluence Cloud vs Server** - Different versions have different restrictions
5. **Network Policies** - Some organizations block external API calls from Confluence

---

## 🎯 Recommended Approach

**Best Option:** Use Method 1 (Paste JSON directly into Swagger macro)

**Easiest Option:** Use Method 4 (Just link to the live Swagger UI)

**Most Professional:** Use Method 3 (Manual documentation with screenshots)

---

## 📝 Files Created

- `swagger-export.json` - Minified JSON (for API use)
- `swagger-formatted.json` - Pretty-printed JSON (for Confluence)

You can copy either file's content and paste it into Confluence.
