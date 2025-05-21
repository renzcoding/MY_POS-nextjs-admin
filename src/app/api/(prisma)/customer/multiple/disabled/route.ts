import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const urlPath = req.nextUrl.pathname;
  const currentSegment =
    urlPath.split("/").filter(Boolean).at(-1) || "customer";
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        status: 405,
        message: "Method Not Allowed",
      },
      { status: 405 },
    );
  }

  const body = await req.json();
  const { ids } = body;
  try {
    const enabled = await prisma.customer.updateMany({
      where: { id: { in: ids } },
      data: { status: "INACTIVE" },
    });
    return NextResponse.json(
      {
        enabled,
        message: `${currentSegment} enabled successfully `,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: " Something went wrong", error: error.message },
      { status: 500 },
    );
  }
};
