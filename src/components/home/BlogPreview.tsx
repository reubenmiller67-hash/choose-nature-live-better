import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function BlogPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">BLOG POSTS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
          Enjoy the support of our faith-based community to keep you on track. 🌿
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="aspect-[16/10] bg-[#1B4332] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-[#6B7280]">{formatDate(post.date)}</span>
                  {post.tag && (
                    <span className="ml-2 text-sm text-[#22C55E] font-medium">{post.tag}</span>
                  )}
                  <p className="text-sm text-[#6B7280] mt-1">{post.author}</p>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mt-2 group-hover:text-[#22C55E] transition-colors">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold mt-4 group-hover:gap-2 transition-all">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
