import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : (isHomePage ? 'bg-transparent py-6' : 'bg-white shadow-sm py-4')
    }`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/Fitnative Logo Final-01.png" 
            alt="Fitnativ Logo" 
            className={`h-8 lg:h-12 object-contain transition-all ${
              !scrolled && isHomePage ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-wide font-medium transition-colors ${
                !scrolled && isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={openCart}
            className={`relative p-2 transition-colors ${
              !scrolled && isHomePage ? 'text-white hover:text-primary-300' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
          
          <Link to="/shop" className="hidden lg:flex items-center gap-2 bg-white text-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors">
            Shop Now <span className="bg-primary-500 text-white p-0.5"><ArrowRight size={14} /></span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              !scrolled && isHomePage ? 'text-white' : 'text-gray-600'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-slide-up">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-3 px-4 text-gray-900 font-medium border-b border-gray-50 last:border-0 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
