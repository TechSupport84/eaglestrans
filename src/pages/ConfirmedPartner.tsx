import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';

const ConfirmedPartner: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">Félicitations !</h2>

      <p className="text-xl text-red-700 font-semibold text-center mb-2">Lisez Attentivement</p>

      <p className="text-gray-700 mb-4 text-justify">
        Veuillez effectuer un paiement de <strong className="text-green-600">8 000 FCFA</strong> dans notre bureau pour finaliser votre enregistrement dans le système. 
        <br />
        <strong className="text-red-600">Ce paiement devra être effectué à la fin de chaque mois.</strong> En cas de non-paiement, votre <strong>statut</strong> sera désactivé.
      </p>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
        <h3 className="text-lg font-semibold text-yellow-700 mb-2 flex items-center gap-2">
          <FaMoneyBillWave className="text-yellow-700" />
          Payez maintenant !!
        </h3>
        <div className="space-y-1 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            Lieu : <span className="font-medium">Yamoussoukro</span>
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            Tel : <span className="font-medium">+225 75 64 75 648</span>
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            Email : <span className="font-medium">eaglesvisionms@gmail.com</span>
          </p>
          <p className="text-red-600 mt-2">
            NB : Le paiement s’effectue <strong>en espèces</strong> et un reçu vous sera remis.
          </p>
        </div>
      </div>

      <p className="text-lg text-gray-800 mb-4">
        Votre inscription en tant que partenaire a été <strong>confirmée avec succès</strong>.
      </p>

      <p className="text-gray-700 mb-6">
        Vous êtes maintenant prêt à rejoindre <span className="font-semibold text-green-700">EAGLE'S TRANS</span> et maximiser vos revenus en tant que propriétaire de véhicule ou chauffeur.
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <FaCheckCircle className="text-green-600 mt-1" />
          <p className="text-gray-700">Un accompagnement personnalisé et professionnel vous attend.</p>
        </div>
        <div className="flex items-start gap-3">
          <FaCheckCircle className="text-green-600 mt-1" />
          <p className="text-gray-700">Des paiements rapides et transparents pour chaque trajet effectué.</p>
        </div>
        <div className="flex items-start gap-3">
          <FaCheckCircle className="text-green-600 mt-1" />
          <p className="text-gray-700">Votre véhicule sera intégré au système pour des opportunités de trajets réguliers.</p>
        </div>
      </div>

      <div className="text-sm text-center text-gray-600">
        Pour toute question ou assistance, veuillez contacter notre équipe. Nous sommes là pour vous accompagner.
      </div>
    </div>
  );
};

export default ConfirmedPartner;
