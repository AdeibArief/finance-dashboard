import React from "react";
import useStore from "../../store/useStore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = ({ theme }) => {
  const transactions = useStore((state) => state.transactions);
  const isDark = theme === "dark";

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    else acc[month].expenses += t.amount;
    return acc;
  }, {});

  const data = Object.values(monthlyData).map((m) => ({
    month: m.month,
    balance: m.income - m.expenses,
    income: m.income,
    expenses: m.expenses,
  }));

  const formatY = (value) => `₹${(value / 1000).toFixed(0)}k`;



  return (
    <div className="bg-base-100 rounded-2xl p-5 mb-2 shadow-sm border border-base-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-base font-semibold mb-4">Balance Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            strokeOpacity={0.1}
          />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatY} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              backgroundColor: isDark ? "#1d232a" : "#ffffff",
              border: `1px solid ${isDark ? "#2a323c" : "#e5e7eb"}`,
              borderRadius: "12px",
              color: isDark ? "#a6adbb" : "#1f2937",
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
          />{" "}
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-3 text-xs text-base-content/60">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
          Balance
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          Income
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          Expenses
        </span>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
