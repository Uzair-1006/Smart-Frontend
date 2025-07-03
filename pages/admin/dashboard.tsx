import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout";

const AdminDashboard = () => {

  type Admin = {
  name: string;
  email: string;
  id: string;
};

const [admin, setAdmin] = useState<Admin | null>(null);

  const [stats, setStats] = useState({
    totalOrdersToday: 0,
    totalSales: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalOrdersThisWeek: 0,
    totalSalesThisWeek: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get("https://smart-backend-3.onrender.com/api/admin/dashboard", {
          withCredentials: true,
        });
        setAdmin(data.admin);
        setStats({
          totalOrdersToday: data.totalOrdersToday,
          totalSales: data.totalSales,
          pendingOrders: data.pendingOrders,
          deliveredOrders: data.deliveredOrders,
          totalOrdersThisWeek: data.totalOrdersThisWeek,
          totalSalesThisWeek: data.totalSalesThisWeek,
        });
      } catch (err) {
        setError("Unauthorized. Please login again.");
      }
    };

    fetchDashboard();
  }, []);

  if (error)
    return <p className="text-red-500 text-center text-lg mt-20">{error}</p>;
  if (!admin)
    return <p className="text-center text-gray-600 text-lg mt-20">Loading...</p>;

  return (
    <AdminSidebarLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        👋 Welcome, Admin
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Total Orders Today */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Total Orders Today</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.totalOrdersToday}</p>
        </div>

        {/* Total Sales */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Total Sales</h2>
          <p className="text-3xl font-bold text-gray-800">₹{stats.totalSales}</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Pending Orders</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.pendingOrders}</p>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Delivered Orders</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.deliveredOrders}</p>
        </div>

        {/* Weekly Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Total Orders This Week</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.totalOrdersThisWeek}</p>
        </div>

        {/* Weekly Sales */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-600">Total Sales This Week</h2>
          <p className="text-3xl font-bold text-gray-800">₹{stats.totalSalesThisWeek}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Admin Info</h2>
        <div className="space-y-4 text-gray-700">
          {/* Display Admin Info without Edit Mode */}
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{admin.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{admin.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Admin ID:</span>
            <span>{admin.id}</span>
          </div>
        </div>
      </div>

      {success && (
        <p className="text-green-500 text-center text-lg mt-4">{success}</p>
      )}
    </AdminSidebarLayout>
  );
};

export default AdminDashboard;
