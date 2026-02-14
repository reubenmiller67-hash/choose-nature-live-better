import BlogCard from './BlogCard';

export interface BlogPostForList {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
}

interface BlogListProps {
  posts: BlogPostForList[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
