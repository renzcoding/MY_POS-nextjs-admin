"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
