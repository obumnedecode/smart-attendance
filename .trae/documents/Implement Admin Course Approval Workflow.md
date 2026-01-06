To display real course requests for approval/rejection, we need to implement the full flow for fetching and managing `CourseRequest` data.

### 1. Backend API
*   **Create `app/api/admin/course-requests/route.ts`**:
    *   **GET**: Fetch all course requests (populate with lecturer details if needed).
    *   **PATCH**: Handle Approval/Rejection.
        *   Accepts `requestId` and `status` ('APPROVED', 'REJECTED').
        *   If 'APPROVED', it should technically create a `Course` record (though we haven't fully defined the Course model yet, we can update the request status for now and assume it triggers course creation).

### 2. Frontend Implementation (`screens/admin/AdminCourses.tsx`)
*   **Fetch Data**:
    *   Use `useEffect` to fetch requests from `/api/admin/course-requests`.
    *   Store requests in state.
*   **UI Updates**:
    *   Replace `MOCK_COURSES` with the fetched requests.
    *   Separate the view into "Pending Requests" and "Active Courses" (or just show requests for now as requested).
    *   **Card Actions**: Add "Approve" (Check icon) and "Reject" (X icon) buttons for pending requests.
*   **Handle Actions**:
    *   Implement `handleApprove` and `handleReject` functions that call the PATCH API.
    *   Update UI optimistically or refetch data on success.

### 3. Verification
*   Use the "Request New Course" feature as a lecturer to create a request.
*   Log in as Admin.
*   Go to "Courses" tab.
*   Verify the new request appears.
*   Test Approve/Reject buttons.
