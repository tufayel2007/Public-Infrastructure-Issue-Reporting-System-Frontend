import React, { useState, useEffect } from "react";

// Sample data
const mockServices = [
  {
    id: 1,
    title: "Streetlight Repair",
    description: "Fix broken streetlights across the city.",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Pothole Filling",
    description: "Fill potholes on Main Street.",
    status: "Resolved",
  },
  {
    id: 3,
    title: "Water Leakage Repair",
    description: "Fix water leakage near Central Park.",
    status: "Pending",
  },
  {
    id: 4,
    title: "Garbage Collection",
    description: "Collect garbage from Downtown.",
    status: "In Progress",
  },
];

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Normalize status for comparison
  const normalizeStatus = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesStatus =
      statusFilter === "all" ||
      normalizeStatus(service.status) === statusFilter;

    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Badge color logic
  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "badge-success";
      case "in progress":
        return "badge-warning";
      case "pending":
        return "badge-error"; // or badge-primary / badge-ghost
      default:
        return "badge-ghost";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        All Services
      </h1>

      {/* Filters & Search */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No services found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-lg">{service.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>

                <div className="card-actions justify-between items-center mt-4">
                  <div
                    className={`badge badge-lg ${getBadgeClass(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </div>
                  <button className="btn btn-sm btn-outline btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;
