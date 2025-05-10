import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface productInput {
  name: string;
  price: number;
  description: string;
  stock: number;
  supplierId: number;
  categoryId: number;
  image: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, supplier: true },
    });
    return NextResponse.json(
      { products, message: "Products fetched successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching products",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: productInput = await req.json();
    const product = await prisma.product.create({
      data: body,
    });
    return NextResponse.json(
      { product, message: "Product created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in Creating product",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
