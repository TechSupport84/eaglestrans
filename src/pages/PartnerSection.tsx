import { motion } from "framer-motion";
import { useState,  FormEvent } from "react";
import {
  Car,
  Phone,
  MapPin,
  CreditCard,
  BadgeDollarSign,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PartnerModalProps {
  onClose: () => void;
  visible: boolean;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ onClose, visible }) => {
  const [accepted, setAccepted] = useState(false);
  const [carName, setCarName] = useState("");
  const [plaqueNumber, setPlaqueNumber] = useState("");
  const [tel, setTel] = useState("");
  const [city, setCity] = useState("");
  const [entrepreneuriatConfirmed, setEntrepreneuriatConfirmed] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreatePartner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(tel)) {
      setError("Le numéro de téléphone doit contenir exactement 10 chiffres.");
      return;
    }

    if (!carName || !plaqueNumber || !tel || !city) {
      setError("Veuillez remplir tous les champs.");
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/partner/create-partner`,
        {
          carName,
          plaqueNumber: String(plaqueNumber),
          tel,
          city,
          amount: 8000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCarName("");
      setPlaqueNumber("");
      setTel("");
      setCity("");
      setAccepted(false);
      setEntrepreneuriatConfirmed(false);
      setError("");
      setLoading(false);

      toast.success("Félicitations ! Contactez notre secrétaire pour effectuer le paiement.");
      navigate("/confirmed");
      onClose();
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto max-h-full p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Devenir Partenaire</h2>

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
              placeholder="Numéro de plaque Ex: D4T4"
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
                <CreditCard className="w-4 h-4 mr-2" /> Paiement
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

          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full text-center text-sm text-blue-500 hover:underline"
          >
            Annuler
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PartnerModal;
