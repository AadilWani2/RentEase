import { motion } from "framer-motion";
import { FiShield, FiLock, FiEye, FiServer } from "react-icons/fi";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "collection",
      icon: <FiEye />,
      title: "Data Acquisition",
      content: "We collect only the essential information required to provision your luxury rental experience. This includes identity verification, contact logistics, and preference analytics to better curate our collections for your residence."
    },
    {
      id: "security",
      icon: <FiLock />,
      title: "Secure Architecture",
      content: "Your data is preserved within an encrypted vault. We employ industry-leading protocols to ensure that your private information remains inaccessible to unauthorized entities. RentEase never sells your behavioral data."
    },
    {
      id: "cookies",
      icon: <FiServer />,
      title: "Digital Fingerprinting",
      content: "We use cookies to maintain your session integrity and remember your curation preferences. These small tokens allow for a seamless transition between our gallery sections and personalized discovery."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-40 overflow-hidden text-black">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-32"
        >
          <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-6 block">Legal Standards</span>
          <h1 className="text-7xl font-black tracking-tighter mb-12 uppercase leading-[0.9]">
            PRIVACY <br />
            <span className="text-primary italic">PROTOCOLS.</span>
          </h1>
          <p className="text-gray-400 font-bold text-xl leading-relaxed max-w-2xl">
            At RentEase, your privacy is treated with the same meticulous care as our designer furniture. 
            We are committed to total transparency in how we protect your digital residence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">
            {sections.map((section, idx) => (
              <motion.section 
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl text-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    {section.icon}
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase">{section.title}</h2>
                </div>
                <div className="pl-22">
                   <p className="text-lg text-gray-400 font-medium leading-loose max-w-3xl">
                     {section.content}
                   </p>
                   <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 italic text-sm text-text-muted font-medium">
                     "We believe that data security is a fundamental component of high-end service."
                   </div>
                </div>
              </motion.section>
            ))}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-20 border-t border-gray-100"
            >
              <h3 className="text-2xl font-black mb-8 tracking-tight uppercase">Last Updated: May 2026</h3>
              <p className="text-sm text-gray-400 font-bold tracking-widest uppercase">Version 4.2.0 — Secure Core</p>
            </motion.div>
          </div>

          <aside className="lg:col-span-4 h-fit sticky top-32">
             <div className="vibrant-card p-10 bg-gray-50 border border-gray-100">
                <h4 className="text-sm font-black text-black uppercase tracking-widest mb-10 border-b border-gray-200 pb-6">Summary Table</h4>
                <nav className="space-y-6">
                   {["Information Use", "Data Retention", "User Rights", "Security Measures"].map(item => (
                     <a 
                       key={item} 
                       href="#" 
                       className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-primary transition-all"
                     >
                       {item}
                     </a>
                   ))}
                </nav>
                <div className="mt-12 pt-10 border-t border-gray-200">
                   <div className="flex items-center gap-4 text-primary">
                      <FiShield className="text-2xl" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none">GDPR & CCPA <br /> COMPLIANT</span>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
