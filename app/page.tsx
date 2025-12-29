import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Leave & Productivity Analyzer
      </h1>

      <div className="flex gap-4">
        <Link href="/upload">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Upload Attendance
          </button>
        </Link>

        <Link href="/dashboard">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            View Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}