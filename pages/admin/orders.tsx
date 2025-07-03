"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout"; // ✅ correct layout import

// 🧩 Type definitions
type User = {
  _id: string;
  name: string;
  email: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
};

type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  _id: string;
  user: User;
  products: Product[];
  totalAmount: number;
  paymentMode: string;
  status: OrderStatus;
  createdAt: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("https://smart-backend-3.onrender.com/api/admin/orders", {
        withCredentials: true,
      });
      setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await axios.put(
        `https://smart-backend-3.onrender.com/api/admin/orders/${orderId}`,
        { status },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (!confirmed) return;

    try {
      await axios.delete(`https://smart-backend-3.onrender.com/api/admin/orders/${orderId}`, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminSidebarLayout>
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">📦 Admin Orders</h1>

        {loading ? (
          <div className="text-gray-600">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-6 rounded-xl shadow border relative ${
                  order.status === "Cancelled"
                    ? "bg-red-100 border-red-500"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* ✅ Case-sensitive fix */}
                {order.status === "Cancelled" && (
                  <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-t-xl">
                    ❌ This order has been cancelled.
                  </div>
                )}

                <div className={`space-y-2 ${order.status === "Cancelled" ? "mt-8" : ""}`}>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">👤 User:</span> {order.user.name} ({order.user.email})
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium">🛒 Products:</span>
                    <ul className="list-disc pl-6 mt-1">
                      {order.products.map((product) => (
                        <li key={product._id}>
                          {product.name} - ₹{product.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium">💰 Total:</span> ₹{order.totalAmount}
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium">📦 Payment Mode:</span> {order.paymentMode}
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium">🕒 Placed At:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {order.status !== "Cancelled" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">🚚 Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value as OrderStatus)}
                          className="border border-gray-300 rounded px-3 py-1 text-sm bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="ml-auto px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                      >
                        🗑️ Delete Order
                      </button>
                    </>
                  ) : (
                    <div className="text-sm text-red-500 italic ml-1">
                      No actions available for cancelled orders.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AdminSidebarLayout>
  );
};

export default AdminOrders;
