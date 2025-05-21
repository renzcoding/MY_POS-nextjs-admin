import { GlobalPaginationListButtonProps } from "@/types/GlobalType";
import Pagination from "../tables/Pagination";

export default function PaginationListButton({
  pagination,
}: GlobalPaginationListButtonProps) {
  const { currentPage, setCurrentPage, totalPages } = pagination;
  return (
    <>
      <div className="mt-6 gap-1 p-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
