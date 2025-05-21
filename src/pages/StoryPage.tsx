import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const StoryPage = () => {
  return (
    <div className="min-h-screen bg-primary-ivory/50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-primary-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl font-playfair mb-6 text-primary-charcoal">
            The Inara Studio
          </h1>          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-primary-charcoal font-light tracking-widest mt-8"
          >
            YOUR STYLE   •   YOUR STATEMENT   •   YOUR STORY
          </motion.p>
        </motion.div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair text-center mb-8">Our Journey</h2>
            <p className="text-gray-700 mb-6">
              The Inara Studio was born from a deep passion for craftsmanship and a desire to create jewelry that tells a story. 
              Founded in 2024 by our creative director, Shah Yesha, our studio began as a small workshop where each piece was 
              thoughtfully designed and handcrafted with meticulous attention to detail.
            </p>
            <p className="text-gray-700 mb-6">
              Our name, "Inara," means "ray of light" in Arabic, symbolizing our mission to bring light and joy through our 
              creations. From the beginning, we have been committed to sourcing sustainable materials and supporting fair trade 
              practices, ensuring that our jewelry not only looks beautiful but also has a positive impact on the world.
            </p>
            <p className="text-gray-700">
              Today, The Inara Studio has grown into a beloved brand known for its distinctive designs and exceptional quality. 
              While we've expanded our team and reach, we remain true to our founding principles: creating timeless, meaningful 
              pieces that women can cherish for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Story Behind Our Featured Collection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-playfair mb-6">The Story Behind Our Featured Collection</h2>
              <p className="text-gray-600 mb-4">
                Each piece in our Featured Collection represents the pinnacle of our craftsmanship and design philosophy. 
                Selected for their exceptional popularity and timeless appeal, these are the pieces that have resonated 
                most deeply with our customers.
              </p>
              <p className="text-gray-600 mb-4">
                From elegant everyday essentials to breathtaking statement pieces, our featured collection brings 
                together designs that showcase the versatility and artistry that defines The Inara Studio.
              </p>
              <p className="text-gray-600">
                Whether you're searching for a signature piece to define your personal style or a thoughtful gift 
                that's guaranteed to delight, our Featured Collection offers handcrafted luxury you can trust.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative"
            >
              <img
                src="/images/editorial/story.jpg"
                alt="Featured Collection Story"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-gold/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary-gold/10 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;
