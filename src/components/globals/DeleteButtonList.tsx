"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import { GlobalDeleteButtonListProps } from "@/types/GlobalType";
import { TrashBinIcon } from "@/icons";

export default function DeleteButtonList({
  fetchListData,
  tableState,
  currentSegment,
  item,
}: GlobalDeleteButtonListProps) {
  const router = useRouter();
  const { data, setData, loading, setLoading } = tableState;
  const handleDelete = async (id: any) => {
    const confirmDelete = confirm("are you sure you want to delete??");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${currentSegment}/${id}`,
        {
          method: "DELETE",
        },
      );
      fetchListData();

      if (!response.ok) throw new Error(`Failed to delete ${currentSegment}`);
      const result = await response.json();
      console.log("this is delete result", result);

      // Option 1: Remove item from state
      setData(data.filter((item: any) => item.id !== id));
      setTimeout(() => {
        router.replace(
          `${window.location.pathname}?warning=${currentSegment} deleted successfully!`,
        );
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.error(`Error deleting ${currentSegment}:`, error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="primary"
        onClick={() => handleDelete(item?.id)}
      >
        <TrashBinIcon />
      </Button>
    </>
  );
}
