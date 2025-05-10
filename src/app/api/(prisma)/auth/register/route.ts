import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { username, email, password, role } = await req.json();
  const roleValue = role === "admin" ? "admin" : "user";
  const hashedPassword = await hash(password, 10);

  if (!username || !email || !password) {
    return NextResponse.json({ error: "All field required" }, { status: 404 });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 404 }
      );
    }

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, role: roleValue },
    });

    return NextResponse.json(
      { message: "Data has success created", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Database cannot fatching data " + error.message },
      { status: 500 }
    );
  }
};
