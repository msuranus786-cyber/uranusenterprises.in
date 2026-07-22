# <a name="x0d94bcd19e4a46d48e3ad4903275a5814c85c43"></a>Uranus Enterprise Digital Commerce Platform
## <a name="x27d50caddfb2ff9d6eda79f07b55ea8620abe58"></a>Complete Project Specification for Claude Code
-----
# <a name="project-overview"></a>1. Project Overview
## <a name="client"></a>Client
**Business Name:** Uranus Enterprise\
**Owner:** Mr. Bharath\
**Existing Website:** https://www.msuranus.in/

-----
## <a name="project-goal"></a>Project Goal
Build a modern **Digital Marketing + Service Commerce Platform** for Uranus Enterprise.

This platform must work as:

- Company website
- Digital service catalogue
- Lead generation system
- WhatsApp-based sales platform
- Customer review platform
- Private admin CMS portal
- Website chatbot assistant

The complete business workflow:

Customer visits website\
\
↓\
\
Browses services/products\
\
↓\
\
Selects package/service\
\
↓\
\
Clicks WhatsApp enquiry\
\
↓\
\
Message reaches Uranus Enterprise\
\
↓\
\
Admin receives customer details\
\
↓\
\
Business follows up

-----
# <a name="main-business-objective"></a>2. Main Business Objective
The website should help Uranus Enterprise:

- Generate more customers
- Rank on Google
- Showcase technology services
- Convert visitors into WhatsApp enquiries
- Allow owner to update everything without developers

Mr. Bharath must be able to manage:

- Services
- Products
- Packages
- Prices
- Images
- Availability
- Stock
- Reviews
- SEO information
-----
# <a name="technology-stack"></a>3. Technology Stack
The entire application must be built using a **Vercel-only architecture**.

No VPS.

No traditional backend server.

No FTP hosting.

-----
## <a name="frontend"></a>Frontend
Use:

- Next.js latest version
- App Router
- TypeScript
- React
- Tailwind CSS
- Shadcn UI
-----
## <a name="backend"></a>Backend
Use Next.js native backend:

- Server Components
- Server Actions
- Route Handlers

API routes:

/app/api/\*

-----
## <a name="hosting"></a>Hosting
Deployment:

Vercel

The project must support:

git push\
\
↓\
\
Vercel build\
\
↓\
\
Production deployment

-----
# <a name="database"></a>4. Database
Use:

PostgreSQL

Recommended:

- Vercel Postgres
- Neon PostgreSQL

ORM:

Prisma

-----
# <a name="authentication"></a>5. Authentication
Use:

Auth.js / NextAuth

Admin login required.

Roles:

ADMIN

Only admin users can access:

/admin

Security:

- Password hashing
- Secure sessions
- Route protection
- Role validation
-----
# <a name="image-management"></a>6. Image Management
Do not store images locally.

Use:

Cloudinary

Used for:

- Service images
- Product images
- Package images
- Gallery images

Features:

- Compression
- Optimization
- Responsive images
-----
# <a name="business-services"></a>7. Business Services
## <a name="service-category-1"></a>Service Category 1
# <a name="cctv-installation-services"></a>CCTV Installation Services
Create multiple packages:
## <a name="basic-cctv-package"></a>Basic CCTV Package
Fields:

- Package name
- Camera count
- DVR/NVR
- Storage
- Installation
- Warranty
- Price
- Images
- Availability
-----
## <a name="standard-cctv-package"></a>Standard CCTV Package
-----
## <a name="premium-cctv-package"></a>Premium CCTV Package
-----
## <a name="enterprise-cctv-package"></a>Enterprise CCTV Package
Admin controls:

- Add package
- Delete package
- Update price
- Update stock
- Change availability
-----
# <a name="service-category-2"></a>Service Category 2
# <a name="biometric-services"></a>Biometric Services
Products:

- Fingerprint devices
- Face recognition systems
- Smart access control
- Smart door locks

Each product:

name\
\
description\
\
features\
\
price\
\
images\
\
availability\
\
stock

-----
# <a name="service-category-3"></a>Service Category 3
# <a name="computer-system-services"></a>Computer System Services
Services:

- Laptop repair
- Desktop repair
- RAM upgrade
- ROM/storage upgrade
- Software support
- Hardware service

Admin can:

Create

Update

Delete

-----
# <a name="service-category-4"></a>Service Category 4
# <a name="site-works"></a>Site Works
Services:

- UPS installation
- Electrical work
- Networking work
- Cable installation

Cable types:

- CAT5
- CAT6
-----
# <a name="service-category-5"></a>Service Category 5
# <a name="home-automation"></a>Home Automation
Products:

- Smart switches
- Smart lighting
- Gate automation
- Smart controls
- Home security automation
-----
# <a name="public-website-modules"></a>8. Public Website Modules
## <a name="home-page"></a>Home Page
Sections:

Hero banner

Company introduction

Services

Featured packages

Customer reviews

Contact CTA

-----
# <a name="about-page"></a>About Page
Include:

- Company information
- Experience
- Mission
- Vision
-----
# <a name="services-page"></a>Services Page
Display:

Service cards:

- Image
- Title
- Description
- Starting price
- Availability
-----
# <a name="service-details-page"></a>Service Details Page
Each service must show:

- Images
- Description
- Features
- Price
- Stock status
- Reviews

CTA:

Enquire on WhatsApp

-----
# <a name="whatsapp-commerce-system"></a>9. WhatsApp Commerce System
The website does not require payment gateway.

All sales happen through WhatsApp.

-----
## <a name="customer-flow"></a>Customer Flow
Customer clicks:

Enquire Now

Generate message:

Hello Uranus Enterprise,\
\
I am interested in:\
\
Service:\
Package:\
\
Customer Name:\
Phone:\
Location:\
\
Requirement:

Open WhatsApp.

-----
# <a name="admin-enquiry-management"></a>10. Admin Enquiry Management
Every enquiry must be stored.

Database:

customer\_name\
\
phone\
\
email\
\
location\
\
selected\_service\
\
message\
\
created\_date\
\
status

Status:

New\
\
Contacted\
\
Completed\
\
Closed

-----
# <a name="admin-portal"></a>11. Admin Portal
URL:

/admin

-----
## <a name="dashboard"></a>Dashboard
Display:

- Total services
- Total products
- Pending enquiries
- Reviews
- Inventory
-----
# <a name="service-management"></a>Service Management
CRUD:

Create

Read

Update

Delete

Fields:

title\
\
slug\
\
description\
\
category\
\
price\
\
images\
\
availability\
\
stock

-----
# <a name="product-management"></a>Product Management
Fields:

product\_name\
\
description\
\
price\
\
discount\
\
stock\
\
availability\
\
images

-----
# <a name="package-management"></a>Package Management
Fields:

package\_name\
\
features\
\
price\
\
installation\
\
warranty

-----
# <a name="review-management"></a>Review Management
Customer can submit:

name\
\
rating\
\
review

Admin:

Approve

Reject

Delete

Only approved reviews appear.

-----
# <a name="website-chatbot"></a>12. Website Chatbot
Create floating chatbot.

Purpose:

Help visitors navigate website.

-----
## <a name="chatbot-knowledge-source"></a>Chatbot Knowledge Source
Read from database:

- Services
- Products
- Packages
- FAQ
-----
Example:

User:

Need CCTV

Bot:

We provide CCTV installation packages.\
You can view available packages.

-----
User:

What services do you provide?

Bot:

We provide CCTV, biometric, computer services,\
networking, UPS and home automation solutions.

-----
# <a name="chatbot-escalation"></a>13. Chatbot Escalation
If chatbot cannot answer:

Example:

Customer:

I need custom office security setup

Bot:

I will connect you with Uranus Enterprise support.

Redirect to WhatsApp.

Send:

Customer Name\
\
Phone\
\
Question\
\
Chat history

-----
# <a name="seo-requirements"></a>14. SEO Requirements
Implement complete SEO system.

-----
## <a name="technical-seo"></a>Technical SEO
Required:

- Sitemap.xml
- Robots.txt
- Schema markup
- Canonical URLs
- Open Graph
- Twitter Cards
- Structured data
-----
# <a name="local-seo-chennai"></a>Local SEO Chennai
Target keywords:

CCTV installation Chennai\
\
CCTV camera service Chennai\
\
Biometric service Chennai\
\
Smart door lock Chennai\
\
Laptop repair Chennai\
\
Computer service Chennai\
\
Home automation Chennai\
\
UPS installation Chennai

-----
# <a name="dynamic-seo-cms"></a>Dynamic SEO CMS
Admin should manage:

seo\_title\
\
seo\_description\
\
seo\_keywords\
\
og\_image\
\
canonical\_url

-----
# <a name="performance-requirements"></a>15. Performance Requirements
Use:

- Next Image
- Lazy loading
- Server rendering
- Compression
- Caching

Target:

Google Lighthouse:

Performance:

90+

SEO:

95+

Accessibility:

90+

-----
# <a name="database-models"></a>16. Database Models
## <a name="user"></a>User
id\
\
name\
\
email\
\
password\_hash\
\
role

-----
## <a name="service"></a>Service
id\
\
title\
\
slug\
\
description\
\
category\
\
price\
\
availability\
\
stock\
\
image\
\
seo\_title\
\
seo\_description

-----
## <a name="product"></a>Product
id\
\
service\_id\
\
name\
\
description\
\
price\
\
stock\
\
availability\
\
images

-----
## <a name="package"></a>Package
id\
\
name\
\
features\
\
price\
\
availability\
\
images

-----
## <a name="enquiry"></a>Enquiry
id\
\
customer\_name\
\
phone\
\
email\
\
location\
\
service\
\
message\
\
status\
\
created\_at

-----
## <a name="review"></a>Review
id\
\
name\
\
rating\
\
comment\
\
approved

-----
# <a name="environment-variables"></a>17. Environment Variables
Required:

DATABASE\_URL\
\
AUTH\_SECRET\
\
AUTH\_URL\
\
CLOUDINARY\_CLOUD\_NAME\
\
CLOUDINARY\_API\_KEY\
\
CLOUDINARY\_API\_SECRET\
\
WHATSAPP\_NUMBER

-----
# <a name="recommended-folder-structure"></a>18. Recommended Folder Structure
uranus-enterprise/\
\
\
app/\
\
` `page.tsx\
\
` `services/\
\
` `products/\
\
` `admin/\
\
` `api/\
\
\
components/\
\
\
` `chatbot/\
\
` `whatsapp/\
\
` `ui/\
\
\
lib/\
\
\
` `prisma.ts\
\
` `auth.ts\
\
` `seo.ts\
\
\
prisma/\
\
\
` `schema.prisma\
\
\
public/

-----
# <a name="security"></a>19. Security
Implement:

- Input validation
- Zod validation
- SQL injection prevention
- Secure uploads
- Rate limiting
- Protected admin routes
-----
# <a name="final-deliverable"></a>20. Final Deliverable
The final application must provide:

Customer Side:

✓ Modern website

✓ Service browsing

✓ Package browsing

✓ WhatsApp enquiry

✓ Reviews

✓ Chatbot assistance

✓ Mobile responsive design

Admin Side:

✓ Secure login

✓ Manage services

✓ Manage products

✓ Manage packages

✓ Update pricing

✓ Update stock

✓ Upload images

✓ Manage enquiries

✓ Manage reviews

✓ Manage SEO

-----
# <a name="development-rule"></a>Development Rule
Build this as a professional SaaS-style digital commerce platform.

The owner Mr. Bharath must be able to operate the entire website without developer support.

The final product must be Vercel-native, scalable, secure, fast, and SEO optimized.
