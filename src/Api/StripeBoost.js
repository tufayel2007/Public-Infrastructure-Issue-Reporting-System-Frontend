// src/api/stripeBoost.js
export const createBoostSession = async (amount, issueId) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/payment/boost/create-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token") || ""}`, // use actual token
      },
      body: JSON.stringify({ amount, issueId }),
    }
  );
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
};
