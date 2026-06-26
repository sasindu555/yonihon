# YoNihon WordPress Rebuild Specification

Prepared for: rebuilding https://yonihon.com/ in a non-WordPress tech stack
Prepared date: 2026-06-24
Scope: public-site audit, visible content inventory, inferred functionality, data model, migration plan, rebuild backlog, and verification checklist.

## 1. Audit status and limits

The live public site currently shows a maintenance screen. Because the full site is not publicly browsable at this time, this document separates facts into the following categories:

- Verified live: content observed directly on the live public URL.
- Search-indexed: content observed from a recent search-engine crawl snippet.
- Inferred: product requirements inferred from visible navigation, CTAs, and site positioning.
- Not verified: anything that requires WordPress admin, database, file-system, plugin, theme, or private API access.

Important limitation: this is not a complete clone spec until the WordPress admin export, plugin/theme list, database, media library, and actual public pages are available. It is, however, enough to design and start a rebuild that preserves the apparent product model and public messaging.

## 2. Publicly verified current state

### Live homepage

- URL: https://yonihon.com/
- Page title/brand: Yonihon
- Main visible state: Maintenance...
- Visible copy: The site will be available soon. Thank you for being so patient!
- Footer: Copyright Yonihon 2025
- Functional state: no public navigation, search, booking, contact, catalog, or blog functionality is available from the maintenance page.

### Live sample page

- URL: https://yonihon.com/sample-page/
- Same maintenance screen as the homepage.
- Indicates WordPress-like default routing, but does not expose content.

### Indexed legacy/public homepage snapshot

A search-engine snippet from a recent crawl showed a more complete homepage. Treat this as previous public content, not current live content.

Observed navigation items:

1. Home
2. Explore Experiences
3. Travel Guide
4. Events
5. About YoNihon
6. For Partners
7. Contact

Observed hero copy:

- H1: Discover Unique Experiences in Japan
- Supporting copy: Book local workshops, hidden gems, and unforgettable activities curated by our Japan team.
- Primary CTA: Explore Experiences
- Secondary CTA: Read Travel Guide

Observed trust/stat content:

- Trusted by travelers in Japan since 2018
- 5,000+ Happy Travelers
- Based in Tokyo - Trusted local team
- Local Workshop Partners - Authentic experiences
- Personal Booking Support - We answer fast

Observed value proposition section:

- Section label/title: Why YoNihon
- Section heading: The Best Way to Experience Japan
- Card: Authentic Local Partners - Hand-picked workshop hosts across Japan, vetted by our Tokyo team.
- Card: Personal Support - A human on the other side of every booking - no chatbots, ever.
- Card: Real Stories - Reviewed by travelers who actually went. No paid placements.
- Card: Local Experiences - Hidden gems and seasonal favourites you won't find on big platforms.

## 3. Known and inferred route map

### Verified URLs

| Route | Status | Notes |
| --- | --- | --- |
| `/` | Live maintenance | Previously indexed with full homepage content. |
| `/sample-page/` | Live maintenance | WordPress sample page route. |
| `/page/2/` | Indexed maintenance | Search result showed maintenance page. |

### Navigation-derived routes to implement

Exact slugs were not verifiable while the site is under maintenance. Use these as recommended slugs unless a WordPress export shows different slugs.

| Navigation label | Recommended route | Purpose | Data source |
| --- | --- | --- | --- |
| Home | `/` | Marketing landing page | Page or global homepage content |
| Explore Experiences | `/experiences/` | Experience catalog | Experience collection |
| Travel Guide | `/travel-guide/` | Blog/article index | Guide article collection |
| Events | `/events/` | Dated event listings | Event collection |
| About YoNihon | `/about-yonihon/` | Brand/about page | Page collection |
| For Partners | `/for-partners/` | Partner acquisition page and form | Page + partner inquiry collection |
| Contact | `/contact/` | Contact form and contact details | Page + contact inquiry collection |

Redirect note: after exporting WordPress, preserve the exact existing slugs. If the above routes differ from WordPress routes, create 301 redirects from old routes to new routes.

## 4. Functional inventory

### Currently accessible functionality

- Maintenance screen only.
- No public forms, catalog, booking flow, search, account login, payment, or interactive features are visible.

### Previously visible/inferred functionality

The indexed homepage implies the site is a Japan travel experiences platform with these functions:

1. Browse curated local experiences in Japan.
2. Read travel guide content.
3. Browse event content.
4. Learn about YoNihon and its support model.
5. Attract local workshop/experience partners.
6. Let users contact the team.
7. Provide personal booking support.
8. Show credibility through traveler count, Tokyo-based team messaging, local partner messaging, and real traveler reviews/stories.

### Functional modules to rebuild

#### A. Marketing home

Required sections:

- Header with brand and navigation.
- Mobile responsive menu.
- Hero with H1, support copy, and two CTAs.
- Trust/stat band.
- Why YoNihon value cards.
- Featured experiences section, if experience data exists.
- Featured travel guides section, if guide content exists.
- Upcoming/seasonal events section, if event data exists.
- Partner CTA.
- Footer.

#### B. Experience catalog

Minimum features:

- Experience listing grid/cards.
- Filter by destination/area.
- Filter by category/type.
- Optional filter by duration, price, language, season, and availability.
- Sort by featured, newest, price, or popularity.
- Empty-state copy.
- SEO-friendly pagination or load more.

Experience card fields:

- Title
- Slug
- Hero/thumbnail image
- Destination/area
- Short description
- Price from
- Currency
- Duration
- Category tags
- Rating/review count if verified
- CTA: View details or inquire

Experience detail page:

- Title
- Gallery
- Overview
- Highlights
- What is included
- What is not included
- Duration
- Meeting point or location notes
- Price from
- Group size
- Languages
- Cancellation policy
- Partner/host information if public
- Reviews/stories if available
- Inquiry or booking CTA
- Related experiences
- SEO metadata and structured data

#### C. Booking or inquiry flow

The indexed homepage says personal booking support and no chatbots. The safest rebuild assumption is an inquiry-led booking flow unless WordPress data proves instant booking/payment.

Recommended inquiry fields:

- Experience ID/title
- Desired date or date range
- Number of travelers
- Traveler name
- Email
- Phone/WhatsApp optional
- Country optional
- Message/special requirements
- Consent checkbox
- Honeypot anti-spam field
- Admin notification email
- Stored inquiry record in CMS/database

Optional instant booking fields, only if verified:

- Availability calendar
- Tickets/slots
- Participant pricing rules
- Coupon codes
- Payment intent
- Refund/cancellation rules
- Booking confirmation email

#### D. Travel guide

Required features:

- Article listing page.
- Article detail pages.
- Categories and tags.
- Author, publish date, updated date, reading time.
- Featured image.
- Related articles.
- Search/filter.
- SEO metadata.

#### E. Events

Required features:

- Event listing page.
- Event detail pages.
- Start/end date and time.
- Location/destination.
- Seasonal visibility.
- Ticket/booking link or inquiry CTA.
- Archive past events or keep evergreen festival guides if desired.

#### F. About page

Suggested content blocks:

- Mission: helping travelers discover unique local experiences in Japan.
- Tokyo-based team positioning.
- Human support model.
- Partner-vetting process.
- Trust metrics.
- CTA to experiences or contact.

#### G. For Partners page

Suggested content blocks:

- Who should partner: local workshop hosts, cultural experience providers, guides, event organizers.
- Benefits: distribution, curated storytelling, traveler support.
- Partner criteria: authentic, safe, traveler-ready, local expertise.
- Partner application form.

Partner inquiry fields:

- Business/host name
- Contact person
- Email
- Phone optional
- Website/social link
- Location in Japan
- Type of experience
- Languages supported
- Capacity/group size
- Short pitch
- Consent checkbox

#### H. Contact page

Required features:

- Contact form.
- General inquiry topic dropdown.
- Email notification to team.
- Stored contact record.
- Spam protection.
- Success and error states.

Recommended contact fields:

- Name
- Email
- Inquiry type
- Message
- Optional phone/WhatsApp
- Consent checkbox

## 5. Content model

### Page

Use for generic pages such as Home, About, For Partners, Contact, legal pages.

Fields:

- title
- slug
- status: draft/published/archived
- seoTitle
- seoDescription
- openGraphImage
- pageBlocks: flexible rich content blocks
- lastReviewedAt
- publishedAt

### Experience

Fields:

- title
- slug
- status: draft/published/archived
- shortDescription
- descriptionRichText
- destination reference
- area/neighborhood
- address or meeting point notes
- map coordinates optional
- category references
- tags
- heroImage
- gallery
- priceFrom
- currency
- priceNotes
- duration
- groupSizeMin
- groupSizeMax
- languages
- seasonality
- availabilityMode: inquiry, external, instant
- externalBookingUrl optional
- highlights
- included
- notIncluded
- requirements
- cancellationPolicy
- host/partner reference optional
- rating optional
- reviewCount optional
- reviews/testimonials references
- featured boolean
- sortOrder
- seoTitle
- seoDescription
- structuredDataOverride optional

### Destination

Fields:

- name
- slug
- region/prefecture
- description
- heroImage
- latitude/longitude optional
- seo metadata

### ExperienceCategory

Fields:

- name
- slug
- description
- icon optional
- parentCategory optional
- seo metadata

### TravelGuideArticle

Fields:

- title
- slug
- status
- excerpt
- bodyRichText
- featuredImage
- author reference
- categories
- tags
- destination references optional
- publishDate
- updatedDate
- readingTime
- relatedExperiences
- relatedArticles
- seo metadata

### Event

Fields:

- title
- slug
- status
- excerpt
- bodyRichText
- heroImage
- gallery
- startDate
- endDate
- recurringRule optional
- destination/venue
- eventType/category
- priceFrom optional
- ticketUrl optional
- inquiryEnabled
- relatedExperiences
- seo metadata

### Partner

Fields:

- publicName
- internalName
- status
- contactName
- contactEmail
- phone
- website
- socialLinks
- location
- languages
- notes
- relatedExperiences

### Review or TravelerStory

Fields:

- displayName
- country optional
- rating optional
- quote
- fullStory optional
- relatedExperience optional
- date
- source optional
- approved boolean

### Inquiry

Fields:

- type: contact, partner, experience
- relatedExperience optional
- name
- email
- phone optional
- message
- desiredDate optional
- travelerCount optional
- partnerFields optional
- status: new, contacted, quoted, booked, closed, spam
- assignedTo optional
- internalNotes
- createdAt
- updatedAt
- consentAccepted
- ipHash optional

### MediaAsset

Fields:

- file
- altText
- caption
- credit
- license/permission notes
- focal point optional

### SiteSettings

Fields:

- siteName
- logo
- primaryNavigation
- footerNavigation
- contactEmail
- socialLinks
- defaultSeoTitle
- defaultSeoDescription
- defaultOpenGraphImage
- maintenanceMode boolean
- analytics IDs optional

## 6. Recommended non-WordPress architecture

### Preferred stack for ownership and custom booking workflows

- Frontend: Next.js with App Router and TypeScript.
- CMS/admin: Payload CMS.
- Database: PostgreSQL.
- Media storage: S3-compatible object storage.
- Email: Resend, Postmark, SendGrid, or AWS SES.
- Hosting: Vercel for frontend, or a combined Node host if using Payload in the same app.
- Search: database full-text search for small catalog; Typesense/Meilisearch/Algolia for larger catalog.
- Payments, if instant booking is later confirmed: Stripe.

Why this stack:

- Next.js supports modern React app routing and server rendering.
- Payload collections map cleanly to experiences, guides, events, partners, and inquiries.
- Payload access control supports public reads for published content, private reads for inquiries, and role-based admin workflows.
- PostgreSQL keeps data portable and owned.

### Alternative stack for editorial-first team

- Frontend: Next.js.
- CMS: Sanity.
- Data: Sanity Content Lake.
- Forms/inquiries: separate backend or serverless functions with PostgreSQL.
- Media: Sanity assets.

Why this stack:

- Strong editorial UI and structured content.
- Flexible GROQ queries for joined content.
- Less backend maintenance.

### Simpler static-site option

- Frontend: Astro or Next.js static export.
- CMS: Decap CMS, Contentful, Sanity, or markdown files.
- Forms: serverless form handler.

Use this only if the site will remain mostly brochure/blog content without booking logic.

## 7. Suggested Next.js route structure

```txt
app/
  (site)/
    layout.tsx
    page.tsx
    experiences/
      page.tsx
      [slug]/page.tsx
    travel-guide/
      page.tsx
      [slug]/page.tsx
    events/
      page.tsx
      [slug]/page.tsx
    about-yonihon/page.tsx
    for-partners/page.tsx
    contact/page.tsx
    search/page.tsx
    not-found.tsx
  api/
    inquiries/route.ts
    revalidate/route.ts
components/
  Header.tsx
  Footer.tsx
  Hero.tsx
  StatBand.tsx
  ValuePropGrid.tsx
  ExperienceCard.tsx
  ArticleCard.tsx
  EventCard.tsx
  InquiryForm.tsx
  PartnerForm.tsx
  ContactForm.tsx
lib/
  cms.ts
  seo.ts
  validators.ts
  email.ts
```

## 8. Migration plan from WordPress

### Data extraction checklist

Request the following from the current WordPress installation:

1. WordPress admin export: Tools -> Export -> All content.
2. Full database SQL backup.
3. Full `wp-content/uploads` folder.
4. Active theme folder and child theme folder.
5. Active plugins list with versions.
6. WordPress users/roles export, excluding unnecessary passwords/secrets.
7. Permalink settings.
8. Menus and menu locations.
9. Widgets and theme customizer settings.
10. SEO plugin metadata, if any.
11. Contact form plugin forms and submissions, if any.
12. Booking/payment plugin settings, if any.
13. Analytics/tag manager IDs, if any.
14. Legal pages: privacy policy, terms, cancellation/refund policy.

### WP-CLI commands for the site owner/developer

Run from the WordPress server or a local clone:

```bash
wp core version
wp option get siteurl
wp option get home
wp option get permalink_structure
wp theme list --status=active
wp plugin list --status=active --format=csv > active-plugins.csv
wp post list --post_type=page,post --post_status=publish --fields=ID,post_type,post_name,post_title,post_parent,menu_order,post_modified --format=csv > published-content.csv
wp post list --post_type=any --post_status=any --fields=ID,post_type,post_status,post_name,post_title --format=csv > all-content.csv
wp term list category --format=csv > categories.csv
wp term list post_tag --format=csv > tags.csv
wp media list --fields=ID,title,file,url,alt --format=csv > media.csv
wp menu list --format=csv > menus.csv
wp export --dir=exports --post_type=any
wp db export yonihon-wordpress-backup.sql
```

### REST extraction endpoints if public/admin REST is available

Use authenticated requests if the site is in maintenance mode or REST is restricted.

```txt
/wp-json/wp/v2/pages?per_page=100
/wp-json/wp/v2/posts?per_page=100
/wp-json/wp/v2/media?per_page=100
/wp-json/wp/v2/categories?per_page=100
/wp-json/wp/v2/tags?per_page=100
/wp-json/wp/v2/users?per_page=100
```

Repeat with `page=2`, `page=3`, etc. until no records remain.

### Import mapping

| WordPress source | New collection |
| --- | --- |
| Pages | Page |
| Posts in guide categories | TravelGuideArticle |
| Event posts or event CPT | Event |
| Experience posts/CPT/products | Experience |
| Categories | ExperienceCategory or ArticleCategory depending usage |
| Tags | Tags |
| Media attachments | MediaAsset |
| Contact form submissions | Inquiry |
| Booking form submissions | Inquiry or Booking |
| Menus | SiteSettings navigation |
| Theme options/customizer | SiteSettings and page blocks |

## 9. SEO and URL preservation

Required launch tasks:

- Export all current WordPress URLs before launch.
- Preserve existing slugs where possible.
- Add 301 redirects for changed URLs.
- Generate XML sitemap.
- Add robots.txt.
- Add canonical URLs.
- Add Open Graph and Twitter/X card metadata.
- Add image alt text.
- Implement structured data for Organization, BreadcrumbList, Article, Event, and experience/tour pages where appropriate.
- Keep `Yonihon` vs `YoNihon` brand casing consistent after owner confirmation.
- Monitor 404 logs after launch.

## 10. Design/UI requirements

Known tone:

- Warm travel brand.
- Japan-local and human-supported.
- Authentic, curated, no paid placements.
- Emphasis on hidden gems and local workshops.

Core components:

- Header/navigation
- Responsive mobile menu
- Primary CTA button
- Secondary CTA link/button
- Hero section
- Stat/trust card
- Value proposition card
- Experience card
- Article card
- Event card
- Form component
- Alert/success/error component
- Footer
- Breadcrumbs
- Pagination
- Search/filter controls

Accessibility requirements:

- Semantic headings.
- Keyboard navigable menus and forms.
- Visible focus states.
- Alt text on all meaningful images.
- Labels and error messages for all form fields.
- Color contrast checks.
- Reduced motion support where animations exist.

## 11. Security and privacy requirements

- Admin authentication with strong passwords and MFA where available.
- Role-based access: admin, editor, support, partner optional.
- Public users should not access inquiry records.
- Form rate limiting.
- Spam protection: honeypot plus CAPTCHA or turnstile if needed.
- Validate all submitted data server-side.
- Sanitize rich text.
- Restrict media upload types.
- Store only necessary PII.
- Add retention policy for inquiries.
- Use HTTPS only.
- Store secrets in environment variables.
- Daily database backups.

## 12. QA checklist

### Content QA

- Homepage content matches approved copy.
- Navigation labels match original/approved labels.
- All old WordPress pages have a destination or redirect.
- All images load and have alt text.
- All guide posts preserve publish/update dates.
- All experience prices/durations/categories are correct.

### Functional QA

- Header nav works on desktop and mobile.
- Experience filters work.
- Search returns expected results.
- Contact form submits, stores inquiry, and sends email.
- Partner form submits, stores inquiry, and sends email.
- Experience inquiry form preserves selected experience.
- Error states appear for invalid forms.
- Admin can create, edit, publish, unpublish, and delete draft content.
- Redirects work.

### SEO QA

- Sitemap returns 200.
- robots.txt returns 200.
- Canonicals are correct.
- Metadata exists for every indexable page.
- No staging/noindex settings remain after launch unless intentional.
- 404 page exists.
- Structured data validates.

### Performance QA

- Images use responsive sizes.
- Hero image optimized.
- Core pages meet target Lighthouse scores.
- No unnecessary third-party scripts.
- Fonts are optimized.

## 13. Implementation backlog

### Epic 1: Discovery and migration inventory

- Export WordPress content.
- Export media.
- Export plugin/theme list.
- Confirm exact URL map.
- Confirm whether booking/payment exists.
- Confirm analytics/SEO/legal requirements.

### Epic 2: Foundation

- Set up repository.
- Set up Next.js/TypeScript.
- Set up CMS and database.
- Set up media storage.
- Set up deployment environments.
- Set up environment variables and secrets.

### Epic 3: CMS schema

- Build Page collection.
- Build Experience collection.
- Build Destination collection.
- Build ExperienceCategory collection.
- Build TravelGuideArticle collection.
- Build Event collection.
- Build Partner collection.
- Build Inquiry collection.
- Build SiteSettings/global settings.

### Epic 4: Frontend

- Build layout, header, footer.
- Build homepage.
- Build experience catalog and detail pages.
- Build travel guide index and detail pages.
- Build events index and detail pages.
- Build About, For Partners, Contact pages.
- Build search.
- Build 404 page.

### Epic 5: Forms and workflow

- Build contact form.
- Build partner form.
- Build experience inquiry form.
- Store submissions.
- Send email notifications.
- Add admin status workflow.
- Add spam/rate limiting.

### Epic 6: Migration scripts

- Parse WordPress XML export.
- Download and map media assets.
- Import pages.
- Import posts/guides.
- Import experiences/events if source exists.
- Build redirect map.
- Validate imports.

### Epic 7: SEO and launch

- Metadata templates.
- Sitemap.
- robots.txt.
- Structured data.
- Redirects.
- Analytics.
- Production domain setup.
- Launch QA.
- Post-launch 404 monitoring.

## 14. Acceptance criteria

The rebuild is launch-ready when:

1. The maintenance page is replaced by the approved public homepage or an intentional new maintenance toggle.
2. The header contains Home, Explore Experiences, Travel Guide, Events, About YoNihon, For Partners, and Contact unless owner approves changes.
3. The homepage preserves the verified indexed messaging or approved revised copy.
4. Experiences can be created in the CMS and displayed on listing/detail pages.
5. Travel guide articles can be created in the CMS and displayed on listing/detail pages.
6. Events can be created in the CMS and displayed on listing/detail pages.
7. Contact, partner, and experience inquiry forms submit successfully and are visible to admins only.
8. All WordPress URLs are either preserved or redirected.
9. SEO metadata, sitemap, robots.txt, and canonical URLs are working.
10. The site is responsive, accessible, and performant.
11. Admin roles prevent public or non-admin access to inquiries.
12. Backups and deployment rollback are configured.

## 15. Open items that require owner/admin access

- Exact active WordPress theme and child theme.
- Active plugin list.
- Whether experiences are pages, posts, products, or custom post types.
- Whether there is WooCommerce, booking, payment, or calendar logic.
- Actual contact and partner form fields.
- Actual published URLs and slugs.
- Full media library.
- SEO metadata and redirects.
- Analytics/tag manager IDs.
- Email addresses used for notifications.
- Legal policy pages.
- Brand assets: logo, colors, typography, image licenses.

