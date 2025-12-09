import React, { useEffect, useState } from "react";

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Issues</h1>

      <table className="table w-full bg-black shadow">
        <thead>
          <tr>
            <th>Title</th>
            <th>Citizen</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((i) => (
            <tr key={i._id}>
              <td>{i.title}</td>
              <td>{i.citizenEmail}</td>
              <td className="font-bold">{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageIssues;
