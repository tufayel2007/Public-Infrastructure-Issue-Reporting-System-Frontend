import { PieChart, Pie, Tooltip } from "recharts";

const IssuesPieChart = ({ pending, progress, resolved }) => {
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
    { name: "Resolved", value: resolved },
  ];

  return (
    <PieChart width={300} height={250}>
      <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8" label />
      <Tooltip />
    </PieChart>
  );
};

export default IssuesPieChart;
