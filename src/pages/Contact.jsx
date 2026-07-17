import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="bg-surface-light min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80" alt="Contact Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-md">Get in Touch</h1>
          <p className="text-primary-50 text-lg md:text-xl">We'd love to hear from you. Our team is always here to help with any questions about our products or your order.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12 flex-grow">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Contact Information */}
          <div className="bg-primary-900 text-white p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <p className="text-gray-300 mb-12">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <Phone className="text-primary-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-gray-300">+91 9666999627</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="text-primary-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-gray-300">info@fitnativ.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="text-primary-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-gray-300 leading-relaxed max-w-xs">
                      H.No: 24-7-185/2, Revenue Ward No 24, Magunta Layout, Nellore, 524002, Andhra Pradesh, India
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary-800 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-10 -right-10 w-40 h-40 bg-primary-700 rounded-full blur-2xl opacity-40"></div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:p-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
