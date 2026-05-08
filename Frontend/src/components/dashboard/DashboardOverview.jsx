import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import { getMyOrders } from "../../features/orders/orderService";
import { getAddresses } from "../../features/address/addressService";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingBag, FiMapPin, FiGrid } from "react-icons/fi";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const ordersData = await getMyOrders();
      const addressesData = await getAddresses();
      setOrders(ordersData);
      setAddresses(addressesData);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    { label: "Current Pieces", value: orders.filter(o => o.orderStatus !== "returned").length, icon: <FiPackage />, color: "bg-blue-500" },
    { label: "Collection History", value: orders.length, icon: <FiShoppingBag />, color: "bg-orange-500" },
    { label: "Saved Locations", value: addresses.length, icon: <FiMapPin />, color: "bg-purple-500" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-4 block">Portfolio</span>
          <h1 className="text-5xl font-black text-black tracking-tighter leading-none uppercase">
            Hello, <br />
            <span className="text-primary italic">{user?.name.split(" ")[0]}.</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-full border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
            <FiGrid className="text-xl" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-black mr-4">Verified Member</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center text-2xl shadow-lg mb-8 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{stat.label}</span>
            <p className="text-5xl font-black text-black tracking-tighter mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;