import { create } from "zustand";
import { transactions as mockTransactions } from "../data/mockData";


const useStore = create((set, get) => ({
  transactions: mockTransactions,
  filterType: "all",
  filterCategory: "all",
  searchQuery: "",

  role: "viewer",

  setFilterType: (type) => set({ filterType: type }),
  setFilterCategory: (cat) => set({ filterCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setRole: (role) => set({ role }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...transaction, id: state.transactions.length + 1 },
      ],
    })),

  editTransaction: (id, updated) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updated } : t,
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

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
