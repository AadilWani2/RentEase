import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminOverview from "../components/admin/AdminOverview";
import AdminProducts from "../components/admin/AdminProducts";
import AdminOrders from "../components/admin/AdminOrders";
import AdminUsers from "../components/admin/AdminUsers";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <AdminOverview />;
      case "products": return <AdminProducts />;
      case "orders": return <AdminOrders />;
      case "users": return <AdminUsers />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-40 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Command Center</span>
            <h1 className="text-7xl font-black tracking-tighter leading-none">
              ADMIN <span className="text-primary italic">SYSTEM.</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-full border border-gray-100">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black">System Operational</span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;