#!/bin/bash
# Script to set up Vercel environment variables
# Run: ./vercel-env-setup.sh

echo "Setting up Vercel environment variables..."

# Database Configuration
vercel env add DB_HOST production
vercel env add DB_PORT production
vercel env add DB_USER production
vercel env add DB_PASSWORD production
vercel env add DB_NAME production

# Authentication
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production

# Site Configuration
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_API_URL production

echo "✅ Environment variables setup complete!"
echo "Note: You'll need to enter the values when prompted"
