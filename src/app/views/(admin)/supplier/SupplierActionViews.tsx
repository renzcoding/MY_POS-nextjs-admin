"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useRef, useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SupplierActionViewsProps } from "@/types/SupplierType";
import { SuplierFormViews } from "./SuplierFormViews";
import { GlobalFormHandleProps } from "@/types/GlobalType";
import {
  getCurrentSegment,
  getDataByIdToFormEdit,
} from "@/utlils/globalFunctions";

export const SupplierActionViews = ({ mode, id }: SupplierActionViewsProps) => {
  const formRef = useRef<GlobalFormHandleProps>(null);
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const { push } = useRouter();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentSegment = getCurrentSegment();

  const fetchSupplier = async () => {
    await getDataByIdToFormEdit({ id, mode, formRef, currentSegment });
  };

  console.log(fetchSupplier);

  useEffect(() => {
    fetchSupplier();
  }, [mode, id]);

  const handleSave = async () => {
    if (formRef.current) {
      const values = formRef.current.getValues();
      setIsLoading(true);
      const res = await fetch(
        mode === "create" ? `/api/supplier` : `/api/supplier/${id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const result = await res.json();
      setIsLoading(false);

      if (res.ok) {
        console.log("submitted", result);
        // show alert
        setAlert({
          type: "success",
          title: `Supplier ${mode === "create" ? "created" : "updated"} successfully!`,
          message: "The supplier has been created successfully.",
        });
        toast.success(
          `Supplier ${mode === "create" ? "created" : "updated"}  successfully!`,
        );
        formRef.current.reset(); // optional: reset the form if you want
        setIsLoading(true);

        // 🎯 Redirect after short delay
        setTimeout(() => {
          push(
            `/admin/supplier?success=Supplier ${mode === "create" ? "created" : "updated"}  successfully!`,
          );
        }, 1500); // 1.5 detik biar user lihat toast/alert dulu
      } else {
        // show alert
        setAlert({
          type: "error",
          title: "Failed!",
          message:
            result.message ||
            `Failed to ${mode === "create" ? "created" : "updated"}  supplier`,
        });
        toast.error(
          `Failed to ${mode === "create" ? "created" : "updated"}  supplier`,
        );
      }
    }
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }
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
        title="Supplier Form"
        // action={mode === "create" ? "created" : "updated"}
        onSubmit={handleSave}
      >
        <SuplierFormViews ref={formRef} defaultValues={defaultValues} />
      </ComponentCard>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      )}
    </div>
  );
};
