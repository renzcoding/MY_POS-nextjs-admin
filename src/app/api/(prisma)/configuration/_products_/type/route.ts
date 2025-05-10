import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const type = await prisma.product_Type.findMany();
    return new NextResponse(
      JSON.stringify({
        type,
        message: "type fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching type",
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
    const type = await prisma.product_Type.create({
      data: {
        name,
        description,
      },
    });
    if (!type) return NextResponse.json({ message: "Error in creating type" });

    return NextResponse.json(
      { type, message: "type created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating type",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
