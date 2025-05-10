import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    const existWeight = await prisma.product_Weight.findUnique({
      where: { id: Number(id) },
    });

    if (!existWeight)
      return NextResponse.json(
        { message: "Weight not found", status: 404 },
        { status: 404 },
      );

    const updateProductWeight = await prisma.product_Weight.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Weight updated successfully",
        Weight: updateProductWeight,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating Weight",
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
    const existWeight = await prisma.product_Weight.findUnique({
      where: { id: Number(id) },
    });

    if (!existWeight)
      return NextResponse.json(
        { message: "Weight not found", status: 404 },
        { status: 404 },
      );

    const deleteWeight = await prisma.product_Weight.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Weight deleted successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting Weight",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
