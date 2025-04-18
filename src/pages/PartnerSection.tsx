import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Car, Phone, MapPin, CreditCard, BadgeDollarSign, CheckCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast } from "react-toastify";

const PartnerSection: React.FC = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [carName, setCarName] = useState<string>("");
  const [plaqueNumber, setPlaqueNumber] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false); // 👈 Added

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/partner/create-partner`,
        { carName, plaqueNumber, tel, city },
        { withCredentials: true }
      );

      setCarName("");
      setPlaqueNumber("");
      setTel("");
      setCity("");
      setAccepted(false);
      setOpenForm(false);
      setJustSubmitted(true); // 👈 trigger toast after render
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    }
  };

  // ✅ Trigger success toast after successful form submission
  useEffect(() => {
    if (justSubmitted) {
      toast.success(
        "Félicitations, vous êtes partenaire ! Veuillez procéder au paiement pour que nous puissions valider votre inscription."
      );
      setJustSubmitted(false);
    }
  }, [justSubmitted]);

  return (
    <section className="flex flex-col items-center text-center bg-gray-100 py-12 px-6 rounded-lg shadow-lg">
      <motion.h2
        className="text-3xl font-bold text-blue-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Devenir Partenaire
      </motion.h2>

      <p className="text-gray-700 max-w-2xl">
        Vous êtes propriétaire d’un véhicule ou chauffeur expérimenté ? Rejoignez{" "}
        <span className="font-semibold">EAGLE'S TRANS</span> et maximisez vos revenus !
      </p>

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

      <motion.button
        onClick={handleOpenForm}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Devenir Partenaire
      </motion.button>

      {openForm && (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 space-y-6">
          <h1 className="text-2xl font-bold text-center text-green-700">Remplir ce formulaire</h1>

          <form className="space-y-4" onSubmit={handleCreatePartner}>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Car className="text-gray-500 mr-2" />
              <input
                type="text"
                value={carName}
                className="w-full border-none outline-none"
                placeholder="Le nom du véhicule"
                onChange={(e) => setCarName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <BadgeDollarSign className="text-gray-500 mr-2" />
              <input
                type="text"
                value={plaqueNumber}
                className="w-full border-none outline-none"
                placeholder="Numéro de plaque d'immatriculation"
                onChange={(e) => setPlaqueNumber(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Phone className="text-gray-500 mr-2" />
              <input
                type="tel"
                value={tel}
                className="w-full border-none outline-none"
                placeholder="Votre numéro de téléphone"
                onChange={(e) => setTel(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <MapPin className="text-gray-500 mr-2" />
              <input
                type="text"
                value={city}
                className="w-full border-none outline-none"
                placeholder="Votre ville"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <section className="mt-6 bg-gray-50 p-4 rounded-lg border space-y-3">
              <h2 className="flex items-center font-semibold text-gray-800">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Conditions de partenariat
              </h2>
              <p className="text-sm text-gray-700">
                Pour devenir partenaire, vous devez payer une somme d'argent. Vous ne gagnerez de l'argent que lorsque votre véhicule sera commandé par un(e) client(e).
              </p>

              <div>
                <h3 className="text-md font-semibold text-gray-700 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" /> Paiement
                </h3>
                <input
                  type="number"
                  className="mt-2 w-full border rounded-lg px-3 py-2 bg-gray-100"
                  placeholder="Montant $5000"
                  value={5000}
                  disabled
                />
              </div>

              <label className="flex items-center mt-4 text-sm text-gray-800">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-green-600"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                J'accepte les conditions de partenariat.
              </label>
            </section>

            <motion.button
              type="submit"
              disabled={!accepted}
              className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ${
                accepted
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              whileHover={accepted ? { scale: 1.05 } : {}}
              whileTap={accepted ? { scale: 0.95 } : {}}
            >
              Confirmez
            </motion.button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PartnerSection;
