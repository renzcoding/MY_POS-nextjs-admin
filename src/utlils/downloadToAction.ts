import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(
  data: any[],
  fileName: string,
  sheetName: string,
) {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || "Sheet1");
  XLSX.writeFile(workbook, `${fileName || "data"}.xlsx`);
}

export const exportToCSV = (
  data: any[],
  fileName: string = "data",
  sheetName: string = "Sheet1",
) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]); // Customize the headers as needed
  const rows = data.map((item) => Object.values(item));
  let csvContent = headers.join(",") + "\n";
  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${fileName}.csv`);
};
