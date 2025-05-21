"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SupplierTableViews } from "./SupplierTableViews";
import { AlertProps } from "@/types/AlertType";
import { GlobalInput, GlobalTableViewsProps } from "@/types/GlobalType";
import {
  getAlertToastMessage,
  getCurrentSegment,
  getFetchListData,
} from "@/utlils/globalFunctions";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";

// type ToastType = "success" | "error" | "warning" | "info" | "loading" | null;

export default function SupplierListViews() {
  const router = useRouter();
  const currentSegment = getCurrentSegment();
  const searchParams = useSearchParams();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<GlobalInput[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    email: "",
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  /* const keysParams = Array.from(searchParams.keys()); // still works even if only 1 key
  const singleKeyParams = keysParams.length === 1 ? keysParams[0] : null;
  const singleValueParams = singleKeyParams
    ? searchParams.get(singleKeyParams)
    : null; */

  const pagination = {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    limit,
    showAll,
    setShowAll,
  };

  const tableState = {
    data,
    setData,
    loading,
    setLoading,
    hasFetched,
    setHasFetched,
    selectedIds,
    setSelectedIds,
  };

  const fetchListData = async () => {
    await getFetchListData({
      filters,
      pagination,
      tableState,
      currentSegment,
    } as GlobalTableViewsProps);
  };

  const alertConfirmation = () => {
    getAlertToastMessage(searchParams, router, setAlert, currentSegment);
  };

  useEffect(() => {
    fetchListData();
  }, [currentPage, showAll, filters.status, filters.name]);

  useEffect(() => {
    alertConfirmation();
  }, [searchParams, router]);

  return (
    <div className="space-y-4">
      {alert && <AlertMessageTop alert={alert} />}
      <ButtonTopToAction
        title={currentSegment}
        actions=""
        data={data}
        onSubmit={fetchListData}
        loading={loading}
        setLoading={() => {
          setLoading(true);
        }} // You need to add this to ComponentCard props
        onDataImported={fetchListData}
      />
      <ComponentCard title="Supplier" desc="this is supplier table">
        <SupplierTableViews
          fetchListData={fetchListData}
          currentSegment={currentSegment}
          pagination={pagination}
          tableState={tableState}
          filters={filters}
          setFilters={setFilters}
        />
      </ComponentCard>
    </div>
  );
}
