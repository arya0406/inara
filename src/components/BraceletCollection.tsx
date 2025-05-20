import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import BraceletCard from './BraceletCard';
import type { Product } from '../features/products/types';

interface BraceletCollectionProps {
  bracelets: Product[];
}

const BraceletCollection: React.FC<BraceletCollectionProps> = ({ bracelets }) => {
  return (
    <section className="py-16 bg-primary-ivory/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-playfair mb-4"
          >
            Discover Our Bracelet Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Explore our extensive collection of handcrafted bracelets, from elegant tennis bracelets to statement cuffs.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bracelets.map((bracelet) => (
            <BraceletCard
              key={bracelet.id}
              id={bracelet.id}
              name={bracelet.name}
              price={bracelet.price}
              image={bracelet.images[0]}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/category/bracelets">
            <Button variant="primary" size="lg">View All Bracelets</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BraceletCollection;
