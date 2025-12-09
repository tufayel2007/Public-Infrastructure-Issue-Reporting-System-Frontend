import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]; // pending, progress, resolved, rejected

const IssuesPieChart = ({
  pending = 0,
  progress = 0,
  resolved = 0,
  rejected = 0,
}) => {
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
    { name: "Resolved", value: resolved },
    { name: "Rejected", value: rejected },
  ];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label
      />
      <Tooltip />
      <Legend />
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </PieChart>
  );
};

export default IssuesPieChart;
