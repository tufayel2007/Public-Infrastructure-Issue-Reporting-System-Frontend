import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaFileInvoiceDollar, FaTools } from "react-icons/fa";

const QuickActions = () => {
  return (
    <div className="flex  gap-3">
      <Link
        to="/admin/staff"
        className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50"
      >
        <FaUserPlus className="text-lg" />
        <div>
          <div className="text-sm font-medium">Add / Manage Staff</div>
          <div className="text-xs text-gray-500">Create staff accounts</div>
        </div>
      </Link>

      <Link
        to="/admin/payments"
        className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50"
      >
        <FaFileInvoiceDollar className="text-lg" />
        <div>
          <div className="text-sm font-medium">Payments</div>
          <div className="text-xs text-gray-500">View all payments</div>
        </div>
      </Link>

      <Link
        to="/admin/manage-issues"
        className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50"
      >
        <FaTools className="text-lg" />
        <div>
          <div className="text-sm font-medium">Manage Issues</div>
          <div className="text-xs text-gray-500">Assign / Reject / Update</div>
        </div>
      </Link>
    </div>
  );
};

export default QuickActions;
