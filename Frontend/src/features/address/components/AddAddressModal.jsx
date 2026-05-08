import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMapPin, FiCheck } from "react-icons/fi";
import { addAddress } from "../addressService";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const AddAddressModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    addressType: "Home",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      await addAddress(formData);
      toast.success("Destination saved to your profile");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return createPortal(
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative z-10 overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-2 block">Delivery Path</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase text-black">New Location</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-black hover:bg-primary hover:text-white transition-all"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="vibrant-input"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Apartment, suite, unit, building, floor, etc."
                value={formData.addressLine1}
                onChange={handleChange}
                className="vibrant-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="vibrant-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="vibrant-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="000 000"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="vibrant-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  className="vibrant-input"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="pill-button w-full py-5 mt-4 group"
            >
              {loading ? "Saving..." : "Add Location"}
              <FiCheck className="group-hover:scale-125 transition-transform" />
            </button>
          </form>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AddAddressModal;
