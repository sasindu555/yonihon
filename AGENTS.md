<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Current State

A clone of yonihon.com (Japan travel experience marketplace) deployed on Cloudflare via `@opennextjs/cloudflare`.

- **Public pages**: Home, Experiences (archive + detail), Events (archive + detail), Travel Guide (archive + detail), About, Partners, Contact, 404
- **15 reusable components**: Header, Footer, Hero, StatBand, ExperienceCard, EventCard, ArticleCard, WhyYonihon, Breadcrumb, Gallery, BookingForm, ContactForm, PartnerForm, NewsletterForm, SearchInput
- **Admin panel**: Dashboard, CRUD for all content types, user management, profile settings
- **Auth**: Email/password login with session cookie (`yonihon_admin`), SHA-256 hashed passwords (Web Crypto API)
- **Roles**: `super_admin` (full), `editor` (content CRUD), `support` (read-only) — enforced at middleware, API, and UI layers
- **Storage**: Cloudflare D1 (SQLite via `@opennextjs/cloudflare`), Cloudflare R2 for image uploads

## Key Architecture

| Concern | Implementation |
|---|---|
| Auth | Session cookie (base64 JSON blob with id/email/name/role), not httpOnly (needed for client-side role checks) |
| Storage | `src/lib/db.ts` — async D1 client wrapper with typed CRUD for all 8 tables; R2 bucket `UPLOADS` for images |
| Hashing | `src/lib/hash.ts` — Web Crypto API (`crypto.subtle.digest("SHA-256")`), no `Buffer` or Node `crypto` |
| Middleware | `src/middleware.ts` — protects `/admin/:path*`, gates `/admin/users` to super_admin |
| API auth | `src/lib/admin-auth.ts` — `getSession()` + `hasAccess()` used in all write handlers |
| Client auth | `src/lib/use-session.ts` — reads `document.cookie` (works because cookie is NOT httpOnly) |
| Static UI data | `src/lib/data.ts` — JS arrays for destinations, categories, event types, popular tags |
| Adapter | `@opennextjs/cloudflare` with `wrangler.jsonc`, D1 binding `DB`, R2 binding `UPLOADS` |

## Default Accounts

| Email | Password | Role |
|---|---|---|
| admin@yonihon.com | admin123 | super_admin |
| editor@yonihon.com | editor123 | editor |
| support@yonihon.com | support123 | support |

## Important Caveats

- All pages that use D1 (`@/lib/db`) must have `export const dynamic = "force-dynamic"` — otherwise static generation fails at build time because `getCloudflareContext()` needs a request context.
- D1 remote must be seeded separately: `npx wrangler d1 execute yonihon --remote --file=migrations/0001_init.sql`
- `next dev` works locally (via `initOpenNextCloudflareForDev()` in `next.config.ts`); deploy uses `npx opennextjs-cloudflare build` + `npx wrangler deploy`
- `marked` library and TipTap editor run under `nodejs_compat` — confirmed no build errors.
- `request.json()` returns `unknown` in Next.js 16 — all API routes must cast the result (e.g. `as any` or `as SomeType`).
- `.then(r => r.json())` in client components returns `unknown` — must use `as` assertions to avoid TS errors.

## Build / Deploy

```bash
npm run build        # next build (local dev compile check)
npx opennextjs-cloudflare build   # full Cloudflare build → .open-next/
npx wrangler deploy               # deploy to Cloudflare Workers
npx wrangler d1 execute yonihon --remote --file=migrations/0001_init.sql  # seed remote DB
```
