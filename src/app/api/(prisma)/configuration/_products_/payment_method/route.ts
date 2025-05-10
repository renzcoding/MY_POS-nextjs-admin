import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const payments = await prisma.payment_Method.findMany();
    return new NextResponse(
      JSON.stringify({
        payments,
        message: "payments fetched successfully",
        status: 201,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Database Error : Error in Fetching payments",
        error: error.message,
      }),
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, description } :any = body;

  try {
    const payments = await prisma.payment_Method.create({
      data: {
        name,
        description,
      },
    });
    if (!payments)
      return NextResponse.json({ message: "Error in creating payments" });

    return NextResponse.json(
      { payments, message: "payments created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating payments",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
