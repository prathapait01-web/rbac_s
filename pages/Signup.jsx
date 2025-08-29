import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/signup", form);
      setMsg("✅ Signup successful, please login!");
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 24, border: "1px solid #ddd", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <select name="role" value={form.role} onChange={handleChange} style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ padding: 10, borderRadius: 6, border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" }}>Signup</button>
      </form>
      {msg && <p style={{ marginTop: 12, color: msg.startsWith("❌") ? "crimson" : "green", textAlign: "center" }}>{msg}</p>}
    </div>
  );
}
