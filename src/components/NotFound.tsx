

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-md rounded-xl p-10 max-w-lg w-full text-center border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
          Identifiants incorrects
        </h1>
        <p className="text-gray-700 text-sm md:text-base mb-6">
          Votre adresse e-mail ou votre mot de passe est incorrect. Veuillez vérifier vos informations et réessayer.
        </p>
        <a
          href="/login"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          Retour à la page de connexion
        </a>
      </div>
    </div>
  );
}

export default NotFound;
