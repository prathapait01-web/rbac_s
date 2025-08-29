import React, { useState } from "react";

export default function User({ user }) {
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState(user.role || "basic_user"); // default role

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: role === "admin" ? "#ffe8e8" : "#e8f0ff",
        color: "#333",
        fontWeight: role === "admin" ? "bold" : "normal",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>
          {user.name} ({role})
        </span>
      </div>

      {/* email */}
      <span>{user.email}</span>

      {/* role dropdown */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          marginLeft: 10,
          padding: "5px 8px",
          borderRadius: 6,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        <option value="basic_user">Basic User</option>
        <option value="upgrade_user">Upgrade User</option>
        <option value="admin">Admin</option>
      </select>
    </li>
  );
}
