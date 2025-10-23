import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { fname, lname, username, email, password } = await req.json();

    // 1️⃣ Check required fields
    if (!fname || !lname || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 2️⃣ Trim inputs
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();

    // 3️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 4️⃣ Validate password strength
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
        },
        { status: 400 }
      );
    }

    // 5️⃣ Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 400 }
      );
    }

    // 6️⃣ Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken." },
        { status: 400 }
      );
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8️⃣ Create new user
    const user = await prisma.user.create({
      data: {
        fname: fname.trim(),
        lname: lname.trim(),
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
      },
    });

    // 9️⃣ Return success (never return password)
    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
