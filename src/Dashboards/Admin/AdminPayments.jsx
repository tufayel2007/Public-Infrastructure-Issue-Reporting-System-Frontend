import { useEffect, useState } from "react";
import {
  MdDownload,
  MdPayment,
  MdCalendarToday,
  MdPerson,
} from "react-icons/md";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/admin/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      });
  }, []);

  const downloadInvoice = async (paymentId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/invoice/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch invoice");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Invoice download failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading payments...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Payment History
        </h2>
        <p className="text-gray-600 mt-2">All premium and boost transactions</p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
          <MdPayment className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-blue-100 text-sm">Total Payments</p>
          <p className="text-3xl font-bold">{payments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-xl text-white">
          <MdPerson className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-emerald-100 text-sm">Active Users</p>
          <p className="text-3xl font-bold">
            {new Set(payments.map((p) => p.uid)).size}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl shadow-xl text-white">
          <MdCalendarToday className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-purple-100 text-sm">Latest Transaction</p>
          <p className="text-xl font-bold">
            {payments.length > 0
              ? new Date(payments[0].date).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <h3 className="text-xl font-semibold">Transaction Details</h3>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdPayment className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No payments recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((p, index) => (
                  <tr
                    key={p._id}
                    className={`transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                      index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {p.uid}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          p.type === "premium"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {p.amount}{" "}
                      <span className="text-gray-600">{p.currency}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <button
                        onClick={() => downloadInvoice(p._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                      >
                        <MdDownload className="w-4 h-4" />
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2025 IssueHub • All transactions are secure and encrypted
      </div>
    </div>
  );
};

export default AdminPayments;
