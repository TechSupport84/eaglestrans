import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";

interface User {
  id: string;
  username: string;
  email: string;
  profileUrl?: string;
  address?: string;
  tel?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  register: (username: string, email: string,tel:string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<string | undefined>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  axios.defaults.withCredentials = true;

  // Automatically attach token to all requests if present
  useEffect(() => {
    // Load token from localStorage if available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token); // Persist token to localStorage
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token"); // Remove token from localStorage if not set
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setToken(res.data.token); // Set the token state
      setUser(res.data.user); // Set the user state
      return res.data.message;
    } catch (err) {
      console.error("Login error:", err);
      return "Login failed. Please check your credentials.";
    }
  };

  const register = async (username: string, email: string, tel:string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { username, email,tel, password });
      setToken(res.data.token); // Set the token state
      setUser(res.data.user); // Set the user state
      return res.data.message;
    } catch (err) {
      console.error("Registration error:", err);
      return "Registration failed. Please try again.";
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      const res = await axios.put(`${API_URL}/api/auth/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      return res.data.message;
    } catch (err) {
      console.error("Update Profile error:", err);
      return "Failed to update profile. Please try again.";
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await axios.put(`${API_URL}/api/auth/update-password`, { currentPassword, newPassword });
    } catch (err) {
      console.error("Update Password error:", err);
    }
  };

  const fetchUser = async () => {
    try {
      if (!token) return; // Skip if no token exists
      const res = await axios.get(`${API_URL}/api/auth/me`);
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUser(null); // Optionally log out the user if fetching user fails
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]); // Fetch user whenever token changes

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};