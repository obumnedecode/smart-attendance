import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CourseRequest from '@/models/CourseRequest';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const lecturerId = searchParams.get('lecturerId');

    if (!lecturerId) {
      return NextResponse.json({ error: 'Lecturer ID is required' }, { status: 400 });
    }

    const courses = await CourseRequest.find({
      lecturerId,
      status: 'APPROVED',
    }).sort({ createdAt: -1 });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
