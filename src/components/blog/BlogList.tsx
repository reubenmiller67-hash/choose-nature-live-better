import { blogPosts } from '../../data/blogPosts';
import BlogCard from './BlogCard';

export default function BlogList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
