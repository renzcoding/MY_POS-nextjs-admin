import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";

export default function OtherFormViews({ register }: any) {
  const handleSwitchChange = (checked: boolean) => {};
  return (
    <ComponentCard title="Other Information">
      <div className="space-6 flex justify-start gap-2">
        <div className="w-full">
          <div className="py-2">
            <Label>Tax Identification Number</Label>
            <Input
              type="text"
              placeholder={`Tax Identification Number`}
              {...register("taxNumber")}
            />
          </div>
          <div className="py-2">
            <Switch
              label="Enable tax exemption"
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
          <div className="py-2">
            <Label>Notes</Label>
            <TextArea rows={3} placeholder={`Notes`} {...register("notes")} />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
