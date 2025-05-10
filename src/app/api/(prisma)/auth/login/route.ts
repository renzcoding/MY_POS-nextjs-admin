import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { generateToken } from "@/utlils/jwt";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({
      status: 405,
      message: "Method Not Allowed",
    });
  }

  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and password are required",
      },
      { status: 401 },
    );
  }

  try {
    console.log("this is data body", email, password);
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("this is data login", user);
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Invalid password not match",
        },
        { status: 401 },
      );
    }

    const token = await generateToken(user);
    const response = NextResponse.json(
      {
        message: "Login Successfully",
        user: { id: user.id, email: user.email },
        token: token,
        status: 200,
      },
      { status: 200 },
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Database cannot Fetching Data", error: error.message },
      { status: 500 },
    );
  }
};
