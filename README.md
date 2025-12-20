# Leave & Productivity Analyzer

A full-stack web application that analyzes employee attendance, leave usage, and productivity based on an uploaded Excel attendance sheet.



## Problem Statement

Organizations often track employee attendance using Excel sheets, but manually calculating worked hours, leave usage, and productivity is time-consuming and error-prone.

This project automates the process by:
- Uploading attendance Excel files
- Calculating worked hours and leaves
- Computing productivity percentages
- Displaying a clean monthly dashboard



## Business Rules

### Working Hours
- **Monday–Friday:** 8.5 hours (10:00 AM – 6:30 PM)
- **Saturday:** 4 hours (10:00 AM – 2:00 PM)
- **Sunday:** Off

### Leave Policy
- Each employee is allowed **2 leaves per month**
- Missing attendance on working days is counted as a leave

### Productivity Formula

Productivity (%) = (Actual Worked Hours / Expected Working Hours) × 100



## Features

- Upload Excel (.xlsx) attendance files
- Automatic leave detection
- Monthly productivity calculation
- Employee-wise dashboard
- Month & year selection
- Daily attendance breakdown



## Tech Stack

- Frontend: Next.js (App Router), TypeScript
- Styling: Tailwind CSS
- Backend: Next.js API Routes
- Database: MongoDB Atlas
- ORM: Prisma
- Excel Parsing: ExcelJS



## Sample Excel Format

A sample Excel file is included in:
/public/sample-attendance.xlsx


| Employee Name | Date       | In-Time | Out-Time |
|--------------|------------|--------|---------|
| John Doe     | 2024-01-01 | 10:00  | 18:30  |
| John Doe     | 2024-01-02 |        |        |

> Missing in-time or out-time is treated as a leave.

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd leave-productivity-analyzer

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file:

DATABASE_URL="your_mongodb_connection_string"

4. Sync database
npx prisma db push

5. Start the app
npm run dev


Open:

http://localhost:3000/upload


