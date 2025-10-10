"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch products
  async function fetchProducts() {
    try {
      const res = await axios.get(`${API_URL}/product`);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle create or update
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingId) {
        await axios.put(`${API_URL}/product/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/product`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  function handleEdit(product: any) {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || "",
    });
    setEditingId(product.id);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Product Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#f57c3b] text-white py-2 rounded hover:bg-[#e26f2f]"
        >
          {editingId ? "Update Product" : "Create Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow rounded flex flex-col items-center text-center"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              )}
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-[#f57c3b] font-semibold mt-2">₹{product.price}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
