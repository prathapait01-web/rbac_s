import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/products");
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 24, border: "1px solid #ddd", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: 10, borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Login</button>
      </form>
      {msg && <p style={{ marginTop: 12, color: msg.startsWith("❌") ? "crimson" : "green", textAlign: "center" }}>{msg}</p>}
    </div>
  );
}
