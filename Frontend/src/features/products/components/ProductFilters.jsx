import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const ProductFilters = ({ filters, setFilters }) => {
  const categories = [
    { label: "All Items", value: "" },
    { label: "Living Room", value: "living-room" },
    { label: "Workspace", value: "workspace" },
    { label: "Bedroom", value: "bedroom" },
    { label: "Appliances", value: "appliance" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-2">
        <FiFilter className="text-primary text-xl" />
        <h2 className="text-xl font-black text-black tracking-tight uppercase">Filter</h2>
      </div>

      {/* Search */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
          Search
        </label>
        <div className="relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
          <input
            type="text"
            placeholder="Find a piece..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-full text-black text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
          Collection
        </label>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={`text-left px-6 py-4 rounded-full text-sm font-bold transition-all ${
                filters.category === cat.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-text-muted hover:bg-gray-100 hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price */}
      <div className="space-y-6">
        <div className="flex justify-between items-end ml-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Max Monthly Rent
          </label>
          <span className="text-sm font-black text-primary">₹{filters.maxPrice || "5000"}</span>
        </div>
        <div className="relative pt-2">
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={filters.maxPrice || 5000}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value,
              })
            }
            className="w-full h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[8px] text-gray-300 font-black uppercase tracking-widest mt-4">
            <span>₹500</span>
            <span>₹10K+</span>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
          Sort By
        </label>
        <div className="relative group">
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value,
              })
            }
            className="w-full bg-white border border-gray-100 p-5 px-8 rounded-full text-black text-sm font-bold appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer"
          >
            <option value="">Featured</option>
            <option value="lowToHigh">Rent: Low to High</option>
            <option value="highToLow">Rent: High to Low</option>
          </select>
          <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none" />
        </div>
      </div>

      <button 
        onClick={() => setFilters({ search: "", category: "", maxPrice: "", sort: "" })}
        className="w-full py-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] hover:text-primary transition-colors pt-10 border-t border-gray-50"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;