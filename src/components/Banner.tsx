function Banner() {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] mt-0">
        {/* Background Image */}
        <img 
          src="./banner.jpg" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            Votre trajet, notre engagement !
          </h1>
  
          {/* Call-to-action Box */}
          <div className="bg-white bg-opacity-20 p-3 sm:p-4 md:p-6 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg">
            <p className="text-white text-sm sm:text-base md:text-lg">
              Voyagez en toute sécurité et confort avec nos services de VTC 
              à Yamoussoukro et au-delà.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Banner;
  