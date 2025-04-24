import { AiOutlineUser } from "react-icons/ai";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaCar,
  FaPhoneAlt,
  FaTrash
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Reservation_Page: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [reservationOrder, setReservation] = useState<Reservation | null>(null);
  const { user, token } = useAuth();





  const handleconfirm = async()=>{
    try {
      const deleted= await axios.delete(`${API_URL}/api/order/delete`,{headers:{
        Authorization:`Bearer ${token}`
      }})
      if(deleted)return toast.success("Order Confirmed")
    } catch (error) {
      toast.error("Error")
    }
  }
  useEffect(() => {
    const getCurrentUserOrder = async () => {
      if (!user?.id || !token) return;

      try {
        const response = await axios.get(`${API_URL}/api/order/user/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched reservation:", response.data);

        // Check if the data is an object (not an array)
        const reservation: Reservation = response.data;
        if (reservation && Object.keys(reservation).length > 0) {
          setReservation(reservation);
        } else {
          setError("Aucune réservation trouvée.");
        }
      } catch (error) {
        setError("Aucune réservation trouvée.")
        }
    };
 
    getCurrentUserOrder();

  }, [user?.id, token, reservationOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const durationNumber = Number(duration);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      toast.error("Durée invalide.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/order/create`,
        {
          pickupLocation,
          dropLocation,
          duration: durationNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPickupLocation("");
      setDropLocation("");
      setDuration("");
      toast.success("Réservation effectuée avec succès !");
   
    } catch (error) {
      toast.error("Erreur lors de la réservation.");
    }
  };


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
    <section className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">Réservation Rapide</h1>
      <p className="text-gray-600 mt-2 text-sm md:text-base">
        Départ, destination et confort en un clic. Votre trajet commence ici !
      </p>
    </section>
  
    {/* Rider Trace Section */}
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaCar className="text-green-500" /> Suivi de Réservation
      </h2>
  
      {reservationOrder === null ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 border border-blue-100 rounded-lg p-4 bg-blue-50"
        >
          <div className="flex items-center space-x-2">
            <motion.span
              className="inline-block w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span className="text-lg font-semibold text-green-700">Trajet en cours...</span>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <p><strong>Départ :</strong> {reservationOrder.pickupLocation}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaRoute className="text-purple-500" />
              <p><strong>Destination :</strong> {reservationOrder.dropLocation}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500" />
              <p><strong>Durée :</strong> {reservationOrder.duration} min</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCar className="text-pink-500" />
              <p><strong>Véhicule :</strong> {reservationOrder.partner.carName} <span className="text-orange-800">IM: <span className="text-green-800">({reservationOrder.partner.plaqueNumber})</span></span></p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              <p><strong>Conducteur Tél:</strong> {reservationOrder.partner.tel}</p>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineUser className="text-indigo-500" />
              <p><strong>Moi :</strong> {reservationOrder.userId.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><strong>Prix :</strong> {reservationOrder.price.toLocaleString()} FCFA</p>
            </div>
            <div className="flex items-center gap-2">
              <p><strong>Date :</strong> {new Date(reservationOrder.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><strong>Status :</strong> <span className="text-green-500">{reservationOrder.status}</span></p>
            </div>
            <div className="text flex gap-4 items-center">
  <button  onClick ={handleconfirm} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    <FaClock className="text-xl" />
    Confirm
  </button>

  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
    <FaTrash className="text-xl" />
    Delete
  </button>
</div>
 
          </div>
        </motion.div>
      )}
    </div>
  
    {/* Booking Form Section */}
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 mt-12 flex flex-col md:flex-row gap-6">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-4">
        {[{
          icon: <FaMapMarkerAlt className="text-blue-500" />,
          value: pickupLocation,
          setValue: setPickupLocation,
          placeholder: "Point de départ"
        }, {
          icon: <FaRoute className="text-purple-500" />,
          value: dropLocation,
          setValue: setDropLocation,
          placeholder: "Destination"
        }, {
          icon: <FaClock className="text-yellow-500" />,
          value: duration,
          setValue: setDuration,
          placeholder: "Durée (en minutes)"
        }].map(({ icon, value, setValue, placeholder }, idx) => (
          <div key={idx} className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            {icon}
            <input
              type="text"
              placeholder={placeholder}
              className="w-full ml-2 focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
        ))}
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <AiOutlineUser size={20} /> Réservez Maintenant
        </button>
      </form>
  
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <img
          src="/hatchback.png"
          alt="Véhicule"
          className="w-full max-w-md rounded-lg shadow-xl"
        />
      </motion.div>
    </div>
  
    <ToastContainer />
  </main>
  
  );
};

export default Reservation_Page;
