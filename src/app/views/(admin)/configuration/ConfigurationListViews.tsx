"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertProps } from "@/types/AlertType";
import {
  getAlertToastMessage,
  getFetchListData,
} from "@/utlils/globalFunctions";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";
import {
  GlobalFetchListDataProps,
  GlobalFilters,
  GlobalInputProps,
} from "@/types/GlobalType";
import { ConfigurationTableViews } from "./ConfigurationTableViews";

export default function ConfigurationListViews() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., '/admin/configuration/products/category'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'configuration', 'products', 'category']
  const currentSegment = `${segments[1]}/${segments[2]}/${segments[3]}`; // 'configuration/products/category';

  const searchParams = useSearchParams();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<GlobalInputProps[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [filters, setFilters] = useState<GlobalFilters>({
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
        title={capitalizeFirst(segments[3])}
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
        title={`${capitalizeFirst(segments[2])} > ${capitalizeFirst(segments[3])} Table`}
        desc={`this is ${segments[2]} > ${segments[3]} table`}
      >
        <ConfigurationTableViews
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
