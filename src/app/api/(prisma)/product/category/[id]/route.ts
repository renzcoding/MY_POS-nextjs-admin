import prisma from "@/lib/prisma";
import { NEXT_CACHE_REVALIDATED_TAGS_HEADER } from "next/dist/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    const category = await prisma.product_Category.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Category fetched successfully", category, status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Database Error : Error in Fetching category", error: error },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { name } = await req.json();
  const { id } = params;

  try {
    const categoryExist = await prisma.product_Category.findUnique({
      where: { id: Number(id) },
    });
    if (!categoryExist)
      return NextResponse.json(
        { message: "Category not found", status: 404 },
        { status: 404 },
      );

    const category = await prisma.product_Category.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(
      {
        message: "Category updated successfully",
        category,
        status: 200,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating category",
        error: error,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = context.params;
  try {
    const categoryExist = await prisma.product_Category.findUnique({
      where: { id: Number(id) },
    });
    if (!categoryExist)
      return NextResponse.json(
        { message: "Category not found", status: 404 },
        { status: 404 },
      );

    const category = await prisma.product_Category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Category deleted successfully", category, status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting category",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
