import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);
  const scrollerRef = useRef(null);
  const testimonialRef = useRef(null);
  const featuredRef = useRef(null);

  const scrollFeatured = (direction) => {
    if (featuredRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      featuredRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -142 : 142;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollTestimonial = (direction) => {
    if (testimonialRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      testimonialRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src="/hero_bg.png" alt="Healthy Active Lifestyle" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 text-center w-full px-4 pt-16 md:pt-10 flex flex-col items-center -mt-10 md:-mt-16 lg:-mt-24">
          <Link to="/product/daily-sweet" className="hidden md:inline-flex mb-6 md:mb-8 flex-col md:flex-row items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 md:py-3 rounded-full hover:bg-white/20 transition-colors animate-slide-up">
            <span className="bg-primary-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">30% OFF</span>
            <span className="text-white text-xs md:text-sm font-medium tracking-wide">The Sweetest Offer of the Season on Daily Sweet &rarr;</span>
          </Link>
          <h1 className="font-display text-white text-[64px] sm:text-[80px] md:text-[110px] lg:text-[140px] xl:text-[180px] leading-[0.85] md:leading-[0.8] tracking-tight drop-shadow-lg">
            SWEETNESS <br />
            THAT LOVES YOU.
          </h1>
        </div>

        {/* Frosted Glass Product Scroller */}
        <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-4 md:left-12 lg:left-16 bg-white/20 backdrop-blur-md border border-white/30 p-3 md:p-4 w-[220px] md:w-[280px] rounded-2xl shadow-2xl z-20">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <p className="text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Featured
            </p>
            <div className="flex gap-1 md:gap-1.5">
              <button onClick={() => scroll('left')} className="bg-white/80 p-1 hover:bg-white transition-colors rounded-full shadow text-gray-900">
                <ArrowLeft size={10} className="md:w-3 md:h-3" />
              </button>
              <button onClick={() => scroll('right')} className="bg-white/80 p-1 hover:bg-white transition-colors rounded-full shadow text-gray-900">
                <ArrowRight size={10} className="md:w-3 md:h-3" />
              </button>
            </div>
          </div>
          
          <div ref={scrollerRef} className="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.slug}`} key={product.id} className="w-[110px] md:w-[130px] shrink-0 snap-start bg-white p-2 md:p-2.5 rounded-xl shadow group hover:shadow-md transition-shadow">
                <div className="w-full h-[70px] md:h-[100px] bg-gray-50 rounded-lg mb-1.5 md:mb-2 overflow-hidden relative p-1 flex items-center justify-center">
                  <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                </div>
                <h4 className="font-semibold text-gray-900 text-[10px] md:text-[11px] mb-0.5 md:mb-1 truncate leading-tight">{product.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-primary-600 font-bold text-[10px] md:text-xs">₹{product.price}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors text-primary-600 font-bold text-xs"
                    title="Add to Cart"
                  >
                    +
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full bg-primary-500 py-4 lg:py-5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-8 lg:gap-16 w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 lg:gap-16">
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                30% OFF DAILY SWEET <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                100% Natural <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                Zero Calories <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                Gut Health <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                Sugar-Free <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                Plant-Based <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                Premium Quality <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
              <span className="text-white text-sm lg:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-8 lg:gap-16">
                No Sugar Spikes <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-Only Promotional Banner */}
      <div className="md:hidden bg-[#f7f5f0] border-b border-gray-200 py-3 px-4">
        <Link to="/product/daily-sweet" className="flex items-center justify-between gap-3 max-w-[400px] mx-auto active:scale-[0.98] transition-transform">
          <div className="flex items-center gap-3 truncate">
            <span className="bg-accent text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-sm shrink-0 tracking-wide">
              30% OFF
            </span>
            <p className="text-gray-900 font-semibold text-xs leading-tight truncate">
              The Sweetest Offer on Daily Sweet
            </p>
          </div>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
            <ArrowRight size={12} className="text-accent" />
          </div>
        </Link>
      </div>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Header & Controls */}
          <div className="flex flex-row items-center justify-between gap-4 mb-6 md:mb-10 px-2">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] text-primary-900 tracking-tight">
              Featured Products
            </h2>
            <div className="flex gap-2">
              <button onClick={() => scrollFeatured('left')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-900 hover:border-primary-200 transition-colors shadow-sm">
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => scrollFeatured('right')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-900 hover:border-primary-200 transition-colors shadow-sm">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div ref={featuredRef} className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Intro Card */}
            <div className="min-w-[240px] md:min-w-[280px] lg:min-w-[320px] max-w-[260px] md:max-w-[340px] shrink-0 snap-start bg-[#E8F3FA] rounded-2xl md:rounded-[24px] p-6 md:p-8 flex flex-col justify-between">
              <p className="text-primary-900 text-lg md:text-[22px] leading-snug tracking-tight pr-2 font-medium">
                Proprietary blend of natural extracts and more to revitalize and replenish.
              </p>
              <Link to="/shop" className="inline-flex items-center justify-between bg-white text-primary-900 text-[10px] md:text-xs font-semibold px-4 py-2.5 md:px-5 md:py-3 rounded-full hover:shadow-md transition-shadow mt-8 border border-primary-900/10 w-fit gap-3">
                shop all products <ArrowRight size={14} />
              </Link>
            </div>

            {/* Product Cards */}
            {products.slice(0, 4).map((product, idx) => (
              <div key={product.id} className="min-w-[220px] md:min-w-[280px] lg:min-w-[320px] max-w-[240px] md:max-w-[340px] shrink-0 snap-start flex flex-col group cursor-pointer">
                
                {/* Image Box */}
                <div className="relative w-full aspect-square bg-[#F8F9FA] rounded-2xl md:rounded-[24px] mb-4 p-4 md:p-8 flex items-center justify-center overflow-hidden">
                  {idx === 0 && (
                    <div className="absolute top-3 right-3 md:top-5 md:right-5">
                      <span className="flex items-center justify-center w-10 h-10 md:w-[52px] md:h-[52px] rounded-full bg-[#D8EFFF] text-primary-900 text-[8px] md:text-[10px] font-bold text-center leading-tight shadow-sm">
                        best<br/>seller
                      </span>
                    </div>
                  )}
                  <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img src={product.images[0]} alt={product.name} className="max-w-[80%] max-h-[90%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-sm" />
                  </Link>
                </div>

                {/* Details Box */}
                <div className="flex flex-col gap-1 px-1">
                  {/* Row 1: Title */}
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-bold text-sm md:text-base text-primary-900 lowercase leading-tight">{product.name}</h3>
                    </Link>
                  </div>

                  {/* Row 2: Flavor and Price */}
                  <div className="flex items-center justify-between text-xs md:text-[13px] mt-0.5">
                    <span className="text-gray-600 truncate mr-2">{product.badges[0]}</span>
                    <span className="text-gray-900 font-semibold shrink-0">₹{product.price}</span>
                  </div>

                  {/* Row 3: Tagline */}
                  <div className="flex items-center justify-between text-[10px] md:text-[11px] mt-1 mb-3">
                    <span className="text-gray-500 truncate" title={product.description}>{product.description}</span>
                  </div>
                  
                  {/* Row 4: Action */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full bg-primary-600 text-white font-bold py-2 md:py-2.5 rounded-xl text-xs hover:bg-primary-700 transition-colors mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="container mx-auto px-4 lg:px-16">

          {/* Section Marker */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
              A
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">About</span>
          </div>

          {/* Top Row: Heading and Text */}
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="flex-1">
              <h2 className="font-display text-[50px] md:text-[60px] lg:text-[75px] leading-[0.9] text-gray-900">
                NATURE'S SWEETNESS <br /> FOR YOUR DAILY LIFE
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 mb-8 max-w-2xl">
                <p className="leading-relaxed">
                  Fitnativ provides natural, zero-calorie sweeteners and gut-health blends designed for everyday living. From beginners learning the basics of clean eating to advanced wellness advocates.
                </p>
                <p className="leading-relaxed">
                  We combine traditional ingredients like Monk Fruit with modern nutrition science to help every person reach their full wellness potential without sacrificing taste.
                </p>
              </div>
              <div>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-gray-900 text-white px-6 py-4 font-semibold hover:bg-gray-800 transition-colors">
                  Shop Now
                  <span className="bg-primary-500 text-white p-1">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: Images and Stats */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left Column: Large Image & Overlay */}
            <div className="w-full lg:w-[58%] relative overflow-hidden bg-gray-100 aspect-[4/5] lg:aspect-square">
              <img src="/about_large.png" alt="Healthy Nutrition" className="w-full h-full object-cover" />

              {/* Overlay Boxes */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end">
                {/* Stats Box */}
                <div className="flex-1 bg-gray-900/90 backdrop-blur text-white flex divide-x divide-white/20">
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="text-primary-400 font-display text-3xl lg:text-4xl mb-1">100%</div>
                    <div className="text-[10px] lg:text-xs font-medium tracking-widest uppercase">Natural Ingredients</div>
                  </div>
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="text-primary-400 font-display text-3xl lg:text-4xl mb-1">0</div>
                    <div className="text-[10px] lg:text-xs font-medium tracking-widest uppercase">Calories & Spikes</div>
                  </div>
                </div>
                {/* Arrow Box */}
                <Link to="/about-us" className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-600/90 backdrop-blur flex items-center justify-center hover:bg-primary-500 transition-colors shrink-0">
                  <ArrowRight size={24} className="text-white transform -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Right Column: Small Image, Number, List */}
            <div className="w-full lg:w-[42%] flex flex-col pt-8 lg:pt-0">

              {/* Small Image */}
              <div className="w-full aspect-[4/3] lg:aspect-[4/3] bg-gray-100 overflow-hidden mb-12">
                <img src="/about_small.png" alt="Active Lifestyle" className="w-full h-full object-cover" />
              </div>

              {/* Huge Number & Text */}
              <div className="flex items-center gap-6 mb-8">
                <div className="font-display text-[100px] lg:text-[140px] leading-none text-primary-500 tracking-tighter">
                  100
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-gray-900 font-semibold text-lg lg:text-xl leading-tight">Percent</span>
                  <span className="text-gray-600 font-medium text-lg lg:text-xl leading-tight">Pure Wellness</span>
                </div>
              </div>

              {/* Bullet List */}
              <ul className="space-y-2 text-sm lg:text-base font-medium text-gray-700">
                <li className="flex items-center gap-3 before:w-1.5 before:h-1.5 before:bg-gray-900 before:rounded-full">Premium natural extracts</li>
                <li className="flex items-center gap-3 before:w-1.5 before:h-1.5 before:bg-gray-900 before:rounded-full">Modern nutrition science</li>
                <li className="flex items-center gap-3 before:w-1.5 before:h-1.5 before:bg-gray-900 before:rounded-full">Personalized wellness plans</li>
              </ul>

            </div>
          </div>
        </div>
      </section>


      {/* Spotlight Section - Daily Series & Weight Management */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">

            {/* Column 1: Text & Button */}
            <div className="flex flex-col justify-between py-2">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 mb-8 shadow-sm">
                  Spotlight
                </span>
                <h3 className="text-2xl lg:text-[32px] leading-snug font-medium text-gray-900 mb-8 font-sans">
                  Explore our Daily Series and Weight Management kits for everyday wellness.
                </h3>
              </div>
              <div>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Explore More <ArrowRight size={14} className="transform -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Column 2: Large Rounded Image Card - Daily Series */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-[4/5] h-full bg-primary-50 w-full group">
              <img src="https://fitnativ.in/wp-content/uploads/2023/08/daily-sweet-front-1.webp" alt="Daily Series" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent"></div>

              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-primary-900 text-xs font-bold uppercase tracking-wider">
                  Daily Series
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <p className="text-white font-medium text-lg leading-snug max-w-[200px]">
                  Sugar-free, prebiotic fiber, and synbiotic gut powder for daily health.
                </p>
                <Link to="/shop" className="w-10 h-10 rounded-full bg-white text-primary-900 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
                  <ArrowRight size={18} className="transform -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Column 3: Smaller Card & Nav - Weight Management */}
            <div className="flex flex-col justify-between h-full w-full">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-[4/5] bg-gray-100 h-full w-full group">
                <img src="/fit_gut.png" alt="Weight Management" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold uppercase tracking-wider">
                    Weight Management
                  </span>
                </div>

                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-medium text-lg">Tone Down Kit</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-4 block">The Fitnativ Promise</span>
            <h2 className="text-3xl lg:text-[40px] text-gray-900 tracking-tight font-display">
              Uncompromising Quality
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Badge 1 */}
            <div className="bg-gray-50 rounded-[2rem] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-primary-50 transition-colors duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-600 text-2xl lg:text-3xl">🌿</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-3">Real ingredients</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Made with 100% natural, plant-based extracts.</p>
            </div>

            {/* Badge 2 */}
            <div className="bg-gray-50 rounded-[2rem] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-primary-50 transition-colors duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-600 text-2xl lg:text-3xl">🔬</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-3">Science-Backed</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Formulated based on modern nutritional science.</p>
            </div>

            {/* Badge 3 */}
            <div className="bg-gray-50 rounded-[2rem] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-primary-50 transition-colors duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-600 text-2xl lg:text-3xl">🚫</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-3">No Shortcuts</h4>
              <p className="text-sm text-gray-600 leading-relaxed">No artificial flavors, colors or preservatives.</p>
            </div>

            {/* Badge 4 */}
            <div className="bg-gray-50 rounded-[2rem] p-8 lg:p-10 flex flex-col items-center text-center group hover:bg-primary-50 transition-colors duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-600 text-2xl lg:text-3xl">🌱</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-3">Better For You</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Zero calories, zero sugar spikes, 100% guilt-free.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16 relative">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
            <h2 className="text-3xl lg:text-[40px] text-gray-900 tracking-tight font-display">
              Loved by our community
            </h2>
          </div>

          <div ref={testimonialRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Card 1 */}
            <div className="min-w-[300px] lg:min-w-[340px] max-w-[380px] shrink-0 snap-start bg-[#F9F9F9] rounded-3xl p-8 flex flex-col justify-between border border-gray-100">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 block">Daily Sweet Buyer</span>
                <p className="text-gray-900 font-medium text-lg leading-snug mb-10">
                  Swapping sugar used to mean sacrificing taste. But Fitnativ gives me the same sweet satisfaction, minus the guilt.
                </p>
              </div>
              <div className="flex flex-row items-end justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img src="https://ui-avatars.com/api/?name=Jagadhish+C&background=random" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Jagadhish C.K</h4>
                    <span className="text-[10px] text-gray-500">Morning Coffee Drinker</span>
                  </div>
                </div>
                <span className="text-5xl leading-none text-gray-900 font-serif rotate-180 transform -translate-y-2 inline-block">"</span>
              </div>
            </div>

            {/* Card 2 - Featured Gradient */}
            <div className="min-w-[300px] lg:min-w-[340px] max-w-[380px] shrink-0 snap-start rounded-3xl p-8 flex flex-col justify-between border border-gray-100 bg-gradient-to-br from-green-50 via-pink-50 to-blue-50">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4 block">Fit Gut Patient</span>
                <p className="text-gray-900 font-medium text-lg leading-snug mb-4">
                  In the realm of wellness, Fit Gut isn't just a supplement; it's a guardian of my daily health and digestion.
                </p>
                <div className="flex items-center gap-1 mb-8">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span className="text-xs font-bold text-gray-900 ml-1">4.8</span>
                </div>
              </div>
              <div className="flex flex-row items-end justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img src="https://ui-avatars.com/api/?name=Priya+M&background=random" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Priya M.</h4>
                    <span className="text-[10px] text-gray-500">Wellness Enthusiast</span>
                  </div>
                </div>
                <span className="text-5xl leading-none text-gray-900 font-serif rotate-180 transform -translate-y-2 inline-block">"</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="min-w-[300px] lg:min-w-[340px] max-w-[380px] shrink-0 snap-start bg-[#F9F9F9] rounded-3xl p-8 flex flex-col justify-between border border-gray-100">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 block">Daily Fiber User</span>
                <p className="text-gray-900 font-medium text-lg leading-snug mb-10">
                  Trust isn't given; it's earned. And this prebiotic blend didn't just earn my trust, but my complete admiration.
                </p>
              </div>
              <div className="flex flex-row items-end justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img src="https://ui-avatars.com/api/?name=Sneha+R&background=random" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Sneha R.</h4>
                    <span className="text-[10px] text-gray-500">Fitness Coach</span>
                  </div>
                </div>
                <span className="text-5xl leading-none text-gray-900 font-serif rotate-180 transform -translate-y-2 inline-block">"</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="min-w-[300px] lg:min-w-[340px] max-w-[380px] shrink-0 snap-start bg-[#F9F9F9] rounded-3xl p-8 flex flex-col justify-between border border-gray-100">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 block">K-Collagen Buyer</span>
                <p className="text-gray-900 font-medium text-lg leading-snug mb-10">
                  This isn't just about fixing skin issues; it's about creating radiant confidence from the inside out.
                </p>
              </div>
              <div className="flex flex-row items-end justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img src="https://ui-avatars.com/api/?name=Ravi+T&background=random" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Ravi T.</h4>
                    <span className="text-[10px] text-gray-500">Skincare Fanatic</span>
                  </div>
                </div>
                <span className="text-5xl leading-none text-gray-900 font-serif rotate-180 transform -translate-y-2 inline-block">"</span>
              </div>
            </div>

          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => scrollTestimonial('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => scrollTestimonial('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-surface-light border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-3 block">Wellness & Science</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">Latest from the Blog</h2>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors">
              View All Articles <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
              <article key={post.id} className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-medium">
                    <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center text-primary-600 font-bold text-sm mt-auto">
                    Read Article <ChevronRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/blog" className="inline-flex items-center justify-center w-full gap-2 text-primary-600 font-bold bg-white border border-primary-100 py-4 rounded-xl shadow-sm">
              View All Articles <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
