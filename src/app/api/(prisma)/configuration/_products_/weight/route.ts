import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const weight = await prisma.product_Weight.findMany();
    return new NextResponse(
      JSON.stringify({
        weight,
        message: "weight fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching weight",
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
    const weight = await prisma.product_Weight.create({
      data: {
        name,
        description,
      },
    });
    if (!weight)
      return NextResponse.json({ message: "Error in creating weight" });

    return NextResponse.json(
      { weight, message: "weight created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating weight",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
