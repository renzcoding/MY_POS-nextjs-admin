import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, contect: { params: any }) => {
  const { id } = await contect.params;
  try {
    // check supplier by id
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });
    if (!supplier)
      return NextResponse.json(
        { message: "Supplier not found", status: 404 },
        { status: 404 },
      );

    return NextResponse.json(
      {
        supplier: supplier,
        message: "Supplier fetched successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching supplier",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  try {
    // check supplier by id
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!supplier)
      return NextResponse.json(
        { message: "Supplier not found", status: 404 },
        { status: 404 },
      );

    const updateSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(
      {
        supplier: updateSupplier,
        message: "Supplier updated successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating supplier",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    // check supplier by id
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!supplier)
      return NextResponse.json(
        { message: "Supplier not found", status: 404 },
        { status: 404 },
      );

    const deleteSupplier = await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      {
        message: "Supplier deleted successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting supplier",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
