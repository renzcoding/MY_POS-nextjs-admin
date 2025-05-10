"use client";

import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: `POST` });
    // await signOut({ callbackUrl: "/login" });

    // redirect to login or home
    redirect("/auth/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-2xl"
    >
      Logout
    </button>
  );
}
