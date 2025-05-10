import * as XLSX from "xlsx";

export const parseExcelToJSON = async (file: File) => {
  if (!file) return;

  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
};
