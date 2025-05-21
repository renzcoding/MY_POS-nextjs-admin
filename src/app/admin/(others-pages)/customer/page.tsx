import { defaultMetadata, getMetadata } from "@/utlils/metadataConfiguration";
import { getCurrentSegment } from "@/utlils/globalFunctions";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerListViews from "@/app/views/(admin)/customer/CustomerListView";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   ...defaultMetadata,
//   title: `${currentSegment} Page | TailAdmin Dashboard`,
//   description: `This is ${currentSegment} page for TailAdmin Dashboard Template`,
//   // other metadata
// };

// ✅ Dynamically generate metadata on the server
const currentSegment = "customer";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata(
    `${capitalizeFirst(currentSegment)} List`,
    `Manage your ${currentSegment}s with TailAdmin`,
  );
}
export default function CustomerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle={`${capitalizeFirst(currentSegment)} List`} />
      <div className="space-y-5">
        <CustomerListViews />
      </div>
    </div>
  );
}
