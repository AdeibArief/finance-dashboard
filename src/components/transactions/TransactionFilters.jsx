import React from "react";
import useStore from "../../store/useStore";
import { transactions } from "../../data/mockData";

const categories = [
  "all",
  "Salary",
  "Freelance",
  "Housing",
  "Food",
  "Entertainment",
  "Utilities",
  "Health",
  "Shopping",
];

const exportToCsv = (transactions) => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    t.amount,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const TransactionFilters = () => {
  const filterType = useStore((state) => state.filterType);
  const filterCategory = useStore((state) => state.filterCategory);
  const searchQuery = useStore((state) => state.searchQuery);
  const setFilterType = useStore((state) => state.setFilterType);
  const setFilterCategory = useStore((state) => state.setFilterCategory);
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const filteredTransactions = transactions.filter((t) => {
    if (!t.description || !t.amount) return false;

    const matchType = filterType === "all" || t.type === filterType;
    const matchCategory = filterCategory === "all" || t.type === filterCategory;
    const matchSearch = (t.description || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchType && matchCategory && matchSearch;
  });

  return (
    <div className="bg-base-100 rounded-2xl p-4 border border-base-300 shadow-sm flex flex-col lg:flex-row gap-3 items-center mb-4">
      <input
        type="text"
        placeholder="Search transactions"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered input-sm w-full"
      />

      <div className="flex gap-2">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered select-sm lg:w-36"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="select select-bordered select-sm lg:w-44"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setFilterCategory("all");
            setFilterType("all");
            setSearchQuery("");
          }}
          className="btn btn-ghost btn-sm flex-1"
        >
          Clear
        </button>

        <button
          className="btn btn-outline btn-sm flex-1"
          onClick={() => exportToCsv(filteredTransactions)}
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
