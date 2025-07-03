export const API_BASE_URL = "https://smart-backend-3.onrender.com/api"; // Update with your backend URL

export const getUserProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

export const getUserOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};

export const getWishlist = async () => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};
