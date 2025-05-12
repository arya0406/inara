import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { sampleProducts } from '../data/products';
import Collections from '../components/Collections';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Button from '../components/common/Button';

const HomePage = () => {
  const featuredProducts = sampleProducts.filter(product => product.featured).slice(0, 8);
  const newArrivals = sampleProducts.filter(product => product.isNew).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative -mt-8">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-[80vh]"
        >
          {/* New Collection Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="/images/hero/hero-1.jpg"
                alt="New Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-5xl mb-6">New Collection</h2>
                  <Button variant="secondary" size="lg">Shop Now</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Best Sellers Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <div className="grid grid-cols-2 gap-2 h-full p-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-playfair text-lg">{product.name}</h3>
                        <p className="mt-1">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
          
          {/* Editorial Campaign Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="/images/editorial/story.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-4">
                  <h2 className="text-5xl mb-4">Our Story</h2>
                  <p className="mb-6 text-lg">Discover the artistry behind each piece</p>
                  <Button variant="secondary" size="lg">Learn More</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Collections Section */}
      <Collections />

      {/* Featured Products Section */}
      <FeaturedProducts
        products={featuredProducts}
        title="Featured Collection"
        description="Discover our most popular pieces, carefully selected for their unique design and timeless appeal."
        viewAllLink="/shop"
      />

      {/* New Arrivals Section */}
      <FeaturedProducts
        products={newArrivals}
        title="New Arrivals"
        description="Be the first to explore our latest creations, fresh from the artisan's workshop."
        viewAllLink="/shop/new"
      />
    </div>
  );
};

export default HomePage;
