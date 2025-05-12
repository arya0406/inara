import { Link } from 'react-router-dom';
import type { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-playfair mb-1">{category.name}</h3>
          <p className="text-sm font-lato text-white/80">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
