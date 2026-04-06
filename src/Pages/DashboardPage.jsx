import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import SummaryCards from "../components/dashboard/SummaryCards";

import React from "react";

const DashboardPage = ({ theme }) => {
  return (
    <div>
      <p className="text-base-content/50 mb-6">
        Here's your financial overview
      </p>
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BalanceTrendChart theme={theme} />
        <SpendingChart theme={theme} />
      </div>
    </div>
  );
};

export default DashboardPage;
