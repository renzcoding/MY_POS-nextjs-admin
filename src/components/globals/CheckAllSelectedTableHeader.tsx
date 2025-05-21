import { GlobalCheckAllSelectedProps, GlobalInput } from "@/types/GlobalType";

export default function CheckAllSelectedTableHeader({
  tableState,
}: GlobalCheckAllSelectedProps) {
  const { data, selectedIds, setSelectedIds } = tableState;

  const handleCheckAll = (data: GlobalInput[]) => {
    const allIds: any = data.map((item) => item.id); // assuming each item has a unique `id`
    const isAllChecked = selectedIds.length === allIds.length;
    if (isAllChecked) {
      setSelectedIds([]); // uncheck all
    } else {
      setSelectedIds(allIds); // check all
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="form-checkbox"
        checked={selectedIds.length === data.length && data.length > 0}
        onChange={() => handleCheckAll(data)}
      />
    </>
  );
}
