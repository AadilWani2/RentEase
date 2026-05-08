import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../features/cart/cartService";
import { getAddresses } from "../features/address/addressService";
import { createOrder } from "../features/orders/orderService";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCheckCircle, FiArrowRight, FiPlus, FiShoppingBag } from "react-icons/fi";
import AddAddressModal from "../features/address/components/AddAddressModal";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cartData = await getCart();
      const addressData = await getAddresses();
      setCart(cartData);
      setAddresses(addressData);
      const defaultAddress = addressData.find((address) => address.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else if (addressData.length > 0) {
        setSelectedAddress(addressData[0]._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    try {
      const orderData = { addressId: selectedAddress };
      const order = await createOrder(orderData);
      toast.success("Order created successfully");
      navigate(`/payment/${order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-40 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Review & Confirm</span>
            <h1 className="text-7xl md:text-[8rem] font-black text-black tracking-tighter leading-none uppercase">
              Almost — <br />
              <span className="text-primary italic">HOME.</span>
            </h1>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Address Selection Section */}
            <section>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-2xl font-black tracking-tight uppercase text-black">Delivery Location</h2>
                  <p className="text-text-muted text-sm font-bold mt-1">Select where your pieces will be staged.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-all border-b-2 border-primary pb-1"
                >
                  <FiPlus />
                  Add New
                </button>
              </div>

              <AddAddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={fetchData} 
              />

              {addresses.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                  <p className="text-xl text-text-muted font-bold italic mb-8">No saved locations found.</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="pill-button"
                  >
                    Add First Location
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <motion.label
                      key={address._id}
                      whileHover={{ y: -5 }}
                      className={`relative p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 ${
                        selectedAddress === address._id
                          ? "bg-white border-primary shadow-2xl shadow-primary/10 scale-[1.02]"
                          : "bg-gray-50 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        className="hidden"
                        value={address._id}
                        checked={selectedAddress === address._id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      />
                      
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            selectedAddress === address._id ? "bg-primary text-white" : "bg-white text-text-muted"
                          }`}>
                            <FiMapPin className="text-xl" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-black text-lg text-black uppercase tracking-tight">{address.fullName}</h3>
                              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 rounded-full text-gray-400">
                                {address.addressType}
                              </span>
                            </div>
                            <p className="text-text-muted text-xs font-bold leading-relaxed">
                              {address.addressLine1}, {address.city} <br />
                              {address.state} {address.postalCode}
                            </p>
                          </div>
                        </div>
                        {selectedAddress === address._id && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <FiCheckCircle className="text-primary text-2xl" />
                          </motion.div>
                        )}
                      </div>
                    </motion.label>
                  ))}
                </div>
              )}
            </section>

            {/* Order Review Snippet */}
            <section className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <FiShoppingBag className="text-2xl text-black" />
                <h2 className="text-2xl font-black tracking-tight uppercase text-black">Order Review</h2>
              </div>
              <div className="space-y-4">
                {cart?.items?.map(item => (
                  <div key={item.product._id} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-4">
                      <img src={item.product.images[0]} alt="" className="w-16 h-16 object-cover rounded-xl" />
                      <div>
                        <p className="font-black text-sm uppercase text-black">{item.product.title}</p>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-black text-black">₹{item.product.monthlyRent}/mo</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="vibrant-card p-12 sticky top-32"
            >
              <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase text-black">Summary</h2>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Monthly Rent</span>
                  <span className="font-black text-black text-lg">₹{cart?.subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Security Deposit</span>
                  <span className="font-black text-primary text-lg">₹{cart?.totalSecurityDeposit}</span>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.3em]">TOTAL DUE</span>
                    <span className="text-5xl font-black text-black tracking-tighter">₹{cart?.totalAmount}</span>
                  </div>
                  <p className="text-[9px] text-text-muted font-black uppercase tracking-widest text-right mt-4 italic">
                    *Deposit fully refundable
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-12 w-full pill-button py-6 text-lg group"
              >
                Continue to Payment
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="mt-10 pt-10 border-t border-gray-50 flex flex-col items-center gap-4">
                <div className="flex gap-4 opacity-30 grayscale contrast-125">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                </div>
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Secure Payment System Active</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;