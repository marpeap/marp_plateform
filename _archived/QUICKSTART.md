# 🚀 MARPEAP DIGITALS - Quick Start Guide

## Instant Preview (30 seconds)

### Option 1: Python (Recommended)
```bash
cd "/home/marpeap/Desktop/Marpeap Empowerment/Marpeap/Softwares and sites/My site"
python3 -m http.server 8000
```
Then open: **http://localhost:8000/index-new.html**

### Option 2: PHP
```bash
php -S localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index-new.html`
3. Select "Open with Live Server"

---

## 📁 File Structure

```
Your Site/
├── index-new.html          ← Main page (NEW VERSION)
├── css/
│   └── style-new.css       ← Design system (NEW VERSION)
├── js/
│   └── main-new.js         ← Interactions (NEW VERSION)
├── 404.html                ← Error page
├── .htaccess               ← Apache config
└── site.webmanifest        ← PWA manifest
```

---

## ✅ Before Going Live

### 1. Rename Files (Production)
```bash
# Backup old files
mv index.html index-old.html
mv css/style.css css/style-old.css
mv js/main.js js/main-old.js

# Activate new version
mv index-new.html index.html
mv css/style-new.css css/style.css
mv js/main-new.js js/main.js
```

### 2. Update Contact Info
Open `index.html` and verify:
- ✅ Phone: `+33 6 49 71 03 70`
- ✅ Email: `adnan.najim@pm.me`
- ✅ Website: `marpeap.digital`

### 3. Add Your Images
Place in `/assets/images/`:
- `marpeap.png` - Logo
- `favico.png` - Favicon (192x192px)
- `marpeap-og.png` - Social preview (1200x630px)

---

## 🌐 Deploy in 2 Minutes

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Enable in repo settings
```

---

## 🎨 Customization

### Change Colors
Edit `css/style-new.css`:
```css
:root {
  --brand-blue: #3B82F6;    /* Your primary color */
  --brand-purple: #8B5CF6;  /* Your secondary color */
  --brand-cyan: #06B6D4;    /* Your accent color */
}
```

### Update Services
Edit `index-new.html` - Find section `id="services"`

### Modify Hero Text
Edit `index-new.html` - Find class `hero-title`

---

## 📊 Performance Checklist

- [ ] Optimize images (use WebP)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Test all links and buttons
- [ ] Verify contact forms work
- [ ] Check loading speed

---

## 🐛 Troubleshooting

**CSS not loading?**
→ Check file path in HTML `<link>` tag

**JS not working?**
→ Open browser console (F12) for errors

**Mobile menu broken?**
→ Ensure `main-new.js` is loaded

**Images not showing?**
→ Verify paths are correct (case-sensitive)

---

## 📞 Need Help?

**Adnan "Marpeap" Najim**  
📱 +33 6 49 71 03 70  
📧 adnan.najim@pm.me  
🌐 marpeap.digital

---

## 🎯 Next Steps

1. ✅ Preview locally
2. ✅ Customize content
3. ✅ Add your images
4. ✅ Test on mobile
5. ✅ Deploy to production
6. ✅ Submit to Google Search Console
7. ✅ Setup analytics

**You're ready to go live! 🚀**
