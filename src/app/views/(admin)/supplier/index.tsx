"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "@/components/ui/alert/Alert";
import { SupplierTableViews } from "./SupplierTableViews";
import { AlertProps } from "@/types/AlertType";
import { SupplierInput } from "@/types/SupplierType";

// type ToastType = "success" | "error" | "warning" | "info" | "loading" | null;

export default function SupplierListViews() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., '/admin/tester'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'tester']
  const currentSegment = segments[segments.length - 1]; // 'tester'
  const searchParams = useSearchParams();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<SupplierInput[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  // const [filterName, setFilterName] = useState("");
  // const [filterStatus, setFilterStatus] = useState("");
  // const [filterEmail, setFilterEmail] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    email: "",
  });
  const [searchName, setSearchName] = useState("");
  /* const keysParams = Array.from(searchParams.keys()); // still works even if only 1 key
  const singleKeyParams = keysParams.length === 1 ? keysParams[0] : null;
  const singleValueParams = singleKeyParams
    ? searchParams.get(singleKeyParams)
    : null; */

  const fetchSuppliers = async (search = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        showAll: showAll.toString(),
        // name: filterName,
        // status: filterStatus,
        // email: filterEmail,
      });
      if (filters.name) query.append("name", filters.name);
      if (filters.status) query.append("status", filters.status);
      if (filters.email) query.append("email", filters.email);
      const res = await fetch(`/api/supplier?${query.toString()}`);
      const result = await res.json();

      if (result.data.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setData(result.data);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      console.log("Failed to fetch suppliers", error);
    } finally {
      setHasFetched(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage, showAll, filters.status]);

  useEffect(() => {
    // const typeMessage = singleKeyParams ? singleKeyParams : null;
    // const finalMessage = singleValueParams ? singleValueParams : null;
    const type = Array.from(searchParams.keys())[0] as AlertProps["type"];
    const message = searchParams.get(type);

    if (!type || !message) return;

    const formattedTitle = `Message Data ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    setAlert({
      type,
      title: formattedTitle,
      message,
    });

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } ring-opacity-5 pointer-events-auto flex w-full max-w-md rounded-lg bg-yellow-100 p-4 text-yellow-800 shadow-lg ring-1 ring-black`}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">Warning</p>
              <p className="mt-1 text-sm">{message}</p>
            </div>
          </div>
        ));
        break;
      default:
        toast(message);
    }

    // Bersihkan query di URL setelah 2 detik
    const timer = setTimeout(() => {
      setAlert(null);
      router.replace("/admin/supplier");
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const pagination = {
    currentPage,
    setCurrentPage,
    totalPages,
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
  };

  return (
    <div className="space-y-4">
      {alert && (
        <Alert
          variant={alert.type}
          title={alert.title}
          message={alert.message}
          showLink={false}
        />
      )}
      <ComponentCard
        title="Supplier"
        desc="this is supplier table"
        data={data}
        setLoading={() => {
          setLoading(true);
        }} // You need to add this to ComponentCard props
        onDataImported={fetchSuppliers}
      >
        {/* setData={setData}
        data={data}
        loading={loading}
        setLoading={setLoading}
        fetchSuppliers={fetchSuppliers}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        showAll={showAll}
        setShowAll={setShowAll}
        currentSegment={currentSegment}
        filterName={filterName}
        filterStatus={filterStatus}
        filterEmail={filterEmail}
        setFilterName={setFilterName}
        setFilterEmail={setFilterEmail}
        setFilterStatus={setFilterStatus}
        hasFetched={hasFetched}  */}

        <SupplierTableViews
          fetchSuppliers={fetchSuppliers}
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
