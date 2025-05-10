"use client";
import { Trash2, Filter } from "lucide-react";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

type OrderStatus = "Complete" | "Pending" | "Cancel";

interface orderType {
  id?: any;
  name?: any;
  email?: any;
  product?: any;
  value?: any;
  date?: any;
  status: OrderStatus;
  initials?: any;
  color?: any;
}

const orders: orderType[] = [
  {
    id: "DE124321",
    name: "John Doe",
    email: "johndoe@gmail.com",
    product: "Software License",
    value: "$18,50.34",
    date: "2024-06-15",
    status: "Complete",
    initials: "JD",
    color: "bg-red-200 text-red-700",
  },
  {
    id: "DE124322",
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    product: "Cloud Hosting",
    value: "$12,99.00",
    date: "2024-06-18",
    status: "Pending",
    initials: "JS",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    id: "DE124323",
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    product: "Web Domain",
    value: "$9,50.00",
    date: "2024-06-20",
    status: "Cancel",
    initials: "MB",
    color: "bg-orange-200 text-orange-800",
  },
  {
    id: "DE124324",
    name: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    product: "SSL Certificate",
    value: "$2,30.45",
    date: "2024-06-25",
    status: "Pending",
    initials: "AJ",
    color: "bg-purple-200 text-purple-700",
  },
  {
    id: "DE124325",
    name: "Robert Lee",
    email: "robertlee@gmail.com",
    product: "Premium Support",
    value: "$15,20.00",
    date: "2024-06-30",
    status: "Complete",
    initials: "RL",
    color: "bg-green-200 text-green-700",
  },
];

const statusColor = {
  Complete: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancel: "bg-red-100 text-red-600",
};

export default function Tester() {
  const pathname = usePathname(); // e.g., '/admin/tester'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'tester']
  const currentSegment = segments[segments.length - 1]; // 'tester'

  console.log(currentSegment);
  return (
    <div className="rounded-lg border bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded border px-3 py-1 text-sm hover:bg-gray-100">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
            See all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2">Deal ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Product/Service</th>
              <th className="p-2">Deal Value</th>
              <th className="p-2">Close Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2">{order.id}</td>
                <td className="flex items-center gap-2 p-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${order.color}`}
                  >
                    {order.initials}
                  </span>
                  <div>
                    <div className="font-medium">{order.name}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="p-2">{order.product}</td>
                <td className="p-2">{order.value}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">
                  <button className="text-gray-500 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
