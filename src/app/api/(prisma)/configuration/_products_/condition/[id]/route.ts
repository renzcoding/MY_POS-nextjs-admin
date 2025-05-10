import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    const existCondition = await prisma.product_Condition.findUnique({
      where: { id: Number(id) },
    });

    if (!existCondition)
      return NextResponse.json(
        { message: "Condition not found", status: 404 },
        { status: 404 },
      );

    const updateProductCondition = await prisma.product_Condition.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        message: "Condition updated successfully",
        condition: updateProductCondition,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating condition",
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
    const existCondition = await prisma.product_Condition.findUnique({
      where: { id: Number(id) },
    });

    if (!existCondition)
      return NextResponse.json(
        { message: "Condition not found", status: 404 },
        { status: 404 },
      );

    const deleteCondition = await prisma.product_Condition.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Condition deleted successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting condition",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
