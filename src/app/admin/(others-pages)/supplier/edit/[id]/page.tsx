import { SupplierActionViews } from "@/app/views/(admin)/supplier/SupplierActionViews";
import { SupplierContainerViews } from "@/app/views/(admin)/supplier/SupplierContainerViews";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function SupplierEditPage(context: { params: any }) {
  const { id } = await context.params;
  return (
    <div>
      <PageBreadcrumb pageTitle="Supplier Edit" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          {/* <SupplierActionViews mode="edit" id={Number(params.id)} /> */}
          <SupplierContainerViews id={Number(id)} />
        </div>
      </div>
    </div>
  );
}
