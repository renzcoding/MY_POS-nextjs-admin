import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getProtectSessionServer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    // redirect if unauthorized
    redirect("/auth/signin");
  }

  return session;
};
