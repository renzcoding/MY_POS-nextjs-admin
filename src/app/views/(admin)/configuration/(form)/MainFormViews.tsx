"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";

export const MainFormViews = ({ id, currentSegment, register }: any) => {
  return (
    <ComponentCard title="Personal Information">
      <div className="space-12 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div className="p-3">
            <Label>Name</Label>
            <Input type="text" placeholder="Enter Name" {...register("name")} />
          </div>
          <div className="p-3">
            <Label>Description</Label>
            <TextArea
              placeholder="Enter Description"
              rows={3}
              {...register("description")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
};
