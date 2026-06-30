# Partner Workshop Management and Booking Workflow

Implementation requirements for partner registration, workshop approval, bookings, availability, emails, reviews, performance reporting, and additional booking management requirements.

> Additional requirements added from `partner_workshop_requirements 1.1` are highlighted in blue in the PDF version.

## 1. Partner Registration

Add functionality on the `/partners` page so users can register as partners of the site.

When a partner registers:

- Create a partner account/profile.
- Send an email notification to the partner confirming registration.
- Send an email notification to the site admin about the new partner registration.

## 2. Partner Dashboard

After registering, partners should have access to a dashboard where they can manage workshops.

Partners should be able to:

- Add new workshops.
- Add multiple workshops, subject to the maximum workshop limit configured for that partner.
- Edit existing workshops.
- Suspend workshops.
- View workshop performance metrics.
- Manage workshop availability directly from their dashboard.
- Use a simple calendar interface to manage availability.
- Mark specific dates and time slots as available or unavailable.
- Update availability quickly and easily without technical knowledge.

## 3. Partner Workshop Limit

There should be a maximum number of workshops that can be created by each partner.

- Set the default maximum workshop limit to 3 workshops per partner for the moment.
- Site admins should be able to update the maximum workshop limit for each partner from the admin dashboard.
- Partners should not be able to create more workshops than their assigned limit.
- If a partner reaches their workshop limit, show a clear message in the partner dashboard.

## 4. Workshop Creation

When creating a workshop, partners should be able to define:

- Workshop details such as title, description, location, category, price, duration, language, images, and any other required fields.
- Available dates.
- Time slots for each date.
- Booking capacity/count for each time slot.

Each workshop can have multiple dates and multiple time slots.

## 5. Workshop Review Workflow

When a partner submits a workshop, its status should be set to pending.

Site admins should be able to review submitted workshops from the admin panel.

Admins should be able to:

- Approve a workshop.
- Reject a workshop.
- Add a rejection reason/comment when rejecting a workshop.

Workshop statuses should include at least:

- pending
- approved
- rejected
- suspended

When a workshop is approved, it should become visible on the `/experience` page.

When a workshop is rejected, the partner should be able to view the rejection reason/comment.

Send an email notification to the partner whenever the workshop status changes.

## 6. Workshop Editing Workflow

Partners should be able to edit their workshops.

When an approved or rejected workshop is edited and submitted again:

- Change the workshop status back to pending.
- Require site admin review and approval again before it appears on `/experience`.

Suspended workshops should not be visible on `/experience`.

## 7. Experience Page Filtering and Sorting

On the `/experience` page, users should be able to filter and sort approved workshops.

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

Filters and sorting should work together and should only show approved and active workshops.

## 8. Workshop Booking Flow

Users should be able to book approved workshops from the `/experience` page.

The booking flow should allow users to:

- Select a workshop.
- Select an available date.
- Select an available time slot.
- Fill in user details, similar to the current booking implementation.
- Submit the booking.
- Customers should be able to select a preferred primary date and time when making a reservation.
- Customers should also be able to select one or more alternative secondary dates and time slots.
- If the primary date or time is unavailable, the workshop partner should be able to confirm one of the alternative options without contacting the customer again to find another suitable time.
- This should make the booking process faster, reduce unnecessary back-and-forth communication, and increase the chances of successfully confirming reservations.

Users should only be able to book a time slot if booking capacity is available.

After the user submits a booking:

- Create a booking record.
- Set booking status to pending.
- Reduce the available booking count for the selected time slot.
- Send an email notification to the workshop partner.
- Send an email notification to the user confirming the booking submission.

## 9. Partner Booking Management

Workshop partners should be able to view bookings for their workshops in their dashboard.

- Reservation requests should not be confirmed automatically.
- Each booking request should be sent to the workshop owner, who can review it and either accept or reject the reservation.
- If the requested date or time is unavailable, the workshop owner should be able to suggest alternative available dates and time slots.
- The customer should be able to choose one of the suggested options and confirm the booking.
- This should keep the booking process flexible while ensuring workshop owners have full control over their schedule.

Partners should be able to:

- Confirm a booking.
- Cancel a booking.

Booking statuses should include at least:

- pending
- confirmed
- cancelled

When a booking is cancelled:

- Increase the available booking count for the related time slot.

When a booking status changes:

- Send an email notification to the user.

## 10. Availability Rules

Booking availability should be calculated per workshop date and time slot.

- Each time slot must have its own booking capacity.
- A user should not be able to book a time slot if the available count is zero.
- The system should prevent overbooking, including cases where multiple users try to book the same slot at the same time.

## 11. Workshop Ratings and Reviews

Users should be able to rate and review workshops.

- Users must be logged in before they can submit a rating or review.
- After a user submits a review, the review status should be set to pending.
- Workshop partners should be able to review submitted reviews for their own workshops.
- Workshop partners should be able to publish or reject a review.
- Send an email notification to the workshop partner when a new review is submitted.
- When a review is published by the partner, send an email notification to the user informing them that their review has been published.
- Rejected reviews should not be visible publicly.
- Published reviews should contribute to the workshop rating shown on the `/experience` page.

Review statuses should include at least:

- pending
- published
- rejected

## 12. Partner Workshop Performance Dashboard

Partners should be able to view performance metrics for their workshops from their dashboard.

The performance dashboard should show metrics such as:

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

Partners should only be able to view performance data for their own workshops.

Admins may also have access to overall workshop performance across all partners, if required.

## 13. Email Notifications

Implement email notifications for the following scenarios:

- Partner registration - send to partner and site admin.
- Workshop status change - send to partner.
- User submits a booking - send to workshop partner and user.
- Booking status change - send to user.
- Review submitted - send to workshop partner.
- Review published - send to the review user.
- Customer booking confirmation should include the Reservation Number once the booking request is created.
- If a confirmed booking generates a digital reservation ticket, the customer should be able to access the ticket from their dashboard rather than relying only on email.

## 14. Admin Requirements

Admins should be able to:

- View pending workshop submissions.
- Review workshop details.
- Approve workshops.
- Reject workshops with a required rejection reason/comment.
- View workshop status history if applicable.
- View and update the maximum workshop limit for each partner.
- View partner details and workshop counts.
- View Reservation Numbers in the admin dashboard for booking lookup and support.
- Access booking-related message history when required for authorized customer support or dispute handling.

## 15. Data Model Suggestions

Add or update database models/tables as needed for:

- Partners
- Partner workshop limits
- Workshops
- Workshop dates
- Workshop time slots
- Workshop bookings
- Workshop review status
- Rejection comments/reasons
- Booking statuses
- Workshop reviews and ratings
- Review statuses
- Reservation Numbers for booking requests.
- Digital reservation tickets for confirmed bookings.
- Booking-specific messages and message history.

Ensure relationships are properly defined:

- A partner can have many workshops, up to their configured workshop limit.
- A workshop belongs to one partner.
- A workshop can have many dates.
- A workshop date can have many time slots.
- A time slot can have many bookings.
- A booking belongs to a workshop, partner, date, and time slot.
- A workshop can have many reviews.
- A review belongs to a user and a workshop.
- A booking can have one unique Reservation Number.
- A confirmed booking can have one digital reservation ticket.
- A booking can have many related messages.

## 16. Validation and Security

Implement proper validation for:

- Partner registration fields.
- Workshop creation and editing fields.
- Workshop limit enforcement.
- Workshop dates and time slots.
- Booking capacity.
- User booking details.
- Review and rating submission.
- Admin approval/rejection actions.
- Partner review publish/reject actions.
- Reservation Number generation and uniqueness.
- Digital reservation ticket access and ticket data.
- Booking message visibility and message submission.

Ensure authorization rules:

- Only partners can create, edit, or suspend their own workshops.
- Only partners who have not reached their workshop limit can create new workshops.
- Only admins can approve or reject workshops.
- Only admins can update a partner's maximum workshop limit.
- Users can only book approved and available workshops.
- Partners can only manage bookings for their own workshops.
- Only logged-in users can submit workshop ratings and reviews.
- Partners can only publish or reject reviews for their own workshops.
- Only the related customer, workshop partner, and authorized admins should be able to view booking messages and reservation ticket details.

## 17. Expected Outcome

After implementation:

- Users can register as partners from `/partners`.
- Partners can create and manage multiple workshops from their dashboard, up to their configured workshop limit.
- The default workshop limit is 3 workshops per partner.
- Admins can update the workshop limit for each partner from their dashboard.
- Admins can review, approve, or reject workshops.
- Approved workshops appear on `/experience`.
- Users can filter workshops by location, category, price, duration, and language.
- Users can sort workshops by popularity, price, and rating.
- Users can book available workshop slots.
- Partners can confirm or cancel bookings.
- Availability counts update correctly.
- Logged-in users can submit ratings and reviews.
- Reviews stay pending until the workshop partner publishes or rejects them.
- Published reviews are visible publicly and contribute to workshop ratings.
- Partners can view workshop performance metrics.
- Required email notifications are sent at each key workflow step.
- Customers can provide primary and alternative booking date/time options.
- Customers and partners can communicate securely through booking-specific messages.
- Customers receive a clear digital reservation ticket for confirmed bookings.
- Workshop owners can verify reservations quickly using Reservation Numbers.

## 18. Messaging System

- Workshop owners and customers should have access to a secure in-platform messaging system once a reservation has been submitted.
- Both parties should be able to communicate directly about the booking without relying on phone calls or emails.
- The messaging system should support booking details, pre-workshop questions, reschedule requests, late arrival notices, attendance issues, special requirements, and other workshop-related information.
- All conversations should remain linked to the specific booking so both parties can view the communication history.
- Phone calls or emails should only be used as a secondary contact method if one party does not respond through the messaging system within a reasonable time.
- This feature should improve communication speed, improve customer experience, reduce unnecessary emails and phone calls, and make booking management easier.

## 19. Reservation Number

- Each reservation should automatically receive a unique Reservation Number when the booking request is created.
- The Reservation Number should be displayed in the customer booking confirmation, customer dashboard, workshop owner dashboard, and admin dashboard.
- When the customer arrives, the workshop owner should be able to search for or verify the reservation using the Reservation Number, customer name, and booking details.
- This should speed up check-in, reduce errors, simplify reservation management, and provide an easy reference for communication, booking updates, cancellations, and customer support.

## 20. Digital Reservation Ticket

- Once a reservation is confirmed, the system should automatically generate a digital reservation ticket.
- The ticket should include the Reservation Number, workshop name, customer name, date and time, number of participants, workshop location, meeting instructions, and other important booking details.
- Customers should be able to view the ticket from their dashboard at any time.
- Customers should be able to present the ticket upon arrival instead of searching through emails.
- If possible, the ticket should support Apple Wallet for iPhone users and Google Wallet for Android users.
- This should provide a smoother check-in experience, reduce confusion during arrival, and make reservation management easier for customers and workshop owners.

## Core Status Values

| Entity | Statuses |
|---|---|
| Workshop | pending, approved, rejected, suspended |
| Booking | pending, confirmed, cancelled |
| Review | pending, published, rejected |

---

# v2.2 Additions Based on Analysis of `partner_workshop_requirements 2.1`

The following items should be appended to the existing v2.1 document. Newly added v2.2 content is highlighted in green in the PDF version.

These additions extend the existing messaging, booking management, email notification, admin, data model, validation, expected outcome, and status-value sections already present in v2.1.

## Where the New Requirements Fit in the Existing v2.1 Document

| v2.2 Requirement | Related v2.1 Sections | How it should be added |
|---|---|---|
| 21. Two-Way Reservation Messaging & Email Synchronization | 13. Email Notifications<br>14. Admin Requirements<br>15. Data Model Suggestions<br>16. Validation and Security<br>18. Messaging System | Append as an enhancement to the existing booking-specific messaging system and email notification rules. |
| 22. Booking Amendment / Reschedule Workflow | 8. Workshop Booking Flow<br>9. Partner Booking Management<br>10. Availability Rules<br>15. Data Model Suggestions<br>16. Validation and Security<br>17. Expected Outcome | Append as a formal amendment workflow for customer date/time change requests that require partner approval. |
| 23. Booking Change Indicators | 9. Partner Booking Management<br>12. Partner Workshop Performance Dashboard<br>14. Admin Requirements | Append dashboard badge/indicator rules so partners can immediately identify important booking changes. |
| 24. Booking History | 14. Admin Requirements<br>15. Data Model Suggestions<br>16. Validation and Security<br>17. Expected Outcome | Append booking audit history requirements covering amendments, approvals, cancellations, and reschedules. |
| Recommended Improvements | 5. Workshop Review Workflow<br>9. Partner Booking Management<br>11. Workshop Ratings and Reviews<br>Core Status Values | Append the review moderation change and replace the basic booking status set with a fuller status lifecycle. |

## Add to Section 13. Email Notifications

- When a workshop owner or customer sends a message through the reservation messaging system, the recipient should automatically receive an email notification linked to the related reservation.
- The email notification should include the full message or a short preview of the message.
- If the recipient replies directly to the email, the reply should automatically synchronize back into the same YoNihon reservation conversation.
- Email replies should not create separate conversations. They must remain linked to the same reservation thread.
- Email notifications for amendment requests, amendment approvals, reschedules, cancellations, and booking status changes should include the Reservation Number for easy reference.

## Add to Section 18. Messaging System

- The reservation messaging system should support two-way email synchronization.
- Messages created inside YoNihon and replies received by email should appear in the same conversation thread.
- Both the customer and workshop owner should be able to view the full conversation history from the reservation page or dashboard.
- The system should clearly indicate whether a message was sent from YoNihon or received through email reply synchronization.
- This should reduce missed messages, improve response times, and provide seamless communication.

## Add to Section 9. Partner Booking Management

- Customers should be able to request a booking amendment for date changes, time changes, or both.
- Amendment and reschedule requests should require workshop owner approval, similar to a new booking request.
- The partner dashboard should display the original reservation details alongside the requested new date and time.
- While the request is waiting for action, the booking status should temporarily become Amendment Requested or Awaiting Approval.
- Once approved by the workshop owner, the booking date and/or time should update automatically.
- If the request is rejected, the original reservation details should remain unchanged and the customer should be notified.
- Workshop owners should be able to identify booking changes using badges such as NEW, AMENDED, RESCHEDULED, CANCELLED, and PENDING without opening each reservation.

## Add New Section 21. Two-Way Reservation Messaging & Email Synchronization

- Whenever a workshop owner or customer sends a message through the reservation messaging system, the recipient should automatically receive an email notification linked to the reservation.
- The email should include the message or a preview of the message.
- If the recipient replies directly to the email, the reply should automatically synchronize back into the same YoNihon reservation conversation.
- All messages, regardless of whether they originate from YoNihon or email, must remain in a single reservation thread visible to both the customer and workshop owner.
- The feature should reduce missed messages, improve response times, and provide seamless communication.

## Add New Section 22. Booking Amendment / Reschedule Workflow

- Customers should be able to request a booking amendment for a date change, time change, or both.
- The request should require workshop owner approval, similar to a new booking request.
- The system should clearly display the original reservation details alongside the requested new date and time.
- Booking status should temporarily become Amendment Requested or Awaiting Approval while the request is pending.
- Once approved, the booking should update automatically while preserving an audit history.
- Availability counts should be recalculated safely when a booking is rescheduled to another date or time slot.
- Customers and workshop owners should receive email notifications when an amendment is requested, approved, rejected, or completed.

## Add New Section 23. Booking Change Indicators

- Workshop owner dashboards should clearly highlight booking types and changes using badges.
- Badge examples should include NEW, AMENDED, RESCHEDULED, CANCELLED, and PENDING.
- Badges should appear in booking lists, booking detail views, and any dashboard areas where reservation changes need quick attention.
- The indicators should help workshop owners identify important changes immediately without opening every reservation.

## Add New Section 24. Booking History

- Every booking should retain a complete history of amendments, approvals, cancellations, and reschedules.
- Each booking history record should include timestamp, user who performed the action, action type, previous value, new value, and optional comments or reason.
- Booking history should be visible to admins for support and dispute handling.
- Customers and workshop owners should be able to view relevant booking history for their own reservations, based on permission rules.
- Booking history should not be editable or deletable by customers or partners.

## Update Section 11. Workshop Ratings and Reviews

- Replace partner-controlled review approval with admin moderation only.
- After a user submits a review, the review status should remain pending until an admin publishes or rejects it.
- Workshop partners may be notified when a review is submitted, but they should not be able to publish or reject reviews directly.
- When an admin publishes a review, send an email notification to the review user informing them that their review has been published.
- Rejected reviews should remain hidden publicly and should be available to admins for moderation history.

## Update Section 15. Data Model Suggestions

- Add data models or fields for two-way email message synchronization, including email message IDs, inbound email references, sender type, delivery status, and synchronization status.
- Add booking amendment or reschedule request records linked to the original booking.
- Add booking history/audit records for every booking-related action.
- Add booking status transition history to track old status, new status, changed by, changed at, and reason/comment.
- Add booking dashboard badge or indicator fields, or derive these indicators from booking status/history.
- Update review moderation data so admin moderation is the source of truth for publishing or rejecting reviews.

## Update Section 16. Validation and Security

- Validate that inbound email replies belong to a valid reservation conversation before syncing them into YoNihon.
- Prevent unauthorized users from injecting messages into a reservation thread through email replies.
- Validate amendment requests to ensure the requested date and time are available, valid, and connected to the same workshop.
- Prevent overbooking during amendment approval or reschedule approval.
- Only the related customer should be able to request an amendment for their booking.
- Only the related workshop owner or authorized admin should be able to approve or reject amendment requests.
- Only admins should be able to publish or reject reviews.
- Booking history records should be append-only and protected from unauthorized changes.

## Update Section 17. Expected Outcome

- Reservation messages can be sent and received through YoNihon and synchronized email replies while remaining in one booking conversation thread.
- Customers can request booking amendments or reschedules from their reservation details.
- Workshop owners can approve or reject amendment requests while seeing the original and requested reservation details together.
- Booking change badges allow workshop owners to identify new, amended, rescheduled, cancelled, and pending reservations quickly.
- Every booking keeps a complete audit history of changes, approvals, cancellations, and reschedules.
- Admins moderate all workshop reviews instead of workshop partners controlling review publishing or rejection.

## Update Core Status Values

| Entity | Statuses |
|---|---|
| Workshop | pending, approved, rejected, suspended |
| Booking | Requested, Pending Partner Review, Alternative Suggested, Awaiting Customer, Confirmed, Checked In, Completed, Cancelled by Customer, Cancelled by Partner, Expired, No Show, Amendment Requested, Rescheduled |
| Review | pending, published, rejected |
