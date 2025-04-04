function FooterPage() {
    return (
      <footer className="w-full bg-gray-900 text-white py-6 mt-12 flex flex-col items-center justify-center">
        <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Eagle's Trans. Tous droits réservés.</p>
        <p className="text-xs mt-2 opacity-80">
          Contactez-nous: 
          <a href="mailto:support@eaglestrans.com" className="text-blue-400 hover:underline ml-1">
            support@eaglestrans.com
          </a> | 
          <span className="ml-1">+225 01 23 45 67 89</span>
        </p>
        
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300">Facebook</a>
          <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300">Twitter</a>
          <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-300">LinkedIn</a>
        </div>
  
        {/* Privacy Policy Link */}
        <div className="mt-4">
          <a href="/policy" className="text-blue-400 hover:underline text-sm">
            Politique de Confidentialité
          </a>
        </div>
      </footer>
    );
  }
  
  export default FooterPage;
  