import React from "react";
import useStore from "../store/useStore";

const formatCurrency = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

const InsightsPage = () => {
  const transactions = useStore((state) => state.transactions);

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });

    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    else acc[month].expenses += t.amount;
    return acc;
  }, {});

  const months = Object.entries(monthlyTotals);
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  const avgMonthlyExpense = totalExpenses / months.length;

  const insights = [
    {
      icon: "🏆",
      title: "Highest Spending Category",
      value: highestCategory ? highestCategory[0] : "N/A",
      detail: highestCategory
        ? `${formatCurrency(highestCategory[1])} total spent`
        : "",
      color: "text-error",
    },
    {
      icon: "📅",
      title: "Monthly Comparison",
      value: lastMonth ? lastMonth[0] : "N/A",
      detail:
        lastMonth && prevMonth
          ? `Expenses ${lastMonth[1].expenses > prevMonth[1].expenses ? "▲" : "▼"} vs last month`
          : "Not enough data",
      color:
        lastMonth && prevMonth
          ? lastMonth[1].expenses > prevMonth[1].expenses
            ? "text-error"
            : "text-success"
          : "text-base-content",
    },
    {
      icon: "💰",
      title: "Savings Rate",
      value: `${savingsRate}%`,
      detail:
        savingsRate >= 20
          ? "Great job above 20% target"
          : " Try to save at least 20%",
      color: savingsRate >= 20 ? "text-success" : "text-warning",
    },
    {
      icon: "📊",
      title: "Avg Monthly Expense",
      value: formatCurrency(Math.round(avgMonthlyExpense)),
      detail: `Across ${months.length} months`,
      color: "text-primary",
    },
    {
      icon: "📈",
      title: "Total Income",
      value: formatCurrency(totalIncome),
      detail: `From ${income.length} transactions`,
      color: "text-success",
    },
    {
      icon: "🎯",
      title: "Biggest single expense",
      value:
        expenses.length > 0
          ? formatCurrency(Math.max(...expenses.map((t) => t.amount)))
          : "N/A",
      detail:
        expenses.length > 0
          ? expenses.find(
              (t) => t.amount === Math.max(...expenses.map((t) => t.amount)),
            )?.description
          : "",
      color: "text-warning",
    },
  ];

  return (
    <div>
      <p className="text-base-content/60 mb-6">
        Key observations from your financial data
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl mb-3">{insight.icon}</div>
            <p className="text-sm text-base-content/60 mb-1">{insight.title}</p>
            <p className={`text-2xl font-bold mb-1 ${insight.color}`}>
              {insight.value}
            </p>
            <p className="text-xs text-base-content/60 ">{insight.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPage;
