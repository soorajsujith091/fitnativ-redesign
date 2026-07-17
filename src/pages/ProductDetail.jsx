import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft, ChevronDown, ChevronUp, Star, ShieldCheck, Leaf, HeartPulse, Zap, Target, Moon, Activity } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  
  const [selectedPack, setSelectedPack] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('benefits');
  const [openFAQ, setOpenFAQ] = useState(null);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/shop" className="bg-primary-600 text-white px-6 py-3 rounded-full font-bold">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // In a real app, you'd add a separate product variant. Here we just use the base product.
    addToCart(product, quantity * selectedPack); 
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const packOptions = [
    { id: 1, name: '1 Month Supply', save: '', multiplier: 1 },
    { id: 2, name: '2 Month Supply', save: 'Save 15%', multiplier: 1.7 },
    { id: 3, name: '3 Month Supply', save: 'Save 25%', multiplier: 2.25 },
  ];

  const basePrice = product.salePrice || product.price;
  const currentPrice = (basePrice * packOptions.find(p => p.id === selectedPack).multiplier).toFixed(0);
  const originalPrice = (product.price * selectedPack).toFixed(0);

  return (
    <div className="bg-surface-light min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </button>

        {/* --- TOP SECTION (Above Fold) --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24">
          
          {/* Left Column: Image Gallery (Sticky) */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32">
              <div className="bg-white rounded-3xl p-8 mb-4 border border-gray-100 flex items-center justify-center aspect-square shadow-sm">
                 <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.slice(0,4).map((img, idx) => (
                  <div key={idx} className="w-24 h-24 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-2 cursor-pointer hover:border-primary-500 transition-colors">
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
              
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">₹{currentPrice}</span>
                {selectedPack > 1 && <span className="text-xl text-gray-400 line-through mb-1">₹{originalPrice}</span>}
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-1 ml-2">Inclusive of all taxes</span>
              </div>
            </div>


            {/* Add to Cart Sticky Action Bar */}
            <div className="flex gap-4 mb-10 bg-white p-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent rounded-2xl sticky bottom-0 z-40 sm:static border-t sm:border-t-0 border-gray-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] sm:shadow-none">
              <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white w-32 h-14 shrink-0 hidden sm:flex">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors">-</button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`flex-1 h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  isAdded ? 'bg-green-500 text-white shadow-lg' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-xl hover:-translate-y-1'
                }`}
              >
                {isAdded ? <><Check size={24} /> Added</> : <><ShoppingCart size={24} /> Add To Cart - ₹{currentPrice}</>}
              </button>
            </div>

            {/* Info Accordions */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              {[
                { id: 'benefits', title: 'Key Benefits', content: 'Supports deep sleep, accelerates muscle recovery, balances gut microbiome, and improves daily energy levels without the crash.' },
                { id: 'how-to-use', title: 'How To Use', content: 'Take 1 serving daily with water or your favorite beverage. For optimal benefits, consume 30 minutes before bedtime or directly after a workout.' },
                { id: 'ingredients', title: 'Ingredients', content: '100% natural, plant-based extract. No artificial sweeteners, no sugar alcohols, zero calories. Sourced directly from nature.' }
              ].map(acc => (
                <div key={acc.id} className="border-b border-gray-100 last:border-b-0">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between p-5 font-bold text-gray-900 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    {acc.title}
                    {openAccordion === acc.id ? <ChevronUp size={20} className="text-primary-600"/> : <ChevronDown size={20} className="text-gray-400"/>}
                  </button>
                  {openAccordion === acc.id && (
                    <div className="p-5 text-gray-600 leading-relaxed bg-white">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- MIDDLE SECTION (Below Fold Content) --- */}
        
        {/* Section 1: Split Layout (Image Left, Text Right) */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
            {/* Left Image Block */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px] lg:h-full">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80" alt="Active" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-12 left-0 right-0 text-center px-6">
                <span className="text-white/80 font-bold tracking-widest uppercase text-xs mb-3 block">Why this works better</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">Because Quality<br/>is Everything.</h2>
              </div>
            </div>
            
            {/* Right Text Block */}
            <div className="bg-[#f7f5f0] rounded-3xl p-10 md:p-16 flex flex-col justify-center h-full">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 text-center leading-tight">Built for daily energy,<br/>focus and recovery.</h2>
              <p className="text-gray-600 text-center text-lg mb-12 max-w-md mx-auto">Daily nutrition designed to help your body absorb, utilize, and benefit from essential natural ingredients.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-24 relative mt-8 sm:mt-16">
                {/* Desktop connecting lines */}
                <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 hidden sm:block"></div>
                <div className="absolute top-[-30px] left-[25%] right-[25%] h-px bg-gray-300 hidden sm:block"></div>
                <div className="absolute top-[-30px] left-[25%] w-px h-6 bg-gray-300 hidden sm:block"></div>
                <div className="absolute top-[-30px] right-[25%] w-px h-6 bg-gray-300 hidden sm:block"></div>
                
                <div className="text-center relative z-10 w-full sm:w-1/2">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Rest & Recovery</h4>
                  <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Encourages restorative sleep & daily recovery.</p>
                </div>
                <div className="text-center relative z-10 w-full sm:w-1/2">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Calm & Balance</h4>
                  <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Promotes relaxation & emotional balance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Bento Grid */}
        <div className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Top Left: Gut Friendly (Col span 7) */}
            <div className="md:col-span-7 bg-[#0b2b36] rounded-3xl p-10 relative overflow-hidden h-[300px]">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Gut-Friendly Formula</h3>
                <p className="text-white/70">Gentle on Sensitive Stomachs</p>
              </div>
              <img src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80" alt="Water" className="absolute top-0 right-0 h-full w-1/2 object-cover opacity-60 mix-blend-screen" />
            </div>

            {/* Top Right: 4 Icons (Col span 5) */}
            <div className="md:col-span-5 bg-[#0b2b36] rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 h-auto md:h-[300px]">
              {[
                { icon: Activity, title: 'Stress', desc: 'Daily stress can increase demands.' },
                { icon: Moon, title: 'Sleep', desc: 'Poor sleep may impact recovery.' },
                { icon: Target, title: 'Lifestyle', desc: 'Exercise can increase requirements.' },
                { icon: HeartPulse, title: 'Diet Gaps', desc: 'Modern diets often fall short.' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 flex flex-col items-center text-center h-full">
                  <span className="text-[10px] text-gray-400 font-bold self-start mb-2">0{i+1}</span>
                  <div className="w-12 h-12 bg-[#0b2b36] rounded-full text-white flex items-center justify-center mb-4 shrink-0">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Middle Left: No. 1 (Col span 4) */}
            <div className="md:col-span-4 bg-[#0b2b36] rounded-3xl p-10 flex flex-col justify-center min-h-[250px]">
              <div className="flex items-baseline mb-4 text-white">
                <span className="text-xl font-bold mr-2 tracking-widest">NO.</span>
                <span className="text-8xl font-display font-bold">1</span>
              </div>
              <p className="text-white/80 text-lg leading-snug">Pioneering Natural Health and Nutrition Science.</p>
            </div>

            {/* Middle Center: Product Image (Col span 4) */}
            <div className="md:col-span-4 bg-[#e8dcb8] rounded-3xl p-8 flex items-center justify-center min-h-[250px]">
               <img src={product.images[0]} alt={product.name} className="h-48 object-contain mix-blend-multiply drop-shadow-xl" />
            </div>

            {/* Middle Right: Recovery Image (Col span 4) */}
            <div className="md:col-span-4 bg-[#0b2b36] rounded-3xl overflow-hidden relative min-h-[250px] flex flex-col justify-end p-8">
               <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Recovery" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Recovery is more than rest.</h3>
                 <p className="text-white/70 text-sm">Recovery starts with better sleep, muscle function, and relaxation.</p>
               </div>
            </div>

            {/* Bottom Left: Users (Col span 4) */}
            <div className="md:col-span-4 bg-[#143c4a] rounded-3xl p-8 flex items-center gap-6 min-h-[150px]">
              <div className="text-white">
                <div className="text-5xl font-display font-bold leading-none mb-1">1M+</div>
                <div className="text-white/60 text-xs font-bold tracking-widest uppercase">Users</div>
              </div>
              <p className="text-white/80 text-sm leading-snug">Science-backed, habit-changing, life-improving.</p>
            </div>

            {/* Bottom Right: Foundation row (Col span 8) */}
            <div className="md:col-span-8 bg-[#f7f5f0] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 min-h-[150px]">
              <div className="sm:w-1/3">
                <span className="text-accent font-bold tracking-widest uppercase text-[10px] mb-2 block">Part of your daily foundation</span>
                <h3 className="text-xl font-display font-bold text-gray-900 leading-tight">A daily ritual for modern nutrition</h3>
              </div>
              <div className="sm:w-2/3 flex justify-between gap-2 sm:gap-4">
                 {[
                   { icon: HeartPulse, title: 'AFTER DINNER', desc: 'A simple addition to your evening routine.' },
                   { icon: Moon, title: 'BEFORE BED', desc: 'Supports relaxation and restful sleep.' },
                   { icon: Activity, title: 'ACTIVE DAYS', desc: 'Supports muscle recovery daily.' },
                 ].map((item, i) => (
                   <div key={i} className="text-center flex-1">
                     <div className="w-10 h-10 mx-auto border border-gray-300 rounded-full flex items-center justify-center mb-3">
                       <item.icon size={16} className="text-gray-600" />
                     </div>
                     <h5 className="text-[10px] font-bold text-gray-900 mb-1">{item.title}</h5>
                     <p className="text-[10px] text-gray-500 leading-tight hidden sm:block">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* FAQs */}
        <div className="py-20 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is this safe for daily use?", a: "Yes, our formula is designed specifically for daily consumption and is safe for long-term use." },
              { q: "Can I take this on an empty stomach?", a: "Absolutely. The natural ingredients are gentle on the digestive tract and will not cause nausea if taken without food." },
              { q: "When will I see results?", a: "Many users report improved energy and digestion within the first 3 days, with optimal results after 2 weeks of consistent use." },
              { q: "Are there any artificial sweeteners?", a: "No. We never use artificial sweeteners, flavors, or preservatives in any of our products." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 font-bold text-gray-900 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFAQ === idx ? <ChevronUp size={20} className="text-primary-600 shrink-0"/> : <ChevronDown size={20} className="text-gray-400 shrink-0"/>}
                </button>
                {openFAQ === idx && (
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-20 border-t border-gray-200">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-10 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden p-6">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-bold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">{p.name}</h4>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="font-bold text-gray-900 text-lg">₹{p.salePrice || p.price}</div>
                      <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        <ArrowLeft className="rotate-180" size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
