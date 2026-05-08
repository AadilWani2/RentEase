import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Header Accent */}
          <div className={`absolute top-0 left-0 w-full h-2 ${type === 'danger' ? 'bg-red-500' : 'bg-primary'}`} />

          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-gray-300 hover:text-black transition-colors"
          >
            <FiX size={24} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-10 ${type === 'danger' ? 'bg-red-50' : 'bg-primary/5'}`}>
              <FiAlertTriangle className={`text-5xl ${type === 'danger' ? 'text-red-500' : 'text-primary'}`} />
            </div>

            <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">{title}</h3>
            <p className="text-gray-400 font-bold text-sm mb-12 leading-relaxed">{message}</p>

            <div className="flex flex-col w-full gap-4">
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`w-full py-6 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all shadow-xl active:scale-95 ${
                  type === 'danger' 
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20' 
                    : 'bg-black text-white hover:bg-primary shadow-black/10'
                }`}
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="w-full py-6 rounded-full font-black text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmationModal;
