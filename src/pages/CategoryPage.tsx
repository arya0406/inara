import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { categories } from '../data/categories';
import { sampleProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  
  // Find the current category
  const category = categories.find(cat => cat.slug === slug);
  
  // Get products for this category
  const allCategoryProducts = sampleProducts.filter(product => 
    product.category === category?.name
  );

  // Apply style filter for bracelets
  const filteredProducts = slug === 'bracelets' && styleFilter
    ? allCategoryProducts.filter(product => {
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
    : allCategoryProducts;

  // Sort products based on selected option
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

  // Parse URL query parameters for style filter (for bracelets)
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

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-playfair mb-4">Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-playfair mb-4"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Style Filters (Only for bracelets) */}
      {slug === 'bracelets' && (
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
              </button>
              <button
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
      )}

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-playfair">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            <div className="flex items-center space-x-4">
              {slug === 'bracelets' && (
                <select
                  value={styleFilter || ''}
                  onChange={(e) => setStyleFilter(e.target.value || null)}
                  className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  <option value="">All Styles</option>
                  <option value="tennis">Tennis</option>
                  <option value="bangles">Bangles</option>
                  <option value="chain">Chain</option>
                  <option value="charm">Charm</option>
                </select>
              )}
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
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
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
                    imageUrl={product.images[0]}
                    category={product.category}
                    isNew={product.isNew}
                    isSale={product.price < product.originalPrice}
                    salePrice={product.price < product.originalPrice ? product.price : undefined}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleProducts
              .filter(product => product.category !== category.name)
              .slice(0, 4)
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.images[0]}
                    category={product.category}
                    isNew={product.isNew}
                    isSale={product.price < product.originalPrice}
                    salePrice={product.price < product.originalPrice ? product.price : undefined}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
