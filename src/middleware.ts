import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyToken } from "@/utlils/jwt";
import { getToken } from "next-auth/jwt";

// Extend the token type
interface MyToken {
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  role?: string;
  exp?: number;
}

export const config = {
  matcher: [
    "/admin/:path*", // protect admin route
    "/dashboard/:path*", // or others
    "/admin/supplier",
  ],
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req: NextRequest) {
  // return NextResponse.next();
  /* const cookieStore = await cookies();
  const token: any = cookieStore.get("auth-token");
  console.log("this is token first", token?.user);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // redirect to login page if token is not found or invalid"/login");
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // redirect to login page if token is not found or invalid"/login");
  } */

  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as MyToken | null;
  console.log("Access token:", token?.accessToken); // your own JWT

  if (!token) return NextResponse.redirect(new URL("/auth/signin", req.url));

  const now = Math.floor(Date.now() / 1000);
  if (token.exp && token.exp < now) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const isApi = req.nextUrl.pathname.startsWith("/api");
  // ✅ Skip API and static files
  const isStatic =
    req.nextUrl.pathname.includes(".") ||
    req.nextUrl.pathname.startsWith("/_next");

  if (isApi || isStatic) {
    return NextResponse.next();
  }

  // 🔐 If no token, redirect to login
  if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // ✅ Example: restrict access to admin pages
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
