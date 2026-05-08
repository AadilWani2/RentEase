import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../features/products/productService";
import ProductCard from "../features/products/components/ProductCard";
import ProductFilters from "../features/products/components/ProductFilters";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse category from URL if present
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialSearch = queryParams.get("search") || "";

  const [filters, setFilters] = useState({
    search: initialSearch,
    category: initialCategory,
    maxPrice: "",
    sort: "",
  });

  // Sync filters if URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newCat = params.get("category") || "";
    const newSearch = params.get("search") || "";
    
    setFilters(prev => ({ 
      ...prev, 
      category: newCat,
      search: newSearch 
    }));
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sort) params.sort = filters.sort;

      const data = await getProducts(params);
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-32 pb-20 md:pb-40 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="vibrant-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-12"
        >
          <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] text-primary uppercase">
            {filters.category ? filters.category.replace("-", " ") : "The Catalog"} — Curated Selection
          </span>
        </motion.div>
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 h-fit md:sticky md:top-32"
          >
            <div className="bg-gray-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[4/5] rounded-[2rem] bg-gray-50 animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black text-black uppercase tracking-[0.2em] bg-white p-6 rounded-2xl px-10 border border-gray-100 shadow-sm">
                  <span>Showing {products.length} Items</span>
                  <span className="text-primary">Sort: {filters.sort || "LATEST"}</span>
                </div>

                <AnimatePresence mode="popLayout">
                  {products.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-40 bg-gray-50 rounded-[3rem] border border-gray-100"
                    >
                      <p className="text-2xl text-text-muted font-bold italic">No matching designs found.</p>
                      <button 
                        onClick={() => setFilters({ search: "", category: "", maxPrice: "", sort: "" })}
                        className="mt-8 text-primary font-black tracking-widest text-[10px] border-b-2 border-primary pb-1"
                      >
                        RESET FILTERS
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      layout
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10"
                    >
                      {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;