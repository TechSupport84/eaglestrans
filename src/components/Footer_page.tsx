import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function FooterPage() {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 mt-16 flex flex-col items-center">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Eagle's Trans. Tous droits réservés.
        </p>
        <div className="text-xs opacity-80 space-y-1">
          <p>
            Contactez-nous: 
            <a href="mailto:eaglesvisionms@gmail.com" className="text-blue-400 hover:underline ml-1">
              eaglesvisionms@gmail.com
            </a> 
            | 
            <span className="ml-1">+225 0719398164</span>
          </p>
          <p>
            Creez votre site Web : 
            <a href="mailto:trainingtech84@gmail.com" className="text-blue-400 hover:underline ml-1">
              trainingtech84@gmail.com
            </a> 
            | 
            <a href="https://jeancy24sur.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
              www.jeancy24sur.com
            </a>
          </p>
          <p>
            Tech Support: 
            <a href="https://jeancyportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
              Jeancy Mpoyi
            </a>
          </p>
        </div>
      </div>

 {/* Social Media Icons */}
 <div className="mt-6 flex space-x-6">
        <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300 text-xl">
          <FaFacebookF />
        </a>
        <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300 text-xl">
          <FaTwitter />
        </a>
        <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300 text-xl">
          <FaLinkedinIn />
        </a>
      </div>


      <div className="mt-4">
        <a href="/policy" className="text-blue-400 hover:underline text-sm">
          Politique de Confidentialité
        </a>
      </div>
    </footer>
  );
}

export default FooterPage;
