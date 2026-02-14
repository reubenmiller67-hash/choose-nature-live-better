import { Link } from 'react-router-dom';

interface BlogPostData {
  id: string;
  title: string;
  tag: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

interface BlogPostProps {
  post: BlogPostData;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/blog" className="inline-flex items-center gap-2 text-[#22C55E] font-medium mb-8 hover:underline">
        ← Back to Blog
      </Link>
      <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-8 bg-[#1B4332]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4">
        <span className="text-sm text-[#6B7280]">{formatDate(post.date)}</span>
        {post.tag && <span className="ml-2 text-sm text-[#22C55E] font-medium">{post.tag}</span>}
        <p className="text-sm text-[#6B7280]">{post.author}</p>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-4 mb-8">{post.title}</h1>
      <div className="prose prose-lg max-w-none text-[#1A1A1A] leading-relaxed">
        {post.excerpt && <p className="text-lg text-[#6B7280] mb-6">{post.excerpt}</p>}
        {post.content && (
          <div className="whitespace-pre-wrap">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
