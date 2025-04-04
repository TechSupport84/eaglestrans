import { motion } from "framer-motion";

const PartnerSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center bg-gray-100 py-12 px-6 rounded-lg shadow-lg">
      {/* Animated Header */}
      <motion.h2
        className="text-3xl font-bold text-blue-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Devenir Partenaire
      </motion.h2>

      {/* Description */}
      <p className="text-gray-700 max-w-2xl">
        Vous êtes propriétaire d’un véhicule ou chauffeur expérimenté ? Rejoignez <span className="font-semibold">EAGLE'S TRANS</span> et maximisez vos revenus !
      </p>

      {/* Benefits List */}
      <ul className="text-gray-600 mt-4 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-green-600 text-lg">✔</span> Des trajets réguliers
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-600 text-lg">✔</span> Un accompagnement professionnel
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-600 text-lg">✔</span> Des paiements transparents et rapides
        </li>
      </ul>

      {/* Call-to-Action Button */}
      <motion.button
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Devenir Partenaire
      </motion.button>
    </section>
  );
};

export default PartnerSection;
