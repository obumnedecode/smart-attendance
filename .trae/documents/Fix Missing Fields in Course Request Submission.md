To resolve the "Failed to submit request" error (400 Bad Request), I need to investigate why the backend is rejecting the request.

Based on the logs:
`POST /api/lecturer/course-request 400`

And the `RequestCourseModal` code:

```typescript
        body: JSON.stringify({
          lecturerId: user.id,
          lecturerName: user.name,
          courseName,
          courseCode,
          reason,
          // Missing room and time in the body? No, wait, let me check the previous Read output.
        }),
```

Wait, looking at the `Read` output for `RequestCourseModal.tsx` (lines 24-34):

```typescript
24→      const res = await fetch('/api/lecturer/course-request', {
25→        method: 'POST',
26→        headers: { 'Content-Type': 'application/json' },
27→        body: JSON.stringify({
28→          lecturerId: user.id,
29→          lecturerName: user.name,
30→          courseName,
31→          courseCode,
32→          reason,
33→        }),
34→      });
```

**CRITICAL BUG FOUND**: The `room` and `time` fields are **MISSING** from the `JSON.stringify` body in the `handleSubmit` function. I added the state variables and the inputs, but I forgot to include them in the payload sent to the API.

The backend API explicitly checks for these fields:

```typescript
    if (!lecturerId || !courseName || !courseCode || !room || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
```

This is why the request is failing with 400.

### Plan

1. **Fix** **`screens/lecturer/RequestCourseModal.tsx`**: Add `room` and `time` to the request body in `handleSubmit`.

### Verification

1. Retry submitting the form with the same details. It should succeed.

