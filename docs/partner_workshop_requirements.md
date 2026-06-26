# Partner Workshop Management and Booking Workflow

## 1. Partner Registration

Add functionality on the /partners page so users can register as partners of the site.

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

When a workshop is approved, it should become visible on the /experience page.

When a workshop is rejected, the partner should be able to view the rejection reason/comment.

Send an email notification to the partner whenever the workshop status changes.

## 6. Workshop Editing Workflow

Partners should be able to edit their workshops.

When an approved or rejected workshop is edited and submitted again:

- Change the workshop status back to pending.
- Require site admin review and approval again before it appears on /experience.

Suspended workshops should not be visible on /experience.

## 7. Experience Page Filtering and Sorting

On the /experience page, users should be able to filter and sort approved workshops.

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

Users should be able to book approved workshops from the /experience page.

The booking flow should allow users to:

- Select a workshop.
- Select an available date.
- Select an available time slot.
- Fill in user details, similar to the current booking implementation.
- Submit the booking.

Users should only be able to book a time slot if booking capacity is available.

After the user submits a booking:

- Create a booking record.
- Set booking status to pending.
- Reduce the available booking count for the selected time slot.
- Send an email notification to the workshop partner.
- Send an email notification to the user confirming the booking submission.

## 9. Partner Booking Management

Workshop partners should be able to view bookings for their workshops in their dashboard.

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
- Published reviews should contribute to the workshop rating shown on the /experience page.

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

1. Partner registration - send to partner and site admin.
2. Workshop status change - send to partner.
3. User submits a booking - send to workshop partner and user.
4. Booking status change - send to user.
5. Review submitted - send to workshop partner.
6. Review published - send to the review user.

## 14. Admin Requirements

Admins should be able to:

- View pending workshop submissions.
- Review workshop details.
- Approve workshops.
- Reject workshops with a required rejection reason/comment.
- View workshop status history if applicable.
- View and update the maximum workshop limit for each partner.
- View partner details and workshop counts.

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

Ensure relationships are properly defined:

- A partner can have many workshops, up to their configured workshop limit.
- A workshop belongs to one partner.
- A workshop can have many dates.
- A workshop date can have many time slots.
- A time slot can have many bookings.
- A booking belongs to a workshop, partner, date, and time slot.
- A workshop can have many reviews.
- A review belongs to a user and a workshop.

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

Ensure authorization rules:

- Only partners can create, edit, or suspend their own workshops.
- Only partners who have not reached their workshop limit can create new workshops.
- Only admins can approve or reject workshops.
- Only admins can update a partner's maximum workshop limit.
- Users can only book approved and available workshops.
- Partners can only manage bookings for their own workshops.
- Only logged-in users can submit workshop ratings and reviews.
- Partners can only publish or reject reviews for their own workshops.

## 17. Expected Outcome

After implementation:

- Users can register as partners from /partners.
- Partners can create and manage multiple workshops from their dashboard, up to their configured workshop limit.
- The default workshop limit is 3 workshops per partner.
- Admins can update the workshop limit for each partner from their dashboard.
- Admins can review, approve, or reject workshops.
- Approved workshops appear on /experience.
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
