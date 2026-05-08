import { useEffect, useState } from "react";
import { getAdminProducts, deleteProduct } from "../../features/admin/adminProductService";
import AddProductModal from "./AddProductModal";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit3, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "../ui/ConfirmationModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to sync inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const { id } = deleteConfirm;
    if (!id) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Piece archived successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed");
    } finally {
      setDeleteConfirm({ show: false, id: null });
    }
  };

  if (loading) {
    return (
      <div className="vibrant-card p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Syncing Catalog...</p>
      </div>
    );
  }

  return (
    <div className="vibrant-card p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">INVENTORY</h2>
          <p className="text-text-muted text-sm font-bold mt-1">Manage all rental pieces in the system.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="pill-button"
        >
          <FiPlus size={20} />
          New Release
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-gray-100 border-dashed">
          <p className="text-xl text-text-muted font-bold italic">The catalog is currently empty.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-10 px-10">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                <th className="px-6 pb-2">Reference</th>
                <th className="px-6 pb-2">Category</th>
                <th className="px-6 pb-2">Rent / Mo</th>
                <th className="px-6 pb-2 text-center">Status</th>
                <th className="px-6 pb-2 text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product, idx) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white group"
                  >
                    <td className="px-6 py-5 rounded-l-[1.5rem] border-y border-l border-gray-50 group-hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 p-2 overflow-hidden border border-gray-100 flex-shrink-0">
                          <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-black tracking-tight">{product.title}</span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{product.brand || "Standard Edition"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 border-y border-gray-50 group-hover:bg-gray-50 transition-colors">
                      <span className="text-xs font-bold text-black uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 border-y border-gray-50 group-hover:bg-gray-50 transition-colors">
                      <span className="font-black text-black text-lg">₹{product.monthlyRent}</span>
                    </td>

                    <td className="px-6 py-5 border-y border-gray-50 group-hover:bg-gray-50 transition-colors text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-black text-black">{product.stock}</span>
                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">In Stock</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 rounded-r-[1.5rem] border-y border-r border-gray-50 group-hover:bg-gray-50 transition-colors text-right">
                      <div className="flex justify-end gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm">
                          <FiEye />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm">
                          <FiEdit3 />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ show: true, id: product._id })}
                          className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddProductModal
          closeModal={() => setShowModal(false)}
          refreshProducts={fetchProducts}
        />
      )}

      <ConfirmationModal
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, id: null })}
        onConfirm={handleDelete}
        title="ARCHIVE PIECE"
        message="Are you sure you want to remove this piece from the active catalog? This action is reversible from the archive vault."
        confirmText="ARCHIVE NOW"
      />
    </div>
  );
};

export default AdminProducts;