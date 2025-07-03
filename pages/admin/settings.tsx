"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout";

interface Settings {
    _id?: string;
    siteTitle: string;
    aboutUs: string;
    email: string;
    mobile: string;
}

const AdminSettings = () => {
    const [settings, setSettings] = useState<Settings>({
        siteTitle: "",
        aboutUs: "",
        email: "",
        mobile: "",
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get("https://smart-backend-3.onrender.com/api/admin/settings", {
                    withCredentials: true,
                });
                if (res.data.success && res.data.settings) {
                    setSettings(res.data.settings);
                }
            } catch (error) {
                console.log("No existing settings or fetch error");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const method = settings._id ? "put" : "post";
            const url = settings._id
                ? `https://smart-backend-3.onrender.com/api/admin/settings/${settings._id}`
                : "https://smart-backend-3.onrender.com/api/admin/settings";
            const res = await axios[method](url, settings, {
                withCredentials: true,
            });

            if (res.data.success) {
                setMessage("✅ Settings saved successfully.");
                if (!settings._id && res.data.settings._id) {
                    setSettings((prev) => ({ ...prev, _id: res.data.settings._id }));
                }
            } else {
                setMessage("❌ Failed to save settings.");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error saving settings.");
        }
    };

    return (
        <AdminSidebarLayout>
            <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 border-b pb-4">
                        Admin Website Settings
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading settings...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Site Title
                                </label>
                                <input
                                    type="text"
                                    name="siteTitle"
                                    value={settings.siteTitle}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    About Us
                                </label>
                                <textarea
                                    name="aboutUs"
                                    value={settings.aboutUs}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={settings.mobile}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 w-full sm:w-auto"
                                >
                                    Save Settings
                                </button>
                                {message && (
                                    <p className="text-sm text-gray-600">{message}</p>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminSettings;
    