import React, { useState, useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Role = "client";  // Define the roles available

function WelcomePage() {
  const [time, setTime] = useState<string>("");
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [localerror, setError] = useState<string>(""); 
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(" "); 
  const [city, setCity] = useState<string>("Nairobi");
  const [country, setCountry] = useState<string>(" "); 
  const [picture, setPicture] = useState<string>(""); 
  const [role, setRole] = useState<Role | "">(""); 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, register ,error} = useAuth();
  const navigate = useNavigate();

  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval); 
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !city || !country) {
      setError("All fields except picture and role are required");
      return;
    }

    register(username, email, picture, city, country, password, role);
    console.log("Registering with:", { username, email, picture, city, country, password, role });

    setUsername("");
    setEmail("");
    setPicture("");
    setCity("");
    setCountry("");
    setPassword("");
    navigate("/");
  };

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
    setOpenRegister(false);
  };

  const handleOpenRegister = () => {
    setOpenRegister(!openRegister);
    setOpenLogin(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeLogin = () => setOpenLogin(false);
  const closeRegister = () => setOpenRegister(false);

  return (
    <main className="relative bg-cover bg-center min-h-screen flex flex-col justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('./logo.jpg')" }}>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-800 opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-full items-center mb-6">
          <span className="text-4xl font-bold text-red-400 animate-bounce">Eagle's Trans</span>
          <span className="text-xl text-red-800 bg-gray-200 p-2 rounded absolute top-4 right-4">{time}</span>
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

        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={handleOpenLogin}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-blue-800 text-gray-800 border border-gray-300 rounded-lg shadow-lg hover:bg-blue-800 transition transform hover:scale-105"
          >
            <BiLogInCircle className="text-gray-300 text-2xl" />
            <span className="font-medium text-gray-200">Login</span>
          </button>

          <button
            onClick={handleOpenRegister}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-800 text-white border border-gray-300 rounded-lg shadow-lg hover:bg-green-800 transition transform hover:scale-105"
          >
            <FaUser className="text-gray-300 text-2xl" />
            <span className="font-medium">Register</span>
          </button>
        </div>

        {openLogin && (
          <div className="flex justify-center items-center min-h-screen absolute inset-0 z-20">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
              <button onClick={closeLogin} className=" right-2 text-xl text-gray-500 hover:text-gray-700">X</button>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login 🌟</h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {localerror && <p className="text-red-500 text-sm mb-4">{localerror}</p>}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    <FaEnvelope className="inline mr-2 text-indigo-600" /> Email 📧
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    <FaLock className="inline mr-2 text-indigo-600" /> Password 🔑
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-indigo-600"
                    >
                      {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Login 🚀
                </button>
              </form>
            </div>
          </div>
        )}

        {openRegister && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeRegister}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
        
            {/* Title */}
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Register ✨
            </h2>
        
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {localerror && <p className="text-red-500 text-sm mb-4">{localerror}</p>}
            {/* Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username 👤
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Choose a username"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email 📧
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
        
              {/* Row 2 */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password 🔑
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Choose a password"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Picture 📸
                  </label>
                  <input
                    type="url"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Profile picture URL"
                  />
                </div>
              </div>
        
              {/* Row 3 */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    City 🌆
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Country 🌍
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your country"
                  />
                </div>
              </div>
        
              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role 🧑‍💼
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select your role</option>
                  <option value="client">Client</option>
                </select>
              </div>
        
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              >
                Register 🎉
              </button>
            </form>
          </div>
        </div>
        
        )}
      </div>
    </main>
  );
}

export default WelcomePage;
