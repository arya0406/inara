import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnterSite = () => {
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full cursor-pointer"
      onClick={handleEnterSite}
    >
      <div className="absolute inset-0 bg-black/40 z-10" />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="public/images/hero/6248750_Unrecognizable_Woman_3840x2160.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <img
          src="/images/hero/hero-1.jpg"
          alt="The Inara Studio"
          className="w-full h-full object-cover"
        />
      </video>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl md:text-8xl font-playfair mb-6">The Inara Studio</h1>
        <p className="text-xl md:text-2xl font-lato mb-8">Handcrafted Luxury Jewelry</p>
        <button className="border-2 border-white px-8 py-3 text-lg font-lato hover:bg-white hover:text-primary-charcoal transition-colors duration-300">
          Enter Site
        </button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
