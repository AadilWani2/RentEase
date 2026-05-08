import {
  FiGrid,
  FiBox,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiGrid />,
    },
    {
      id: "products",
      label: "Products",
      icon: <FiBox />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FiClipboard />,
    },
    {
      id: "users",
      label: "Users",
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
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
      </div>
      
      <div className="mt-20 pt-10 border-t border-gray-200/50">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-4">
          v4.2.4 System Core
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;