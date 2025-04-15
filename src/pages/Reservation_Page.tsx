import { AiOutlineUser, AiOutlineCar, AiOutlinePhone } from "react-icons/ai";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRoute } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { API_URL } from "../constants/API_URL";
import { ToastContainer, toast } from 'react-toastify';

const Reservation_Page: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");  // Price can be a number or string to handle empty input
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [vehicleMark, setVehicleMark] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { user } = useAuth();

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get the address from latitude/longitude
          try {
            const response = await axios.get(`${API_URL}/api/reverse-geocode`, {
              params: {
                latitude,
                longitude,
              },
            });
            const location = response.data.address; // assuming the response contains the address
            setPickupLocation(location); // Set pickup location to the address
            calculatePrice(location, destination); // Recalculate price with the new pickup location
          } catch (error) {
            toast.error("Error getting location data.");
          }
        },
        (error) => {
          console.log(error)
          toast.error("Unable to retrieve location.");

        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to calculate the price based on pickup and destination
  const calculatePrice = async (pickupLocation: string, destination: string) => {
    if (pickupLocation && destination) {
      try {
        const response = await axios.get(`${API_URL}/api/calculate-distance`, {
          params: {
            pickup: pickupLocation,
            destination,
          },
        });
        const { distance } = response.data; // Assume response includes a distance in km
        const calculatedPrice = distance * 10; // Example price calculation (10 per km)
        setPrice(calculatedPrice); // Update the price state
      } catch (error) {
        toast.error("Error calculating price.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !destination || !price || !date || !time || !vehicleMark || !phone) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!user) {
      toast.error("You are not authenticated. Please log in.");
      return;
    }

    const formattedDate = new Date(date).toISOString();

    try {
      await axios.post(
        `${API_URL}/api/order/create`,
        {
          pickupLocation,
          destination,
          price: parseFloat(price.toString()),
          date: formattedDate,
          time,
          vehicleMark,
          tel: phone,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Reservation successful!");
      // Reset fields after successful submission
      setPickupLocation("");
      setDestination("");
      setPrice("");
      setDate("");
      setTime("");
      setVehicleMark("");
      setPhone("");
    } catch (error) {
      console.error("Error making reservation:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Réservation en quelques clics!</h1>
        <p className="text-gray-600 mt-2">
          Indiquez votre point de départ, votre destination et le type de véhicule souhaité. <br />
          Nous vous garantissons un trajet confortable et sécurisé.
        </p>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Get User Location Button */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm mb-4">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <button
              type="button"
              onClick={getLocation}
              className="w-full focus:outline-none"
            >
              Use My Location
            </button>
          </div>

          {/* Pickup Location */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Départ"
              className="w-full focus:outline-none"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            />
          </div>

          {/* Destination */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaRoute className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Destination"
              className="w-full focus:outline-none"
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaClock className="text-gray-500 mr-2" />
            <input
              type="time"
              className="w-full focus:outline-none"
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaMoneyBill1Wave className="text-gray-500 mr-2" />
            <input
              type="number"
              className="w-full focus:outline-none"
              value={price}
              placeholder="Prix  FCFA"
              required
            />
          </div>

          {/* Date */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input
              type="date"
              className="w-full focus:outline-none"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Vehicle Selection */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <AiOutlineCar className="text-gray-500 mr-2" />
            <select
              className="w-full focus:outline-none bg-transparent"
              onChange={(e) => setVehicleMark(e.target.value.trim())}
              required
            >
              <option value="">Sélectionnez un véhicule</option>
              <option value="Suzukialto">Suzuki Alto</option>
              <option value="SuzukiAltoNew">Suzuki Alto New</option>
              <option value="SuzukiEspresso">Suzuki Espresso</option>
              <option value="SuzukiDzire">Suzuki Dzire</option>
              <option value="SuzukiSwift">Suzuki Swift</option>
              <option value="Toyota">Toyota</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <AiOutlinePhone className="text-gray-500 mr-2" />
            <input
              type="tel"
              placeholder="Tel: +225 ****"
              className="w-full focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
          >
            <AiOutlineUser size={20} /> Réservez Ici
          </button>
        </form>

        {/* Car Image with Animation */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
          animate={{ x: [-10, 10, -10] }} // Moves left and right
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} // Smooth animation
        >
          <img
            src="/hatchback.png"
            alt="Car"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Reservation_Page;
