import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRazorpayOrder, verifyPayment } from "../features/payments/paymentService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initiatePayment();
  }, []);

  const initiatePayment = async () => {
    try {
      setLoading(true);

      const razorpayOrder = await createRazorpayOrder(orderId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "RentEase",
        description: "Premium Furniture Rental",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            toast.success("Transaction Securely Validated");
            navigate("/payment-success");
          } catch (error) {
            toast.error("Security verification failed");
          }
        },
        theme: {
          color: "#FF6B00",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        toast.error(response.error.description);
      });
    } catch (error) {
      console.log(error);
      toast.error("Gateway handshake failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="vibrant-card p-16 text-center max-w-lg relative z-10"
      >
        <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-10" />
        
        <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-4 block">Gateway Protocol</span>
        <h1 className="text-5xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
          STAGING — <br />
          <span className="text-primary italic">PAYMENT.</span>
        </h1>

        <p className="text-text-muted text-sm font-bold max-w-xs mx-auto leading-relaxed">
          Initializing secure handshake with the payment provider. Please do not refresh the terminal.
        </p>

        {loading && (
          <div className="mt-10">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 animate-pulse">Syncing encrypted data...</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payment;