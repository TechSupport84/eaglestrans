// components/LoginPage.tsx
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>("");
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(""); // Clear previous error messages

    // Validation before login attempt
    if (!email || !password) {
      setLocalError("L'email et le mot de passe sont requis");
      return;
    }

    // Optional: You can add specific email format validation if needed, e.g., regex

    try {
      // Attempt to login
      await login(email, password); // Ensure to await the login call

      // Reset inputs
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input

      // Optionally, store token in localStorage and set header for future requests
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // Redirect on successful login
      navigate("/"); // Redirect to homepage or dashboard
      console.log("Connexion réussie !");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message;

      // Check for specific error message for incorrect password
      if (message?.includes("incorrect password")) {
        setLocalError("Le mot de passe est incorrect");
      } else if (message?.includes("incorrect email")) {
        setLocalError("L'email est incorrect");
      } else {
        setLocalError(message || "Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Connexion
        </h2>
        {(error || localError) && (
          <p className="text-red-500 text-sm mb-4">{error || localError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Entrez votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-sm text-gray-600"
              >
                {showPassword ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Se connecter
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <span className="text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              S'inscrire ici
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
