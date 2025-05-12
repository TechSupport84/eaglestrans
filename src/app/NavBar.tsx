import { useState } from "react"; 
import { FaHome, FaServicestack, FaClipboardCheck, FaHandshake, FaInfoCircle, FaUser } from 'react-icons/fa';
import { useAuth } from "../hooks/useAuth";
import { BiSolidDashboard } from "react-icons/bi";
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const {user} = useAuth()

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <span>Eagle's Trans</span>
        </div>

        {/* Navbar Links (Desktop View) */}
        <ul className={`hidden md:flex space-x-6 text-white`}>

          <li>
            <a href="/" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaClipboardCheck className="mr-2" />
              Reservation en Ligne
            </a>
          </li>
          <li>
            <a href="/service" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaServicestack className="mr-2" />
              Nos Services
            </a>
          </li>

          <li>
            <a href="/partner" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaHandshake className="mr-2" />
              Devenir Partenaire
            </a>
          </li>
           <li>
          <a href="/home" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaUser className="mr-2" />
              Profile
            </a>
          </li>


          <li>
            <a href="/appropos" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaInfoCircle className="mr-2" />
              A Propos
            </a>
          </li>
           {user?.role ==="admin" &&(
          <li>
          <a href="/dashboard" className="flex items-center text-white hover:text-blue-300 transition duration-300">
            <BiSolidDashboard className="mr-2" />
          Dashboard
          </a>
        </li>
           )}

        </ul>

        {/* Hamburger Menu (Mobile View) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col items-center bg-blue-700 text-white space-y-4 py-4">
          <li>
            <a href="/" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaHome className="mr-2" />
              Reservation en Ligne
            </a>
          </li>
          <li>
            <a href="/service" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaServicestack className="mr-2" />
              Nos Services
            </a>
          </li>
          <li>
            <a href="/home" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaUser className="mr-2" />
              Profile
            </a>
          </li>
          <li>
            <a href="/partner" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaHandshake className="mr-2" />
              Devenir Partenaire
            </a>
          </li>
          <li>
            <a href="/appropos" className="flex items-center text-white hover:text-blue-300 transition duration-300">
              <FaInfoCircle className="mr-2" />
              A Propos
            </a>
          </li>
          {user?.role ==="admin" &&(
          <li>
          <a href="/dashboard" className="flex items-center text-white hover:text-blue-300 transition duration-300">
            <BiSolidDashboard className="mr-2" />
          Dashboard
          </a>
        </li>
           )}

        </ul>
      </div>
    </header>
  );
}

export default NavBar;
