To replace the mock courses with actual courses, we need to fetch the approved courses for the logged-in lecturer from the database.

### 1. Backend API
*   **Create `app/api/lecturer/courses/route.ts`**:
    *   **GET**: Fetch courses for a specific lecturer.
        *   We can use the `CourseRequest` model where `lecturerId` matches the current user and `status` is `APPROVED`.
        *   Ideally, we should have a `Course` model, but since we are using `CourseRequest` approval to simulate course creation, we can query `CourseRequest` directly for now (or a separate `Course` collection if we decided to create one on approval).
        *   *Decision*: I'll stick to querying `CourseRequest` with `status: 'APPROVED'` as the source of truth for now to keep it simple and consistent with the previous step.

### 2. Frontend Implementation (`screens/LecturerDashboard.tsx`)
*   **State Management**:
    *   Add `courses` state to store the fetched courses.
    *   Add `loading` state.
*   **Fetch Data**:
    *   Use `useEffect` to call `/api/lecturer/courses?lecturerId={user.id}`.
*   **UI Updates**:
    *   Replace the hardcoded `courses` array with the data from state.
    *   Map the API response fields to the UI `Course` type.
        *   `imageUrl`: Use a random unsplash image based on course name or a placeholder.
        *   `room` & `time`: These fields are not in `CourseRequest`. I will add them to the `CourseRequest` model or just mock them for now/add them to the request form later.
        *   *Refinement*: I will add `room` and `time` to the `CourseRequest` model and the request form so the data is real.

### 3. Update Course Request Flow
*   **Update `models/CourseRequest.ts`**: Add `room` and `time` fields.
*   **Update `screens/lecturer/RequestCourseModal.tsx`**: Add inputs for Room and Time.
*   **Update `app/api/lecturer/course-request/route.ts`**: specific fields handling.

### 4. Verification
*   Submit a new course request with Room and Time.
*   Approve it as Admin.
*   Log in as Lecturer and verify the course appears in the dashboard.
