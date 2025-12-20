import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parseExcel } from "@/utils/excelParser";
import { calculateWorkedHours, getExpectedHours } from "@/utils/time";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rows = await parseExcel(buffer);

    for (const row of rows) {
      let employee = await prisma.employee.findFirst({
        where: { name: row.employeeName }
      });

      if (!employee) {
        employee = await prisma.employee.create({
          data: { name: row.employeeName }
        });
      }

      const expected = getExpectedHours(row.date);
      const workedHours = calculateWorkedHours(
        row.inTime,
        row.outTime,
        row.date
      );

      const isLeave =
        expected > 0 && (!row.inTime || !row.outTime);

      await prisma.attendance.create({
        data: {
          employeeId: employee.id,
          date: row.date,
          inTime: row.inTime,
          outTime: row.outTime,
          workedHours,
          isLeave
        }
      });
    }

    return NextResponse.json({
      message: "Excel uploaded successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process Excel file" },
      { status: 500 }
    );
  }
}
