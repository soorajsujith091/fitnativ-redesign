import { ShieldCheck, Heart, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-surface-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80" alt="About Fitnativ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/70 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-md">Sweetness should come from nature, not labs.</h1>
          <p className="text-xl text-primary-50">Discover the honest alternative to refined sugar.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-16">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="text-2xl text-gray-900 font-medium mb-8 leading-snug">
              At Fitnativ, we believe that sweetness should come from nature — not from labs or synthetic chemicals.
            </p>
            <p>
              Our story begins with a simple goal: to offer a healthier, more honest alternative to refined sugar and artificial sweeteners. That goal led us to monk fruit, a small but mighty fruit used for centuries in traditional Eastern medicine for its natural sweetness and healing properties.
            </p>
            <p>
              Today, we carefully extract the fruit's powerful compounds to create a sweetener that is zero-calorie, zero-glycemic, and free from any aftertaste, fillers, or hidden additives.
            </p>
            <p>
              Fitnativ is more than just a sweetener brand — it's a lifestyle built on wellness, transparency, and balance. Whether you're managing blood sugar, reducing calorie intake, following keto or paleo diets, or simply aiming to live cleaner, Fitnativ makes it easy to make better choices without giving up the flavors you love.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Our Brand Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Leaf size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">100% Natural</h3>
              <p className="text-gray-600">Sourced directly from nature, ensuring every product is free from artificial fillers, chemicals, or synthetic additives.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">Zero Compromise</h3>
              <p className="text-gray-600">Enjoy the sweetness and benefits you crave with zero calories, zero sugar spikes, and absolutely no bitter aftertaste.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">Total Transparency</h3>
              <p className="text-gray-600">We believe in clean labels. What you see is what you get, providing you the confidence to live a healthier lifestyle.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
