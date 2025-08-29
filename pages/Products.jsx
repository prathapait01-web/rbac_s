import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Products() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (p) => {
    setEditing(p.id);
    setTitle(p.title);
    setPrice(p.price);
    setDescription(p.description);
  };

  const saveEdit = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editing ? { ...p, title, price, description } : p
      )
    );
    setEditing(null);
  };

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div style={{ maxWidth: 1000, margin: "30px auto", padding: 20 }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: 30,
          color: "#333",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Products
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            {editing === p.id ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  style={{
                    width: "100%",
                    marginBottom: 8,
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  type="number"
                  style={{
                    width: "100%",
                    marginBottom: 8,
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                  }}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  style={{
                    width: "100%",
                    marginBottom: 8,
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                  }}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={saveEdit}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ color: "#007bff", marginBottom: 8 }}>{p.title}</h3>
                <p>
                  <strong>Price:</strong> ${p.price}
                </p>
                <p>{p.description}</p>
                {user?.role === "admin" && (
                  <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                    <button
                      onClick={() => startEdit(p)}
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        backgroundColor: "#ffc107",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Give Access button for admin */}
      {user?.role === "admin" && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={() => alert("Navigate to Give Access Page")}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            ➕ Give Access
          </button>
        </div>
      )}
    </div>
  );
}
