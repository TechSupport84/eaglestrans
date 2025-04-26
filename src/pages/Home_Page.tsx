import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface User {
  username: string;
  email: string;
  picture?: string;
}

export default function Home_Page() {
  const { user, loading, logout } = useAuth() as { user: User | null; loading: boolean; logout: () => void };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const handleNavigation = () => {
    navigate("/reservation");
  };

  const handlePartnerNavigation = () => {
    navigate("/partner");
  };

  const handleCall = () => {
    window.location.href = "tel:+225719398164";
  };

  const handleEmail = () => {
    window.location.href = "mailto:eaglesvisionms@gmail.com";
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold animate-pulse">
        Chargement en cours...
      </p>
    );
  }

  return user ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      {/* Hero Section */}
      <div className="w-full max-w-3xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-8 px-6 rounded-xl shadow-lg mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold animate-bounce">Votre trajet, notre engagement !</h1>
        <p className="mt-3 text-lg">
          Voyagez en toute sécurité et confort avec nos services de VTC à Yamoussoukro et au-delà.
        </p>
      </div>

      {/* Profile Section */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenue, {user.username}</h2>
          <p className="text-gray-500 mt-2 text-sm">Merci de votre confiance!</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.picture ? user.picture : "./user.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-sm"
          />
            <p className="text-gray-600"> {user.email}</p>
          <button
            onClick={logout}
            className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 w-full max-w-4xl flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={handleNavigation}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full md:w-auto"
        >
          Réserver un Trajet
        </button>
        <button
          onClick={handlePartnerNavigation}
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300 w-full md:w-auto"
        >
          Devenir Partenaire
        </button>
        <button
          onClick={handleCall}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 w-full md:w-auto"
        >
          Appeler Maintenant
        </button>
        <button
          onClick={handleEmail}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 w-full md:w-auto"
        >
          Contact Email
        </button>
      </div>

      {/* Support Info */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        <p>
          Support Technique:{" "}
          <a
            href="https://jeancyportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Jeancy Mpoyi
          </a>
        </p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Eagle's Trans. Tous droits réservés.</p>
      </div>
    </div>
  ) : null;
}
