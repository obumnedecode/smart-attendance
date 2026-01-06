To implement the "Start Attendance" feature with the specific UI and functionality (Timer, QR Code, GPS Guard), I will:

1.  **Create `AttendanceSession.tsx`**:
    *   This component will replace the dashboard view when a lecturer starts a session.
    *   **UI Structure**:
        *   **Header**: Close button (X), Course Name, Settings Icon.
        *   **Title**: "Lecture [N]: [Topic]" (Can be dynamic or hardcoded for now).
        *   **Status**: "Accepting Responses" (Green Pill).
        *   **Timer**: Large Countdown Timer (Minutes : Seconds).
        *   **QR Code**: Large QR Code in the center (using `react-qr-code`).
        *   **Controls**: "Regenerate QR Code", "End Attendance" (Blue Button).
        *   **GPS Verification**: Toggle Switch + Map View (Placeholder or integration if possible).
    *   **State**:
        *   `timeLeft`: Number (seconds).
        *   `isGpsEnabled`: Boolean.
        *   `qrValue`: String (Dynamic).
        *   `attendanceCode`: String (Unique session code).

2.  **Logic & Functionality**:
    *   **Start Attendance Modal**: Before jumping to the session screen, show a modal to set:
        *   Duration (minutes).
        *   Topic (optional).
        *   Enable GPS Guard (toggle).
        *   Proximity Radius (if GPS enabled).
    *   **Session Management**:
        *   When "Start Attendance" is clicked -> Show Setup Modal -> "Start" -> Switch to `AttendanceSession`.
        *   `AttendanceSession` handles the countdown.
        *   "End Attendance" returns to Dashboard.

3.  **Refinement**:
    *   Since `AttendanceSession.tsx` doesn't exist yet, I'll create it.
    *   I'll also create a `StartAttendanceModal` to capture the settings before starting.

### Plan
1.  **Create `StartAttendanceModal.tsx`**: To capture Duration and GPS settings.
2.  **Create `AttendanceSession.tsx`**: The main screen as per the user's image.
3.  **Update `LecturerDashboard.tsx`**: To handle the flow (Show Modal -> Show Session).
