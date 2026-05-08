import { motion } from "framer-motion";
import { FiFileText, FiCheck, FiInfo } from "react-icons/fi";

const TermsOfUse = () => {
  const points = [
    {
      title: "Service Eligibility",
      text: "Users must be of legal age and provide valid identity verification to engage in rental contracts within our gallery."
    },
    {
      title: "Curation & Care",
      text: "You agree to treat our designer pieces with the respect they deserve. Any modifications or unauthorized alterations are strictly prohibited."
    },
    {
      title: "Subscription Model",
      text: "Rent is billed monthly in advance. Our automated system ensures your residence remains provisioned without interruption."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-40 overflow-hidden text-black">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-32"
        >
          <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-6 block">Engagement Framework</span>
          <h1 className="text-7xl font-black tracking-tighter mb-12 uppercase leading-[0.9]">
            TERMS OF <br />
            <span className="text-primary italic">USE.</span>
          </h1>
          <p className="text-gray-400 font-bold text-xl leading-relaxed max-w-2xl">
            The following guidelines define our mutual commitment to excellence and high-performance design standards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            {points.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="vibrant-card p-10 bg-white border border-gray-100 hover:border-primary transition-all shadow-lg shadow-gray-200/20"
              >
                 <div className="flex items-center gap-4 mb-6">
                    <FiCheck className="text-primary text-xl" />
                    <h3 className="text-xl font-black tracking-tight uppercase">{point.title}</h3>
                 </div>
                 <p className="text-gray-400 font-medium leading-relaxed">{point.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="vibrant-card p-12 bg-gray-50 border border-gray-100 h-fit">
             <div className="flex items-center gap-4 mb-8">
                <FiInfo className="text-black text-2xl" />
                <h4 className="text-sm font-black uppercase tracking-widest">Formal Documentation</h4>
             </div>
             <div className="space-y-8">
                <p className="text-sm text-text-muted leading-loose font-medium italic">
                  "RentEase reserves the right to update these protocols to maintain our gallery standards. Continued engagement with our services constitutes acceptance of these frameworks."
                </p>
                <div className="pt-8 border-t border-gray-200 flex flex-col gap-6">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Document ID</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-black">RE-TOU-2026-X</span>
                   </div>
                   <button className="pill-button w-full justify-center py-4 text-[10px]">
                      Download Full PDF
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
