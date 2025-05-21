"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertProps } from "@/types/AlertType";
import {
  getCurrentSegment,
  getDataByIdToFormEdit,
  getHandleSaveToComponentCard,
} from "@/utlils/globalFunctions";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import LoadingSpinner from "@/components/globals/LoadingSpinner";
import LoadingSuccess from "@/components/globals/LoadingSuccess";
import { CustomerFormViews } from "./CustomerFormViews";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";
import { customerData } from "@/utlils/dataTableForms";
import {
  CustomerFormHandleProps,
  CustomerInputProps,
} from "@/types/CustomerType";

type Props = {
  id: number;
};

export const CustomerContainerViews = () => {
  const formRef = useRef<CustomerFormHandleProps>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [defaultValues, setDefaultValues] =
    useState<CustomerInputProps>(customerData);

  const currentSegment: string = getCurrentSegment();

  const fetchListData = async () => {
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
    if (id) fetchListData();
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
        setLoading={() => setLoading(true)} // You need to add this to
      />

      {loading ? (
        <LoadingSpinner />
      ) : success ? (
        <LoadingSuccess />
      ) : (
        <>
          <div className="grid grid-cols-12 gap-2">
            <CustomerFormViews
              ref={formRef}
              id={id}
              currentSegment={currentSegment}
              defaultValues={defaultValues}
              data={customerData}
            />
          </div>
        </>
      )}
    </div>
  );
};
