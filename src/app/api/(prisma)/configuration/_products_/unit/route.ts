import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const unit = await prisma.product_Unit.findMany();
    return new NextResponse(
      JSON.stringify({
        unit,
        message: "unit fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching unit",
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
    const unit = await prisma.product_Unit.create({
      data: {
        name,
        description,
      },
    });
    if (!unit) return NextResponse.json({ message: "Error in creating unit" });

    return NextResponse.json(
      { unit, message: "unit created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating unit",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
