import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="vibrant-card p-16 text-center max-w-xl relative z-10"
      >
        <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
          <FiCheckCircle className="text-5xl text-green-500" />
        </div>

        <span className="text-[10px] font-black tracking-[0.4em] text-green-500 uppercase mb-4 block">Order Confirmed</span>
        <h1 className="text-6xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
          SUCCESSFUL — <br />
          <span className="text-green-500 italic">TRANSACTION.</span>
        </h1>

        <p className="text-text-muted text-sm font-bold max-w-md mx-auto mb-12 leading-relaxed">
          Your rental order has been validated and the pieces are being staged for delivery. Check your dashboard for real-time status.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="pill-button w-full justify-center py-5 bg-black text-white hover:bg-gray-900 border-none"
          >
            Go To Dashboard
            <FiArrowRight size={20} />
          </Link>
          <Link
            to="/products"
            className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-primary transition-colors py-4"
          >
            Continue Exploring
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;