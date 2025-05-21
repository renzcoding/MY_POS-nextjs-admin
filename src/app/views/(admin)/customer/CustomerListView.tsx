"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomerTableViews } from "./CustomerTableViews";
import { AlertProps } from "@/types/AlertType";
import {
  getAlertToastMessage,
  getCurrentSegment,
  getFetchListData,
} from "@/utlils/globalFunctions";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import { CustomerFilters } from "@/types/CustomerType";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";
import {
  GlobalFetchListDataProps,
  GlobalInputProps,
  GlobalTableViewsProps,
} from "@/types/GlobalType";

export default function CustomerListViews() {
  const router = useRouter();
  const currentSegment = getCurrentSegment();
  const searchParams = useSearchParams();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<GlobalInputProps[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [filters, setFilters] = useState<CustomerFilters>({
    name: "",
    username: "",
    firstname: "",
    status: "",
    email: "",
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
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

  const params: GlobalFetchListDataProps = {
    filters,
    pagination,
    tableState,
    currentSegment,
  };
  const fetchListData = async () => {
    await getFetchListData(params);
  };
  const alertConfirmation = () => {
    getAlertToastMessage(searchParams, router, setAlert, currentSegment);
  };

  useEffect(() => {
    fetchListData();
  }, [currentPage, showAll, filters.status, filters.name, filters.firstname]);

  useEffect(() => {
    alertConfirmation();
  }, [searchParams, router]);

  return (
    <>
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
      <ComponentCard
        title={capitalizeFirst(currentSegment)}
        desc={`this is ${currentSegment} table`}
      >
        <CustomerTableViews
          fetchListData={fetchListData}
          currentSegment={currentSegment}
          pagination={pagination}
          tableState={tableState}
          filters={filters}
          setFilters={setFilters}
        />
      </ComponentCard>
    </>
  );
}
