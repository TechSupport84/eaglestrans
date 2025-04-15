import { API_URL } from "../constants/API_URL";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


interface User {
  username: string;
  email: string;
  picture?: string;
}

export default function Home_Page() {
  const { user, loading, } = useAuth() as { user: User | null; loading: boolean };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  if (loading) return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
const handledNavigation =()=>{
  navigate("/reservation")
}
const handledPartner =()=>{
  navigate("/partner")
}

const handleCall = () => {
  window.location.href = 'tel:+225123456789'; // replace with your number
};
  return user ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
      {/* Promotional Section */}
      <div className="w-full max-w-3xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-6 px-4 rounded-lg shadow-md mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold animate-bounce">Votre trajet, notre engagement !</h1>
        <p className="mt-2 text-lg">Voyagez en toute sécurité et confort avec nos services de VTC à Yamoussoukro et au-delà.</p>
      </div>

      {/* User Profile Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenue, {user.username}</h1>
          <p className="text-gray-600">Explorez nos services et offres.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img
            src={user.picture ? user.picture : "./user.png"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-gray-300"
          />
          <button
            onClick={() => {
              document.cookie = "token=; Max-Age=0";
              window.location.href = `${API_URL}/auth/logout`;
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="mt-6 w-full max-w-4xl flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
        <button onClick={handledNavigation } className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full md:w-auto">
          Réserver un Trajet
        </button>
        <button  onClick ={ handledPartner }className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300 w-full md:w-auto">
          Devenir Partenaire
        </button>
        <button onClick={handleCall} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 w-full md:w-auto">
          Appel (+225*******)
        </button>
      </div>
    </div>
  ) : null;
}