// src/api/stripeSubscription.js
import API from "./axiosConfig";

// Subscription checkout session তৈরি
export const createSubscriptionSession = async (plan, uid) => {
  const res = await API.post("/payment/subscription/create-session", {
    plan,
    uid,
  });
  return res.data;
};
