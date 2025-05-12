import { categories } from '../data/categories';
import CategoryCard from './CategoryCard';

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">Our Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
