import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../../features/products/productService";
import ProductCard from "../../features/products/components/ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ limit: 8 });
        setProducts(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  return (
    <section className="py-20 md:py-40 bg-white">
      <div className="vibrant-container">
        {/* Header with Nav Arrows */}
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase">Products</h2>
          </motion.div>
          
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-2xl hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <FiArrowLeft />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-2xl hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-10 hide-scrollbar px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[350px] scroll-snap-align-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;