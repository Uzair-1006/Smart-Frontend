import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        mrp: "",
        category: "",
        description: "",
        image: "",
        brand: "",
        stock: "",
        color: "",
        size: "",
        quantityPerCase: "",
    });

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("https://smart-backend-3.onrender.com/api/admin/products", {
                withCredentials: true,
            });
            setProducts(data.products);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`https://smart-backend-3.onrender.com/api/admin/products/${productId}`, {
                withCredentials: true,
            });
            setProducts((prev) => prev.filter((product) => product._id !== productId));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async () => {
        try {
            const { data } = await axios.post(
                "https://smart-backend-3.onrender.com/api/admin/products",
                {
                    ...newProduct,
                    price: parseFloat(newProduct.price),
                    mrp: parseFloat(newProduct.mrp),
                    stock: parseInt(newProduct.stock),
                    quantityPerCase: parseInt(newProduct.quantityPerCase),
                },
                { withCredentials: true }
            );
            setProducts((prev) => [...prev, data.product]);
            setShowAddModal(false);
            setNewProduct({
                name: "",
                price: "",
                mrp: "",
                category: "",
                description: "",
                image: "",
                brand: "",
                stock: "",
                color: "",
                size: "",
                quantityPerCase: "",
            });
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const { data } = await axios.put(
                `https://smart-backend-3.onrender.com/api/admin/products/${productToUpdate._id}`,
                {
                    ...productToUpdate,
                    price: parseFloat(productToUpdate.price),
                    mrp: parseFloat(productToUpdate.mrp),
                    stock: parseInt(productToUpdate.stock),
                    quantityPerCase: parseInt(productToUpdate.quantityPerCase),
                    // Include all fields, including name and brand
                },
                { withCredentials: true }
            );
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === data.product._id ? data.product : product
                )
            );
            setShowUpdateModal(false);
            setProductToUpdate(null);
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    const handleUpdateModalOpen = (product) => {
        setProductToUpdate(product);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AdminSidebarLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🛍️ Products Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    + Add Product
                </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border text-sm">
                        <thead>
                            <tr className="bg-blue-100 text-left">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Brand</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Price (Case / Piece)</th>
                                <th className="p-2 border">MRP</th>
                                <th className="p-2 border">Stock</th>
                                <th className="p-2 border">Image</th>
                                <th className="p-2 border text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-100">
                                        <td className="p-2 border">{product.name}</td>
                                        <td className="p-2 border">{product.brand || "-"}</td>
                                        <td className="p-2 border">{product.category || "-"}</td>
                                        <td className="p-2 border">
                                            ₹{product.price} / {product.quantityPerCase}
                                            <br />
                                            <span className="text-gray-500 text-sm">
                                                (
                                                ₹
                                                {product.quantityPerCase && product.quantityPerCase > 0
                                                    ? (product.price / product.quantityPerCase).toFixed(2)
                                                    : "N/A"}{" "}
                                                per piece)
                                            </span>
                                        </td>
                                        <td className="p-2 border">₹{product.mrp || "-"}</td>
                                        <td className="p-2 border">{product.stock}</td>
                                        <td className="p-2 border">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="h-10" />
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="p-2 border text-center">
                                            <button
                                                onClick={() => handleUpdateModalOpen(product)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs mx-2"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-4 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add Product */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <input
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    placeholder="Product Name"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="brand"
                                    value={newProduct.brand}
                                    onChange={handleInputChange}
                                    placeholder="Brand"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="Price (Per Case)"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="mrp"
                                    value={newProduct.mrp}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="MRP (Per Case)"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="quantityPerCase"
                                    value={newProduct.quantityPerCase}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="Qty Per Case"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    placeholder="Category"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="Stock"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="color"
                                    value={newProduct.color}
                                    onChange={handleInputChange}
                                    placeholder="Color"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="size"
                                    value={newProduct.size}
                                    onChange={handleInputChange}
                                    placeholder="Size (e.g. S, M, L)"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <input
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Update Product */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
                        <div className="space-y-4">
                            {/* Allow editing all fields */}
                            <div className="flex gap-3">
                                <input
                                    name="name"
                                    value={productToUpdate.name}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    placeholder="Product Name"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="brand"
                                    value={productToUpdate.brand}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({ ...prev, brand: e.target.value }))
                                    }
                                    placeholder="Brand"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="price"
                                    value={productToUpdate.price}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            price: e.target.value,
                                        }))
                                    }
                                    type="number"
                                    placeholder="Price (Per Case)"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="mrp"
                                    value={productToUpdate.mrp}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({ ...prev, mrp: e.target.value }))
                                    }
                                    type="number"
                                    placeholder="MRP (Per Case)"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="quantityPerCase"
                                    value={productToUpdate.quantityPerCase}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            quantityPerCase: e.target.value,
                                        }))
                                    }
                                    type="number"
                                    placeholder="Qty Per Case"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="category"
                                    value={productToUpdate.category}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            category: e.target.value,
                                        }))
                                    }
                                    placeholder="Category"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="stock"
                                    value={productToUpdate.stock}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            stock: e.target.value,
                                        }))
                                    }
                                    type="number"
                                    placeholder="Stock"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    name="color"
                                    value={productToUpdate.color}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            color: e.target.value,
                                        }))
                                    }
                                    placeholder="Color"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    name="size"
                                    value={productToUpdate.size}
                                    onChange={(e) =>
                                        setProductToUpdate((prev) => ({
                                            ...prev,
                                            size: e.target.value,
                                        }))
                                    }
                                    placeholder="Size (e.g. S, M, L)"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <input
                                name="image"
                                value={productToUpdate.image}
                                onChange={(e) =>
                                    setProductToUpdate((prev) => ({
                                        ...prev,
                                        image: e.target.value,
                                    }))
                                }
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="description"
                                value={productToUpdate.description}
                                onChange={(e) =>
                                    setProductToUpdate((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateProduct}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminSidebarLayout>
    );
};

export default ProductsPage;
