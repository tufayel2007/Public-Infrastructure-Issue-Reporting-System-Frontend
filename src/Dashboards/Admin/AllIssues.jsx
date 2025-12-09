import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);

  const loadIssues = () => {
    axiosSecure.get("/admin/issues").then((res) => setIssues(res.data));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleReject = (id) => {
    axiosSecure.patch(`/admin/issue/reject/${id}`).then(() => loadIssues());
  };

  return (
    <div>
      <h1>All Issues</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Citizen</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((i) => (
            <tr key={i._id}>
              <td>
                <img src={i.imageUrl} width="50" />
              </td>
              <td>{i.title}</td>
              <td>{i.status}</td>
              <td>{i.uid}</td>
              <td>{new Date(i.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleReject(i._id)}>Reject</button>
                <button>Assign</button>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllIssues;
