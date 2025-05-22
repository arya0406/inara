import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { sampleProducts } from '../data/products';
import Button from '../components/common/Button';
import FeaturedProducts from '../components/FeaturedProducts';
import SafeImage from '../components/common/SafeImage';
import '../components/styles/CustomSwiper.css';

const HomePage = () => {
  const bestSellers = sampleProducts
    .filter(product => product.featured)
    .slice(0, 10);
  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative -mt-8">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          speed={1500}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          loop={true}
          fadeEffect={{ crossFade: true }}
          className="h-[400px] home-swiper"
        >
          {/* New Collection Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <SafeImage
                src="/images/products/bracelets/IMG-20250512-WA0038.jpg"
                alt="New Collection"
                className="w-full h-full object-cover object-center"
                category="Bracelets"
                productId="slider-1"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white slide-caption">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <h2 className="text-4xl md:text-5xl mb-6">Luxury Collection</h2>
                    <Button variant="secondary" size="lg">Shop Now</Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Premium Bracelets Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <SafeImage
                src="/images/products/bracelets/IMG-20250512-WA0042.jpg"
                alt="Premium Bracelets"
                className="w-full h-full object-cover object-center"
                category="Bracelets"
                productId="slider-2"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-16">
                <div className="text-right text-white slide-caption">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <h2 className="text-4xl mb-4">Premium Bracelets</h2>
                    <p className="mb-6 text-lg">Handcrafted with attention to detail</p>
                    <Button variant="secondary" size="lg">Explore</Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Rings Collection Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <SafeImage
                src="/images/products/bracelets/IMG-20250512-WA0045.jpg"
                alt="Exquisite Rings"
                category="Rings"
                productId="slider-3"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-start p-16">
                <div className="text-left text-white slide-caption">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <h2 className="text-4xl mb-4">Exquisite Rings</h2>
                    <p className="mb-6 text-lg">For every special moment</p>
                    <Button variant="secondary" size="lg">Discover</Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Necklaces Slide */}
          <SwiperSlide>
            <div className="relative h-full">
              <SafeImage
                src="/images/products/bracelets/IMG-20250512-WA0047.jpg"
                alt="Statement Necklaces"
                className="w-full h-full object-cover object-center"
                category="Necklaces"
                productId="slider-4"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white slide-caption">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <h2 className="text-4xl mb-4">Statement Necklaces</h2>
                    <p className="mb-6 text-lg">Make a lasting impression</p>
                    <Button variant="secondary" size="lg">View Collection</Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Best Sellers Section - Positioned for visibility without scrolling */}
      <div className="-mt-4">
        <FeaturedProducts
          products={bestSellers}
          title="Best Sellers"
          description="Our most loved pieces, chosen by you"
          viewAllLink="/featured"
        />
      </div>
    </div>
  );
};

export default HomePage;
