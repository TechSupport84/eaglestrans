// components/RegisterPage.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tel, setTel] = useState<string>("");
  const [localError, setLocalError] = useState("");


  const phoneRegex = /^(\+?\d{9,15}|\d{9,15})$/;
  const { register, } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!username ||!tel || !password) {
      setLocalError("Tous les champs sont requis");
      return;
    }

     if (!phoneRegex.test(tel)) {
      return setLocalError("Numéro de téléphone invalide. Exemple: +225812345678");
    }

    try {
      await register(username, email,tel, password);
      setUsername("");
      setEmail("");
      setTel("");
      setPassword("");
      toast.success("Inscription réussie ! Veuillez vous connecter.");
      navigate("/login");
    } catch (error) {
      setLocalError("Une erreur est survenue lors de l'inscription.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Créez votre compte
        </h2>
        {localError && <p className="text-red-500 text-sm mb-4">{localError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre e-mail (Optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tel</label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre numéro de téléphone EX: +22574****"
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
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <span className="text-sm">Vous avez déjà un compte ? </span>
          <a href="/login" className="text-sm font-semibold text-blue-600 hover:underline">
            Connectez-vous ici
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
