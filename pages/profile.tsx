"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaHeart, FaUserCircle, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import "../app/globals.css";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Order {
  _id: string;
  orderDate: string;
  products: Product[];
  totalAmount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dob?: string;
  orders: Order[];
  wishlist: Product[];
  addresses: string[];
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    addresses: [""],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("https://smart-backend-3.onrender.com/api/user/profile", {
          withCredentials: true,
        });

        if (!data?.user) {
          setError("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        setUser(data.user);
        setEditData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          gender: data.user.gender || "",
          dob: data.user.dob?.slice(0, 10) || "",
          addresses: data.user.addresses || [""],
        });
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("https://smart-backend-3.onrender.com/api/user/logout", {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://smart-backend-3.onrender.com/api/user/profile",
        editData,
        { withCredentials: true }
      );
      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  if (error) return <div className="text-red-500 text-center text-xl mt-10">{error}</div>;
  if (!user) return <div className="text-gray-600 text-center text-xl mt-10">Loading...</div>;

  const TABS = [
    { key: "profile", label: "Profile", icon: FaUserCircle },
    { key: "orders", label: "Orders", icon: FaShoppingBag },
    { key: "wishlist", label: "Wishlist", icon: FaHeart },
    { key: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-900 text-white rounded-lg p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <FaUserCircle className="text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-300 text-sm">{user.email}</p>
          </div>
        </div>
        <nav className="space-y-3">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 w-full p-3 rounded-md text-left transition ${activeTab === key ? "bg-blue-500" : "hover:bg-gray-800"
                }`}
            >
              <Icon /> {label}
            </button>
          ))}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 w-full p-3 rounded-md text-left transition hover:bg-gray-800"
          >
            🏠 Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 mt-4 bg-red-500 hover:bg-red-600 rounded-md text-white text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-3/4 p-6 bg-white rounded-lg shadow-lg"
      >
        {activeTab === "profile" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-500 hover:text-blue-700 underline"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
                {user.gender && <div><strong>Gender:</strong> {user.gender}</div>}
                {user.dob && (
                  <div><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</div>
                )}
                {user.addresses?.length > 0 && (
                  <div className="col-span-2">
                    <strong>Saved Addresses:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1 text-sm text-gray-600">
                      {user.addresses.map((addr, idx) => (
                        <li key={idx}>{addr}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleProfileSave}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input className="input" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} placeholder="Name" />
                <input className="input" value={editData.phone} onChange={e => setEditData({ ...editData, phone: e.target.value })} placeholder="Phone" />
                <select className="input" value={editData.gender} onChange={e => setEditData({ ...editData, gender: e.target.value })}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input className="input" type="date" value={editData.dob} onChange={e => setEditData({ ...editData, dob: e.target.value })} />
                <textarea
                  className="input col-span-2"
                  value={editData.addresses[0]}
                  onChange={e => setEditData({ ...editData, addresses: [e.target.value] })}
                  placeholder="Address"
                />
                <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <section>
            <h3 className="text-2xl font-semibold mb-3">Your Orders</h3>
            {user.orders.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.orders.map(order => (
                  <motion.div
                    key={order._id}
                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <ul className="mt-2">
                      {order.products.map(product => (
                        <li key={product._id} className="flex justify-between">
                          <span>{product.name}</span>
                          <span className="text-blue-500">${product.price}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold">Total: ${order.totalAmount}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "wishlist" && (
          <section>
            <h3 className="text-2xl font-semibold mb-3">Your Wishlist</h3>
            {user.wishlist.length === 0 ? (
              <p className="text-gray-500">No items in wishlist.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.wishlist.map(product => (
                  <motion.div
                    key={product._id}
                    className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-semibold">{product.name}</p>
                    <span className="text-blue-500">${product.price}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "addresses" && (
          <section>
            <h3 className="text-2xl font-semibold mb-3">Saved Addresses</h3>
            {user.addresses.length === 0 ? (
              <p className="text-gray-500">No saved addresses.</p>
            ) : (
              <ul className="space-y-2">
                {user.addresses.map((address, index) => (
                  <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                    {address}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </motion.main>
    </div>
  );
};

export default ProfilePage;
