import { ConfigurationContainerViews } from "@/app/views/(admin)/configuration/ConfigurationContainerViews";
import ConfigurationListViews from "@/app/views/(admin)/configuration/ConfigurationListViews";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import { Metadata } from "next";
const currentSegment = "Configuration";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function ConfigurationPages({ params }: PageProps) {
  const slug = params?.slug || [];

  const actions =
    slug[slug.length - 1] === "create" || slug[slug.length - 1] === "edit"
      ? slug[slug.length - 1]
      : [];
  console.log(actions, "params[4]");
  return (
    <div>
      {actions === "create" || actions === "edit" ? (
        <>
          <PageBreadcrumb
            pageTitle={`${capitalizeFirst(currentSegment)} Create`}
          />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
            {/* <SupplierActionViews mode="create" /> */}
            <ConfigurationContainerViews params={params} />
          </div>
        </>
      ) : (
        <>
          <PageBreadcrumb
            pageTitle={`${capitalizeFirst(currentSegment)} List`}
          />
          <div className="space-y-5">
            {/* <ConfigurationListViews /> */}
            <ConfigurationListViews />
          </div>
        </>
      )}
    </div>
  );
}
