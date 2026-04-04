import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useStore from "../../store/useStore";
const COLORS = [
  "#6366f1",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
];
const SpendingChart = ({ theme }) => {
  const transactions = useStore((state) => state.transactions);
  const isDark = theme === "dark";

  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {});

  const data = Object.values(categoryData);

  return (
    <div className="bg-base-100 rounded-2xl p-5 mb-2 shadow-sm border border-base-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-base font-semibold mb-4"> Spending by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              backgroundColor: isDark ? "#1d232a" : "#ffffff",
              border: `1px solid ${isDark ? "#2a323c" : "#e5e7eb"}`,
              borderRadius: "12px",
              color: isDark ? "#a6adbb" : "#1f2937",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap mt-2 gap-2">
        {data.map((entry, index) => (
          <span className="flex items-center gap-1 text-xs text-base-content/60">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;
