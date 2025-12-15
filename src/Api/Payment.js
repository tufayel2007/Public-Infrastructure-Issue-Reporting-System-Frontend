export const verifyBoost = async (sessionId, issueId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId, issueId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Verification failed");
  return data;
};
