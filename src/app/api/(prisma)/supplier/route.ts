import prisma from "@/lib/prisma";
import { SupplierFormValuesType } from "@/types/SupplierType";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const showAll = searchParams.get("showAll") === "true";
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const email = searchParams.get("email");

  const filters: any = {};
  if (name) filters.name = { contains: name };
  if (email) filters.email = { contains: email };
  if (status) filters.status = status;

  try {
    const [data, total] = await Promise.all([
      prisma.supplier.findMany({
        where: filters,
        skip: showAll ? undefined : skip,
        take: showAll ? undefined : limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.supplier.count({ where: filters }),
    ]);

    return NextResponse.json(
      {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        message: "Suppliers fetched successfully",
        status: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching suppliers",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req: Request) => {
  const body: SupplierFormValuesType = await req.json();
  const { name, email, address, phone, userId } = body;
  const status = "Active";

  if (!name || !email || !address || !phone) {
    return NextResponse.json(
      { error: "All field required", status: 404 },
      { status: 404 },
    );
  }

  try {
    // check email if exist
    const existEmail = await prisma.supplier.findUnique({ where: { email } });
    if (existEmail) {
      return NextResponse.json(
        { message: "Email already exist", status: 400 },
        { status: 400 },
      );
    }

    const CreateSupplier = await prisma.supplier.create({
      data: {
        name,
        email,
        address,
        phone,
        status,
        userId,
      },
    });
    return new NextResponse(
      JSON.stringify({
        supplier: CreateSupplier,
        message: "Supplier created successfully",
        status: 200,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating supplier",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};
