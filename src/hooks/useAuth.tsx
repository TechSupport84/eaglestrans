import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";

interface User {
  id: string;
  username: string;
  email: string;
  picture: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<{ user: User }>(`${API_URL}/auth/me`, {
          withCredentials: true, // Send cookies along with the request
        });

        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth Error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
