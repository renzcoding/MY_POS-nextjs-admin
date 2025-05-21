import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

export default function MembershipFormViews({ register }: any) {
  return (
    <ComponentCard title="Membership Information">
      <div className="space-6 flex justify-start gap-2">
        <div className="w-full">
          <div className="py-2">
            <Label>Membership</Label>
            <Select
              name="membership"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
              {...register("membership_typeId")}
            />
          </div>
          <div className="py-2">
            <Label>Customer ID</Label>
            <Input
              type="text"
              placeholder={`Customer ID`}
              {...register("customerId")}
            />
          </div>
          <div className="py-2">
            <Label>Alternative Customer ID</Label>
            <Input
              type="text"
              placeholder={`Alternative Customer ID`}
              {...register("alternativeCustomerId")}
            />
          </div>
          <div className="py-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              placeholder={`Start Date`}
              {...register("startDate")}
            />
          </div>
          <div className="py-2">
            <Label>Expiry Date</Label>
            <Input
              type="text"
              placeholder={`Expiry Date`}
              {...register("expiryDate")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
