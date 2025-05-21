"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SupplierFormValuesType } from "@/types/SupplierType";

export type SupplierFormHandle = {
  getValues: () => SupplierFormValuesType;
  reset: () => void;
  setValues: (values: SupplierFormValuesType) => void;
};

interface SuplierFormViewsProps {
  defaultValues?: Partial<SupplierFormValuesType>;
}

export const SuplierFormViews = forwardRef<
  SupplierFormHandle,
  SuplierFormViewsProps
>((props, ref) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<SupplierFormValuesType>({
      defaultValues: props.defaultValues || {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    });

  useEffect(() => {
    if (props.defaultValues) {
      setValue("name", props.defaultValues.name || "");
      setValue("email", props.defaultValues.email || "");
      setValue("phone", props.defaultValues.phone || "");
      setValue("address", props.defaultValues.address || "");
    }
  }, [props.defaultValues, setValue]);

  console.log("this is defauil data", props.defaultValues);

  // const [name, setName] = useState(defaultValues?.name || "");
  // const [email, setEmail] = useState(defaultValues?.email || "");
  // const [phone, setPhone] = useState(defaultValues?.phone || "");
  // const [address, setaddress] = useState(defaultValues?.address || "");

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      ...getValues(),
      userId: session?.user?.id, // inject userId dari session
    }),
    reset: () => reset(),
    setValues: (values) => {
      setValue("name", values.name);
      setValue("email", values.email);
      setValue("phone", values.phone);
      setValue("address", values.address);
      // userId tidak perlu diubah biasanya, ambil dari session
    },
  }));

  return (
    <div className="space-y-6">
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Supplier Name"
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          {...register("name")}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter Your Email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...register("email")}
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          type="text"
          placeholder="Enter Your Phone"
          // value={phone}
          // onChange={(e) => setPhone(e.target.value)}
          {...register("phone")}
        />
      </div>
      <div>
        <Label>Address</Label>
        <TextArea
          // value={message}
          // onChange={(value) => setMessage(value)}
          rows={6}
          {...register("address")}
          placeholder="Enter your address"
        />
      </div>
    </div>
  );
});
