import { useState, useEffect } from 'react';
import BlogList from '../components/blog/BlogList';
import { getPublishedPosts } from '../lib/posts';
import { blogPosts } from '../data/blogPosts';

export interface BlogPostForDisplay {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

function firestorePostToDisplay(post: {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  author: string;
  image: string;
  excerpt: string;
  content?: string;
  createdAt: { toDate?: () => Date } | Date;
}): BlogPostForDisplay {
  const d = post.createdAt instanceof Date
    ? post.createdAt
    : (post.createdAt as { toDate: () => Date }).toDate?.();
  const dateStr = d ? d.toISOString().slice(0, 10) : '';
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    tag: post.tag || '',
    author: post.author || 'Reuben Miller',
    date: dateStr,
    image: post.image || '/images/rm-image-1.webp',
    excerpt: post.excerpt || '',
    content: post.content,
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostForDisplay[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const firestorePosts = await getPublishedPosts();
        if (firestorePosts.length > 0) {
          setPosts(firestorePosts.map(firestorePostToDisplay));
        } else {
          setPosts(
            blogPosts.map((p) => ({
              ...p,
              slug: p.id,
            }))
          );
        }
      } catch {
        setPosts(
          blogPosts.map((p) => ({
            ...p,
            slug: p.id,
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">BLOG</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
          Blog Posts
        </h1>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-[#6B7280] text-lg">No posts yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
}
