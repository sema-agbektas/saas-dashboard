import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://saas-dashboard-api-tj2g.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, 
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      setMsg("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMsg("Connection error: " + error.message);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", fontFamily: "Arial" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            style={{ width: "100%", padding: 8 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>

      {msg && <div style={{ marginTop: 12, color: msg.includes("successful") ? "green" : "red" }}>
        {msg}
      </div>}
    </div>
  );
}