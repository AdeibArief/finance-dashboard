import { BarChart2, CreditCard, Lightbulb } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <BarChart2 size={20} /> },
  { label: "Transactions", icon: <CreditCard size={20} /> },
  { label: "Insights", icon: <Lightbulb size={20}/> },

];


const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 h-full bg-base-100 min-h-screen border-r border-base-300 flex flex-col p-4 gap-2">
      <div className="text-xl  font-bold px-2 mb-4">
        <a href="/"> 💰Fintrack</a>
      </div>
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActivePage(item.label)}
          className={`btn justify-start gap-3 text-base transition-all duration-300 ${activePage === item.label ? "btn-primary" : "btn-ghost"}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
