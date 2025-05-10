import { NextRequest, NextResponse } from "next/server";

export const ApiMiddleware = async (req: NextRequest) => {
  const { method, url } = req;
  console.log(`API ${method} ${url}`);

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
};
