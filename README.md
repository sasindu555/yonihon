# YoNihon — Japan Travel Experience Marketplace

A clone of [yonihon.com](https://yonihon.com/) — a Japan-focused travel experience marketplace connecting international travelers with local workshops, cultural activities, seasonal events, and travel guides.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist (Vercel) |
| Storage | File-based JSON (`src/lib/data-files/*.json`) |
| Auth | Session cookie (`yonihon_admin`) with SHA-256 hashed passwords |
| Linter | ESLint 9 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles + brand tokens
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── partners/page.tsx       # Partners page
│   ├── experience/
│   │   ├── page.tsx            # Experience archive + filters
│   │   └── [slug]/page.tsx     # Single experience + booking
│   ├── travel-guide/
│   │   ├── page.tsx            # Guide archive + categories
│   │   └── [slug]/page.tsx     # Single guide article
│   ├── event/
│   │   ├── page.tsx            # Events archive + filters
│   │   └── [slug]/page.tsx     # Single event detail
│   ├── admin/                  # Admin panel (role-based access)
│   │   ├── layout.tsx          # Admin layout + sidebar nav
│   │   ├── page.tsx            # Dashboard
│   │   ├── login/page.tsx      # Admin login (email + password)
│   │   ├── profile/page.tsx    # Change own name/password
│   │   ├── users/page.tsx      # Manage admin accounts (super_admin only)
│   │   ├── experiences/        # CRUD for experiences
│   │   │   ├── page.tsx        # List
│   │   │   ├── form.tsx        # Shared form component
│   │   │   ├── new/page.tsx    # Create
│   │   │   └── [id]/page.tsx   # Edit
│   │   ├── events/             # CRUD for events
│   │   │   ├── page.tsx
│   │   │   ├── form.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── guides/             # CRUD for travel guides
│   │   │   ├── page.tsx
│   │   │   ├── form.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── destinations/       # Manage destinations
│   │   │   └── page.tsx
│   │   └── categories/         # Manage guide categories
│   │       └── page.tsx
│   └── api/                    # REST API routes
│       ├── login/route.ts      # Admin authentication (email + password)
│       ├── profile/route.ts    # Update own profile
│       ├── users/route.ts      # List / create admin users
│       ├── users/[id]/route.ts # Read / update / delete user
│       ├── experiences/route.ts
│       ├── experiences/[id]/route.ts
│       ├── events/route.ts
│       ├── events/[id]/route.ts
│       ├── guides/route.ts
│       ├── guides/[id]/route.ts
│       ├── destinations/route.ts
│       └── categories/route.ts
├── components/                 # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── StatBand.tsx
│   ├── ExperienceCard.tsx
│   ├── EventCard.tsx
│   ├── ArticleCard.tsx
│   ├── WhyYonihon.tsx
│   ├── Breadcrumb.tsx
│   ├── Gallery.tsx
│   ├── BookingForm.tsx
│   ├── ContactForm.tsx
│   ├── PartnerForm.tsx
│   ├── NewsletterForm.tsx
│   └── SearchInput.tsx
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.ts                 # Seed/fallback content data
│   ├── storage.ts              # File-based JSON persistence
│   ├── admin-auth.ts           # Login + session utilities
│   ├── session.ts              # Session serialization (Edge-safe)
│   ├── hash.ts                 # SHA-256 password hashing
│   ├── seed-users.ts           # Default admin accounts
│   ├── use-session.ts          # Client-side session hook
│   └── data-files/             # Live JSON data (auto-generated, gitignored)
└── middleware.ts               # Admin route protection + role gates
```

## Routes

### Public Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage with hero, trust bar, featured content |
| `/experience` | Static | Experience catalog with filters |
| `/experience/[slug]` | Dynamic | Single experience detail + booking |
| `/travel-guide` | Static | Travel guide archive with categories |
| `/travel-guide/[slug]` | Dynamic | Single guide article |
| `/event` | Static | Events archive with filters |
| `/event/[slug]` | Dynamic | Single event detail |
| `/about` | Static | About page |
| `/partners` | Static | Partners page with signup form |
| `/contact` | Static | Contact page with form |
| `/_not-found` | Static | 404 page |

### Admin Routes

All admin routes require authentication via the `yonihon_admin` session cookie. Access to specific pages is controlled by role.

| Route | Roles | Description |
|---|---|---|
| `/admin` | All | Dashboard overview |
| `/admin/login` | — | Login page (email + password) |
| `/admin/profile` | All | Change own name/password |
| `/admin/users` | super_admin only | Manage admin accounts |
| `/admin/experiences` | All (support = read-only) | List / manage experiences |
| `/admin/experiences/new` | super_admin, editor | Create a new experience |
| `/admin/experiences/[id]` | super_admin, editor | Edit an experience |
| `/admin/events` | All (support = read-only) | List / manage events |
| `/admin/events/new` | super_admin, editor | Create a new event |
| `/admin/events/[id]` | super_admin, editor | Edit an event |
| `/admin/guides` | All (support = read-only) | List / manage travel guides |
| `/admin/guides/new` | super_admin, editor | Create a new guide |
| `/admin/guides/[id]` | super_admin, editor | Edit a guide |
| `/admin/destinations` | super_admin, editor | Manage destinations |
| `/admin/categories` | super_admin, editor | Manage guide categories |

### API Routes

| Method | Endpoint | Auth Required | Action |
|---|---|---|---|
| POST | `/api/login` | — | Authenticate admin, set session cookie |
| PUT | `/api/profile` | Any session | Update own name or password |
| GET | `/api/users` | super_admin | List all admin users |
| POST | `/api/users` | super_admin | Create a new admin user |
| GET | `/api/users/[id]` | super_admin | Get user details |
| PUT | `/api/users/[id]` | super_admin | Update a user |
| DELETE | `/api/users/[id]` | super_admin | Delete a user |
| GET/POST | `/api/experiences` | POST: editor+ | List / create experiences |
| GET/PUT/DELETE | `/api/experiences/[id]` | PUT/DELETE: editor+ | Read / update / delete experience |
| GET/POST | `/api/events` | POST: editor+ | List / create events |
| GET/PUT/DELETE | `/api/events/[id]` | PUT/DELETE: editor+ | Read / update / delete event |
| GET/POST | `/api/guides` | POST: editor+ | List / create guides |
| GET/PUT/DELETE | `/api/guides/[id]` | PUT/DELETE: editor+ | Read / update / delete guide |
| GET/POST/PUT/DELETE | `/api/destinations` | Write: editor+ | Manage destinations |
| GET/POST/PUT/DELETE | `/api/categories` | Write: editor+ | Manage guide categories |

## Admin Accounts

Three default accounts are seeded on first run:

| Email | Password | Role |
|---|---|---|
| admin@yonihon.com | admin123 | super_admin |
| editor@yonihon.com | editor123 | editor |
| support@yonihon.com | support123 | support |

### Roles

| Role | Permissions |
|---|---|
| **super_admin** | Full access — manage all content, admin users, settings |
| **editor** | Create, edit, and delete content (experiences, events, guides, destinations, categories) |
| **support** | Read-only — can view all content pages but cannot create, edit, or delete |

Role gates are enforced at three layers:
1. **Middleware** (`src/middleware.ts`) — redirects unauthorized users
2. **API routes** — return 403 for write operations by support users
3. **UI** — hides buttons and disables forms for support users

## Content Model

| Type | Fields | Source File |
|---|---|---|
| **Experience** | title, slug, description, duration, price, location, images, meetingPoint, cancellationPolicy, host, etc. | `src/lib/data.ts:experiences` |
| **Event** | title, slug, excerpt, description, dates, location, category, tags, admission, etc. | `src/lib/data.ts:events` |
| **Guide** | title, slug, content (markdown), category, author, date, readTime, etc. | `src/lib/data.ts:guides` |
| **Destination** | name, slug | `src/lib/data.ts:destinations` |
| **GuideCategory** | name, slug, icon, article count | `src/lib/data.ts:guideCategories` |
| **AdminUser** | id, name, email, password, role, active, createdAt, lastLogin | `src/lib/seed-users.ts` |

Content is persisted to `src/lib/data-files/*.json`. On first read, seed data is copied from `src/lib/data.ts` into the JSON files.

## Components

### Layout Components
- **Header** — Sticky top nav; transparent/hamburger toggle on mobile; "Book Now" CTA
- **Footer** — 4-column layout with Explore, Company, Contact + copyright

### Content Components
- **Hero** — Full-width background image with gradient overlay, title, subtitle, optional children (CTAs)
- **StatBand** — Dark band with trust statistics (5,000+ Happy Travelers, etc.)
- **ExperienceCard** — Card with image, POPULAR badge, duration, location, price
- **EventCard** — Card with date badge overlay, location, tag pills (Free Entry, English Friendly, etc.)
- **ArticleCard** — Card with category badge, image, title, read time; supports featured and horizontal variants
- **WhyYonihon** — 4-column grid of value propositions
- **Breadcrumb** — Breadcrumb trail for detail pages

### Form Components
- **BookingForm** — Date picker, time slot, name, email, phone, party size, notes; "Reserve now, pay nothing today"
- **ContactForm** — Name, email, subject (dropdown), message
- **PartnerForm** — Name, email, workshop type, location, description
- **NewsletterForm** — Email input + subscribe button

### Media Components
- **Gallery** — Image grid with lightbox modal, prev/next navigation

## Customization

### Brand Colors

Defined as CSS custom properties in `src/app/globals.css`:

```css
--primary: #c53030;       /* Deep red — buttons, accents */
--primary-dark: #9b2c2c;
--accent: #d69e2e;        /* Gold — POPULAR badge */
--dark: #1a1a1a;          /* Header, footer, dark sections */
```

### Images

External image domains are whitelisted in `next.config.ts`:
- `images.unsplash.com` — Stock photography
- `yonihon.com` — WordPress media library

Add or modify `remotePatterns` in `next.config.ts` to use other image sources.

## Adding Content

### Via Admin Panel (Recommended)

Navigate to `/admin` and log in with your email and password. Use the sidebar to manage:

- **Experiences** — Create/edit/delete with full form (title, description, price, images, itinerary, etc.)
- **Events** — Create/edit/delete with date, location, category, tags, gallery
- **Travel Guides** — Create/edit/delete with markdown content, category, metadata
- **Destinations** — Add/remove location values used in filters
- **Categories** — Add/remove guide categories with icons
- **Users** — Create/edit/delete admin accounts (super_admin only)

All changes persist to `src/lib/data-files/*.json`.

### Via Code

Edit `src/lib/data.ts` directly to seed initial data. On first API request, the storage layer copies seed data into JSON files. Subsequent edits via the admin panel write to `src/lib/data-files/*.json` and override the seed defaults.

### Custom Admin Password

Set the `ADMIN_PASSWORD` environment variable to override the default `admin123` for the `admin@yonihon.com` account.

## Design Reference

This project was built by cloning the live [yonihon.com](https://yonihon.com/) site. For the full design audit, see [`yonihon-site-analysis.md`](./yonihon-site-analysis.md). For the rebuild specification, see [`yonihon_rebuild_spec.md`](./yonihon_rebuild_spec.md).

## Deployment

The site is ready for deployment on Vercel or Cloudflare Pages. Set the `ADMIN_PASSWORD` environment variable in your deployment platform for admin access.

**Note:** The file-based storage (`src/lib/data-files/*.json`) works locally but will not persist across deployments on serverless platforms (Vercel, Netlify, Cloudflare). For production, replace the storage layer with a database:

1. Create a PostgreSQL/SQLite table for each content type
2. Update the API route handlers in `src/app/api/` to read/write from the database
3. Update `src/lib/storage.ts` or replace it with database client calls

## License

Private — YoNihon brand and content belong to their respective owners.
