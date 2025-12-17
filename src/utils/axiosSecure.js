import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://issue-server-site.vercel.app",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN CHECK =", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosSecure;
