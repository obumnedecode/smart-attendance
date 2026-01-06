To send email notifications when a course request is approved or rejected, I will update the backend API to trigger an email using `nodemailer`.

### 1. Update Backend API (`app/api/admin/course-requests/route.ts`)
*   **Fetch Lecturer Email**:
    *   Currently, `CourseRequest` stores `lecturerId` and `lecturerName` but not the email.
    *   I need to fetch the `User` (lecturer) using the `lecturerId` from the `CourseRequest` to get their email address.
*   **Configure Nodemailer**:
    *   Reuse the existing Nodemailer setup (using `EMAIL_USER` and `EMAIL_PASS` from env).
*   **Send Email Logic**:
    *   After updating the status to `APPROVED` or `REJECTED`, construct an email.
    *   **Subject**: "Course Request Update: [Course Name]"
    *   **Body**:
        *   If **Approved**: "Congratulations! Your request to teach [Course Name] ([Course Code]) has been approved. You can now manage this course in your dashboard."
        *   If **Rejected**: "We regret to inform you that your request to teach [Course Name] ([Course Code]) has been declined."
*   **Error Handling**: Ensure that if email sending fails, the API still returns a success response for the status update (but maybe logs the email error).

### 2. Verification
*   Create a request as a lecturer.
*   Log in as admin and approve the request.
*   Check the lecturer's email inbox for the approval notification.
