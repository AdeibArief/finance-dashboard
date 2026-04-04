import React from "react";
import useStore from "../../store/useStore";

const cards = (balance, income, expenses) => [
  {
    title: "Total Balance",
    value: balance,
    icon: "💰",
    color: "bg-primary",
    textColor: "text-primary",
    trend: "+12% this month",
  },
  {
    title: "Total Income",
    value: income,
    icon: "📈",
    color: "bg-success",
    textColor: "text-success",
    trend: "+8% this month",
  },
  {
    title: "Total Expenses",
    value: expenses,
    icon: "📉",
    color: "bg-error",
    textColor: "text-error",
    trend: "+3% this month",
  },
  {
    title: "Savings Rate",
    value:
      income > 0
        ? `${Math.round(((income - expenses) / income) * 100)}%`
        : "0%",
    icon: "🏦",
    color: "bg-warning",
    textColor: "text-warning",
    trend: "of income saved",
  },
];

const formatCurrency = (amount) => {
  if (typeof amount === "string") return amount;
  return `₹${amount.toLocaleString("en-IN")}`;
};

const SummaryCards = () => {
  const transactions = useStore((state) => state.transactions);
  console.log("transactions:", transactions);
  console.log("first type:", transactions[0]?.type);

  const income = transactions
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards(balance, income, expenses).map((card) => (
        <div
          key={card.title}
          className="bg-base-100 rounded-2xl p-5 shadow-sm border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{card.icon}</span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full bg-base-200 ${card.textColor}`}
            >
              {card.trend}
            </span>
          </div>
          <p className="text-base-content/60 text-sm mb-1">{card.title}</p>
          <p className={`text-2xl font-bold ${card.textColor}`}>
            {formatCurrency(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
