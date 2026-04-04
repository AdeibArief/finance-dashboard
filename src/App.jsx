import useStore from "./store/useStore.js";
import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./Pages/DashboardPage.jsx";
import TransactionsPage from "./Pages/TransactionsPage.jsx";
import InsightsPage from "./Pages/InsightsPage.jsx";

const App = () => {
  const role = useStore((state) => state.role);
  console.log("state role", role);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [activePage, setActivePage] = useState("Dashboard");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage theme={theme} />;
      case "Transactions":
        return <TransactionsPage />;
      case "Insights":
        return <InsightsPage />;
      default:
        return <p className="text-base-content/50">Coming soon...</p>;
    }
  };

  return (
    <div data-theme={theme} className=" flex min-h-screen bg-base-200 ">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-col flex-1">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
        />
        <main className="flex-1 p-6">
          <div
            key={activePage}
            className="animate fade-in"
            style={{ animation: "fadeIn 0.2s ease-in-out" }}
          >
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
