import { motion } from 'framer-motion';
import { sampleProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const FeaturedCollectionPage = () => {
  // Get featured products
  const featuredProducts = sampleProducts.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900">
        <img
          src="/images/products/bracelet-1.jpg"
          alt="Featured Collection"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-playfair mb-4"
            >
              Featured Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Discover our most popular pieces, carefully selected for their unique design and timeless appeal.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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

export default FeaturedCollectionPage;
