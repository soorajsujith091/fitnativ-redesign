import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogSingle() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h2>
        <Link to="/blog" className="text-primary-600 font-bold hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-32">
      {/* Header Image */}
      <div className="h-64 md:h-96 w-full relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative -mt-32 z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-16 border border-gray-100">
          
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 mb-8 hover:text-primary-700 transition-colors uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full">{post.category}</span>
            <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="lead text-xl text-gray-800 font-medium mb-8">
              {post.excerpt}
            </p>
            <p>
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            <h3>Key Takeaways</h3>
            <ul>
              <li>Maecenas faucibus mollis interdum.</li>
              <li>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</li>
              <li>Ullamcorper dictum magna.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
