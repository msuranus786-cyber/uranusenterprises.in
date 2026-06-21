# Uranus Enterprise — UI Framework Specification

## Technology Foundation

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router, latest) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | Shadcn UI |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Images | Cloudinary + next/image |
| Animations | Tailwind transitions + CSS keyframes |

---

## 1. Design System

### 1.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-primary` | `#1e40af` (Blue 800) | Buttons, links, CTA |
| `--brand-secondary` | `#0f172a` (Slate 900) | Headers, nav, footer |
| `--brand-accent` | `#f59e0b` (Amber 500) | Badges, highlights, ratings |
| `--surface` | `#ffffff` | Card backgrounds |
| `--surface-muted` | `#f8fafc` (Slate 50) | Page backgrounds |
| `--border` | `#e2e8f0` (Slate 200) | Card borders, dividers |
| `--text-primary` | `#0f172a` (Slate 900) | Headings |
| `--text-secondary` | `#475569` (Slate 600) | Body text |
| `--text-muted` | `#94a3b8` (Slate 400) | Captions, labels |
| `--success` | `#16a34a` (Green 600) | In stock, available |
| `--danger` | `#dc2626` (Red 600) | Out of stock, errors |
| `--whatsapp` | `#25D366` | WhatsApp CTA buttons |

### 1.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Hero) | Inter / system sans | `text-4xl md:text-5xl lg:text-6xl` | `font-bold` |
| H2 (Section) | Inter / system sans | `text-3xl md:text-4xl` | `font-bold` |
| H3 (Card title) | Inter / system sans | `text-xl md:text-2xl` | `font-semibold` |
| Body | Inter / system sans | `text-base` | `font-normal` |
| Small / Caption | Inter / system sans | `text-sm` | `font-medium` |
| Price | Inter / system sans | `text-2xl md:text-3xl` | `font-bold` |

### 1.3 Spacing Scale

Use Tailwind's default 4px grid. Key spacing tokens:

| Context | Value |
|---------|-------|
| Section padding | `py-16 md:py-24` |
| Card padding | `p-6` |
| Component gap | `gap-4 md:gap-6` |
| Grid gap | `gap-6 md:gap-8` |
| Max content width | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

### 1.4 Border Radius

| Element | Value |
|---------|-------|
| Buttons | `rounded-lg` |
| Cards | `rounded-xl` |
| Inputs | `rounded-md` |
| Badges | `rounded-full` |
| Images | `rounded-lg` |
| Avatars | `rounded-full` |

### 1.5 Shadows

| Element | Value |
|---------|-------|
| Cards (rest) | `shadow-sm` |
| Cards (hover) | `shadow-md` |
| Dropdowns | `shadow-lg` |
| Modals | `shadow-xl` |

---

## 2. Layout System

### 2.1 Responsive Breakpoints

Follow Tailwind defaults:

| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | < 640px | Mobile |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

### 2.2 Grid System

```
Services page:    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Products page:    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
Packages page:    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
Admin dashboard:  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
Admin tables:     full-width responsive table with horizontal scroll on mobile
```

### 2.3 Page Shell

```
┌──────────────────────────────────────────┐
│  Navbar (sticky, blur backdrop)          │
├──────────────────────────────────────────┤
│                                          │
│  Page Content                            │
│  (max-w-7xl mx-auto)                     │
│                                          │
├──────────────────────────────────────────┤
│  Footer                                  │
├──────────────────────────────────────────┤
│  WhatsApp FAB (fixed bottom-right)       │
│  Chatbot Widget (fixed bottom-right)     │
└──────────────────────────────────────────┘
```

### 2.4 Admin Layout

```
┌────────────┬─────────────────────────────┐
│            │  Admin Header (breadcrumb)   │
│  Sidebar   ├─────────────────────────────┤
│  (fixed)   │                             │
│            │  Admin Content Area          │
│  - Dashboard│  (scrollable)              │
│  - Services│                             │
│  - Products│                             │
│  - Packages│                             │
│  - Enquiries│                            │
│  - Reviews │                             │
│  - Settings│                             │
│            │                             │
└────────────┴─────────────────────────────┘
Mobile: sidebar collapses to hamburger sheet
```

---

## 3. Component Library

### 3.1 Navigation — Navbar

```
┌─────────────────────────────────────────────────────┐
│  [Logo]   Services  Products  About  Contact  [CTA] │
└─────────────────────────────────────────────────────┘
```

- Sticky `top-0`, `backdrop-blur-md bg-white/80`
- Logo: `h-10` from Cloudinary
- Nav links: `text-sm font-medium text-slate-600 hover:text-brand-primary`
- CTA button: "Get Quote" → WhatsApp redirect
- Mobile: hamburger → slide-in sheet (Shadcn Sheet)
- Active link: `text-brand-primary border-b-2 border-brand-primary`

### 3.2 Hero Section

```
┌─────────────────────────────────────────────┐
│                                             │
│  [Badge: "Chennai's Trusted Tech Partner"]  │
│                                             │
│  Complete Technology Solutions              │
│  for Your Business & Home                   │
│                                             │
│  [Get Free Quote]  [Explore Services]       │
│                                             │
│  ★★★★★ 100+ Happy Customers                │
│                                             │
└─────────────────────────────────────────────┘
```

- Full-width, min-height `min-h-[80vh]`
- Background: gradient overlay on hero image from Cloudinary
- Primary CTA: WhatsApp green button `bg-[#25D366] hover:bg-[#1da851] text-white`
- Secondary CTA: outline button `border-brand-primary text-brand-primary`
- Social proof badge below CTAs

### 3.3 Service Card

```
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │   Service Image     │  │
│  │   (aspect-video)    │  │
│  └────────────────────┘  │
│  [Category Badge]        │
│  Service Title           │
│  Short description...    │
│                          │
│  Starting from ₹X,XXX   │
│  ● Available             │
│                          │
│  [View Details →]        │
└──────────────────────────┘
```

- Container: `bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200`
- Image: `aspect-video object-cover rounded-t-xl` via next/image with Cloudinary loader
- Category badge: `text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full`
- Price: `text-lg font-bold text-brand-primary`
- Availability dot: green circle `bg-green-500` for available, red for unavailable
- Hover: lift effect `hover:-translate-y-1 transition-transform`

### 3.4 Package Card (CCTV Packages)

```
┌──────────────────────────┐
│  [Popular] ribbon         │
│                          │
│  Basic CCTV Package      │
│  ────────────────────    │
│  ✓ 2 Cameras             │
│  ✓ 4-Channel DVR         │
│  ✓ 500GB Storage         │
│  ✓ Free Installation     │
│  ✓ 1 Year Warranty       │
│                          │
│  ₹12,999                 │
│  ────────────────────    │
│  [Enquire on WhatsApp]   │
└──────────────────────────┘
```

- Highlight "popular" package with `ring-2 ring-brand-primary scale-105`
- Feature list: checkmarks using Lucide `Check` icon in green
- WhatsApp button: full-width, green CTA
- Price: large, bold, with optional strikethrough for discounts

### 3.5 Product Card

```
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │  Product Image      │  │
│  │  (aspect-square)    │  │
│  └────────────────────┘  │
│  Product Name            │
│  Short description       │
│                          │
│  ₹X,XXX  ₹X,XXX (MRP)  │
│  [In Stock: 5 units]     │
│                          │
│  [Enquire Now]           │
└──────────────────────────┘
```

- Image: `aspect-square object-cover`
- Discount: strikethrough on MRP, discount percentage in red badge
- Stock: show count if < 10, else "In Stock"

### 3.6 Review Card

```
┌──────────────────────────┐
│  ★★★★★                   │
│  "Excellent service..."  │
│                          │
│  — Ravi K.               │
│    Chennai               │
└──────────────────────────┘
```

- Stars: filled amber `text-amber-500`, empty `text-slate-300`
- Quote: `text-slate-600 italic`
- Name: `font-semibold text-sm`
- Layout on homepage: horizontal scroll carousel or grid

### 3.7 WhatsApp Enquiry Button (Global FAB)

```
┌───────────────┐
│  💬 WhatsApp  │
└───────────────┘
```

- Position: `fixed bottom-6 right-6 z-50`
- Style: `bg-[#25D366] text-white rounded-full p-4 shadow-lg`
- Hover: `hover:scale-110 transition-transform`
- Pulse animation on load: `animate-bounce` for first 3 seconds
- Click: opens WhatsApp with pre-filled message template

### 3.8 Chatbot Widget

```
┌─────────────────────────────┐
│  Uranus Enterprise Bot  [×] │
├─────────────────────────────┤
│                             │
│  [Bot] Hi! How can I help?  │
│                             │
│        [User message]       │
│                             │
│  [Bot] We offer CCTV,       │
│  biometric, and more...     │
│                             │
├─────────────────────────────┤
│  [Type a message...]  [→]   │
└─────────────────────────────┘
```

- Position: `fixed bottom-20 right-6` (above WhatsApp FAB)
- Container: `w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl bg-white`
- Header: `bg-brand-secondary text-white rounded-t-2xl p-4`
- Messages: scrollable area with bot/user bubbles
- Bot bubbles: `bg-slate-100 rounded-lg rounded-bl-none`
- User bubbles: `bg-brand-primary text-white rounded-lg rounded-br-none`
- Escalation: "Connect to WhatsApp" button when bot can't answer
- Toggle: floating chat icon button, same position when closed

### 3.9 Contact / Enquiry Form

```
┌──────────────────────────────┐
│  Get a Free Quote            │
│                              │
│  Name       [___________]    │
│  Phone      [___________]    │
│  Email      [___________]    │
│  Location   [___________]    │
│  Service    [▼ Select...]    │
│  Message    [___________]    │
│             [___________]    │
│                              │
│  [Send Enquiry via WhatsApp] │
└──────────────────────────────┘
```

- Use Shadcn Input, Select, Textarea components
- Validation: Zod schema, inline error messages in red
- Submit: generates WhatsApp deep link with pre-filled message
- Also stores enquiry to database via server action

### 3.10 Admin Dashboard Stat Cards

```
┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ 📦 12         │  │ 🛒 24         │  │ 📩 8          │  │ ⭐ 45         │
│ Services      │  │ Products      │  │ Pending       │  │ Reviews       │
│ +2 this week  │  │ 3 low stock   │  │ Enquiries     │  │ 4.8 avg       │
└───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘
```

- Use Shadcn Card
- Icon + large number + label + subtitle
- Subtle left border accent color per card

### 3.11 Admin Data Tables

- Use Shadcn DataTable (TanStack Table)
- Features: search, sort, filter, pagination
- Row actions: Edit, Delete, Toggle availability
- Bulk actions toolbar when rows selected
- Responsive: horizontal scroll on mobile with sticky first column

---

## 4. Page Layouts

### 4.1 Home Page

| Order | Section | Layout |
|-------|---------|--------|
| 1 | Hero | Full-width, gradient overlay, dual CTA |
| 2 | Trusted By / Stats | 4-column stats bar (customers, services, experience, projects) |
| 3 | Services Overview | 3-column grid of service cards |
| 4 | Featured Packages | 3-column grid with highlighted "Popular" |
| 5 | Why Choose Us | 2-column: content + image, feature list with icons |
| 6 | Customer Reviews | Horizontal carousel, auto-scroll |
| 7 | Contact CTA | Full-width colored section with enquiry form |

### 4.2 Services Page

| Element | Detail |
|---------|--------|
| Header | Page title + breadcrumb |
| Filter bar | Category filter tabs (CCTV, Biometric, Computer, Site Work, Home Automation) |
| Grid | 3-column responsive grid of service cards |
| Empty state | "No services in this category" with illustration |

### 4.3 Service Detail Page

| Order | Section |
|-------|---------|
| 1 | Breadcrumb |
| 2 | Image gallery (main + thumbnails) |
| 3 | Title, category badge, price, availability |
| 4 | Description (rich text) |
| 5 | Features list |
| 6 | Related packages (if CCTV) |
| 7 | Customer reviews for this service |
| 8 | WhatsApp CTA bar (sticky on mobile) |

### 4.4 About Page

| Order | Section |
|-------|---------|
| 1 | Company hero with mission statement |
| 2 | About content: experience, expertise |
| 3 | Mission & Vision cards side by side |
| 4 | Stats: years, projects, customers |
| 5 | Contact CTA |

### 4.5 Admin Pages

Each admin CRUD page follows this pattern:

```
┌────────────────────────────────────────┐
│  Page Title          [+ Add New]       │
├────────────────────────────────────────┤
│  [Search...]  [Filter ▼]  [Export]     │
├────────────────────────────────────────┤
│  DataTable with columns:              │
│  Name | Category | Price | Stock | ... │
│  Actions: Edit | Delete | Toggle       │
├────────────────────────────────────────┤
│  Pagination                            │
└────────────────────────────────────────┘
```

Add/Edit forms open in Shadcn Dialog (modal) or dedicated page for complex forms with image uploads.

---

## 5. Performance Patterns

Based on Vercel React Best Practices:

| Pattern | Implementation |
|---------|---------------|
| **Server Components by default** | All pages and layouts are RSC; only interactive widgets use `"use client"` |
| **Parallel data fetching** | Use `Promise.all()` for independent DB queries on dashboard/listing pages |
| **Suspense boundaries** | Wrap data-heavy sections (reviews, products) in `<Suspense>` with skeleton fallbacks |
| **Dynamic imports** | Chatbot widget, image gallery, admin charts loaded via `next/dynamic` |
| **Image optimization** | All images through Cloudinary with `next/image` loader, responsive sizes, lazy loading |
| **Bundle splitting** | Direct imports (no barrel files), admin routes code-split from public routes |
| **Defer third-party** | Analytics, chatbot script loaded after hydration via `next/script strategy="lazyOnload"` |
| **Preload on hover** | Service/product links preload on hover via `<Link prefetch>` |
| **Minimize client serialization** | Pass only necessary props from server to client components |
| **React.cache()** | Deduplicate DB calls within a single request |

---

## 6. Interaction Patterns

### 6.1 Loading States

| Context | Pattern |
|---------|---------|
| Page navigation | Top progress bar (NProgress or Next.js loading.tsx) |
| Data tables | Skeleton rows matching table structure |
| Cards | Skeleton with shimmer animation |
| Forms | Button disabled + spinner during submission |
| Images | Blur placeholder from Cloudinary |

### 6.2 Empty States

Each listing shows a centered illustration with a message and CTA when no data exists.

### 6.3 Error States

- Form validation: inline red text below field
- API errors: Shadcn Toast notification (top-right)
- 404: Custom page with search suggestion and home link
- 500: Friendly error page with retry button

### 6.4 Toast Notifications

Use Shadcn Sonner for:
- "Service created successfully"
- "Review approved"
- "Enquiry status updated"

### 6.5 Confirmation Dialogs

Use Shadcn AlertDialog for destructive actions:
- Delete service/product/package
- Reject review

---

## 7. Mobile-First Responsive Behavior

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Navbar | Hamburger → Sheet | Horizontal links |
| Hero | Stacked, smaller text | Side-by-side, large text |
| Service grid | 1 column | 3 columns |
| Package cards | 1 column, scroll | 3 columns |
| Admin sidebar | Hidden, hamburger toggle | Fixed sidebar |
| Data tables | Horizontal scroll | Full table |
| WhatsApp CTA | Sticky bottom bar | Fixed FAB |
| Chatbot | Full-screen overlay | Floating panel |
| Image gallery | Swipeable | Thumbnail grid |

---

## 8. SEO & Accessibility

### SEO

- Dynamic `<title>` and `<meta>` via Next.js `generateMetadata`
- Open Graph and Twitter Card meta tags per page
- JSON-LD structured data for services (LocalBusiness, Product, Service schemas)
- Sitemap via `app/sitemap.ts`
- Robots via `app/robots.ts`
- Canonical URLs on all pages
- SEO is handled automatically by the system (developer-configured). The admin/owner does **not** manage SEO — titles, descriptions, and structured data are generated from the service/product content the owner already enters (name, description, category, price). No SEO fields appear in the admin portal.

### Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- ARIA labels on interactive elements
- Keyboard navigation for all interactive components
- Focus rings: `focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`
- Color contrast: minimum WCAG AA (4.5:1 for text)
- Alt text required for all images (enforced in admin form)
- Skip-to-content link

---

## 9. WhatsApp Integration UI

### Pre-filled Message Template

```
Hello Uranus Enterprise,

I am interested in:
Service: {service_name}
Package: {package_name}

Customer Name: {name}
Phone: {phone}
Location: {location}

Requirement: {message}
```

### Deep Link Format

```
https://wa.me/{WHATSAPP_NUMBER}?text={encoded_message}
```

### CTA Variations

| Context | Button Text | Style |
|---------|-------------|-------|
| Service detail | "Enquire on WhatsApp" | Full green, large |
| Package card | "Get This Package" | Full green, medium |
| Product card | "Enquire Now" | Outline green, small |
| Global FAB | WhatsApp icon | Circular green, floating |
| Chatbot escalation | "Talk to Us on WhatsApp" | Inline green link |

---

## 10. Admin Form Patterns

### Image Upload

- Drag-and-drop zone with preview
- Upload to Cloudinary via server action
- Show thumbnail grid of uploaded images
- Reorder via drag
- Delete with confirmation

### Rich Text Fields

- Description fields: Shadcn Textarea with markdown support or simple WYSIWYG
- Keep lightweight — no heavy editor libraries

### Form Validation

All forms validated with Zod schemas matching Prisma models:

```
Service form:   title (required), slug (auto-generated), description, category (enum),
                price (positive number), images (min 1), availability (boolean), stock (non-negative)

Product form:   name (required), description, price, discount (optional), stock, availability, images

Package form:   name (required), features (array), price, installation, warranty

Review form:    name, rating (1-5), comment (min 10 chars)

Enquiry update: status (enum: New | Contacted | Completed | Closed)
```

> Note: There is **no SEO form** in the admin portal. SEO metadata is generated automatically from the content the owner already enters. The owner never has to think about SEO.

---

## 11. File Structure for UI

```
components/
├── layout/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── admin-sidebar.tsx
│   └── admin-layout.tsx
├── sections/
│   ├── hero.tsx
│   ├── services-overview.tsx
│   ├── featured-packages.tsx
│   ├── reviews-carousel.tsx
│   ├── stats-bar.tsx
│   └── contact-cta.tsx
├── cards/
│   ├── service-card.tsx
│   ├── product-card.tsx
│   ├── package-card.tsx
│   ├── review-card.tsx
│   └── stat-card.tsx
├── forms/
│   ├── enquiry-form.tsx
│   ├── review-form.tsx
│   ├── service-form.tsx
│   ├── product-form.tsx
│   └── package-form.tsx
├── chatbot/
│   ├── chatbot-widget.tsx
│   ├── chat-bubble.tsx
│   └── chatbot-trigger.tsx
├── whatsapp/
│   ├── whatsapp-fab.tsx
│   ├── whatsapp-cta.tsx
│   └── whatsapp-link.tsx
├── admin/
│   ├── dashboard-stats.tsx
│   ├── data-table.tsx
│   └── image-upload.tsx
└── ui/
    └── (shadcn components installed here)
```

---

## 12. Lighthouse Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| Performance | 90+ | SSR, image optimization, code splitting, lazy loading |
| SEO | 95+ | Metadata, structured data, sitemap, semantic HTML |
| Accessibility | 90+ | ARIA, contrast, keyboard nav, alt text |
| Best Practices | 90+ | HTTPS, no console errors, secure headers |
