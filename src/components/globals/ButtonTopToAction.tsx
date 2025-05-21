"use client";

import React from "react";
import Button from "../ui/button/Button";
import { exportToExcel } from "@/utlils/downloadToAction";
import { BoxIcon } from "@/icons";
import UploadButton from "../upload/UploadFileButton";
import Link from "next/link";
import { getCurrentSegment } from "@/utlils/globalFunctions";
import { usePathname } from "next/navigation";

interface ButtonTopToActionProps {
  title: string;
  actions?: string;
  onSubmit?: () => void;
  data?: any;
  onDataImported?: () => void;
  loading: boolean;
  setLoading?: (loading: boolean) => void;
}

export default function ButtonTopToAction({
  title,
  actions,
  onSubmit,
  data,
  onDataImported,
  setLoading,
}: ButtonTopToActionProps) {
  const timestamp = new Date().toISOString().slice(0, 10);
  let currentSegment = getCurrentSegment();
  if (currentSegment === "configuration") {
    const pathname = usePathname(); // e.g., '/admin/configuration/products/category'
    const segments = pathname.split("/").filter(Boolean); // ['admin', 'configuration', 'products', 'category']
    currentSegment = `${segments[1]}/${segments[2]}/${segments[3]}`; // 'configuration/products/category';
  }
  return (
    <>
      <div className="ml-auto flex items-center justify-end justify-items-center gap-1 text-right">
        {actions === "" ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                exportToExcel(data, title, `${title}-${timestamp}`)
              }
              startIcon={<BoxIcon />}
            >
              Download
            </Button>
            <UploadButton
              setLoading={setLoading}
              onDataImported={onDataImported}
              currentSegment={currentSegment}
            />
            <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
              Print
            </Button>
            <Link
              href={`/admin/${currentSegment}/create`}
              className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ml-1 inline-flex cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-white transition"
            >
              Add {title} +
            </Link>
          </>
        ) : (
          <button
            onClick={onSubmit}
            className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ml-auto inline-flex cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-white transition"
          >
            Save {title}
          </button>
        )}
      </div>
    </>
  );
}
