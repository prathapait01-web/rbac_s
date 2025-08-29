import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px 0",
    backgroundColor: "#007bff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "background-color 0.2s"
  };

  const linkHoverStyle = {
    backgroundColor: "#0056b3"
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={navStyle}>
          <Link to="/signup" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"} onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}>Signup</Link>
          <Link to="/login" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"} onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}>Login</Link>
          <Link to="/products" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"} onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}>Products</Link>
          <Link to="/users" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"} onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}>Give Access</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/products" element={
            <ProtectedRoute><Products /></ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute role="admin"><Users /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
