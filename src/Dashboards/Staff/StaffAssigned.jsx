import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StaffAssigned = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues/assigned")
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assigned Issues</h1>

      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>Title</th>
            <th>Citizen</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((i) => (
            <tr key={i._id}>
              <td>{i.title}</td>
              <td>{i.citizenEmail}</td>
              <td className="font-bold">{i.status}</td>
              <td>
                <Link
                  to={`/staff/issues/${i._id}`}
                  className="btn btn-sm btn-info"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffAssigned;
