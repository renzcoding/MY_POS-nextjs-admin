"use client";

import React, { forwardRef, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { GlobalFormHandleType, GlobalFormViewsProps } from "@/types/GlobalType";
import { getForwardRefFormHook } from "@/utlils/globalFunctions";

export const SuplierFormViews = forwardRef<
  GlobalFormHandleType,
  GlobalFormViewsProps
>((props, ref) => {
  const data = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const forwardRefFormHook = () => getForwardRefFormHook({ props, ref, data });
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    forwardRefFormHook();

  useEffect(() => {
    if (props.defaultValues) {
      Object.entries(data).forEach(([key]) => {
        setValue(
          key as keyof typeof data,
          props.defaultValues?.[key as keyof typeof data] || "",
        );
      });
      // setValue("name", props.defaultValues.name || "");
      // setValue("email", props.defaultValues.email || "");
      // setValue("phone", props.defaultValues.phone || "");
      // setValue("address", props.defaultValues.address || "");
    }
  }, [props.defaultValues, setValue]);

  return (
    <div className="space-y-6">
      <div>
        <Label>Name</Label>
        <Input type="text" placeholder="Supplier Name" {...register("name")} />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter Your Email"
          {...register("email")}
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          type="text"
          placeholder="Enter Your Phone"
          {...register("phone")}
        />
      </div>
      <div>
        <Label>Address</Label>
        <TextArea
          rows={6}
          {...register("address")}
          placeholder="Enter your address"
        />
      </div>
    </div>
  );
});
