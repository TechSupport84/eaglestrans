import { FaCar, FaBuilding, FaUserTie, FaHandshake } from "react-icons/fa";

function ServicesPage() {
  return (
    <main className="flex flex-col items-center p-8 bg-gray-50 text-gray-900">
      {/* Title Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600">Nos Services</h1>
        <p className="text-lg text-gray-700 mt-4">
          Découvrez l'ensemble de nos solutions de transport conçues pour répondre efficacement à tous vos besoins personnels et professionnels.
        </p>
      </header>

      {/* Service Sections */}
      <section className="w-full max-w-5xl grid gap-8">
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow">
          <FaCar className="text-blue-500 text-5xl mb-6 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-2xl font-bold">Transport de Particuliers</h2>
            <p className="text-gray-600 mt-3">
              Profitez d'un service de chauffeur privé disponible 24h/24 pour vos déplacements urbains, aéroportuaires ou vos événements personnels. Nos véhicules sont spacieux, modernes et entretenus avec soin pour garantir votre confort et votre sécurité.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow">
          <FaBuilding className="text-blue-500 text-5xl mb-6 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-2xl font-bold">Transport d’Entreprises</h2>
            <p className="text-gray-600 mt-3">
              Simplifiez les déplacements professionnels de vos collaborateurs avec nos services de transport sur-mesure. Nous offrons également des services VIP, idéals pour vos clients et partenaires stratégiques.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="text-center mt-16">
        <h3 className="text-3xl font-extrabold text-gray-800">Nos Programmes</h3>
        <p className="text-md text-gray-600 mt-3">
          Découvrez nos programmes exclusifs pour maximiser votre expérience avec EAGLE'S TRANS.
        </p>
      </section>

      <section className="w-full max-w-5xl grid gap-8 mt-8">
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow">
          <FaUserTie className="text-blue-500 text-5xl mb-6 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-2xl font-bold">Location avec Chauffeur</h2>
            <p className="text-gray-600 mt-3">
              Optez pour une location flexible avec chauffeur pour vos besoins ponctuels ou prolongés. Profitez d'un service personnalisé, discret et ponctuel, adapté à vos exigences professionnelles ou personnelles.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow">
          <FaHandshake className="text-blue-500 text-5xl mb-6 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-2xl font-bold">Programme de Partenariat</h2>
            <p className="text-gray-600 mt-3">
              Vous êtes propriétaire d'un véhicule ? Rejoignez notre programme de partenariat et développez votre activité en collaborant avec EAGLE'S TRANS. Nous offrons un accompagnement personnalisé, des outils de gestion performants et une visibilité optimale pour maximiser vos revenus.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="text-center mt-16">
        <h4 className="text-xl font-semibold text-blue-600">
          Prêt à voyager autrement ?
        </h4>
        <p className="text-gray-700 mt-2">
          Contactez-nous dès aujourd'hui pour découvrir comment EAGLE'S TRANS peut transformer vos déplacements en expériences exceptionnelles.
        </p>
      </footer>
    </main>
  );
}

export default ServicesPage;
