# Uranus Enterprise — Production-Readiness Report

**Project:** `web/` — Next.js 16 lead-generation platform for Uranus Enterprise (CCTV, biometrics, computer service, site works, home automation — Chennai)
**Target domain:** `uranusenterprises.in` (the only paid resource; everything else on free tiers)
**Report date:** 15 July 2026
**Analysis basis:** full codebase audit (implementation inventory + security sweep), the three project spec documents, and current market/SEO research.

---

## 1. Executive Summary & Verdict

> ## Verdict: **NOT production-ready yet — but close.**
> **Conditional PASS.** The engineering foundation is genuinely strong: a complete public site, a full admin CRM, a working WhatsApp lead pipeline, and clean, modern code with no critical architectural flaws. What blocks go-live is a short, well-defined list: **3 high-severity security items, the domain swap, a settings-propagation bug, and zero analytics** on a site whose entire purpose is measurable lead generation. Estimated total effort to clear all launch blockers: **~1–2 working days.**

### Scorecard

| Area | Grade | One-line assessment |
|---|---|---|
| Architecture & code quality | **A−** | Modern stack (Next 16 / React 19 / Prisma 7), Server Actions, SSG, static fallback — well built |
| Implementation vs. spec | **B+** | ~85% of spec delivered; Cloudinary images and NextAuth swapped for lighter equivalents |
| Security | **C+** | Good crypto hygiene, but 3 HIGH findings (fallback secret, no rate limiting, weak seeded creds) |
| UX | **B+** | Mobile-first, sticky CTAs, empty states — missing real photos and trust signals |
| Content quality | **B** | Real, professional copy throughout; no photos, no FAQ, no locality content |
| SEO (technical) | **C+** | Metadata/sitemap/robots exist; **no JSON-LD, no OG image, no canonicals**, wrong domain baked in |
| GEO / AEO readiness | **D** | Nothing implemented yet — full plan in §6 |
| Analytics | **F** | Nothing installed; conversions are invisible |
| Free-tier compliance | **⚠** | **Vercel Hobby prohibits commercial sites** — decision required (§11) |

### Launch blockers (must fix before DNS points at production)

| # | Blocker | Effort |
|---|---|---|
| B1 | Remove hardcoded fallback `ADMIN_SECRET`; fail fast if unset | **S** (30 min) |
| B2 | Rotate seeded `admin@uranus.in / admin123`; stop logging credentials | **S** (30 min) |
| B3 | Rate-limit login + public enquiry action | **S–M** (2–4 h) |
| B4 | Replace `msuranus.in` with `uranusenterprises.in` via env var (metadata + sitemap) | **S** (1 h) |
| B5 | Fix WhatsApp number/settings propagation (admin edits currently ignored by CTAs) | **M** (4–6 h) |
| B6 | Install analytics + track `whatsapp_click` / `enquiry_submit` events | **S–M** (2–4 h) |
| B7 | Decide hosting: Vercel Hobby ToS forbids business use (§11) | decision |

---

## 2. Implementation Audit (built vs. spec)

Reference: `Uranus Enterprise Digital Commerce Platform Specification.md`.

### Delivered ✔

| Spec requirement | Status | Where |
|---|---|---|
| Public site (Home/About/Services/Detail/Contact) | ✔ Complete, real copy | `src/app/*` |
| Service detail w/ price, availability, reviews, WhatsApp CTA | ✔ incl. SSG + sticky mobile CTA | `src/app/services/[slug]/page.tsx` |
| WhatsApp commerce (pre-filled message, wa.me deep link) | ✔ Matches spec template exactly | `src/lib/whatsapp.ts` |
| Enquiry storage w/ status workflow (new→contacted→completed→closed) | ✔ | `src/app/actions.ts`, `admin/enquiries/` |
| Admin portal: dashboard, services/packages/reviews/enquiries/settings CRUD | ✔ Full | `src/app/admin/*` |
| Review moderation (approve/reject/delete) | ✔ | `admin/reviews/` |
| Chatbot with WhatsApp escalation | ✔ Keyword-matching bot (no AI — fine, zero cost) | `components/floating-widgets.tsx` |
| Sitemap, robots, per-page metadata, admin noindex | ✔ | `app/sitemap.ts`, `app/robots.ts` |
| PostgreSQL + Prisma, migrations, seed | ✔ Neon-ready, 1 clean migration | `prisma/` |
| Password hashing, protected admin, secure sessions | ✔ bcrypt-12, JWT (jose), httpOnly cookie | `src/lib/auth.ts`, `src/proxy.ts` |
| Vercel-native, no VPS | ✔ | `.vercel/project.json` |

### Deviations from spec (acceptable, documented)

- **NextAuth → custom JWT auth.** Lighter and adequate for a single-admin portal, *provided* the §3 fixes land. Not a rewrite candidate.
- **Cloudinary images → gradient tiles + SVG icons.** No photography anywhere. Works visually, but hurts trust and local SEO (§4, §5). Cloudinary free tier (25 GB) is spec'd and still recommended.
- **Admin SEO fields → auto-generated SEO.** Intentional per `UI-Framework.md` §8 ("The owner never has to think about SEO") — the right call.
- **No REST API routes at all** — everything is Server Actions. Cleaner and smaller attack surface. Fine.

### Not delivered / gaps

| Gap | Impact | Effort |
|---|---|---|
| Analytics (spec §"Rank on Google" implies measurement) | Blind lead funnel | **S–M** |
| JSON-LD structured data (spec §14 explicitly requires schema markup) | Local SEO + AEO loss | **M** (3–5 h) |
| OG image, Twitter cards, canonical URLs (spec §14) | Poor social shares, weaker indexing | **S** (2–3 h) |
| Web manifest / PWA icons | Minor | **S** (1 h) |
| Image upload in admin (spec §6 Cloudinary) | Owner can't add photos | **M–L** (1–2 d, Phase 2) |
| Tests (none), `.env.example` (none), README (still create-next-app boilerplate) | DX/maintenance | **S–M** |

### Housekeeping found

- `.vercel/project.json` points at a project named **`uranus-demo-static`** — relink to a properly named project before go-live.
- Leftover `create-next-app` SVGs in `public/` (file/globe/next/vercel/window.svg) — delete.
- Stray `node_modules` packages (chart.js, radix-ui, remeda) not in `package.json` — harmless, cleaned by a fresh install.

---

## 3. Security Review

Architecture is fundamentally sound: all DB access via Prisma (no SQL injection surface), no `dangerouslySetInnerHTML`/`eval` (no XSS surface found), no file uploads, Server Actions carry framework CSRF protection, secrets properly gitignored, dependencies current.

### Findings

| ID | Sev | Finding | Location | Fix | Effort |
|---|---|---|---|---|---|
| S1 | **HIGH** | Hardcoded fallback JWT secret `"uranus-admin-secret-change-in-production"` — if `ADMIN_SECRET` env is unset (it currently is), anyone reading the public repo/source can **forge admin session tokens** | `src/lib/auth.ts:7` **and** `src/proxy.ts:6` (duplicated — fix both) | Throw at startup when `ADMIN_SECRET` is missing; generate a 32+ char random secret in Vercel env | **S** |
| S2 | **HIGH** | No rate limiting anywhere: `loginAction` allows unlimited password brute-force; public `submitEnquiry` allows enquiry-table spam | `src/app/admin/actions.ts:10`, `src/app/actions.ts:5-25` | In-memory/Upstash-free sliding window (e.g., 5 login attempts / 15 min per IP; 3 enquiries / min) — Upstash Redis free tier: 500K commands/mo | **S–M** |
| S3 | **HIGH** | Seed creates `admin@uranus.in / admin123` and **console.logs the plaintext credentials** | `prisma/seed.ts:13-14,25` | Read admin password from env at seed time; rotate any already-seeded account; delete the log line | **S** |
| S4 | MED | Admin pages rely **solely** on `proxy.ts` matcher — no server-side `getSession()` in the layout; one matcher typo = full admin exposure | `src/app/admin/layout.tsx`, `admin/page.tsx` | Call `getSession()` in the admin layout, redirect if null (defense-in-depth) | **S** |
| S5 | MED | Zero input validation: server actions cast `FormData` raw; public enquiry accepts arbitrary-length strings | all of `admin/actions.ts`, `app/actions.ts` | Add zod schemas per action (lengths, enums for `status`, phone format) | **S–M** (2–3 h) |
| S6 | MED | No security headers: no CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | `next.config.ts` (11 lines, no `headers()`) | Add `headers()` block; at minimum `frame-ancestors 'none'` (admin clickjacking), HSTS, nosniff | **S** (1 h) |
| S7 | LOW | `requireAdmin()` checks session existence, not `role` | `admin/actions.ts:197-200` | Check `session.role === "admin"` | **S** (15 min) |
| S8 | LOW | Silent `catch {}` fallbacks mask real DB outages (site quietly serves stale static data) | `src/lib/data.ts`, `src/lib/db.ts` | Log to console/Vercel logs before falling back | **S** |
| S9 | LOW | `.env.local` holds a `VERCEL_OIDC_TOKEN` (short-lived, untracked — OK) but `DATABASE_URL`/`ADMIN_SECRET` unset locally | `web/.env.local` | Create `.env.example`; set real values locally & in Vercel | **S** |

### What's already good

bcrypt cost 12 · generic login errors (no user enumeration) · httpOnly + sameSite=lax + secure-in-prod cookie · 7-day JWT expiry · every mutating admin action re-checks auth (`requireAdmin()`) · internal-only redirects · WhatsApp deep links URL-encoded · `/admin` noindexed and robots-disallowed.

**Security effort total: ~1 day** for S1–S6 (the ones that matter). S1–S3 are launch blockers.

---

## 4. UX Review

### Strengths
- Mobile-first throughout; **sticky WhatsApp CTA bar on mobile** service pages — the single most important conversion element, correctly placed.
- Floating WhatsApp FAB + chatbot with escalation; enquiry form is short and persists before opening WhatsApp (lead captured even if the user abandons the WhatsApp step — smart).
- Skeletons/empty states/404 handled; keyboard/ARIA basics present; availability badges, price anchoring ("Starting from ₹X").

### Improvements (by impact)

| Improvement | Why | Effort |
|---|---|---|
| **Real photos of installations/team/shopfront** | #1 trust factor for local services; gradient tiles look polished but anonymous. 6–10 genuine photos beat any redesign | **Owner** + **S** to wire in |
| **Click-to-call `tel:` link in the navbar** (not just WhatsApp) | Older customers and B2B facility managers call; currently phone is display-only in the footer | **S** (30 min) |
| Trust strip: "GST registered · X years · N installations · brands we fit (Hikvision/CP Plus/Dahua…)" | Converts skeptics; brand logos are recognized shorthand | **S** (2 h) |
| **Review capture loop**: after an enquiry is marked "completed", send the customer a WhatsApp message with a review link (manual at first) | 5.0★ with volume is the strongest local signal; feeds §6 | **S** process, no code |
| FAQ section/page (also powers AEO, §6) | Answers price/warranty/AMC objections before the chat | **M** |
| Tamil language toggle (Phase 2) | Chennai residential customers; differentiator vs. franchise competitors | **L** (2–3 d) |
| WhatsApp number consistency — see B5 | Admin edits to the number currently don't reach any CTA | **M** |

---

## 5. Content Quality Review

**Copy: genuinely good.** No lorem ipsum, no placeholder pages; every service has tagline, description, features, offerings; About has mission/vision; tone is consistent and professional. This is rare at this stage and worth saying plainly.

**Gaps:**

1. **No photography** (see §4) — the single biggest content gap.
2. **No FAQ content** — needed for AEO (§6) and objection handling. Draft 15–20 Q&As: "CCTV installation cost in Chennai?", "HD vs IP camera?", "How many days does installation take?", "Do you provide AMC?", "Which areas of Chennai do you serve?"
3. **No locality signals** — content says "Chennai" generically; no area-served list, no locality pages (§6.3).
4. **Data inconsistency (bug):** DB schema defaults carry a dummy phone (`+91 98765 43210` in `prisma/schema.prisma` / migration) while seed + static data carry `+91 98417 70013`. If a `SiteSettings` row is ever created from defaults rather than seed, **the site shows a wrong number**. Align schema defaults with the real number. (**S**, 30 min + micro-migration)
5. README is create-next-app boilerplate — replace with setup/deploy runbook (the excellent `Activation-Guide.md` content belongs there). (**S**)
6. Email on site is `support@shan.enterprises` — confirm this is the intended public contact for the Uranus Enterprise brand.

---

## 6. SEO · Local SEO (Chennai) · GEO · AEO

### 6.1 Technical SEO — fix first (mostly S efforts)

| Item | Current state | Action |
|---|---|---|
| **Domain** | `https://www.msuranus.in` hardcoded in `src/app/layout.tsx` (metadataBase) and `src/app/sitemap.ts:4` | Single `NEXT_PUBLIC_SITE_URL=https://www.uranusenterprises.in` env var used everywhere. Keep msuranus.in and 301-redirect it to the new domain (preserves any existing equity) |
| Canonical URLs | Absent | `alternates: { canonical: ... }` per page |
| JSON-LD | **Absent — biggest SEO gap** | See 6.2 |
| OG image / Twitter cards | Absent | One branded 1200×630 `opengraph-image` (static file is fine, zero deps) |
| Manifest + icons | Absent | `app/manifest.ts` + 192/512 icons |
| Sitemap/robots | ✔ Present | Just re-point domain |
| Core Web Vitals | Likely strong (SSG, no heavy JS, gradient visuals) | Verify with free PageSpeed Insights after deploy |

### 6.2 Structured data plan (the highest-leverage SEO work — **M**, 3–5 h)

Emit JSON-LD from server components (site-wide `LocalBusiness`, per-page additions):

- **`LocalBusiness`** (root layout): name, `areaServed: Chennai + localities`, address, geo, phone, openingHours, `sameAs` (GBP, Justdial, IndiaMART profiles).
- **`Service`** (each service detail page): serviceType, provider, areaServed, offers w/ `priceCurrency: INR`, `price` (starting).
- **`Product` + `Offer`** for CCTV packages (price, availability).
- **`AggregateRating` / `Review`** from approved DB reviews (real data only — never synthetic).
- **`FAQPage`** on the FAQ page (see 6.4).
- **`BreadcrumbList`** on service detail pages.

### 6.3 Local SEO — Chennai + localities (the growth engine)

**Keyword map** (each service page targets its head term; locality pages target combos):

| Service | Head terms |
|---|---|
| CCTV | "CCTV installation Chennai", "CCTV camera dealers near me", "CCTV service [locality]" |
| Biometric | "biometric attendance system Chennai", "smart door lock installation Chennai" |
| Computer | "laptop repair [locality]", "computer service center Chennai" |
| Site works | "networking cabling Chennai", "UPS installation Chennai" |
| Home automation | "smart home automation Chennai", "gate automation Chennai" |

**Locality landing pages** (**M–L**: 1–2 days for the template + 6–8 pages): `/areas/[locality]` for the business's actual service radius — e.g., Tambaram, Chromepet, Pallavaram, Perungalathur, Mudichur, Velachery, T. Nagar, Porur, OMR/Sholinganallur. Each page: unique intro (never copy-paste), services offered there, distance/response-time promise, local reviews if any, embedded map, FAQ snippet, WhatsApp CTA. Thin duplicated locality pages get filtered by Google — 6–8 genuinely distinct pages beat 30 clones.

**Google Business Profile (free — the #1 local channel):** create/claim GBP for Uranus Enterprise, exact NAP match with the website, link to `uranusenterprises.in`, all 5 service categories, photos, weekly posts, and **funnel every completed job to a GBP review** (§4). The map pack drives more local service calls than organic blue links.

**Citations (free tiers):** Justdial, Sulekha, IndiaMART — identical NAP everywhere. Inconsistent NAP is the classic local-ranking killer (and why bug B5/§5.4 matters beyond UX).

### 6.4 AEO — Answer Engine Optimization

Goal: be the extracted answer in Google AI Overviews/featured snippets and Bing Copilot.

1. **FAQ page with `FAQPage` schema** — question-phrased H2/H3s with a direct 40–60-word answer immediately below, then detail. This single page is the AEO workhorse. (**M**)
2. Question-style H2s inside service pages ("How much does CCTV installation cost in Chennai?") with concise first-paragraph answers and concrete numbers (₹ ranges, camera counts, warranty months) — answer engines prefer extractable, specific facts.
3. **Bing Webmaster Tools** (free) — Bing powers Copilot/ChatGPT browsing citations; most local competitors ignore it entirely. Cheap win.

### 6.5 GEO — Generative Engine Optimization

Goal: when someone asks ChatGPT/Claude/Perplexity "best CCTV installer in Chennai", the model can find, trust, and cite Uranus Enterprise.

1. **Consistent, citable facts everywhere:** same NAP, founding year, install counts, warranty terms on site + GBP + directories — LLMs cross-reference; consistency = confidence.
2. **Evidentiary content style:** specific numbers, named brands fitted, attributable owner quotes ("Mr. Bharath, founder") — models favor content that looks like evidence over marketing fluff.
3. **`llms.txt`** (15 min, free): plain-text business summary — services, areas served, NAP, hours, GBP link. Google ignores it, but Perplexity and some assistants read it; zero cost, small upside.
4. Real customer reviews on third-party surfaces (GBP, Justdial) — models weight third-party corroboration far above self-description.

---

## 7. Organic Traffic Strategy (all free)

**Phase A — Foundation (launch week):** Search Console + Bing Webmaster verification & sitemap submission · GBP live and linked · GA4 events flowing · JSON-LD live.

**Phase B — Local dominance (weeks 2–8):** 6–8 locality pages · FAQ page · directory citations · GBP weekly posts (finished installs with photos = best content) · review flywheel from completed enquiries (target: 25–30 GBP reviews in 90 days).

**Phase C — Content authority (months 2–6, ~2 posts/month, owner+assistant effort):** intent-matching posts — "CCTV camera price list Chennai 2026", "AMC vs on-call repair", "IP vs analog for homes", "Biometric attendance for small offices" — each internally linked to its service page with WhatsApp CTA.

**Ongoing free channels:** WhatsApp Business profile + catalog (mirrors packages; the audience already lives in WhatsApp) · Instagram/Facebook business pages posting install photos (social proof + brand queries) · YouTube Shorts of installations (searchable, embeddable in service pages).

**KPIs:** map-pack top-3 for "CCTV installation [locality]" in 90 days · 500 organic sessions/mo by month 3 · WhatsApp click-through rate ≥8% of sessions · 25+ GBP reviews.

---

## 8. Analytics Stack (free)

Currently **nothing is installed** — every rupee of marketing effort is unmeasurable. Minimum viable stack:

| Tool | Purpose | Cost | Effort |
|---|---|---|---|
| **GA4** | Traffic + conversion events | Free | **S** |
| **Google Search Console** | Query/impression data, indexing health | Free | **S** (30 min) |
| **Bing Webmaster** | Bing/Copilot visibility | Free | **S** (15 min) |
| **Vercel Analytics** (if staying on Vercel Pro) or **Cloudflare Web Analytics** (free, cookieless) | Web vitals + lightweight pageviews | Free tier | **S** |
| **UptimeRobot** | Downtime alerts (50 monitors free) | Free | **S** (10 min) |

**Events that matter** (wire into GA4 via a tiny client helper — **S–M**, 2–4 h):
`whatsapp_click` (with service/package label — fire on every wa.me link) · `enquiry_submit` · `call_click` · `chatbot_escalation`. These four events ARE the business funnel; everything else is vanity.

Also: the `Enquiry` table itself is first-party analytics — add a simple per-month count + status breakdown to the admin dashboard (**S**, 2 h) so Mr. Bharath sees lead volume/conversion without opening GA4.

---

## 9. Market Trend Analysis

- **India CCTV market:** ~USD 4.8 B (2025) → ~USD 14 B by 2031 at ~20% CAGR; **South India is the fastest-growing region (~20.4% CAGR)**, with Tamil Nadu industrial corridors standardizing AI-ready surveillance via **local integrators** — exactly Uranus Enterprise's role.
- **Residential/smart-home installs ~20% CAGR** as camera prices fall — aligns with the home-automation service line; bundle "CCTV + smart lock + automation" packages.
- **Recurring revenue trend:** surveillance-as-a-service and AMC models are the fastest-growing segments — see §10.
- **Demand drivers in Chennai:** apartment-complex mandates, shop/godown insurance requirements, STQC-certified "Made in India" camera preference (stock CP Plus/consider STQC messaging), school/office biometric attendance normalization.
- **Search behavior:** local service discovery is shifting into AI assistants and map packs — which is precisely what §6's GBP + AEO/GEO work targets.

---

## 10. Business Optimization & Product Suggestions

| # | Suggestion | Rationale | Effort |
|---|---|---|---|
| 1 | **AMC (Annual Maintenance Contract) as a first-class "service"** — Basic/Standard/Premium AMC packages with prices | Converts one-time installs into recurring revenue; market is trending exactly this way (§9); zero new tech — reuses existing Package model | **S** (content only) |
| 2 | **"Free site survey" as the primary CTA** for CCTV/site-works | Lower commitment than "enquire"; survey visit → quote → close is the natural funnel for this trade | **S** |
| 3 | **Package comparison table** on the CCTV service page (2/4/8-camera side-by-side) | Standard purchase pattern; reduces WhatsApp back-and-forth | **S–M** |
| 4 | **Bundles:** "Shop Security Starter" (CCTV+UPS), "Smart Home Entry" (lock+camera+automation) | Higher ticket size; differentiates vs. single-service competitors | **S** (content) |
| 5 | **Seasonal/urgency offers** managed via a simple banner (Diwali, school-reopening for biometric, monsoon UPS checks) | Local services are seasonal; the admin Settings model can carry a banner field | **M** |
| 6 | **WhatsApp Business (free app)** now; Cloud API auto-replies later | Instant replies to the exact lead channel the site generates; response speed is the #1 conversion factor for local leads | **S** (owner) |
| 7 | Post-completion **review + referral ask** ("₹500 off next AMC for referrals") | Cheapest acquisition channel; feeds GBP reviews (§6.3) | **S** (process) |
| 8 | Phase 2: **admin image upload via Cloudinary free tier** (25 GB) | Owner independence on photos — the spec's original intent | **M–L** |
| 9 | Phase 2: **booking a time-slot for site survey** (simple form + admin calendar view) | Converts after-hours browsers; most competitors can't do this | **L** |

---

## 11. Hosting Decision (free-tier compliance) ⚠

The constraint is "everything free except the domain." **Vercel's Hobby (free) plan explicitly prohibits commercial use** — a business lead-gen site qualifies as commercial, and Vercel does enforce this. Options:

| Option | Cost | Trade-off |
|---|---|---|
| **A. Netlify Free** | ₹0 | Commercial use allowed on the free tier; supports Next.js runtime. Best "truly free" fit. Verify Next 16 canary compatibility before committing (the app uses bleeding-edge Next — test a deploy first) |
| **B. Cloudflare Pages/Workers Free** | ₹0 | Commercial use allowed; excellent free CDN + free Web Analytics; Next.js requires the OpenNext adapter — extra setup effort (**M**) and same Next-16 caveat |
| **C. Vercel Pro** | ~₹1,700/mo ($20) | Zero migration effort, best Next.js support — but breaks the free-only constraint |
| **D. Stay on Vercel Hobby** | ₹0 | **Not recommended** — ToS violation; account can be warned/suspended, taking the business site down without notice |

**Recommendation: A (Netlify free)** if the deploy test passes; C if the business can absorb ₹1,700/mo for operational simplicity. Neon (DB) remains free either way. **This is an owner decision — flagged as blocker B7.**

---

## 12. Go-Live Checklist (ordered)

1. ☐ Fix S1 (fail-fast secret) + set strong `ADMIN_SECRET` in hosting env — **S**
2. ☐ Fix S3 (env-driven seed password), rotate admin credentials — **S**
3. ☐ Add rate limiting (S2) — **S–M**
4. ☐ Add zod validation (S5) + security headers (S6) + admin layout session check (S4) — **S–M**
5. ☐ `NEXT_PUBLIC_SITE_URL` env; swap `msuranus.in` refs in `layout.tsx` + `sitemap.ts`; add canonicals — **S**
6. ☐ Fix settings propagation (B5): CTAs/WhatsApp number read from DB (server-render the number into client components as props) — **M**
7. ☐ Align schema-default phone with real number (§5.4) — **S**
8. ☐ Purchase `uranusenterprises.in` (~₹500–800/yr); decide hosting (B7); provision Neon prod DB; run migration + seed — **S**
9. ☐ JSON-LD (6.2) + OG image + manifest — **M**
10. ☐ GA4 + Search Console + Bing + UptimeRobot; wire 4 conversion events — **S–M**
11. ☐ DNS cutover; 301 msuranus.in → uranusenterprises.in; verify HTTPS — **S**
12. ☐ GBP created/linked; NAP citations started — **owner + S**
13. ☐ Real photos on Home + service pages — **owner + S**
14. ☐ FAQ page with schema — **M**
15. ☐ Locality pages ×6–8 — **M–L** (can follow launch)
16. ☐ Lighthouse pass ≥90/95/90 (spec §15) via PageSpeed Insights — **S** (verify)

**Effort legend:** S = ≤2 h · M = half–full day · L = 2+ days. Items 1–11 ≈ **1–2 working days** of dev effort; 12–16 are launch-week follow-ons.

---

## 13. Final Verdict

**The build quality is well above typical small-business websites** — a real admin CRM, a persisted lead funnel, SSG performance, and clean security fundamentals (bcrypt, JWT, Prisma, no injection surfaces). The spec has been ~85% delivered with sensible substitutions.

**It must not go live today** because: (1) the admin panel is forgeable/brute-forceable in its current env-unset state, (2) the wrong domain is baked into its SEO surface, (3) admin settings changes silently don't reach the WhatsApp CTAs — the single conversion path, and (4) with zero analytics the business would be flying blind from day one.

**Clear the 7 blockers (§1) — roughly 1–2 days of focused work plus one hosting decision — and this is a production-grade, competitively differentiated local-business platform.** The bigger prize afterward is not code: it's GBP + reviews + locality/FAQ content (§6–7), which is what will actually put Uranus Enterprise in front of Chennai customers, on both Google's map pack and AI answer engines.

---

### Sources

- [Mordor Intelligence — India CCTV Market](https://www.mordorintelligence.com/industry-reports/india-cctv-market) · [Grand View Research — India Video Surveillance](https://www.grandviewresearch.com/horizon/outlook/video-surveillance-market/india) · [IMARC — India Video Surveillance Systems](https://www.imarcgroup.com/india-video-surveillance-systems-market)
- [Google Search Central — Optimizing for AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Surmado — AEO/GEO Guide 2026](https://www.surmado.com/blog/answer-engine-optimization-aeo-geo-guide) · [Jasper — GEO vs AEO vs SEO](https://www.jasper.ai/blog/geo-aeo) · [WolfPack — llms.txt in 2026](https://wolfpackadvising.com/blog/llms-txt-file/) · [SeekLab — llms.txt honest guide](https://seeklab.io/blog/what-is-llmstxt-the-honest-2026-guide/)
- [Vercel — Hobby plan docs](https://vercel.com/docs/plans/hobby) · [Vercel — Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) · [Vercel Community — Fair use of Hobby plan](https://community.vercel.com/t/fair-use-of-the-hobby-plan/2725)
