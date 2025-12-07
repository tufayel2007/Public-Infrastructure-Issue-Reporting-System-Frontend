import React, { useState, useEffect } from "react";

// Sample data for services (replace this with your actual data from an API)
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

  // Simulate fetching services data
  useEffect(() => {
    // Replace with your actual data fetching logic (API call)
    setServices(mockServices);
  }, []);

  // Filter services based on status and search query
  const filteredServices = services.filter((service) => {
    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Services</h1>

      {/* Filters */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No services found based on your filters.
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="card card-compact bg-white shadow-md rounded-lg p-4"
            >
              <div className="card-body">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`badge ${
                      service.status === "resolved"
                        ? "badge-success"
                        : service.status === "in-progress"
                        ? "badge-warning"
                        : "badge-primary"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <button className="btn btn-link mt-4">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllServices;
