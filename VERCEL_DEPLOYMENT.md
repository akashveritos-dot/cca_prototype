# Vercel Deployment Guide

## Issue: Missing Environment Variables

Your deployment failed because environment variables are not configured in Vercel.

## Quick Fix

### Method 1: Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL database host | `your-db-host.com` |
| `DB_PORT` | MySQL database port | `3306` |
| `DB_USER` | Database username | `your_user` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `next_website` |
| `NEXTAUTH_URL` | Your site URL | `https://yoursite.vercel.app` |
| `NEXTAUTH_SECRET` | Random secret (32+ chars) | Generate with: `openssl rand -base64 32` |
| `JWT_SECRET` | Random secret (32+ chars) | Generate with: `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://yoursite.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Public API URL | `https://yoursite.vercel.app/api` |

5. Select which environments to apply to: **Production**, **Preview**, **Development**
6. Click **Save**
7. Redeploy your project

### Method 2: Vercel CLI

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add DB_HOST production
vercel env add DB_PORT production
vercel env add DB_USER production
vercel env add DB_PASSWORD production
vercel env add DB_NAME production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_API_URL production

# Redeploy
vercel --prod
```

## Important Notes

### Database Setup
- Vercel doesn't provide MySQL hosting
- You need to use an external MySQL provider:
  - **PlanetScale** (recommended, free tier available)
  - **AWS RDS**
  - **Railway**
  - **DigitalOcean Managed Databases**
  - **Supabase** (if you want to switch to PostgreSQL)

### Generating Secrets
Generate secure random strings for NEXTAUTH_SECRET and JWT_SECRET:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use an online generator (use a trusted one)
```

### Database Connection
Make sure your production database:
- Accepts connections from Vercel's IP addresses (or anywhere if using PlanetScale)
- Has SSL enabled (recommended)
- Is accessible via the internet

### After Adding Variables
- Redeploy your project from Vercel dashboard or run `vercel --prod`
- The new environment variables will be available on the next deployment

## Troubleshooting

If you still see the `MYSQL_HOST` error after setting `DB_HOST`, check:
1. Your Vercel project settings for any old configuration
2. Clear the build cache: Settings → General → Clear Build Cache
3. Ensure you're not referencing `MYSQL_HOST` anywhere in your code
