"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../app/globals.css";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

type Product = {
  _id: string;
  name: string;
  price: number;
  mrp: number;
  quantityPerCase: number;
  stock: number;
  image: string;
  description?: string;
  category?: string;
};

const Bindu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showBill, setShowBill] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "https://smart-backend-3.onrender.com";
  const router = useRouter(); // Initialize the router for navigation

  const fetchBinduProducts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/user/products?brand=Bindu`);
      const binduProducts = data.products || [];
      setProducts(binduProducts);
      if (binduProducts.length > 0) setSelectedProduct(binduProducts[0]);
    } catch (error) {
      console.error("Error fetching Bindu products:", error);
    }
  };

  useEffect(() => {
    fetchBinduProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      const orderPayload = {
        products: cart.map((item) => item._id),
        totalAmount,
      };

      const { data } = await axios.post(`${BASE_URL}/api/user/orders`, orderPayload, {
        withCredentials: true,
      });

      alert(`✅ Order placed successfully! Order ID: ${data.order._id}`);
      setCart([]);
      setShowBill(false);
      fetchBinduProducts();
    } catch (error:any) {
      console.error("Order failed:", error?.response?.data || error.message);
      alert("❌ Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <Head>
        <title>Smart Agencies - Bindu</title>
        <meta name="description" content="Get Bindu products from Smart Agencies." />
      </Head>

      <section className="w-full min-h-screen p-4 bg-gradient-to-r from-[#7AB143] to-[#4A7A20] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center w-full h-full max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-2xl rounded-2xl space-y-6 md:space-y-0 md:space-x-6"
        >
          {/* Back to Home Button */}
          <button
            onClick={() => router.push("/")} // Navigate to home
            className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            style={{ zIndex: 10 }}
          >
            Back to Home
          </button>

          {selectedProduct ? (
            <>
              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start space-y-4 p-2 w-full"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-12">{selectedProduct.name}</h1> {/* Added margin-top */}
                {selectedProduct.description && (
                  <p className="text-sm md:text-md text-gray-600">{selectedProduct.description}</p>
                )}
                {selectedProduct.category && (
                  <p className="text-sm text-gray-500">Category: {selectedProduct.category}</p>
                )}
                <p className="text-sm md:text-md text-gray-700">MRP Price: <del>{selectedProduct.mrp || "N/A"}</del></p>
                <p className="text-sm md:text-md text-gray-700">
                  Our Price: <span className="font-semibold">
                    {(selectedProduct.price / selectedProduct.quantityPerCase).toFixed(2)}
                  </span> per piece
                </p>
                <p className="text-md text-gray-700">Case Price: <span className="font-semibold">{selectedProduct.price}</span></p>
                <p className="text-sm text-gray-600">Quantity Per Case: {selectedProduct.quantityPerCase}</p>
                <p className={`text-sm ${selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedProduct.stock > 0 ? "Available" : "Out of Stock"}
                </p>

                <button
                  onClick={() => addToCart(selectedProduct)}
                  disabled={selectedProduct.stock === 0}
                  className={`${
                    selectedProduct.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 mt-2 rounded-md shadow-md text-sm transition`}
                >
                  Add to Cart
                </button>

                <h2 className="mt-6 text-lg font-bold text-gray-800">Available Sizes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {products.map((product, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedProduct(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded-lg shadow-md transition-all duration-300 border-2 text-sm ${
                        selectedProduct._id === product._id
                          ? "bg-blue-500 text-white border-blue-700"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {product.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product Image */}
              <motion.div
                key={selectedProduct._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-full max-w-xs md:max-w-sm"
              >
                {selectedProduct.image ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg object-contain w-full"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </motion.div>
            </>
          ) : (
            <p className="text-xl text-white">Loading Bindu products...</p>
          )}
        </motion.div>
      </section>

      {/* Cart Section */}
      <div className="fixed bottom-4 right-4 bg-white border shadow-lg rounded-xl p-3 w-72 sm:w-80 z-50 max-h-[70vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-2">🛒 Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items added yet.</p>
        ) : (
          <ul className="space-y-2 max-h-48 overflow-auto">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.name}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium text-green-700">₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 font-medium">Total: ₹{totalAmount}</p>
            <button
              onClick={() => setShowBill(true)}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition text-sm"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>

      {/* Bill Modal */}
      {showBill && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-center">Order Confirmation</h2>
            <p className="text-sm text-center">Total: ₹{totalAmount}</p>
            <div className="space-x-4 flex justify-center">
              <button
                onClick={() => setShowBill(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className={`${
                  placingOrder ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white py-2 px-4 rounded-md`}
              >
                {placingOrder ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bindu;
