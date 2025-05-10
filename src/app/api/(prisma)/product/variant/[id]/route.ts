import prisma from "@/lib/prisma";
import { NEXT_CACHE_REVALIDATED_TAGS_HEADER } from "next/dist/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    const variant = await prisma.product_Variant.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "variant fetched successfully", variant, status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Database Error : Error in Fetching variant", error: error },
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
    const variantExist = await prisma.product_Variant.findUnique({
      where: { id: Number(id) },
    });
    if (!variantExist)
      return NextResponse.json(
        { message: "variant not found", status: 404 },
        { status: 404 },
      );

    const variant = await prisma.product_Variant.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(
      {
        message: "variant updated successfully",
        variant,
        status: 200,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating variant",
        error: error,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = context.params;
  try {
    const variantExist = await prisma.product_Variant.findUnique({
      where: { id: Number(id) },
    });
    if (!variantExist)
      return NextResponse.json(
        { message: "variant not found", status: 404 },
        { status: 404 },
      );

    const variant = await prisma.product_Variant.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "variant deleted successfully", variant, status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting variant",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
