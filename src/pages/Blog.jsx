import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Calendar, ChevronRight } from 'lucide-react';

export default function Blog() {
  return (
    <div className="bg-surface-light min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80" alt="Blog Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-md">The Wellness Blog</h1>
          <p className="text-primary-50 text-lg md:text-xl">Insights, recipes, and science-backed tips for a healthier, happier you.</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12 flex-grow">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
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

      </div>
    </div>
  );
}
