import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../../features/products/productService";
import ProductCard from "../../features/products/components/ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

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
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Cinematic Background Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none">
          Curated — Design — Curated — Design
        </span>
      </div>

      <div className="vibrant-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 text-primary">
              <span className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Autumn / Winter '24</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-black tracking-tighter uppercase leading-[0.8] mb-4">
              The <span className="text-primary italic">Edit.</span>
            </h2>
            <p className="text-text-muted font-medium text-lg md:text-xl max-w-xl leading-relaxed">
              An exclusive selection of architectural icons and contemporary masterpieces, curated for the modern residence.
            </p>
          </motion.div>

          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center text-2xl hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <FiArrowLeft />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center text-2xl hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Cinematic Horizontal Gallery */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 md:gap-12 pb-20 hide-scrollbar px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="min-w-[85vw] md:min-w-[650px] scroll-snap-align-start group"
            >
              <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-gray-100 border border-gray-200 group-hover:bg-primary/5 group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all duration-700">
                {/* Product Detail Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-contain p-12 md:p-20 group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Museum Label */}
                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-30 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Item No. 0{index + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-6">
                    <p className="text-xl font-black text-white">₹{product.monthlyRent}<span className="text-sm font-bold text-gray-400">/MO</span></p>
                    <Link 
                      to={`/products/${product._id}`}
                      className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      View Piece
                    </Link>
                  </div>
                </div>

                {/* Corner Category Tag */}
                <div className="absolute top-10 right-10 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest shadow-xl">
                  {product.category.toUpperCase()}
                </div>
              </div>
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