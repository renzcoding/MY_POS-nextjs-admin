import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export default function ContactFormViews({ register }: any) {
  return (
    <ComponentCard title="Contact Information">
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder={`Enter your email address`}
              {...register("email")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Mobile</Label>
            <Input
              type="text"
              placeholder={`(555) 000-0000`}
              {...register("mobile")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Telephone</Label>
            <Input
              type="text"
              placeholder={`(555) 000-0000`}
              {...register("telp")}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Fax</Label>
            <Input
              type="text"
              placeholder={`(555) 000-0000`}
              {...register("fax")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
