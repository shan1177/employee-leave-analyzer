"use client";
import Link from "next/link";


import { useEffect, useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DashboardPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(setEmployees);
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    setLoading(true);
    fetch(
      `/api/dashboard?employeeId=${employeeId}&month=${month}&year=${year}`
    )
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, [employeeId, month, year]);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        <Link href="/upload">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Upload New Excel
          </button>
        </Link>

        <Link href="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Home
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Monthly Attendance Dashboard
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 bg-white text-black rounded"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black rounded"
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
        >
          {MONTHS.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <select
          className="border p-2 bg-white text-black rounded"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          {[2023, 2024, 2025].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {!employeeId && (
        <p className="text-gray-500">
          Please select an employee to view attendance.
        </p>
      )}

      {loading && <p>Loading data...</p>}

      {!loading && data && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card title="Expected Hours" value={data.expectedHours} />
            <Card title="Worked Hours" value={data.actualHours} />
            <Card title="Leaves Used" value={`${data.leavesUsed} / 2`} />
            <Card title="Productivity" value={`${data.productivity}%`} />
          </div>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">In</th>
                <th className="border p-2">Out</th>
                <th className="border p-2">Worked</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.records.map((r: any) => (
                <tr key={r.id}>
                  <td className="border p-2">
                    {new Date(r.date).toDateString()}
                  </td>
                  <td className="border p-2">
                    {r.inTime ? new Date(r.inTime).toLocaleTimeString() : "-"}
                  </td>
                  <td className="border p-2">
                    {r.outTime ? new Date(r.outTime).toLocaleTimeString() : "-"}
                  </td>
                  <td className="border p-2">{r.workedHours}</td>
                  <td
                    className={`border p-2 font-semibold ${
                      r.isLeave ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {r.isLeave ? "Leave" : "Present"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
