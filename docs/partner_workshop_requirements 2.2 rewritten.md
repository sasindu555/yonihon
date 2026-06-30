# Partner Workshop Management and Booking Workflow

This document defines the requirements for partner registration, workshop management, booking workflows, availability management, reservation messaging, email synchronization, reviews, reporting, admin controls, and related booking management features.

## 1. Partner Registration

The `/partners` page should allow users to register as workshop partners.

When a user registers as a partner, the system should:

- Create a partner account or partner profile.
- Send a registration confirmation email to the partner.
- Send a new partner registration notification email to the site admin.

## 2. Partner Dashboard

After registration, partners should have access to a dashboard where they can manage their workshops, bookings, availability, reviews, and performance.

Partners should be able to:

- Add new workshops.
- Create multiple workshops, subject to their assigned workshop limit.
- Edit existing workshops.
- Suspend workshops.
- View workshop performance metrics.
- Manage workshop availability from their dashboard.
- Use a simple calendar interface to update availability.
- Mark specific dates and time slots as available or unavailable.
- Update availability without requiring technical knowledge.

## 3. Partner Workshop Limit

Each partner should have a maximum number of workshops they are allowed to create.

Requirements:

- The default workshop limit should be set to 3 workshops per partner.
- Admins should be able to update the maximum workshop limit for each partner from the admin dashboard.
- Partners should not be able to create more workshops than their assigned limit.
- If a partner reaches their workshop limit, the dashboard should display a clear message explaining that the limit has been reached.

## 4. Workshop Creation

Partners should be able to create workshops with the required workshop information.

Workshop details should include:

- Title
- Description
- Location
- Category
- Price
- Duration
- Language
- Images
- Available dates
- Time slots for each date
- Booking capacity for each time slot
- Any other required workshop fields

Each workshop should support multiple dates and multiple time slots.

## 5. Workshop Review and Approval Workflow

When a partner submits a workshop, the workshop status should be set to `pending`.

Admins should be able to review submitted workshops from the admin panel.

Admins should be able to:

- View pending workshop submissions.
- Approve workshops.
- Reject workshops.
- Add a rejection reason or comment when rejecting a workshop.

Workshop statuses should include:

- pending
- approved
- rejected
- suspended

When a workshop is approved, it should become visible on the `/experience` page.

When a workshop is rejected, the partner should be able to view the rejection reason or comment.

The partner should receive an email notification whenever the workshop status changes.

## 6. Workshop Editing Workflow

Partners should be able to edit their own workshops.

When an approved or rejected workshop is edited and submitted again:

- The workshop status should change back to `pending`.
- The workshop should require admin review and approval again before appearing on `/experience`.

Suspended workshops should not be visible on the `/experience` page.

## 7. Experience Page Filtering and Sorting

The `/experience` page should display approved and active workshops only.

Users should be able to filter workshops by:

- Location
- Category
- Price
- Duration
- Language

Users should be able to sort workshop results by:

- Popularity
- Price
- Rating

Filtering and sorting should work together.

## 8. Workshop Booking Flow

Users should be able to book approved workshops from the `/experience` page.

The booking flow should allow users to:

- Select a workshop.
- Select an available date.
- Select an available time slot.
- Enter their booking details.
- Select a preferred primary date and time.
- Select one or more alternative secondary dates and time slots.
- Submit the booking request.

Users should only be able to book a time slot when capacity is available.

After a booking request is submitted, the system should:

- Create a booking record.
- Set the booking status to `pending`.
- Reduce the available booking count for the selected time slot.
- Send an email notification to the workshop partner.
- Send an email confirmation to the customer.

If the primary date or time is unavailable, the workshop partner should be able to confirm one of the alternative options without needing to contact the customer again.

This should reduce back-and-forth communication and improve the chances of confirming reservations quickly.

## 9. Partner Booking Management

Workshop partners should be able to view and manage bookings for their own workshops from the partner dashboard.

Reservation requests should not be confirmed automatically.

Each booking request should be sent to the workshop owner, who can:

- Review the booking request.
- Accept the reservation.
- Reject the reservation.
- Suggest alternative dates or time slots when the requested date or time is unavailable.

If the partner suggests alternative options, the customer should be able to choose one of the suggested options and confirm the booking.

Partners should be able to:

- Confirm a booking.
- Cancel a booking.
- View booking details.
- View customer-provided primary and alternative date/time options.
- Manage amendment and reschedule requests.

Booking statuses should include:

- Requested
- Pending Partner Review
- Alternative Suggested
- Awaiting Customer
- Confirmed
- Checked In
- Completed
- Cancelled by Customer
- Cancelled by Partner
- Expired
- No Show
- Amendment Requested
- Rescheduled

When a booking is cancelled, the available booking count for the related time slot should increase again.

When a booking status changes, the customer should receive an email notification.

### Booking Amendments and Reschedules

Customers should be able to request a booking amendment for:

- Date changes
- Time changes
- Date and time changes

Amendment and reschedule requests should require workshop owner approval, similar to a new booking request.

The partner dashboard should show:

- Original reservation details
- Requested new date and time
- Current booking status
- Amendment request status

While an amendment request is waiting for action, the booking status should temporarily become `Amendment Requested` or `Awaiting Approval`.

When an amendment is approved:

- The booking date and/or time should update automatically.
- Availability counts should be recalculated safely.
- The booking history should be updated.

When an amendment is rejected:

- The original reservation details should remain unchanged.
- The customer should receive an email notification.

### Booking Change Indicators

Workshop owners should be able to quickly identify booking changes using clear dashboard badges.

Badge examples:

- NEW
- AMENDED
- RESCHEDULED
- CANCELLED
- PENDING

These badges should appear in:

- Booking lists
- Booking detail views
- Partner dashboard notification areas
- Any dashboard area where reservation changes need quick attention

## 10. Availability Rules

Workshop availability should be calculated per workshop date and time slot.

Requirements:

- Each time slot should have its own booking capacity.
- Users should not be able to book a time slot if the available count is zero.
- The system should prevent overbooking.
- The system should handle cases where multiple users try to book the same time slot at the same time.
- Availability should be recalculated safely when bookings are cancelled, amended, or rescheduled.

## 11. Workshop Ratings and Reviews

Users should be able to rate and review workshops.

Requirements:

- Users must be logged in before submitting a rating or review.
- After submission, the review status should be set to `pending`.
- Reviews should be moderated by admins only.
- Workshop partners may receive a notification when a review is submitted.
- Workshop partners should not be able to publish or reject reviews directly.
- Admins should be able to publish or reject reviews.
- When an admin publishes a review, the review user should receive an email notification.
- Rejected reviews should not be visible publicly.
- Rejected reviews should remain available to admins for moderation history.
- Published reviews should contribute to the workshop rating shown on the `/experience` page.

Review statuses should include:

- pending
- published
- rejected

## 12. Partner Workshop Performance Dashboard

Partners should be able to view performance metrics for their own workshops.

The performance dashboard should include:

- Total workshops created
- Total approved workshops
- Total pending workshops
- Total rejected workshops
- Total suspended workshops
- Total bookings per workshop
- Total pending bookings
- Total confirmed bookings
- Total cancelled bookings
- Available count vs booked count per date and time slot
- Revenue or estimated revenue per workshop, if pricing is available
- Most booked workshops
- Popular workshops based on bookings and ratings
- Average rating per workshop
- Upcoming bookings
- Recent booking activity
- Recent review activity
- Booking change indicators and badges

Partners should only be able to view performance data for their own workshops.

Admins may also have access to overall workshop performance across all partners, if required.

## 13. Email Notifications

The system should send email notifications for important workflow events.

Email notifications should be sent for:

- Partner registration confirmation to the partner
- New partner registration notification to the admin
- Workshop status changes to the partner
- Booking submission notifications to the workshop partner
- Booking submission confirmation to the customer
- Booking status changes to the customer
- Review submission notification to the workshop partner
- Review published notification to the review user
- Amendment request notifications
- Amendment approval notifications
- Amendment rejection notifications
- Reschedule notifications
- Cancellation notifications
- Reservation message notifications

Customer booking confirmation emails should include the Reservation Number once the booking request is created.

If a confirmed booking generates a digital reservation ticket, customers should be able to access the ticket from their dashboard instead of relying only on email.

### Reservation Messaging Email Notifications

When a workshop owner or customer sends a message through the reservation messaging system:

- The recipient should automatically receive an email notification linked to the reservation.
- The email should include the full message or a short preview.
- The email should include the Reservation Number.
- If the recipient replies directly to the email, the reply should synchronize back into the same YoNihon reservation conversation.
- Email replies should not create separate conversations.
- All replies must remain linked to the same reservation thread.

## 14. Admin Requirements

Admins should be able to:

- View pending workshop submissions.
- Review workshop details.
- Approve workshops.
- Reject workshops with a required rejection reason or comment.
- View workshop status history, if applicable.
- View partner details.
- View workshop counts per partner.
- View and update the maximum workshop limit for each partner.
- View Reservation Numbers for booking lookup and support.
- Access booking-related message history when required for authorized support or dispute handling.
- View booking history and audit records.
- Moderate workshop reviews.
- Publish or reject submitted reviews.

## 15. Data Model Suggestions

Add or update database models and fields for:

- Partners
- Partner workshop limits
- Workshops
- Workshop dates
- Workshop time slots
- Workshop bookings
- Booking statuses
- Workshop review statuses
- Rejection comments and reasons
- Workshop reviews and ratings
- Review statuses
- Reservation Numbers
- Digital reservation tickets
- Booking-specific messages
- Message history
- Two-way email message synchronization
- Email message IDs
- Inbound email references
- Message sender type
- Message delivery status
- Message synchronization status
- Booking amendment or reschedule requests
- Booking history and audit records
- Booking status transition history
- Booking dashboard badges or indicator fields
- Admin-based review moderation history

Relationships should include:

- A partner can have many workshops, up to the configured workshop limit.
- A workshop belongs to one partner.
- A workshop can have many dates.
- A workshop date can have many time slots.
- A time slot can have many bookings.
- A booking belongs to a workshop, partner, date, and time slot.
- A workshop can have many reviews.
- A review belongs to a user and a workshop.
- A booking has one unique Reservation Number.
- A confirmed booking can have one digital reservation ticket.
- A booking can have many related messages.
- A booking can have many amendment or reschedule requests.
- A booking can have many booking history records.
- A booking status transition should store the previous status, new status, changed by, changed at, and optional reason or comment.

## 16. Validation and Security

The system should validate:

- Partner registration fields
- Workshop creation fields
- Workshop editing fields
- Workshop limit enforcement
- Workshop dates and time slots
- Booking capacity
- User booking details
- Rating and review submissions
- Admin approval and rejection actions
- Review moderation actions
- Reservation Number generation and uniqueness
- Digital reservation ticket access
- Digital reservation ticket data
- Booking message visibility
- Booking message submission
- Inbound email reply synchronization
- Booking amendment and reschedule requests
- Booking history and status transitions

Authorization rules:

- Only partners can create, edit, or suspend their own workshops.
- Partners can only create new workshops if they have not reached their assigned workshop limit.
- Only admins can approve or reject workshops.
- Only admins can update a partner’s maximum workshop limit.
- Users can only book approved and available workshops.
- Partners can only manage bookings for their own workshops.
- Only logged-in users can submit ratings and reviews.
- Only admins can publish or reject reviews.
- Only the related customer can request an amendment for their booking.
- Only the related workshop owner or authorized admin can approve or reject amendment requests.
- Only the related customer, workshop partner, and authorized admins can view booking messages and reservation ticket details.
- Booking history records should be append-only and protected from unauthorized edits or deletion.

Email synchronization security:

- Inbound email replies must be validated before being added to a reservation conversation.
- The system must confirm that the inbound email belongs to a valid reservation thread.
- Unauthorized users must not be able to inject messages into a reservation thread through email replies.
- Email replies should be linked to the correct booking using secure identifiers, not only visible email content.

Availability and booking security:

- The system must prevent overbooking during initial booking, cancellation, amendment approval, and reschedule approval.
- Amendment requests should only be approved if the requested date and time are available and belong to the same workshop.

## 17. Expected Outcome

After implementation:

- Users can register as partners from the `/partners` page.
- Partners can create and manage workshops from their dashboard.
- Partners can create multiple workshops up to their assigned workshop limit.
- The default workshop limit is 3 workshops per partner.
- Admins can update each partner’s workshop limit.
- Admins can review, approve, or reject workshops.
- Approved workshops appear on the `/experience` page.
- Users can filter workshops by location, category, price, duration, and language.
- Users can sort workshops by popularity, price, and rating.
- Users can book available workshop slots.
- Customers can provide a primary date/time and alternative booking options.
- Partners can confirm, cancel, reject, or suggest alternatives for bookings.
- Customers can request booking amendments or reschedules.
- Partners can approve or reject amendment requests.
- Availability counts update correctly.
- Reservation messages can be sent through YoNihon.
- Email replies can synchronize back into the same reservation conversation.
- Customers and partners can communicate securely in one booking-specific thread.
- Customers receive a clear digital reservation ticket for confirmed bookings.
- Workshop owners can verify reservations using Reservation Numbers.
- Booking change badges help partners identify new, amended, rescheduled, cancelled, and pending reservations quickly.
- Every booking keeps a complete audit history of changes, approvals, cancellations, and reschedules.
- Logged-in users can submit ratings and reviews.
- Admins moderate all workshop reviews.
- Published reviews are visible publicly and contribute to workshop ratings.
- Partners can view workshop performance metrics.
- Required email notifications are sent at each key workflow step.

## 18. Messaging System

Workshop owners and customers should have access to a secure in-platform messaging system after a reservation is submitted.

The messaging system should support communication about:

- Booking details
- Pre-workshop questions
- Reschedule requests
- Late arrival notices
- Attendance issues
- Special requirements
- Other workshop-related information

Requirements:

- All conversations should be linked to the specific booking.
- Both the customer and workshop owner should be able to view the full communication history.
- Messages created inside YoNihon and replies received through email synchronization should appear in the same conversation thread.
- The system should clearly show whether a message was sent from YoNihon or received through email reply synchronization.
- Phone calls or direct emails should only be used as secondary contact methods when one party does not respond within a reasonable time.

This feature should improve communication speed, reduce missed messages, reduce unnecessary phone calls and emails, and make booking management easier.

## 19. Reservation Number

Each reservation should automatically receive a unique Reservation Number when the booking request is created.

The Reservation Number should be displayed in:

- Customer booking confirmation
- Customer dashboard
- Workshop owner dashboard
- Admin dashboard
- Reservation email notifications
- Amendment and reschedule notifications
- Booking-related message notifications

Workshop owners should be able to search for or verify a reservation using:

- Reservation Number
- Customer name
- Booking details

This should speed up check-in, reduce errors, simplify reservation management, and provide a clear reference for communication, updates, cancellations, and support.

## 20. Digital Reservation Ticket

Once a reservation is confirmed, the system should automatically generate a digital reservation ticket.

The ticket should include:

- Reservation Number
- Workshop name
- Customer name
- Date and time
- Number of participants
- Workshop location
- Meeting instructions
- Other important booking details

Customers should be able to view the ticket from their dashboard at any time.

Customers should be able to present the ticket on arrival instead of searching through emails.

If possible, the ticket should support:

- Apple Wallet for iPhone users
- Google Wallet for Android users

This should provide a smoother check-in experience, reduce confusion during arrival, and make reservation management easier for customers and workshop owners.

## 21. Two-Way Reservation Messaging and Email Synchronization

Whenever a workshop owner or customer sends a message through the reservation messaging system, the recipient should automatically receive an email notification linked to the reservation.

The email should include the message or a short preview.

If the recipient replies directly to the email:

- The reply should automatically synchronize back into the same YoNihon reservation conversation.
- The reply should not create a separate conversation.
- The message should remain linked to the same Reservation Number and booking thread.

All messages, whether created inside YoNihon or received through email replies, must remain in one reservation thread visible to both the customer and workshop owner.

This feature should reduce missed messages, improve response times, and provide seamless communication.

## 22. Booking Amendment and Reschedule Workflow

Customers should be able to request a booking amendment for:

- Date changes
- Time changes
- Date and time changes

The request should require workshop owner approval, similar to a new booking request.

The system should clearly display:

- Original reservation details
- Requested new date and time
- Current status
- Requested change reason, if provided

While the request is pending, the booking status should temporarily become `Amendment Requested` or `Awaiting Approval`.

Once approved:

- The booking should update automatically.
- Availability counts should be recalculated safely.
- The audit history should be updated.

If rejected:

- The original booking details should remain unchanged.
- The customer should be notified.

Customers and workshop owners should receive email notifications when an amendment is:

- Requested
- Approved
- Rejected
- Completed

## 23. Booking Change Indicators

Workshop owner dashboards should clearly highlight booking types and booking changes using badges.

Badge examples:

- NEW
- AMENDED
- RESCHEDULED
- CANCELLED
- PENDING

Badges should appear in:

- Booking lists
- Booking detail views
- Dashboard notification sections
- Any area where reservation changes need quick attention

These indicators should help workshop owners identify important changes without opening each reservation.

## 24. Booking History

Every booking should retain a complete history of important booking actions.

Booking history should include:

- Amendments
- Approvals
- Rejections
- Cancellations
- Reschedules
- Status changes
- Partner actions
- Customer actions
- Admin actions

Each booking history record should include:

- Timestamp
- User who performed the action
- Action type
- Previous value
- New value
- Optional comment or reason

Booking history should be visible to admins for customer support and dispute handling.

Customers and workshop owners should be able to view relevant booking history for their own reservations, based on permission rules.

Booking history should not be editable or deletable by customers or partners.

## Core Status Values

| Entity | Statuses |
|---|---|
| Workshop | pending, approved, rejected, suspended |
| Booking | Requested, Pending Partner Review, Alternative Suggested, Awaiting Customer, Confirmed, Checked In, Completed, Cancelled by Customer, Cancelled by Partner, Expired, No Show, Amendment Requested, Rescheduled |
| Review | pending, published, rejected |
