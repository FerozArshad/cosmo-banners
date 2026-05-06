# COSMO Cosmetics — Website

## Quick Deploy (5 minutes)

### Step 1: Create GitHub Repo
1. Go to https://github.com/new
2. Name it `cosmo-cosmetics-site` (or anything you want)
3. Keep it **Public**, click **Create repository**
4. **Don't** initialize with README (we already have files)

### Step 2: Push Code to GitHub

Open your terminal/command prompt and run:

```bash
# Navigate to where you saved these files
cd cosmo-cosmetics-site

# Initialize git
git init
git add .
git commit -m "Initial commit - Cosmo Cosmetics website"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cosmo-cosmetics-site.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `cosmo-cosmetics-site` repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**
6. Wait ~60 seconds — done! You'll get a URL like `cosmo-cosmetics-site.vercel.app`

### Step 4: Custom Domain (Optional)
1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add `cosmocosmetics.ae` (or whatever domain you own)
3. Update DNS as instructed by Vercel

---

## Using Claude Code (Alternative Setup)

If you have Claude Code installed, just run:

```bash
# Clone and set up
git clone https://github.com/YOUR_USERNAME/cosmo-cosmetics-site.git
cd cosmo-cosmetics-site
npm install
npm run dev
# Opens at http://localhost:3000
```

Or ask Claude Code:
> "Set up this Next.js project, install dependencies, and deploy to Vercel"

---

## Project Structure

```
cosmo-cosmetics-site/
├── .github/workflows/     # CI deploy to Vercel (optional)
├── app/
│   ├── layout.js          # Root layout + fonts
│   ├── globals.css         # Reset + animations
│   ├── page.js             # Entry point
│   └── CosmoCosmetics.js   # Full site component
├── next.config.js           # Image domains config
├── public/assets/            # Local banners/logos/thumbs
├── package.json
└── README.md
```

## Features
- ✅ Fully responsive (mobile / tablet / desktop)
- ✅ Multi-currency (AED, USD, MYR, SGD, JPY)
- ✅ Multi-language (English, Malay, Chinese)
- ✅ Hero carousel (70vh desktop, 85vh mobile)
- ✅ 12 category pages with real banner images
- ✅ Mega menu dropdowns with banner previews
- ✅ Mobile hamburger menu with slide-out drawer
- ✅ Product cards with hover Add to Cart
- ✅ Shop by Skin Concern with SVG icons
- ✅ Testimonials, Stats, Newsletter, Footer
- ✅ Local images in `public/assets` (stable paths for Vercel)

## Image Configuration
All banner/logo assets are served locally from `public/assets/...`.

## Auto-Deploy
### Option A (recommended): Vercel Git Integration
Connect the GitHub repo in Vercel and every push auto-deploys:
- `main` → Production
- other branches → Preview

### Option B: GitHub Actions (included in this repo)
This repo includes a workflow at `.github/workflows/vercel-deploy.yml` to deploy on every push.
Add these GitHub repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Every time you push to `main` branch, Vercel auto-deploys. Just:
```bash
git add .
git commit -m "Update something"
git push
```
Vercel rebuilds in ~30 seconds.
