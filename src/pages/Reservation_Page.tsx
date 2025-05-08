import { AiOutlineUser } from "react-icons/ai";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../constants/API_URL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Partner {
  _id: string;
  partnerID: string;
  carName: string;
  plaqueNumber: number;
  tel: string;
  city: string;
  amount: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Reservation {
  _id: string;
  partner: Partner;
  userId: User;
  pickupLocation: string;
  dropLocation: string;
  duration: number;
  price: number;
  status: string;
  orderDate:string,
  orderHour:string,
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ReservationPage: React.FC = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);
  const [orderDate, setOrderDate] = useState<string |number>("")
  const [orderHour, setOrderHour] = useState<string>("")
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const { user} = useAuth();
  const [loading, setLoading] = useState<boolean>(false)
  const pickupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (
    query: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setter(data.map((item: any) => item.display_name));
    } catch {
      setter([]);
    }
  };

  useEffect(() => {
    if (pickup.length < 3) {
      setPickupSuggestions([]);
      return;
    }
    if (pickupTimer.current) clearTimeout(pickupTimer.current);
    pickupTimer.current = setTimeout(() => {
      fetchSuggestions(pickup, setPickupSuggestions);
    }, 300);
  }, [pickup]);

  useEffect(() => {
    if (drop.length < 3) {
      setDropSuggestions([]);
      return;
    }
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = setTimeout(() => {
      fetchSuggestions(drop, setDropSuggestions);
    }, 300);
  }, [drop]);

  const selectPickup = (place: string) => {
    setPickup(place);
    setPickupSuggestions([]);
  };

  const selectDrop = (place: string) => {
    setDrop(place);
    setDropSuggestions([]);
  };

  const loadReservation = async () => {
    if (!user?.id ) return;
    try {
      const { data } = await axios.get<Reservation>(
        `${API_URL}/api/order/user/${user.id}`,
        { headers: { Authorization: `Bearer ${user}` } }
      );
      setReservation(data);
    } catch {
      setReservation(null);
    }
  };

  useEffect(() => {
    loadReservation();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.post(
        `${API_URL}/api/order/create`,
        { pickupLocation: pickup, dropLocation: drop ,orderDate, orderHour},
        { headers: { Authorization: `Bearer ${user}` } }
      );
      toast.success("Réservation effectuée !");
      setPickup("");
      setDrop("");
      setOrderHour(" ")
      setOrderDate(" ")
      
      loadReservation();
      setLoading(false)
    } catch {
      toast.error("Échec de la réservation.");
      setLoading(false)
    }
  };

  const handleAccept = async () => {
    if (!reservation) return;
    try {
      const { data } = await axios.put(
        `${API_URL}/api/order/${reservation._id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${user}` } }
      );
      toast.success("Commande acceptée !");
      setReservation(data.order);
    } catch {
      toast.error("Échec de l'acceptation.");
    }
  };

  const handleComplete = async () => {
    if (!reservation) return;
    try {
      const { data } = await axios.put(
        `${API_URL}/api/order/${reservation._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${user}` } }
      );
      toast.success("Commande terminée !");
      setReservation(data.order);
    } catch {
      toast.error("Échec de la complétion.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {reservation && (
        <motion.div
          className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaClock /> Statut de la commande
            </h2>
            <span
              className={`px-3 py-1 font-semibold rounded-full text-sm uppercase ${
                reservation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}
            >
              {reservation.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <strong>Départ :</strong> {reservation.pickupLocation}
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaRoute className="text-purple-500" />
                <strong>Destination :</strong> {reservation.dropLocation}
              </p>
              <p>
                <span>Heure : <span className="text-blue-600">{reservation.orderHour} Heure/Min </span></span>
              </p>
              <p>
                <span>Date du  depart: <span className="text-blue-600">{new Date(reservation.orderDate).toDateString()}</span> </span>
              </p>
            </div>
            <div>
              <p><strong>Durée :</strong> {reservation.duration} min</p>
              <p className="mt-2"><strong>Prix :</strong> {reservation.price.toLocaleString()} FCFA</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-gray-700">
            <h3 className="text-lg font-semibold mb-2">Détails du partenaire</h3>
            <p><strong>Véhicule :</strong> {reservation.partner.carName}</p>
            <p><strong>Immatriculation :</strong> {reservation.partner.plaqueNumber}</p>
            <p><strong>Téléphone :</strong> {reservation.partner.tel}</p>
            <p><strong>Ville :</strong> {reservation.partner.city}</p>
          </div>
          <div className="mt-6 text-center flex justify-center gap-4">
            {reservation.status === 'pending' && (
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <FaCheckCircle /> Accepter
              </button>
            )}
            {reservation.status === 'accepted' && (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaTimesCircle /> Terminer
              </button>
            )}
          </div>
        </motion.div>
      )}
      {/* Booking Form */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Nouvelle Réservation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Point de départ</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Entrez votre point de départ"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            {pickupSuggestions.length > 0 && (
              <ul className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded-lg max-h-40 overflow-y-auto">
                {pickupSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    onClick={() => selectPickup(place)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Entrez votre destination"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            {dropSuggestions.length > 0 && (
              <ul className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded-lg max-h-40 overflow-y-auto">
                {dropSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    onClick={() => selectDrop(place)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}

           <label className="block text-sm font-medium text-gray-700 mb-1">Heure: </label>
            <input
              type="time"
              value={orderHour}
              onChange={(e) => setOrderHour(e.target.value)}
              placeholder="Entrez votre destination"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">La Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              placeholder="Entrez votre destination"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <AiOutlineUser size={20} /> {loading?"Commande en cours..." :"Réserver maintenant"}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export default ReservationPage;
