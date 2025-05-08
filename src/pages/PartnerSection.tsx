import { motion } from "framer-motion";
import { useState, useEffect, FormEvent} from "react";
import { Car, Phone, MapPin, CreditCard, BadgeDollarSign, CheckCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PartnerSection: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [carName, setCarName] = useState("");
  const [plaqueNumber, setPlaqueNumber] = useState("");
  const [tel, setTel] = useState("");
  const [city, setCity] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [entrepreneuriatConfirmed, setEntrepreneuriatConfirmed] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate();
  const {  user} = useAuth();
  

  const handleCreatePartner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(tel)) {
    setError("Le numéro de téléphone doit contenir exactement 10 chiffres.");
    return 
    }

    if (!carName || !plaqueNumber || !tel || !city) {
      setError("Veuillez remplir tous les champs.");
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
  
    setLoading(true)
    try {
      await axios.post(
        `${API_URL}/api/partner/create-partner`,
        {
          carName,
          plaqueNumber:String(plaqueNumber),
          tel,
          city,
          amount: 8000,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
     
      setCarName("");
      setPlaqueNumber("");
      setTel("");
      setCity("");
      setAccepted(false);
      setJustSubmitted(true);
      setError("");
      setLoading(false)
    
      toast.success("Félicitations ! Contactez notre secrétaire pour effectuer le paiement.");
      navigate("/confirmed");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false)
      console.error(err);
    }
  };

  useEffect(() => {
    if (justSubmitted) {
      toast.success("Contactez notre secrétaire pour enregistrer votre véhicule.");
      setJustSubmitted(false);
    }
  }, [justSubmitted]);

  return (
    <section className="flex flex-col md:flex-row items-start justify-center gap-10 bg-gray-100 p-8 md:p-16 rounded-lg shadow-xl">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-6">
        <motion.h2
          className="text-4xl font-bold text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Devenir Partenaire
        </motion.h2>
        <p className="text-gray-700 text-lg">
          Vous êtes propriétaire d’un véhicule ou chauffeur expérimenté ? Rejoignez <span className="font-semibold">EAGLE'S TRANS</span> et maximisez vos revenus !
        </p>
        <ul className="text-gray-600 space-y-2">
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
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center text-green-700 mb-6">Formulaire d'inscription</h3>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleCreatePartner} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Car className="text-gray-500 mr-2" />
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Le nom du véhicule"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <BadgeDollarSign className="text-gray-500 mr-2" />
            <input
              type="text"
              value={plaqueNumber}
              onChange={(e) => setPlaqueNumber(e.target.value)}
              placeholder="Numéro de plaque Ex: D4T4 (4 digits)"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <Phone className="text-gray-500 mr-2" />
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="Téléphone"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <MapPin className="text-gray-500 mr-2" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville"
              className="w-full outline-none"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="flex items-center font-semibold text-gray-800 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Conditions de partenariat
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Pour devenir partenaire, vous devez payer une somme d'argent. Vous ne gagnerez de l'argent que lorsque votre véhicule sera commandé.
            </p>

            <div className="mb-3">
              <label className="flex items-center font-medium text-gray-700 mb-1">
                <CreditCard className="w-4 h-4 mr-2" />
                Paiement
              </label>
              <input
                type="number"
                value={8000}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border rounded-lg"
              />
            </div>

            <label className="flex items-center text-sm text-gray-800">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-green-600"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />
              J'accepte les conditions de partenariat.
            </label>

            <label className="flex items-center text-sm text-gray-800 mt-2">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-green-600"
                checked={entrepreneuriatConfirmed}
                onChange={() => setEntrepreneuriatConfirmed(!entrepreneuriatConfirmed)}
              />
              Je confirme mon entrepreneuriat.
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={loading || !accepted || !entrepreneuriatConfirmed}
            className={`w-full mt-4 px-6 py-3 font-semibold rounded-lg shadow-md transition ${
              accepted && entrepreneuriatConfirmed
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            whileHover={accepted && entrepreneuriatConfirmed ? { scale: 1.05 } : {}}
            whileTap={accepted && entrepreneuriatConfirmed ? { scale: 0.95 } : {}}
          >
          {loading ? "Chargement..." : "Confirmez"}
          </motion.button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default PartnerSection;
