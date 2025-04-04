import { FaCar, FaBuilding, FaUserTie, FaHandshake } from "react-icons/fa";

function ServicesPage() {
  return (
    <main className="flex flex-col items-center p-6 bg-gray-50 text-gray-900">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Nos Services</h1>
        <p className="text-lg text-gray-700 mt-2">Découvrez nos solutions de transport adaptées à tous vos besoins.</p>
      </div>

      {/* Service Sections */}
      <div className="w-full max-w-4xl grid gap-6">
        <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
          <FaCar className="text-blue-500 text-4xl mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">Transport de Particuliers</h2>
            <p className="text-gray-600 mt-2">
              Besoin d’un chauffeur privé pour vos déplacements en ville ou vers l’aéroport ? Nos véhicules confortables et nos chauffeurs professionnels sont à votre disposition 24h/24.
            </p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
          <FaBuilding className="text-blue-500 text-4xl mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">Transport des Entreprises</h2>
            <p className="text-gray-600 mt-2">
              Nous proposons des solutions adaptées aux professionnels : mise à disposition de véhicules pour vos collaborateurs, déplacements d’affaires et services VIP.
            </p>
          </div>
        </section>
      </div>

      {/* Programs Section */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-gray-800">Programmes</h3>
      </div>

      <div className="w-full max-w-4xl grid gap-6 mt-6">
        <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
          <FaUserTie className="text-blue-500 text-4xl mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">Location avec Chauffeur</h2>
            <p className="text-gray-600 mt-2">
              Louez un véhicule avec chauffeur pour une durée déterminée et profitez d’un service premium.
            </p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
          <FaHandshake className="text-blue-500 text-4xl mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">Programme de Partenariat</h2>
            <p className="text-gray-600 mt-2">
              Vous possédez un véhicule ? Rejoignez notre réseau et générez des revenus avec EAGLE'S TRANS.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ServicesPage;
