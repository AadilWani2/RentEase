import { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import { getAdminAnalytics } from "../../features/admin/adminAnalyticsService";
import { motion } from "framer-motion";
import { FiUsers, FiBox, FiClipboard, FiTrendingUp } from "react-icons/fi";

const AdminOverview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="vibrant-card p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Loading Intelligence...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: analytics?.totalUsers || 0, icon: <FiUsers />, color: "bg-blue-500" },
    { label: "Active Items", value: analytics?.totalProducts || 0, icon: <FiBox />, color: "bg-green-500" },
    { label: "Rentals", value: analytics?.totalOrders || 0, icon: <FiClipboard />, color: "bg-purple-500" },
    { label: "Gross Revenue", value: `₹${analytics?.totalRevenue || 0}`, icon: <FiTrendingUp />, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="vibrant-card p-8 group overflow-hidden relative"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500`} />
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-xl shadow-lg shadow-black/5`}>
                {stat.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{stat.label}</span>
                <p className="text-4xl font-black text-black tracking-tighter mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="vibrant-card p-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-2xl font-black tracking-tight">REVENUE FLOW</h3>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mt-1">Monthly performance audit</p>
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black">Live Data</span>
          </div>
        </div>
        
        <div className="h-[400px]">
          <RevenueChart data={analytics?.monthlyRevenue || []} />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;