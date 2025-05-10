"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { SessionProviderCustom } from "@/context/SessionContext";
import { getProtectSessionClient } from "@/utlils/getSessionClient";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = getProtectSessionClient();
  const token = session?.accessToken; // you must have accesstoken from jwt

  if (token) {
    try {
      const decoded = jwt.decode(token) as { exp: number };
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        redirect("/auth/signin");
      }
    } catch (error) {
      console.log("Token decoded failed", error);
      redirect("/auth/signin");
    }
  }

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader session={session} />
        {/* Page Content */}
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          <SessionProviderCustom session={session}>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </SessionProviderCustom>
        </div>
      </div>
    </div>
  );
}
