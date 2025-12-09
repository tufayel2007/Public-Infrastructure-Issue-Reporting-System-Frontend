import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      if (data.user.blocked) {
        alert("You are blocked by admin!");
        setLoading(false);
        return;
      }

      // Save login in context
      login(data.user);

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect user based on role
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "staff") navigate("/staff/dashboard");
      else navigate("/citizen/dashboard");
    } catch (error) {
      alert(error.message || "Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
