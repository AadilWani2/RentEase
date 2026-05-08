import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../features/auth/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loadingToast = toast.loading("Verifying identity...");
      await login(formData.email, formData.password);
      toast.dismiss(loadingToast);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center gap-2 mb-10 group">
            <span className="text-2xl font-black tracking-tighter text-black flex items-center gap-1">
              RentEase<span className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
            </span>
          </Link>
          <h1 className="text-5xl font-black text-black tracking-tighter leading-none uppercase">
            SIGN <span className="text-primary italic text-6xl">IN.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-6">Secure Access Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="vibrant-card p-12 bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Email Address</label>
            <div className="relative group">
              <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type="email"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white p-6 pl-16 rounded-[2rem] text-black text-sm font-bold placeholder:text-gray-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Password</label>
              <a href="#" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</a>
            </div>
            <div className="relative group">
              <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-xl" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white p-6 pl-16 rounded-[2rem] text-black text-sm font-bold placeholder:text-gray-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-5 h-5 rounded-md border-2 border-gray-100 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <FiCheckCircle className="text-primary opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remember this identity</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full pill-button py-6 text-lg group active:scale-[0.98]"
          >
            {loading ? "AUTHENTICATING..." : "CONTINUE"}
            {!loading && <FiArrowRight className="group-hover:translate-x-2 transition-transform" />}
          </button>
        </form>

        <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          NEW TO RENTEASE?{" "}
          <Link to="/register" className="text-black hover:text-primary transition-colors border-b-2 border-black/10 hover:border-primary pb-0.5">
            CREATE ACCOUNT
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;