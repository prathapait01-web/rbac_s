import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./user";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:4000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, [token]);

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 20 }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: 25,
          color: "#333",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        All Users (Admin only)
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <User key={u._id} user={u} />
        ))}
      </ul>
    </div>
  );
}
