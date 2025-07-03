"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const AdminSidebarLayout = ({ children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("https://smart-backend-3.onrender.com/api/admin/logout", {}, {
                withCredentials: true,
            });
            router.push("/admin/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`fixed sm:static top-0 left-0 z-40 w-64 h-full bg-blue-800 text-white transform transition-transform duration-300 ease-in-out 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
            >
                <div className="flex flex-col justify-between h-full p-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
                        <nav className="space-y-4">
                            <Link href="/admin/dashboard">
                                <button className="block w-full text-left hover:bg-blue-700 p-2 rounded">
                                    Dashboard
                                </button>
                            </Link>
                            <Link href="/admin/users">
                                <button className="block w-full text-left hover:bg-blue-700 p-2 rounded">
                                    Users
                                </button>
                            </Link>
                            <Link href="/admin/products">
                                <button className="block w-full text-left hover:bg-blue-700 p-2 rounded">
                                    Products
                                </button>
                            </Link>
                            <Link href="/admin/orders">
                                <button className="block w-full text-left hover:bg-blue-700 p-2 rounded">
                                    Orders
                                </button>
                            </Link>
                            <Link href="/admin/settings">
                                <button className="block w-full text-left hover:bg-blue-700 p-2 rounded">
                                    Settings
                                </button>
                            </Link>
                        </nav>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
                {/* Close Sidebar Button (inside sidebar) */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 sm:hidden bg-blue-600 text-white p-2 rounded-full"
                >
                    &times;
                </button>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
                {/* Top bar with toggle for small screens */}
                <div className="sm:hidden bg-white p-4 shadow-md flex justify-between items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-800"
                    >
                        {sidebarOpen ? (
                            <span className="text-2xl">&times;</span> // Close icon (×)
                        ) : (
                            <span className="text-2xl">&#9776;</span> // Hamburger icon (≡)
                        )}
                    </button>
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                </div>

                <main className="flex-1 p-4 sm:p-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminSidebarLayout;
