import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const BalancePieChart = ({ income, expense, category }) => {
  const data = [
    { id: 0, value: income, label: "Income", color: "green" },
    { id: 1, value: expense, label: "Expense", color: "red" },
  ];

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={250}
      height={250}
    />
  );
};

export default BalancePieChart;
