import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CitizenIssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/issues/${id}`)
      .then((res) => res.json())
      .then((data) => setIssue(data));
  }, [id]);

  if (!issue) return <p>Loading...</p>;

  return (
    <div className="bg-white p-5 shadow rounded">
      <h1 className="text-2xl font-bold mb-2">{issue.title}</h1>
      <p className="text-gray-600 mb-4">{issue.description}</p>

      <h2 className="text-xl font-semibold mt-6">Timeline</h2>
      <div className="mt-3 space-y-2">
        {(issue.timeline || []).map((t, index) => (
          <div key={index} className="p-3 border rounded bg-gray-50">
            <p>
              <strong>{t.status}</strong> — {t.message}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(t.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Comments</h2>
      <div className="mt-2 space-y-3">
        {(issue.comments || []).map((c, idx) => (
          <div key={idx} className="p-3 border rounded bg-gray-50">
            <p className="font-bold">{c.name}</p>
            <p>{c.text}</p>
            <small className="text-gray-500">
              {new Date(c.date).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitizenIssueDetails;
