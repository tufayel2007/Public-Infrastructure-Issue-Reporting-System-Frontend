import React from "react";

const PaymentsSummary = ({ payments = [], loading }) => {
  if (loading) return <div>Loading payments...</div>;
  if (!payments || payments.length === 0)
    return <div className="text-gray-500">No payments yet</div>;

  return (
    <div className="space-y-2">
      {payments.slice(0, 6).map((p) => (
        <div key={p._id || p.id} className="flex justify-between">
          <div>
            <div className="text-sm font-medium">
              {p.userName || p.userEmail}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(p.date).toLocaleDateString()}
            </div>
          </div>
          <div className="font-semibold">{p.amount} ৳</div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsSummary;
