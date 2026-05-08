import { useEffect, useState } from "react";
import { getAddresses } from "../../features/address/addressService";
import { FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import AddAddressModal from "../../features/address/components/AddAddressModal";

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
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
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Locating Assets...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase">Addresses</h2>
          <p className="text-text-muted text-sm font-bold mt-1">Staging locations for your rentals.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="pill-button px-8 py-3 text-xs"
        >
          <FiPlus size={18} />
          New Location
        </button>
      </div>

      <AddAddressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchAddresses} 
      />

      {addresses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100 border-dashed">
          <p className="text-xl text-text-muted font-bold italic">No addresses registered.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {addresses.map((address, idx) => (
            <motion.div
              key={address._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <FiMapPin className="text-xl" />
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">
                    {address.addressType}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-black mb-4">
                  {address.fullName}
                </h3>

                <p className="text-text-muted text-sm font-bold leading-relaxed mb-8">
                  {address.addressLine1} <br />
                  {address.city}, {address.state} — {address.postalCode}
                </p>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button className="text-[10px] font-black text-black uppercase tracking-widest hover:text-primary transition-colors">Edit</button>
                  <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesSection;