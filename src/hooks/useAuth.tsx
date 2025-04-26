import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/API_URL';

interface User {
  id: string;
  username: string;
  email: string;
  city: string;
  country: string;
  role:string,
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error:string,
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, city: string, country: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error('Error fetching current user:', error);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
  
      const userResponse = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userData = userResponse.data.user;
      if (userData?.role) {
        setUser(userData);
      } else {
        console.warn("User role not received!");
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const register = async (username: string, email: string, city: string, country: string, password: string) => {
    try {
     await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        city,
        country,
        password,
      
      });

    } catch (error:any) {
      console.error('Registration error:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during registration.');
       
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
