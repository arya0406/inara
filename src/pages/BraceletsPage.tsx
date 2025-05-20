import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { sampleProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const BraceletsPage = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const location = useLocation();
  
  // Get all bracelet products
  const braceletProducts = sampleProducts.filter(product => 
    product.category === 'Bracelets'
  );  // Sort products based on selected option
  const filteredProducts = styleFilter
    ? braceletProducts.filter(product => {
        // Determine style category based on product name
        const productName = product.name.toLowerCase();
        
        switch(styleFilter) {
          case 'tennis':
            return productName.includes('tennis') || productName.includes('diamond');
          case 'bangles':
            return productName.includes('bangle') || productName.includes('cuff');
          case 'chain':
            return productName.includes('chain');
          case 'charm':
            return productName.includes('charm');
          default:
            return true;
        }
      })
    : braceletProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    } else if (sortBy === 'best-selling') {
      return (b.reviews || 0) - (a.reviews || 0);
    } else {
      // Default sorting (newest) - assume newer products have isNew flag
      return b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1;
    }
  });

  // Parse URL query parameters for style filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const style = params.get('style');
    if (style) {
      setStyleFilter(style);
    } else {
      setStyleFilter(null);
    }
  }, [location]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      <Helmet>
        <title>Luxury Bracelet Collection | The Inara Studio</title>
        <meta name="description" content="Explore our exquisite collection of handcrafted bracelets, from delicate chains to statement pieces. Find the perfect bracelet to complement your style." />
        <meta name="keywords" content="bracelets, jewelry, luxury bracelets, gold bracelet, silver bracelet, diamond bracelet, handmade bracelet" />
        <meta property="og:title" content="Luxury Bracelet Collection | The Inara Studio" />
        <meta property="og:description" content="Discover our collection of handcrafted bracelets for every occasion." />
        <meta property="og:image" content="/images/products/bracelets/bracelet-main.jpg" />
        <link rel="canonical" href="/bracelets" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <img
          src="/images/products/bracelets/bracelet-main.jpg"
          alt="Bracelets Collection"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-playfair mb-4"
            >
              Bracelet Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Discover our exquisite range of hand-crafted bracelets, from delicate chains to statement pieces.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Style Filters */}
      <section className="pt-8 pb-0">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-medium mb-4">Browse by Style</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setStyleFilter(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                styleFilter === null 
                  ? 'bg-primary-gold text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Styles
            </button>              <button
              onClick={() => setStyleFilter('tennis')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                styleFilter === 'tennis' 
                  ? 'bg-primary-gold text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Tennis Bracelets
            </button>
            <button
              onClick={() => setStyleFilter('bangles')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                styleFilter === 'bangles' 
                  ? 'bg-primary-gold text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Bangles & Cuffs
            </button>
            <button
              onClick={() => setStyleFilter('chain')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                styleFilter === 'chain' 
                  ? 'bg-primary-gold text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Chain Bracelets
            </button>
            <button
              onClick={() => setStyleFilter('charm')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                styleFilter === 'charm' 
                  ? 'bg-primary-gold text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Charm Bracelets
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-playfair">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'Bracelet' : 'Bracelets'}
              </h2>
              {styleFilter && (
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-600">Filtered by: </span>
                  <span className="ml-2 px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-sm flex items-center">
                    {styleFilter.charAt(0).toUpperCase() + styleFilter.slice(1)}
                    <button 
                      onClick={() => setStyleFilter(null)}
                      className="ml-2 text-primary-gold hover:text-primary-gold/80"
                      aria-label="Remove filter"
                    >
                      ✕
                    </button>
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
              <select 
                id="sort" 
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-gold"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">No bracelets found.</p>
            </div>
          ) : (            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product) => {
                // Ensure the image path is correct or use a fallback
                const imageUrl = product.images && product.images.length > 0 
                  ? product.images[0] 
                  : '/images/products/bracelets/bracelet-main.jpg';
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      imageUrl={imageUrl}
                      category={product.category}
                      isNew={product.isNew}
                      isSale={product.price < product.originalPrice}
                      salePrice={product.price < product.originalPrice ? product.price : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair mb-6">The Art of Our Bracelets</h2>
            <p className="text-gray-600 mb-8">
              Each bracelet in our collection is meticulously handcrafted by skilled artisans using only the finest materials. 
              From the initial design to the final polish, we prioritize quality and attention to detail in every step of the process.
            </p>
            <p className="text-gray-600 mb-8">
              Our bracelets range from delicate everyday pieces to bold statement designs, ensuring there's something for every style and occasion. 
              Whether you're looking for a timeless classic or a contemporary statement piece, our bracelet collection offers versatility and elegance.
            </p>
            <div className="mt-8">
              <button className="px-6 py-3 bg-primary-gold text-white hover:bg-primary-gold/90 transition-colors rounded-sm">
                Learn More About Our Craftsmanship
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">Browse Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="font-playfair text-xl mb-4">Modern Classics</h3>
              <p className="text-gray-600 mb-6">Timeless designs with a contemporary twist.</p>
              <button className="text-primary-gold hover:text-primary-gold/80 font-medium">
                Shop Collection →
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="font-playfair text-xl mb-4">Statement Pieces</h3>
              <p className="text-gray-600 mb-6">Bold designs that make a lasting impression.</p>
              <button className="text-primary-gold hover:text-primary-gold/80 font-medium">
                Shop Collection →
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="font-playfair text-xl mb-4">Ethereal</h3>
              <p className="text-gray-600 mb-6">Delicate, dreamy pieces inspired by nature.</p>
              <button className="text-primary-gold hover:text-primary-gold/80 font-medium">
                Shop Collection →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BraceletsPage;
