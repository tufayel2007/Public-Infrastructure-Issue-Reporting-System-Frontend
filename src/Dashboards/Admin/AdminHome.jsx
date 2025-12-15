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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="p-6 md:p-10 max-w-full mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            Admin Command Center
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Real-time monitoring •{" "}
            {new Date().toLocaleString("en-GB", {
              dateStyle: "full",
              timeStyle: "medium",
            })}
          </p>
        </div>

        {/* Stats Cards - Neon Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-10">
          {/* Total Issues */}
          <div className="group relative backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition"></div>
            <div className="relative z-10">
              <p className="text-cyan-300 text-sm font-medium">Total Issues</p>
              <p className="text-5xl font-bold mt-2">{issues.length}</p>
            </div>
          </div>

          {/* Pending */}
          <div className="group relative backdrop-blur-xl bg-white/10 border border-yellow-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-600/30 to-orange-600/30 blur-xl group-hover:blur-2xl transition"></div>
            <div className="relative z-10">
              <p className="text-yellow-300 text-sm font-medium">Pending</p>
              <p className="text-5xl font-bold mt-2 animate-pulse">{pending}</p>
            </div>
          </div>

          {/* In Progress */}
          <div className="group relative backdrop-blur-xl bg-white/10 border border-blue-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-xl group-hover:blur-2xl transition"></div>
            <div className="relative z-10">
              <p className="text-blue-300 text-sm font-medium">In Progress</p>
              <p className="text-5xl font-bold mt-2">{inProgress}</p>
            </div>
          </div>

          {/* Resolved */}
          <div className="group relative backdrop-blur-xl bg-white/10 border border-green-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 blur-xl group-hover:blur-2xl transition"></div>
            <div className="relative z-10">
              <p className="text-green-300 text-sm font-medium">Resolved</p>
              <p className="text-5xl font-bold mt-2">{resolved}</p>
            </div>
          </div>

          {/* Revenue */}
          <div className="group relative backdrop-blur-xl bg-white/10 border border-pink-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all xl:col-span-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-600/30 to-rose-600/30 blur-xl group-hover:blur-2xl transition"></div>
            <div className="relative z-10">
              <p className="text-pink-300 text-sm font-medium">Total Revenue</p>
              <p className="text-4xl font-bold mt-2">
                {paymentsLoading
                  ? "..."
                  : `${totalPayments.toLocaleString()} ৳`}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {payments.length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="group relative backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 blur-xl group-hover:blur-2xl transition"></div>
          <div className="relative z-10">
            <p className="text-purple-300 text-sm font-medium">
              Active Citizens
            </p>
            <p className="text-5xl font-bold mt-2">{users.length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Issue Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            Quick Actions
          </h3>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Issues */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-cyan-300">
            Recent Issues
          </h3>
          {issuesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 rounded-xl skeleton"
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

        {/* Right Column */}
        <div className="space-y-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-purple-300">
              New Citizens
            </h3>
            <RecentUsers users={users.slice(0, 6)} loading={usersLoading} />
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-pink-300">
              Payment History
            </h3>
            <PaymentsSummary payments={payments} loading={paymentsLoading} />
          </div>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="text-center mt-16 py-8">
        <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          CityFix Pro • Admin Panel v2.0
        </p>
        <p className="text-gray-500 mt-2">Powered by blood, sweat & React</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
