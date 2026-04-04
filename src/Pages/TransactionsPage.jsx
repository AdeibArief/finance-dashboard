import React from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilters";
import useStore from "../store/useStore";
import AddTransactionModal from "../components/transactions/addTransactionModal";

const TransactionsPage = () => {
  const role = useStore((state) => state.role);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-base-content/50">
          Browse and filter your transactions
        </p>
        {role === "admin" && <AddTransactionModal />}
      </div>
      <TransactionFilters />
      <TransactionTable />
    </div>
  );
};

export default TransactionsPage;
