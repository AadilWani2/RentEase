import ProductCard from "../features/products/components/ProductCard";
import { useWishlist } from "../features/wishlist/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white py-40 relative overflow-hidden text-black">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Your Archive</span>
          <h1 className="text-7xl font-black tracking-tighter leading-none">
            SAVED — <br />
            <span className="text-primary italic">PIECES.</span>
          </h1>
          <p className="text-text-muted text-xl mt-10 max-w-2xl font-medium">
            Your curated gallery of future arrivals. High-performance design reserved for your residence.
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-40 bg-gray-50 rounded-[3.5rem] border border-gray-100"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100">
                <FiHeart className="text-4xl text-gray-200" />
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tighter">Archive is Empty</h2>
              <p className="text-text-muted mb-12 max-w-sm mx-auto font-medium">Discover our collections and preserve the items that define your space.</p>
              <Link
                to="/products"
                className="pill-button"
              >
                Browse Collection
                <FiArrowRight size={20} />
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;