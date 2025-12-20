import ExcelJS from "exceljs";

export interface AttendanceRow {
  employeeName: string;
  date: Date;
  inTime?: Date;
  outTime?: Date;
}

export async function parseExcel(buffer: Buffer): Promise<AttendanceRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.worksheets[0];
  const rows: AttendanceRow[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const employeeName = row.getCell(1).value as string;
    const dateValue = row.getCell(2).value as Date;
    const inTimeValue = row.getCell(3).value as Date | null;
    const outTimeValue = row.getCell(4).value as Date | null;

    rows.push({
      employeeName,
      date: new Date(dateValue),
      inTime: inTimeValue ? new Date(inTimeValue) : undefined,
      outTime: outTimeValue ? new Date(outTimeValue) : undefined
    });
  });

  return rows;
}
