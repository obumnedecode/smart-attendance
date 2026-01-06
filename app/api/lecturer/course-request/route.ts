import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CourseRequest from '@/models/CourseRequest';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { lecturerId, lecturerName, courseName, courseCode, reason, room, time } = await req.json();

    if (!lecturerId || !courseName || !courseCode || !room || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRequest = await CourseRequest.create({
      lecturerId,
      lecturerName,
      courseName,
      courseCode,
      reason,
      room,
      time,
    });

    return NextResponse.json({
      message: 'Course request submitted successfully',
      request: newRequest,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error submitting course request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
