'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// ✅ Product type for proper typing
type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const SmartShopping = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showBill, setShowBill] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://smart-backend-3.onrender.com/api/user/allproducts')
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error('Fetch error', err));
  }, []);

  const addToCart = (product: Product) => {
    if (!cart.find((item) => item._id === product._id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const handleBuyNow = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://smart-backend-3.onrender.com/api/user/orders',
        {
          products: [product._id],
          totalAmount: product.price,
          paymentMode: 'Cash',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('✅ Order placed!');
    } catch (err) {
      console.error('Order error:', err);
      alert('❌ Failed to place order');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const totalAmount = cart.reduce((acc, curr) => acc + Number(curr.price), 0);

      await axios.post(
        'https://smart-backend-3.onrender.com/api/user/orders',
        {
          products: cart.map((p) => p._id),
          totalAmount,
          paymentMode: 'Cash',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('✅ Order placed successfully!');
      setCart([]);
      setShowBill(false);
    } catch (err) {
      console.error('Order error:', err);
      alert('❌ Failed to place order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-purple-700">🛍️ Smart Shopping</h2>

      {/* Navigation */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Home
        </button>
        <button
          onClick={() => router.push('/order')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          My Orders
        </button>
      </div>

      {/* Product Display */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-3 rounded-lg"
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 flex-grow">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">₹{product.price}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 bg-white border border-gray-300 shadow-2xl p-4 rounded-xl w-80 z-50"
        >
          <h3 className="text-xl font-bold mb-3 text-purple-600">🛒 Your Cart</h3>
          <ul className="space-y-2 max-h-48 overflow-auto pr-2">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center text-sm">
                <span className="truncate">{item.name}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-lg font-semibold text-gray-700">
            Total: ₹{cart.reduce((sum, p) => sum + Number(p.price), 0)}
          </p>
          <button
            onClick={() => setShowBill(true)}
            className="w-full mt-3 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg"
          >
            Place Order
          </button>
        </motion.div>
      )}

      {/* Bill Modal */}
      {showBill && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-96 space-y-4">
            <h2 className="text-xl font-bold text-purple-600">🧾 Order Summary</h2>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-semibold text-gray-800">
              Total: ₹{cart.reduce((sum, item) => sum + Number(item.price), 0)}
            </div>
            <p className="text-sm text-gray-600 text-right italic">Payment Mode: Cash</p>
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => setShowBill(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 text-sm"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartShopping;
