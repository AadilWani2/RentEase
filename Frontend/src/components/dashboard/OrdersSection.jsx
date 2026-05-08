import { useEffect, useState } from "react";
import { getMyOrders } from "../../features/orders/orderService";
import { FiPackage, FiCalendar, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Fetching History...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl font-black tracking-tighter uppercase">My Orders</h2>
        <p className="text-text-muted text-sm font-bold mt-1">Review your rental history and order status.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100 border-dashed">
          <p className="text-xl text-text-muted font-bold italic">No transactions found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <FiPackage className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-black">
                      ORDER #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-text-muted font-bold text-xs">
                      <span className="flex items-center gap-1">
                        <FiCalendar />
                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="uppercase tracking-widest text-[10px] text-primary">{order.orderStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end w-full md:w-auto">
                  <p className="text-3xl font-black text-black">₹{order.totalAmount}</p>
                  <button className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-2 group-hover:text-primary transition-colors">
                    View Details
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersSection;