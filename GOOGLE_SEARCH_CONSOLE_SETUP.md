# Google Search Console Setup Guide

## Step 1: Verify Your Website

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Start now" and sign in with your Google account
3. Click "Add Property" in the top left
4. Enter your website URL: `https://worksocial.in`
5. Choose verification method: **HTML tag**
6. Copy the verification code (looks like: `abcdefgh1234567890`)
7. Update `index.html` with your verification code
8. Deploy the changes
9. Go back to Search Console and click "Verify"

## Step 2: Submit Your Sitemap

After verification:
1. In Search Console, go to "Sitemaps" (left sidebar)
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for Google to process (can take a few hours to days)

## Step 3: Request Indexing for Key Pages

1. Go to "URL Inspection" tool
2. Enter important URLs one by one:
   - `https://worksocial.in/`
   - `https://worksocial.in/calculators`
   - `https://worksocial.in/calculators/emi`
   - `https://worksocial.in/calculators/sip`
   - `https://worksocial.in/services`
3. Click "Request Indexing" for each

## Step 4: Monitor Your Performance

1. Check "Performance" report after a few days
2. Look for:
   - Total clicks
   - Total impressions
   - Average CTR
   - Average position
3. Fix any coverage issues in the "Coverage" report

## Additional Tips

- **Be Patient**: Indexing can take 24-48 hours
- **Create Quality Content**: Add more blog posts and resources
- **Build Backlinks**: Get other sites to link to you
- **Mobile Optimization**: Ensure mobile-friendly design (already done ✓)
- **Page Speed**: Monitor Core Web Vitals

## Current SEO Status

✅ Sitemap.xml created (30+ URLs)
✅ Robots.txt configured
✅ Meta tags optimized
✅ Open Graph tags added
✅ Structured data included
✅ Google Analytics installed
✅ PageSense tracking added
⏳ Google Search Console verification (pending your action)
⏳ Sitemap submission (after verification)

## Quick Command to Deploy After Adding Verification Code

```bash
git add . && git commit -m "feat: Add Google Search Console verification" && git push && vercel --prod
```

---

**Need Help?** Contact your development team or refer to [Google's official documentation](https://support.google.com/webmasters/answer/9008080)
