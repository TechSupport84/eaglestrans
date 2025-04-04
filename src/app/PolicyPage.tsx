import React from "react";
import { FaShieldAlt, FaUserLock, FaHandshake, FaGavel, FaUsers } from "react-icons/fa";

const PolicyPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Politique et Conditions d'Utilisation</h1>
        
        {/* Privacy Policy */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaShieldAlt className="text-blue-600" /> Politique de Confidentialité
          </h2>
          <p className="text-gray-600 mt-2">
            Nous nous engageons à protéger vos informations personnelles et votre vie privée.
            Vos données ne seront jamais partagées avec des tiers sans votre consentement.
          </p>
        </section>

        {/* Terms of Service */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaGavel className="text-blue-600" /> Conditions Générales d’Utilisation
          </h2>
          <p className="text-gray-600 mt-2">
            En utilisant notre plateforme, vous acceptez de respecter toutes les règles et réglementations en vigueur.
            Tout abus entraînera la suspension ou la suppression de votre compte.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaUsers className="text-blue-600" /> Responsabilités de l’Utilisateur
          </h2>
          <p className="text-gray-600 mt-2">
            Vous êtes responsable des informations que vous partagez et de votre comportement sur la plateforme.
            Veuillez respecter les autres utilisateurs et suivre nos politiques de sécurité.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaUserLock className="text-blue-600" /> Sécurité des Données
          </h2>
          <p className="text-gray-600 mt-2">
            Toutes vos transactions et données sont protégées par des protocoles de sécurité avancés.
            Nous mettons régulièrement à jour nos mesures de sécurité pour assurer la protection de vos informations.
          </p>
        </section>

        {/* Agreement */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaHandshake className="text-blue-600" /> Accord et Acceptation
          </h2>
          <p className="text-gray-600 mt-2">
            En accédant à notre service, vous reconnaissez avoir lu et accepté ces politiques.
            Si vous avez des questions, n’hésitez pas à nous contacter.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PolicyPage;