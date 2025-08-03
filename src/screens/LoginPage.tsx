import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

 // Adjust this to match your branding if needed

const LoginPage: React.FC = () => {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const phoneRegex = /^(\+?\d{9,15}|\d{9,15})$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(undefined);

    if (!tel || !password) {
      return setLocalError("Tous les champs sont requis.");
    }

    if (!phoneRegex.test(tel)) {
      return setLocalError("Numéro de téléphone invalide. Exemple: +243812345678");
    }

    try {
      setLoading(true);
      await login(tel, password);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errMessage = error.response.data?.message || "Une erreur inattendue s'est produite.";
        setLocalError(errMessage);
      } else {
        setLocalError("Une erreur inattendue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Se connecter</h2>

        {localError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="+225812345678 ou 07***"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-500 hover:text-green-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-medium rounded-lg transition duration-300 ${
              loading
                ? "bg-green-300 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Pas de compte ?{" "}
          <a
            href="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Créez-en un ici
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
