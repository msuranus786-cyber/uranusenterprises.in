# Uranus Enterprises — Website & Admin Portal

Lead-generation platform for Uranus Enterprises (Chennai): CCTV installation, biometric access, computer service, networking/site works and home automation. Customers browse services and enquire on WhatsApp; the owner manages everything from `/admin`.

**Production domain:** https://www.uranusenterprises.in

## Stack

Next.js 16 (App Router, Server Actions) · React 19 · Tailwind CSS 4 · Prisma 7 + PostgreSQL (Neon) · JWT admin sessions (jose + bcrypt) · zod validation · GA4 (optional)

## Local setup

```bash
cp .env.example .env    # fill in DATABASE_URL, ADMIN_SECRET, ADMIN_SEED_PASSWORD
npm install
npx prisma migrate deploy
npx prisma db seed      # creates/rotates the admin user from ADMIN_SEED_PASSWORD
npm run dev
```

- Public site: http://localhost:3000 (works even without a DB — static fallback data)
- Admin portal: http://localhost:3000/admin (requires DB + seed)

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | prod | Neon Postgres connection string |
| `ADMIN_SECRET` | **prod (enforced)** | JWT signing secret; app throws at startup if unset in production |
| `ADMIN_SEED_PASSWORD` | seeding | Admin password created/rotated by `prisma db seed` (min 10 chars) |
| `ADMIN_SEED_EMAIL` | optional | Admin email (default `admin@uranus.in`) |
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical origin for metadata/sitemap/robots/JSON-LD |
| `NEXT_PUBLIC_GA_ID` | optional | GA4 measurement ID; analytics disabled when unset |

## Deploying (Netlify free tier)

Vercel's free Hobby plan prohibits commercial sites; Netlify's free tier allows them.

1. Push this `web/` folder to a GitHub repo.
2. Netlify → Add new site → Import from GitHub. Base directory: `web` (if repo root is the parent folder). `netlify.toml` supplies the build command and Next.js plugin.
3. Set the environment variables above in Site settings → Environment variables.
4. Deploy, verify on the `*.netlify.app` URL, then add the custom domain `uranusenterprises.in` (+ `www`) and let Netlify issue SSL.
5. Run `npx prisma migrate deploy && npx prisma db seed` once against the production `DATABASE_URL` (locally is fine).

## Conversion tracking (GA4 events)

`whatsapp_click` (all wa.me CTAs) · `call_click` (tel: links) · `enquiry_submit` (contact form) · `chatbot_escalation` (chatbot → WhatsApp). All fire automatically via `src/components/analytics.tsx` once `NEXT_PUBLIC_GA_ID` is set.

## Where things live

- Public pages: `src/app/` (home, services, service detail, areas, faq, about, contact)
- Admin CRUD: `src/app/admin/` — protected by `src/proxy.ts` + per-page `requireAdminPage()`
- Data access with static fallback: `src/lib/db.ts` (fallback content: `src/lib/data.ts`)
- Validation schemas: `src/lib/validation.ts` · Rate limiting: `src/lib/rate-limit.ts`
- SEO: `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, JSON-LD in `src/lib/schema.ts`, `public/llms.txt`
- Locality landing pages content: `src/lib/areas.ts` · FAQ content: `src/lib/faq.ts`

See `../PRODUCTION-READINESS-REPORT.md` for the full audit, SEO/GEO/AEO strategy and go-live checklist.
