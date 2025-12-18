import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";

const AllServices = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: issues = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data.issues || [];
    },
  });

  const filteredIssues = issues.filter((issue) => {
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || issue.category === categoryFilter;

    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved":
        return "badge badge-success badge-lg";
      case "in-progress":
        return "badge badge-warning badge-lg";
      case "pending":
        return "badge badge-error badge-lg";
      case "rejected":
        return "badge badge-ghost badge-lg";
      default:
        return "badge badge-ghost badge-lg";
    }
  };

  const getPriorityBadge = (priority) => {
    return priority === "high"
      ? "badge badge-accent badge-outline badge-sm"
      : "badge badge-ghost badge-sm";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-red-400">
          Failed to load services. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            All City Services
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Track ongoing and resolved civic issues in your city
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-lg w-full bg-white/10 text-white border-white/20"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered select-lg w-full bg-white/10 text-white border-white/20"
          >
            <option value="all">All Categories</option>
            <option value="pothole">Pothole</option>
            <option value="streetlight">Street Light</option>
            <option value="garbage">Garbage</option>
            <option value="water-leakage">Water Leakage</option>
            <option value="drainage">Drainage</option>
            <option value="footpath">Footpath</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, location or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered input-lg w-full pl-12 bg-white/10 text-white border-white/20 placeholder-gray-400"
            />
            <svg
              className="absolute left-4 top-4 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <p className="text-right text-gray-300 mb-6">
          Showing <strong>{filteredIssues.length}</strong> service
          {filteredIssues.length !== 1 && "s"}
        </p>

        {filteredIssues.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-20">🔍</div>
            <p className="text-2xl text-gray-400">
              No services found matching your filters.
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting the search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredIssues.map((issue) => (
              <div
                key={issue._id}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 overflow-hidden transform hover:-translate-y-3 transition-all duration-500"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      issue.imageUrl &&
                      issue.imageUrl !== "/placeholder.jpg" &&
                      issue.imageUrl !== ""
                        ? issue.imageUrl // Cloudinary URL → সরাসরি
                        : "/placeholder-service.jpg"
                    }
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "/placeholder-service.jpg"; // যদি কোনো কারণে লোড না হয়
                    }}
                  />

                  <div className="absolute top-3 right-3">
                    <div className={getPriorityBadge(issue.priority)}>
                      {issue.priority === "high" ? "HIGH PRIORITY" : "Normal"}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {issue.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                    {issue.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={getStatusBadge(issue.status)}>
                      {issue.status.toUpperCase().replace("-", " ")}
                    </div>
                    <div className="badge badge-outline badge-sm text-gray-300">
                      {issue.category}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{issue.upvotes?.length || 0} Upvotes</span>
                    </div>
                    <div className="text-xs">
                      {new Date(issue.date).toLocaleDateString("en-GB")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
