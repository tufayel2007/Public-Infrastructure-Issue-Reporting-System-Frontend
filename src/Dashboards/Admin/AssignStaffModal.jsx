import { useEffect, useState } from "react";

const AssignStaffModal = ({ issue, refetch }) => {
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (issue) {
      fetch(`${import.meta.env.VITE_API_URL}/admin/staff/list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setStaffList(data));
    }
  }, [issue]);

  const handleAssign = (staff) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/issue/assign/${issue._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        staffId: staff._id,
        staffName: staff.name,
      }),
    }).then(() => {
      alert("Assigned Successfully!");
      refetch();
      document.getElementById("assign_modal").close();
    });
  };

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <dialog id="assign_modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="text-2xl font-bold mb-4">Assign Staff</h3>

        <input
          type="text"
          placeholder="Search staff..."
          className="input input-bordered w-full mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-80 overflow-y-auto space-y-2">
          {filteredStaff.map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm opacity-60">{s.email}</p>
              </div>

              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleAssign(s)}
              >
                Assign
              </button>
            </div>
          ))}
        </div>

        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default AssignStaffModal;
