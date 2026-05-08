import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-20 overflow-hidden bg-white">
      <div className="vibrant-container h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="flex items-center gap-3 text-primary mb-8">
              <FaStar className="sparkle-icon" />
              <span className="text-sm font-black uppercase tracking-widest">New Architectural Series</span>
            </div>
            
            <h1 className="text-5xl md:text-[6rem] lg:text-[7.5rem] font-black text-black leading-[0.9] mb-8 md:mb-12">
              Express — <br className="hidden md:block" />
              <span className="text-primary italic">Yourself</span> <br className="hidden md:block" />
              Through <br className="hidden md:block" />
              <span className="relative">
                Style.
                <span className="absolute bottom-1 md:bottom-4 left-0 w-full h-2 md:h-4 bg-secondary -z-10 rounded-full opacity-50" />
              </span>
            </h1>

            <p className="text-text-muted text-lg md:text-xl max-w-lg mb-10 md:mb-16 font-medium leading-relaxed">
              Elevate your residence with curated designer furniture that speaks your language. Premium rentals for the modern soul.
            </p>

            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <Link to="/products" className="pill-button group px-8 md:px-10 py-4 md:py-5 text-sm md:text-base">
                Explore Collection
                <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="text-black font-bold border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-all text-sm md:text-base">
                Our Story
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            {/* Wavy Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-secondary rounded-[100px] rotate-12 -z-10 opacity-30 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-secondary rounded-[100px] -z-10" />
            
            {/* Main Image */}
            <div className="relative z-10 p-4 md:p-10">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop" 
                alt="Designer Chair" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Accents */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center vibrant-shadow border border-gray-100"
              >
                <FaStar className="text-xl md:text-3xl text-primary sparkle-icon" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-10 md:bottom-20 -left-4 md:-left-10 bg-black text-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl scale-75 md:scale-100"
              >
                <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary mb-1">Curated Series</span>
                <span className="text-xl md:text-2xl font-bold">Limited Edition</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Brand Bar */}
        <div className="mt-20 md:mt-32 pt-10 md:pt-20 border-t border-gray-100 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-10 opacity-30 grayscale contrast-125">
          {["VOGUE", "DWELL", "LUXE", "CURBED", "WALLPAPER*"].map((brand) => (
            <span key={brand} className="text-lg md:text-2xl font-black tracking-tighter uppercase">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;