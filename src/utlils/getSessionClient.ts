"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function getProtectSessionClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "loading...";
  }
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return session;
}
