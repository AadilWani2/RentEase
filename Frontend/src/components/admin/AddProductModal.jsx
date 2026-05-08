import { useState } from "react";
import { createProduct } from "../../features/admin/adminProductService";
import { FiX, FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const AddProductModal = ({ closeModal, refreshProducts }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    monthlyRent: "",
    securityDeposit: "",
    stock: "",
    brand: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("availableQuantity", formData.stock);

      images.forEach((image) => {
        data.append("images", image);
      });

      await createProduct(data);
      toast.success("Piece added to collection");
      refreshProducts();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Integration failed");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999] p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[3.5rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100"
        >
          <div className="flex justify-between items-center p-12 pb-6">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-black uppercase">New Release</h2>
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mt-1">Add to the Collection</p>
            </div>
            <button onClick={closeModal} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-12 pt-6 space-y-10 max-h-[75vh] overflow-y-auto hide-scrollbar">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Product Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g. Barcelona Chair"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Category</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold appearance-none"
                >
                  <option value="">Select Class</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliance">Appliance</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Sub-Category</label>
                <input
                  type="text"
                  name="subCategory"
                  required
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder="E.g. Seating"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Designer / Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="E.g. Knoll"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Monthly Rent (₹)</label>
                <input
                  type="number"
                  name="monthlyRent"
                  required
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Security Deposit (₹)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  required
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Initial Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl focus:border-primary focus:outline-none transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Piece Description</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail the materials, designer intent, and conditions..."
                className="w-full bg-gray-50 border border-gray-100 p-6 rounded-[2rem] focus:border-primary focus:outline-none transition-all font-medium resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-black uppercase tracking-widest ml-2">Product Gallery</label>
              <div className="relative bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2.5rem] p-12 hover:border-primary transition-all cursor-pointer group text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <FiUploadCloud className="text-2xl text-primary" />
                  </div>
                  <p className="text-black font-black uppercase tracking-widest text-[10px]">
                    {images.length > 0 ? `${images.length} Images Selected` : "Upload Gallery Assets"}
                  </p>
                  <p className="text-[8px] text-text-muted font-bold uppercase tracking-[0.2em] mt-2">Maximum 5 High-Res Images</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-10 py-6 rounded-full font-black text-[10px] uppercase tracking-widest text-black bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all"
              >
                Abort
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] pill-button justify-center py-6"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Add to Collection"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AddProductModal;
