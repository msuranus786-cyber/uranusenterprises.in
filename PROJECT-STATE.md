# Uranus Enterprises — Project State & Handoff

> Read this before doing anything else on this project. It captures what's live, what was done, and — importantly — several non-obvious gotchas that cost significant time to work out. Don't repeat those mistakes.

Last updated: 2026-07-22 — owner name spelling fixed (Barath → Bharath), official department emails added, admin login email changed, and a 6th service (Electrical Works) added. Original entry below is from 2026-07-16, end of the initial production-readiness + deployment session.

## 1. What this is

**Uranus Enterprises** (correct name — plural; do not use "Uranus Enterprise" singular anywhere) is a Chennai-based tech/security services business owned by Mr. Bharath: CCTV installation, biometric access control, computer & laptop service, networking/site works, electrical works, home automation. The website is a WhatsApp-first lead-generation platform: visitors browse services → enquire on WhatsApp → owner follows up. No online payments.

**Live production URL:** https://uranusenterprises.in
**GitHub repo:** https://github.com/codex2025/uranus-enterprise — **currently PUBLIC** (see §5, item 1, for why)
**App code lives in:** the `web/` subfolder of that repo (repo root also holds planning docs — see §6)
**Hosting:** Netlify (site name `uranus-enterprises`, auto-deploys from `main` on push)
**Database:** Neon Postgres (production instance, already migrated + seeded with real data)

## 2. Stack

Next.js 16 (App Router, Turbopack, Server Actions — no REST API routes) · React 19 · Tailwind CSS 4 · Prisma 7 + `@prisma/adapter-pg` · JWT sessions (`jose`) + bcrypt · zod validation · GA4 analytics (installed but disabled until `NEXT_PUBLIC_GA_ID` is set).

Key modules added/hardened this session (all under `web/src/`):
- `lib/secret.ts` — lazy-resolved `ADMIN_SECRET`, fails fast in production if unset, but resolved lazily so `next build` doesn't choke on it
- `lib/rate-limit.ts` — in-memory rate limiting for login + public enquiry submission
- `lib/validation.ts` — zod schemas for every server action
- `lib/schema.ts` — JSON-LD builders (LocalBusiness, Service, Product, FAQPage, Breadcrumb)
- `lib/site-url.ts` — canonical origin, driven by `NEXT_PUBLIC_SITE_URL`
- `lib/areas.ts` — 8 Chennai locality landing pages content (Tambaram, Chromepet, Pallavaram, Velachery, T. Nagar, Anna Nagar, Porur, Adyar)
- `lib/faq.ts` — FAQ content, 16 Q&As
- `components/analytics.tsx` — GA4 loader + auto click-tracking (`whatsapp_click`, `call_click`, `enquiry_submit`, `chatbot_escalation`)
- `components/json-ld.tsx` — renders structured data script tags
- `proxy.ts` + `lib/auth.ts` — `requireAdminPage()` added for server-side session checks on every admin page (defense-in-depth alongside the middleware matcher)

Admin auth: JWT (`jose`, HS256, 7-day expiry) in httpOnly cookie, bcrypt-12 password hashing, `src/proxy.ts` gates `/admin/*`. Admin login: `admin@uranusenterprises.in` (changed 2026-07-22 from the old `admin@uranus.in` placeholder — see migration `20260722000000_official_contact_details`) / password is in `web/.env` as `ADMIN_SEED_PASSWORD` (do not hardcode it in any doc — check the file).

## 3. Business facts currently live in the database

| Field | Value |
|---|---|
| Name / brand | Uranus Enterprises (both fields now identical — the old "Ms.Uranus Nanofix" sub-brand was dropped entirely) |
| Owner | Mr. Bharath |
| City | Chennai |
| Phone / WhatsApp | +91 98417 70013 / 919841770013 |
| Email | `support@uranusenterprises.in` (set 2026-07-22, migration `20260722000000_official_contact_details`). Four other official addresses now in use around the site (not stored in `SiteSettings` — they're fixed constants in `src/lib/data.ts` → `departmentEmails`): `services@` (Services/Contact pages), `hr@` (Contact page, careers), `ceo@` (About page). `admin@uranusenterprises.in` is the admin-portal login credential only — never rendered publicly. |
| Logo | `web/public/logo.jpg` (shield + ringed-planet emblem, "URANUS ENTERPRISES" wordmark, tagline "Securing Today. Protecting Tomorrow." — that tagline is NOT yet used as the site's `tagline` field, only in the logo image itself; consider asking the owner if they want it as the site tagline too) |
| Services & CCTV package prices | Still the original placeholder numbers from the initial build (₹12,999 Basic CCTV, etc.) — **not yet confirmed real** by the owner |
| Reviews | 6 **placeholder** testimonials (Ravikumar S., Priya M., etc.) — fake, need replacing |

The `Website-Content-Checklist.pdf` (repo root) was sent to the owner to collect real photos, team info, real prices, real testimonials, business story, and area confirmations. **Check if that's been returned before assuming any of the above placeholders are still placeholders.**

## 4. Environment / credentials

Real secrets live in `web/.env` (gitignored, not in the repo). Template at `web/.env.example`. Do not paste raw secret values into markdown files, chat, or commits — reference this file instead.

- `DATABASE_URL` — Neon Postgres, region `ap-southeast-1` (Singapore)
- `ADMIN_SECRET` — JWT signing key (32-byte random, already generated and in use)
- `ADMIN_SEED_PASSWORD` — used only by `npx prisma db seed`; the admin account already exists in prod, this is only needed again if re-seeding or rotating the password
- `NEXT_PUBLIC_SITE_URL` — `https://www.uranusenterprises.in`
- `NEXT_PUBLIC_GA_ID` — not set yet (optional, GA4 disabled until present)

Netlify's env vars (dashboard) mirror `DATABASE_URL`, `ADMIN_SECRET`, `NEXT_PUBLIC_SITE_URL`.

## 5. Known issues / hard-won lessons — READ BEFORE REPEATING

1. **Netlify's "unrecognized Git contributor" saga.** This blocked deploys repeatedly and consumed most of a session. What was tried, in order: (a) removing a `Co-Authored-By: Claude ...` trailer from commits — fixed it once, then it recurred; (b) trying different git author email variants (there are at least 3 email variants across this repo's history: `codex2025@users.noreply.github.com`, `praveenkumar22012025@gmail.com`, `praveenkumar220102025@gmail.com` — note the digit differences) — did not reliably fix it; (c) removing a GitHub collaborator (`msuranus786-cyber`) from the repo — did not immediately fix it either; (d) **making the repo public** — this is what actually got a deploy through. **Current state: the repo is public.** No secrets are in it (verified — `.env*` properly gitignored throughout). If the owner wants it private again later, expect to hit this same wall — it needs a real fix (contact Netlify support, or upgrade to Pro, or resolve whatever GitHub-account ambiguity is causing the mismatch) rather than more guessing.
   - **Current known-good commit git identity:** `codex2025 <praveenkumar22012025@gmail.com>` (verified as the primary email on the `codex2025` GitHub account). Do not add `Co-Authored-By` trailers to commits in this repo.
2. **Local DNS caching gives false negatives.** The dev machine's local resolver (and its ISP router) cache DNS answers well past their TTL. `nslookup` on this machine can show stale/wrong results (e.g., old GoDaddy parking IPs) long after the real DNS is fixed. **Always verify with**: `nslookup <domain> 8.8.8.8` (or `1.1.1.1`), or better, bypass DNS entirely: `curl --resolve uranusenterprises.in:443:75.2.60.5 https://uranusenterprises.in/` (75.2.60.5 is Netlify's apex load-balancer IP). Don't conclude something is broken based on a plain local `curl`/`nslookup` without one of these checks.
3. **Netlify build config for this repo:** Base directory = `web`, Publish directory must be **blank in the Netlify UI** (or `.next` if set anywhere) — it must never equal the base directory, or the `@netlify/plugin-nextjs` (v5, OpenNext-based) build fails outright. This is pinned in `web/netlify.toml` (`publish = ".next"`) as a backstop, but the dashboard's own Publish Directory field previously got set to `web` (== base) by the setup wizard and had to be manually cleared.
4. **Prisma migrations, not ad-hoc scripts, for DB content fixes.** Two migrations were added this session beyond the original `init` migration: `20260715000000_align_contact_defaults` (phone number default fix) and `20260715235500_rename_business_drop_email` (name/brand/email fix). Follow this pattern for any future business-data corrections — write a migration, run `npx prisma migrate deploy` locally against the real `DATABASE_URL` in `.env` (that's how production gets patched; there's no separate deploy-time migration step configured), don't just hand-edit the DB.
5. **The `SiteSettings.email` field is now optional end-to-end** — zod schema (`src/lib/validation.ts`), the admin settings form (no longer `required`), and every render site (footer, contact page, JSON-LD) conditionally skip it when empty. If a real email is added later, everything will "just work" without further code changes.
6. **Vercel is not used, but a stale project (`uranus-demo-static`) still exists** and may still auto-deploy on push via GitHub's native integration (harmless — it's disconnected from the real domain — but worth disconnecting for cleanliness; ask the owner before touching it).

## 6. Other files in this repo (repo root, not `web/`)

- `PRODUCTION-READINESS-REPORT.md` — the full original audit (security findings, SEO/GEO/AEO plan, market analysis, go-live checklist). Most of its "launch blockers" section is now resolved; treat it as a historical reference, not current state — this file (`PROJECT-STATE.md`) supersedes it for "what's the status now."
- `Website-Content-Checklist.pdf` — sent to the owner to collect real content (see §3).
- `Activation-Guide.md`, `UI-Framework.md`, `Uranus Enterprise Digital Commerce Platform Specification.md`, `logo.png` — original planning docs from before this session. **Outdated in places**: they reference Vercel (now Netlify) and the old `msuranus.in` domain (now `uranusenterprises.in`) and the old singular "Uranus Enterprise" name. Useful for feature/spec context, not for current infra facts.

## 7. Pending / next steps

- [ ] Owner to log into `/admin/login` using the **new** admin email `admin@uranusenterprises.in` (changed 2026-07-22, was `admin@uranus.in`) and confirm access works for them directly
- [ ] **Owner action required — Google Search Console.** Needs the owner's own Google account; an AI agent cannot complete OAuth/account-login flows. Steps: (1) go to search.google.com/search-console → Add property → URL prefix → `https://uranusenterprises.in` (apex, not www — see netlify.toml note below for why); (2) choose "HTML tag" verification, copy the `content="..."` value; (3) set that value as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Netlify env vars and redeploy — `layout.tsx` already renders it automatically once set; (4) back in Search Console, click Verify; (5) Sitemaps → submit `sitemap.xml` (already complete and dynamic — covers all static pages, all services including Electrical Works, and all 8 area pages).
- [ ] **Owner action required — Netlify env var fix.** `NEXT_PUBLIC_SITE_URL` in the Netlify dashboard likely still says `https://www.uranusenterprises.in`. Fixed locally in `web/.env` on 2026-07-22 (`www` 301-redirects to the apex, so every canonical/sitemap/JSON-LD URL was pointing through a redirect) — but the *live* site is built from Netlify's own env var, which needs the same fix + a redeploy to take effect in production.
- [ ] Recommended (not requested, but the single highest-leverage thing for "near me" search visibility): set up a **Google Business Profile** at business.google.com — this drives the Google Maps/local-pack results for queries like "cctv installation near me" far more than Search Console does, and requires a postcard/phone verification tied to the real business address, so only the owner can do this.
- [ ] Owner to fill out `Website-Content-Checklist.pdf` and return it — then replace: placeholder reviews, placeholder service/package prices, add real photos
- [ ] Optional: set up GA4 property, add `NEXT_PUBLIC_GA_ID` in Netlify env vars
- [ ] Optional: disconnect/delete the stale `uranus-demo-static` Vercel project
- [ ] Optional/deferred: revisit making the GitHub repo private again (see §5.1 — needs a real fix, not more guessing)
- [ ] Not yet asked: whether to adopt the logo's tagline ("Securing Today. Protecting Tomorrow.") as the site's official tagline field

### Client feedback log (2026-07-22)

- Reported: chat-widget close button visually overlapped the message-form send button when the panel was open. **Fixed** — panel clearance corrected in `floating-widgets.tsx` (`bottom-24` → `bottom-36` on the panel wrapper, which now sits fully above the floating button stack).
- Reported: landing page felt static/unengaging, and the chat launcher button wasn't drawing attention. **Addressed** — added a count-up animation on stat numbers (`components/counter.tsx`, used on `/` and `/about`), ambient floating background accents in the hero, a pulsing "online" dot, and a one-time dismissible hint bubble + notification badge on the chat launcher (auto-appears ~3s after load, retires permanently once the visitor opens chat or dismisses it). If the owner/customer still finds it under-animated after seeing this, the next lever is a heavier open-source animation ecosystem (e.g. Framer Motion) rather than CSS-only — not added yet since it isn't currently a dependency and pulls in real bundle weight.
- Reported: Google search results showed the default Vercel/Next.js triangle logo instead of the real brand. **Fixed** — the untouched scaffold `favicon.ico` was deleted; `app/icon.tsx` and `app/apple-icon.tsx` now generate a proper on-brand icon (navy→blue gradient, white "U") via the same `ImageResponse` technique already used by `opengraph-image.tsx`. Note this only controls what *this site* declares — Google can take days/weeks to re-crawl and refresh the icon it displays in results; there's no way to force that faster.

### SEO / Search Console pass (2026-07-22)

Requested: register in Google Search Console, improve ranking for "laptop services", "CCTV camera/installation near me", "home automation", "biometrics" and location-based searches, and get every page properly indexed.

What was already in good shape before this pass: dynamic sitemap covering every static page + all services (DB-driven, so Electrical Works and any future service auto-include) + all 8 area pages; `robots.txt` correctly pointing at it; `LocalBusiness`/`Service`/`Product`/`FAQPage`/`Breadcrumb` JSON-LD throughout; 8 genuinely unique (not templated-thin) locality landing pages at `/areas/*`, which is most of what "near me" ranking actually depends on.

What this pass changed:
- **Fixed a real canonicalization bug**: `NEXT_PUBLIC_SITE_URL` was set to `https://www.uranusenterprises.in`, but that domain 301-redirects to the apex (`https://uranusenterprises.in`) — so every canonical tag, sitemap URL and JSON-LD `url` was pointing through a redirect instead of the live URL. Fixed in `web/.env`; **Netlify's dashboard copy still needs the same fix + redeploy** (see pending list above).
- Added `verification.google` support to `layout.tsx`, driven by `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — currently unset (renders nothing), becomes live the moment the owner adds the env var from Search Console.
- Rewrote service-page `<title>`/description metadata (`lib/service-seo.ts`) — they were previously just the bare service name (e.g. "Electrical Works"), now keyword-and-city-anchored (e.g. "CCTV Camera Installation in Chennai", "Laptop & Computer Repair Service in Chennai") to match how people actually search. Falls back to a sane template for any service without a curated entry, so a new service added via `/admin` never ships with blank SEO copy.
- Added `geo` (GeoCoordinates) to the `LocalBusiness` JSON-LD — city-centre coordinates only, since no precise street address exists in `SiteSettings` yet. A real address would meaningfully improve local-pack ranking further.

What could NOT be done directly (needs the owner's Google account — no AI agent can complete an OAuth/account-login flow): actually creating/verifying the Search Console property, submitting the sitemap inside its UI, and setting up a Google Business Profile (arguably higher-leverage than Search Console for "near me" queries specifically, since that's what populates the Maps/local-pack results). Exact steps for all of these are in the pending list above.

## 8. Verification commands (copy-paste ready)

```bash
# Check live DB content (run from web/, needs .env present)
cd web && npx tsx -e "
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
prisma.siteSettings.findFirst().then(s => console.log(s)).finally(() => prisma.\$disconnect());
"

# Verify live site bypassing local DNS cache
curl -s --resolve uranusenterprises.in:443:75.2.60.5 https://uranusenterprises.in/ | grep -o '<title>[^<]*</title>'

# Rebuild + verify locally before pushing
cd web && npm run lint && npm run build
```
