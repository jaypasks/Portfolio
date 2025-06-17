# Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended)
**Free tier available, easy setup**

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify dashboard
3. Your site will be live instantly with a random URL
4. Optional: Connect custom domain in site settings

**Pros**: Free, fast CDN, automatic HTTPS, form handling
**Cons**: Limited build minutes on free tier

### 2. Vercel
**Great for developers, free tier**

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts

**Pros**: Excellent performance, free tier, easy CLI
**Cons**: Primarily focused on JavaScript frameworks

### 3. GitHub Pages
**Free hosting for GitHub repositories**

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `username.github.io/repository-name`

**Pros**: Free, integrated with GitHub, version control
**Cons**: Static sites only, limited custom domains on free tier

### 4. Firebase Hosting
**Google's hosting platform**

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase login` and `firebase init hosting`
3. Deploy with `firebase deploy`

**Pros**: Fast global CDN, free tier, Google integration
**Cons**: Requires Firebase setup

## 📁 Pre-Deployment Checklist

### Content Updates
- [ ] Replace sample name "John Doe" with your name
- [ ] Update hero section with your title and description
- [ ] Replace about section content with your information
- [ ] Update skills section with your technologies
- [ ] Replace project information with your actual projects
- [ ] Update contact information (email, phone, location)
- [ ] Replace social media links with your profiles

### Images
- [ ] Add your profile photo as `assets/images/profile.jpg`
- [ ] Add about section image as `assets/images/about.jpg`
- [ ] Add project screenshots in `assets/images/projects/`
- [ ] Optimize all images for web (compress file sizes)
- [ ] Ensure images are properly sized (see README for dimensions)

### Files
- [ ] Add your resume as `assets/resume.pdf`
- [ ] Update meta tags in HTML head section
- [ ] Test all links and ensure they work
- [ ] Verify contact form functionality
- [ ] Test responsive design on different devices

### SEO & Performance
- [ ] Update page title and meta description
- [ ] Add favicon (currently using emoji, consider custom icon)
- [ ] Compress images for faster loading
- [ ] Test site speed with Google PageSpeed Insights
- [ ] Verify accessibility with browser dev tools

## 🔧 Advanced Deployment

### Custom Domain Setup
1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings to point to your hosting provider
3. Configure SSL certificate (usually automatic)

### Performance Optimization
```bash
# Minify CSS (optional)
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# Optimize images
npm install -g imagemin-cli
imagemin assets/images/* --out-dir=assets/images/optimized
```

### Analytics Setup
Add Google Analytics or similar:
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Troubleshooting

### Common Issues

**Images not loading**
- Check file paths are correct
- Ensure images are in the right directory
- Verify file extensions match HTML references

**Contact form not working**
- Implement backend handling or use service like Formspree
- Check JavaScript console for errors
- Verify form validation is working

**Site not responsive**
- Test CSS media queries
- Check viewport meta tag is present
- Verify responsive.css is linked correctly

**Slow loading**
- Compress images
- Minify CSS/JS files
- Use a CDN for external libraries

## 📊 Post-Deployment

### Testing
1. Test on multiple devices and browsers
2. Check all links and functionality
3. Verify contact form works
4. Test download links
5. Check social media links

### Monitoring
1. Set up Google Analytics
2. Monitor site performance
3. Check for broken links regularly
4. Update content as needed

### Maintenance
1. Keep dependencies updated
2. Refresh project information regularly
3. Update resume periodically
4. Add new projects as you complete them

## 🔗 Useful Resources

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/) - Performance testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit tool
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [WebAIM](https://webaim.org/) - Accessibility testing

---

**Need help?** Check the hosting provider's documentation or create an issue in the repository.
