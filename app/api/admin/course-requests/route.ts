import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CourseRequest from '@/models/CourseRequest';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function GET() {
  await dbConnect();

  try {
    const requests = await CourseRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ requests }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  await dbConnect();

  try {
    const { requestId, status } = await req.json();

    if (!requestId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedRequest = await CourseRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Fetch lecturer details to get email
    const lecturer = await User.findById(updatedRequest.lecturerId);

    if (lecturer && lecturer.email) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const isApproved = status === 'APPROVED';
        const subject = `Course Request Update: ${updatedRequest.courseName}`;
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${isApproved ? '#16a34a' : '#dc2626'};">
              Request ${isApproved ? 'Approved' : 'Declined'}
            </h2>
            <p>Hello <strong>${lecturer.name}</strong>,</p>
            <p>
              ${isApproved 
                ? `Congratulations! Your request to teach <strong>${updatedRequest.courseName} (${updatedRequest.courseCode})</strong> has been approved.` 
                : `We regret to inform you that your request to teach <strong>${updatedRequest.courseName} (${updatedRequest.courseCode})</strong> has been declined.`
              }
            </p>
            ${isApproved ? '<p>You can now access and manage this course from your lecturer dashboard.</p>' : ''}
            <p>Best regards,<br/>The Smart Attendance Admin Team</p>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: lecturer.email,
          subject,
          html,
        });

        console.log(`Email notification sent to ${lecturer.email}`);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue execution even if email fails
      }
    }

    return NextResponse.json({
      message: `Request ${status.toLowerCase()} successfully`,
      request: updatedRequest,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
