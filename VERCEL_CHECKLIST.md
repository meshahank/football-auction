# AFC Auction System - Vercel Deployment Checklist

## Pre-Deployment ✅

- [ ] All dependencies installed (`npm install && cd client && npm install`)
- [ ] Local app tested and working
- [ ] Git repository initialized and files committed
- [ ] `.env.example` configured with all needed variables
- [ ] No sensitive data in code (passwords, API keys, etc.)

## Vercel Setup ✅

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Build settings configured correctly:
  - Build Command: `cd client && npm run build`
  - Output Directory: `client/build`
  - Install Command: `npm install && cd client && npm install`

## Environment Variables in Vercel ✅

Set these in Vercel **Settings → Environment Variables**:

- [ ] `NODE_ENV` = `production`
- [ ] `REACT_APP_SOCKET_URL` = (leave empty for auto-detection)

Optional:
- [ ] `PRODUCTION_URL` = (your custom domain if applicable)

## Deployment ✅

- [ ] Click "Deploy" in Vercel dashboard
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Check deployment logs for errors
- [ ] Get production URL: `https://<project>.vercel.app`

## Post-Deployment Testing ✅

- [ ] App loads successfully
- [ ] Login works (admin123 / user123)
- [ ] Real-time updates working (reveal player, check live updates)
- [ ] Socket connection established (check browser Console)
- [ ] No CORS errors in console

## Production Recommendations ✅

Soon (when ready):
- [ ] Set up database (MongoDB Atlas or Supabase)
- [ ] Update environment variables with DB connection
- [ ] Modify `server/server.js` to use database instead of JSON files
- [ ] Deploy backend separately if needed (Railway, Render)
- [ ] Set up custom domain
- [ ] Enable HTTPS (Vercel does automatically)
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics

## Monitoring ✅

- [ ] Check Vercel dashboard regularly for errors
- [ ] Review deployment logs
- [ ] Monitor performance metrics
- [ ] Set up alerts for build failures

---

## Quick Reference

**Production URL**: `https://<project-name>.vercel.app`

**Environment Variables Command** (if using Vercel CLI):
```bash
vercel env add REACT_APP_SOCKET_URL
```

**Redeploy**:
```bash
git push origin main  # or make changes in Vercel dashboard
```

**View Logs**:
```bash
vercel logs <project-name>
```

