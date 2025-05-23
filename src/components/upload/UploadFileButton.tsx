"use client";

import * as XLSX from "xlsx";
import { useRef, useState } from "react";
import Button from "../ui/button/Button";
import { BoxIcon } from "@/icons";
import { parseExcelToJSON } from "@/utlils/parseExcelToJSON";
import { useRouter } from "next/navigation";

interface UploadButtonProps {
  setLoading?: (loading: boolean) => void;
  onDataImported?: () => void; // Callback function to notify the parent about successful import
  currentSegment?: string;
}

export default function UploadButton({
  setLoading,
  onDataImported,
  currentSegment,
}: UploadButtonProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [field, setField] = useState("");

  const handleButtonClick = () => {
    console.log("test clisckk");
    hiddenFileInput.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading?.(true);

    try {
      const file = event.target.files?.[0];
      if (!file) return;
      const jsonData = await parseExcelToJSON(file);

      // Step 1: Import data
      const importRes = await fetch(`/api/${currentSegment}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suppliers: jsonData }),
      });

      const importResult = await importRes.json();

      if (!importRes.ok) {
        throw new Error(importResult.message || "Failed to import data");
      }
      alert(importResult.message || "Import complete");

      // Step 2: Fetch updated list AFTER import success
      //   const listRes = await fetch(`/api/${currentSegment}`);
      //   const listData = await listRes.json();

      //   // Step 3: Pass updated list to parent
      onDataImported?.();
      setTimeout(() => {
        router.replace(
          `/admin/${currentSegment}?success=Import complete successfully`,
        );
      }, 2000);
    } catch (error) {
      console.log(`Failed to fetch data ${currentSegment}s`, error);
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".xlsx,.csv"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Custom Trigger Button */}

      <Button
        size="sm"
        variant="outline"
        onClick={handleButtonClick}
        startIcon={<BoxIcon />}
      >
        Upload
      </Button>
    </>
  );
}
