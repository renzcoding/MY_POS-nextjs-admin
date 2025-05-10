"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useRef, useState } from "react";
import { SuplierFormViews, SupplierFormHandle } from "./SuplierFormViews";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Alert from "@/components/ui/alert/Alert";
import { Loader2, CheckCircle2 } from "lucide-react";
import { AlertProps } from "@/types/AlertType";
import { SupplierContainerFormProps } from "@/types/SupplierType";

export const SupplierContainerViews = ({ id }: SupplierContainerFormProps) => {
  const formRef = useRef<SupplierFormHandle>(null);
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

  //   Fetch data if edit
  useEffect(() => {
    const fetchSupplier = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/supplier/${id}`);
          if (!res.ok) throw new Error("Failed to fetch supplier data");
          const data = await res.json();
          setDefaultValues({
            name: data?.supplier?.name || "",
            email: data?.supplier?.email || "",
            phone: data?.supplier?.phone || "",
            address: data?.supplier?.address || "",
            userId: data?.supplier?.userId || "",
          });

          formRef.current?.setValues({
            name: data?.supplier?.name || "",
            email: data?.supplier?.email || "",
            phone: data?.supplier?.phone || "",
            address: data?.supplier?.address || "",
            userId: data?.supplier?.userId || "",
          });
        } catch (error) {
          toast.error("Error fetching supplier data");
        }
      }
    };

    fetchSupplier();
  }, [id]);

  const handleSave = async () => {
    if (!formRef.current) return;
    const values = formRef.current.getValues();
    setLoading(true);
    try {
      const res = await fetch(id ? `/api/supplier/${id}` : `/api/supplier`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await res.json();

      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        toast.success(`Supplier ${id ? "updated" : "created"} successfully!`);
        // setAlert({
        //   type: "success",
        //   title: `Supplier ${id ? "updated" : "created"} successfully!`,
        //   message: `The supplier has been ${id ? "updated" : "created"} successfully.`,
        // });

        setTimeout(() => {
          router.push(
            `/admin/supplier?success=Supplier ${id ? "updated" : "created"} successfully!`,
          );
        }, 1500);
      } else {
        setLoading(false);
        setAlert({
          type: "error",
          title: "Failed!",
          message:
            result.message ||
            `Failed to ${id ? "updated" : "created"} supplier`,
        });
        toast.error(
          result.message || `Failed to ${id ? "updated" : "created"} supplier`,
        );
        // formRef.current.reset();
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      toast.error("Error creating supplier");
    }
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
        title={id ? "Edit Supplier" : "Create Supplier"}
        action={id ? "Update" : "Create"}
        onSubmit={handleSave}
        loading={loading}
        success={success}
      >
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="font-semibold text-green-600">Success!</p>
          </div>
        ) : (
          <SuplierFormViews ref={formRef} defaultValues={defaultValues} />
        )}
      </ComponentCard>
    </div>
  );
};
