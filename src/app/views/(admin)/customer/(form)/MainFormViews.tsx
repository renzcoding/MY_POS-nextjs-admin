"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";

export const MainFormViews = ({ id, currentSegment, register }: any) => {
  return (
    <ComponentCard title="Personal Information">
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div>
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Birthday</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Gender</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Civil Status</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Nationality</Label>
            <Input
              type="text"
              placeholder="Supplier Name"
              {...register("name")}
            />
          </div>
        </div>
      </div>

      <div>
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
    </ComponentCard>
  );
};
