import SupplierListViews from "@/app/views/(admin)/supplier";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { authOptions } from "@/lib/auth-options";
import { getProtectSessionServer } from "@/utlils/getSessionServer";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default async function SupplierPage() {
  // const session = await getProtectSessionServer();
  /* const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    // redirect if unauthorized
    redirect("/auth/signin");
  } */

  /* const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/supplier?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        segment: params.segment,
      },
      // 👇 This is important to include session cookies
      credentials: "include",
    },
  );

  const result = await response.json();

  const data = {
    ...result,
  }; */

  return (
    <div>
      <PageBreadcrumb pageTitle="Supplier List" />
      <div className="space-y-5">
        <SupplierListViews />
      </div>
    </div>
  );
}
