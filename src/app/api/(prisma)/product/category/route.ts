import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const categories = await prisma.product_Category.findMany();
    return NextResponse.json(
      { categories, message: "Categories fetched successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching categories",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, description } = body;
  try {
    const createCategory = await prisma.product_Category.create({
      data: { name, description },
    });

    return NextResponse.json(
      {
        categories: createCategory,
        message: "Category created successfully",
        status: 201,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in creating category",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
