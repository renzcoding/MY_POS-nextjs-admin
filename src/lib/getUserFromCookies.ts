import { verifyToken } from "@/utlils/jwt";
import { cookies } from "next/headers";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const token: any = cookieStore.get("auth-token");

  if (!token) return null;

  const user = await verifyToken(token); // <-- need to await this
  return user;
};
