/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const handleBlock = async (id) => {
    if (!window.confirm("Block this user?")) return;
    try {
      await axiosSecure.patch(`/admin/user/block/${id}`);
      toast.success("User blocked!");
      refetch();
    } catch (err) {
      toast.error("Failed to block user");
    }
  };

  const handleUnblock = async (id) => {
    if (!window.confirm("Unblock this user?")) return;
    try {
      await axiosSecure.patch(`/admin/user/unblock/${id}`);
      toast.success("User unblocked!");
      refetch();
    } catch (err) {
      toast.error("Failed to unblock user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400 text-2xl">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            Manage Users
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Total Active Citizens:{" "}
            <span className="text-cyan-300 font-bold">{users.length}</span>
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-left text-gray-200 uppercase text-sm">
                    <th className="p-6 font-bold">Name</th>
                    <th className="p-6 font-bold">Email</th>
                    <th className="p-6 font-bold">Role</th>
                    <th className="p-6 font-bold text-center">Status</th>
                    <th className="p-6 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b border-white/10 hover:bg-white/5 transition-all duration-300 ${
                        index % 2 === 0 ? "bg-white/5" : ""
                      }`}
                    >
                      {/* Name + Avatar */}
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                            {(user.name || user.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {user.name ||
                                user.email?.split("@")[0] ||
                                "Unknown"}
                            </p>

                            <p className="text-sm text-gray-400">
                              ID: {user._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-6 text-gray-300">{user.email}</td>

                      {/* Role Badge */}
                      <td className="p-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            user.role === "admin"
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              : user.role === "moderator"
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-6 text-center">
                        {user.blocked ? (
                          <span className="px-6 py-3 bg-red-500/20 text-red-400 font-bold rounded-full border border-red-500/50 animate-pulse">
                            BLOCKED
                          </span>
                        ) : (
                          <span className="px-6 py-3 bg-green-500/20 text-green-400 font-bold rounded-full border border-green-500/50">
                            ACTIVE
                          </span>
                        )}
                      </td>

                      <td className="p-6 text-center">
                        {user.blocked ? (
                          <button
                            onClick={() => handleUnblock(user._id)}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlock(user._id)}
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-110 hover:shadow-red-500/50 transition-all duration-300"
                          >
                            Block User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-400">
            Total Users Managed:{" "}
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {users.length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
