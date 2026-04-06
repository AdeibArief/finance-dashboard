import { useState } from "react";
import useStore from "../../store/useStore";
import EditTransactionModel from "./EditTransactionModel";

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const TransactionTable = () => {
  const role = useStore((state) => state.role);
  const deleteTransaction = useStore((state) => state.deleteTransaction);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const transactions = useStore((state) => state.transactions);
  const filterType = useStore((state) => state.filterType);
  const filterCategory = useStore((state) => state.filterCategory);
  const searchQuery = useStore((state) => state.searchQuery);

  const filteredTransactions = transactions.filter((t) => {
    if (!t.description || !t.amount) return false;
    const matchType = filterType === "all" || t.type === filterType;
    const matchCategory =
      filterCategory === "all" || t.category === filterCategory;
    const matchSearch = (t.description || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchType && matchCategory && matchSearch;
  });

  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-base-100 p-12 rounded-2xl text-center border border-base-300">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-base-content/60">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content/70">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th className="hidden sm:table-cell">Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th className="w-24">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-base-200 transition-colors duration-150"
              >
                <td className="text-sm text-base-content/60">
                  {formatDate(t.date)}
                </td>
                <td className="text-medium">{t.description}</td>
                <td className="hidden sm:table-cell">
                  <span className="badge badge-ghost badge-sm">
                    {t.category}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${t.type === "income" ? "badge-success" : "badge-error"}`}
                  >
                    {t.type}
                  </span>
                </td>
                <td
                  className={`font-semibold ${t.type === "income" ? "text-success" : "text-error"}`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </td>
                {role === "admin" && (
                  <td>
                    <div className="flex flex-row gap-2 items-center">
                    <button
                      className="btn btn-ghost btn-xs text-primary"
                      onClick={()=>setEditingTransaction(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingTransaction && (
        <EditTransactionModel
          transaction={editingTransaction}
          onClose={()=>setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionTable;
