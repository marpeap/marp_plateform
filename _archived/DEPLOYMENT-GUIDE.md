# MARPEAP DIGITALS - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

**Fastest deployment - 2 minutes**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd "/home/marpeap/Desktop/Marpeap Empowerment/Marpeap/Softwares and sites/My site"
vercel
```

3. Follow prompts and your site will be live!

**Or use Vercel Dashboard:**
1. Go to https://vercel.com
2. Import Git repository or drag & drop folder
3. Deploy automatically

### Option 2: Netlify

**Great for continuous deployment**

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

**Or use Netlify Dashboard:**
1. Go to https://netlify.com
2. Drag & drop your site folder
3. Done!

### Option 3: GitHub Pages

**Free hosting with custom domain support**

1. Create GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

3. Enable GitHub Pages in repository settings
4. Select `main` branch and `/` (root) folder

### Option 4: Traditional Hosting (cPanel/FTP)

**For shared hosting providers**

1. **Via FTP:**
   - Use FileZilla or similar FTP client
   - Upload all files to `public_html` or `www` folder
   - Ensure `.htaccess` is uploaded

2. **Via cPanel File Manager:**
   - Login to cPanel
   - Navigate to File Manager
   - Upload files to `public_html`
   - Extract if uploaded as ZIP

## 📋 Pre-Deployment Checklist

### 1. Update Contact Information
- [ ] Phone number in HTML
- [ ] Email address in HTML
- [ ] Social media links
- [ ] Structured data (JSON-LD)

### 2. Optimize Images
```bash
# Install image optimization tools
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/* --out-dir=assets/images/optimized
```

### 3. Minify CSS & JS (Production)
```bash
# Install minification tools
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/style-new.min.css css/style-new.css

# Minify JS
uglifyjs js/main-new.js -o js/main-new.min.js -c -m
```

Then update HTML to use `.min.css` and `.min.js` files.

### 4. Test Locally
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx http-server
```

Visit: http://localhost:8000

### 5. Validate
- [ ] HTML: https://validator.w3.org/
- [ ] CSS: https://jigsaw.w3.org/css-validator/
- [ ] Mobile-Friendly: https://search.google.com/test/mobile-friendly
- [ ] Page Speed: https://pagespeed.web.dev/

## 🔧 Environment-Specific Configuration

### Production Settings

1. **Update file paths** (if needed):
   - Change `index-new.html` to `index.html`
   - Update CSS/JS references

2. **Enable Analytics**:
   - Add Google Analytics tracking code
   - Add Meta Pixel (if using Facebook Ads)

3. **Configure Domain**:
   - Point DNS A record to hosting IP
   - Or update CNAME for Vercel/Netlify

### SSL Certificate

**Vercel/Netlify:** Automatic SSL (Let's Encrypt)

**Traditional Hosting:**
1. Request SSL certificate from hosting provider
2. Or use Let's Encrypt (free)
3. Force HTTPS via `.htaccess` (already configured)

## 📊 Post-Deployment Tasks

### 1. Submit to Search Engines
```bash
# Google Search Console
https://search.google.com/search-console

# Bing Webmaster Tools
https://www.bing.com/webmasters
```

### 2. Setup Monitoring
- Google Analytics
- Google Search Console
- Uptime monitoring (UptimeRobot, Pingdom)

### 3. Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://marpeap.digital
```

### 4. Social Media Preview
Test OG tags:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 🔄 Continuous Deployment

### GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Issue: CSS/JS not loading
**Solution:** Check file paths are correct (relative vs absolute)

### Issue: Images not showing
**Solution:** Verify image paths and file extensions (case-sensitive on Linux)

### Issue: Mobile menu not working
**Solution:** Ensure `main-new.js` is loaded after DOM

### Issue: Slow loading
**Solution:** 
- Optimize images (WebP format)
- Enable compression (.htaccess)
- Use CDN for assets

## 📞 Support

**Developer:** Adnan "Marpeap" Najim  
**Email:** adnan.najim@pm.me  
**Phone:** +33 6 49 71 03 70  
**Website:** https://marpeap.digital

---

**Last Updated:** January 2025  
**Version:** 2025.1.0
