import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiShield, FiStar } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-32 md:pt-40 pb-20 md:pb-40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[1000px] h-[300px] md:h-[1000px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        {/* Hero Section - Restored with refined smaller typography */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-4 block">Our Narrative</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9] uppercase">
              DESIGN — <br className="hidden md:block" />
              <span className="text-primary italic">FOR THE</span> <br className="hidden md:block" />
              CURIOUS.
            </h1>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-32 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
             <p className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tight">
              We believe your space should be as dynamic as your life. RentEase was founded to bridge the gap between high-end architectural design and the flexibility of modern living.
            </p>
            <div className="space-y-6 text-lg md:text-xl text-text-muted font-medium leading-relaxed">
              <p>
                In a world that's constantly moving, why should your furniture hold you back? Our curated collection is selected for those who value aesthetics, craftsmanship, and the freedom to evolve.
              </p>
              <p>
                From mid-century icons to contemporary masterpieces, we bring the world's most evocative pieces directly to your doorstep—without the permanence of ownership.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-gray-100 border border-gray-200 p-4">
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio Design" 
                className="w-full h-full object-cover rounded-[2rem] md:rounded-[3rem]"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 bg-black text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl scale-75 md:scale-100">
              <p className="text-3xl md:text-5xl font-black text-primary mb-2">10k+</p>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Spaces Transformed</p>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: <FiStar />, 
              title: "Curated Excellence", 
              desc: "Every piece in our collection is vetted by architectural historians and interior stylists." 
            },
            { 
              icon: <FiHeart />, 
              title: "Soulful Spaces", 
              desc: "We don't just rent furniture; we provide the foundation for your most meaningful memories." 
            },
            { 
              icon: <FiShield />, 
              title: "Absolute Ease", 
              desc: "Seamless delivery, expert staging, and white-glove care are included in every lease." 
            }
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="vibrant-card p-8 md:p-12 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                {pillar.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-4">{pillar.title}</h3>
              <p className="text-sm md:text-base text-text-muted font-bold leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="mt-40 mb-40 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 md:p-20 bg-gray-50 rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-xl">
              <FiHeart />
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mb-6 md:mb-8">The Vision</h3>
            <p className="text-lg md:text-2xl font-medium text-text-muted leading-relaxed">
              "We didn't just want to rent furniture. We wanted to curate a lifestyle that values quality over quantity, and experiences over ownership."
            </p>
            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-gray-200 flex flex-col items-center">
              <p className="font-black text-black uppercase tracking-widest text-xs">Adil & Team</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mt-2">Founding Visionaries</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black rounded-[2.5rem] md:rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 md:text-10 tracking-tighter uppercase leading-none">
              Start Your <br />
              <span className="text-primary italic">Next Chapter.</span>
            </h2>
            <Link to="/products" className="pill-button px-8 md:px-10 py-4 md:py-5 text-sm md:text-base">
              Browse Collection
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
