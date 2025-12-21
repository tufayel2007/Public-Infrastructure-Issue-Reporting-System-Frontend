import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadStaff = async () => {
    try {
      const res = await axiosSecure.get("/admin/staff");
      setStaff(res.data.staff);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // Filter staff based on search
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStaff = filteredStaff.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleBlock = async (id) => {
    await axiosSecure.patch(`/admin/staff/${id}/block`);
    loadStaff();
  };

  const handleUnblock = async (id) => {
    await axiosSecure.patch(`/admin/staff/${id}/unblock`);
    loadStaff();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "⚠️ Are you sure? This will permanently delete this staff."
    );
    if (!confirm) return;

    await axiosSecure.delete(`/admin/staff/${id}`);
    loadStaff();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 border">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Staff Management
        </h2>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="input input-bordered w-full pl-12 pr-4 py-3 text-lg rounded-xl focus:input-primary"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Total Staff</div>
              <div className="stat-value text-primary">{staff.length}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Active</div>
              <div className="stat-value text-success">
                {staff.filter((s) => !s.blocked).length}
              </div>
            </div>
          </div>
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Blocked</div>
              <div className="stat-value text-error">
                {staff.filter((s) => s.blocked).length}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-lg table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStaff.map((s, index) => (
                <tr key={s._id}>
                  <th>{startIndex + index + 1}</th>
                  <td className="font-semibold">{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone || "N/A"}</td>
                  <td>
                    {s.blocked ? (
                      <span className="badge badge-error gap-2">Blocked</span>
                    ) : (
                      <span className="badge badge-success gap-2">Active</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {!s.blocked ? (
                      <button
                        onClick={() => handleBlock(s._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblock(s._id)}
                        className="btn btn-success btn-sm"
                      >
                        Unblock
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${
                      currentPage === page
                        ? "btn-primary"
                        : "btn-outline btn-ghost"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Results info */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredStaff.length)} of{" "}
          {filteredStaff.length} results
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
