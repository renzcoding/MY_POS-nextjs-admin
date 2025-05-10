import prisma from "@/lib/prisma";
import { globalInput } from "@/types/GlobalType";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  // const { id } = req.url.split("/").pop() as string;
  const { id } = await context.params;
  const body: globalInput = await req.json();
  try {
    const existTranType = await prisma.transaction_type.findUnique({
      where: { id: Number(id) },
    });

    if (!existTranType)
      return NextResponse.json(
        { message: "Transaction Type cannot found", status: 404 },
        { status: 404 },
      );

    const updateTransType = await prisma.transaction_type.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Transaction Type updated successfully",
        transactionType: updateTransType,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        error: error.message,
        message: "Database Error : Error in updating",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    const existTranType = await prisma.transaction_type.findUnique({
      where: { id: Number(id) },
    });
    if (!existTranType)
      return NextResponse.json(
        { message: "Transaction Type cannot found", status: 404 },
        { status: 404 },
      );
    await prisma.transaction_type.delete({ where: { id: Number(id) } });
    return NextResponse.json(
      {
        message: "Transaction Type deleted successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        error: error.message,
        message: "Database Error : Error in deleting",
      },
      { status: 500 },
    );
  }
};
