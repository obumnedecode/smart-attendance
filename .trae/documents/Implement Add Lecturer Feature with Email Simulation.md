To implement the "Add Lecturer" functionality, we will create a modal flow where the admin can input lecturer details, and a backend API to create the account and simulate sending an email.

### 1. Backend Implementation
*   **Create Lecturer API (`app/api/admin/lecturers/route.ts`)**:
    *   This endpoint will handle `POST` requests.
    *   It will accept `name`, `email`, and optionally `password` (or generate a random one).
    *   It will create a new `User` document with the role `LECTURER`.
    *   It will hash the password before saving.
    *   **Email Simulation**: Since we don't have a real SMTP server setup, we will log the email content (credentials) to the console and return it in the API response for demonstration purposes.

### 2. Frontend Implementation
*   **Add Lecturer Modal (`screens/admin/AddLecturerModal.tsx`)**:
    *   Create a form with fields: Full Name, Email.
    *   On submit, call the new API endpoint.
    *   Show a success message with the generated credentials (simulating the email receipt).
*   **Update Admin Home (`screens/admin/AdminHome.tsx`)**:
    *   Add state to manage the modal visibility.
    *   Connect the "Add Lecturer" quick action button to open the modal.

### 3. Verification
*   Open the "Add Lecturer" modal from the dashboard.
*   Enter lecturer details and submit.
*   Verify the lecturer is created in the database.
*   Check the console/UI for the "sent" email content with login credentials.
