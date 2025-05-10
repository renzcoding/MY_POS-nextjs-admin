import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name, role } = await req.json();
  const newRole = role === "" || role === undefined ? "member" : role;
  console.log(email, password, name, newRole);

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "Email already exist", status: 400 },
        { status: 400 }
      );

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, role: newRole },
    });
    console.log(user);

    return NextResponse.json(
      { user, message: "user created", status: 200 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", status: 500 },
      { status: 500 }
    );
  }
}
