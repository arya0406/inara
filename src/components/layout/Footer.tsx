import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
  return (
    <footer className="bg-primary-charcoal text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair">About Us</h3>
            <p className="text-gray-300">
              Discover our exquisite collection of handcrafted jewelry, designed to make every moment special.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-gold transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="hover:text-primary-gold transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="hover:text-primary-gold transition-colors">
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-primary-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary-gold transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-primary-gold transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-primary-gold text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-gold text-white rounded hover:bg-primary-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} The Inara Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
