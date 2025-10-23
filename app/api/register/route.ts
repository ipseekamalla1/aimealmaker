import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // make sure you have this file created

export async function POST(req: Request) {
  try {
    const { fname, lname, username, email, password } = await req.json();

    if (!email || !password || !username)
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { fname, lname, username, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
