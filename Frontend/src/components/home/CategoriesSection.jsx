import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
  {
    name: "Living Room",
    slug: "living-room",
    desc: "SOCIAL SPACES — ARCHITECTURAL COMFORT",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    grid: "lg:col-span-2"
  },
  {
    name: "Work Space",
    slug: "workspace",
    desc: "CREATIVE HUBS — FOCUSED DESIGN",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    grid: "lg:col-span-1"
  },
  {
    name: "Last Chance",
    slug: "last-chance",
    desc: "ARCHIVE — FINAL CURATIONS",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
    grid: "lg:col-span-3"
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="vibrant-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Modular Systems</span>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
              Explore — <br />
              <span className="text-primary italic">Atmospheres.</span>
            </h2>
          </motion.div>
          <p className="text-text-muted text-sm md:text-base max-w-xs font-bold leading-relaxed uppercase tracking-widest italic">
            Curating specific environments for the modern nomad.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-gray-100 ${cat.grid}`}
            >
              <Link to={`/products?category=${cat.slug}`} className="block h-full relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-700 z-10" />
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">0{idx + 1}</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-transparent transition-all">
                      <FiArrowUpRight size={20} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">{cat.desc}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;