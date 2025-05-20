import { motion } from 'framer-motion';
import { sampleProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/common/Button';

const NewArrivalsPage = () => {
  // Get new arrivals
  const newArrivals = sampleProducts.filter(product => product.isNew);

  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900">
        <img
          src="/images/products/necklace-1.jpg"
          alt="New Arrivals"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-playfair mb-4"
            >
              New Arrivals
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Discover our latest creations, fresh from the artisan's workshop.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
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
                  isNew={true}
                  isSale={product.price < product.originalPrice}
                  salePrice={product.price < product.originalPrice ? product.price : undefined}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-charcoal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to be the first to know about new arrivals, 
            special offers, and exclusive events.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-primary-gold flex-grow"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewArrivalsPage;
