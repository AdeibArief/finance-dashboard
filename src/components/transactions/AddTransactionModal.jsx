import { useState } from "react";
import useStore from "../../store/useStore";

const emptyForm = {
  description: "",
  amount: "",
  type: "expense",
  category: "food",
  date: new Date().toISOString().split("T")[0],
};

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

const AddTransactionModal = () => {
  const addTransaction = useStore((state) => state.addTransaction);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount || parseInt(form.amount) <=0 ) return;
    addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm(emptyForm);
    setOpen(false);
  };
  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
        + Add Transaction
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Add Transaction</h3>
            <div className="flex flex-col gap-3">
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                type="text"
                placeholder="Description"
                className="input input-bordered w-full"
              />

              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
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
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransactionModal;
