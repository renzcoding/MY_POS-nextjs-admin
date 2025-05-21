"use client";

import { Loader2 } from "lucide-react";
import FilterForm from "@/components/form/filter/FilterForm";
import ButtonSelectedAll from "@/components/globals/ButtonSelectedAll";
import PaginationListButton from "@/components/globals/PaginationListButton";
import { GlobalTableViewsProps } from "@/types/GlobalType";
import DataListTableViews from "./(table)/DataListTableViews";

export const ConfigurationTableViews = ({
  fetchListData,
  currentSegment,
  pagination,
  tableState,
  filters,
  setFilters,
}: GlobalTableViewsProps) => {
  const { data, loading, selectedIds } = tableState;
  const { showAll } = pagination;

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-3">
          {/* Filter Form */}
          <FilterForm
            fetchListData={fetchListData}
            pagination={pagination}
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
      ) : data?.length === 0 ? (
        <div className="flex items-center justify-center py-6">
          <p>No data found</p>
        </div>
      ) : (
        <>
          {selectedIds && selectedIds.length > 0 && (
            <ButtonSelectedAll
              fetchListData={fetchListData}
              tableState={tableState}
              currentSegment={currentSegment}
            />
          )}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              {/* <div className="min-w-[1102px]"> */}
              <DataListTableViews
                tableState={tableState}
                fetchListData={fetchListData}
                currentSegment={currentSegment}
              />
              {/* </div> */}
            </div>
            {!showAll && <PaginationListButton pagination={pagination} />}
          </div>
        </>
      )}
    </>
  );
};
