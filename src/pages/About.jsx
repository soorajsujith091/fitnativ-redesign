import { ShieldCheck, Heart, Leaf, Users, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-surface-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://fitnativ.in/wp-content/uploads/2025/05/1536-x-1024.png" alt="About Fitnativ" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-primary-900/80 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-md">Rooted in Wellness, Backed by Nature</h1>
        </div>
      </section>

      {/* Content Section with Image */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary-100 rounded-[3rem] transform -rotate-3 scale-105 origin-bottom-left transition-transform duration-500 hover:rotate-0"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img 
                  src="https://fitnativ.in/wp-content/uploads/2025/05/healthy-lifestyle-sustained-home-scaled.jpg" 
                  alt="Healthy Lifestyle" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg leading-none">100%</p>
                    <p className="text-gray-500 text-sm font-medium">Natural</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="max-w-xl">
              <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8 leading-tight">
                Redefining what healthy living looks and tastes like.
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p className="mb-6">
                  <span className="font-bold text-gray-900">At Fitnativ</span>, whether you're watching your sugar, caring for your gut, or just aiming to live better, our products make wellness a seamless part of your daily routine.
                </p>
                <p>
                  We believe wellness shouldn't feel like a sacrifice — so we've created clean, effective, and flavor-forward solutions that actually work. From monk fruit sweeteners to gut-friendly fibers and probiotics, Fitnativ is here to support your goals with <span className="font-bold text-primary-600">clarity, transparency, and care</span>.
                </p>
              </div>
              <div className="mt-10 flex gap-4">
                <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-50 px-5 py-3 rounded-xl border border-gray-100">
                  <ShieldCheck className="text-primary-500" size={20} />
                  Clean Labels
                </div>
                <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-50 px-5 py-3 rounded-xl border border-gray-100">
                  <Heart className="text-primary-500" size={20} />
                  Effective Formulas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="bg-primary-50/50 p-10 rounded-[2.5rem] border border-primary-100/50">
               <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Our Mission</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                 To empower individuals and families to take control of their health through clean, functional, and plant-based nutrition. With thoughtfully crafted products like natural sweeteners, prebiotics, probiotics, and digestive support.
               </p>
            </div>
            <div className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100">
               <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Our Vision</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                 To create a world where wellness and enjoyment go hand in hand — where everyone can embrace healthier choices without giving up the everyday pleasures they love.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Purity */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Purity</h3>
              <p className="text-gray-600 leading-relaxed">We keep it clean and real — no fillers, no artificial additives, and no hidden ingredients. Every Fitnativ product is crafted with purity at its core, using nature's best.</p>
            </div>
            
            {/* Transparency */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">You deserve to know what you're putting into your body. From honest labels to responsible sourcing, we believe in full transparency at every step.</p>
            </div>
            
            {/* Wellness First */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Wellness First</h3>
              <p className="text-gray-600 leading-relaxed">Your well-being drives everything we do. Our formulas are thoughtfully designed to support gut health, reduce sugar, boost energy, and empower healthier habits — naturally.</p>
            </div>

            {/* Innovation Rooted in Nature */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Innovation Rooted in Nature</h3>
              <p className="text-gray-600 leading-relaxed">We blend time-tested ingredients with modern science to create functional, effective solutions that support your lifestyle — without compromise.</p>
            </div>

            {/* Inclusivity */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Inclusivity</h3>
              <p className="text-gray-600 leading-relaxed">Health isn't one-size-fits-all. Whether you follow keto, paleo, diabetic-friendly, or plant-based diets — our products are made to fit your needs and fuel your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-primary-50 rounded-[3rem] p-8 md:p-12 lg:p-16 border border-primary-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Founder Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-200 rounded-[2.5rem] transform rotate-3 scale-105"></div>
                  <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src="https://fitnativ.in/wp-content/uploads/2025/11/03-1-1.png" 
                      alt="Dr. Amsudhar T" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -bottom-6 -left-6 bg-white py-3 px-6 rounded-2xl shadow-lg border border-gray-100">
                    <p className="font-bold text-gray-900 leading-tight">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Founder Bio */}
              <div className="lg:col-span-7">
                <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4 block">Meet The Founder</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                  Dr. Amsudhar T
                </h2>
                <p className="text-sm font-medium text-primary-700 bg-white/60 inline-block px-4 py-2 rounded-full mb-8 border border-primary-200">
                  MBBS, PGDFM (CMC-VELLORE), PGCHOD
                </p>
                <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none mb-8">
                  <p>
                    With a deep-rooted foundation in medicine and a passion for holistic health, Dr. Amsudhar T founded Fitnativ to bridge the gap between clinical science and everyday nutrition. 
                  </p>
                  <p>
                    Seeing first-hand the impact that diet has on chronic health conditions, he set out to create a line of wellness products that are genuinely clean, scientifically backed, and accessible to everyone. His vision is a world where making the healthy choice doesn't mean sacrificing the foods and flavors people love.
                  </p>
                  <p>
                    Under his leadership, Fitnativ continues to innovate with purity and transparency at its core, empowering individuals to take control of their health naturally.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
