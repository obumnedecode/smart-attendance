To implement the "Request Course Assignment" feature, we will create a full-stack flow where lecturers can submit a request, which is then stored in the database for admin approval.

### 1. Database Schema
*   **Create `models/CourseRequest.ts`**:
    *   Fields:
        *   `lecturerId`: ObjectId (ref to User)
        *   `lecturerName`: String
        *   `courseName`: String
        *   `courseCode`: String
        *   `reason`: String (optional)
        *   `status`: String ('PENDING', 'APPROVED', 'REJECTED')
        *   `createdAt`: Date

### 2. Backend API
*   **Create `app/api/lecturer/course-request/route.ts`**:
    *   **POST**: Handles the submission of a new request.
        *   Validates input.
        *   Creates a new `CourseRequest` document.
        *   Returns success message.

### 3. Frontend Components
*   **Create `screens/lecturer/RequestCourseModal.tsx`**:
    *   A modal form with fields:
        *   Course Name
        *   Course Code
        *   Reason/Notes
    *   Handles form submission to the API.
    *   Shows success/error states.
*   **Update `LecturerDashboard.tsx`**:
    *   Import and integrate the `RequestCourseModal`.
    *   Connect the "Request New Course Assignment" button to open this modal.

### 4. Verification
*   Log in as a lecturer.
*   Click the "Request New Course Assignment" button.
*   Fill out the form and submit.
*   Verify the request is saved in the database (via API response or checking the DB directly/logs).
