"use client";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Sign out
      </button>
    </div>
  );
}
