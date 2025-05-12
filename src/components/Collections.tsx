import { Link } from 'react-router-dom';
import Button from './common/Button';

interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'Ethereal Collection',
    description: "Delicate pieces inspired by nature's beauty",
    imageUrl: '/images/products/necklace-1.jpg',
    link: '/collections/ethereal'
  },
  {
    id: '2',
    name: 'Modern Classics',
    description: 'Timeless designs for the contemporary woman',
    imageUrl: '/images/products/ring-1.jpg',
    link: '/collections/modern-classics'
  },
  {
    id: '3',
    name: 'Statement Pieces',
    description: 'Bold and unique jewelry that stands out',
    imageUrl: '/images/products/pendant-1.jpg',
    link: '/collections/statement'
  }
];

const Collections = () => {
  return (
    <section className="py-16 bg-primary-ivory/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, each telling its own unique story through exquisite craftsmanship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.id}
              to={collection.link}
              className="group relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-playfair mb-2">{collection.name}</h3>
                    <p className="text-white/80 mb-4">{collection.description}</p>
                    <Button variant="secondary" size="sm">Explore Collection</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
