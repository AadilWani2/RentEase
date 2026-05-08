import { useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import OrdersSection from "../components/dashboard/OrdersSection";
import AddressesSection from "../components/dashboard/AddressesSection";
import MaintenanceSection from "../components/dashboard/MaintenanceSection";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <DashboardOverview />;
      case "orders": return <OrdersSection />;
      case "addresses": return <AddressesSection />;
      case "maintenance": return <MaintenanceSection />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-40 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <div className="mb-12">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Personal Gallery</span>
            <h1 className="text-7xl font-black text-black tracking-tighter leading-none uppercase">
              MY <br />
              <span className="text-primary italic">DASHBOARD.</span>
            </h1>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 h-fit sticky top-32"
          >
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-9"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[500px]"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;