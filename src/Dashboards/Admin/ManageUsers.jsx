import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const loadData = () => {
    axiosSecure.get("/admin/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBlock = (id) => {
    axiosSecure.patch(`/admin/user/block/${id}`).then(() => loadData());
  };

  const handleUnblock = (id) => {
    axiosSecure.patch(`/admin/user/unblock/${id}`).then(() => loadData());
  };

  return (
    <div>
      <h1>Manage Users</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.blocked ? "Blocked" : "Active"}</td>
              <td>
                {u.blocked ? (
                  <button onClick={() => handleUnblock(u._id)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlock(u._id)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
