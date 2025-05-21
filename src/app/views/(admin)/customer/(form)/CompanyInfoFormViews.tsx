import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

export default function CompanyInfoFormViews({ register }: any) {
  return (
    <ComponentCard title="Company Information">
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="companyName"
              placeholder={`Enter Your Company Name`}
              {...register("companyName")}
            />
          </div>
        </div>
      </div>
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div>
            <Label>Street Address</Label>
            <TextArea
              rows={3}
              {...register("companyAddress")}
              placeholder={`Enter Your Street Address`}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>City</Label>
            <Select
              options={[{ value: "Lagos", label: "Lagos" }]}
              placeholder="Select an option"
              {...register("companyCityId")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>State</Label>
            <Select
              options={[{ value: "Lagos", label: "Lagos" }]}
              placeholder="Select an option"
              {...register("companyStateId")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Country</Label>

            <Select
              options={[{ value: "Lagos", label: "Lagos" }]}
              placeholder="Select an option"
              {...register("companyCountryId")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Zip Code</Label>
            <Select
              options={[{ value: "Lagos", label: "Lagos" }]}
              placeholder="Select an option"
              {...register("companyZipCodeId")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
