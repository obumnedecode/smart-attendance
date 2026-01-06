import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Generate a random password
    const rawPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const lecturer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'LECTURER',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Smart Attendance Pro - Your Lecturer Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d7ff2;">Welcome to Smart Attendance Pro!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Your lecturer account has been successfully created. You can now access the lecturer dashboard to manage your courses and track attendance.</p>
          <div style="background-color: #f5f7f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Here are your login credentials:</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Password:</strong> ${rawPassword}</p>
          </div>
          <p>Please change your password after your first login for security purposes.</p>
          <p>Best regards,<br/>The Smart Attendance Admin Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Lecturer created successfully',
      lecturer: {
        id: lecturer._id,
        name: lecturer.name,
        email: lecturer.email,
        role: lecturer.role,
      },
      // Keeping credentials in response for immediate UI feedback as well
      credentials: {
        email,
        password: rawPassword
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating lecturer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
