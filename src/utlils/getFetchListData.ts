import { usePathname } from "next/navigation";
import { useState } from "react";

export default async function getFetchListData() {
  const [field, setField] = useState("");
  const pathname = usePathname(); // e.g., '/admin/tester'
  const segments = pathname.split("/").filter(Boolean); // ['admin', 'tester']
  const currentSegment = segments[segments.length - 1]; // 'tester'
  console.log("this is curren segment", currentSegment);

  const fetchDataList = async () => {
    // Logic to fetch supplier data
    const res = await fetch(`/api/${currentSegment}`);
    const data = await res.json();
    setField(data); // Update state with the fetched suppliers
  };

  return fetchDataList();
}
