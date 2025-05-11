import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Phone number regex: accepts +243123456789 or 0812345678 format
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
      setLoading(false);
      setTel("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError && error.response) {
        const errMessage = error.response.data?.message || "Une erreur inattendue s'est produite.";
        setLocalError(errMessage);
      } else {
        setLocalError("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Connexion
        </h2>
        {localError && (
          <p className="text-red-500 text-sm mb-4">{localError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: +225812345678 ou 07***"
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
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
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
