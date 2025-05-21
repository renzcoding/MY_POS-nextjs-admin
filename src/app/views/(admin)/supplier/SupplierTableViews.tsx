"use client";
import Badge from "@/components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import FilterForm from "@/components/form/filter/FilterForm";
import { SupplierTableViewsProps } from "@/types/SupplierType";
import ButtonSelectedAll from "@/components/globals/ButtonSelectedAll";
import CheckAllSelectedTableHeader from "@/components/globals/CheckAllSelectedTableHeader";
import CheckboxRowList from "@/components/globals/CheckboxRowList";
import DeleteButtonList from "@/components/globals/DeleteButtonList";
import PaginationListButton from "@/components/globals/PaginationListButton";
import { GlobalTableViewsProps } from "@/types/GlobalType";

export const SupplierTableViews = ({
  fetchListData,
  currentSegment,
  pagination,
  tableState,
  filters,
  setFilters,
}: GlobalTableViewsProps) => {
  const { data, loading, selectedIds } = tableState;
  const { setCurrentPage, showAll, setShowAll } = pagination;

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-3">
          {/* Filter Form */}
          <FilterForm
            fetchListData={fetchListData}
            setCurrentPage={setCurrentPage}
            showAll={showAll}
            setShowAll={setShowAll}
            filters={filters}
            setFilters={setFilters}
            currentSegment={currentSegment}
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
          {selectedIds.length > 0 && (
            <ButtonSelectedAll
              fetchListData={fetchListData}
              tableState={tableState}
              currentSegment={currentSegment}
            />
          )}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                      <CheckAllSelectedTableHeader tableState={tableState} />
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
                          <CheckboxRowList
                            tableState={tableState}
                            item={item}
                          />
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start sm:px-6">
                          <Link
                            href={`/admin/${currentSegment}/edit/${item?.id}`}
                          >
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
                          <DeleteButtonList
                            fetchListData={fetchListData}
                            tableState={tableState}
                            currentSegment={currentSegment}
                            item={item}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {/* </div> */}
            </div>
            {!showAll && <PaginationListButton pagination={pagination} />}
          </div>
        </>
      )}
    </>
  );
};
