import React, { useState, FormEvent } from "react";
import { API_URL } from "../constants/API_URL";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FaCar, FaPhoneAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

interface CreatePartnerModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreatePartnerModal: React.FC<CreatePartnerModalProps> = ({ visible, onClose }) => {
  const [carName, setCarName] = useState("");
  const [plaqueNumber, setPlaqueNumber] = useState("");
  const [tel, setTel] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  if (!visible) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!carName || !plaqueNumber || !tel || !city) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!/^[0-9]{10}$/.test(tel)) {
      toast.error("Le numéro de téléphone doit contenir exactement 10 chiffres.");
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Partenaire enregistré avec succès !");
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la création du partenaire.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-lg"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Devenir Partenaire
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border px-4 py-3 rounded-lg shadow-sm">
            <FaCar className="text-gray-500 mr-3" />
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Nom du véhicule"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center border px-4 py-3 rounded-lg shadow-sm">
            <FaCar className="text-gray-500 mr-3" />
            <input
              type="text"
              value={plaqueNumber}
              onChange={(e) => setPlaqueNumber(e.target.value)}
              placeholder="Numéro de plaque"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center border px-4 py-3 rounded-lg shadow-sm">
            <FaPhoneAlt className="text-gray-500 mr-3" />
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="Téléphone"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center border px-4 py-3 rounded-lg shadow-sm">
            <FaMapMarkerAlt className="text-gray-500 mr-3" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-xl font-semibold transition-all ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? "Enregistrement..." : "Confirmer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerModal;
