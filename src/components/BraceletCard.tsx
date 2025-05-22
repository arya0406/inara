import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeImage from './common/SafeImage';

interface BraceletCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

const BraceletCard: React.FC<BraceletCardProps> = ({ id, name, price, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden"
    >
      <Link to={`/products/${id}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <SafeImage
            src={image}
            alt={name}
            category="Bracelets"
            productId={id}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-medium text-lg group-hover:text-primary-gold transition-colors">
            {name}
          </h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BraceletCard;
