import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import React from "react";

export default function CustomFieldFormViews({ register }: any) {
  return (
    <ComponentCard title="Custom Information">
      <div className="space-6 flex justify-start gap-2">
        <div className="w-full">
          <div>
            <Label>Label</Label>
            <Input
              type="text"
              placeholder={`Custom Field`}
              {...register("name")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Value</Label>
            <Input
              type="text"
              placeholder={`Value of Custom Field`}
              {...register("name")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
