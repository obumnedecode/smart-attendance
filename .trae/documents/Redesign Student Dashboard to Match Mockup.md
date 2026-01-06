To update the Student Dashboard to match the provided image design, I will:

1. **Redesign** **`StudentDashboard.tsx`**:

   * **Header**: "Smart Attendance" logo/title on the left, Settings icon on the right.

   * **Course Banner**: A blue pill showing the current course code and name (e.g., "CS101 - INTRO TO ALGORITHMS"). I don't want this

   * **Title**: "Scan for Attendance" with a subtext instruction. this should be the banner

   * **Camera Viewfinder**: A large central area simulating a camera view.

     * Blurry background image (classroom).

     * Blue corner brackets indicating the scanning area.

     * A scanning line animation.

     * **Controls Overlay**: Three circular buttons at the bottom of the viewfinder: Gallery (left), Scan/QR (center, highlighted), Flash (right).

   * **Troubleshooting Card**: A card below the viewfinder: "Having trouble scanning? Enter the class code manually".

   * **Footer**: "Last check-in" status with a green checkmark.

2. **Functionality**:

   * The "Scan" button (center of viewfinder) will trigger `onStartAttendance`.

   * I'll simulate the "Camera View" using the existing background image approach but styled to match the mock.

### Implementation Steps

1. Update `screens/StudentDashboard.tsx` with the new JSX structure and Tailwind styles.
2. Add the specific "blue corner" and "scan line" styling.

