import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";

// -------------------- Types --------------------
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
  login: (tel: string, password: string) => Promise<string | undefined>;
  register: (
    username: string,
    email: string,
    tel: string,
    password: string
  ) => Promise<string | undefined>;
  logout: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<string | undefined>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<string | undefined>;
  fetchUser: (token?: string) => Promise<void>;  // Allow optional token parameter
}

// -------------------- Context --------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -------------------- Hook --------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// -------------------- Provider --------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Set Axios to use credentials (cookies)
  axios.defaults.withCredentials = true;

  // Load token from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken); // Pass the token explicitly
    }
  }, []);

  // Persist token to localStorage when updated
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // -------------------- Actions --------------------

  const login = async (tel: string, password: string): Promise<string | undefined> => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { tel, password });
      const { token, user, message } = res.data;
      setToken(token);
      setUser(user);
      return message;
    } catch (err) {
      console.error("Login error:", err);
      return "Échec de la connexion. Vérifiez vos identifiants.";
    }
  };

 const register = async (
  username: string,
  email: string,
  tel: string,
  password: string
): Promise<string | undefined> => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      email,
      tel,
      password,
    });

    // Assuming the server response contains token, user, and a message
    const { token, user, message } = res.data;
    
    // Set the token and user data in the state if the registration is successful
    setToken(token);
    setUser(user);
    
    // Return the message from the server
    return message;
  } catch (err) {
    console.error("Registration error:", err);
    
    if (axios.isAxiosError(err) && err.response) {
      // Extract server error message (e.g., "Email already exists")
      const errorMessage = err.response.data?.message || "Échec de l'inscription.";
      return errorMessage;
    }

    // Default error message if the server doesn't provide one
    return "Échec de l'inscription. Veuillez réessayer.";
  }
};

  const logout = async (): Promise<void> => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const updateProfile = async (formData: FormData): Promise<string | undefined> => {
    try {
      const res = await axios.put(`${API_URL}/api/auth/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      return res.data.message;
    } catch (err) {
      console.error("Update profile error:", err);
      return "Échec de la mise à jour du profil.";
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<string | undefined> => {
    try {
      await axios.put(`${API_URL}/api/auth/update-password`, {
        currentPassword,
        newPassword,
      });
      return "Mot de passe mis à jour avec succès.";
    } catch (err) {
      console.error("Update password error:", err);
      return "Échec de la mise à jour du mot de passe.";
    }
  };

  // Fetch user based on token
  const fetchUser = async (token?: string): Promise<void> => {
    try {
      // Only fetch if token is available
      if (!token) return;
      
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        console.warn("No user returned from /me");
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user error:", err);

      // If unauthorized, clear the user and token
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  };

  // -------------------- Render --------------------
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
        fetchUser, // Ensure this has the correct type
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
