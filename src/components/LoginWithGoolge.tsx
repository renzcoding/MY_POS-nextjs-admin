"use client";

import { signIn } from "next-auth/react";

export default function LoginWithGoolge() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Login With Google
    </button>
  );
}
