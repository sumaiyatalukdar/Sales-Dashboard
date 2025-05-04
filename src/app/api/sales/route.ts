// /app/api/sales/route.ts

import { NextResponse } from 'next/server';

// Expanded sales data
const salesData = [
  { month: 'January', 2022: 100, 2023: 150, 2024: 200 },
  { month: 'February', 2022: 120, 2023: 180, 2024: 220 },
  { month: 'March', 2022: 140, 2023: 170, 2024: 230 },
  { month: 'April', 2022: 130, 2023: 160, 2024: 240 },
  { month: 'May', 2022: 110, 2023: 140, 2024: 210 },
  { month: 'June', 2022: 150, 2023: 200, 2024: 250 },
  { month: 'July', 2022: 160, 2023: 210, 2024: 260 },
  { month: 'August', 2022: 170, 2023: 220, 2024: 270 },
  { month: 'September', 2022: 180, 2023: 230, 2024: 280 },
  { month: 'October', 2022: 190, 2023: 240, 2024: 290 },
  { month: 'November', 2022: 200, 2023: 250, 2024: 300 },
  { month: 'December', 2022: 210, 2023: 260, 2024: 310 },
];

// Handle GET request
export async function GET() {
  return NextResponse.json(salesData);
}
