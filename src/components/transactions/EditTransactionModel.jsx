import useStore from "../../store/useStore";
import React, { useState } from "react";

const categories = [
  "Salary",
  "Freelance",
  "Housing",
  "Food",
  "Entertainment",
  "Utilities",
  "Health",
  "Shopping",
];


const EditTransactionModel = ({ transaction, onClose }) => {
  const editTransaction = useStore((state) => state.editTransaction);
  const [form, setForm] = useState({
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    date: transaction.date,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    editTransaction(transaction.id, { ...form, amount: parseInt(form.amount) });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-center">Edit Transaction</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="input input-bordered w-full"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModel;
