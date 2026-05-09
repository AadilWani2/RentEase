import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../features/auth/AuthContext";
import { useCart } from "../../features/cart/CartContext";
import { useWishlist } from "../../features/wishlist/WishlistContext";
import { getProducts } from "../../features/products/productService";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Velvet Sofas", "Minimalist Desks", "Oak Sideboards", "Modern Lighting"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Live Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const data = await getProducts({ search: searchQuery });
          setSearchResults(data.slice(0, 4));
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Our Story", path: "/about" },
    { name: "Curated", path: "/featured" },
    { name: "Living Room", path: "/products?category=living-room" },
    { name: "Work Space", path: "/products?category=workspace" },
    { name: "Last Chance", path: "/products?sale=true" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md py-4 border-b border-gray-100 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="vibrant-container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-primary transition-all rotate-3 group-hover:rotate-0">
              <span className="text-white font-black text-sm tracking-tighter">R</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-black uppercase">
              Rent<span className="text-primary italic">Ease.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-bold transition-all ${
                  location.pathname === link.path ? "text-primary" : "text-black hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 pr-6 border-r border-gray-200">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-black hover:text-primary transition-colors"
              >
                <FiSearch className="text-xl stroke-[2.5px]" />
              </button>
              <Link to="/wishlist" className="relative text-black hover:text-primary transition-colors">
                <FiHeart className="text-xl stroke-[2.5px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-black hover:text-primary transition-colors">
                <FiShoppingCart className="text-xl stroke-[2.5px]" />
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-5">
                  {user.role === "admin" && (
                    <Link 
                      to="/admin/dashboard" 
                      className="hidden md:block text-[10px] font-black tracking-widest bg-primary text-white px-3 py-1 rounded-full uppercase"
                    >
                      Admin
                    </Link>
                  )}
                  
                  <Link to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-primary transition-all relative">
                      {user.avatar ? (
                        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser className="text-xl" />
                      )}
                      {user.role === "admin" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                      )}
                    </div>
                  </Link>
                  
                  <button 
                    onClick={handleLogout} 
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-black hover:text-primary hover:border-primary transition-all"
                  >
                    <FiLogOut className="text-lg stroke-[2.5px]" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="pill-button px-6 py-2.5 text-xs"
                >
                  Login
                </Link>
              )}

              <button 
                className="lg:hidden text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col p-10 pt-32 lg:hidden"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-10 right-10 text-black">
              <FiX size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black text-black hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex justify-center gap-10">
               <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-black"><FiHeart /></Link>
               <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-black"><FiShoppingCart /></Link>
               <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-black"><FiUser /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-10"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-12 right-12 w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all text-2xl"
            >
              <FiX />
            </button>

            <div className="w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase mb-4 block">Discovery Gallery</span>
                <h2 className="text-4xl font-black text-black tracking-tighter uppercase">Find Your Next Piece</h2>
              </motion.div>

              <motion.form 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                onSubmit={handleSearchSubmit}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full group-focus-within:bg-primary/10 transition-all" />
                <div className="relative flex items-center bg-gray-50 border-2 border-transparent focus-within:border-primary focus-within:bg-white rounded-[3rem] px-12 py-8 shadow-sm transition-all">
                  <FiSearch className={`text-4xl mr-8 transition-all ${isSearching ? "text-primary animate-pulse" : "text-black"}`} />
                  <input 
                    autoFocus
                    type="text"
                    placeholder={`TRY "${placeholders[placeholderIndex]}"`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-3xl md:text-5xl font-black placeholder:text-gray-200 focus:outline-none uppercase tracking-tighter"
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <FiX className="text-2xl text-gray-400" />
                    </button>
                  )}
                </div>
                
                {isSearching && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-10 left-12 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">Curating results...</span>
                  </motion.div>
                )}
              </motion.form>

              {/* Live Results Section */}
              <div className="grid lg:grid-cols-4 gap-12 mt-20">
                <AnimatePresence>
                  {searchResults.length > 0 ? (
                    searchResults.map((product, idx) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => {
                          navigate(`/product/${product._id}`);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-100 mb-6 border border-gray-100 group-hover:border-primary transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10">
                          <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <h4 className="text-sm font-black text-black uppercase tracking-tight mb-1 truncate">{product.title}</h4>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">₹{product.monthlyRent}/MO</p>
                      </motion.div>
                    ))
                  ) : searchQuery.length > 2 && !isSearching ? (
                    <div className="lg:col-span-4 text-center py-10">
                      <p className="text-xl text-gray-300 font-bold italic uppercase tracking-tighter">No exact matches found... try something else?</p>
                    </div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">Trending:</span>
                {["Living Room", "Office", "Velvet Sofa", "Minimalist"].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      // Auto-submit after a tiny delay
                      setTimeout(() => {
                        navigate(`/products?search=${encodeURIComponent(tag)}`);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }, 100);
                    }}
                    className="text-[10px] font-black text-black uppercase tracking-widest px-4 py-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;