import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
  {
    name: "Living Room",
    slug: "living-room",
    color: "bg-secondary",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Workspace",
    slug: "workspace",
    color: "bg-orange-100",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    color: "bg-blue-100",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-40 bg-white">
      <div className="vibrant-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl font-black text-black tracking-tighter"
          >
            Curated — <br />
            Collections.
          </motion.h2>
          <p className="text-text-muted text-lg max-w-sm font-medium mt-10 md:mt-0">
            Systems designed for your specific lifestyle needs. High-end rentals for every room.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative h-[500px] rounded-[3rem] overflow-hidden group border border-gray-100`}
            >
              <Link to={`/products?category=${cat.slug}`}>
                <div className={`absolute inset-0 ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <h3 className="text-4xl font-black text-white drop-shadow-lg">{cat.name}</h3>
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-primary group-hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      <FiArrowUpRight size={32} />
                    </div>
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