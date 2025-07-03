import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "@/Components/AdminSidebarLayout";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://smart-backend-3.onrender.com/api/admin/users", {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`https://smart-backend-3.onrender.com/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminSidebarLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📋 All Users</h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.role || "user"}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminSidebarLayout>
  );
};

export default AdminUsersPage;