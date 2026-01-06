import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();

  try {
    const adminExists = await User.findOne({ role: 'ADMIN' });

    if (adminExists) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 200 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('pass123admin', salt);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@qr.com',
      password: hashedPassword,
      role: 'ADMIN',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
    });

    return NextResponse.json({ message: 'Admin created successfully', admin: { email: admin.email, role: admin.role } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
