"use client";

import React, { forwardRef, useEffect } from "react";
import { getForwardRefFormHook } from "@/utlils/globalFunctions";
import {
  GlobalFormHandleProps,
  GlobalFormViewsProps,
  GlobalInputProps,
} from "@/types/GlobalType";
import { MainFormViews } from "./(form)/MainFormViews";

export const ConfigurationFormViews = forwardRef<
  GlobalFormHandleProps,
  GlobalFormViewsProps
>(({ defaultValues, id, currentSegment, ...data }, ref) => {
  const formUtils = getForwardRefFormHook({
    props: { defaultValues },
    ref,
    data,
  });
  const { register, setValue } = formUtils;

  useEffect(() => {
    if (!defaultValues) return;

    (Object.entries(defaultValues) as [keyof GlobalInputProps, any][]).forEach(
      ([key, value]) => {
        setValue(key, value ?? "");
      },
    );
  }, [defaultValues, setValue]);

  return (
    <>
      <div className="col-span-8 space-y-6">
        <MainFormViews
          id={id}
          register={register}
          currentSegment={currentSegment}
        />
      </div>
    </>
  );
});

ConfigurationFormViews.displayName = "ConfigurationFormViews";
