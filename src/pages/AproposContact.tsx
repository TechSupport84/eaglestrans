import { BiMap, BiPhoneCall, BiMailSend, BiUser, BiMessage } from "react-icons/bi";
import { FaCarSide, FaLightbulb } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AproposContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contact/create-contact`, formData);
      toast.success("Message envoyé avec succès !");

      setFormData({ name: "", email: "", message: "" }); 
      setLoading(false);
      navigate("/success")
    } catch (error) {
      console.error(error); 
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 bg-gray-100">
      {/* About Section */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-blue-700 flex items-center gap-3">
            <FaCarSide className="text-5xl" /> EAGLE'S TRANS
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nous avons pour mission de révolutionner le transport privé en Afrique en offrant un service fiable,
            sécurisé et accessible à tous. Nous collaborons avec des chauffeurs qualifiés et des propriétaires
            de véhicules pour créer un réseau de transport efficace et rentable.
          </p>
          <p className="flex items-center gap-3 text-gray-700 text-lg">
            <FaLightbulb className="text-yellow-500 text-2xl" />
            <strong>Notre vision :</strong> Devenir la référence du transport VTC en Côte d’Ivoire et en Afrique.
          </p>
        </div>

        {/* Car Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="./hatchback.png" alt="Car" className="w-full max-w-sm rounded-xl shadow-lg" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 mt-10">
        <h3 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3">
          <BiPhoneCall className="text-3xl" /> Contact & Support
        </h3>

        {/* Contact Details */}
        <div className="mt-6 space-y-4 text-gray-700 text-lg">
          <p className="flex items-center gap-3">
            <BiMap className="text-red-500 text-2xl" /> 
            Adresse : Yamoussoukro
          </p>
          <p className="flex items-center gap-3">
            <BiPhoneCall className="text-green-500 text-2xl" />
            Téléphone / WhatsApp : 
            <a
              href="https://wa.me/2250719398164"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-2"
            >
              +225 0719398164
            </a>
          </p>
          <p className="flex items-center gap-3">
            <BiMailSend className="text-blue-500 text-2xl" />
            Email :
            <a
              href="mailto:eaglesvisionms@gmail.com"
              className="text-blue-600 hover:underline ml-2"
            >
              eaglesvisionms@gmail.com
            </a>
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-10">
          <h4 className="text-2xl font-bold text-center text-blue-700 mb-2">Contact / Feedback</h4>
          <p className="text-center text-gray-600 mb-6">
            Votre feedback ou suggestion nous aidera à améliorer notre qualité de service. 
            N'hésitez pas à nous contacter !
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm focus-within:border-blue-500 transition">
              <BiUser className="text-gray-400 text-2xl mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Votre Nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm focus-within:border-blue-500 transition">
              <BiMailSend className="text-gray-400 text-2xl mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Votre Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="flex items-start border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm focus-within:border-blue-500 transition">
              <BiMessage className="text-gray-400 text-2xl mr-3 mt-1" />
              <textarea
                name="message"
                placeholder="Votre Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full text-gray-700 focus:outline-none h-32 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default AproposContact;
