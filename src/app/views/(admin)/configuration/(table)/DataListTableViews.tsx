import CheckAllSelectedTableHeader from "@/components/globals/CheckAllSelectedTableHeader";
import CheckboxRowList from "@/components/globals/CheckboxRowList";
import DeleteButtonList from "@/components/globals/DeleteButtonList";
import Badge from "@/components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirst } from "@/utlils/capitalizeFirst";
import Link from "next/link";

interface Props {
  tableState: any;
  currentSegment: string;
  fetchListData: any;
}
export default function DataListTableViews({
  tableState,
  currentSegment,
  fetchListData,
}: Props) {
  const { data } = tableState;
  const parts = currentSegment.split("/");
  const segments = parts[parts.length - 1];
  return (
    <>
      <Table>
        {/* Table Header */}
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              <CheckAllSelectedTableHeader tableState={tableState} />
            </TableCell>

            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Name {capitalizeFirst(segments)}
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Description
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {Array.isArray(data) &&
            data.map((item: any) => (
              <TableRow
                key={item?.id}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              >
                <TableCell className="px-5 py-4 text-start sm:px-6">
                  <CheckboxRowList tableState={tableState} item={item} />
                </TableCell>
                <TableCell className="px-5 py-4 text-start sm:px-6">
                  <Link href={`/admin/${currentSegment}/edit/${item?.id}`}>
                    <div className="flex items-center">
                      {item?.name !== undefined
                        ? item?.name
                        : item?.firstname && item?.lastname
                          ? `${item?.firstname} ${item?.lastname}`
                          : item?.company_name !== undefined
                            ? item?.company_name
                            : ""}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                  {item?.description}
                </TableCell>
                <TableCell className="text-theme-sm px-1 py-3 text-gray-500 dark:text-gray-400">
                  <DeleteButtonList
                    fetchListData={fetchListData}
                    tableState={tableState}
                    currentSegment={currentSegment}
                    item={item}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
