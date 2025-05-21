import { CustomerContainerViews } from "@/app/views/(admin)/customer/CustomerContainerViews";
import { SupplierActionViews } from "@/app/views/(admin)/supplier/SupplierActionViews";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import { Metadata } from "next";

const currentSegment = "customer";
export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function SupplierEditPage(context: { params: any }) {
  const { id } = await context.params;
  return (
    <div>
      <PageBreadcrumb pageTitle={`${capitalizeFirst(currentSegment)} Edit`} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          {/* <SupplierActionViews mode="edit" id={Number(params.id)} /> */}
          <CustomerContainerViews id={Number(id)} />
        </div>
      </div>
    </div>
  );
}
