import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error : Error in Fetching users", {
      status: 500,
    });
  }
}

export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, email, password, role } = body;
  role === "" ? "user" : role;

  if (!username || !email || !password || !role) {
    return new NextResponse("All Field are required ", { status: 400 });
  }

  try {
    // check if email already exist
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse("user already exists ", { status: 409 });
    }

    // hash Password before saving
    const hasingPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hasingPassword,
        role,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "User created successfully", user }),
      {
        status: 201,
      },
    );
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const { username, email, password, role } = await req.json();

  if (!userId) {
    return new NextResponse("Invalid or Misiing User ID", { status: 400 });
  } else {
    try {
      // check if email already exist
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      if (!existingUser) {
        return new NextResponse("user not found ", { status: 409 });
      }

      const updateUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          username: username || existingUser.username,
          email: email || existingUser.email,
          password: password
            ? await bcrypt.hash(password, 10)
            : existingUser.password,
          role: role || existingUser.role,
        },
      });

      return new NextResponse(
        JSON.stringify({
          message: "Users Updated successfully",
          user: updateUser,
        }),
        { status: 200 },
      );
    } catch (error: any) {
      return new NextResponse(
        "Database Error : Error in Fetching Users" + error.message,
        { status: 500 },
      );
    }
  }
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  try {
    // check if email already exist
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!existingUser) {
      return new NextResponse("user not found ", { status: 409 });
    }

    const user = await prisma.user.delete({ where: { id: Number(userId) } });
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully", user }),
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return new NextResponse(
      "Database Error : Error in Deleting Users" + error.message,
      { status: 500 },
    );
  }
};
