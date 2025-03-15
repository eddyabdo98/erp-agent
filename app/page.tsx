'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const sampleData = {
  salesData: [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ],
  metrics: {
    totalSales: 25000,
    totalPurchases: 15000,
    activeClients: 45,
    lowStock: 12,
  },
};

export default function Dashboard() {
  const [data, setData] = useState(sampleData);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={`$${data.metrics.totalSales.toLocaleString()}`}
          trend="+12.5%"
          positive
        />
        <MetricCard
          title="Total Purchases"
          value={`$${data.metrics.totalPurchases.toLocaleString()}`}
          trend="-5.0%"
          positive={false}
        />
        <MetricCard
          title="Active Clients"
          value={data.metrics.activeClients}
          trend="+3"
          positive
        />
        <MetricCard
          title="Low Stock Items"
          value={data.metrics.lowStock}
          trend="+2"
          positive={false}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#4F46E5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, positive }: {
  title: string;
  value: string | number;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`ml-2 flex items-baseline text-sm font-semibold ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend}
        </p>
      </div>
    </div>
  );
}
