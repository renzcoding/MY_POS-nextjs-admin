"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const router = useRouter();

export const fetchAlertMessage = (
  setAlert: any,
  singleKeyParams: string | null,
  singleValueParams: string | null,
) => {
  useEffect(() => {
    const typeMessage = singleKeyParams ? singleKeyParams : null;
    const finalMessage = singleValueParams ? singleValueParams : null;
    if (typeMessage === null) return;

    setAlert({
      type: typeMessage,
      title: `Message Data ${typeMessage.charAt(0).toUpperCase() + typeMessage.slice(1)}`,
      message: `${finalMessage}`,
    });

    // Show toast dynamically
    if (typeMessage === "success") toast.success(finalMessage);
    else if (typeMessage === "error") toast.error(finalMessage);
    else if (typeMessage === "loading") toast.loading(finalMessage);
    else if (typeMessage === "warning") {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } ring-opacity-5 pointer-events-auto flex w-full max-w-md rounded-lg bg-yellow-100 p-4 text-yellow-800 shadow-lg ring-1 ring-black`}
        >
          <div className="flex-1">
            <p className="text-sm font-medium">Warning</p>
            <p className="mt-1 text-sm">{finalMessage}</p>
          </div>
        </div>
      ));
    } else {
      toast.custom(finalMessage); // custom takes a ReactNode or function
    }

    // Bersihkan query di URL setelah 2 detik
    setTimeout(() => {
      setAlert(null);
      router.replace("/admin/supplier");
    }, 2000);
  }, [singleKeyParams, singleValueParams]);
};
