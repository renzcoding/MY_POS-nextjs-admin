"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AlertProps } from "@/types/AlertType";
import {
  getCurrentSegment,
  getDataByIdToFormEdit,
  getHandleSaveToComponentCard,
} from "@/utlils/globalFunctions";
import AlertMessageTop from "@/components/globals/AlertMessageTop";
import LoadingSpinner from "@/components/globals/LoadingSpinner";
import LoadingSuccess from "@/components/globals/LoadingSuccess";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import ButtonTopToAction from "@/components/globals/ButtonTopToAction";
import { customerData } from "@/utlils/dataTableForms";
import { GlobalFormHandleProps, GlobalInputProps } from "@/types/GlobalType";
import { ConfigurationFormViews } from "./ConfigurationFormViews";

type Props = {
  params: any;
};

export const ConfigurationContainerViews = ({ params }: Props) => {
  const formRef = useRef<GlobalFormHandleProps>(null);
  const router = useRouter();
  const pathname = usePathname(); // e.g., '/admin/configuration/products/category'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'configuration', 'products', 'category']
  const currentSegment = `${segments[1]}/${segments[2]}/${segments[3]}`; // 'configuration/products/category';

  const { id } = params.length === 4 ? params[4] : {};

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [defaultValues, setDefaultValues] =
    useState<GlobalInputProps>(customerData);

  // const currentSegment: string = getCurrentSegment();

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
            <ConfigurationFormViews
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
