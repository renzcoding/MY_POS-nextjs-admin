import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    const existUnit = await prisma.product_Unit.findUnique({
      where: { id: Number(id) },
    });

    if (!existUnit)
      return NextResponse.json(
        { message: "Unit not found", status: 404 },
        { status: 404 },
      );

    const updateProductUnit = await prisma.product_Unit.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Unit updated successfully",
        Unit: updateProductUnit,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating Unit",
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
    const existUnit = await prisma.product_Unit.findUnique({
      where: { id: Number(id) },
    });

    if (!existUnit)
      return NextResponse.json(
        { message: "Unit not found", status: 404 },
        { status: 404 },
      );

    const deleteUnit = await prisma.product_Unit.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Unit deleted successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting Unit",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
