import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: { params: any }) => {
  const { id } = await context.params;
  console.log("this is user id : ", id);

  if (!id) {
    return new NextResponse("Invalid or Missing User ID", { status: 400 });
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) return new NextResponse("User Not Found", { status: 400 });

      return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
      return new NextResponse(
        "Database Error in Fetching Data" + error.message,
        {
          status: 500,
        }
      );
    }
  }
};
