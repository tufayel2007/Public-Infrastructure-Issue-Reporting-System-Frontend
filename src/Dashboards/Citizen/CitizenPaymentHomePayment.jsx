import { useEffect, useState } from "react";
import {
  MdDownload,
  MdPayment,
  MdCalendarToday,
  MdHistory,
} from "react-icons/md";

const CitizenPaymentHomePayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const paymentsUrl =
      role === "admin"
        ? `${import.meta.env.VITE_API_URL}/admin/payments`
        : `${import.meta.env.VITE_API_URL}/payments/my`;

    fetch(paymentsUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
      })
      .then((data) => {
        setPayments(data.payments || data || []); // Flexible: handles {payments: [...]}, [...] or {data: [...]}
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setPayments([]);
        setLoading(false);
      });
  }, []);

  const downloadInvoice = async (paymentId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not authenticated");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/invoice/${paymentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 404) return alert("Invoice not found");
      if (res.status === 403)
        return alert("You are not allowed to download this invoice");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const blob = await res.blob();
      if (blob.type !== "application/pdf") {
        const text = await blob.text();
        console.error("Unexpected response:", text);
        return alert("Failed to download invoice (invalid response)");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice download error:", err);
      alert("Invoice download failed");
    }
  };

  // Calculate summary stats
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const latestDate =
    payments.length > 0
      ? new Date(
          Math.max(...payments.map((p) => new Date(p.date)))
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600 animate-pulse flex items-center gap-3">
          <MdHistory className="w-6 h-6" />
          Loading your payment history...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          My Payment History
        </h2>
        <p className="text-gray-600 mt-2">
          View all your premium subscriptions and boost transactions
        </p>
      </div>

      {/* Personal Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
          <MdPayment className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-cyan-100 text-sm">Total Transactions</p>
          <p className="text-3xl font-bold">{payments.length}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-xl text-white">
          <MdHistory className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-emerald-100 text-sm">Total Spent</p>
          <p className="text-3xl font-bold">
            {totalSpent.toLocaleString()} BDT
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-xl text-white">
          <MdCalendarToday className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-purple-100 text-sm">Latest Payment</p>
          <p className="text-xl font-bold">{latestDate}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
          <h3 className="text-xl font-semibold">Your Transactions</h3>
        </div>

        {payments.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <MdPayment className="w-20 h-20 mx-auto mb-6 opacity-30" />
            <p className="text-lg font-medium">No payments yet</p>
            <p className="text-sm mt-2">
              Your premium and boost transactions will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Transaction Type
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
                    className={`transition-all hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 ${
                      index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-4 py-2 text-xs font-semibold rounded-full ${
                          p.type === "premium"
                            ? "bg-purple-100 text-purple-800"
                            : p.type === "boost"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                      {p.amount.toLocaleString()}{" "}
                      <span className="text-gray-600">
                        {p.currency || "BDT"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => downloadInvoice(p._id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
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

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-gray-500">
        All transactions are secure • IssueHub © 2025
      </div>
    </div>
  );
};

export default CitizenPaymentHomePayment;
