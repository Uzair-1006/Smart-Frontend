"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout";

type Product = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
  color: string;
  size: string;
  quantityPerCase: number;
  description: string;
};

type NewProduct = Omit<Product, "_id">;

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    price: 0,
    mrp: 0,
    category: "",
    description: "",
    image: "",
    brand: "",
    stock: 0,
    color: "",
    size: "",
    quantityPerCase: 0,
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

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`https://smart-backend-3.onrender.com/api/admin/products/${productId}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "mrp" || name === "stock" || name === "quantityPerCase"
        ? Number(value)
        : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://smart-backend-3.onrender.com/api/admin/products",
        newProduct,
        { withCredentials: true }
      );
      setProducts((prev) => [...prev, data.product]);
      setShowAddModal(false);
      resetNewProduct();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productToUpdate) return;
    try {
      const { data } = await axios.put(
        `https://smart-backend-3.onrender.com/api/admin/products/${productToUpdate._id}`,
        productToUpdate,
        { withCredentials: true }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === data.product._id ? data.product : p))
      );
      setShowUpdateModal(false);
      setProductToUpdate(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleUpdateModalOpen = (product: Product) => {
    setProductToUpdate({ ...product });
    setShowUpdateModal(true);
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      price: 0,
      mrp: 0,
      category: "",
      description: "",
      image: "",
      brand: "",
      stock: 0,
      color: "",
      size: "",
      quantityPerCase: 0,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminSidebarLayout>
      <>
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
                          {product.quantityPerCase > 0
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
                    <td colSpan={8} className="text-center p-4 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {showAddModal && renderProductModal("Add New Product", newProduct, setNewProduct, handleAddProduct, setShowAddModal)}
        {showUpdateModal && productToUpdate &&
          renderProductModal("Update Product", productToUpdate, setProductToUpdate, handleUpdateProduct, setShowUpdateModal)}
      </>
    </AdminSidebarLayout>
  );
};

function renderProductModal(
  title: string,
  product: any,
  setProduct: React.Dispatch<React.SetStateAction<any>>,
  onSubmit: () => void,
  onClose: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              name="name"
              value={product.name}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, name: e.target.value }))}
              placeholder="Product Name"
              className="w-full p-2 border rounded"
            />
            <input
              name="brand"
              value={product.brand}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, brand: e.target.value }))}
              placeholder="Brand"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-3">
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="Price"
              className="w-full p-2 border rounded"
            />
            <input
              name="mrp"
              type="number"
              value={product.mrp}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, mrp: Number(e.target.value) }))}
              placeholder="MRP"
              className="w-full p-2 border rounded"
            />
            <input
              name="quantityPerCase"
              type="number"
              value={product.quantityPerCase}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, quantityPerCase: Number(e.target.value) }))}
              placeholder="Qty/Case"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-3">
            <input
              name="category"
              value={product.category}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, category: e.target.value }))}
              placeholder="Category"
              className="w-full p-2 border rounded"
            />
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, stock: Number(e.target.value) }))}
              placeholder="Stock"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-3">
            <input
              name="color"
              value={product.color}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, color: e.target.value }))}
              placeholder="Color"
              className="w-full p-2 border rounded"
            />
            <input
              name="size"
              value={product.size}
              onChange={(e) => setProduct((prev:any) => ({ ...prev, size: e.target.value }))}
              placeholder="Size"
              className="w-full p-2 border rounded"
            />
          </div>
          <input
            name="image"
            value={product.image}
            onChange={(e) => setProduct((prev:any) => ({ ...prev, image: e.target.value }))}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={(e) => setProduct((prev:any) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => onClose(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {title.includes("Add") ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
