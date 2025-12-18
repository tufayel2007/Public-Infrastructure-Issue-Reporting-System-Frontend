import { useEffect, useState } from "react";

const CitizenPayment = () => {
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
    console.log("Token:", token);
    console.log(
      "Fetching invoice:",
      `${import.meta.env.VITE_API_URL}/payment/invoice/${paymentId}`
    );

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/invoice/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.status, res.statusText);

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

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payments (Admin)</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">{p.uid}</td>
              <td className="p-2 border">{p.type}</td>
              <td className="p-2 border">
                {p.amount} {p.currency}
              </td>
              <td className="p-2 border">
                {new Date(p.date).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => downloadInvoice(p._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitizenPayment;
