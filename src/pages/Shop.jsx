import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, ArrowDownUp, X } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-high':
        return [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'featured':
      default:
        return [...result].sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1));
    }
  }, [activeCategory, sortBy]);

  return (
    <div className="bg-surface-light min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" alt="Shop Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-md">Shop Fitnativ</h1>
          <p className="text-primary-50 text-lg md:text-xl">Discover our range of natural, zero-calorie, and gut-friendly products designed for your wellness journey.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 flex-grow">

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700 font-medium mr-2">
              <Filter size={20} />
              <span>Category:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden flex items-center justify-between w-full border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Filter size={20} />
              <span>Category: {activeCategory}</span>
            </div>
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-lg"
            >
              Filters
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto pt-2 md:pt-0">
            <ArrowDownUp size={20} className="text-gray-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map(product => (
            <Link to={`/product/${product.slug}`} key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.salePrice && (
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    SALE
                  </div>
                )}
                {product.badges && product.badges.includes('Flagship') && (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    PREMIUM
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-primary-600 font-semibold mb-2 uppercase tracking-wider">{product.category}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                  <div className="font-bold text-gray-900 text-xl">
                    ₹{product.salePrice || product.price}
                    {product.salePrice && <span className="text-sm text-gray-400 line-through ml-2 font-normal">₹{product.price}</span>}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-primary-600 text-white font-bold py-2 px-4 rounded-xl text-sm hover:bg-primary-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your category filter.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-6 text-primary-600 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Mobile Filter Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
        
        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-gray-900 p-2">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 flex-grow overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsMobileFilterOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center justify-between ${
                    activeCategory === cat 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && <div className="w-2 h-2 rounded-full bg-primary-600"></div>}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-primary-700 transition-colors"
            >
              Show Products
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
