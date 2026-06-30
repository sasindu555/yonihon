# Software Requirements Specification (SRS)
# YoNihon Partner Workshop Management and Booking System

**Version:** 1.0  
**Source Requirements:** partner_workshop_requirements 2.2  
**Generated Date:** 2026-06-29  

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification defines the functional and non-functional requirements for the YoNihon Partner Workshop Management and Booking System.

The system will allow users to register as workshop partners, create and manage workshops, manage availability, accept and manage reservations, communicate with customers, handle reviews, and track workshop performance. It will also support admin moderation, booking workflow control, two-way reservation messaging, email synchronization, reservation numbers, digital tickets, and booking history.

### 1.2 Scope

The scope of this system includes:

- Partner registration and partner profile creation.
- Partner dashboard for workshop and reservation management.
- Admin dashboard for partner, workshop, booking, review, and support management.
- Workshop creation, editing, approval, rejection, and suspension workflows.
- Workshop capacity, availability, dates, and time slot management.
- Public `/experience` page with workshop filtering and sorting.
- Workshop booking and reservation management.
- Alternative date and time selection during booking.
- Booking amendment and reschedule requests.
- Booking change indicators and booking history.
- Reservation-specific secure messaging.
- Two-way email synchronization for reservation conversations.
- Reservation Number generation and verification.
- Digital reservation ticket generation.
- Workshop ratings and reviews with admin moderation.
- Email notifications for all major workflow events.
- Partner and admin performance reporting.

### 1.3 Intended Users

The system will be used by the following user groups:

| User Type | Description |
|---|---|
| Customer | A user who browses workshops, submits bookings, sends messages, requests amendments, and submits reviews. |
| Workshop Partner | A registered partner who creates workshops, manages availability, manages reservations, communicates with customers, and views performance. |
| Admin | A site administrator who approves workshops, manages partners, moderates reviews, views bookings, and supports users. |
| Guest User | A non-logged-in visitor who can browse approved workshops but must log in for restricted actions such as submitting reviews. |

### 1.4 Definitions

| Term | Definition |
|---|---|
| Workshop | A bookable experience created by a partner and approved by an admin. |
| Partner | A user or organization that creates and manages workshops. |
| Booking / Reservation | A customer request to attend a workshop on a selected date and time. |
| Reservation Number | A unique reference number generated when a booking request is created. |
| Digital Ticket | A customer-facing ticket generated after a booking is confirmed. |
| Amendment | A customer request to change the date, time, or both for an existing booking. |
| Reschedule | An approved change to the original booking date or time. |
| Time Slot | A specific available time for a workshop date with its own capacity. |
| Review | A rating and written feedback submitted by a logged-in customer. |
| Messaging Thread | A reservation-specific communication thread between customer and workshop owner. |

---

## 2. Overall Description

### 2.1 Product Perspective

The Partner Workshop Management and Booking System will extend the existing YoNihon website by adding partner onboarding, workshop publishing, booking management, reservation messaging, review moderation, and reporting capabilities.

Approved workshops will be displayed publicly on the `/experience` page. Customers will be able to search, filter, sort, and book workshops. Partners will manage workshops and reservations through a dedicated dashboard. Admins will control approvals, partner limits, review moderation, and support workflows.

### 2.2 Product Functions

The system must provide the following major functions:

- Partner registration.
- Partner dashboard access.
- Workshop creation and editing.
- Workshop limit enforcement.
- Admin workshop approval and rejection.
- Workshop filtering and sorting on `/experience`.
- Workshop booking submission.
- Booking capacity control.
- Partner booking confirmation and cancellation.
- Alternative date/time handling.
- Booking amendment and reschedule workflow.
- Booking dashboard badges and change indicators.
- Reservation messaging.
- Two-way email synchronization.
- Reservation Number generation.
- Digital reservation ticket access.
- Review and rating submission.
- Admin review moderation.
- Email notifications.
- Partner performance dashboard.
- Admin management and support tools.
- Booking history and audit tracking.

### 2.3 User Classes and Characteristics

| User Class | Capabilities |
|---|---|
| Guest | Browse approved workshops, use filters and sorting, view public workshop details. |
| Customer | Book workshops, select primary and secondary dates/times, view reservations, send messages, request amendments, view digital tickets, submit reviews. |
| Partner | Create workshops, manage availability, view bookings, approve/reject reservations, suggest alternatives, send messages, view performance. |
| Admin | Approve/reject workshops, update partner workshop limits, view reservation numbers, access message history for support, moderate reviews, view audit history. |

### 2.4 Assumptions and Dependencies

- The website already has user authentication or will include authentication for customers, partners, and admins.
- Email delivery infrastructure will be available.
- The system will support role-based access control.
- The `/partners` and `/experience` pages exist or will be created.
- Booking capacity must be transaction-safe to prevent overbooking.
- Inbound email reply synchronization requires an email receiving mechanism and message identification strategy.
- Wallet support for Apple Wallet and Google Wallet is optional if technically feasible.

---

## 3. System Roles and Permissions

### 3.1 Customer Permissions

Customers must be able to:

- Browse approved workshops.
- Filter and sort workshops on `/experience`.
- Submit workshop booking requests.
- Select a primary preferred date and time.
- Select one or more alternative secondary dates and time slots.
- View their booking status.
- View their Reservation Number.
- View their digital reservation ticket after confirmation.
- Send and receive reservation-specific messages.
- Reply to reservation emails and have replies synchronized into the reservation thread.
- Request booking amendments or reschedules.
- Submit ratings and reviews after logging in.

Customers must not be able to:

- Book unavailable or full time slots.
- View other customers’ booking details.
- Modify booking history records.
- Publish or reject reviews.

### 3.2 Partner Permissions

Partners must be able to:

- Register as partners.
- Access a partner dashboard.
- Create workshops up to their assigned workshop limit.
- Edit their own workshops.
- Suspend their own workshops.
- Manage dates, time slots, and capacity.
- View bookings for their own workshops.
- Confirm or cancel bookings.
- Suggest alternative booking dates and time slots.
- Approve or reject amendment requests.
- Communicate with customers through reservation messaging.
- View booking change indicators.
- View relevant booking history for their reservations.
- View performance metrics for their own workshops.

Partners must not be able to:

- Approve or reject their own workshop submissions.
- Create workshops beyond their configured limit.
- Manage workshops owned by other partners.
- View other partners’ private performance data.
- Publish or reject reviews.
- Edit or delete booking history records.

### 3.3 Admin Permissions

Admins must be able to:

- View all partner registrations.
- View partner details and workshop counts.
- Set or update each partner’s maximum workshop limit.
- View pending workshop submissions.
- Approve or reject workshops.
- Add rejection comments when rejecting workshops.
- View workshop status history.
- View reservation numbers.
- Search bookings using Reservation Number, customer name, and booking details.
- Access booking message history for authorized customer support or dispute handling.
- View booking history and audit records.
- Moderate reviews by publishing or rejecting them.
- View overall workshop and partner performance if required.

---

## 4. Functional Requirements

## 4.1 Partner Registration

### FR-001 Partner Registration Form

The system shall provide partner registration functionality on the `/partners` page.

### FR-002 Partner Account Creation

When a user registers as a partner, the system shall create a partner account or partner profile linked to the user.

### FR-003 Partner Registration Email to Partner

The system shall send an email notification to the partner confirming successful registration.

### FR-004 Partner Registration Email to Admin

The system shall send an email notification to the site admin when a new partner registration is submitted.

---

## 4.2 Partner Dashboard

### FR-005 Partner Dashboard Access

The system shall provide a dashboard for registered partners.

### FR-006 Workshop Management from Dashboard

Partners shall be able to add, edit, suspend, and manage their own workshops from the dashboard.

### FR-007 Availability Management

Partners shall be able to manage workshop availability directly from the dashboard.

### FR-008 Calendar Interface

The partner dashboard shall provide a simple calendar interface for managing available and unavailable dates and time slots.

### FR-009 Availability Slot Management

Partners shall be able to mark specific dates and time slots as available or unavailable.

---

## 4.3 Partner Workshop Limit

### FR-010 Default Workshop Limit

The system shall set the default maximum workshop limit to 3 workshops per partner.

### FR-011 Admin Workshop Limit Management

Admins shall be able to update the maximum workshop limit for each partner from the admin dashboard.

### FR-012 Workshop Limit Enforcement

The system shall prevent partners from creating more workshops than their assigned maximum limit.

### FR-013 Workshop Limit Message

If a partner reaches their workshop limit, the system shall show a clear message in the partner dashboard.

---

## 4.4 Workshop Creation

### FR-014 Workshop Details

Partners shall be able to define workshop title, description, location, category, price, duration, language, images, and required fields.

### FR-015 Workshop Dates

Partners shall be able to add one or more available dates for each workshop.

### FR-016 Workshop Time Slots

Partners shall be able to add one or more time slots for each workshop date.

### FR-017 Time Slot Capacity

Partners shall be able to define booking capacity for each time slot.

---

## 4.5 Workshop Review and Approval Workflow

### FR-018 Initial Workshop Status

When a partner submits a workshop, the system shall set the workshop status to `pending`.

### FR-019 Admin Workshop Review

Admins shall be able to review submitted workshops from the admin panel.

### FR-020 Workshop Approval

Admins shall be able to approve pending workshops.

### FR-021 Workshop Rejection

Admins shall be able to reject pending workshops.

### FR-022 Rejection Reason

When rejecting a workshop, admins shall be required to provide a rejection reason or comment.

### FR-023 Workshop Visibility

Only approved and active workshops shall be visible on the `/experience` page.

### FR-024 Rejection Visibility to Partner

Partners shall be able to view the rejection reason for rejected workshops.

### FR-025 Workshop Status Change Notification

The system shall send an email notification to the partner whenever the workshop status changes.

### FR-026 Supported Workshop Statuses

The system shall support at least the following workshop statuses:

- pending
- approved
- rejected
- suspended

---

## 4.6 Workshop Editing Workflow

### FR-027 Edit Existing Workshop

Partners shall be able to edit their existing workshops.

### FR-028 Edited Workshop Reapproval

When an approved or rejected workshop is edited and submitted again, the system shall change its status back to `pending`.

### FR-029 Suspended Workshop Visibility

Suspended workshops shall not be visible on the `/experience` page.

---

## 4.7 Experience Page Filtering and Sorting

### FR-030 Workshop Listing

The `/experience` page shall list approved and active workshops.

### FR-031 Location Filter

Users shall be able to filter workshops by location.

### FR-032 Category Filter

Users shall be able to filter workshops by category.

### FR-033 Price Filter

Users shall be able to filter workshops by price.

### FR-034 Duration Filter

Users shall be able to filter workshops by duration.

### FR-035 Language Filter

Users shall be able to filter workshops by language.

### FR-036 Popularity Sort

Users shall be able to sort workshops by popularity.

### FR-037 Price Sort

Users shall be able to sort workshops by price.

### FR-038 Rating Sort

Users shall be able to sort workshops by rating.

### FR-039 Combined Filters and Sorting

Filters and sorting shall work together.

---

## 4.8 Workshop Booking Flow

### FR-040 Workshop Selection

Users shall be able to select an approved workshop from the `/experience` page.

### FR-041 Date Selection

Users shall be able to select an available workshop date.

### FR-042 Time Slot Selection

Users shall be able to select an available time slot.

### FR-043 User Details

Users shall be able to fill in booking user details similar to the current booking implementation.

### FR-044 Booking Submission

Users shall be able to submit a booking request.

### FR-045 Primary Date and Time

Customers shall be able to select a preferred primary date and time when making a reservation.

### FR-046 Alternative Dates and Time Slots

Customers shall be able to select one or more alternative secondary dates and time slots.

### FR-047 Alternative Confirmation by Partner

If the primary date or time is unavailable, the workshop partner shall be able to confirm one of the alternative options.

### FR-048 Capacity Check

Users shall only be able to book a time slot if booking capacity is available.

### FR-049 Booking Record Creation

After booking submission, the system shall create a booking record.

### FR-050 Initial Booking Status

After booking submission, the system shall set booking status to `Requested` or `Pending Partner Review`.

### FR-051 Capacity Reduction

The system shall reduce available booking count for the selected time slot when a booking request is created, or reserve capacity according to the chosen reservation strategy.

### FR-052 Partner Booking Notification

The system shall send an email notification to the workshop partner when a booking is submitted.

### FR-053 Customer Booking Submission Notification

The system shall send an email notification to the customer confirming booking submission.

### FR-054 Reservation Number in Confirmation

The customer booking confirmation shall include the Reservation Number.

---

## 4.9 Partner Booking Management

### FR-055 Booking List for Partners

Workshop partners shall be able to view bookings for their own workshops in their dashboard.

### FR-056 Manual Reservation Approval

Reservation requests shall not be confirmed automatically.

### FR-057 Accept Booking

Workshop partners shall be able to accept or confirm booking requests.

### FR-058 Reject or Cancel Booking

Workshop partners shall be able to reject or cancel booking requests.

### FR-059 Suggest Alternative Dates

If the requested date or time is unavailable, the workshop owner shall be able to suggest alternative dates and time slots.

### FR-060 Customer Alternative Selection

The customer shall be able to choose one of the suggested options and confirm the booking.

### FR-061 Booking Status Change Email

When a booking status changes, the system shall send an email notification to the customer.

### FR-062 Capacity Restoration on Cancellation

When a booking is cancelled, the system shall increase the available booking count for the related time slot.

---

## 4.10 Booking Amendment and Reschedule Workflow

### FR-063 Customer Amendment Request

Customers shall be able to request a booking amendment for date changes, time changes, or both.

### FR-064 Amendment Approval Requirement

Amendment and reschedule requests shall require workshop owner approval.

### FR-065 Original and Requested Details

The partner dashboard shall display original reservation details alongside the requested new date and time.

### FR-066 Temporary Amendment Status

While an amendment request is waiting for action, booking status shall become `Amendment Requested` or `Awaiting Approval`.

### FR-067 Approved Amendment Update

Once approved by the workshop owner, the booking date and/or time shall update automatically.

### FR-068 Rejected Amendment Handling

If an amendment request is rejected, the original reservation details shall remain unchanged.

### FR-069 Amendment Notification

The system shall notify customers and workshop owners when an amendment is requested, approved, rejected, or completed.

### FR-070 Amendment Capacity Recalculation

The system shall safely recalculate availability counts when a booking is rescheduled to another date or time slot.

---

## 4.11 Booking Change Indicators

### FR-071 Booking Badges

The partner dashboard shall show badges for important booking states and changes.

### FR-072 Supported Badge Examples

Badge examples shall include:

- NEW
- AMENDED
- RESCHEDULED
- CANCELLED
- PENDING

### FR-073 Badge Placement

Badges shall appear in booking lists, booking detail views, and relevant dashboard areas.

---

## 4.12 Availability Rules

### FR-074 Slot-Based Availability

Booking availability shall be calculated per workshop date and time slot.

### FR-075 Independent Slot Capacity

Each time slot shall have its own booking capacity.

### FR-076 Prevent Full Slot Booking

The system shall prevent users from booking a time slot if available count is zero.

### FR-077 Prevent Overbooking

The system shall prevent overbooking, including concurrent booking attempts for the same slot.

---

## 4.13 Messaging System

### FR-078 Reservation Messaging

Workshop owners and customers shall have access to secure in-platform messaging after a reservation is submitted.

### FR-079 Reservation-Linked Conversation

All conversations shall remain linked to the specific booking.

### FR-080 Conversation History

Both parties shall be able to view the full communication history.

### FR-081 Messaging Use Cases

The messaging system shall support booking details, pre-workshop questions, reschedule requests, late arrival notices, attendance issues, special requirements, and other workshop-related information.

### FR-082 Authorized Message Visibility

Only the related customer, workshop partner, and authorized admins shall be able to view reservation messages.

---

## 4.14 Two-Way Reservation Messaging and Email Synchronization

### FR-083 Email Notification for New Message

Whenever a workshop owner or customer sends a reservation message, the recipient shall automatically receive an email notification linked to the reservation.

### FR-084 Message Preview in Email

The email notification shall include the full message or a short preview.

### FR-085 Reply-to-Email Synchronization

If the recipient replies directly to the email, the reply shall synchronize back into the same YoNihon reservation conversation.

### FR-086 Single Thread Requirement

Email replies shall not create separate conversations and must remain linked to the same reservation thread.

### FR-087 Message Source Indicator

The system shall clearly indicate whether a message was sent from YoNihon or received through email reply synchronization.

### FR-088 Email Reference Validation

The system shall validate inbound email replies before syncing them into a reservation thread.

---

## 4.15 Reservation Number

### FR-089 Reservation Number Generation

Each reservation shall automatically receive a unique Reservation Number when the booking request is created.

### FR-090 Reservation Number Display

The Reservation Number shall be displayed in:

- Customer booking confirmation.
- Customer dashboard.
- Workshop owner dashboard.
- Admin dashboard.

### FR-091 Reservation Verification

Workshop owners shall be able to search for or verify reservations using Reservation Number, customer name, and booking details.

---

## 4.16 Digital Reservation Ticket

### FR-092 Ticket Generation

Once a reservation is confirmed, the system shall automatically generate a digital reservation ticket.

### FR-093 Ticket Details

The digital reservation ticket shall include:

- Reservation Number.
- Workshop name.
- Customer name.
- Date and time.
- Number of participants.
- Workshop location.
- Meeting instructions.
- Other important booking details.

### FR-094 Customer Ticket Access

Customers shall be able to view the ticket from their dashboard.

### FR-095 Ticket Presentation

Customers shall be able to present the ticket upon arrival.

### FR-096 Wallet Support

If technically feasible, the ticket should support Apple Wallet and Google Wallet.

---

## 4.17 Workshop Ratings and Reviews

### FR-097 Login Required for Reviews

Users must be logged in before submitting a rating or review.

### FR-098 Review Pending Status

After submission, review status shall be set to `pending`.

### FR-099 Admin Review Moderation

Only admins shall be able to publish or reject reviews.

### FR-100 Partner Review Notification

Workshop partners may be notified when a review is submitted.

### FR-101 Review Published Notification

When an admin publishes a review, the system shall notify the review user that the review has been published.

### FR-102 Hidden Rejected Reviews

Rejected reviews shall not be publicly visible.

### FR-103 Public Rating Calculation

Published reviews shall contribute to the workshop rating shown on the `/experience` page.

### FR-104 Review Moderation History

Rejected reviews shall remain available to admins for moderation history.

---

## 4.18 Partner Workshop Performance Dashboard

### FR-105 Partner Metrics

Partners shall be able to view performance metrics for their own workshops.

### FR-106 Required Metrics

The partner performance dashboard shall show:

- Total workshops created.
- Total approved workshops.
- Total pending workshops.
- Total rejected workshops.
- Total suspended workshops.
- Total bookings per workshop.
- Total pending bookings.
- Total confirmed bookings.
- Total cancelled bookings.
- Available vs booked count per date and time slot.
- Revenue or estimated revenue per workshop, if pricing is available.
- Most booked workshops.
- Popular workshops based on bookings and ratings.
- Average rating per workshop.
- Upcoming bookings.
- Recent booking and review activity.

### FR-107 Admin Overall Metrics

Admins may have access to overall workshop performance across all partners if required.

---

## 4.19 Email Notifications

### FR-108 Required Email Events

The system shall send email notifications for:

- Partner registration to partner and site admin.
- Workshop status change to partner.
- Booking submission to workshop partner and customer.
- Booking status change to customer.
- Reservation message notification to recipient.
- Inbound email reply synchronization failure if required.
- Amendment request, approval, rejection, and completion.
- Reschedules and cancellations.
- Review submitted to workshop partner if enabled.
- Review published to review user.

### FR-109 Reservation Number in Booking Emails

Booking-related emails shall include the Reservation Number for easy reference.

---

## 4.20 Admin Requirements

### FR-110 Pending Workshop View

Admins shall be able to view pending workshop submissions.

### FR-111 Workshop Review Details

Admins shall be able to review workshop details.

### FR-112 Partner Limit Management

Admins shall be able to view and update the maximum workshop limit for each partner.

### FR-113 Partner Details

Admins shall be able to view partner details and workshop counts.

### FR-114 Reservation Lookup

Admins shall be able to view Reservation Numbers in the admin dashboard for booking lookup and support.

### FR-115 Message History Access

Admins shall be able to access booking-related message history for authorized customer support or dispute handling.

### FR-116 Booking History Access

Admins shall be able to view complete booking history and audit records.

---

## 4.21 Booking History and Audit Trail

### FR-117 Complete Booking History

Every booking shall retain a complete history of amendments, approvals, cancellations, reschedules, and status changes.

### FR-118 Booking History Record Fields

Each booking history record shall include:

- Timestamp.
- User who performed the action.
- Action type.
- Previous value.
- New value.
- Optional comments or reason.

### FR-119 Admin Audit Visibility

Booking history shall be visible to admins for support and dispute handling.

### FR-120 Customer and Partner History Visibility

Customers and workshop owners shall be able to view relevant booking history for their own reservations based on permission rules.

### FR-121 Append-Only History

Booking history shall not be editable or deletable by customers or partners.

---

## 5. Data Requirements

### 5.1 Suggested Data Entities

The system should include or update data models for:

| Entity | Purpose |
|---|---|
| User | Stores customer, partner, and admin account information. |
| Partner Profile | Stores partner-specific information. |
| Partner Workshop Limit | Stores configurable workshop limit per partner. |
| Workshop | Stores workshop details and status. |
| Workshop Date | Stores workshop-specific available dates. |
| Workshop Time Slot | Stores time slots and capacity for each date. |
| Booking | Stores reservation details and current status. |
| Booking Alternative Option | Stores customer-selected or partner-suggested alternative dates/times. |
| Booking Amendment Request | Stores requested booking changes. |
| Booking History | Stores append-only booking audit records. |
| Booking Status History | Stores status transition history. |
| Reservation Number | Stores unique booking reference number. |
| Digital Reservation Ticket | Stores ticket details for confirmed reservations. |
| Booking Message | Stores reservation-specific messages. |
| Email Sync Record | Stores inbound/outbound email synchronization metadata. |
| Workshop Review | Stores rating, review content, and moderation status. |
| Review Moderation History | Stores admin review moderation history. |

### 5.2 Key Relationships

- A partner can have many workshops up to the configured workshop limit.
- A workshop belongs to one partner.
- A workshop can have many dates.
- A workshop date can have many time slots.
- A time slot can have many bookings.
- A booking belongs to a workshop, partner, date, and time slot.
- A booking can have one unique Reservation Number.
- A confirmed booking can have one digital reservation ticket.
- A booking can have many related messages.
- A booking can have many history records.
- A booking can have many amendment requests.
- A workshop can have many reviews.
- A review belongs to a user and a workshop.
- Review moderation is controlled by admins.

### 5.3 Required Email Sync Fields

Email synchronization records should include:

- Email message ID.
- Inbound email reference.
- Reservation or booking ID.
- Message thread ID.
- Sender type.
- Sender email.
- Recipient email.
- Delivery status.
- Synchronization status.
- Created timestamp.
- Processed timestamp.
- Failure reason if applicable.

### 5.4 Booking Status Transition Fields

Booking status history should include:

- Booking ID.
- Old status.
- New status.
- Changed by user ID.
- Changed by role.
- Changed at timestamp.
- Reason or comment.

---

## 6. Status Values

### 6.1 Workshop Statuses

| Status | Description |
|---|---|
| pending | Workshop is waiting for admin review. |
| approved | Workshop is approved and can appear publicly if active. |
| rejected | Workshop was rejected by an admin. |
| suspended | Workshop is suspended and hidden from public listing. |

### 6.2 Booking Statuses

| Status | Description |
|---|---|
| Requested | Customer has submitted a booking request. |
| Pending Partner Review | Booking is waiting for workshop partner action. |
| Alternative Suggested | Partner has suggested alternative date/time options. |
| Awaiting Customer | Booking is waiting for customer response. |
| Confirmed | Booking has been accepted and confirmed. |
| Checked In | Customer has arrived and reservation has been verified. |
| Completed | Workshop booking has been completed. |
| Cancelled by Customer | Customer cancelled the booking. |
| Cancelled by Partner | Partner cancelled the booking. |
| Expired | Booking expired due to no action within the allowed time. |
| No Show | Customer did not attend the confirmed booking. |
| Amendment Requested | Customer requested a booking change. |
| Rescheduled | Booking date/time was changed and confirmed. |

### 6.3 Review Statuses

| Status | Description |
|---|---|
| pending | Review is waiting for admin moderation. |
| published | Review is publicly visible. |
| rejected | Review was rejected and is hidden publicly. |

---

## 7. Validation and Security Requirements

### 7.1 General Validation

The system shall validate:

- Partner registration fields.
- Workshop creation and editing fields.
- Workshop limit enforcement.
- Workshop dates and time slots.
- Booking capacity.
- Customer booking details.
- Review and rating submission.
- Admin approval/rejection actions.
- Reservation Number generation and uniqueness.
- Digital reservation ticket data.
- Booking message submission.
- Amendment requests.
- Email reply synchronization.

### 7.2 Authorization Rules

The system shall enforce the following authorization rules:

- Only partners can create, edit, or suspend their own workshops.
- Only partners who have not reached their workshop limit can create new workshops.
- Only admins can approve or reject workshops.
- Only admins can update a partner’s maximum workshop limit.
- Users can only book approved and available workshops.
- Partners can only manage bookings for their own workshops.
- Only logged-in users can submit workshop ratings and reviews.
- Only admins can publish or reject reviews.
- Only the related customer, workshop partner, and authorized admins can view booking messages and reservation ticket details.
- Only the related customer can request amendments for their booking.
- Only the related workshop owner or authorized admin can approve or reject amendment requests.

### 7.3 Email Synchronization Security

The system shall:

- Validate that inbound email replies belong to a valid reservation conversation.
- Prevent unauthorized users from injecting messages into a reservation thread through email.
- Store email message IDs and inbound references for traceability.
- Prevent duplicate inbound email processing.
- Log synchronization failures.

### 7.4 Booking and Capacity Security

The system shall:

- Prevent overbooking during booking submission.
- Prevent overbooking during amendment approval or reschedule approval.
- Use transaction-safe capacity updates.
- Restore capacity when bookings are cancelled where applicable.
- Recalculate capacity safely when bookings are rescheduled.

### 7.5 Audit Security

The system shall:

- Store booking history records as append-only records.
- Prevent customers and partners from editing or deleting booking history.
- Restrict audit access based on role and ownership.

---

## 8. Non-Functional Requirements

### 8.1 Performance

- Workshop listing filters and sorting should load quickly for users.
- Partner dashboard booking lists should support efficient pagination or lazy loading.
- Reservation message threads should load efficiently even when long.
- Admin dashboards should support searching by Reservation Number.

### 8.2 Reliability

- Booking capacity updates must be reliable and prevent duplicate reservations for full time slots.
- Email notification failures should be logged.
- Email synchronization failures should not break the reservation thread.
- Booking history should remain available even after cancellations or reschedules.

### 8.3 Usability

- Partner dashboard interfaces should be simple and understandable for non-technical users.
- Availability should be manageable using a calendar-style interface.
- Booking change badges should be clearly visible.
- Customers should be able to easily access Reservation Numbers and digital tickets.

### 8.4 Security

- Role-based access control must be applied across customer, partner, and admin workflows.
- Reservation messages and tickets must only be visible to authorized parties.
- Inbound email synchronization must validate sender and reservation references.
- Admin-only actions must be protected.

### 8.5 Maintainability

- Booking statuses, workshop statuses, and review statuses should be centrally defined.
- Email notification templates should be reusable and maintainable.
- Audit and status history should be structured for future reporting.
- Data models should allow future expansion, including wallet ticket support.

### 8.6 Scalability

- The system should support multiple partners, workshops, dates, time slots, bookings, and messages.
- Filtering and sorting should continue to perform well as workshop volume grows.
- Email synchronization should handle multiple concurrent message replies.

---

## 9. Acceptance Criteria

### 9.1 Partner Registration

- A user can register as a partner from `/partners`.
- A partner profile is created after registration.
- Partner and admin receive registration notification emails.

### 9.2 Workshop Management

- A partner can create workshops up to their configured limit.
- The default workshop limit is 3.
- The admin can update the partner workshop limit.
- A partner cannot create more workshops than allowed.
- A submitted workshop is marked as pending.
- An admin can approve or reject the workshop.
- Approved workshops appear on `/experience`.
- Rejected workshops show the rejection reason to the partner.
- Edited approved/rejected workshops return to pending status.

### 9.3 Experience Page

- Only approved and active workshops are displayed.
- Users can filter by location, category, price, duration, and language.
- Users can sort by popularity, price, and rating.
- Filters and sorting work together.

### 9.4 Booking

- A user can submit a booking request for an available workshop slot.
- The system prevents bookings for full slots.
- The system prevents overbooking under concurrent booking attempts.
- A Reservation Number is generated when the booking is created.
- Booking confirmation emails include the Reservation Number.
- Partners can confirm, cancel, or suggest alternatives.
- Capacity is restored when applicable after cancellation.

### 9.5 Amendments and Rescheduling

- Customers can request date/time amendments.
- Partners can see original and requested details together.
- Partners can approve or reject amendment requests.
- Approved amendments update booking details.
- Rejected amendments keep the original booking unchanged.
- Capacity is safely recalculated after rescheduling.
- Both parties receive amendment-related notifications.

### 9.6 Messaging and Email Sync

- Customers and partners can message each other inside a reservation thread.
- Message recipients receive email notifications.
- Email replies synchronize into the same reservation conversation.
- Email replies do not create separate conversations.
- Messages clearly indicate whether they came from YoNihon or email.
- Unauthorized email replies are not added to reservation threads.

### 9.7 Reservation Ticket

- Confirmed bookings generate digital reservation tickets.
- Customers can view tickets from their dashboard.
- Tickets include Reservation Number, workshop details, customer details, date/time, location, and instructions.
- Workshop owners can verify reservations using the Reservation Number.

### 9.8 Reviews

- Logged-in users can submit workshop ratings and reviews.
- Submitted reviews are pending by default.
- Only admins can publish or reject reviews.
- Published reviews appear publicly and affect ratings.
- Rejected reviews remain hidden publicly.

### 9.9 Booking History

- Booking actions create history records.
- History includes timestamp, actor, action, previous value, new value, and optional reason.
- Admins can view full history.
- Customers and partners can view relevant history for their own bookings.
- Customers and partners cannot edit or delete history.

---

## 10. Suggested Implementation Phases

### Phase 1: Core Partner and Workshop Management

- Partner registration.
- Partner dashboard.
- Workshop creation and editing.
- Workshop limit enforcement.
- Admin approval and rejection workflow.
- Basic email notifications.

### Phase 2: Public Experience Page and Booking

- Approved workshop listing.
- Filtering and sorting.
- Booking flow.
- Date and time slot capacity.
- Reservation Number generation.
- Partner booking management.

### Phase 3: Advanced Booking Management

- Alternative date/time handling.
- Amendment and reschedule workflow.
- Booking status lifecycle.
- Booking badges.
- Booking history and audit trail.

### Phase 4: Messaging and Email Synchronization

- Reservation messaging.
- Email notifications for messages.
- Inbound email reply synchronization.
- Message source indicators.
- Email sync validation and logging.

### Phase 5: Reviews, Tickets, and Reporting

- Admin review moderation.
- Digital reservation tickets.
- Optional wallet integration.
- Partner performance dashboard.
- Admin reporting and support tools.

---

## 11. Open Questions

The following items should be confirmed before implementation:

1. Should booking capacity be reduced immediately when a request is submitted, or only after partner confirmation?
2. Should pending booking requests expire automatically after a defined time?
3. Should customers be allowed to cancel confirmed bookings directly?
4. Should partners be allowed to reject a booking without suggesting alternatives?
5. Should admin approval be required for partner registration, or should partner access be created immediately?
6. Should review submission be limited to customers who completed a booking?
7. Should digital tickets include QR codes or barcode verification?
8. Should wallet support be required in the first release or treated as a later enhancement?
9. What email provider will be used for outbound and inbound reservation email synchronization?
10. What exact format should Reservation Numbers follow?

---

## 12. Expected Final Outcome

After implementation:

- Users can register as partners from `/partners`.
- Partners can create and manage multiple workshops from their dashboard up to their configured limit.
- Admins can update workshop limits for each partner.
- Admins can approve or reject workshops.
- Approved workshops appear on `/experience`.
- Customers can filter and sort workshops.
- Customers can book available workshop slots.
- Customers can choose primary and secondary booking options.
- Partners can confirm, cancel, or suggest alternatives.
- Customers can request amendments or reschedules.
- Booking change badges help partners identify important updates.
- Reservation messages and email replies remain in one conversation thread.
- Customers receive Reservation Numbers and digital tickets.
- Workshop owners can verify reservations quickly.
- Admins moderate all reviews.
- Every booking keeps complete audit history.
- Partners can view performance metrics for their own workshops.
- Required email notifications are sent at each key workflow step.

---

## Appendix A: Requirement Traceability Summary

| Area | Key Requirement IDs |
|---|---|
| Partner Registration | FR-001 to FR-004 |
| Partner Dashboard | FR-005 to FR-009 |
| Workshop Limits | FR-010 to FR-013 |
| Workshop Creation | FR-014 to FR-017 |
| Workshop Approval | FR-018 to FR-026 |
| Workshop Editing | FR-027 to FR-029 |
| Experience Page | FR-030 to FR-039 |
| Booking Flow | FR-040 to FR-054 |
| Booking Management | FR-055 to FR-062 |
| Amendments | FR-063 to FR-070 |
| Booking Indicators | FR-071 to FR-073 |
| Availability | FR-074 to FR-077 |
| Messaging | FR-078 to FR-082 |
| Email Sync | FR-083 to FR-088 |
| Reservation Number | FR-089 to FR-091 |
| Digital Ticket | FR-092 to FR-096 |
| Reviews | FR-097 to FR-104 |
| Performance Dashboard | FR-105 to FR-107 |
| Email Notifications | FR-108 to FR-109 |
| Admin Requirements | FR-110 to FR-116 |
| Booking History | FR-117 to FR-121 |
