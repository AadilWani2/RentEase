import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    const loadingToast = toast.loading("Syncing with the gallery...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Welcome to the inner circle.");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative py-12 md:py-24 bg-black overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="vibrant-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase block">The Inner Circle</span>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Redefine <br />
              <span className="text-primary italic">Your</span> Living.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Subscribe to receive early access to seasonal curations, architectural insights, and exclusive member-only pieces.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-white text-lg font-bold placeholder:text-gray-600 focus:outline-none focus:border-primary transition-all uppercase tracking-widest"
                />
                <button 
                  type="submit"
                  className="bg-primary text-white px-12 py-6 md:py-0 rounded-[1.5rem] md:rounded-[2.5rem] text-sm font-black tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase shadow-2xl shadow-primary/20"
                >
                  Join Us
                </button>
              </div>
            </form>
          </div>

          {/* Decorative Stats */}
          <div className="pt-20 flex justify-center gap-12 md:gap-32">
            {[
              { label: "New Curations", val: "Weekly" },
              { label: "Design Support", val: "24/7" },
              { label: "Member Status", val: "Elite" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg font-black text-white uppercase">{stat.val}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Side Marker */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-10">
        <p className="text-[10px] font-black text-white uppercase tracking-[1em] rotate-90 origin-left">
          JOIN THE REVOLUTION
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
