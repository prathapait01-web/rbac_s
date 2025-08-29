import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Roles() {
  const [roleName, setRoleName] = useState("");
  const [access, setAccess] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("token");

  const accesses = ["products", "users", "anotherPage1", "anotherPage2", "anotherPage3"];

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/roles", { headers: { Authorization: `Bearer ${token}` } });
      setRoles(res.data);
    } catch (err) {
      alert("Error fetching roles ❌");
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  const toggleAccess = (page) => {
    setAccess(prev => prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]);
  };

  const createRole = async () => {
    if (!roleName || access.length === 0) return alert("Enter role name and select accesses");
    try {
      await axios.post("http://localhost:4000/roles", { name: roleName, access }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Role created ✅");
      setRoleName(""); setAccess([]);
      fetchRoles();
    } catch {
      alert("Error creating role ❌");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 20 }}>
      <h2>Create Role & Assign Access</h2>
      <input value={roleName} onChange={e => setRoleName(e.target.value)} placeholder="Role Name" />
      <div style={{ marginTop: 10 }}>
        {accesses.map(page => (
          <label key={page} style={{ marginRight: 10 }}>
            <input type="checkbox" checked={access.includes(page)} onChange={() => toggleAccess(page)} /> {page}
          </label>
        ))}
      </div>
      <button onClick={createRole} style={{ marginTop: 10, padding: "6px 12px" }}>Create Role</button>

      <h3 style={{ marginTop: 20 }}>Existing Roles</h3>
      <ul>
        {roles.map(r => <li key={r._id}>{r.name}: {r.permissions.join(", ")}</li>)}
      </ul>
    </div>
  );
}
