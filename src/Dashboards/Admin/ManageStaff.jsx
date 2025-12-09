import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);

  const loadData = () => {
    axiosSecure.get("/admin/users").then((res) => {
      const staffOnly = res.data.filter((u) => u.role === "staff");
      setStaff(staffOnly);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    axiosSecure.delete(`/admin/staff/${id}`).then(() => loadData());
  };

  return (
    <div>
      <h1>Manage Staff</h1>

      <button>Add Staff</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
