<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Current State

A clone of yonihon.com (Japan travel experience marketplace) with:

- **Public pages**: Home, Experiences (archive + detail), Events (archive + detail), Travel Guide (archive + detail), About, Partners, Contact, 404
- **15 reusable components**: Header, Footer, Hero, StatBand, ExperienceCard, EventCard, ArticleCard, WhyYonihon, Breadcrumb, Gallery, BookingForm, ContactForm, PartnerForm, NewsletterForm, SearchInput
- **Admin panel**: Dashboard, CRUD for all content types, user management, profile settings
- **Auth**: Email/password login with session cookie (`yonihon_admin`), SHA-256 hashed passwords
- **Roles**: `super_admin` (full), `editor` (content CRUD), `support` (read-only) — enforced at middleware, API, and UI layers
- **File-based storage**: `src/lib/data-files/*.json`, auto-seeded from `src/lib/data.ts`

## Key Architecture

| Concern | Implementation |
|---|---|
| Auth | Session cookie (base64 JSON blob with id/email/name/role), not httpOnly (needed for client-side role checks) |
| Storage | `src/lib/storage.ts` — sync `fs` reads/writes to JSON; auto-seeds on first access |
| Hashing | `src/lib/hash.ts` — sync `crypto.createHash("sha256")` with salt |
| Middleware | `src/middleware.ts` — protects `/admin/:path*`, gates `/admin/users` to super_admin |
| API auth | `src/lib/session.ts` — `getSession()` + `hasAccess()` used in all write handlers |
| Client auth | `src/lib/use-session.ts` — reads `document.cookie` (works because cookie is NOT httpOnly) |

## Default Accounts

| Email | Password | Role |
|---|---|---|
| admin@yonihon.com | admin123 | super_admin |
| editor@yonihon.com | editor123 | editor |
| support@yonihon.com | support123 | support |

## Important Caveats

- File-based storage does NOT persist across serverless deployments (Vercel/Netlify/Cloudflare)
- `process.cwd()` and `fs` in `storage.ts` cannot be imported by Edge Runtime (middleware imports `session.ts` instead)
- Changing the salt in `hash.ts` will invalidate existing `users.json`
