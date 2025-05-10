import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    const existPayment = await prisma.payment_Method.findUnique({
      where: { id: Number(id) },
    });

    if (!existPayment)
      return NextResponse.json(
        { message: "Payment not found", status: 404 },
        { status: 404 },
      );

    const updateProductPayment = await prisma.payment_Method.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Payment updated successfully",
        Payment: updateProductPayment,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating Payment",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    const existPayment = await prisma.payment_Method.findUnique({
      where: { id: Number(id) },
    });

    if (!existPayment)
      return NextResponse.json(
        { message: "Payment not found", status: 404 },
        { status: 404 },
      );

    const deletePayment = await prisma.payment_Method.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Payment deleted successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting Payment",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
