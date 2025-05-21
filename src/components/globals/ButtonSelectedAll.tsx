"use client";

import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";
import { GlobalButtonSelectedProps } from "@/types/GlobalType";

export default function ButtonSelectedAll({
  fetchListData,
  tableState,
  currentSegment,
}: GlobalButtonSelectedProps) {
  const { data, setData, setLoading, selectedIds, setSelectedIds } = tableState;
  const router = useRouter();

  const handleDeleteSelected = async () => {
    const confirmDelete = confirm("are you sure you want to delete all data??");
    if (!confirmDelete) return;

    try {
      setLoading?.(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${currentSegment}/multiple/delete`,
        {
          method: "POST",
          body: JSON.stringify({
            ids: selectedIds,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error(`Failed to delete ${currentSegment}`);

      fetchListData?.();
      const result = await response.json();
      console.log("this is delete result", result);

      // Option 1: Remove item from state
      setData(data.filter((item: any) => !selectedIds?.includes(item.id)));
      setSelectedIds([]);
      const timer = setTimeout(() => {
        router.replace(
          `${window.location.pathname}?warning=${currentSegment} deleted successfully!`,
        );
        setLoading?.(false);
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Failed to Delete ${currentSegment}, error`);
    }
  };

  const handleDisableSelected = async () => {
    const confirmDelete = confirm(
      "are you sure you want to Disable all data??",
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${currentSegment}/multiple/disabled`,
        {
          method: "POST",
          body: JSON.stringify({
            ids: selectedIds,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error(`Failed to delete ${currentSegment}`);

      fetchListData();
      const result = await response.json();
      console.log("this is disabled result", result);

      // Option 1: Remove item from state
      setData(data.filter((item: any) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      const timer = setTimeout(() => {
        router.replace(
          `${window.location.pathname}?info=${currentSegment} disabled successfully!`,
        );
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Failed to Disabled ${currentSegment}, error`);
    }
  };
  const handleEnableSelected = async () => {
    const confirmDelete = confirm(
      "are you sure you want to Enabled all data??",
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${currentSegment}/multiple/enabled`,
        {
          method: "POST",
          body: JSON.stringify({
            ids: selectedIds,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error(`Failed to enabled ${currentSegment}`);

      fetchListData();
      const result = await response.json();
      console.log("this is delete result", result);

      // Option 1: Remove item from state
      setData(data.filter((item: any) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      const timer = setTimeout(() => {
        router.replace(
          `${window.location.pathname}?info=${currentSegment} enabled successfully!`,
        );
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Failed to Endabled ${currentSegment}, error`);
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="primary"
        className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
        onClick={handleDeleteSelected}
      >
        DELETE ALL
      </Button>
      <Button
        size="sm"
        variant="primary"
        className="bg-orange-300 text-white hover:bg-orange-400 dark:bg-orange-300 dark:hover:bg-orange-400"
        onClick={handleDisableSelected}
      >
        DISABLE
      </Button>
      <Button
        size="sm"
        variant="primary"
        className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
        onClick={handleEnableSelected}
      >
        ENABLE
      </Button>
    </div>
  );
}
