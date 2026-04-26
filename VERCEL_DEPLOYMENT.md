# Vercel Deployment Guide for AFC Auction System

## Overview
This document provides step-by-step instructions to deploy the AFC Auction System on Vercel. The application consists of:
- **Frontend**: React app (deployed to Vercel)
- **Backend**: Express.js server with Socket.io (also deployed to Vercel)
- **Data**: JSON files (should be migrated to database for production)

## ⚠️ Important Considerations

### Socket.io on Serverless
Vercel serverless functions have limitations with persistent WebSocket connections. The application is configured to:
- Use both WebSocket and polling transports for compatibility
- Work with Vercel's serverless environment
- **For production use with many concurrent users**, consider deploying the backend separately to a service like Railway, Render, or AWS Lambda with persistent connections

### File-Based Storage
Currently using JSON files for data storage. This won't work reliably in serverless:
- Vercel serverless instances are ephemeral
- Files written to disk are not persistent across function calls
- **Recommended for production**: Migrate to MongoDB Atlas or PostgreSQL

---

## Step 1: Prepare Your Repository

### 1.1 Install dependencies locally (if not done)
```bash
npm install
cd client && npm install
cd ..
```

### 1.2 Create a local `.env` file
Copy from `.env.example`:
```bash
cp .env.example .env
```

### 1.3 Verify local setup works
```bash
# Terminal 1: Start backend
npm start

# Terminal 2: Start frontend (in client/)
cd client && npm start
```

### 1.4 Commit all changes to Git
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## Step 2: Deploy to Vercel

### 2.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub account

### 2.2 Connect Your Repository
1. Click **"New Project"**
2. Select GitHub
3. Authorize Vercel to access your repositories
4. Find and select your `auction` repository

### 2.3 Configure Project Settings

**Root Directory**: Leave as default (root of repo)

**Framework Preset**: Select **"Other"**

**Build Command**:
```
cd client && npm run build
```

**Output Directory**:
```
client/build
```

**Install Command**:
```
npm install && cd client && npm install
```

### 2.4 Set Environment Variables
In Vercel dashboard under **Settings → Environment Variables**, add:

```
REACT_APP_SOCKET_URL = (leave empty - will use window.location.origin in production)
NODE_ENV = production
```

**Optional** (if using custom domain):
```
PRODUCTION_URL = https://your-custom-domain.com
```

### 2.5 Deploy
Click **"Deploy"** button. Vercel will:
1. Install dependencies
2. Build the React app
3. Deploy everything
4. Provide a live URL

---

## Step 3: Access Your Deployed App

- Your app will be available at: `https://<project-name>.vercel.app`
- Share this URL with users to access the auction system

### Test the Deployment
1. Open the URL in browser
2. Login with credentials:
   - **Admin**: password `admin123`
   - **User**: password `user123`
3. Test basic functionality:
   - Reveal a random player
   - View all players
   - Check team dashboard

---

## Step 4: Production Recommendations

### 4.1 Replace File-Based Storage with Database

**Option A: MongoDB Atlas (Recommended)**

1. Create free tier at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Get connection string
3. Add to Vercel environment variables:
   ```
   DATABASE_URL = mongodb+srv://user:password@cluster.mongodb.net/afc-auction
   ```
4. Update `server/server.js` to use MongoDB instead of JSON files

**Option B: PostgreSQL (via Supabase)**

1. Create account at [supabase.com](https://supabase.com)
2. Get connection string
3. Add to Vercel environment variables:
   ```
   DATABASE_URL = postgresql://user:password@host/database
   ```

### 4.2 Deploy Backend Separately (For Scalability)

If you need better real-time performance:

**Deploy to Railway or Render:**

1. Push to GitHub
2. Connect Railway/Render to GitHub
3. Set same environment variables
4. Update frontend `REACT_APP_SOCKET_URL` to point to backend service

**Updated Architecture:**
```
Vercel (Frontend)
    ↓
Railway Backend Service (Express + Socket.io)
    ↓
MongoDB Atlas (Data)
```

### 4.3 Use Custom Domain
1. In Vercel **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed

### 4.4 Set Up Vercel Analytics
- In Vercel dashboard: **Settings → Analytics**
- Monitor deployment performance

---

## Step 5: Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_SOCKET_URL` | Frontend Socket connection | `https://api.example.com` |
| `NODE_ENV` | Build mode | `production` |
| `PRODUCTION_URL` | Custom domain | `https://auction.company.com` |
| `PORT` | Server port | `5000` (auto-set by Vercel) |
| `DATABASE_URL` | Database connection | `mongodb+srv://...` |

---

## Troubleshooting

### Issue: Build fails
**Solution**: 
- Check build logs in Vercel dashboard
- Ensure `npm install` works locally
- Verify all dependencies are in `package.json`

### Issue: Frontend can't connect to backend
**Solution**:
- Verify `REACT_APP_SOCKET_URL` environment variable
- Check CORS configuration in `server.js`
- Ensure backend is deployed and running

### Issue: Real-time updates not working
**Solution**:
- Socket.io polling may be slower than WebSocket
- Check browser console for errors
- Consider deploying backend separately for better connectivity

### Issue: Data not persisting
**Solution**:
- This is expected with serverless and JSON files
- Migrate to MongoDB Atlas or Supabase
- See "Production Recommendations" section above

---

## Useful Commands

```bash
# Build locally
npm run build

# Start locally
npm start

# Test build output
cd client && npm run build

# View deployment logs
vercel logs [project-name]

# Rollback to previous deployment
vercel rollback
```

---

## File Changes Made for Vercel

The following files were modified for Vercel deployment:

1. **`vercel.json`** - Vercel configuration
2. **`server/server.js`** - Added dynamic CORS, serverless export
3. **`client/src/App.js`** - Dynamic Socket URL detection
4. **`.env.example`** - Added all environment variables
5. **`package.json`** - Added build scripts and Node version

---

## Next Steps

1. ✅ Deploy to Vercel (this guide)
2. 📊 Set up database (MongoDB Atlas recommended)
3. 🔐 Implement proper authentication backend
4. 📧 Set up error monitoring (Sentry)
5. 🚀 Deploy backend separately if needed

---

## Support

For issues with deployment:
- Check [Vercel Docs](https://vercel.com/docs)
- Check [Socket.io Deployment Guide](https://socket.io/docs/v4/deployment/)
- Review Vercel deployment logs in dashboard

