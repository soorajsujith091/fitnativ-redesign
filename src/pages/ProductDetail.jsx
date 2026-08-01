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
  const categoryProducts = products.filter(p => p.category === product?.category && p.id !== product?.id);
  const relatedProducts = (categoryProducts.length > 0 ? categoryProducts : products.filter(p => p.id !== product?.id)).slice(0, 4);
  
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
    <div className="bg-surface-light min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium mb-6 lg:mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </button>

        {/* --- TOP SECTION (Above Fold) --- */}
        <div className="flex flex-col lg:flex-row mb-16 lg:mb-24 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 bg-white p-4 lg:p-12">
            <div className="relative lg:sticky lg:top-32">
              <div className="bg-gray-50 rounded-2xl p-4 lg:p-8 mb-4 lg:mb-6 flex items-center justify-center aspect-square border border-gray-100">
                 <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide px-2 lg:px-0">
                {product.images.slice(0,4).map((img, idx) => (
                  <div key={idx} className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-white rounded-xl border-2 border-transparent hover:border-primary-500 p-2 cursor-pointer transition-colors shadow-sm bg-gray-50">
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details (Theme Background) */}
          <div className="w-full lg:w-1/2 bg-surface-light p-5 lg:p-12 flex flex-col">
            
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
              <h3 className="text-lg lg:text-xl text-gray-800 font-medium mb-3 lg:mb-4">{product.category}</h3>
              
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <div className="flex text-gray-900">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-gray-800">4.8 (1445 reviews)</span>
              </div>
              
              <p className="text-base lg:text-lg text-gray-800 leading-relaxed">{product.description}</p>
            </div>

            {/* Variant Selector */}
            <div className="flex flex-col gap-3 mb-6 lg:mb-8">
              {packOptions.map((pack) => {
                const isSelected = selectedPack === pack.id;
                const packPrice = (product.price * pack.multiplier).toFixed(0);
                const packOriginal = (product.price * pack.id).toFixed(0);
                
                return (
                  <div key={pack.id} className="flex flex-col">
                    <button 
                      onClick={() => setSelectedPack(pack.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        isSelected ? 'border-gray-900 bg-primary-50' : 'border-gray-900/20 hover:border-gray-900/50 hover:bg-primary-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-gray-900' : 'border-gray-900/40'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />}
                        </div>
                        <span className="font-bold text-gray-900 text-lg">{pack.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">₹ {packPrice}</span>
                        {pack.id > 1 && <span className="text-sm text-gray-900/60 line-through">₹ {packOriginal}</span>}
                      </div>
                    </button>
                    {isSelected && (
                      <div className="pl-14 pr-4 py-4 text-gray-800 space-y-2">
                        <li className="text-sm">Includes {pack.id} month supply of premium {product.category.toLowerCase()}.</li>
                        <li className="text-sm">Enjoy maximum savings and consistent results.</li>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Row */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex h-14 w-full">
                {/* Quantity */}
                <div className="flex items-center bg-gray-100 border-y-2 border-l-2 border-gray-900 rounded-l-xl w-32 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full flex items-center justify-center text-gray-900 hover:bg-black/5 transition-colors rounded-l-xl font-bold text-xl">-</button>
                  <span className="w-10 text-center font-bold text-lg text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-900 hover:bg-black/5 transition-colors font-bold text-xl">+</button>
                </div>
                
                {/* Buy Button */}
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-full border-2 border-gray-900 rounded-r-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    isAdded ? 'bg-green-600 text-white border-green-600' : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isAdded ? 'Added to Cart' : 'Buy It Now'}
                </button>
              </div>
            </div>

            {/* Upsell Banner */}
            {relatedProducts.length > 0 && (
              <div className="bg-primary-50 rounded-xl p-4 flex items-center gap-4 border border-gray-900/10">
                <div className="w-16 h-16 bg-white rounded-lg p-2 shrink-0 border border-gray-900/10">
                  <img src={relatedProducts[0].images[0]} alt={relatedProducts[0].name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">Add {relatedProducts[0].name.split('–')[0].trim()} to your cart</h4>
                  <p className="text-sm text-gray-800">Perfect pairing for better results.</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* --- MIDDLE SECTION (Below Fold Content) --- */}
        
        {/* Section 1: Timeline Reset (Why do a cleanse) */}
        <div className="py-16 md:py-24 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">The 14-Day Reset</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">Your gut microbiome needs time to flush out toxins and rebuild a healthy environment. Here is what to expect over your 14-day journey.</p>
              <div className="space-y-8">
                {[
                  { day: 'Days 1-3', title: 'Flushing out waste', desc: 'You may notice more frequent trips to the bathroom as your body begins eliminating built-up toxins.' },
                  { day: 'Days 4-7', title: 'Reduced Bloating', desc: 'As inflammation decreases, you will feel visibly lighter and experience less gas and discomfort.' },
                  { day: 'Days 8-14', title: 'Restored Energy', desc: 'With a cleaner gut, your body absorbs nutrients better, leading to sustained energy and improved mood.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary-600 mt-1"></div>
                      {i !== 2 && <div className="w-0.5 h-full bg-primary-100 mt-2"></div>}
                    </div>
                    <div className="pb-8">
                      <span className="text-primary-600 font-bold text-sm tracking-wider uppercase mb-1 block">{item.day}</span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[350px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Wellness" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Trial Results */}
        <div className="py-16 md:py-20 bg-primary-50 rounded-[2.5rem] md:rounded-[3rem] my-12 px-6 lg:px-16 border border-primary-100">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 md:mb-6 leading-tight">Clinically Proven Results</h2>
            <p className="text-base md:text-lg text-gray-700">In a recent 30-day clinical study involving 150 participants with digestive issues, the results spoke for themselves.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { percent: '79%', label: 'Reported significantly less bloating after meals.' },
              { percent: '85%', label: 'Experienced more regular, comfortable bowel movements.' },
              { percent: '72%', label: 'Felt a noticeable increase in daily energy levels.' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-4 border-primary-500 flex items-center justify-center mb-6 bg-white shadow-xl">
                  <span className="text-4xl font-display font-bold text-primary-600">{stat.percent}</span>
                </div>
                <p className="text-gray-800 font-medium text-lg leading-snug max-w-[250px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Brand Stats & Ingredients */}
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
              <div className="bg-gray-900 rounded-3xl p-8 lg:p-10 flex flex-col justify-center min-h-[250px] md:min-h-[300px]">
                <div className="flex items-baseline mb-4 text-white">
                  <span className="text-xl font-bold mr-2 tracking-widest text-primary-400">NO.</span>
                  <span className="text-6xl md:text-8xl font-display font-bold">1</span>
                </div>
                <p className="text-white/80 text-base md:text-lg leading-snug">Pioneering Natural Health and Nutrition Science.</p>
              </div>
              <div className="bg-surface-light border border-gray-200 rounded-3xl p-8 lg:p-10 flex flex-col justify-center min-h-[200px] md:min-h-[250px]">
                <div className="text-4xl md:text-5xl font-display font-bold leading-none mb-2 text-gray-900">1M+</div>
                <div className="text-primary-600 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Happy Users</div>
                <p className="text-gray-600 leading-snug text-sm md:text-base">Science-backed, habit-changing, life-improving.</p>
              </div>
            </div>
            
            <div className="lg:col-span-8 bg-gray-50 rounded-3xl p-8 lg:p-16 border border-gray-100 flex flex-col lg:flex-row items-center gap-10 md:gap-12">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">Powerful, Natural Ingredients</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Triphala Extract', desc: 'Ancient Ayurvedic remedy for gentle detoxification.' },
                    { name: 'Senna Leaves', desc: 'Promotes healthy and regular bowel movements.' },
                    { name: 'Prebiotic Fiber', desc: 'Feeds the good bacteria in your gut to restore balance.' }
                  ].map((ing, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{ing.name}</h4>
                      <p className="text-gray-600 text-sm">{ing.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                  <img src={product.images[0]} alt="Ingredients" className="relative z-10 w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Detailed How to Use */}
        <div className="py-16 md:py-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-[300px] md:h-auto">
              <img src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80" alt="Drinking water" className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 md:p-10 lg:p-16 flex flex-col justify-center bg-gray-50">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">How to take it?</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Twist & Sip</h4>
                    <p className="text-gray-600 text-sm mt-1">Shake well before use. Twist the cap and drink the shot directly.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Timing Matters</h4>
                    <p className="text-gray-600 text-sm mt-1">Take one shot daily before bedtime. Do not eat anything after taking the shot.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Stay Hydrated</h4>
                    <p className="text-gray-600 text-sm mt-1">Drink plenty of water the following morning to aid the flushing process.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Instagram Reels Demo */}
        <div className="py-20 border-t border-gray-100">
          <div className="flex flex-col items-center text-center mb-12">
            <a href="https://www.instagram.com/fitnativ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">Follow us on Instagram</h2>
            <a href="https://www.instagram.com/fitnativ" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-primary-600 hover:text-primary-700 transition-colors">@fitnativ</a>
          </div>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide px-4 md:px-0">
            {[1, 2, 3, 4, 5].map((item) => (
              <a href="https://www.instagram.com/fitnativ" target="_blank" rel="noopener noreferrer" key={item} className="w-60 md:w-72 h-[400px] md:h-[480px] shrink-0 bg-gray-900 rounded-xl relative overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all">
                {/* Random lifestyle/fitness image as placeholder */}
                <img src={`https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400&h=800&sig=${item}`} alt="Instagram Reel" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                
                {/* Instagram UI Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                
                {/* Top Right: Reel Icon */}
                <div className="absolute top-4 right-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                </div>
                
                {/* Play Button Overlay (visible on hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/40">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white text-primary-700 flex items-center justify-center font-bold text-xs">FN</div>
                    <span className="font-semibold text-sm">fitnativ</span>
                  </div>
                  <p className="text-sm font-medium line-clamp-2 mb-3 opacity-90">Start your morning right with a quick cleanse! 🌿💧 #guthealth #fitnativ</p>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold opacity-80">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      {(Math.random() * 10 + 1).toFixed(1)}k
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      {Math.floor(Math.random() * 200 + 10)}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="py-16 md:py-20 max-w-3xl mx-auto border-t border-gray-100">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is this safe for daily use?", a: "Yes, our formula is designed specifically for daily consumption and is safe for long-term use." },
              { q: "Can I take this on an empty stomach?", a: "Absolutely. The natural ingredients are gentle on the digestive tract and will not cause nausea if taken without food." },
              { q: "When will I see results?", a: "Many users report improved energy and digestion within the first 3 days, with optimal results after 2 weeks of consistent use." },
              { q: "Are there any artificial sweeteners?", a: "No. We never use artificial sweeteners, flavors, or preservatives in any of our products." },
              { q: "Do the shots need to be refrigerated?", a: "No, they are shelf-stable. Keep them in a cool, dry place away from direct sunlight." },
              { q: "Can I take this with my current medication?", a: "If you are pregnant, nursing, or taking any medications, we recommend consulting your healthcare provider before starting any new supplement regimen." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-primary-300 transition-colors">
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 md:p-6 font-bold text-gray-900 text-left"
                >
                  <span className="pr-4 text-base md:text-lg">{faq.q}</span>
                  {openFAQ === idx ? <ChevronUp size={24} className="text-primary-600 shrink-0"/> : <ChevronDown size={24} className="text-gray-400 shrink-0"/>}
                </button>
                {openFAQ === idx && (
                  <div className="p-4 pt-0 md:p-6 md:pt-0 text-gray-600 leading-relaxed mt-2 text-base md:text-lg">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="py-16 md:py-20 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-12 md:mb-16 items-center md:items-start">
              <div className="text-center md:text-left shrink-0">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Customer Reviews</h2>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="text-5xl md:text-6xl font-display font-bold text-gray-900">4.8</div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 mb-1">
                      <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
                    </div>
                    <span className="text-gray-500 text-sm">Based on 1445 reviews</span>
                  </div>
                </div>
                <button className="bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-bold px-8 py-3 rounded-xl mt-4">Write a Review</button>
              </div>
              <div className="flex-1 w-full space-y-3 md:space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-4">
                    <span className="w-4 font-medium text-gray-600">{rating}</span>
                    <Star size={14} className="text-gray-400 shrink-0" fill="currentColor" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: rating === 5 ? '85%' : rating === 4 ? '10%' : '2%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[1, 2, 3, 4].map((review) => (
                <div key={review} className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-base md:text-lg">S</div>
                      <div>
                        <h5 className="font-bold text-gray-900">Sarah M.</h5>
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium mt-1">
                          <Check size={12} /> Verified Buyer
                        </div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Life changing product!</h4>
                  <p className="text-gray-600 leading-relaxed">"I was skeptical at first, but after just 4 days I noticed a massive difference in my bloating. By day 14, I felt lighter, more energetic, and my digestion is back on track. Will definitely be buying again."</p>
                  <div className="mt-6 text-sm text-gray-400">Posted 2 weeks ago</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="text-primary-600 font-bold hover:text-primary-700">Load More Reviews</button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-20 border-t border-gray-200">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-10 text-center">You Might Also Like</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-4 md:px-0 snap-x">
              {relatedProducts.map(p => (
                <Link to={`/product/${p.slug}`} key={p.id} className="w-72 md:w-80 shrink-0 group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col snap-start">
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
