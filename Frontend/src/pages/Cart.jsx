import { Link } from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const Cart = () => {
  const { cart, loading, removeFromCart, updateQuantity } = useCart();
  const [removeConfirm, setRemoveConfirm] = useState({ show: false, id: null });

  const handleRemove = async () => {
    const { id } = removeConfirm;
    if (!id) return;
    try {
      await removeFromCart(id);
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveConfirm({ show: false, id: null });
    }
  };

  const handleQuantityChange = async (productId, quantity, tenureMonths) => {
    try {
      await updateQuantity(productId, quantity, tenureMonths);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-12 border border-gray-100">
            <FiShoppingBag className="text-5xl text-gray-300" />
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tighter">Your Bag is Empty</h1>
          <p className="text-text-muted mb-12 text-xl font-medium max-w-md mx-auto">Looks like you haven't added any designer pieces to your collection yet.</p>
          <Link
            to="/products"
            className="pill-button"
          >
            Start Exploring
            <FiArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-40 text-black">
      <div className="vibrant-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Order Overview</span>
          <h1 className="text-7xl font-black tracking-tighter">YOUR <span className="text-primary italic">BAG.</span></h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-10">
            <AnimatePresence mode="popLayout">
              {cart.items.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="vibrant-card p-10 flex flex-col md:flex-row gap-10 group"
                >
                  <div className="w-full md:w-56 h-56 rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 p-6">
                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.product.category}</span>
                          <h2 className="text-3xl font-black tracking-tight hover:text-primary transition-colors">
                            {item.product.title}
                          </h2>
                        </div>
                        <button
                          onClick={() => setRemoveConfirm({ show: true, id: item.product._id })}
                          className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                      <p className="mt-4 text-2xl font-black text-black">
                        ₹{item.product.monthlyRent}
                        <span className="text-sm font-bold text-text-muted ml-2 tracking-widest uppercase">/ Month</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-10 mt-10">
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Quantity</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product._id, Number(e.target.value), item.tenureMonths)}
                          className="bg-gray-50 border border-gray-100 px-6 py-3 rounded-full text-sm font-bold focus:outline-none focus:border-primary appearance-none min-w-[120px] cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q} Piece{q > 1 ? 's' : ''}</option>)}
                        </select>
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Tenure</label>
                        <select
                          value={item.tenureMonths}
                          onChange={(e) => handleQuantityChange(item.product._id, item.quantity, Number(e.target.value))}
                          className="bg-gray-50 border border-gray-100 px-6 py-3 rounded-full text-sm font-bold focus:outline-none focus:border-primary appearance-none min-w-[150px] cursor-pointer"
                        >
                          {[3, 6, 12, 24, 36].map(m => <option key={m} value={m}>{m} Months</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="vibrant-card p-12 h-fit border border-gray-100 sticky top-32 bg-gray-50"
          >
            <h2 className="text-4xl font-black mb-12 tracking-tighter">SUMMARY</h2>

            <div className="space-y-8">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-text-muted">Monthly Rent</span>
                <span className="text-black">₹{cart.subtotal}</span>
              </div>

              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-text-muted">Security Deposit</span>
                <span className="text-primary">₹{cart.totalSecurityDeposit}</span>
              </div>

              <div className="pt-10 border-t border-gray-200">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-black font-black uppercase tracking-widest text-xs">Total Payable Now</span>
                  <span className="text-5xl font-black text-black leading-none">₹{cart.totalAmount}</span>
                </div>
                <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Includes taxes & delivery</p>
              </div>
            </div>

            <Link
              to="/checkout"
              className="pill-button w-full justify-center mt-12 py-6"
            >
              Confirm Selection
            </Link>
            
            <p className="mt-8 text-center text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
              Secure Transaction — Gallery Standard
            </p>
          </motion.div>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={removeConfirm.show}
        onClose={() => setRemoveConfirm({ show: false, id: null })}
        onConfirm={handleRemove}
        title="REMOVE PIECE?"
        message="Are you sure you want to remove this piece from your bag? You can always find it again in the catalog."
        confirmText="REMOVE FROM BAG"
        cancelText="KEEP PIECE"
      />
    </div>
  );
};

export default Cart;