import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const size = await prisma.product_Size.findMany();
    return new NextResponse(
      JSON.stringify({
        size,
        message: "size fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching size",
        error: error.message,
      }),
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, description } = body;

  try {
    const size = await prisma.product_Size.create({
      data: {
        name,
        description,
      },
    });
    if (!size) return NextResponse.json({ message: "Error in creating size" });

    return NextResponse.json(
      { size, message: "size created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating size",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
