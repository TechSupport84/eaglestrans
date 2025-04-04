import { BiLogoGoogle } from "react-icons/bi";
import { API_URL } from "../constants/API_URL";
import { useState, useEffect } from "react";

function Welcome_page() {
  const [time, setTime] = useState("");

  // Function to update the time every second
  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <main className="relative bg-cover bg-center min-h-screen flex flex-col justify-center">
      {/* Background image with transparency */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('./logo.jpg')" }}>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-800 opacity-50"></div> {/* Transparent overlay */}
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-screen px-4">
    
        <div className="flex justify-between w-full items-center mb-6">
          <span className="text-4xl font-bold text-red-400 animate-bounce">Eagle's Trans</span>
    
          <span className="text-xl text-red-800  bg-gray-200  p-2  rounded absolute top-4 right-4">{time}</span> 
        </div>

        <div className="absolute pl-5 ml-5 left-5 animate-carBounce">
          <img src="./hatchback.png" alt="Hatchback" className="w-16 h-12" />
        </div>


        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl text-white text-center max-w-xl mx-auto shadow-lg">
          <p className="text-lg text-gray-200 mb-4">
            Votre allié pour des trajets d’exception
            <br />
            Découvrez le service VTC qui redéfinit vos déplacements
            <span className="text-orange-400"> à Yamoussoukro.</span>
            <br />
            Avec Eagle's Trans, profitez d’une expérience de transport
            <span> sur-mesure,</span> que ce soit pour vos rendez-vous professionnels
            <span> ou</span> vos trajets personnels.
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-blue-800 text-gray-800 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            <BiLogoGoogle className="text-gray-300 text-2xl" />
            <span className="font-medium text-gray-200">Continuez avec Google</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Welcome_page;
