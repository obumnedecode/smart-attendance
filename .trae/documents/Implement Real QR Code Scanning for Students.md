To implement real QR code scanning in the Student Dashboard, I will use the `react-qr-reader` library (or a similar lightweight HTML5 QR scanner) to access the device's camera.

1.  **Install Dependency**: `npm install react-qr-scanner` (or `react-qr-reader`).
    *   *Note*: `react-qr-reader` is a popular choice but can have compatibility issues with React 18 strict mode. I'll use a reliable wrapper or alternative if needed. Let's try `react-qr-scanner` or standard `html5-qrcode`.
    *   *Decision*: `html5-qrcode` is robust and works well with React.

2.  **Update `StudentDashboard.tsx`**:
    *   **Conditional Rendering**: When "Scan" is clicked, replace the blurred background image with the live camera feed.
    *   **Scanner Integration**: Initialize the QR scanner in the camera view area.
    *   **Success Callback**: When a QR code is detected:
        *   Stop scanning.
        *   Extract the `sessionCode` from the QR result.
        *   Automatically call the `POST /api/attendance/record` API.
        *   Show the success/failure overlay.

3.  **Fallback**: Keep the "Manual Entry" card for cases where the camera fails or the student prefers typing.

### Plan
1.  Install `html5-qrcode`.
2.  Update `StudentDashboard.tsx` to implement the live camera scanning logic.
