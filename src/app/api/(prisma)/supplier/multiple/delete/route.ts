import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST")
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 },
    );

  const body = await req.json();
  const { ids } = body;
  try {
    const deleted = await prisma.supplier.deleteMany({
      where: { id: { in: ids } },
    });
    return NextResponse.json(
      { deleted, message: "Suppliers deleted successfully ", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: " Something went wrong", error: error.message },
      { status: 500 },
    );
  }
}
