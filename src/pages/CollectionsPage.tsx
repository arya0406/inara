import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import { sampleProducts } from '../data/products';

const CollectionsPage = () => {
  // Group products by category
  const categoryProducts = categories.map(category => ({
    ...category,
    products: sampleProducts.filter(p => p.category === category.name),
  }));

  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <img
          src="/images/editorial/story.jpg"
          alt="Collections"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-playfair mb-4"
            >
              Our Collections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Explore our curated collections of handcrafted jewelry,
              each piece telling its own unique story.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Jewelry Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">Browse By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categoryProducts.map(({ id, name, image, slug, products }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-lg shadow-lg ${slug === 'bracelets' ? 'md:col-span-2' : ''}`}
              >              <Link to={slug === 'bracelets' ? "/category/bracelets" : `/category/${slug}`}>
                  <div className="aspect-[3/4] bg-gray-100">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center p-8 text-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="text-xl font-playfair text-white mb-2">{name}</h3>
                        {slug === 'bracelets' ? (
                          <span className="inline-block px-4 py-1.5 bg-primary-gold text-white text-sm font-medium hover:bg-white hover:text-primary-charcoal transition-colors duration-300">
                            View Collection
                          </span>
                        ) : (
                          <span className="inline-block px-4 py-1.5 bg-white text-primary-charcoal text-sm font-medium hover:bg-primary-gold hover:text-white transition-colors duration-300">
                            {products.length} {products.length === 1 ? 'Product' : 'Products'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Collection Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">Special Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-lg h-[500px]"
            >
              <Link to="/collections/bridal">
                <img
                  src="/images/products/ring-1.jpg"
                  alt="Bridal Collection"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300 flex items-end p-8">
                  <div className="text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-3xl font-playfair mb-3">Bridal Collection</h3>
                    <p className="text-white/80 mb-4 max-w-md">
                      Timeless pieces to celebrate your special day and the journey ahead.
                    </p>
                    <button className="px-4 py-2 bg-white text-primary-charcoal hover:bg-primary-gold hover:text-white transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-lg shadow-lg h-[500px]"
            >
              <Link to="/bracelets">
                <img
                  src="/images/products/bracelets/bracelet-main.jpg"
                  alt="Bracelet Collection"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300 flex items-end p-8">
                  <div className="text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-3xl font-playfair mb-3">Bracelet Collection</h3>
                    <p className="text-white/80 mb-4 max-w-md">
                      Discover our exquisite range of handcrafted bracelets, from elegant bangles to statement pieces.
                    </p>
                    <button className="px-4 py-2 bg-white text-primary-charcoal hover:bg-primary-gold hover:text-white transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bracelet Styles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-playfair mb-4">Explore Bracelet Styles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From delicate chains to statement cuffs, discover the perfect bracelet to express your unique style.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >              <Link to="/category/bracelets?style=tennis">
                <div className="aspect-square">
                  <img 
                    src="/images/products/bracelets/bracelet-main.jpg" 
                    alt="Tennis Bracelets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-lg mb-1">Tennis Bracelets</h3>
                  <p className="text-gray-600 text-sm">Elegant design with continuous gems</p>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >              <Link to="/category/bracelets?style=bangles">
                <div className="aspect-square">
                  <img 
                    src="/images/products/bracelets/bracelet-main.jpg" 
                    alt="Bangles & Cuffs"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-lg mb-1">Bangles & Cuffs</h3>
                  <p className="text-gray-600 text-sm">Bold statements for every occasion</p>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >              <Link to="/category/bracelets?style=chain">
                <div className="aspect-square">
                  <img 
                    src="/images/products/bracelets/bracelet-main.jpg" 
                    alt="Chain Bracelets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-lg mb-1">Chain Bracelets</h3>
                  <p className="text-gray-600 text-sm">Versatile classics for everyday wear</p>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >              <Link to="/category/bracelets?style=charm">
                <div className="aspect-square">
                  <img 
                    src="/images/products/bracelets/bracelet-main.jpg" 
                    alt="Charm Bracelets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-lg mb-1">Charm Bracelets</h3>
                  <p className="text-gray-600 text-sm">Personalize your story with unique charms</p>
                </div>
              </Link>
            </motion.div>
          </div>
            <div className="text-center mt-10">
            <Link to="/category/bracelets">
              <button className="px-6 py-3 bg-primary-gold text-white hover:bg-primary-gold/90 transition-colors rounded-sm">
                View All Bracelet Styles
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/editorial/story.jpg"
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair mb-6">The Artistry Behind Our Collections</h2>
              <p className="text-gray-600 mb-4">
                Each piece in our collection is carefully designed and crafted by skilled artisans
                who bring years of experience and passion to their work. We believe in creating
                jewelry that tells a story and becomes a meaningful part of your life.
              </p>
              <p className="text-gray-600 mb-6">
                From sketch to final polish, our meticulous process ensures that each item meets
                our exacting standards of quality and beauty.
              </p>
              <Link
                to="/story"
                className="inline-block px-6 py-3 bg-primary-gold text-white hover:bg-primary-gold/90 transition-colors"
              >
                Read Our Full Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;