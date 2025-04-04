import { BiMap, BiPhoneCall, BiMailSend, BiUser, BiMessage } from "react-icons/bi";
import { FaCarSide, FaLightbulb } from "react-icons/fa";
import { useState } from "react";

const AproposContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé avec succès!");
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-10 bg-gray-100">
      {/* About Section */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <FaCarSide /> EAGLE'S TRANS
          </h2>
          <p className="text-gray-700 mt-4">
            Nous avons pour mission de révolutionner le transport privé en Afrique en offrant un service fiable,
            sécurisé et accessible à tous. Nous collaborons avec des chauffeurs qualifiés et des propriétaires
            de véhicules pour créer un réseau de transport efficace et rentable.
          </p>
          <p className="text-gray-700 mt-4 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" /> <strong>Notre vision :</strong> Devenir la référence du transport VTC en Côte d’Ivoire et en Afrique.
          </p>
        </div>

        {/* Car Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src="./hatchback.png" alt="Car" className="w-full max-w-sm rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <BiPhoneCall /> Contact & Support
        </h3>
        <div className="mt-4 space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <BiMap className="text-red-500" /> Adresse : [Ajouter l’adresse]
          </p>
          <p className="flex items-center gap-2">
            <BiPhoneCall className="text-green-500" /> Téléphone / WhatsApp : [Numéro]
          </p>
          <p className="flex items-center gap-2">
            <BiMailSend className="text-blue-500" /> Email : [Adresse email]
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <BiUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <BiMailSend className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
            <BiMessage className="text-gray-500 mr-2 mt-1" />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full focus:outline-none h-24"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default AproposContact;