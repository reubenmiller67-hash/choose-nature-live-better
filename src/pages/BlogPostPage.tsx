import { useParams, Navigate } from 'react-router-dom';
import BlogPost from '../components/blog/BlogPost';
import { blogPosts } from '../data/blogPosts';

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <BlogPost post={post} />
      </div>
    </section>
  );
}
