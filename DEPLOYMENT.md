# Kostra Deployment Guide

This guide covers deploying the Kostra platform to production environments.

## 🚀 Pre-Deployment Checklist

### Environment Configuration
- [ ] Set up production database (PostgreSQL)
- [ ] Configure environment variables
- [ ] Set up domain and SSL certificates
- [ ] Configure CORS for production URLs
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure analytics (Google Analytics)

### Security Review
- [ ] Review JWT secret strength
- [ ] Verify password hashing implementation
- [ ] Check input validation on all endpoints
- [ ] Ensure rate limiting is configured
- [ ] Review file upload security
- [ ] Validate HTTPS enforcement

### Performance Optimization
- [ ] Enable Next.js production optimizations
- [ ] Configure CDN for static assets
- [ ] Set up image optimization
- [ ] Enable database connection pooling
- [ ] Configure caching strategies

## 🏗 Backend Deployment (Node.js/Express)

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configure vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/server.js"
       }
     ]
   }
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add NODE_ENV production
   vercel env add DATABASE_URL your_postgres_url
   vercel env add JWT_SECRET your_jwt_secret
   vercel env add FRONTEND_URL https://your-frontend-domain.com
   ```

4. **Deploy**
   ```bash
   cd Server
   vercel --prod
   ```

### Option 2: Railway

1. **Connect GitHub repository**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically from main branch**

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**
   ```bash
   heroku create kostra-api
   ```
3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DATABASE_URL=your_postgres_url
   heroku config:set JWT_SECRET=your_jwt_secret
   ```
4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🌐 Frontend Deployment (Next.js)

### Option 1: Vercel (Recommended)

1. **Connect GitHub repository to Vercel**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set environment variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   NEXT_PUBLIC_FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Deploy from GitHub integration**

### Option 2: Netlify

1. **Connect GitHub repository**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
3. **Add environment variables**
4. **Deploy**

### Option 3: AWS Amplify

1. **Connect repository**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy**

## 🗄 Database Setup

### PostgreSQL (Production)

#### Option 1: Supabase (Recommended)

1. **Create Supabase project:**
   - Go to https://supabase.com
   - Create new project
   - Note connection string

2. **Run migrations:**
   ```bash
   # Update knexfile.js with production connection
   NODE_ENV=production npm run migrate
   ```

3. **Seed initial data (optional):**
   ```bash
   NODE_ENV=production npm run seed
   ```

#### Option 2: Neon

1. **Create Neon database**
2. **Get connection string**
3. **Run migrations**

#### Option 3: AWS RDS

1. **Create RDS PostgreSQL instance**
2. **Configure security groups**
3. **Get connection details**
4. **Run migrations**

## 🔧 Environment Variables

### Backend Production Environment

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com

# Optional: Email service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: File upload service
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Production Environment

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_FRONTEND_URL=https://your-frontend-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Payment processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 🔒 Security Configuration

### HTTPS Setup
- Ensure SSL certificates are configured
- Force HTTPS redirects
- Update CORS origins for production

### Database Security
- Use connection pooling
- Set up database backups
- Configure read replicas if needed

### API Security
- Review rate limiting rules
- Set up monitoring and alerts
- Configure proper CORS origins

## 📊 Monitoring & Analytics

### Error Monitoring
**Sentry Integration:**

1. **Backend:**
   ```bash
   npm install @sentry/node @sentry/tracing
   ```

2. **Frontend:**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Configure Sentry DSN in environment variables**

### Performance Monitoring
- Set up application performance monitoring
- Database query monitoring
- Error tracking and alerting

### Analytics
- Google Analytics integration
- User behavior tracking
- Conversion tracking

## 🚀 Post-Deployment Steps

### Testing
- [ ] Test all user flows in production
- [ ] Verify payment processing
- [ ] Test authentication flows
- [ ] Check mobile responsiveness
- [ ] Validate email notifications

### DNS & Domain
- [ ] Configure custom domain
- [ ] Set up DNS records
- [ ] Configure SSL certificates
- [ ] Test domain propagation

### Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Set up performance monitoring
- [ ] Create backup procedures

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd Server && npm install
      - run: cd Server && npm run build
      - run: cd Server && vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd Client && npm install
      - run: cd Client && npm run build
      - run: cd Client && vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Confirm database credentials

2. **CORS Errors**
   - Update CORS origins in backend
   - Verify environment variables
   - Check protocol (HTTP vs HTTPS)

3. **Build Failures**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Review build logs

4. **Authentication Issues**
   - Verify JWT_SECRET matches between frontend/backend
   - Check token expiration settings
   - Validate redirect URLs

### Rollback Strategy
- Keep previous deployment artifacts
- Database migration rollback procedures
- DNS failover setup

## 📞 Support

For deployment issues:
- Check deployment platform documentation
- Review application logs
- Contact support if needed

---

**Happy Deploying! 🚀**
