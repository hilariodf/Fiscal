import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";

interface RevenueChartProps {
  data?: {
    date: string;
    revenue: number;
  }[];
}

const defaultData = [
  { date: "2024-01", revenue: 4000 },
  { date: "2024-02", revenue: 3000 },
  { date: "2024-03", revenue: 5000 },
  { date: "2024-04", revenue: 2780 },
  { date: "2024-05", revenue: 1890 },
  { date: "2024-06", revenue: 2390 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          {new Date(label).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-lg font-bold text-blue-600">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data = defaultData }: RevenueChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full h-[400px] bg-white hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("default", { month: "short" });
                }}
                stroke="#64748b"
              />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                  }).format(value)
                }
                stroke="#64748b"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                dot={{ fill: "#2563eb", r: 4 }}
                activeDot={{
                  r: 6,
                  fill: "#2563eb",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueChart;
