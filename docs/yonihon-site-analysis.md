# YoNihon.com — Full Site Analysis & Documentation

**Date:** 2026-06-24

---

## 1. Overview

**YoNihon** is a Japan-focused travel experience marketplace. It connects international travelers with local workshops, cultural activities, seasonal events, and travel guides. The current site is built on **WordPress** with custom post types and page templates.

### Brand Identity
- **Tagline:** "Connecting travelers with authentic Japanese culture, one experience at a time."
- **Contact Email:** info.yonihon@gmail.com
- **Phone:** +81-70-3527-3774
- **Address:** 2-1-1 Shibuya, Tokyo, Japan
- **Social:** Links to Facebook, Twitter(X), Instagram, YouTube (footer)
- **Founded:** Since 2018 (5,000+ happy travelers claimed)

---

## 2. Current Tech Stack

| Layer | Technology |
|---|---|
| CMS | WordPress 6.x |
| REST API | WordPress REST API (wp-json) |
| Custom Post Types | `experience`, `event`, `guide`, `destination`, `testimonial`, `partner_lead` |
| Custom Taxonomies | `experience_category`, `experience_location`, `event_type`, `guide_category`, `destinations` |
| Page Templates | `page-about.php`, `page-partners.php`, `page-contact.php` |
| Theme | Custom WordPress theme (likely block-based or classic with custom templates) |
| Media | Unsplash + custom uploads |
| Frontend | PHP-rendered HTML (likely with minimal JS) |

---

## 3. Site Structure (Pages & Routes)

```
/                                        Home page (WP page: "Home")
/experience/                             Experience archive (CPT archive)
/experience/{slug}/                      Single experience detail + booking
/travel-guide/                           Travel guide archive (CPT: guide)
/travel-guide/{slug}/                    Single guide article
/event/                                  Events archive (CPT: event)
/event/{slug}/                           Single event detail
/destination/                            Destinations archive (CPT: destination)
/about/                                  About page
/partners/                               Partner signup page
/contact/                                Contact page
/privacy/                                Privacy policy (404 currently)
/terms/                                  Terms of service (404 currently)
```

---

## 4. Content Types & Data Models

### 4.1. Experiences (`experience`)

**CPT slug:** `experience`  
**Archive:** Has archive (`/experience/`)  
**Icon:** `dashicons-tickets-alt`  
**Taxonomies:** `experience_category`, `experience_location`, `destinations`

| Field | Details |
|---|---|
| title | Experience name |
| content | Description + itinerary + what's included/not included |
| featured_media | Main image |
| experience_category | e.g., "Popular" |
| experience_location | e.g., "Tokyo" |
| destinations | e.g., "Asakusa" |

**Filters on archive page:**
- Search text
- Location (All Locations, Tokyo)
- Category (All Categories)
- Price: Under ¥5,000, ¥5,000–¥10,000, ¥10,000–¥20,000, Over ¥20,000
- Duration: < 2 hours, 2–4 hours, Half day+
- Language: English, Japanese
- Sort: Popular, Price (Low→High, High→Low), Rating

**Single experience page sections:**
- Hero image
- Breadcrumb: Home › Experiences
- Title
- Overview: Duration, Group Size, Language, Experience type
- "What You'll Do" — full description
- Itinerary section
- **Booking widget** (inline, on-page)
  - Date picker
  - Time slot selector
  - Full name, Email, Phone, Party size, Notes
  - "Confirm Booking" button
- Meeting Point (with Google Maps link)
- Cancellation Policy
- Pricing: ¥3,300 / person
- "Reserve now, pay nothing today"
- Workshop Gallery (lightbox images)

### 4.2. Travel Guides (`guide`)

**CPT slug:** `guide`  
**Archive:** Has archive (`/travel-guide/`)  
**Icon:** `dashicons-book-alt`  
**Taxonomies:** `guide_category`, `destinations`

**Guide Categories:**
1. Food & Restaurants
2. Hidden Gems
3. Japanese Culture
4. Things to Do in Japan
5. Tokyo Travel Guide
6. Travel Planning
7. Travel Tips
8. Unique Experiences

**Guide page sections:**
- Hero image with overlay text
- Category grid (all 8 categories with article counts)
- Featured Articles (3)
- Latest Articles section
- Popular Topics (tag cloud)
- Email newsletter subscribe (Mailchimp-style)
- Sidebar: Search, Categories, CTA

**Single guide article:**
- Breadcrumb
- Category badge
- Title, author, date, read time
- Featured image
- Table of Contents
- Body content (long-form article)
- Share button
- Sidebar: Search, Categories, CTA
- "More Travel Guides" (related)

### 4.3. Events (`event`)

**CPT slug:** `event`  
**Archive:** Has archive (`/event/`)  
**Icon:** `dashicons-calendar-alt`  
**Taxonomies:** `post_tag`, `event_type`, `destinations`

**Event Types (hierarchical):**
- Cultural Events
- Festivals
- Fireworks
- Flowers (child of Nature)
- Nature (parent)
- Seasonal Events

**Filters:**
- Search text
- Location: All, Asakusa, Kanazawa, Kyoto, Mount Fuji, Osaka, Tokyo
- Type: Cultural Events, Festivals, Fireworks, Flowers, Nature, Seasonal Events
- Month: January–December
- Sort: Date (Soonest), Name (A→Z)

**Single event page sections:**
- Hero image
- Breadcrumb: Home › Events › {Category}
- Date range (e.g., "June 6 – June 14, 2026")
- Location: Area + Prefecture
- Title
- "Festival Highlight" with description
- "Why People Love It"
- "Tips for Visitors"
- Tags
- Event Gallery (lightbox)
- Event Details sidebar:
  - Category
  - When
  - Area
  - Prefecture
  - Nearest Station
  - Admission (Free/Paid)
  - Best For
  - Good For (English, Families)
  - Official Website link

### 4.4. Destinations (`destination`)

**CPT slug:** `destination`  
**Archive:** Has archive (`/destination/`)  
**Icon:** `dashicons-location`  
**Taxonomies:** None (used as a taxonomy for other CPTs)

**Values:** Asakusa, Kanazawa, Kyoto, Mount Fuji, Osaka, Tokyo

### 4.5. Testimonials (`testimonial`)

**CPT slug:** `testimonial`  
**No archive** (used for front-end display)  
**Icon:** `dashicons-format-quote`

Currently empty.

### 4.6. Partner Leads (`partner_lead`)

**CPT slug:** `partner_lead`  
**No archive** (admin-only form submissions)  
**Icon:** `dashicons-businessperson`

---

## 5. Page-by-Page Breakdown

### 5.1. Home (`/`)
- **Hero:** Full-width image + headline + subtitle + 2 CTAs ("Explore Experiences" / "Read Travel Guide")
- **Trust bar:** "Trusted by travelers in Japan since 2018" + 3 stats (5,000+ Happy Travelers, Based in Tokyo, Local Workshop Partners, Authentic experiences, Personal Booking Support)
- **Featured Experiences:** Carousel/grid of handpicked experiences with card layout
- **This Season Events:** Upcoming events grid with date badge overlay + category tags
- **Why YoNihon:** 4-column USP section (Authentic Local Partners, Personal Support, Real Stories, Local Experiences)
- **Travel Guide:** 3 latest articles with image, category, title, date, read time
- **Double CTA:** Partner CTA + Browse Experiences CTA
- **Footer:** Logo, social icons, 4-column footer menu

### 5.2. Experiences Archive (`/experience/`)
- Hero
- Search bar
- Filters: Location, Category, Price, Duration, Language
- "Featured Experiences" grid
- Sort dropdown
- Trust bar
- Footer

### 5.3. Travel Guide Archive (`/travel-guide/`)
- Hero with title + subtitle
- Search bar
- Category grid (8 boxes with emoji icons + article counts)
- Featured Articles (3, layout: image + badge + title + date)
- Latest Articles
- Popular Topics (tag cloud)
- Email subscribe form
- Footer

### 5.4. Events Archive (`/event/`)
- Hero
- Search bar
- Filters: Location, Type, Month
- Quick filter tabs (All, Cultural Events, Festivals, Fireworks, Flowers, Nature, Seasonal Events)
- Event grid cards with: date badge, image, title, location, excerpt, tag pills (Free Entry, English Friendly, Family Friendly, category)
- Sort

### 5.5. About (`/about/`)
- Hero
- "Our Story" section
- Stats: 500+ Curated Experiences, 50+ Local Partners
- "Our Focus" — 4 pillars: Sustainable Communities, Expert Curation, Authentic, Uncompromising Trust
- "Meet Our Team" (placeholder section)
- Bottom CTA banner

### 5.6. Partners (`/partners/`)
- Hero
- Benefits: Global Reach, Seamless Booking, Trusted Brand
- How It Works: 3-step process
- "What We Look For" — checklist
- **Partner lead form** (inline):
  - Full Name (required)
  - Email (required)
  - Workshop Type: Pottery & Ceramics, Tea Ceremony, Calligraphy, Cooking, Other
  - Location
  - Tell us about your workshop (textarea)
  - Submit button

### 5.7. Contact (`/contact/`)
- Hero
- Contact info: Support Hours, Email, Phone, WhatsApp, Office Address
- Social follow links
- **Contact form** (inline):
  - Name (required)
  - Email (required)
  - Subject: General Question, Experience Inquiry, Partnership, Press/Media
  - Message (required)
  - Submit
- Map/location image
- "Visit Us in Tokyo" CTA

### 5.8. Destinations Archive (`/destination/`)
- Currently empty ("Nothing found")

### 5.9. Privacy & Terms
- Linked in footer but return 404

---

## 6. Key Functionality

### 6.1. Experience Booking Flow
1. User browses experiences (filtered/sorted)
2. Clicks into a single experience
3. Sees details, gallery, pricing
4. On-page booking form:
   - Select date (date picker)
   - Select time (dynamic slots)
   - Enter name, email, phone, party size, notes
   - "Confirm Booking"
5. **No payment is taken at booking** — "Reserve now, pay nothing today"
6. Cancellation: Free up to 24h before

**Note:** The booking form appears to be part of a plugin or custom solution (likely "Booking" plugin or similar). It says "Reservations made through YONIHON are free of charge, and no payment is required at the time of booking." Users are asked to contact the workshop via Instagram DM or email for cancellations.

### 6.2. Search
- Full-text search across experiences/travel guides/events
- Filter combos on archive pages

### 6.3. Newsletter Subscription
- Email subscribe form on travel guide page
- "No spam, unsubscribe anytime"

### 6.4. Forms
1. **Contact form** — name, email, subject, message
2. **Partner lead form** — name, email, workshop type, location, description
3. **Experience booking form** — date, time, name, email, phone, party size, notes

All forms likely use **WPForms**, **Contact Form 7**, or **Gravity Forms** (custom form submission).

---

## 7. Design & UI Patterns

### 7.1. Color Palette
- **Primary:** Deep red/crimson (Japanese-themed accent, used for "Book Now" button)
- **Dark:** Near-black (#1a1a1a or similar, for header/footer)
- **Light:** White backgrounds, light gray sections
- **Accent:** Gold/amber for badges and highlights

### 7.2. Typography
- Headings: Bold, serif or sans-serif with letter-spacing
- Body: Clean sans-serif (likely system fonts or Google Fonts)
- Japanese characters used throughout

### 7.3. Layout
- Max-width container (~1200px)
- Full-width hero sections with overlays
- Card-based grids (3-column on desktop, 2 on tablet, 1 on mobile)
- Sticky header with transparent/hamburger toggle
- Footer with 4-column layout

### 7.4. Design Elements
- Unsplash photography for hero backgrounds (Japan-themed)
- Custom uploaded images for experiences/events
- Lightbox gallery on detail pages
- Tag pills (rounded badges)
- "POPULAR" badge on featured items
- Date badge overlay on event cards
- Breadcrumb navigation
- Star ratings (not yet populated)

---

## 8. Third-Party Integrations Detected

| Integration | Usage |
|---|---|
| **Unsplash** | Hero images, background photos |
| **Google Maps** | Meeting point / directions links |
| **Instagram** | Workshop contact via DM (nane.asakusa) |
| **YouTube** | Event video search link |
| **WhatsApp** | Contact number shared |
| **Email** | info.yonihon@gmail.com |
| **Viator** | Mentioned in pricing ("prices listed on Viator are minimum") — may handle payments |

---

## 9. WordPress REST API Endpoints

| Endpoint | Description |
|---|---|
| `/wp-json/wp/v2/posts` | Standard blog posts |
| `/wp-json/wp/v2/pages` | Pages (home, about, partners, contact) |
| `/wp-json/wp/v2/experience` | Custom: Experiences |
| `/wp-json/wp/v2/event` | Custom: Events |
| `/wp-json/wp/v2/guide` | Custom: Travel Guides |
| `/wp-json/wp/v2/destination` | Custom: Destinations |
| `/wp-json/wp/v2/testimonial` | Custom: Testimonials |
| `/wp-json/wp/v2/partner_lead` | Custom: Partner form submissions |
| `/wp-json/wp/v2/media` | Media library |
| `/wp-json/wp/v2/experience_category` | Taxonomy |
| `/wp-json/wp/v2/experience_location` | Taxonomy |
| `/wp-json/wp/v2/event_type` | Taxonomy |
| `/wp-json/wp/v2/guide_category` | Taxonomy |
| `/wp-json/wp/v2/destinations` | Taxonomy |
| `/wp-json/wp/v2/tags` | Tags |

---

## 10. Recommendations for Rebuild

### Suggested Tech Stack
| Layer | Recommendation | Rationale |
|---|---|---|
| **Frontend Framework** | Next.js (App Router) or Remix | SSR for SEO, dynamic routing, great DX |
| **CMS / Data** | Headless CMS (Sanity, Strapi, Contentful) or Supabase/Postgres | Structured content types match CPTs exactly |
| **Styling** | Tailwind CSS + shadcn/ui | Matches current design philosophy, rapid development |
| **Booking System** | Custom (Supabase + Next.js API routes) or integrate Cal.com / SimplyBook.me | Current booking is free reservation with no payment |
| **Forms** | React Hook Form + Zod | Contact, partner, booking forms |
| **Auth** | NextAuth.js or Clerk | Admin dashboard for managing content |
| **Search** | MeiliSearch or Algolia | Full-text + faceted filtering (location, price, duration) |
| **Media** | Cloudinary or Uploadthing | Image optimization, galleries, lightbox |
| **Analytics** | Plausible or Umami (privacy-focused) | Currently none detected |
| **Email** | Resend or SendGrid | Form notifications, newsletter |
| **Hosting** | Vercel or Cloudflare Pages | Global edge, good for Japan audience |
| **Database** | PostgreSQL (via Supabase or Neon) | Relational data fits perfectly |

### Content Migration Checklist
1. Export all WP data via REST API (already discovered)
2. Map CPTs to new schema:
   - `experience` → `experiences` table
   - `event` → `events` table
   - `guide` → `guides` table
   - `destination` → `destinations` table
   - `testimonial` → `testimonials` table
3. Migrate media (featured images, galleries)
4. Preserve all taxonomies as relational joins
5. Redesign templates:
   - `page-about.php` → `/about` page
   - `page-partners.php` → `/partners` page  
   - `page-contact.php` → `/contact` page
   - Archive pages → listing pages with filtering
   - Single templates → dynamic `[slug]` routes

### Migration Priority
1. **Database schema design** (Postgres)
2. **Media migration** (Cloudinary)  
3. **Content migration** (REST API → new DB)
4. **Frontend pages** (Home → Archive → Single → Static pages)
5. **Booking functionality** (reservation flow)
6. **Forms** (Contact, Partner)
7. **Search & filtering**
8. **Newsletter integration**
9. **SEO & redirects** (preserve all existing URLs)

### Critical URLs to Preserve
```
/experience/{slug}/
/event/{slug}/
/travel-guide/{slug}/
/destination/{slug}/
/about/
/partners/
/contact/
/experience/
/event/
/travel-guide/
/destination/
```

### SEO Metadata
- Yoast SEO likely used (check `wp-json/wp/v2/yoast/` endpoints)
- Titles, meta descriptions, OG images per page
- XML sitemap: `/wp-sitemap.xml`

---

## 11. Data Estimates (Current)

| Content Type | Count |
|---|---|
| Experiences | 1 (growing) |
| Events | 4 (seasonal, will grow) |
| Guides | 3 (will grow) |
| Destinations | 6 |
| Pages | 5 + sample |
| Testimonials | 0 |
| Partner Leads | 0 |

---

## 12. Notes on Booking Flow

The current booking system has these characteristics that should inform the rebuild:

- **No payment required** — it's a free reservation/lead system
- **Date availability** — workshop-specific calendar
- **Time slots** — dynamic based on workshop
- **Admin notification** — likely emails sent to workshop and/or YoNihon team
- **Cancellation** — handled via Instagram DM or email (manual)
- **Viator pricing mention** — suggests some experiences may also be listed on Viator for payment processing
- **Instagram reference** — workshop-specific social contact

This suggests a **two-tier booking system** could work:
1. **Free inquiry/reservation** (current model) — collect lead, notify workshop
2. **Optional paid booking** (future) — integrate Stripe or similar

---

## 13. Site Analytics (Current)

- No visible analytics script detected (Google Analytics, etc.)
- Consider adding privacy-friendly analytics in rebuild

---

## 14. Performance Observations

- Images from Unsplash are hotlinked (external dependency)
- WordPress-generated pages (server-rendered PHP)
- No visible CDN for assets
- No visible JS framework (mostly vanilla)

---

*End of analysis. Covers all detected pages, content types, features, integrations, and rebuild recommendations.*
