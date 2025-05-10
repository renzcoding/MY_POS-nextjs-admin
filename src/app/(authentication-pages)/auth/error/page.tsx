// app/auth/error/page.tsx or pages/auth/error.tsx (depending on routing)
"use client";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">Login Error</h1>
      <p className="mt-4 text-gray-700">
        {error || "An unknown error occurred. Please try again."}
      </p>
    </div>
  );
}
