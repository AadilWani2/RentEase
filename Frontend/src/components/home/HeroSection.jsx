import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-2 overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <div className="vibrant-container w-full">
        <div className="relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content Layer */}
          <div className="lg:col-span-6 z-20 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              
              <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase">
                Art — <br />
                <span className="text-primary italic">Meets</span> <br />
                Living.
              </h1>
              
              <p className="text-text-muted text-lg font-medium max-w-md leading-relaxed border-l-4 border-primary pl-6">
                Curating high-end designer pieces for spaces that demand more than just furniture. Rent the extraordinary.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/products" className="pill-button px-10 py-5 text-sm group">
                EXPLORE CATALOG
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
              <button className="flex items-center gap-4 text-xs font-black tracking-widest hover:text-primary transition-colors group uppercase">
                <span className="w-12 h-px bg-black group-hover:bg-primary transition-all" />
                View Lookbook
              </button>
            </motion.div>

            {/* Floating Specs */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-100">
              {[
                { label: "Designers", val: "40+" },
                { label: "Curations", val: "1.2k" },
                { label: "Materials", val: "Elite" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-black text-black">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Layer */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] md:aspect-square"
            >
              {/* Geometric Frame */}
              <div className="absolute inset-0 border-[20px] border-secondary/20 rounded-[4rem] -rotate-3 -z-10" />
              <div className="absolute inset-10 bg-white rounded-[3rem] shadow-2xl -z-10" />
              
              <img 
                src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop" 
                alt="Main Piece"
                className="w-full h-full object-contain p-12 drop-shadow-2xl"
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-10 md:bottom-20 -left-4 md:-left-10 bg-black text-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl scale-75 md:scale-100"
              >
                <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary mb-1">Curated Series</span>
                <span className="text-xl md:text-2xl font-bold">Limited Edition</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-gray-100 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-10 opacity-30 grayscale contrast-125">
          {["VOGUE", "DWELL", "LUXE", "CURBED", "WALLPAPER*"].map((brand) => (
            <span key={brand} className="text-lg md:text-2xl font-black tracking-tighter uppercase">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;