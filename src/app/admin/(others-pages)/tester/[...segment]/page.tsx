// app/admin/supplier/[segment]/page.tsx

import RecentOrders from "@/components/ecommerce/RecentOrders";

export default function SupplierSegmentPage({
  params,
}: {
  params: { segment: string };
}) {
  console.log("this is segment url", params.segment);
  return <RecentOrders />;
}
