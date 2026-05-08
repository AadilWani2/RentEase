import { useEffect, useState } from "react";
import { getProducts } from "../features/products/productService";
import ProductCard from "../features/products/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      // Assuming backend supports a 'featured' filter or I just filter here
      const data = await getProducts();
      // For now, let's just take first 6 as "featured" or if there's a flag use it
      const featured = data.filter(p => p.isFeatured).slice(0, 6);
      setProducts(featured.length > 0 ? featured : data.slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-40 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">The Spotlight</span>
            <h1 className="text-7xl md:text-[8rem] font-black text-black tracking-tighter leading-none uppercase">
              FEATURED — <br />
              <span className="text-primary italic">DESIGNS.</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto mt-10 font-medium leading-relaxed">
              Hand-picked pieces that define the current era of architectural furniture. Only the most iconic releases.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-[3rem] bg-gray-50 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-32 pt-20 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">End of Featured Collection</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
