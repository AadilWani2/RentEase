import {
  FiGrid,
  FiPackage,
  FiMapPin,
  FiTool,
} from "react-icons/fi";

const DashboardSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  const menuItems = [
    {
      id: "overview",
      label: "Profile",
      icon: <FiGrid />,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <FiPackage />,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: <FiMapPin />,
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: <FiTool />,
    },
  ];

  return (
    <div className="space-y-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 font-bold text-sm tracking-tight ${
            activeTab === item.id
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
              : "text-text-muted hover:bg-white hover:text-black"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
      
      <div className="mt-16 pt-8 border-t border-gray-200/50 px-4">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
          Member Since 2024
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;