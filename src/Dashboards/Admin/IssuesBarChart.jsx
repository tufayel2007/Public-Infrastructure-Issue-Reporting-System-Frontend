import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IssuesBarChart = ({ issues = [] }) => {
  const data = useMemo(() => {
    const map = {};
    issues.forEach((i) => {
      const cat = i.category || "Other";
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.keys(map).map((k) => ({ category: k, count: map[k] }));
  }, [issues]);

  if (data.length === 0)
    return <div className="text-gray-500">No data for bar chart</div>;

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssuesBarChart;
