import { AiOutlineUser } from "react-icons/ai";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../constants/API_URL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CreatePartnerModal from "./CreatePartnerModal";
import { useNavigate } from 'react-router-dom';



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
  id: string;
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
  status: "pending" | "accepted" | "completed" | string;
  orderDate: string;
  orderHour: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SuggestionItem {
  display_name: string;
}

const BOLT_GREEN = "#00B140";
const BOLT_GREEN_LIGHT = "#e6f4ea";
const BOLT_DARK_GREY = "#333333";

const NAIROBI_COORDINATES: [number, number] = [-1.286389, 36.817223];

const ReservationPage: React.FC = () => {
  const [pickup, setPickup] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);
  const [orderDate, setOrderDate] = useState<string>("");
  const [orderHour, setOrderHour] = useState<string>("");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const { user, token, fetchUser, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const pickupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      (async () => {
        await fetchUser();
      })();
    }
  }, [user?.id, fetchUser]);

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
      const data: SuggestionItem[] = await res.json();
      setter(data.map((item) => item.display_name));
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
    if (!user?.id) return;
    try {
      const { data } = await axios.get<Reservation>(
        `${API_URL}/api/order/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservation(data);
    } catch {
      setReservation(null);
    }
  };

  useEffect(() => {
    loadReservation();
  }, [user, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/order/create`,
        { pickupLocation: pickup, dropLocation: drop, orderDate, orderHour },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Réservation effectuée !");
      setPickup("");
      setDrop("");
      setOrderHour("");
      setOrderDate("");
      loadReservation();
    } catch {
      toast.error("Échec de la réservation.");
    }
    setLoading(false);
  };

  const handleAccept = async () => {
    if (!reservation) return;
    try {
      const { data } = await axios.put(
        `${API_URL}/api/order/${reservation._id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Commande terminée !");
      setReservation(data.order);
    } catch {
      toast.error("Échec de la complétion.");
    }
  };

  return (
    <main className="min-h-screen bg-white p-6 text-gray-900">
      {/* Title */}
      <h1
        className="text-4xl font-extrabold mb-4"
        style={{ color: BOLT_GREEN, textAlign: "center" }}
      >
        Eagles
      </h1>

     <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
  {/* Call Button */}
  <button
    type="button"
    className="min-w-[150px] px-5 py-2 rounded border-2 font-semibold text-center transition-colors duration-200"
    style={{ borderColor: BOLT_GREEN, color: BOLT_GREEN }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = BOLT_GREEN;
      e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = BOLT_GREEN;
    }}
    onClick={() => window.location.href = "tel:+1234567890"}
    aria-label="Appeler"
  >
    Appeler
  </button>

  {/* Become Partner Button */}
  <button
    type="button"
    className="min-w-[150px] px-5 py-2 rounded border-2 font-semibold text-center transition-colors duration-200"
    style={{ borderColor: BOLT_GREEN, color: BOLT_GREEN }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = BOLT_GREEN;
      e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = BOLT_GREEN;
    }}
    onClick={() => setShowModal(true)}
    aria-label="Devenir partenaire"
  >
    Devenir partenaire
  </button>
 {/* Louer  Vehicle */}
   <button
    type="button"
    className="min-w-[150px] px-5 py-2 rounded border-2 font-semibold text-center transition-colors duration-200"
    style={{ borderColor: BOLT_GREEN, color: BOLT_GREEN }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = BOLT_GREEN;
      e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = BOLT_GREEN;
    }}
    onClick={()=>{}}
    aria-label="Logout"
  >
    Louer Vehicule
  </button>
  {/* Admin Only: Dashboard Button */}
  {user?.role === "admin" && (
    <button
      type="button"
      className="min-w-[150px] px-5 py-2 rounded border-2 font-semibold text-center transition-colors duration-200"
      style={{ borderColor: BOLT_GREEN, color: BOLT_GREEN }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = BOLT_GREEN;
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = BOLT_GREEN;
      }}
      onClick={() => navigate('/dashboard')}
      aria-label="Dashboard"
    >
      Dashboard
    </button>
  )}

  {/* Logout Button */}
  <button
    type="button"
    className="min-w-[150px] px-5 py-2 rounded border-2 font-semibold text-center transition-colors duration-200"
    style={{ borderColor: BOLT_GREEN, color: BOLT_GREEN }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = BOLT_GREEN;
      e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = BOLT_GREEN;
    }}
    onClick={logout}
    aria-label="Logout"
  >
    Logout
  </button>
</div>

      {/* Reservation & Form */}
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {/* Reservation Status */}
        {reservation && (
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: BOLT_DARK_GREY }}
              >
                <FaClock /> Statut de la commande
              </h2>
              <span
                className={`px-3 py-1 font-semibold rounded-full text-sm uppercase`}
                style={{
                  backgroundColor:
                    reservation.status === "accepted"
                      ? BOLT_GREEN_LIGHT
                      : reservation.status === "completed"
                      ? "#cce5ff"
                      : "#fff3cd",
                  color:
                    reservation.status === "accepted"
                      ? BOLT_GREEN
                      : reservation.status === "completed"
                      ? "#004085"
                      : "#856404",
                }}
              >
                {reservation.status}
              </span>
            </div>
            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <FaMapMarkerAlt
                  className="inline mr-2"
                  style={{ color: BOLT_GREEN }}
                />{" "}
                Départ : {reservation.pickupLocation}
              </p>
              <p>
                <FaRoute
                  className="inline mr-2"
                  style={{ color: BOLT_GREEN }}
                />{" "}
                Destination : {reservation.dropLocation}
              </p>
              <p>
                Heure :{" "}
                <span style={{ color: BOLT_GREEN }}>{reservation.orderHour}</span>
              </p>
              <p>
                Date :{" "}
                <span style={{ color: BOLT_GREEN }}>
                  {new Date(reservation.orderDate).toDateString()}
                </span>
              </p>
              <p>Durée : {reservation.duration} min</p>
              <p>Prix : {reservation.price.toLocaleString()} FCFA</p>
            </div>
            <div className="mt-4 text-sm border-t pt-2 border-gray-200">
              <h3 className="font-semibold" style={{ color: BOLT_DARK_GREY }}>
                Détails du partenaire
              </h3>
              <p>Véhicule : {reservation.partner.carName}</p>
              <p>Immatriculation : {reservation.partner.plaqueNumber}</p>
              <p>Téléphone : {reservation.partner.tel}</p>
              <p>Ville : {reservation.partner.city}</p>
            </div>
            <div className="mt-4 flex gap-3">
              {reservation.status === "pending" && (
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 rounded flex items-center gap-2 font-semibold transition"
                  style={{
                    backgroundColor: BOLT_GREEN,
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#009933";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      BOLT_GREEN;
                  }}
                >
                  <FaCheckCircle /> Accepter
                </button>
              )}
              {reservation.status === "accepted" && (
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 rounded flex items-center gap-2 font-semibold transition"
                  style={{
                    backgroundColor: "#444",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#222";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#444";
                  }}
                >
                  <FaTimesCircle /> Terminer
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Booking Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 max-h-[520px] overflow-y-auto">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: BOLT_DARK_GREY }}
          >
            Nouvelle Réservation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: BOLT_DARK_GREY }}
              >
                Point de départ
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Entrez votre point de départ"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  borderColor: "#ccc",
                  boxShadow: `0 0 0 3px transparent`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 3px ${BOLT_GREEN}66`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                required
              />
              {pickupSuggestions.length > 0 && (
                <ul
                  className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded-lg max-h-40 overflow-y-auto"
                  style={{ borderColor: "#ccc" }}
                >
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
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: BOLT_DARK_GREY }}
              >
                Destination
              </label>
              <input
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Entrez votre destination"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  borderColor: "#ccc",
                  boxShadow: `0 0 0 3px transparent`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 3px ${BOLT_GREEN}66`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                required
              />
              {dropSuggestions.length > 0 && (
                <ul
                  className="absolute z-20 bg-white border border-gray-200 w-full mt-1 rounded-lg max-h-40 overflow-y-auto"
                  style={{ borderColor: "#ccc" }}
                >
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
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: BOLT_DARK_GREY }}
              >
                Heure
              </label>
              <input
                type="time"
                value={orderHour}
                onChange={(e) => setOrderHour(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  borderColor: "#ccc",
                  boxShadow: `0 0 0 3px transparent`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 3px ${BOLT_GREEN}66`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: BOLT_DARK_GREY }}
              >
                Date
              </label>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  borderColor: "#ccc",
                  boxShadow: `0 0 0 3px transparent`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 3px ${BOLT_GREEN}66`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              style={{
                backgroundColor: BOLT_GREEN,
                color: "white",
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#009933";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  BOLT_GREEN;
              }}
            >
              <AiOutlineUser size={20} />{" "}
              {loading ? "Commande en cours..." : "Réserver maintenant"}
            </button>
          </form>
        </div>

        {/* Map below form */}
        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md border border-gray-200 mt-6">
          <MapContainer
            center={NAIROBI_COORDINATES}
            zoom={13}
            className="h-full w-full"
          >
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  />

            <Marker position={NAIROBI_COORDINATES}>
              <Popup>Votre position actuelle</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <CreatePartnerModal visible={showModal} onClose={() => setShowModal(false)} />
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export default ReservationPage;
