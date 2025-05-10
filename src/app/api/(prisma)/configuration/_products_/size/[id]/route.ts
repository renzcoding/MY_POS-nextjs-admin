import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    const existSize = await prisma.product_Size.findUnique({
      where: { id: Number(id) },
    });

    if (!existSize)
      return NextResponse.json(
        { message: "Size not found", status: 404 },
        { status: 404 },
      );

    const updateProductSize = await prisma.product_Size.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Size updated successfully",
        Size: updateProductSize,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating Size",
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
    const existSize = await prisma.product_Size.findUnique({
      where: { id: Number(id) },
    });

    if (!existSize)
      return NextResponse.json(
        { message: "Size not found", status: 404 },
        { status: 404 },
      );

    const deleteSize = await prisma.product_Size.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Size deleted successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting Size",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
