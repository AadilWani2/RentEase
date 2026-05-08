import HeroSection from "../components/home/HeroSection";

import CategoriesSection from "../components/home/CategoriesSection";

import FeaturedProducts from "../components/home/FeaturedProducts";
import NewsletterSection from "../components/home/NewsletterSection";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <CategoriesSection />

      <FeaturedProducts />
      <NewsletterSection />
    </div>
  );
};

export default Home;