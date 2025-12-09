import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/issues?mine=true")
      .then((res) => res.json())
      .then((data) => setIssues(data.issues));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Issues</h1>

      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((i) => (
            <tr key={i._id}>
              <td>{i.title}</td>
              <td className="font-semibold">{i.status}</td>
              <td>{new Date(i.date).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/citizen/issues/${i._id}`}
                  className="btn btn-sm btn-info"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyIssues;
