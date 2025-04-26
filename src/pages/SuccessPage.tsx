
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Message Envoyé !</h1>
        <p className="text-gray-600 text-center mb-6">
          Merci de nous avoir contactés. Nous reviendrons vers vous très bientôt.
        </p>
        <Link
          to="/"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
