import { motion } from "framer-motion";
import { FiHeart, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../features/wishlist/WishlistContext";
import { useCart } from "../../../features/cart/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(product._id, 1);
      toast.success("Added to bag");
    } catch (error) {
      toast.error("Process failed");
    }
  };

  return (
    <div className="relative group overflow-hidden bg-white rounded-[2rem] border border-gray-100 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
      <Link to={`/products/${product._id}`} className="block p-4">
        {/* Visual Showcase */}
        <div className="relative aspect-[4/5] rounded-[1.5rem] bg-gray-50 overflow-hidden flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
          
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-[85%] h-[85%] object-contain transition-all duration-1000 group-hover:scale-110 drop-shadow-lg"
          />

          {/* Quick Actions Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                isWishlisted ? "bg-primary text-white" : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              <FiHeart className={isWishlisted ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-all"
            >
              <FiPlus className="text-xl" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase">
            {product.category}
          </div>
        </div>

        {/* Content Layer */}
        <div className="px-2 pb-2">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-black leading-none uppercase tracking-tighter">
                {product.title}
              </h3>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">
                Architectural Original
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-black">₹{product.monthlyRent}</span>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">per month</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;