import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDay } from "date-fns";

const prisma = new PrismaClient();

function expectedHoursForDate(date: Date): number {
  const day = getDay(date);
  if (day === 0) return 0;
  if (day === 6) return 4;
  return 8.5;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const employeeId = searchParams.get("employeeId");
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  if (!employeeId) {
    return NextResponse.json(
      { error: "employeeId required" },
      { status: 400 }
    );
  }

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  const records = await prisma.attendance.findMany({
    where: {
      employeeId,
      date: { gte: start, lte: end }
    },
    orderBy: { date: "asc" }
  });

  let expectedHours = 0;
  let actualHours = 0;
  let leavesUsed = 0;

  records.forEach(r => {
    expectedHours += expectedHoursForDate(r.date);
    actualHours += r.workedHours;
    if (r.isLeave) leavesUsed++;
  });

  const productivity =
    expectedHours === 0
      ? 0
      : Number(((actualHours / expectedHours) * 100).toFixed(2));

  return NextResponse.json({
    expectedHours,
    actualHours,
    leavesUsed,
    productivity,
    records
  });
}
