import { SupplierActionViews } from "@/app/views/(admin)/supplier/SupplierActionViews";
import { SupplierContainerViews } from "@/app/views/(admin)/supplier/SupplierContainerViews";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function SupplierCreatePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Supplier Create" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          {/* <SupplierActionViews mode="create" /> */}
          <SupplierContainerViews />
        </div>
      </div>
    </div>
  );
}
