To implement the end-to-end attendance flow:

1.  **Backend - Database Model**:
    *   Create `models/Attendance.ts` to store check-in records (`studentId`, `courseCode`, `sessionCode`, `timestamp`).

2.  **Backend - API**:
    *   Create `app/api/attendance/record/route.ts`:
        *   **POST**: Allows a student to check in. It will validate the input and save the record.
        *   **GET**: Allows the lecturer to fetch the count of attendees for a specific course/session.

3.  **Frontend - Lecturer Side**:
    *   Update `screens/lecturer/AttendanceSession.tsx` to poll the `GET` API every 5 seconds to show the live "Present" count.

4.  **Frontend - Student Side**:
    *   Update `screens/StudentDashboard.tsx` to simulate the scanning process.
    *   When the "Scan" button is clicked (or frame tapped), show a "Scanning..." state for 2 seconds.
    *   Then call the **POST** API to record attendance.
    *   Show a success or error message based on the result.

This will connect the two dashboards so that when a student "scans", the lecturer's counter goes up.
