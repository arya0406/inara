import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import type { RootState, AppDispatch } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };
  return (    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-[100] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu"
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-playfair">The Inara Studio</h1>
          </Link>          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
            <Link to="/featured" className="nav-link">Featured</Link>
            <Link to="/story" className="nav-link">Story</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2">
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none ml-2 w-40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {user ? (
              <>
                <Link to="/wishlist" className="p-2">
                  <FavoriteIcon className="text-primary-charcoal hover:text-primary-gold transition-colors" />
                </Link>
                <Link to="/cart" className="p-2 relative">
                  <ShoppingCartIcon className="text-primary-charcoal hover:text-primary-gold transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-primary-charcoal hover:text-primary-gold transition-colors"
                  aria-label="Logout"
                >
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="p-2 text-primary-charcoal hover:text-primary-gold transition-colors"
              >
                <PersonIcon />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="w-64 p-4">
          <div className="flex flex-col space-y-4">            <Link 
              to="/categories" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/new-arrivals" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link 
              to="/featured" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Featured
            </Link>            <Link 
              to="/story" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Story
            </Link>            <Link 
              to="/contact" 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link 
                  to="/wishlist" 
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link 
                  to="/cart" 
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({cartItems.length})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="nav-link text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;