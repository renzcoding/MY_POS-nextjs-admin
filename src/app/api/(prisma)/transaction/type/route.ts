import prisma from "@/lib/prisma";
import { globalInput } from "@/types/GlobalType";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const transactionType = await prisma.transaction_type.findMany();
    return new NextResponse(
      JSON.stringify({
        transactionType,
        message: "Transaction Type Fetched Successfully",
        status: 200,
      }),
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: "Database Error: Error in Fetching Data",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: globalInput = await req.json();
    const { name, description, userId } = body;
    const transactionType = await prisma.transaction_type.create({
      data: {
        name,
        description,
        userId,
      },
    });
    return new NextResponse(
      JSON.stringify({
        transactionType,
        message: "Transaction Type Created Successfully",
        status: 201,
      }),
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: "Database Error: Error in Creating Data",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};
