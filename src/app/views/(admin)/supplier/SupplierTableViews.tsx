"use client";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashBinIcon } from "@/icons";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FilterForm from "@/components/form/filter/FilterForm";
import { SupplierTableViewsProps } from "@/types/SupplierType";

export const SupplierTableViews = ({
  /* data,
  setData,
  loading,
  setLoading,
  fetchSuppliers,
  showAll,
  setShowAll,
  currentPage,
  setCurrentPage,
  totalPages,
  currentSegment,
  filterName,
  filterStatus,
  filterEmail,
  setFilterName,
  setFilterStatus,
  setFilterEmail,
  hasFetched, */
  fetchSuppliers,
  currentSegment,
  pagination,
  tableState,
  filters,
  setFilters,
}: SupplierTableViewsProps) => {
  const { data, setData, loading, setLoading, hasFetched } = tableState;
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    showAll,
    setShowAll,
    limit,
  } = pagination;

  const router = useRouter();

  const handleCheckAll = () => {};
  const handleCheck = () => {};

  const handleDelete = async (id: any) => {
    const confirmDelete = confirm("are you sure you want to delete??");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/supplier/${id}`,
        {
          method: "DELETE",
        },
      );
      fetchSuppliers();

      if (!response.ok) throw new Error("Failed to delete supplier");
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
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-3">
          {/* Filter Form */}
          <FilterForm
            fetchSuppliers={fetchSuppliers}
            setCurrentPage={setCurrentPage}
            showAll={showAll}
            setShowAll={setShowAll}
            filters={filters}
            setFilters={setFilters}
            // filterName={filterName}
            // filterStatus={filterStatus}
            // filterEmail={filterEmail}
            // setFilterName={setFilterName}
            // setFilterStatus={setFilterStatus}
            // setFilterEmail={setFilterEmail}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center py-6">
          <p>No data found</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <>
              <div className="max-w-full overflow-x-auto">
                {/* <div className="min-w-[1102px]"> */}

                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          onChange={handleCheckAll}
                        />
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Supplier Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Address
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {Array.isArray(data) &&
                      data.map((item: any) => (
                        <TableRow
                          key={item?.id}
                          className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                        >
                          <TableCell className="px-5 py-4 text-start sm:px-6">
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              value={item?.id}
                              onChange={handleCheck}
                            />
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start sm:px-6">
                            <Link href={`/admin/supplier/edit/${item?.id}`}>
                              <div className="flex items-center">
                                {item?.name}
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                            {item?.email}
                          </TableCell>
                          <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                            {item?.phone}
                          </TableCell>
                          <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">
                            {item?.address}
                          </TableCell>
                          <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                            <Badge
                              size="sm"
                              color={
                                item?.status === "Delivered"
                                  ? "success"
                                  : item?.status === "Pending"
                                    ? "warning"
                                    : "error"
                              }
                            >
                              {item?.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleDelete(item?.id)}
                            >
                              <TrashBinIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {/* </div> */}
              </div>
              {!showAll && (
                <div className="mt-6 gap-1 p-5">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};
