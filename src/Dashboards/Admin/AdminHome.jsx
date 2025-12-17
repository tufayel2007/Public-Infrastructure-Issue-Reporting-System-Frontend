import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";

import QuickActions from "./QuickActions";
import RecentIssuesTable from "./RecentIssuesTable";
import RecentUsers from "./RecentUsers";
import PaymentsSummary from "./PaymentsSummary";
import IssuesBarChart from "./IssuesBarChart";
import IssuesPieChart from "./IssuesPieChart";

const fetchAdminIssues = async () => {
  const res = await axiosSecure.get("/admin/issues");
  return res.data;
};

const fetchAdminUsers = async () => {
  const res = await axiosSecure.get("/admin/users");
  return res.data;
};

const fetchPayments = async () => {
  const res = await axiosSecure.get("/admin/payments");
  return res.data;
};

const AdminDashboard = () => {
  const {
    data: issues = [],
    isLoading: issuesLoading,
    error: issuesError,
  } = useQuery({
    queryKey: ["admin-issues"],
    queryFn: fetchAdminIssues,
    staleTime: 1000 * 60 * 30,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAdminUsers,
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: fetchPayments,
  });

  // Stats Calculation
  const pending = issues.filter((i) => i.status === "pending").length;
  const inProgress = issues.filter((i) => i.status === "in-progress").length;
  const resolved = issues.filter((i) => i.status === "resolved").length;
  const rejected = issues.filter((i) => i.status === "rejected").length;
  const totalPayments =
    payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  return (
    <>
      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            opacity: 0;
            animation: fadeInUp 1s ease-out forwards;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-700 { animation-delay: 0.7s; }
          .delay-800 { animation-delay: 0.8s; }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        {/* Animated Background Blobs - Responsive Size */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center md:text-left mb-12 animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              Admin Command Center
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Real-time monitoring •{" "}
              {new Date().toLocaleString("en-GB", {
                dateStyle: "full",
                timeStyle: "medium",
              })}
            </p>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {/* Total Issues */}
            <div className="animate-fadeInUp delay-100 group relative backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10">
                <p className="text-cyan-300 text-sm font-medium">
                  Total Issues
                </p>
                <p className="text-4xl sm:text-5xl font-bold mt-3">
                  {issues.length}
                </p>
              </div>
            </div>

            {/* Pending */}
            <div className="animate-fadeInUp delay-200 group relative backdrop-blur-xl bg-white/10 border border-yellow-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-600/30 to-orange-600/30 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10">
                <p className="text-yellow-300 text-sm font-medium">Pending</p>
                <p className="text-4xl sm:text-5xl font-bold mt-3 animate-pulse">
                  {pending}
                </p>
              </div>
            </div>

            {/* In Progress */}
            <div className="animate-fadeInUp delay-300 group relative backdrop-blur-xl bg-white/10 border border-blue-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10">
                <p className="text-blue-300 text-sm font-medium">In Progress</p>
                <p className="text-4xl sm:text-5xl font-bold mt-3">
                  {inProgress}
                </p>
              </div>
            </div>

            {/* Resolved */}
            <div className="animate-fadeInUp delay-400 group relative backdrop-blur-xl bg-white/10 border border-green-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10">
                <p className="text-green-300 text-sm font-medium">Resolved</p>
                <p className="text-4xl sm:text-5xl font-bold mt-3">
                  {resolved}
                </p>
              </div>
            </div>

            {/* Revenue - Full width on mobile */}
            <div className="animate-fadeInUp delay-500 group relative backdrop-blur-xl bg-white/10 border border-pink-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500 sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-600/30 to-rose-600/30 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10">
                <p className="text-pink-300 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl sm:text-4xl font-bold mt-3">
                  {paymentsLoading
                    ? "..."
                    : `${totalPayments.toLocaleString()} ৳`}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {payments.length} transactions
                </p>
              </div>
            </div>

            {/* Active Citizens - Separate Card */}
            <div className="animate-fadeInUp delay-600 group relative backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-500 sm:col-span-2 lg:col-span-5 xl:col-span-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 blur-xl group-hover:blur-2xl transition"></div>
              <div className="relative z-10 text-center">
                <p className="text-purple-300 text-sm font-medium">
                  Active Citizens
                </p>
                <p className="text-4xl sm:text-5xl font-bold mt-3">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          {/* Charts & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fadeInUp delay-700">
            <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Issue Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <IssuesPieChart
                    pending={pending}
                    progress={inProgress}
                    resolved={resolved}
                    rejected={rejected}
                  />
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <IssuesBarChart issues={issues} />
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <QuickActions />
            </div>
          </div>

          {/* Recent Issues & Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-800">
            {/* Recent Issues */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-300">
                Recent Issues
              </h3>
              {issuesLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-white/5 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : issuesError ? (
                <p className="text-red-400 text-center py-10">
                  Failed to load issues
                </p>
              ) : (
                <RecentIssuesTable issues={issues.slice(0, 6)} />
              )}
            </div>

            {/* Right Column - Stacked on Mobile */}
            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-purple-300">
                  New Citizens
                </h3>
                <RecentUsers users={users.slice(0, 6)} loading={usersLoading} />
              </div>

              <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-pink-300">
                  Payment History
                </h3>
                <PaymentsSummary
                  payments={payments}
                  loading={paymentsLoading}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 py-8 animate-fadeInUp delay-800">
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CityFix Pro • Admin Panel v2.0
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Powered by blood, sweat & React
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
