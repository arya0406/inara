import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import CollectionsPage from './pages/CollectionsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import FeaturedCollectionPage from './pages/FeaturedCollectionPage';
import StoryPage from './pages/StoryPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<div>Shop Page (Coming Soon)</div>} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/bracelets" element={<Navigate to="/category/bracelets" replace />} />          <Route path="/bracelets/*" element={<Navigate to="/category/bracelets" replace />} />
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
