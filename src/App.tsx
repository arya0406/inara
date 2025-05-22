import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CollectionsPage from './pages/CollectionsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import FeaturedCollectionPage from './pages/FeaturedCollectionPage';
import StoryPage from './pages/StoryPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import ImagePreloader from './components/common/ImagePreloader';
import type { RootState } from './app/store';
import './App.css';
import './components/styles/CustomSwiper.css';
import './components/styles/ImageStyles.css';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Router>
      {/* Preload critical images */}
      <ImagePreloader />
      <Routes>
        {/* Landing page without layout */}
        <Route path="/" element={<LandingPage />} />
        
        {/* All other routes with layout */}
        <Route element={<Layout />}>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" replace />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<div>Shop Page (Coming Soon)</div>} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/bracelets" element={<Navigate to="/category/bracelets" replace />} />
          <Route path="/bracelets/*" element={<Navigate to="/category/bracelets" replace />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/featured" element={<FeaturedCollectionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
