"use client";
import Link from "next/link";
import React from "react";
import Button from "../ui/button/Button";
import { BoxIcon } from "@/icons";
import { exportToCSV, exportToExcel } from "@/utlils/downloadToAction";
import UploadButton from "../upload/UploadFileButton";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  action?: string;
  loading?: boolean;
  success?: boolean;
  onSubmit?: () => void;
  data?: any;
  onDataImported?: () => void;
  setLoading?: (loading: boolean) => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  action = "",
  onSubmit,
  data,
  onDataImported,
  setLoading,
}) => {
  const timestamp = new Date().toISOString().slice(0, 10);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="justify-align-center flex flex-row items-center border-b border-gray-100 px-6 py-5">
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        {action === "" ? (
          <>
            <div className="ml-auto flex items-center justify-items-center gap-1 text-right">
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
              />
              <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
                Print
              </Button>
            </div>
            <Link
              href={"/admin/supplier/create"}
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
            Save
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="border-t border-gray-100 p-4 sm:p-6 dark:border-gray-800">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
