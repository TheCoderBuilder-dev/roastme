# RoastMe - Deployment Guide

This document outlines the steps to deploy the RoastMe application to production.

## Prerequisites

1. A Supabase account and project set up
2. Vercel, Netlify, or similar platform for hosting Next.js applications
3. Environment variables properly configured

## Environment Setup

Ensure the following environment variables are set in your deployment platform:

```
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-supabase-anon-key
SUPABASE_SERVICE_KEY=your-production-supabase-service-key
NEXTAUTH_URL=https://your-production-domain.com
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

## Database Setup

1. Run the Supabase schema SQL in your Supabase project:
   - Navigate to your Supabase dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL to set up all tables, functions, and policies

## Deployment Steps

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add all environment variables from the `.env.production` file
4. Deploy the application

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `.next`
3. Add all environment variables from the `.env.production` file
4. Deploy the application

## Post-Deployment

1. Set up custom domain if needed
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Test the authentication flow in production
5. Monitor Supabase performance and usage

## Scaling Considerations

1. Configure Supabase capacity based on expected user load
2. Consider implementing caching for frequently accessed data
3. Set up proper database indexes for performance
4. Implement rate limiting for API endpoints
5. Consider using a CDN for static assets

## Production Checklist

- [ ] All environment variables properly set
- [ ] Database schema applied correctly
- [ ] Authentication works end-to-end
- [ ] Profile creation and management works
- [ ] Roast submission and voting functionality works
- [ ] Images and assets load correctly
- [ ] Responsive design works on all devices
- [ ] Error logging is properly configured
- [ ] Performance monitoring is set up
