# Uranus Enterprise — Activation Guide

Everything here is **100% free**. No credit card needed for any step.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ installed ✅ (you already have this)
- A GitHub account
- The `web/` folder from this project

---

## Step 1 · Create a Free PostgreSQL Database

We'll use **Neon** — a free serverless PostgreSQL with no credit card required.

1. Go to [https://neon.tech](https://neon.tech) and click **Sign Up**
2. Sign in with your **GitHub account**
3. Click **Create Project**
   - Project name: `uranus-enterprise`
   - Region: Pick the closest to Chennai (Singapore or Mumbai)
4. Once created, you'll see a **connection string** like:
   ```
   postgresql://neondb_owner:abc123@ep-cool-name-12345.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
5. **Copy this connection string** — you'll need it in the next step

---

## Step 2 · Configure Environment Variables

1. Open the file `web/.env`
2. Replace the DATABASE_URL with your Neon connection string:
   ```env
   DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-YOUR-HOST.aws.neon.tech/neondb?sslmode=require"
   ```
3. Change the admin secret to something unique:
   ```env
   ADMIN_SECRET="pick-any-random-long-string-here-1234"
   ```

Your `.env` file should now look like:
```env
DATABASE_URL="postgresql://neondb_owner:abc123@ep-cool-name-12345.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_SECRET="my-super-secret-key-change-this"
```

---

## Step 3 · Set Up the Database

Open a terminal in the `web/` folder and run these commands one by one:

```bash
# 3a. Create the database tables
npx prisma migrate dev --name init
```

Wait for it to finish. You should see `Your database is now in sync with your schema.`

```bash
# 3b. Seed the database with initial data (services, packages, reviews, admin user)
npx prisma db seed
```

You should see:
```
Admin user: admin@uranus.in / admin123
Seed complete.
```

---

## Step 4 · Test Locally

```bash
npm run dev
```

Open your browser:

| URL | What you should see |
|-----|---------------------|
| [http://localhost:3000](http://localhost:3000) | Public homepage with all services |
| [http://localhost:3000/services](http://localhost:3000/services) | All 5 services listed |
| [http://localhost:3000/admin](http://localhost:3000/admin) | Redirects to login page |
| [http://localhost:3000/admin/login](http://localhost:3000/admin/login) | Admin login form |

**Login with:**
- Email: `admin@uranus.in`
- Password: `admin123`

After login you should see the Admin Dashboard with counts for services, packages, reviews, and enquiries.

> ⚠️ **Change the admin password before going live.** To do this, update the seed script or add a password-change feature in the admin portal.

---

## Step 5 · Push to GitHub (Free)

1. Go to [https://github.com/new](https://github.com/new)
2. Create a new **private** repository named `uranus-enterprise`
3. Run these commands in the project root (`uranus enterprises/`):

```bash
cd web
git init
git add .
git commit -m "Initial commit: Uranus Enterprise website + admin portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uranus-enterprise.git
git push -u origin main
```

---

## Step 6 · Deploy to Vercel (Free)

Vercel's free Hobby plan gives you unlimited deployments, custom domains, and HTTPS.

1. Go to [https://vercel.com](https://vercel.com) and click **Sign Up**
2. Sign in with your **GitHub account**
3. Click **Add New → Project**
4. Import your `uranus-enterprise` repository from GitHub
5. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `web` (click "Edit" and type `web`)
   - **Build Command:** leave as default (`next build`)
   - **Output Directory:** leave as default
6. Click **Environment Variables** and add these:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon connection string (from Step 2) |
   | `ADMIN_SECRET` | Your secret string (from Step 2) |

7. Click **Deploy**

Wait 1–2 minutes. Vercel will build and deploy your site.

You'll get a URL like `https://uranus-enterprise.vercel.app` — this is your live site.

---

## Step 7 · Connect Your Domain (Free on Vercel)

You already own `msuranus.in`. Let's point it to Vercel.

1. In your Vercel project, go to **Settings → Domains**
2. Add `www.msuranus.in` and `msuranus.in`
3. Vercel will show you DNS records to add. Go to your domain registrar (where you bought the domain) and add:

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | www | `cname.vercel-dns.com` |
   | A | @ | `76.76.21.21` |

4. Wait 5–30 minutes for DNS to propagate
5. Vercel automatically issues a free SSL certificate — your site will be on HTTPS

---

## Step 8 · Update the WhatsApp Number

The site currently uses a placeholder WhatsApp number. Replace it with the real one:

1. Go to your admin portal: `https://www.msuranus.in/admin`
2. Login with `admin@uranus.in` / `admin123`
3. Go to **Settings**
4. Update:
   - **Phone (display):** The formatted phone number shown on the website (e.g., `+91 98765 43210`)
   - **WhatsApp Number:** The raw number with country code, no spaces or `+` (e.g., `919841770013`)
5. Click **Save settings**

Every "Enquire on WhatsApp" button on the site will now use the real number.

---

## Step 9 · Update Business Details

While you're in the admin portal, update all the placeholder data:

1. **Settings** → Update email, address, business hours, stats (years experience, customers, projects)
2. **Services** → Edit descriptions, prices, features if needed
3. **Packages** → Update CCTV package prices and specs
4. **Reviews** → Edit or add real customer reviews

All changes appear on the website immediately after saving.

---

## Summary of Free Services Used

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Neon** | PostgreSQL database | 0.5 GB storage, always free |
| **Vercel** | Hosting + CDN + SSL | Unlimited sites, 100 GB bandwidth/month |
| **GitHub** | Code repository | Unlimited private repos |
| **Cloudinary** (later) | Image hosting | 25 GB storage, 25 GB bandwidth/month |

**Total monthly cost: ₹0**

---

## Troubleshooting

### "Cannot connect to database"
- Check your `DATABASE_URL` in `.env` (local) or Vercel Environment Variables (production)
- Make sure the Neon project is not paused (free tier pauses after 5 days of inactivity — just open the Neon dashboard to wake it up)

### "Admin login not working"
- Make sure you ran `npx prisma db seed` to create the admin user
- Check the password: default is `admin123`

### "Changes not showing on live site"
- Vercel caches pages. After updating content in admin, the site revalidates automatically on the next visit
- Force a refresh: go to Vercel dashboard → Deployments → click "Redeploy"

### "WhatsApp link not opening correctly"
- The WhatsApp number must be digits only with country code: `919841770013` (not `+91 98765 43210`)
- Test by clicking any "Enquire on WhatsApp" button on the site

### Build fails on Vercel
- Make sure the **Root Directory** is set to `web` in Vercel project settings
- Make sure both `DATABASE_URL` and `ADMIN_SECRET` are added as environment variables

---

## What's Next (Optional, All Free)

- **Cloudinary** — Add real product/service photos (free tier: 25 GB)
- **Google Analytics** — Track visitors (free)
- **Google Search Console** — Monitor SEO performance (free, sitemap is already at `/sitemap.xml`)
- **UptimeRobot** — Get alerts if the site goes down (free tier: 50 monitors)
