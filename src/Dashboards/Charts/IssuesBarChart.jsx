import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const IssuesBarChart = ({ issues }) => {
  const monthly = {};

  issues.forEach((i) => {
    const month = new Date(i.date).getMonth() + 1;
    monthly[month] = (monthly[month] || 0) + 1;
  });

  const data = Object.keys(monthly).map((m) => ({
    month: m,
    count: monthly[m],
  }));

  return (
    <BarChart width={350} height={250} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  );
};

export default IssuesBarChart;
