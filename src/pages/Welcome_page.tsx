import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

function WelcomePage() {
  const [time, setTime] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [city, setCity] = useState<string>("Nairobi");
  const [country, setCountry] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);

  const { login, register, error, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!username || !email || !password || !city || !country) {
      setLocalError("All fields are required");
      return;
    }

    register(username, email, city, country, password);
    toast.success("Votre enregistrement a été accepté ! Fermez  la  fernetre  et puis  connectez-vous.");
    setUsername("");
    setEmail("");
    setCity("Nairobi");
    setCountry("");
    setPassword("");

    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const closeModals = () => {
    setOpenLogin(false);
    setOpenRegister(false);
    setLocalError("");
  };

  return (
    <main className="relative bg-gray-800 min-h-screen flex flex-col justify-center">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('./logo.jpg')" }}
      ></div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between w-full items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Eagle's Trans</h1>
          <span className="text-lg text-gray-300">{time}</span>
        </header>

        {/* Info Card */}
        <section className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Professional Private Transport Services
          </h2>
          <p className="text-gray-600 mb-4">
            Your trusted partner for professional and personal travel in Yamoussoukro.
            Experience high-quality VTC services tailored to your needs.
          </p>

          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={() => { setOpenLogin(true); setOpenRegister(false); }}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <button
              onClick={() => { setOpenRegister(true); setOpenLogin(false); }}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition"
            >
              Register
            </button>
          </div>
        </section>

        {/* Login Modal */}
        {openLogin && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30">
            <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
              <button
                onClick={closeModals}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
              {(error || localError) && (
                <p className="text-red-500 text-sm mb-4">{error || localError}</p>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2 text-sm text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Register Modal */}
        {openRegister && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30">
            <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
              <button
                onClick={closeModals}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
              {(error || localError) && (
                <p className="text-red-500 text-sm mb-4">{error || localError}</p>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Username"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="City"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2 text-sm text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer/>
    </main>
  );
}

export default WelcomePage;
