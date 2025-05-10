"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    // router.push("/auth/custom/logincustom");
    // return null;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
    </div>
  );
}
