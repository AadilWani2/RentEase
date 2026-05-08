import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../features/products/productService";
import { useCart } from "../features/cart/CartContext";
import { useWishlist } from "../features/wishlist/WishlistContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaCalendarAlt, FaShieldAlt, FaTruck } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rentMonths, setRentMonths] = useState(3);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error("Piece not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1, rentMonths);
      toast.success("Added to collection");
    } catch (error) {
      toast.error("Failed to add piece");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20 md:pb-40 text-black relative overflow-hidden">
      {/* Decorative Sparkle Background */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-24">
          
          {/* Gallery - Asymmetric Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-gray-50 border border-gray-100 group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-6 md:p-12 transition-all duration-700"
                />
              </AnimatePresence>
              
              <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 flex gap-2 md:gap-4 overflow-x-auto max-w-[80%] pb-2 hide-scrollbar">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all bg-white shrink-0 ${
                      selectedImage === index ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6 md:pt-10">
              {[
                { icon: FaShieldAlt, title: "Damage Protection", desc: "Premium coverage included" },
                { icon: FaTruck, title: "White Glove Delivery", desc: "Complimentary installation" },
                { icon: FaCalendarAlt, title: "Flexible Tenure", desc: "3-36 months available" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex md:flex-col items-center md:items-start gap-4 md:gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <item.icon className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">{item.title}</h4>
                    <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info - Sticky Column */}
          <div className="lg:col-span-5 h-fit sticky top-40">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="space-y-4 md:space-y-6">
                <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                  {product.category} Collection
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black leading-none uppercase">
                  {product.title}
                </h1>
                <p className="text-3xl md:text-4xl font-black text-black">
                  ₹{product.monthlyRent}
                  <span className="text-sm font-bold text-text-muted ml-3 tracking-widest">/ MONTH</span>
                </p>
              </div>

              <div className="space-y-8 bg-gray-50 md:bg-transparent p-8 md:p-0 rounded-[2.5rem] md:rounded-0 border border-gray-100 md:border-0">
                <h3 className="text-xs font-black tracking-[0.2em] text-black uppercase border-b border-gray-100 pb-4">Philosophy & Detail</h3>
                <p className="text-text-muted leading-relaxed font-medium text-lg">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Dimensions</span>
                    <span className="text-sm text-black font-bold">Standard Size</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Condition</span>
                    <span className="text-sm text-black font-bold">Pristine Grade</span>
                  </div>
                </div>
              </div>

              <div className="space-y-10 bg-black text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Tenure</span>
                    <span className="text-primary font-black text-lg">{rentMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="3"
                    value={rentMonths}
                    onChange={(e) => setRentMonths(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary border border-white/5"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 pill-button justify-center py-5 md:py-6"
                  >
                    <FaShoppingCart className="text-sm" />
                    ADD TO COLLECTION
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleWishlist(product)}
                    className={`h-16 md:h-auto md:w-24 rounded-[1.5rem] flex items-center justify-center transition-all ${
                      isWishlisted ? "bg-red-500 text-white" : "bg-white/10 text-white border border-white/5"
                    }`}
                  >
                    <FaHeart size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;