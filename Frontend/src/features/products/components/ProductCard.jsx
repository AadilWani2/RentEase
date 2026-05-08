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
    <div className="vibrant-card group relative h-full flex flex-col p-6">
      <Link to={`/products/${product._id}`} className="flex flex-col h-full">
        {/* Top: Wishlist Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center transition-all ${
              isWishlisted ? "bg-primary text-white border-transparent" : "bg-white text-black hover:border-black"
            }`}
          >
            <FiHeart className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>

        {/* Middle: Image Layer */}
        <div className="relative aspect-square mb-8 p-4">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Bottom: Info Layer */}
        <div className="mt-auto pt-6 border-t border-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {product.category}
              </span>
              <h3 className="text-lg font-black text-black leading-tight">
                {product.title}
              </h3>
            </div>
            <span className="text-lg font-black text-black">₹{product.monthlyRent}</span>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              Available Now
            </span>
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors active:scale-90 shadow-xl"
            >
              <FiPlus className="text-xl" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;