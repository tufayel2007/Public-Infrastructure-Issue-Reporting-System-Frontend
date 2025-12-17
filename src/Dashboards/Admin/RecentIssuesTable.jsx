import React from "react";

const RecentIssuesTable = ({ issues = [] }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 text-gray-300">📭</div>
        <p className="text-xl text-gray-500">
          কোনো সাম্প্রতিক অভিযোগ পাওয়া যায়নি
        </p>
        <p className="text-sm text-gray-400 mt-2">
          নতুন অভিযোগ যোগ হলে এখানে দেখাবে
        </p>
      </div>
    );
  }

  // তারিখ বাংলা/ইংরেজি সুন্দর ফরম্যাট
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // প্রায়োরিটি ব্যাজ কালার
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // স্ট্যাটাস ব্যাজ কালার
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "in progress":
        return "bg-blue-600 text-white";
      case "resolved":
        return "bg-green-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">শিরোনাম</th>
              <th className="px-6 py-4 font-semibold">ক্যাটাগরি</th>
              <th className="px-6 py-4 font-semibold">প্রায়োরিটি</th>
              <th className="px-6 py-4 font-semibold">স্ট্যাটাস</th>
              <th className="px-6 py-4 font-semibold">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i, index) => (
              <tr
                key={i._id}
                className={`border-t border-gray-100 hover:bg-purple-50/50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                }`}
              >
                <td className="px-6 py-5 font-medium text-gray-800 max-w-xs truncate">
                  {i.title}
                </td>
                <td className="px-6 py-5 text-gray-600">{i.category || "—"}</td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      i.priority
                    )}`}
                  >
                    {i.priority || "Normal"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                      i.status
                    )}`}
                  >
                    {i.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {formatDate(i.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {issues.map((i) => (
          <div
            key={i._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">
              {i.title}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ক্যাটাগরি:</span>
                <span className="font-medium text-gray-700">
                  {i.category || "—"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">প্রায়োরিটি:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                    i.priority
                  )}`}
                >
                  {i.priority || "Normal"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">স্ট্যাটাস:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                    i.status
                  )}`}
                >
                  {i.status || "Pending"}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500">তারিখ:</span>
                <span className="font-medium text-gray-700">
                  {formatDate(i.date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIssuesTable;
