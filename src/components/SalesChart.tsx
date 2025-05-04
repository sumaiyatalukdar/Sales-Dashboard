'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie
} from 'recharts';
import { useState, useEffect } from 'react';
type SalesData = {
  month: string;
  2022: number;
  2023: number;
  2024: number;
};
export default function SalesChart() {
  const [data, setData] = useState<SalesData[]>([]);
  const [threshold, setThreshold] = useState(0);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sales');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item['2022'] > threshold || item['2023'] > threshold || item['2024'] > threshold
  );

  const noData = filteredData.length === 0;

  return (
    <div className="text-gray-800 dark:text-gray-100">
      {/* Threshold Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sales Threshold:</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="border px-4 py-2 rounded w-full max-w-md text-lg dark:bg-gray-800 dark:border-gray-600"
          placeholder="Enter minimum sales"
        />
      </div>

      {/* Chart Type Buttons with active state */}
      <div className="mb-4">
        {['line', 'bar', 'pie'].map(type => (
          <button
            key={type}
            onClick={() => setChartType(type as 'line' | 'bar' | 'pie')}
            className={`mr-4 px-4 py-2 rounded font-semibold transition 
              ${chartType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
              }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </button>
        ))}
      </div>

      {/* Loading or No Data Message */}
      {loading ? (
        <div className="text-center text-gray-500">Loading chart data...</div>
      ) : noData ? (
        <div className="text-center text-red-500">No data meets the sales threshold.</div>
      ) : (
        <>
          {chartType === 'line' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2022" stroke="#8884d8" />
                <Line type="monotone" dataKey="2023" stroke="#82ca9d" />
                <Line type="monotone" dataKey="2024" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          )}

          {chartType === 'bar' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2022" fill="#8884d8" />
                <Bar dataKey="2023" fill="#82ca9d" />
                <Bar dataKey="2024" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartType === 'pie' && (
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={filteredData}
                  dataKey="2024"
                  nameKey="month"
                  cx="33%"
                  cy="50%"
                  outerRadius={120}
                  fill="#ffc658"
                  label
                />
                <Pie
                  data={filteredData}
                  dataKey="2023"
                  nameKey="month"
                  cx="66%"
                  cy="50%"
                  outerRadius={120}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}
