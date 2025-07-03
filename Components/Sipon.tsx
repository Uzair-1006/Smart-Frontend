"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";  // Import Link from next for navigation
import "../app/globals.css";

type Product = {
  _id: string;
  name: string;
  price: number;
  mrp: number;
  quantityPerCase: number;
  image: string;
};

const Sipon = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showBill, setShowBill] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "https://smart-backend-3.onrender.com";

  useEffect(() => {
    const fetchSiponProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/admin/products?brand=Sipon`, {
          withCredentials: true,
        });
        setProducts(data.products);
        setSelectedProduct(data.products[0]);
      } catch (err) {
        console.error("Failed to fetch Sipon products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiponProducts();
  }, []);

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
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
    } catch (error) {
      console.error("Order failed:", error?.response?.data || error.message);
      alert("❌ Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <Head>
        <title>Smart Agencies - Sipon</title>
        <meta name="description" content="Explore Sipon brand products from Smart Agencies." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 p-4">
        <div className="max-w-6xl mx-auto py-10">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link href="/" passHref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                Back to Home
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-xl font-semibold">Loading products...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Product Image */}
              {selectedProduct && (
                <div className="flex justify-center">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={400}
                    height={400}
                    className="rounded-2xl shadow-xl object-contain"
                    priority
                  />
                </div>
              )}

              {/* Product Info */}
              <div className="bg-white p-6 rounded-2xl shadow-2xl space-y-4">
                {selectedProduct && (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
                    <p className="text-gray-600 line-through">MRP: ₹{selectedProduct.mrp}</p>
                    <p className="text-xl text-green-700 font-semibold">
                      Our Price: ₹{selectedProduct.price / selectedProduct.quantityPerCase} per piece
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      Case Price: ₹{selectedProduct.price}
                    </p>

                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                      Add to Cart
                    </button>

                    <h2 className="text-lg font-semibold text-gray-700 mt-6">Available Sizes</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {products.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => setSelectedProduct(product)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                            selectedProduct._id === product._id
                              ? "bg-yellow-500 text-white border-yellow-600"
                              : "bg-gray-100 text-gray-800 border-gray-300"
                          }`}
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Cart Panel */}
      <div className="fixed bottom-4 right-4 w-full sm:w-80 bg-white border shadow-lg rounded-xl p-4 z-50">
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
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>

      {/* Bill Confirmation Modal */}
      {showBill && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">🧾 Order Summary</h2>
            <ul className="space-y-1 max-h-60 overflow-auto">
              {cart.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex justify-between">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-semibold text-gray-800">
              Total: ₹{totalAmount}
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              💵 Payment Mode: <span className="font-medium">Cash only (for now)</span>
            </p>
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => setShowBill(false)}
                className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

export default Sipon;
