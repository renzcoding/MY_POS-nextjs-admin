"use client";

import React, { forwardRef, useEffect } from "react";
// import { getForwardRefFormHook } from "@/utlils/globalFunctions";

import ProfileFormViews from "./(form)/ProfileFormViews";
import { MainFormViews } from "./(form)/MainFormViews";
import ContactFormViews from "./(form)/ContactFormViews";
import AdderessFormViews from "./(form)/AdderessFormViews";
import CompanyInfoFormViews from "./(form)/CompanyInfoFormViews";
import MembershipFormViews from "./(form)/MembershipFormViews";
import OtherFormViews from "./(form)/OtherFormViews";
import CustomFieldFormViews from "./(form)/CustomFieldFormViews";

import {
  CustomerFormHandleProps,
  CustomerFormViewsProps,
  CustomerInputProps,
} from "@/types/CustomerType";
import { getForwardRefFormHook } from "@/utlils/globalFunctions";

export const CustomerFormViews = forwardRef<
  CustomerFormHandleProps,
  CustomerFormViewsProps
>(({ defaultValues, id, currentSegment, ...data }, ref) => {
  const formUtils = getForwardRefFormHook({
    props: { defaultValues },
    ref,
    data,
  });
  const { register, setValue } = formUtils;

  useEffect(() => {
    if (!defaultValues) return;

    (
      Object.entries(defaultValues) as [keyof CustomerInputProps, any][]
    ).forEach(([key, value]) => {
      setValue(key, value ?? "");
    });
  }, [defaultValues, setValue]);

  return (
    <>
      <div className="col-span-8 space-y-6">
        {/* <MainFormViews
          id={id}
          register={register}
          currentSegment={currentSegment}
        /> */}
        <ProfileFormViews register={register} currentSegment={currentSegment} />
        <ContactFormViews register={register} />
        <AdderessFormViews register={register} />
        <CompanyInfoFormViews register={register} />
      </div>
      <div className="col-span-4 space-y-6">
        <MembershipFormViews register={register} />
        <OtherFormViews register={register} />
        <CustomFieldFormViews register={register} />
      </div>
    </>
  );
});

CustomerFormViews.displayName = "CustomerFormViews";
