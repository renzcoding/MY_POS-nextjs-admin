import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        supplier: true,
        OrderDetail: true,
        Post: true,
      },
    });
    if (!product)
      return NextResponse.json(
        { message: "Product not found", status: 404 },
        { status: 404 },
      );

    return NextResponse.json(
      { product, message: "Product fetched successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  const { name, price_sales, description, stock, categoryId, supplierId } =
    await req.json();
  try {
    const productExist = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!productExist)
      return NextResponse.json({ message: "Product not found" });

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price_sales,
        description,
        stock,
        categoryId,
        supplierId,
      },
    });

    return NextResponse.json(
      {
        product,
        message: "Product updated successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating product",
        status: 500,
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  try {
    const productExist = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!productExist)
      return NextResponse.json({ message: "Product not found" });
    const deleteProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      {
        product: deleteProduct,
        message: "Product deleted successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting product",
        status: 500,
        error: error.message,
      },
      { status: 500 },
    );
  }
};
