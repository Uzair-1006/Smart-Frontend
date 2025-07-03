"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "./InputField";

interface User {
  id: string;
  name: string;
  email: string;
}

const Header = () => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const closeDropdowns = () => {
    setIsDropdownOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      gender: "",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { email: formData.email });
      
      const res = await fetch("https://smart-backend-3.onrender.com/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        setIsAuthModalOpen(false);
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed due to an error. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch("https://smart-backend-3.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful. Please login.");
        setAuthMode("login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error", err);
      alert("Registration failed due to an error");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("https://smart-backend-3.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    try {
      const res = await fetch("https://smart-backend-3.onrender.com/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Auth check error", err);
      localStorage.removeItem("token");
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsAuthModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsAuthModalOpen(false);
    }
  };

  useEffect(() => {
    if (isAuthModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isAuthModalOpen]);

  return (
    <nav className="bg-gradient-to-b from-blue-50 to-cyan-100 flex items-center justify-between px-6 py-5 relative z-30">
      <Link href="/" onClick={closeDropdowns}>
        <Image src="/smart.png" width={100} height={100} alt="Logo" className="rounded-full" />
      </Link>

      <ul className="hidden lg:flex gap-8">
        <Link href="/" className="hover:font-bold" onClick={closeDropdowns}>Home</Link>

        <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <span className="cursor-pointer hover:font-bold">Products</span>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
              <Link href="/bindushopping" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdowns}>Bindu Shopping</Link>
              <Link href="/siponproducts" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdowns}>Sipon Products</Link>
            </div>
          )}
        </div>

        <Link href="#Prices" className="hover:font-bold" onClick={closeDropdowns}>Prices</Link>
        <Link href="#Offers" className="hover:font-bold" onClick={closeDropdowns}>Offers</Link>

        <div className="relative" onMouseEnter={() => setIsAboutDropdownOpen(true)} onMouseLeave={() => setIsAboutDropdownOpen(false)}>
          <span className="cursor-pointer hover:font-bold">About us</span>
          {isAboutDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
              <Link href="/Support" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdowns}>Support</Link>
              <Link href="/ContactUS" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdowns}>Contact Us</Link>
            </div>
          )}
        </div>
      </ul>

      {!checkingAuth && (
        <div className="flex gap-4">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">{user?.name}</button>
              <div className="absolute right-0 hidden group-hover:block mt-2 w-48 bg-white shadow-lg rounded-md">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <Link href="/order" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={() => toggleAuthModal("login")} className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
              <button onClick={() => toggleAuthModal("register")} className="bg-gray-800 text-white px-4 py-2 rounded-md">Register</button>
            </>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-4">
          <div ref={modalRef} className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {authMode === "login" ? "Welcome Back 👋" : "Create an Account 🚀"}
              </h2>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
            </div>
            <form onSubmit={authMode === "login" ? handleLogin : handleRegister}>
              <div className="grid md:grid-cols-2 gap-6">
                {authMode === "register" && (
                  <div className="space-y-4">
                    <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                    <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
                  {authMode === "register" && (
                    <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
                  )}
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-lg mt-6 font-medium">
                {authMode === "login" ? "Login" : "Register"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button type="button" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-blue-600 hover:underline">
                  {authMode === "login" ? "Register" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
