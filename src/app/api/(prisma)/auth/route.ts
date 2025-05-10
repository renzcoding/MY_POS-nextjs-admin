import { verifyToken } from "@/utlils/jwt";
import { NextResponse } from "next/server";

export default async function handler(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token)
    return NextResponse.json(
      { message: "Unauthorized : Token not found provided" },
      { status: 401 }
    );

  try {
    const decoded = verifyToken(token!);
    if (!decoded)
      return NextResponse.json(
        { message: "Forbiddeb : Invalid token" },
        { status: 401 }
      );

    return NextResponse.json(
      { message: "Token is valid", decoded },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
