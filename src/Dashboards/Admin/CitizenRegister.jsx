import { useState } from "react";

const CitizenRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);

    const res = await fetch("http://localhost:5000/register/citizen", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
    } else {
      alert("Citizen Registered Successfully");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Citizen Registration</h2>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="file"
          className="file-input w-full"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
        />

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CitizenRegister;
