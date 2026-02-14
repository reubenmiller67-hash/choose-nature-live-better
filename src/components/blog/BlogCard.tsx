import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  tag: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
}

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
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
  );
}
