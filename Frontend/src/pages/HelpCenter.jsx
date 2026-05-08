import { motion } from "framer-motion";
import { FiSearch, FiTruck, FiCreditCard, FiRefreshCw, FiHelpCircle, FiArrowRight, FiMail, FiMessageCircle } from "react-icons/fi";

const HelpCenter = () => {
  const categories = [
    {
      icon: <FiTruck />,
      title: "Delivery & Setup",
      desc: "Questions about logistics, shipping times, and assembly services.",
      topics: ["Standard Delivery Timeline", "White Glove Assembly", "Delivery Rescheduling"]
    },
    {
      icon: <FiCreditCard />,
      title: "Payments & Security",
      desc: "Information on rental plans, deposits, and secure transactions.",
      topics: ["How Security Deposits Work", "Changing Payment Methods", "Billing Cycles"]
    },
    {
      icon: <FiRefreshCw />,
      title: "Returns & Swaps",
      desc: "Our flexible policies for ending a rental or choosing a new piece.",
      topics: ["Requesting an Item Swap", "Return Process Walkthrough", "Condition Guidelines"]
    },
    {
      icon: <FiHelpCircle />,
      title: "Rental Basics",
      desc: "New to RentEase? Start here to understand our core model.",
      topics: ["Choosing the Right Tenure", "KYC Requirements", "Damage Protection Plans"]
    }
  ];

  const faqs = [
    { q: "Can I buy the furniture I'm renting?", a: "Absolutely. We offer a 'Rent-to-Own' program where your previous rent payments contribute toward the purchase price." },
    { q: "What happens if I move houses?", a: "Just let us know! We offer relocation services for your rented furniture within our operating cities for a small fee." },
    { q: "Is insurance included in the rent?", a: "We offer a 'RentEase Shield' protection plan that covers minor wear and accidental damage for total peace of mind." },
    { q: "What if I want to cancel early?", a: "You can cancel anytime. We just ask for a 30-day notice to arrange pick-up and coordinate logistics." }
  ];

  return (
    <div className="min-h-screen bg-white py-40 overflow-hidden text-black">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-6 block">Support Hub</span>
          <h1 className="text-7xl font-black tracking-tighter mb-12 uppercase">
            HOW CAN WE <br />
            <span className="text-primary italic">HELP?</span>
          </h1>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full group-focus-within:bg-primary/10 transition-all" />
            <div className="relative flex items-center bg-gray-50 border-2 border-transparent focus-within:border-primary focus-within:bg-white rounded-[3rem] px-10 py-6 shadow-sm transition-all">
              <FiSearch className="text-3xl mr-6 text-gray-300 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH FOR TOPICS, FAQS, OR GUIDES..."
                className="w-full bg-transparent text-lg font-bold placeholder:text-gray-200 focus:outline-none uppercase tracking-widest"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-32">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="vibrant-card p-12 bg-white border border-gray-100 group hover:border-primary transition-all shadow-xl shadow-gray-200/50"
            >
              <div className="flex items-start gap-8">
                <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-3xl text-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3 tracking-tight uppercase">{cat.title}</h3>
                  <p className="text-gray-400 font-medium mb-8 text-sm leading-relaxed">{cat.desc}</p>
                  <ul className="space-y-3">
                    {cat.topics.map(topic => (
                      <li key={topic}>
                        <button className="flex items-center gap-2 text-[10px] font-black text-black uppercase tracking-widest hover:text-primary transition-colors">
                          <FiArrowRight className="text-primary" />
                          {topic}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-20 items-start">
          <div className="lg:col-span-2">
             <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">POPULAR <span className="text-primary">QUESTIONS</span></h2>
             <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-primary transition-all"
                  >
                    <h4 className="text-lg font-black mb-4 tracking-tight uppercase">{faq.q}</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="vibrant-card p-12 bg-black text-white sticky top-32">
             <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-6 block">Still Curious?</span>
             <h3 className="text-3xl font-black mb-8 tracking-tighter uppercase leading-none">CONNECT WITH <br /> THE <span className="text-primary italic">GALLERY.</span></h3>
             <p className="text-gray-400 font-medium mb-10 text-sm leading-relaxed">Our curators are available 24/7 to assist with your residence transformation.</p>
             
             <div className="space-y-4">
                <button className="w-full bg-white/10 hover:bg-white hover:text-black py-5 rounded-full flex items-center justify-center gap-4 transition-all text-[10px] font-black uppercase tracking-widest">
                  <FiMail className="text-lg" />
                  Email Support
                </button>
                <button className="w-full bg-primary text-white hover:bg-white hover:text-black py-5 rounded-full flex items-center justify-center gap-4 transition-all text-[10px] font-black uppercase tracking-widest">
                  <FiMessageCircle className="text-lg" />
                  Live Curator Chat
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
