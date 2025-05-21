import { GlobalCheckAllSelectedProps } from "@/types/GlobalType";

export default function CheckboxRowList({
  tableState,
  item,
}: GlobalCheckAllSelectedProps & { item: any }) {
  const { selectedIds, setSelectedIds } = tableState;

  const handleCheckOne = (id: number) => {
    setSelectedIds((prev: any) =>
      prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id],
    );
  };

  return (
    <>
      <input
        type="checkbox"
        className="form-checkbox"
        value={item?.id}
        checked={selectedIds.includes(item.id)}
        onChange={() => handleCheckOne(item?.id)}
      />
    </>
  );
}
