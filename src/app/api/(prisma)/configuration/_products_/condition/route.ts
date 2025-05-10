import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const condition = await prisma.product_Condition.findMany();
    return new NextResponse(
      JSON.stringify({
        condition,
        message: "Condition fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching condition",
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
    const condition = await prisma.product_Condition.create({
      data: {
        name,
        description,
      },
    });
    if (!condition)
      return NextResponse.json({ message: "Error in creating condition" });

    return NextResponse.json(
      { condition, message: "Condition created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating condition",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
