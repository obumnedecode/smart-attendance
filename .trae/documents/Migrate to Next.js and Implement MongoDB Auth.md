To implement the backend using Next.js API routes and MongoDB, we will migrate the current Vite application to a **Next.js** application. This allows us to have both the frontend and the backend API in the same project.

Here is the step-by-step plan:

### 1. Setup & Migration
*   **Install Dependencies**: Add `next`, `mongoose`, `bcryptjs`, `jsonwebtoken`, and `cookies-next`.
*   **Configure Next.js**:
    *   Create `next.config.mjs`.
    *   Update `package.json` scripts (`dev`, `build`, `start`).
*   **Move Files**:
    *   Convert `index.html` to `app/layout.tsx`.
    *   Move `App.tsx` logic to `app/page.tsx` (Client Component).
    *   Move styles to `app/globals.css`.

### 2. Database & Models
*   **Database Connection**: Create `lib/db.ts` to manage the MongoDB connection.
*   **User Model**: Create `models/User.ts` with schema supporting roles (`STUDENT`, `LECTURER`, `ADMIN`) and password hashing.

### 3. Backend API Routes (`app/api/`)
*   **Seed Admin**: Create a route `app/api/seed/route.ts` to initialize the admin account (`admin@qr.com` / `pass123admin`) if it doesn't exist.
*   **Authentication**:
    *   `app/api/auth/login/route.ts`: Verify credentials and set an HTTP-only cookie.
    *   `app/api/auth/me/route.ts`: specific endpoint to check the current session/cookie and return the user profile.
    *   `app/api/auth/logout/route.ts`: Clear the session.

### 4. Frontend Integration
*   **Connect Login**: Update `screens/Login.tsx` to call the real `/api/auth/login` endpoint instead of the mock logic.
*   **Session Management**: Update `App.tsx` to check for an active session on load (call `/api/auth/me`).
*   **Protection**: Ensure the Admin Dashboard is only accessible when the authenticated user has the `ADMIN` role.

### 5. Verification
*   Start the Next.js server.
*   Trigger the seed (via curl or browser) to create the admin.
*   Log in with the admin credentials.
*   Verify access to the Admin Dashboard.
