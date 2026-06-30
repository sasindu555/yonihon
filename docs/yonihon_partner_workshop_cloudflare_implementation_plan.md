# YoNihon Partner Workshop Management and Booking System

## Complete Cloudflare Implementation Plan

This document is an implementation-ready plan for building the Partner Workshop Management and Booking system on Cloudflare. It is designed so an AI coding agent can use it as a project specification and implementation checklist.

---

## 1. Project Goal

Build a full partner workshop management and booking platform where:

- Users can register as workshop partners.
- Partners can create and manage workshops.
- Admins can approve or reject workshops.
- Customers can browse approved workshops on `/experience`.
- Customers can book workshops using available dates and time slots.
- Partners can approve, reject, cancel, or reschedule bookings.
- Customers and partners can communicate inside reservation-specific message threads.
- Reservation messages can sync with email replies.
- Customers can request amendments or reschedules.
- Admins can moderate workshop reviews.
- Partners can view performance dashboards.
- Confirmed reservations can generate digital reservation tickets.

---

## 2. Recommended Cloudflare Stack

Use the following Cloudflare services:

| Requirement | Recommended Cloudflare Service |
|---|---|
| Frontend hosting | Cloudflare Pages |
| API/backend | Cloudflare Workers |
| Database | Cloudflare D1 |
| File/image storage | Cloudflare R2 |
| Async jobs | Cloudflare Queues |
| Scheduled cleanup jobs | Cloudflare Cron Triggers |
| Inbound email reply handling | Cloudflare Email Routing / Email Service with Workers email handler |
| Outbound transactional email | Cloudflare Email Service if available on your plan, or Resend/MailChannels/SendGrid as fallback |
| Session/auth cookies | Workers + secure HTTP-only cookies |
| Admin/partner/customer access control | Role-based authorization in Workers API |
| Optional rate limiting | Cloudflare WAF / Turnstile / custom Workers middleware |
| Optional bot protection | Cloudflare Turnstile |

---

## 3. Suggested Technology Stack

### Frontend

Use one of these options:

- Next.js on Cloudflare Pages
- Remix on Cloudflare Pages
- Astro + React islands
- Vite + React

Recommended option:

```txt
Frontend: Next.js or Remix
UI: Tailwind CSS
Forms: React Hook Form + Zod
Calendar UI: FullCalendar, React Big Calendar, or custom date/time slot UI
API calls: Fetch wrapper with typed endpoints
```

### Backend

Recommended backend stack:

```txt
Runtime: Cloudflare Workers
Framework: Hono
Validation: Zod
Database ORM: Drizzle ORM with D1 SQLite
Migrations: Drizzle Kit or Wrangler D1 migrations
Auth: Lucia-style custom auth or Better Auth adapted for Workers
Storage: R2
Queue processing: Cloudflare Queues
Email inbound: Workers email() handler
```

### Repository Structure

Use a monorepo:

```txt
yonihon-workshops/
  apps/
    web/                  # Cloudflare Pages frontend
    api/                  # Cloudflare Workers API
  packages/
    db/                   # Drizzle schema, migrations, DB utilities
    shared/               # Shared types, constants, validators
    emails/               # Email templates
  docs/
    implementation-plan.md
  wrangler.toml
  package.json
  pnpm-workspace.yaml
```

---

## 4. High-Level Architecture

```txt
Customer / Partner / Admin
        |
        v
Cloudflare Pages Frontend
        |
        v
Cloudflare Workers API
        |
        +--> D1 Database
        +--> R2 Storage
        +--> Queues for async email/jobs
        +--> Email Routing Worker for inbound replies
        +--> Cron Triggers for cleanup and expiry jobs
```

### Main Applications

Create three dashboard areas:

```txt
/experience              Public workshop listing
/workshops/:slug         Public workshop details and booking flow
/partners                Partner registration page
/partner/dashboard       Partner dashboard
/customer/dashboard      Customer dashboard
/admin/dashboard         Admin dashboard
```

---

## 5. User Roles

Implement these roles:

| Role | Description |
|---|---|
| Guest | Can browse approved workshops and start registration/login |
| Customer | Can book workshops, message partners, request amendments, submit reviews |
| Partner | Can create workshops, manage availability, manage bookings, message customers, view metrics |
| Admin | Can approve workshops, moderate reviews, manage partner limits, view audit history |

A user may have multiple roles, for example a partner can also be a customer.

---

## 6. Core Status Values

### Workshop Statuses

```txt
pending
approved
rejected
suspended
```

### Booking Statuses

```txt
requested
pending_partner_review
alternative_suggested
awaiting_customer
confirmed
checked_in
completed
cancelled_by_customer
cancelled_by_partner
expired
no_show
amendment_requested
rescheduled
```

### Review Statuses

```txt
pending
published
rejected
```

### Amendment Statuses

```txt
pending
approved
rejected
cancelled
completed
```

### Message Source Values

```txt
yonihon
email_reply
system
```

---

## 7. Database Design

Use Cloudflare D1 with SQLite-compatible schema.

### 7.1 users

Stores customer, partner, and admin user accounts.

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  is_email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### 7.2 user_roles

```sql
CREATE TABLE user_roles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'partner', 'admin')),
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_user_roles_unique ON user_roles(user_id, role);
```

### 7.3 sessions

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 7.4 partners

```sql
CREATE TABLE partners (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  business_description TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 7.5 partner_limits

```sql
CREATE TABLE partner_limits (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL UNIQUE,
  max_workshops INTEGER NOT NULL DEFAULT 3,
  updated_by TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (partner_id) REFERENCES partners(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);
```

### 7.6 workshops

```sql
CREATE TABLE workshops (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  price_amount INTEGER NOT NULL,
  price_currency TEXT NOT NULL DEFAULT 'JPY',
  duration_minutes INTEGER NOT NULL,
  language TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  suspended_reason TEXT,
  popularity_score INTEGER NOT NULL DEFAULT 0,
  average_rating REAL NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  submitted_at TEXT,
  approved_at TEXT,
  approved_by TEXT,
  FOREIGN KEY (partner_id) REFERENCES partners(id),
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE INDEX idx_workshops_status ON workshops(status);
CREATE INDEX idx_workshops_partner ON workshops(partner_id);
CREATE INDEX idx_workshops_filters ON workshops(location, category, price_amount, duration_minutes, language);
```

### 7.7 workshop_images

```sql
CREATE TABLE workshop_images (
  id TEXT PRIMARY KEY,
  workshop_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id)
);
```

### 7.8 workshop_dates

```sql
CREATE TABLE workshop_dates (
  id TEXT PRIMARY KEY,
  workshop_id TEXT NOT NULL,
  date TEXT NOT NULL,
  is_available INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id)
);

CREATE UNIQUE INDEX idx_workshop_dates_unique ON workshop_dates(workshop_id, date);
```

### 7.9 workshop_time_slots

```sql
CREATE TABLE workshop_time_slots (
  id TEXT PRIMARY KEY,
  workshop_date_id TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  capacity_total INTEGER NOT NULL,
  capacity_booked INTEGER NOT NULL DEFAULT 0,
  is_available INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (workshop_date_id) REFERENCES workshop_dates(id)
);

CREATE UNIQUE INDEX idx_time_slot_unique ON workshop_time_slots(workshop_date_id, start_time, end_time);
```

### 7.10 bookings

```sql
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  reservation_number TEXT NOT NULL UNIQUE,
  customer_id TEXT NOT NULL,
  partner_id TEXT NOT NULL,
  workshop_id TEXT NOT NULL,
  workshop_date_id TEXT NOT NULL,
  time_slot_id TEXT NOT NULL,
  participant_count INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'requested',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  special_requirements TEXT,
  confirmed_at TEXT,
  cancelled_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (partner_id) REFERENCES partners(id),
  FOREIGN KEY (workshop_id) REFERENCES workshops(id),
  FOREIGN KEY (workshop_date_id) REFERENCES workshop_dates(id),
  FOREIGN KEY (time_slot_id) REFERENCES workshop_time_slots(id)
);

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_partner ON bookings(partner_id);
CREATE INDEX idx_bookings_workshop ON bookings(workshop_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_reservation_number ON bookings(reservation_number);
```

### 7.11 booking_alternative_slots

Stores alternative date/time options selected by the customer.

```sql
CREATE TABLE booking_alternative_slots (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  workshop_date_id TEXT NOT NULL,
  time_slot_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (workshop_date_id) REFERENCES workshop_dates(id),
  FOREIGN KEY (time_slot_id) REFERENCES workshop_time_slots(id)
);
```

### 7.12 booking_amendment_requests

```sql
CREATE TABLE booking_amendment_requests (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  old_workshop_date_id TEXT NOT NULL,
  old_time_slot_id TEXT NOT NULL,
  requested_workshop_date_id TEXT NOT NULL,
  requested_time_slot_id TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at TEXT,
  review_comment TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);
```

### 7.13 booking_messages

```sql
CREATE TABLE booking_messages (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  sender_user_id TEXT,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'partner', 'admin', 'system')),
  source TEXT NOT NULL CHECK (source IN ('yonihon', 'email_reply', 'system')),
  body TEXT NOT NULL,
  email_message_id TEXT,
  inbound_email_from TEXT,
  delivery_status TEXT,
  sync_status TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (sender_user_id) REFERENCES users(id)
);

CREATE INDEX idx_booking_messages_booking ON booking_messages(booking_id);
CREATE INDEX idx_booking_messages_email_id ON booking_messages(email_message_id);
```

### 7.14 booking_email_threads

Used for two-way email synchronization.

```sql
CREATE TABLE booking_email_threads (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  reply_token_hash TEXT NOT NULL UNIQUE,
  reply_address TEXT NOT NULL UNIQUE,
  last_message_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

### 7.15 booking_history

Append-only audit log.

```sql
CREATE TABLE booking_history (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  actor_user_id TEXT,
  actor_type TEXT NOT NULL,
  action_type TEXT NOT NULL,
  previous_value TEXT,
  new_value TEXT,
  comment TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (actor_user_id) REFERENCES users(id)
);

CREATE INDEX idx_booking_history_booking ON booking_history(booking_id);
```

### 7.16 booking_status_transitions

```sql
CREATE TABLE booking_status_transitions (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT,
  reason TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (changed_by) REFERENCES users(id)
);
```

### 7.17 reservation_tickets

```sql
CREATE TABLE reservation_tickets (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  ticket_number TEXT NOT NULL UNIQUE,
  ticket_status TEXT NOT NULL DEFAULT 'active',
  qr_code_r2_key TEXT,
  wallet_pass_r2_key TEXT,
  generated_at TEXT NOT NULL,
  revoked_at TEXT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

### 7.18 workshop_reviews

```sql
CREATE TABLE workshop_reviews (
  id TEXT PRIMARY KEY,
  workshop_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  booking_id TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  moderated_by TEXT,
  moderation_comment TEXT,
  moderated_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (moderated_by) REFERENCES users(id)
);

CREATE INDEX idx_reviews_workshop ON workshop_reviews(workshop_id);
CREATE INDEX idx_reviews_status ON workshop_reviews(status);
```

### 7.19 email_jobs

Optional table for tracking email queue status.

```sql
CREATE TABLE email_jobs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  related_entity_type TEXT,
  related_entity_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

---

## 8. API Design

Use REST APIs under `/api`.

### 8.1 Auth APIs

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
```

### 8.2 Partner APIs

```txt
POST   /api/partners/register
GET    /api/partners/me
PATCH  /api/partners/me
GET    /api/partners/me/limits
GET    /api/partners/me/metrics
```

### 8.3 Workshop APIs

```txt
POST   /api/partner/workshops
GET    /api/partner/workshops
GET    /api/partner/workshops/:id
PATCH  /api/partner/workshops/:id
POST   /api/partner/workshops/:id/submit
POST   /api/partner/workshops/:id/suspend
POST   /api/partner/workshops/:id/images
DELETE /api/partner/workshops/:id/images/:imageId
```

### 8.4 Availability APIs

```txt
GET    /api/partner/workshops/:id/availability
POST   /api/partner/workshops/:id/dates
PATCH  /api/partner/workshops/:id/dates/:dateId
DELETE /api/partner/workshops/:id/dates/:dateId
POST   /api/partner/workshops/:id/dates/:dateId/time-slots
PATCH  /api/partner/workshops/:id/time-slots/:slotId
DELETE /api/partner/workshops/:id/time-slots/:slotId
```

### 8.5 Public Experience APIs

```txt
GET    /api/workshops
GET    /api/workshops/:slug
GET    /api/workshops/:slug/availability
GET    /api/workshops/:slug/reviews
```

Query examples:

```txt
/api/workshops?location=Tokyo&category=Cooking&priceMin=1000&priceMax=10000&duration=120&language=English&sort=rating
```

### 8.6 Booking APIs

```txt
POST   /api/bookings
GET    /api/customer/bookings
GET    /api/customer/bookings/:id
POST   /api/customer/bookings/:id/cancel
POST   /api/customer/bookings/:id/amendments
GET    /api/customer/bookings/:id/ticket
```

### 8.7 Partner Booking APIs

```txt
GET    /api/partner/bookings
GET    /api/partner/bookings/:id
POST   /api/partner/bookings/:id/confirm
POST   /api/partner/bookings/:id/reject
POST   /api/partner/bookings/:id/cancel
POST   /api/partner/bookings/:id/suggest-alternatives
POST   /api/partner/bookings/:id/check-in
POST   /api/partner/bookings/:id/complete
GET    /api/partner/bookings/:id/history
GET    /api/partner/bookings/:id/messages
```

### 8.8 Amendment APIs

```txt
GET    /api/partner/amendments
GET    /api/partner/amendments/:id
POST   /api/partner/amendments/:id/approve
POST   /api/partner/amendments/:id/reject
```

### 8.9 Messaging APIs

```txt
GET    /api/bookings/:id/messages
POST   /api/bookings/:id/messages
```

### 8.10 Review APIs

```txt
POST   /api/workshops/:id/reviews
GET    /api/customer/reviews
GET    /api/admin/reviews?status=pending
POST   /api/admin/reviews/:id/publish
POST   /api/admin/reviews/:id/reject
```

### 8.11 Admin APIs

```txt
GET    /api/admin/workshops?status=pending
GET    /api/admin/workshops/:id
POST   /api/admin/workshops/:id/approve
POST   /api/admin/workshops/:id/reject
GET    /api/admin/partners
GET    /api/admin/partners/:id
PATCH  /api/admin/partners/:id/limits
GET    /api/admin/bookings
GET    /api/admin/bookings/:id
GET    /api/admin/bookings/:id/history
GET    /api/admin/bookings/:id/messages
GET    /api/admin/metrics
```

---

## 9. Key Workflow Implementation

## 9.1 Partner Registration Workflow

1. User submits partner registration form on `/partners`.
2. Validate form using Zod.
3. Create user if not already logged in.
4. Assign `partner` role.
5. Create partner profile.
6. Create partner limit record with `max_workshops = 3`.
7. Queue email to partner confirming registration.
8. Queue email to admin notifying new partner registration.
9. Redirect partner to `/partner/dashboard`.

Acceptance criteria:

- Partner profile is created successfully.
- Partner role is assigned.
- Default workshop limit is 3.
- Partner and admin receive email notifications.

---

## 9.2 Workshop Creation Workflow

1. Partner clicks `Create Workshop`.
2. API checks partner's current workshop count.
3. API checks `partner_limits.max_workshops`.
4. If limit reached, return validation error.
5. Partner enters workshop details.
6. Partner uploads images to R2.
7. Workshop is created with `pending` status.
8. Partner creates available dates and time slots.
9. Partner submits workshop for admin approval.

Acceptance criteria:

- Partner cannot exceed assigned workshop limit.
- Workshop remains hidden from `/experience` until approved.
- Workshop images are stored in R2.
- Availability is linked to the workshop.

---

## 9.3 Admin Workshop Approval Workflow

1. Admin opens pending workshops list.
2. Admin reviews workshop details, images, dates, and slots.
3. Admin approves or rejects.
4. If approved:
   - Set status to `approved`.
   - Set `approved_at` and `approved_by`.
   - Send email notification to partner.
5. If rejected:
   - Set status to `rejected`.
   - Save rejection reason.
   - Send email notification to partner.

Acceptance criteria:

- Approved workshops appear on `/experience`.
- Rejected workshops show rejection reason in partner dashboard.
- Status changes create audit records.

---

## 9.4 Workshop Editing Workflow

1. Partner edits workshop.
2. If workshop status is `approved` or `rejected`, set status back to `pending` after submission.
3. Hide edited workshop from `/experience` until admin approves again.
4. Notify admin if required.

Acceptance criteria:

- Edited approved workshops require re-approval.
- Suspended workshops stay hidden.

---

## 9.5 Public Workshop Listing Workflow

`/experience` should show only:

```txt
status = approved
not suspended
has available slots
```

Filtering:

- Location
- Category
- Price
- Duration
- Language

Sorting:

- Popularity
- Price
- Rating

Acceptance criteria:

- Filters and sorting work together.
- Hidden/pending/rejected/suspended workshops do not appear.

---

## 9.6 Booking Creation Workflow

1. Customer selects workshop, date, time slot, and participant count.
2. Customer optionally selects alternative dates/time slots.
3. Customer submits booking.
4. API validates:
   - Workshop is approved.
   - Date belongs to workshop.
   - Slot belongs to selected date.
   - Slot has enough capacity.
   - User is authenticated or completes required guest-to-customer account creation flow.
5. Create booking with unique Reservation Number.
6. Increment `capacity_booked` for the selected time slot.
7. Save alternative slots.
8. Create booking email thread and secure reply token.
9. Create booking history record.
10. Queue email to partner.
11. Queue email to customer.

Important concurrency rule:

- Capacity update must be done atomically.
- Use conditional SQL update:

```sql
UPDATE workshop_time_slots
SET capacity_booked = capacity_booked + ?
WHERE id = ?
  AND is_available = 1
  AND capacity_booked + ? <= capacity_total;
```

Only create the booking if the update succeeds.

Acceptance criteria:

- Overbooking is prevented.
- Booking receives Reservation Number.
- Partner and customer receive email notifications.
- Booking status starts as `requested` or `pending_partner_review`.

---

## 9.7 Partner Booking Confirmation Workflow

1. Partner views new booking request.
2. Partner can confirm, reject, cancel, or suggest alternatives.
3. If confirmed:
   - Set booking status to `confirmed`.
   - Set `confirmed_at`.
   - Generate digital ticket.
   - Queue confirmation email.
4. If rejected/cancelled:
   - Update status.
   - Release booked capacity.
   - Queue notification email.
5. If alternatives are suggested:
   - Set status to `alternative_suggested`.
   - Send customer email.

Acceptance criteria:

- Customer is notified of status change.
- Capacity is released when booking is cancelled or rejected.
- Confirmed booking creates a digital ticket.

---

## 9.8 Booking Amendment / Reschedule Workflow

1. Customer opens reservation details.
2. Customer requests date/time change.
3. API validates requested slot belongs to same workshop and has capacity.
4. Create amendment request with `pending` status.
5. Set booking status to `amendment_requested`.
6. Queue partner email.
7. Partner reviews amendment.
8. If approved:
   - Atomically release old slot capacity.
   - Atomically reserve new slot capacity.
   - Update booking date/time slot.
   - Set amendment status to `completed`.
   - Set booking status to `rescheduled` or `confirmed` depending on business rules.
   - Create booking history records.
   - Queue customer email.
9. If rejected:
   - Keep original booking unchanged.
   - Set amendment status to `rejected`.
   - Restore booking status to previous valid status.
   - Queue customer email.

Acceptance criteria:

- Original and requested reservation details are visible together.
- Availability is safely recalculated.
- All actions are stored in booking history.

---

## 9.9 Booking Change Indicator Workflow

Derive dashboard badges from booking status and recent history.

Badge logic examples:

```txt
NEW           booking created and not yet viewed by partner
AMENDED       pending amendment exists
RESCHEDULED   latest completed amendment changed date/time
CANCELLED     booking status starts with cancelled
PENDING       status is requested, pending_partner_review, awaiting_customer, amendment_requested
```

Implementation options:

Option 1: Derive badges dynamically from booking status/history.

Option 2: Store `badge_type` and `badge_updated_at` on a booking indicator table.

Recommended:

- Start with derived badges.
- Add stored badge table only if dashboard queries become slow.

---

## 9.10 Booking Messaging Workflow

1. Customer or partner opens booking messages.
2. API checks authorization:
   - Related customer can view/send.
   - Related partner can view/send.
   - Admin can view for support.
3. User submits message.
4. Store message in `booking_messages` with `source = yonihon`.
5. Queue recipient email notification.
6. Email includes:
   - Reservation Number
   - Message preview
   - Secure reply-to address
   - Link to booking conversation

Acceptance criteria:

- Messages are visible in one reservation thread.
- Unauthorized users cannot view or send messages.

---

## 9.11 Two-Way Email Reply Sync Workflow

Use Cloudflare Email Routing / Email Service to route inbound emails to a Worker email handler.

Recommended reply address format:

```txt
reservation+<bookingId>.<token>@messages.yonihon.com
```

Better secure option:

```txt
reservation+<opaqueThreadId>@messages.yonihon.com
```

Implementation steps:

1. When a booking is created, generate a secure random reply token.
2. Store only a hash of the token in `booking_email_threads`.
3. Generate a reply address or include secure token in headers.
4. Outbound message notification uses this reply address as `Reply-To`.
5. Incoming email hits Cloudflare Worker `email()` handler.
6. Worker parses recipient, sender, headers, and body.
7. Worker resolves booking email thread.
8. Worker validates sender:
   - Must match customer email, partner email, or authorized admin email.
9. Worker strips quoted content and signatures where possible.
10. Worker creates `booking_messages` record with `source = email_reply`.
11. Worker queues notification to the other party if needed.
12. Worker rejects or ignores invalid/untrusted messages.

Security requirements:

- Do not trust visible email body content to identify a booking.
- Validate reply token/thread identifier.
- Validate sender email against allowed participants.
- Store inbound `Message-ID` and ignore duplicates.
- Sanitize HTML email content before displaying.

Acceptance criteria:

- Email replies appear in the correct reservation thread.
- Replies do not create duplicate conversations.
- Unauthorized senders cannot inject messages.

---

## 9.12 Review Submission and Admin Moderation Workflow

1. Logged-in customer submits rating/review.
2. API validates:
   - User is logged in.
   - Rating is 1 to 5.
   - Optional: user has a confirmed/completed booking for the workshop.
3. Review status is set to `pending`.
4. Partner may receive a notification that a review was submitted.
5. Admin reviews pending reviews.
6. Admin publishes or rejects.
7. If published:
   - Update review status.
   - Recalculate workshop average rating and review count.
   - Send notification to review user.
8. If rejected:
   - Keep review hidden publicly.
   - Store moderation comment.

Acceptance criteria:

- Partners cannot publish or reject reviews.
- Only published reviews affect public rating.
- Admin moderation history is stored.

---

## 9.13 Digital Reservation Ticket Workflow

When a booking is confirmed:

1. Generate reservation ticket record.
2. Generate QR code payload.
3. Store QR image in R2.
4. Customer can view ticket in dashboard.
5. Partner can scan/search Reservation Number during check-in.

Ticket should include:

- Reservation Number
- Workshop name
- Customer name
- Date/time
- Number of participants
- Workshop location
- Meeting instructions

Optional wallet support:

- Apple Wallet pass generation usually requires Apple Developer certificates.
- Google Wallet usually requires Google Wallet issuer setup.
- Implement wallet support as phase 2 unless certificates and issuer accounts are ready.

---

## 10. Email System Design

### 10.1 Email Templates

Create templates for:

```txt
partner-registration-confirmation
admin-new-partner-registration
workshop-approved
workshop-rejected
booking-created-customer
booking-created-partner
booking-confirmed
booking-cancelled
booking-alternative-suggested
booking-amendment-requested
booking-amendment-approved
booking-amendment-rejected
reservation-message-notification
review-submitted-partner
review-published-customer
password-reset
email-verification
```

### 10.2 Email Queue Flow

Do not send most emails directly inside the API request. Queue them.

```txt
API action
  -> insert related DB record
  -> create email job
  -> push message to Cloudflare Queue
  -> queue consumer sends email
  -> update email job status
```

### 10.3 Outbound Email Provider

Preferred:

- Cloudflare Email Service if available for your account/plan.

Fallback options:

- Resend
- SendGrid
- Postmark
- MailChannels
- Amazon SES

Use an adapter pattern:

```ts
interface EmailProvider {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}
```

This lets the AI agent switch providers without changing business logic.

---

## 11. Cloudflare Configuration

### 11.1 wrangler.toml Example

```toml
name = "yonihon-workshops-api"
main = "src/index.ts"
compatibility_date = "2026-06-29"

[vars]
APP_ENV = "production"
APP_URL = "https://yonihon.com"
EMAIL_FROM = "YoNihon <no-reply@yonihon.com>"
MESSAGING_EMAIL_DOMAIN = "messages.yonihon.com"

[[d1_databases]]
binding = "DB"
database_name = "yonihon-workshops"
database_id = "REPLACE_WITH_D1_DATABASE_ID"

[[r2_buckets]]
binding = "R2"
bucket_name = "yonihon-workshop-assets"

[[queues.producers]]
binding = "EMAIL_QUEUE"
queue = "yonihon-email-queue"

[[queues.consumers]]
queue = "yonihon-email-queue"
max_batch_size = 10
max_batch_timeout = 30

[triggers]
crons = ["*/15 * * * *", "0 0 * * *"]
```

Secrets:

```bash
npx wrangler secret put SESSION_SECRET
npx wrangler secret put EMAIL_SECRET
npx wrangler secret put EMAIL_PROVIDER_API_KEY
npx wrangler secret put ADMIN_NOTIFICATION_EMAIL
```

### 11.2 Cloudflare Resources to Create

```bash
# D1 database
npx wrangler d1 create yonihon-workshops

# R2 bucket
npx wrangler r2 bucket create yonihon-workshop-assets

# Queue
npx wrangler queues create yonihon-email-queue

# Optional dead letter queue
npx wrangler queues create yonihon-email-dead-letter-queue
```

---

## 12. Security Requirements

### 12.1 Authentication

- Use secure HTTP-only cookies.
- Set `SameSite=Lax` or `Strict` depending on flow.
- Set `Secure` in production.
- Store only hashed session tokens in DB if using token-based sessions.
- Rotate sessions after login.

### 12.2 Authorization

Every protected endpoint must check:

- User is authenticated.
- User has required role.
- User owns the resource or has admin access.

Examples:

```txt
Partner can edit only their own workshops.
Partner can manage only bookings for their own workshops.
Customer can view only their own bookings.
Admin can view all bookings for support.
Only admin can approve workshops.
Only admin can moderate reviews.
```

### 12.3 Input Validation

Use shared Zod schemas for frontend and backend validation.

Validate:

- Partner registration
- Workshop details
- Availability date/time slots
- Booking details
- Amendment requests
- Messages
- Reviews
- Admin approval/rejection forms

### 12.4 Anti-Abuse

Add:

- Cloudflare Turnstile on registration, login, partner signup, booking, and review forms.
- Rate limiting middleware for auth, booking, messaging, and email endpoints.
- HTML sanitization for messages and reviews.
- Audit logs for admin actions.

### 12.5 Email Reply Security

- Use opaque reply tokens.
- Hash reply tokens in database.
- Check sender email against booking participants.
- Deduplicate by email `Message-ID`.
- Sanitize inbound email HTML.
- Strip attachments unless explicitly supported.
- Log rejected inbound emails for admin troubleshooting.

---

## 13. Performance and Scalability Notes

### D1

- Keep transactions small.
- Use indexes on status, partner, customer, workshop, and reservation number fields.
- Use pagination for all listing endpoints.
- Avoid large joins for dashboards; use summary queries or precomputed metrics if needed.

### R2

- Store uploaded workshop images, QR codes, and optional wallet pass files.
- Store only R2 keys in D1.
- Generate signed URLs for private files like tickets if needed.

### Queues

Use queues for:

- Transactional emails
- Ticket generation
- Review/rating recalculation
- Dashboard metric precomputation
- Webhook-style async processing

### Cron Triggers

Use scheduled Workers for:

- Expiring old pending bookings
- Marking no-shows if required
- Cleaning stale sessions
- Retrying failed email jobs
- Recalculating popularity scores

---

## 14. Frontend Pages and Components

### 14.1 Public Pages

```txt
/partners
/experience
/workshops/:slug
/login
/register
```

### 14.2 Customer Dashboard

```txt
/customer/dashboard
/customer/bookings
/customer/bookings/:id
/customer/bookings/:id/messages
/customer/bookings/:id/ticket
/customer/reviews
```

Components:

- Booking card
- Reservation status badge
- Amendment request form
- Message thread
- Digital ticket view
- Review form

### 14.3 Partner Dashboard

```txt
/partner/dashboard
/partner/workshops
/partner/workshops/new
/partner/workshops/:id/edit
/partner/workshops/:id/availability
/partner/bookings
/partner/bookings/:id
/partner/bookings/:id/messages
/partner/reviews
/partner/metrics
```

Components:

- Workshop limit banner
- Workshop status badge
- Calendar availability manager
- Time slot capacity editor
- Booking list with badges
- Booking detail panel
- Amendment approval panel
- Performance dashboard cards

### 14.4 Admin Dashboard

```txt
/admin/dashboard
/admin/workshops/pending
/admin/workshops/:id
/admin/partners
/admin/partners/:id
/admin/bookings
/admin/bookings/:id
/admin/reviews
/admin/metrics
```

Components:

- Pending workshop queue
- Approval/rejection form
- Partner workshop limit editor
- Booking lookup by Reservation Number
- Booking history view
- Message history view
- Review moderation queue

---

## 15. UI/UX Requirements

### Status Badges

Use consistent badge labels:

```txt
Workshop: Pending, Approved, Rejected, Suspended
Booking: Requested, Pending Review, Confirmed, Rescheduled, Cancelled, Completed
Review: Pending, Published, Rejected
Change indicators: NEW, AMENDED, RESCHEDULED, CANCELLED, PENDING
```

### Calendar UX

Partner availability manager should allow:

- Add available date
- Add multiple time slots per date
- Set capacity per time slot
- Disable date
- Disable time slot
- Bulk copy slots to another date

### Booking UX

Customer booking flow should show:

- Available dates only
- Available slots only
- Remaining capacity if useful
- Primary date/time selection
- Alternative date/time selections
- Reservation Number after submission

---

## 16. Business Rules

### Workshop Limit

- Default max workshops per partner: 3.
- Admin can update per partner.
- Suspended workshops should still count toward the limit unless business decides otherwise.
- Deleted workshops should not exist in phase 1; use suspension/archive instead.

### Booking Capacity

- Capacity is based on participant count, not only booking count.
- If participant count is 3, reduce available capacity by 3.
- Prevent concurrent overbooking using conditional updates.

### Booking Cancellation

- Customer cancellation should release capacity if booking was holding capacity.
- Partner cancellation should release capacity.
- Store cancellation reason if provided.

### Review Moderation

- Admin is the source of truth.
- Partners cannot publish or reject reviews.
- Only published reviews affect rating.

### Messaging

- Messages are tied to a booking.
- Messages are visible only to related customer, related partner, and authorized admins.
- Email replies sync into the same thread only after sender and token validation.

---

## 17. Testing Plan

### 17.1 Unit Tests

Test:

- Validation schemas
- Role authorization helpers
- Reservation Number generation
- Status transition logic
- Capacity calculation
- Badge derivation
- Email reply token generation and validation

### 17.2 Integration Tests

Test:

- Partner registration creates user role, partner profile, and limit record.
- Partner cannot exceed workshop limit.
- Workshop approval makes workshop public.
- Rejected workshop stores reason.
- Booking creation reduces capacity.
- Concurrent booking attempts do not overbook.
- Booking cancellation restores capacity.
- Amendment approval moves capacity from old slot to new slot.
- Email reply creates booking message.
- Admin review moderation updates rating.

### 17.3 End-to-End Tests

Use Playwright.

Critical E2E flows:

1. Partner registers and creates workshop.
2. Admin approves workshop.
3. Customer books workshop.
4. Partner confirms booking.
5. Customer views ticket.
6. Customer sends message.
7. Partner receives message and replies.
8. Customer requests amendment.
9. Partner approves amendment.
10. Customer submits review.
11. Admin publishes review.

---

## 18. Deployment Plan

### Phase 1: Project Setup

- Create monorepo.
- Set up frontend app.
- Set up Workers API with Hono.
- Set up D1 schema and migrations.
- Set up R2 bucket.
- Set up Queues.
- Configure environments: local, staging, production.

### Phase 2: Auth and Roles

- Implement registration/login/logout.
- Implement sessions.
- Implement roles.
- Add middleware for auth and authorization.

### Phase 3: Partner and Workshop Management

- Partner registration.
- Partner dashboard.
- Workshop CRUD.
- Workshop limit enforcement.
- Image uploads to R2.
- Availability calendar and time slots.

### Phase 4: Admin Approval

- Admin dashboard.
- Pending workshop review queue.
- Approve/reject workflow.
- Rejection reasons.
- Status notification emails.

### Phase 5: Public Experience and Booking

- `/experience` listing.
- Filtering and sorting.
- Workshop detail page.
- Booking form.
- Reservation Number generation.
- Capacity-safe booking creation.
- Customer and partner booking dashboards.

### Phase 6: Booking Management

- Partner confirm/cancel/reject.
- Suggest alternatives.
- Customer accept alternative.
- Booking status transitions.
- Booking history.
- Booking badges.

### Phase 7: Messaging and Email Sync

- In-platform booking messages.
- Message notification emails.
- Cloudflare inbound email Worker.
- Reply token validation.
- Email-to-thread synchronization.

### Phase 8: Amendments and Reschedules

- Customer amendment request.
- Partner amendment approval/rejection.
- Capacity-safe rescheduling.
- Amendment notifications.
- Audit history.

### Phase 9: Reviews

- Customer review submission.
- Admin moderation.
- Published review display.
- Rating recalculation.

### Phase 10: Tickets and Check-In

- Digital ticket generation.
- QR code generation.
- Customer ticket view.
- Partner/admin reservation lookup.
- Check-in and completion actions.

### Phase 11: Reporting and Polish

- Partner metrics dashboard.
- Admin metrics dashboard.
- Cron cleanup jobs.
- Email retry handling.
- Security hardening.
- E2E testing.
- Production deployment.

---

## 19. AI Agent Implementation Instructions

Give the AI agent the following execution rules:

1. Implement in small pull requests or commits.
2. Do not implement all features in one large change.
3. Start with schema, migrations, shared types, and validation.
4. Add tests for each workflow before moving to the next module.
5. Use role-based middleware for every protected endpoint.
6. Do not trust frontend validation only.
7. Do not expose admin endpoints to non-admin users.
8. Do not allow partners to moderate reviews.
9. Do not allow overbooking under concurrent requests.
10. Keep all booking history append-only.
11. Queue email sending instead of sending email directly in request handlers.
12. Store files in R2 and store only keys in D1.
13. Use stable status constants from `packages/shared`.
14. Add pagination to all list APIs.
15. Use environment-specific configuration for local, staging, and production.

---

## 20. Suggested AI Agent Task Breakdown

### Task 1: Project Bootstrap

```txt
Create a Cloudflare-ready monorepo with apps/web, apps/api, packages/db, packages/shared, and packages/emails. Configure TypeScript, ESLint, Prettier, Tailwind, Hono, Drizzle, and Wrangler.
```

### Task 2: Database Schema

```txt
Implement the D1 database schema and migrations for users, roles, sessions, partners, partner limits, workshops, availability, bookings, messages, amendments, reviews, tickets, and audit history.
```

### Task 3: Auth and RBAC

```txt
Implement email/password authentication with secure HTTP-only sessions, user roles, and middleware for customer, partner, and admin authorization.
```

### Task 4: Partner Registration

```txt
Build the /partners registration page and backend API. Create partner profile, assign partner role, create default workshop limit of 3, and queue registration emails.
```

### Task 5: Workshop Management

```txt
Build partner workshop CRUD, R2 image upload, workshop limit enforcement, and workshop status management.
```

### Task 6: Availability Calendar

```txt
Build partner availability management with dates, time slots, capacity per slot, and availability toggles.
```

### Task 7: Admin Workshop Approval

```txt
Build admin pending workshop review, approve/reject actions, rejection reason handling, and partner email notifications.
```

### Task 8: Public Experience Listing

```txt
Build /experience workshop listing with filters for location, category, price, duration, and language, plus sorting by popularity, price, and rating.
```

### Task 9: Booking Flow

```txt
Build customer booking flow with primary date/time, alternative slots, Reservation Number generation, atomic capacity updates, and email notifications.
```

### Task 10: Partner Booking Dashboard

```txt
Build partner booking management with confirm, reject, cancel, suggest alternatives, status badges, and booking history.
```

### Task 11: Messaging

```txt
Build reservation-specific in-platform messaging for customers, partners, and authorized admins. Queue email notifications for new messages.
```

### Task 12: Email Reply Synchronization

```txt
Implement Cloudflare email() handler for inbound reply processing. Use secure thread tokens, sender validation, duplicate Message-ID prevention, and message insertion into the correct booking thread.
```

### Task 13: Amendments and Reschedules

```txt
Build amendment request workflow, partner approval/rejection, safe capacity recalculation, status transition records, and email notifications.
```

### Task 14: Reviews

```txt
Build logged-in customer review submission and admin-only moderation. Published reviews update public workshop rating.
```

### Task 15: Digital Tickets

```txt
Generate reservation tickets for confirmed bookings, create QR codes, store QR assets in R2, and show tickets in customer dashboard.
```

### Task 16: Metrics

```txt
Build partner performance dashboard and admin overview metrics with paginated and indexed queries.
```

### Task 17: Testing and Hardening

```txt
Add unit, integration, and Playwright E2E tests for all core workflows. Add rate limiting, Turnstile, input sanitization, and audit logging.
```

---

## 21. Environment Variables

```txt
APP_ENV=production
APP_URL=https://yonihon.com
API_URL=https://api.yonihon.com
SESSION_SECRET=replace_me
EMAIL_SECRET=replace_me
EMAIL_FROM=YoNihon <no-reply@yonihon.com>
ADMIN_NOTIFICATION_EMAIL=admin@yonihon.com
MESSAGING_EMAIL_DOMAIN=messages.yonihon.com
EMAIL_PROVIDER=cloudflare_or_resend_or_sendgrid
EMAIL_PROVIDER_API_KEY=replace_me
R2_PUBLIC_BASE_URL=https://assets.yonihon.com
```

---

## 22. Production Checklist

Before launch:

- [ ] D1 migrations applied to production.
- [ ] R2 bucket created and bound.
- [ ] Queue created and bound.
- [ ] Email provider configured.
- [ ] Inbound email routing configured.
- [ ] SPF, DKIM, and DMARC configured.
- [ ] Admin user created.
- [ ] Partner registration tested.
- [ ] Workshop approval tested.
- [ ] Booking capacity tested with concurrent requests.
- [ ] Email notifications tested.
- [ ] Email reply sync tested.
- [ ] Amendment workflow tested.
- [ ] Review moderation tested.
- [ ] Ticket generation tested.
- [ ] Access control tested for customer, partner, and admin.
- [ ] Turnstile added to public forms.
- [ ] Error logging configured.
- [ ] Backups/export process planned for D1 data.

---

## 23. Recommended Phase 1 MVP Scope

To reduce risk, build the MVP first:

1. Auth and roles
2. Partner registration
3. Workshop CRUD
4. Workshop limit of 3
5. Admin approval/rejection
6. Public `/experience` page
7. Booking request flow
8. Partner confirm/cancel booking
9. Email notifications
10. Basic partner dashboard
11. Admin review moderation

Then add advanced features:

1. Two-way email synchronization
2. Booking amendments and reschedules
3. Booking history and badges
4. Digital reservation tickets
5. Wallet support
6. Advanced metrics
7. Automated cleanup jobs

---

## 24. Notes for Cloudflare Hosting

- Cloudflare D1 is a good fit for structured relational data, but keep database size and query limits in mind.
- Cloudflare R2 should be used for workshop images, QR codes, and generated ticket assets.
- Cloudflare Queues should be used for email sending and async tasks to keep API responses fast.
- Cloudflare Cron Triggers should be used for periodic jobs such as expiring old pending bookings and retrying failed emails.
- Cloudflare Email Routing or Email Service should be used for inbound email replies to reservation threads.
- If Cloudflare outbound email sending is not available on your plan, use a third-party transactional email provider behind an email adapter.

---

## 25. Final Deliverables

The implementation should deliver:

- Cloudflare Pages frontend
- Cloudflare Workers API
- D1 database schema and migrations
- R2 asset storage
- Queue-based email notification system
- Inbound email sync Worker
- Partner dashboard
- Customer dashboard
- Admin dashboard
- Workshop approval workflow
- Booking and availability system
- Reservation messaging system
- Amendment and reschedule workflow
- Review moderation system
- Digital ticket system
- Metrics dashboards
- Full test coverage for critical workflows
