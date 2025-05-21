import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../features/products/types';

interface FeaturedProductsProps {
  products: Product[];
  title: string;
  description?: string;
  viewAllLink?: string;
}

const FeaturedProducts = ({ products, title, description, viewAllLink }: FeaturedProductsProps) => {
  return (    <section className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.images[0]}
              category={product.category}
              isNew={product.isNew}
              isSale={product.price < product.originalPrice}
              salePrice={product.price}
            />
          ))}
        </div>

        {viewAllLink && (
          <div className="text-center mt-12">
            <Link
              to={viewAllLink}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-charcoal text-primary-charcoal hover:bg-primary-charcoal hover:text-white transition-colors duration-200"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
