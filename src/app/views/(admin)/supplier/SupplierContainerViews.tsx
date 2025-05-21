"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertProps } from "@/types/AlertType";
import {
  getCurrentSegment,
  getDataByIdToFormEdit,
  getHandleSaveToComponentCard,
} from "@/utlils/globalFunctions";
import { GlobalFormHandleType } from "@/types/GlobalType";
import { SuplierFormViews } from "./SuplierFormViews";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import LoadingSpinner from "@/components/globals/LoadingSpinner";
import LoadingSuccess from "@/components/globals/LoadingSuccess";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";

export const SupplierContainerViews = ({ id }: any) => {
  const formRef = useRef<GlobalFormHandleType>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    userId: "",
  });
  const currentSegment = getCurrentSegment();

  const fetchSupplier = async () => {
    await getDataByIdToFormEdit({
      id,
      defaultValues,
      setDefaultValues,
      formRef,
      currentSegment,
    });
  };
  //   Fetch data if edit
  useEffect(() => {
    fetchSupplier();
  }, [id]);

  const handleSave = async () => {
    await getHandleSaveToComponentCard({
      router,
      currentSegment,
      id,
      setLoading,
      setSuccess,
      formRef,
      setAlert,
    });
  };

  return (
    <div className="space-y-6">
      {alert && <AlertMessageTop alert={alert} />}
      <ButtonTopToAction
        title={capitalizeFirst(currentSegment)}
        actions={id ? "Update" : "Create"}
        onSubmit={handleSave}
        loading={loading}
        setLoading={() => {
          setLoading(true);
        }} // You need to add this to
      />
      <ComponentCard title={id ? "Edit Supplier" : "Create Supplier"}>
        {loading ? (
          <LoadingSpinner />
        ) : success ? (
          <LoadingSuccess />
        ) : (
          <SuplierFormViews ref={formRef} defaultValues={defaultValues} />
        )}
      </ComponentCard>
    </div>
  );
};
