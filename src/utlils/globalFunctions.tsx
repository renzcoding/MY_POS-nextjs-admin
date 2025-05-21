"use client";

import {
  GlobalFetchListDataProps,
  GlobalInputProps,
  GlobalToHandleSaveToComponentCardProps,
} from "@/types/GlobalType";
import { AlertProps } from "@/types/AlertType";
import toast from "react-hot-toast";
import { useForm, UseFormReturn } from "react-hook-form";
import { useImperativeHandle } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const getCurrentSegment = () => {
  const pathname = usePathname(); // e.g., '/admin/tester'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'tester']
  const currentSegment: string = segments[1]; // 'tester'
  if (!currentSegment) return "";
  return currentSegment || "";
  // return window.location.pathname.split("/")[1];
};

export const getFetchListData = async ({
  filters,
  pagination,
  tableState,
  currentSegment,
}: GlobalFetchListDataProps) => {
  const { setData, setLoading, setHasFetched } = tableState;
  const { currentPage, setCurrentPage, setTotalPages, showAll, limit } =
    pagination;

  setLoading(true);
  try {
    const query = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
      showAll: showAll.toString(),
    });

    if (filters.name) query.append("name", filters.name);
    if (filters.firstname) query.append("firstname", filters.firstname);
    if (filters.status) query.append("status", filters.status);
    if (filters.email) query.append("email", filters.email);
    const res = await fetch(`/api/${currentSegment}?${query.toString()}`);
    const result = await res.json();

    console.log("this is get result", result);

    if (result.data.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setData(result.data);
      setTotalPages(result.totalPages);
    }
  } catch (error) {
    console.log(`Failed to fetch ${currentSegment}`, error);
  } finally {
    setHasFetched(true);
    setLoading(false);
  }
};

export const getAlertToastMessage = (
  searchParams: any,
  router: any,
  setAlert: any,
  currentSegment: string,
) => {
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
    router.replace(`/admin/${currentSegment}`);
  }, 2000);
  return () => clearTimeout(timer);
};

export const getForwardRefFormHook = ({ props, ref, data }: any) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<GlobalInputProps>({
      defaultValues: props.defaultValues || data,
    });

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      ...getValues(),
      userId: session?.user?.id, // inject userId dari session
    }),
    reset: () => reset(),
    setValues: (values: GlobalInputProps) => {
      data.map((item: any) => {
        setValue(item.key, item.value);
      });
    },
  }));

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  };
};

export const getDataByIdToFormEdit = async ({
  id,
  defaultValues,
  setDefaultValues,
  formRef,
  currentSegment,
}: any) => {
  if (id) {
    try {
      const values: Record<string, any> = {};
      const res = await fetch(`/api/${currentSegment}/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch ${currentSegment} data`);

      const data = await res.json();
      console.log("this is ress", data);
      const filledDefaults = Object.keys(defaultValues).reduce(
        (acc, key) => {
          acc[key] = data?.[currentSegment]?.[key] || "";
          return acc;
        },
        {} as typeof defaultValues,
      );
      setDefaultValues(filledDefaults);

      Object.entries(defaultValues).forEach(([key, value]) => {
        values[key] = value ?? "";
      });
      setTimeout(() => {
        formRef.current.setValues(values);
      }, 500);
    } catch (error: any) {
      toast.error(`Error fetching ${currentSegment} data`);
    }
  }
};

export const getHandleSaveToComponentCard = async ({
  router,
  currentSegment,
  id,
  setLoading,
  setSuccess,
  formRef,
  setAlert,
}: GlobalToHandleSaveToComponentCardProps): Promise<void> => {
  if (!formRef.current) return;

  const values = formRef.current.getValues();
  const actions = id ? "update" : "create";
  setLoading(true);

  try {
    const res = await fetch(
      id ? `/api/${currentSegment}/${id}` : `/api/${currentSegment}`,
      {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
    const result: { message?: string } = await res.json();
    console.log("this is result to actions", result);

    if (res.ok) {
      setSuccess(true);
      // toast.success(`${currentSegment} with id ${id} ${actions} successfully!`);
      router.push(
        `/admin/${currentSegment}?success=${currentSegment} ${id ? "updated" : "created"} successfully!`,
      );
    } else {
      setAlert({
        type: "error",
        title: "Failed!",
        message: result.message || `Failed to ${actions} ${currentSegment}`,
      });
      toast.error(result.message || `Failed to ${actions} ${currentSegment}`);
      setTimeout(() => setAlert(null), 3000);
    }
  } catch (error) {
    toast.error(`Error creating ${currentSegment}`);
  } finally {
    setLoading(false);
  }
};
