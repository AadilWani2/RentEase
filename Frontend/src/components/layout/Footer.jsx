import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    const loadingToast = toast.loading("Connecting to gallery community...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Welcome to the community!");
      setEmail("");
    }, 1500);
  };
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16 overflow-hidden">
      <div className="vibrant-container">
        <div className="grid md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <Link to="/" className="text-3xl font-black tracking-tighter text-black flex items-center gap-1 mb-10">
              RentEase<span className="w-2 h-2 bg-primary rounded-full" />
            </Link>
            <p className="text-text-muted leading-relaxed max-w-sm mb-10 text-lg font-medium">
              Elevate your residence with curated designer furniture that speaks your language. Premium rentals for the modern soul.
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-8">Navigation</h3>
            <ul className="space-y-4">
              {["Home", "Products", "Categories", "About Us"].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(" ", "")}`} className="text-text-muted hover:text-primary transition-colors text-sm font-bold">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-8">Support</h3>
            <ul className="space-y-4">
              {[
                { name: "Help Center", path: "/help" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Use", path: "/terms" },
                { name: "Contact", path: "/help" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-text-muted hover:text-primary transition-colors text-sm font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-8">Newsletter</h3>
            <p className="text-text-muted text-sm mb-8 font-medium">Join our community for exclusive design updates and arrivals.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-full text-black text-sm font-bold focus:outline-none focus:border-primary transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-full text-xs font-black tracking-widest hover:bg-black transition-colors uppercase"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-gray-100 gap-8">
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
            © 2026 RENTEASE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <span className="text-text-muted text-xs font-bold uppercase tracking-widest">Premium Furniture</span>
            <span className="text-text-muted text-xs font-bold uppercase tracking-widest">Modern Rental</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;