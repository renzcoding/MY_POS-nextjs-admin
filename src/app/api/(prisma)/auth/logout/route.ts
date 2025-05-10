import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  // const response = NextResponse.json({ message: "Logged out successfully" });

  // response.cookies.set("auth-token", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/admin/signin",
  //   expires: new Date(0), // Expire immediately
  // });

  // return response;

  // Clear custom JWT (auth-token)
  const cookieStore = await cookies();
  cookieStore.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  // Optional: Clear NextAuth session cookie if used (usually handled by signOut)
  cookieStore.set("next-auth.session-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
