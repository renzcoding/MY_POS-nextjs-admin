import prisma from "@/lib/prisma";
import { SupplierInput } from "@/types/SupplierType";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.method !== "POST")
    return NextResponse.json(
      {
        message: "Method not allowed",
        error: "Method not allowed",
        status: 405,
      },
      { status: 405 },
    );
  const body = await req.json();
  const { suppliers }: { suppliers: SupplierInput[] } = body;

  console.log("this is suppliers import", suppliers);

  if (!Array.isArray(suppliers)) {
    return NextResponse.json(
      {
        message: "suppliers must be an array",
        error: "suppliers must be an array",
        status: 400,
      },
      { status: 400 },
    );
  }

  try {
    // Optional validate and sanitaze each entry
    const created = await prisma.supplier.createMany({
      data: suppliers.map((supplier: SupplierInput) => ({
        name: supplier.name,
        email: supplier.email,
        address: supplier.address,
        phone: supplier.phone,
        userId: supplier.userId,
        status: supplier.status,
        createdAt: supplier.createdAt,
        updatedAt: supplier.updatedAt,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json(
      { created, message: "Supplier created successfully", status: 201 },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating supplier",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
