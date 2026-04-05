import { create } from "zustand";
import { transactions as mockTransactions } from "../data/mockData";

const getSavedTransactions = () => {
  try {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  } catch {
    return mockTransactions;
  }
};

const saveTransactions = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const useStore = create((set, get) => ({
  transactions: getSavedTransactions(),
  filterType: "all",
  filterCategory: "all",
  searchQuery: "",

  role: localStorage.getItem("role") || "viewer",

  setFilterType: (type) => set({ filterType: type }),
  setFilterCategory: (cat) => set({ filterCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
  },

  addTransaction: (transaction) =>
    set((state) => {
      const newTransaction = [
        ...state.transactions,
        { ...transaction, id: state.transactions.length + 1 },
      ];
      saveTransactions(newTransaction);
      return { transactions: newTransaction };
    }),

  editTransaction: (id, updated) =>
    set((state) => {
      const updatedTransactions = state.transactions.map((t) =>
        t.id === id ? { ...t, ...updated } : t,
      );
      saveTransactions(updatedTransactions);
      return { transactions: updatedTransactions };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updatedTransactions = state.transactions.filter((t) => t.id !== id);
      saveTransactions(updatedTransactions);
      return { transactions: updatedTransactions };
    }),

  getFilteredTransactions: () => {
    const { transactions, filterType, filterCategory, searchQuery } = get();

    return transactions.filter((t) => {
      const matchType = filterType === "all" || t.type === filterType;
      const matchCategory =
        filterCategory === "all" || t.category === filterCategory;
      const matchSearch = t.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchType && matchCategory && matchSearch;
    });
  },
}));

export default useStore;
