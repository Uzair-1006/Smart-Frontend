import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Footer from "@/Components/Footer";
import { useRouter } from "next/router";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://smart-backend-3.onrender.com/api/user/order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("🔥 Failed to fetch orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      const res = await axios.put(
        `https://smart-backend-3.onrender.com/api/user/order/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );
      console.log("✅ Cancelled:", res.data);
      fetchOrders(); // refresh after cancel
    } catch (err) {
      console.error("❌ Cancel failed:", err);
      alert("Failed to cancel order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f3f6]">
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Orders</h2>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            ← Back to Home
          </button>
        </div>

        {loading && <p className="text-lg text-gray-700">Loading orders...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && orders.length === 0 && (
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
        )}

        <div className="space-y-6">
          {orders.map((order: any, index: number) => (
            <div
              key={order._id || index}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <div>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Placed on:{" "}
                    {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                  <p className="mt-1 font-semibold text-gray-700">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              <div className="divide-y">
                {order.products.map((product: any) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-contain h-full w-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity || 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.status !== "cancelled" && order.status !== "delivered" && (
                <div className="flex justify-end px-4 pb-4 pt-2">
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserOrders;
