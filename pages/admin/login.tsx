import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://smart-backend-3.onrender.com/api/admin/login", { email, password }, { withCredentials: true });
            router.push("/admin/dashboard");
        } catch (err) {
            setError("Invalid credentials");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded w-96" autoComplete="off">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
