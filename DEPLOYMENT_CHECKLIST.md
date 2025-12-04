# 🚀 Deployment Checklist for Swagger on Vercel

## ✅ Pre-Deployment

- [x] Swagger packages installed (`swagger-ui-express`, `swagger-jsdoc`)
- [x] `swagger.js` configuration created
- [x] `api/index.js` updated with Swagger routes
- [x] All API endpoints documented in `routes/userRoutes.js`
- [x] Swagger JSON endpoint added at `/api-docs.json`

## 📦 Deploy to Vercel

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Using Git (Recommended)
```bash
git add .
git commit -m "Add Swagger API documentation"
git push origin main
```
Vercel will auto-deploy if connected to your repository.

## 🔗 After Deployment - Your Swagger URLs

Once deployed, your Swagger documentation will be available at:

### For Confluence Integration:
**Use this URL:** `https://reverse-proxy-007-9si2.vercel.app/api-docs.json`

### For Viewing in Browser:
**Use this URL:** `https://reverse-proxy-007-9si2.vercel.app/api-docs`

## 📋 Confluence Setup Steps

1. **Install Swagger App in Confluence**
   - Go to Atlassian Marketplace
   - Search for "Swagger for Confluence" or "OpenAPI for Confluence"
   - Install the app

2. **Create Documentation Page**
   - Create a new Confluence page
   - Title it "API Documentation" or similar

3. **Add Swagger Macro**
   - Type `/swagger` or `/openapi` in the page
   - Select the macro

4. **Configure the Macro**
   - **URL:** `https://reverse-proxy-007-9si2.vercel.app/api-docs.json`
   - Or paste the JSON content directly
   - Save the page

5. **Verify**
   - Your API documentation should render automatically
   - All endpoints should be visible and interactive

## 🧪 Testing

### Test Locally First:
```bash
npm start
```
Then visit: http://localhost:3001/api-docs

### Test Production After Deploy:
Visit: https://reverse-proxy-007-9si2.vercel.app/api-docs

### Verify JSON Endpoint:
Visit: https://reverse-proxy-007-9si2.vercel.app/api-docs.json

## ⚠️ Important Notes

- The JSON endpoint must be publicly accessible for Confluence to fetch it
- If you have authentication on your API, the `/api-docs.json` endpoint should remain public
- Confluence will periodically refresh the documentation from the JSON URL
- Make sure your Vercel deployment is successful before adding to Confluence

## 🔄 Updating Documentation

When you update your API:
1. Update the Swagger comments in your route files
2. Commit and push changes
3. Vercel will redeploy automatically
4. Confluence will fetch the updated JSON (may take a few minutes)

## 📞 Troubleshooting

**If Swagger UI doesn't load on Vercel:**
- Check Vercel deployment logs
- Verify `api/index.js` is the entry point in `vercel.json`
- Ensure all dependencies are in `package.json`

**If Confluence can't fetch the JSON:**
- Verify the URL is publicly accessible
- Check CORS settings (already configured with `cors()`)
- Try pasting JSON content directly instead of URL

**If endpoints are missing:**
- Check that route files are listed in `swagger.js` apis array
- Verify Swagger comments syntax is correct
- Redeploy to Vercel
