import React, { createContext, useState, useEffect, useContext } from 'react';

// Define types for our context
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  isAuthenticated: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Auth check - Token exists:', !!token);
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await fetch('https://smart-backend-3.onrender.com/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        const data = await response.json();
        console.log('Auth check response:', response.status, data);
        
        if (response.ok) {
          setUser(data.user);
        } else {
          console.log('Auth check failed, removing token');
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('Login attempt for:', email);
      
      const response = await fetch('https://smart-backend-3.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log('Login response:', response.status, data);
      
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        console.log('Login successful, token saved');
        return { success: true };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Login error:', err);
      const message = 'An error occurred during login';
      setError(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch('https://smart-backend-3.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, message: data.message };
      }
    } catch (err) {
      const message = 'An error occurred during registration';
      setError(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch('https://smart-backend-3.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);