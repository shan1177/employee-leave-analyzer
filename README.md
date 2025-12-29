# Leave & Productivity Analyzer

A full-stack web application that analyzes employee attendance, leave usage, and productivity based on an uploaded Excel attendance sheet.


## Deployment

This project is deployed on https://employee-leave-analyzer.vercel.app


## Instructions for use: 

-upload sample employee excel https://github.com/shan1177/employee-leave-analyzer/blob/main/public/sample-attendance.xlsx

-to the upload section in https://employee-leave-analyzer.vercel.app/upload

to see complete employee analysis in dashboard


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

A sample Excel file is included in the repository:
/public/sample-attendance.xlsx

Kindly upload to https://employee-leave-analyzer.vercel.app/upload 


 Employee Name    | Date	      | In-Time	| Out-Time
|-----------------|-------------|---------|---------
 John Doe	        | 01/01/2024	| 10:00	  | 18:30
 Enrique Preston	| 02/01/2024	| 10:15	  | 18:45
 Marina Armstrong | 03/01/2024	|	
 Ember Weber	    | 06/01/2024	| 10:00	  | 14:00
 Cassius Sosa	    | 07/01/2024  |


> Missing in-time or out-time is treated as a leave.


