import prisma from "@/lib/prisma";
import { CustomerInputProps } from "@/types/CustomerType";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const urlPath = req.nextUrl.pathname;
  const currentSegment =
    urlPath.split("/").filter(Boolean).at(-1) || "customer";

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const showAll = searchParams.get("showAll") === "true";
  const name = searchParams.get("name");
  const firstname = searchParams.get("firstname");
  const status = searchParams.get("status");
  const email = searchParams.get("email");

  const filters: any = {};
  if (name) filters.name = { contains: name };
  if (firstname) filters.firstname = { contains: firstname };
  if (email) filters.email = { contains: email };
  if (status) filters.status = status;

  try {
    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        where: filters,
        skip: showAll ? undefined : skip,
        take: showAll ? undefined : limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.customer.count({ where: filters }),
    ]);

    return NextResponse.json(
      {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        message: `Data from ${currentSegment} fetched successfully`,
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
        message: `Database Error : Error in Fetching ${currentSegment}`,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const urlPath = req.nextUrl.pathname;
  const currentSegment =
    urlPath.split("/").filter(Boolean).at(-1) || "customer";

  const body: CustomerInputProps = await req.json();
  const { firstname, email, address, mobile } = body;

  if (!firstname || !email || !address || !mobile) {
    return NextResponse.json(
      {
        message: "All field required Please check your data and try again",
        error: "All field required",
        status: 404,
      },
      { status: 404 },
    );
  }

  try {
    const cleanBody = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => {
        if (value === undefined || value === null) return false;
        if (typeof value === "string") return value.trim() !== "";
        return true;
      }),
    );
    console.log("this is clean body", cleanBody);

    // check email if exist
    const existEmail = await prisma.customer.findUnique({ where: { email } });
    if (existEmail) {
      return NextResponse.json(
        { message: "Sorry this Email already exist", status: 400 },
        { status: 400 },
      );
    }

    const created = await prisma.customer.create({
      data: { email, ...cleanBody, status: "Active" },
    });
    return new NextResponse(
      JSON.stringify({
        data: created,
        message: `Data ${currentSegment} created successfully`,
        status: 200,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Database Error : Error in creating ${currentSegment}`,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
};
