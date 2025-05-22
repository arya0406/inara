import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeImage from '../components/common/SafeImage';

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
        <source src="https://res.cloudinary.com/dysvcpi05/video/upload/v1747121989/p3qpkwdaopxznupdr5xm.mp4" type="video/mp4" />        {/* Fallback to image if video fails to load */}
        <SafeImage
          src="/images/hero/hero-1.jpg"
          alt="The Inara Studio"
          className="w-full h-full object-cover object-center"
          category="hero"
          productId="landing-hero"
        />
      </video>
        {/* Overlay Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
        <motion.h1 
          className="text-6xl md:text-8xl font-playfair mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The Inara Studio
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl font-lato mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Handcrafted Luxury Jewelry
        </motion.p>        
        <motion.button 
          className="border-2 border-white px-8 py-3 text-lg font-lato hover:bg-white hover:text-primary-charcoal transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Inara Studio
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
