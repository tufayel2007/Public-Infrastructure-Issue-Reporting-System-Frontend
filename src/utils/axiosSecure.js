// utils/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

axiosSecure.interceptors.request.use((config) => {
  // এখন শুধু "token" চেক করবো, "user" না
  const token = localStorage.getItem("token");

  console.log("ATTACHED TOKEN =", token); // এটা দেখবে token আছে কি না

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosSecure;
