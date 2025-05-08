import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { API_URL } from '../constants/API_URL';

interface User {
  id: string;
  username: string;
  email: string;
  city: string;
  country: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    city: string,
    country: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Set Axios to send cookies with requests
  axios.defaults.withCredentials = true;

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Add token to Authorization header if it exists
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const response = await axios.get(`${API_URL}/api/auth/me`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setUser(null);
        localStorage.removeItem('token'); // Clear token if user fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Run the fetchUser function
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Assuming the API returns a token upon login
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token to localStorage

      // Add token to Axios header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userResponse = await axios.get(`${API_URL}/api/auth/me`);
      setUser(userResponse.data.user);
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle specific error response
      if (error.response && error.response.status === 401) {
        // This status might indicate incorrect credentials
        setError("Invalid email or password. Please try again.");
      } else if (error.response?.data?.message) {
        // If there's a specific error message from the backend
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        // Default error message for network issues or other errors
        setError('Login failed. Please check your network connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (
    username: string,
    email: string,
    city: string,
    country: string,
    password: string
  ) => {
    setError("");
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        city,
        country,
        password,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during registration.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      localStorage.removeItem('token'); 
      delete axios.defaults.headers.common['Authorization']; // Remove token from headers
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
