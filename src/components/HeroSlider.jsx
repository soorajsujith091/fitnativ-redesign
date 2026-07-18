import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://fitnativ.in/wp-content/uploads/2023/11/Website-background-.jpg',
    tag: '100% Natural • Zero Calories',
    headline: (
      <>
        Sweetness <br className="hidden md:block" /> without sacrifice.
      </>
    ),
    subtext: "The honest alternative to refined sugar. Nature's sweetest gift, reimagined for your daily life.",
    buttons: [
      { text: 'Shop Now', link: '/shop', primary: true },
      { text: 'Our Story', link: '/about-us', primary: false }
    ],
    bgPosition: 'object-[80%_center] md:object-center'
  },
  {
    id: 2,
    image: 'https://fitnativ.in/wp-content/uploads/2025/05/healthy-lifestyle-sustained-home-scaled.jpg',
    tag: 'Prebiotic Power • Gut Health',
    headline: (
      <>
        Nourish your <br className="hidden md:block" /> gut daily.
      </>
    ),
    subtext: "Support your digestive health with our natural prebiotic fiber blend. Feel lighter and more energized.",
    buttons: [
      { text: 'Explore Daily Fiber', link: '/product/daily-fiber', primary: true }
    ],
    bgPosition: 'object-center'
  },
  {
    id: 3,
    image: 'https://fitnativ.in/wp-content/uploads/2025/05/athlete-playing-sport-with-hand-drawn-doodles-scaled.jpg',
    tag: 'Beauty & Wellness',
    headline: (
      <>
        Glow from <br className="hidden md:block" /> within.
      </>
    ),
    subtext: "Rejuvenate your skin, hair, and joints with our premium K-Collagen. Wellness that shows.",
    buttons: [
      { text: 'Shop K-Collagen', link: '/product/k-collagen-blueberry', primary: true }
    ],
    bgPosition: 'object-center'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden bg-gray-900 group">
      
      {/* Top Gradient for Header Visibility */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none"></div>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt="Slide Background"
              className={`w-full h-full object-cover ${slide.bgPosition}`}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Slide Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-10">
            
            <div className={`transition-all duration-700 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm tracking-widest uppercase mb-6 shadow-sm">
                {slide.tag}
              </span>
            </div>

            <div className={`transition-all duration-700 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-white mb-6 leading-[1.1] font-display drop-shadow-lg">
                {slide.headline}
              </h1>
            </div>

            <div className={`transition-all duration-700 delay-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-white/90 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
                {slide.subtext}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-1000 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {slide.buttons.map((btn, btnIdx) => (
                <Link
                  key={btnIdx}
                  to={btn.link}
                  className={`px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105 ${
                    btn.primary
                      ? 'bg-white text-primary-900 hover:bg-gray-100'
                      : 'bg-primary-600/80 backdrop-blur-md border border-primary-400 text-white hover:bg-primary-600'
                  }`}
                >
                  {btn.text}
                </Link>
              ))}
            </div>

          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 lg:px-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
