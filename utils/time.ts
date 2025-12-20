import { differenceInMinutes, getDay } from "date-fns";

export function getExpectedHours(date: Date): number {
  const day = getDay(date); // 0 = Sunday, 6 = Saturday

  if (day === 0) return 0;  // Sunday
  if (day === 6) return 4;  // Saturday
  return 8.5;               // Monday to Friday
}

export function calculateWorkedHours(
  inTime?: Date,
  outTime?: Date,
  date?: Date
): number {
  if (!inTime || !outTime || !date) return 0;

  const expected = getExpectedHours(date);
  if (expected === 0) return 0;

  const minutes = differenceInMinutes(outTime, inTime);
  const hours = minutes / 60;

  return Math.min(hours, expected);
}
