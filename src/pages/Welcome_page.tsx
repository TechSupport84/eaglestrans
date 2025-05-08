// pages/WelcomePage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("fr-FR"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white">
      <div className="w-full max-w-2xl mx-auto p-6">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Eagle's Trans</h1>
          <span className="text-lg text-gray-300">{time}</span>
        </header>

        <section className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Services de Transport Privé Professionnel
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Votre partenaire de confiance pour les déplacements professionnels et personnels à Yamoussoukro.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition duration-300"
            >
              Se connecter
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-300"
            >
              S'inscrire
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default WelcomePage;
