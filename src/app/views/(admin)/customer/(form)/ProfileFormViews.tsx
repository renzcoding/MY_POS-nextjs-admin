import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import React from "react";

export default function ProfileFormViews({ register, currentSegment }: any) {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const civilStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
  ];

  const nationalityOptions = [
    { value: "philippine", label: "Philippine" },
    { value: "foreign", label: "Foreign" },
  ];

  return (
    <ComponentCard title="Personal Information">
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div>
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder={`${currentSegment} first name`}
              {...register("firstname")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder={`${currentSegment} last name`}
              {...register("lastname")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Birthday</Label>
            <Input
              type="date"
              placeholder={`${currentSegment} birthday`}
              {...register("birthday")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Gender</Label>
            <Select
              options={genderOptions}
              placeholder={`${currentSegment} gender`}
              {...register("gender")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Civil Status</Label>
            <Select
              options={civilStatusOptions}
              placeholder={`${currentSegment} civil status`}
              {...register("civil_StatusId")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Nationality</Label>
            <Select
              options={nationalityOptions}
              placeholder={`${currentSegment} nationality`}
              {...register("nationality")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
