import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 relative overflow-hidden mt-16 lg:rounded-t-[4rem]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-900/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-16 mb-16 border-b border-gray-800 pb-16">
          
          {/* Brand Col */}
          <div className="flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-8">
                <img 
                  src="/Fitnative Logo Final-01.png" 
                  alt="Fitnativ Logo" 
                  className="h-10 lg:h-14 object-contain brightness-0 invert" 
                />
              </Link>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-sm text-sm lg:text-base">
                Sweetness should come from nature, not labs. A healthier, more honest alternative to refined sugar and artificial sweeteners.
              </p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://instagram.com/fitnativ" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com/fitnativ" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://youtube.com/@fitnativ" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Shop', 'Blog', 'Contact Us'].map(link => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">Products</h4>
            <ul className="space-y-4">
              {['Daily Sweet', 'Daily Fiber', 'Fit Gut', 'Tone Down'].map(product => (
                <li key={product}>
                  <Link to={`/product/${product.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="flex flex-col justify-center h-10">
                  <span className="text-gray-400 text-xs mb-0.5">Call Us</span>
                  <span className="text-white text-sm font-medium">+91 9666999627</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
                  <Mail size={16} className="text-white" />
                </div>
                <div className="flex flex-col justify-center h-10">
                  <span className="text-gray-400 text-xs mb-0.5">Email Us</span>
                  <a href="mailto:info@fitnativ.in" className="text-white text-sm font-medium hover:text-primary-400 transition-colors">info@fitnativ.in</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="flex flex-col pt-2 max-w-[200px]">
                  <span className="text-gray-400 text-xs mb-1">Location</span>
                  <span className="text-white text-sm leading-relaxed">H.No: 24-7-185/2, Magunta Layout, Nellore, AP, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-medium">
          <p>Copyright 2025 &copy; Fitnativ | Made with ❤️ Creatox Designs</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
